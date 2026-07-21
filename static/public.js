const LNQ1_STATE_MS = 33
const LNQ1_POLL_MS = 1200
const LNQ1_KEEPALIVE_MS = 500

window.Q1K3_ASSET_BASE = '/ext-assets/lnq1/q1k3/build/'

const lnq1 = {
  game: null,
  gameId: gameIdFromUrl(),
  player: null,
  playerToken: '',
  realtime: null,
  realtimeSend: null,
  stateTimer: null,
  pollTimer: null,
  sequence: 0,
  lastStateJson: '',
  lastStateSentAt: 0,
  remoteSequences: {},
  remoteLastSeen: {},
  stats: {sent: 0, received: 0, httpFallbacks: 0, websocketErrors: 0},
  killed: new Set(),
  rewarded: new Set(),
  respawning: false,
  ready: null
}

window.LNQ1_DEBUG = lnq1

let client = null

function api() {
  if (!client) {
    client = window.createLNbitsExtensionClient({extensionId: 'lnq1'})
  }
  return client
}

window.LNQ1_MULTIPLAYER = {
  joinMarkup() {
    return '<form>' +
      '<h2>ENTER LN ADDRESS</h2>' +
      '<input id=jn name=lnAddress maxlength=320 autocomplete=off placeholder="you@nostr.com" required>' +
      '<button id=jb>SUBMIT</button>' +
      '<small id=js>Pay the join invoice to spawn into the arena.</small>' +
      '<div class=qr id=jqr></div>' +
    '</form>'
  },
  async join(joinEl, _playerName, done) {
    const button = joinEl.querySelector('#jb')
    const status = joinEl.querySelector('#js')
    const qr = joinEl.querySelector('#jqr')
    const lnAddress = joinEl.querySelector('[name="lnAddress"]')?.value?.trim() || ''
    console.log('[lnq1] submit join', {gameId: lnq1.gameId || gameIdFromUrl(), lnAddress})
    button.disabled = true
    status.textContent = 'Creating invoice...'
    qr.innerHTML = ''
    try {
      const gameId = lnq1.gameId || gameIdFromUrl()
      if (!gameId) throw new Error('Game id is missing from this link.')
      lnq1.gameId = gameId
      const invoice = normalizeInvoice(await api().joinGame(gameId, {lnAddress, name: playerNameFromLn(lnAddress)}))
      savePlayerToken(invoice.playerToken)
      button.textContent = 'WAITING FOR PAYMENT'
      status.textContent = 'Scan or copy the invoice below.'
      const qrSrc = window.LNQ1_QR_DATA_URI ? window.LNQ1_QR_DATA_URI(invoice.paymentRequest) : qrcodeUrl(invoice.paymentRequest)
      qr.innerHTML = '<img alt="Lightning invoice QR" src="' + qrSrc + '"><small class="invoice-text">' + escapeHtml(invoice.paymentRequest) + '</small>'
      configureRealtime().catch(error => console.warn('[lnq1] realtime setup failed', error))
      if (!lnq1.pollTimer) lnq1.pollTimer = window.setInterval(refreshGame, LNQ1_POLL_MS)
      await waitForPaidPlayer(invoice.playerToken)
      status.textContent = 'Payment received'
      done()
    } catch (error) {
      status.textContent = error?.message || String(error)
      button.disabled = false
    }
  },
  start() {
    this.applySpawn()
    startStateLoop()
  },
  canPlay() {
    return lnq1.player?.status === 'alive'
  },
  spawnPoint(fallback) {
    const spawns = [
      [768, 80, 2304, Math.PI * 0.5],
      [3136, 80, 2304, -Math.PI * 0.5],
      [2048, 80, 896, Math.PI],
      [2048, 80, 3200, 0],
      [2048, 80, 2304, 0]
    ]
    const slot = Math.max(1, Math.min(spawns.length, Number(lnq1.player?.slot || 1)))
    const spawn = spawns[slot - 1] || spawns[0]
    window.LNQ1_SPAWN_YAW = spawn[3]
    return vec3(spawn[0], spawn[1], spawn[2])
  },
  applySpawn() {
    const pos = this.spawnPoint()
    if (window.game_entity_player?._dead && window.game_revive_local_player) {
      window.game_revive_local_player(pos, window.LNQ1_SPAWN_YAW)
    } else {
      window.game_set_local_spawn?.(pos, window.LNQ1_SPAWN_YAW)
    }
  },
  onLocalDeath() {
    if (lnq1.respawning) return
    lnq1.respawning = true
    lnq1.player = {...(lnq1.player || {}), status: 'dead'}
    clearPlayerToken()
    window.setTimeout(() => {
      ui_show_join(() => {
        lnq1.respawning = false
        this.applySpawn()
        startStateLoop()
      })
    }, 800)
  },
  whenReady(start, showJoin) {
    ;(lnq1.ready || Promise.resolve()).then(() => {
      if (lnq1.player?.status === 'alive') {
        start()
      } else {
        showJoin()
      }
    }).catch(() => showJoin())
  },
  async reportKill(victimPlayerId) {
    if (!victimPlayerId || lnq1.killed.has(victimPlayerId) || !lnq1.playerToken) return
    lnq1.killed.add(victimPlayerId)
    try {
      await sendRealtimeOrHttp({
        type: 'kill',
        killerId: lnq1.player?.id || '',
        victimId: victimPlayerId
      }, () => api().declareWinner(lnq1.gameId, {
        playerToken: lnq1.playerToken,
        victimPlayerId
      }))
      showKillReward(victimPlayerId)
    } catch (error) {
      lnq1.killed.delete(victimPlayerId)
      console.warn('[lnq1] kill report failed', error)
    }
  }
}

lnq1.ready = initLnq1().catch(error => console.error('[lnq1]', error))

async function initLnq1() {
  if (!lnq1.gameId) {
    const context = await api().context()
    lnq1.gameId = context.routeParams?.gameId || gameIdFromUrl()
  }
  lnq1.playerToken = tokenFromUrl()
  await refreshGame()
  await configureRealtime()
  lnq1.pollTimer = window.setInterval(refreshGame, LNQ1_POLL_MS)
  window.addEventListener('beforeunload', cleanup)
}

async function refreshGame() {
  if (!lnq1.gameId) return
  const response = await api().getPublicGame(lnq1.gameId, lnq1.playerToken)
  lnq1.game = response.game || null
  lnq1.player = response.player || null
}

async function waitForPaidPlayer(playerToken) {
  for (;;) {
    await delay(1500)
    lnq1.playerToken = playerToken
    await refreshGame()
    if (lnq1.player?.status === 'alive') return
  }
}

async function configureRealtime() {
  if (!lnq1.gameId || lnq1.realtime) return
  try {
    lnq1.realtime = await api().subscribeWebsocket(gameChannel(lnq1.gameId), handleRealtime)
    lnq1.realtimeSend = lnq1.realtime.send
    console.log('[lnq1] websocket subscribed', gameChannel(lnq1.gameId))
  } catch (error) {
    console.warn('[lnq1] websocket subscribe failed', error)
  }
}

function startStateLoop() {
  if (lnq1.stateTimer) return
  lnq1.stateTimer = window.setInterval(publishLocalState, LNQ1_STATE_MS)
}

async function publishLocalState() {
  if (!lnq1.player || lnq1.player.status !== 'alive' || !window.game_local_snapshot) return
  const snapshot = window.game_local_snapshot()
  if (!snapshot) return
  const stateJson = JSON.stringify(snapshot)
  const now = Date.now()
  if (stateJson === lnq1.lastStateJson && now - Number(lnq1.lastStateSentAt || 0) < LNQ1_KEEPALIVE_MS) return
  lnq1.lastStateJson = stateJson
  lnq1.lastStateSentAt = now
  lnq1.sequence += 1
  const state = {
    ...snapshot,
    sequence: lnq1.sequence,
    id: lnq1.player.id,
    name: lnq1.player.name || '',
    slot: Number(lnq1.player.slot || 0),
    sentAt: now
  }
  try {
    await sendRealtimeOrHttp({
      type: 'player_state',
      playerId: lnq1.player.id,
      playerToken: lnq1.playerToken,
      state
    }, () => api().publishState(lnq1.gameId, {
      playerToken: lnq1.playerToken,
      state
    }))
    lnq1.stats.sent += 1
  } catch (error) {
    console.warn('[lnq1] state publish failed', error)
  }
}

function handleRealtime(event) {
  const data = event?.data || {}
  if (!data || typeof data !== 'object') return
  if (data.type === 'player_state') {
    if (data.playerId === lnq1.player?.id) return
    const sequence = Number(data.state?.sequence || 0)
    if (sequence && sequence <= Number(lnq1.remoteSequences[data.playerId] || 0)) return
    if (sequence) lnq1.remoteSequences[data.playerId] = sequence
    lnq1.remoteLastSeen[data.playerId] = Date.now()
    lnq1.stats.received += 1
    window.game_apply_remote_snapshot?.(data.playerId, data.state)
    return
  }
  if (data.type === 'player_paid') {
    refreshGame().catch(error => console.warn('[lnq1] refresh failed', error))
    return
  }
  if (data.type === 'player_killed') {
    if (data.killerId === lnq1.player?.id) {
      showKillReward(data.victimId, data.payout)
    }
    if (data.victimId === lnq1.player?.id && window.game_entity_player) {
      lnq1.player = {...(lnq1.player || {}), status: 'dead'}
      window.game_entity_player._kill()
    } else {
      window.game_remove_remote_player?.(data.victimId)
    }
    refreshGame().catch(error => console.warn('[lnq1] refresh failed', error))
  }
}

function showKillReward(victimId, payout = {}) {
  if (victimId && lnq1.rewarded.has(victimId)) return
  if (victimId) lnq1.rewarded.add(victimId)
  ui_confetti?.()
  const amount = Number(payout?.amountMsat || 0) / 1000
  if (amount > 0) {
    window.game_show_message?.('KILL PAYOUT ' + (amount|0) + ' SATS')
  } else {
    window.game_show_message?.('KILL CONFIRMED')
  }
}

async function sendRealtime(message) {
  if (!lnq1.realtimeSend) throw new Error('Realtime websocket is not connected.')
  let lastError = null
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await lnq1.realtimeSend(message)
      return
    } catch (error) {
      lastError = error
      await delay(80)
    }
  }
  throw lastError || new Error('Realtime websocket send failed.')
}

async function sendRealtimeOrHttp(message, httpFallback) {
  try {
    await sendRealtime(message)
  } catch (error) {
    lnq1.stats.websocketErrors += 1
    lnq1.stats.httpFallbacks += 1
    console.warn('[lnq1] websocket send failed; using HTTP fallback', error)
    await httpFallback()
  }
}

function normalizeInvoice(invoice = {}) {
  const paymentHash = invoice.paymentHash || invoice.payment_hash || ''
  return {
    ...invoice,
    playerToken: invoice.playerToken || invoice.player_token || paymentHash,
    paymentHash,
    paymentRequest: invoice.paymentRequest || invoice.payment_request || ''
  }
}

function savePlayerToken(playerToken) {
  const url = new URL(window.location.href)
  url.searchParams.set('playerToken', playerToken)
  window.history.replaceState({}, '', url)
  lnq1.playerToken = playerToken
}

function clearPlayerToken() {
  const url = new URL(window.location.href)
  url.searchParams.delete('playerToken')
  window.history.replaceState({}, '', url)
  lnq1.playerToken = ''
}

function tokenFromUrl() {
  return new URL(window.location.href).searchParams.get('playerToken') || ''
}

function gameIdFromUrl() {
  const url = new URL(window.location.href)
  const explicit = url.searchParams.get('gameId') || url.searchParams.get('game_id')
  if (explicit) return explicit
  const match = url.pathname.match(/\/(?:ext\/)?lnq1\/games\/([^/?#]+)/)
  if (match) return decodeURIComponent(match[1])
  const parts = url.pathname.split('/').filter(Boolean)
  const gamesIndex = parts.lastIndexOf('games')
  return gamesIndex >= 0 && parts[gamesIndex + 1] ? decodeURIComponent(parts[gamesIndex + 1]) : ''
}

function gameChannel(gameId) {
  return ('game_' + String(gameId || '').replace(/[^A-Za-z0-9_.:-]/g, '_')).slice(0, 128)
}

function qrcodeUrl(value) {
  return '/api/v1/qrcode/' + encodeURIComponent(value)
}

function playerNameFromLn(value) {
  return String(value || '').split('@')[0].slice(0, 18) || 'PLAYER'
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))
}

function delay(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

function cleanup() {
  if (lnq1.realtime) lnq1.realtime()
  if (lnq1.stateTimer) window.clearInterval(lnq1.stateTimer)
  if (lnq1.pollTimer) window.clearInterval(lnq1.pollTimer)
}
