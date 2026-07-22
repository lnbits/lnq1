const LNQ1_STATE_MS = 33
const LNQ1_POLL_MS = 1200
const LNQ1_KEEPALIVE_MS = 500
const LNQ1_STALE_PLAYER_MS = 3500
const LNQ1_HEARTBEAT_MS = 5000
const LNQ1_SESSION_LN = 'lnq1.lnAddress'
const LNQ1_SESSION_SATS = 'lnq1.satsTally'

window.Q1K3_ASSET_BASE = '/ext-assets/lnq1/q1k3/build/'

const lnq1 = {
  game: null,
  gameId: gameIdFromUrl(),
  player: null,
  localPlayerId: '',
  players: [],
  playerToken: '',
  realtime: null,
  realtimeSend: null,
  stateTimer: null,
  heartbeatTimer: null,
  staleTimer: null,
  pollTimer: null,
  sequence: 0,
  lastStateJson: '',
  lastStateSentAt: 0,
  remoteSequences: {},
  remoteLastSeen: {},
  stats: {sent: 0, received: 0, httpFallbacks: 0, websocketErrors: 0},
  killed: new Set(),
  rewarded: new Set(),
  debited: new Set(),
  announcedPlayers: new Set(),
  rosterSynced: false,
  session: {},
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
    const rememberedLnAddress = sessionGet(LNQ1_SESSION_LN)
    window.setTimeout(renderSessionHud, 0)
    return '<form>' +
      '<h2>ENTER LN ADDRESS</h2>' +
      '<input id=jn name=lnAddress maxlength=320 autocomplete=off placeholder="you@nostr.com" value="' + escapeHtml(rememberedLnAddress) + '" required>' +
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
    sessionSet(LNQ1_SESSION_LN, lnAddress)
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
      qr.innerHTML = '<img alt="Lightning invoice QR" src="' + qrSrc + '"><button type="button" class="copy-invoice" title="' + escapeHtml(invoice.paymentRequest) + '">' + escapeHtml(invoice.paymentRequest) + '</button>'
      qr.querySelector('.copy-invoice')?.addEventListener('click', () => copyInvoice(invoice.paymentRequest, status))
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
    renderSessionHud()
    startStateLoop()
    startHeartbeatLoop()
  },
  canPlay() {
    return lnq1.player?.status === 'alive'
  },
  spawnPoint(fallback) {
    const spawns = [
      [896, 96, 2048, Math.PI * 0.5],
      [3200, 96, 2048, -Math.PI * 0.5],
      [2048, 96, 1216, Math.PI],
      [2048, 96, 2944, 0],
      [1408, 96, 2944, Math.PI * 0.25]
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
    debitLocalPlayer(
      lnq1.player?.id || lnq1.localPlayerId,
      lnq1.player?.paidAmount || lnq1.game?.joinAmount
    )
    lnq1.player = {...(lnq1.player || {}), status: 'dead'}
    if (lnq1.heartbeatTimer) window.clearInterval(lnq1.heartbeatTimer)
    lnq1.heartbeatTimer = null
    clearPlayerToken()
    window.setTimeout(() => {
      ui_show_join(() => {
        lnq1.respawning = false
        this.applySpawn()
        startStateLoop()
        startHeartbeatLoop()
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
      const result = await api().declareWinner(lnq1.gameId, {
        playerToken: lnq1.playerToken,
        victimPlayerId
      })
      if (result?.victim || result?.killer) {
        addFeed(playerLabel(result.killer) + ' just fragged ' + playerLabel(result.victim))
      }
      showKillReward(victimPlayerId, result?.payout)
      if (result?.payout?.ok) {
        addSats(payoutSats(result.payout))
        console.log('[lnq1] payout tally updated', result.payout)
      }
      window.game_remove_remote_player?.(victimPlayerId)
      sendRealtime({
        type: 'player_killed',
        killerId: result?.killer?.id || lnq1.player?.id || '',
        victimId: victimPlayerId,
        killer: result?.killer || lnq1.player,
        victim: result?.victim || null,
        payout: result?.payout || null
      }).catch(() => {})
    } catch (error) {
      await refreshGame().catch(() => {})
      const victim = lnq1.players.find(player => player.id === victimPlayerId)
      if (victim?.status === 'dead') {
        lnq1.rewarded.add(victimPlayerId)
        window.game_remove_remote_player?.(victimPlayerId)
        const fallbackAmount = Math.max(0, Number(victim.paidAmount || lnq1.game?.joinAmount || 0) - Number(lnq1.game?.haircut || 0))
        if (fallbackAmount > 0) addSats(fallbackAmount)
        addFeed(playerLabel(lnq1.player) + ' just fragged ' + playerLabel(victim))
      } else {
        lnq1.killed.delete(victimPlayerId)
      }
      console.warn('[lnq1] kill report failed', error)
    }
  }
}

lnq1.ready = initLnq1().catch(error => console.error('[lnq1]', error))

async function initLnq1() {
  await hydrateSession()
  renderSessionHud()
  if (!lnq1.gameId) {
    const context = await api().context()
    lnq1.gameId = context.routeParams?.gameId || gameIdFromUrl()
  }
  lnq1.playerToken = tokenFromUrl()
  await refreshGame()
  await configureRealtime()
  lnq1.pollTimer = window.setInterval(refreshGame, LNQ1_POLL_MS)
  lnq1.staleTimer = window.setInterval(pruneStalePlayers, 1000)
  window.addEventListener('pagehide', leaveGame)
  window.addEventListener('beforeunload', cleanup)
}

async function refreshGame() {
  if (!lnq1.gameId) return
  const previousPlayer = lnq1.player
  const previousAlive = new Set((lnq1.players || []).filter(player => player?.status === 'alive').map(player => player.id))
  const response = await api().getPublicGame(lnq1.gameId, lnq1.playerToken)
  lnq1.game = response.game || null
  lnq1.player = response.player || null
  if (lnq1.player?.id) lnq1.localPlayerId = lnq1.player.id
  lnq1.players = Array.isArray(response.players) ? response.players : []
  announceJoinedPlayers(previousAlive)
  renderPlayersHud()
  for (const player of lnq1.players) {
    if (player?.id && ['dead', 'left'].includes(player.status)) {
      window.game_remove_remote_player?.(player.id)
      lnq1.announcedPlayers.delete(player.id)
    }
  }
  if (previousPlayer?.status === 'alive' && lnq1.player?.status === 'dead' && window.game_entity_player && !window.game_entity_player._dead) {
    window.game_entity_player._kill()
  }
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

function startHeartbeatLoop() {
  if (lnq1.heartbeatTimer) return
  publishHeartbeat().catch(error => console.warn('[lnq1] heartbeat failed', error))
  lnq1.heartbeatTimer = window.setInterval(() => {
    publishHeartbeat().catch(error => console.warn('[lnq1] heartbeat failed', error))
  }, LNQ1_HEARTBEAT_MS)
}

async function publishHeartbeat() {
  if (!lnq1.playerToken || !lnq1.gameId || lnq1.player?.status !== 'alive') return
  await api().heartbeatGame(lnq1.gameId, {playerToken: lnq1.playerToken})
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
    renderPlayersHud()
    window.game_apply_remote_snapshot?.(data.playerId, data.state)
    return
  }
  if (data.type === 'player_paid') {
    addFeed(playerLabel(data.player) + ' has joined the game')
    refreshGame().catch(error => console.warn('[lnq1] refresh failed', error))
    return
  }
  if (data.type === 'player_killed') {
    addFeed(playerLabel(data.killer) + ' just fragged ' + playerLabel(data.victim))
    if (data.killerId === lnq1.player?.id) {
      const firstReward = !data.victimId || !lnq1.rewarded.has(data.victimId)
      showKillReward(data.victimId, data.payout)
      if (firstReward && data.payout?.ok) {
        addSats(payoutSats(data.payout))
      }
    }
    const killedLocalPlayer = data.victimId === lnq1.localPlayerId
    if (killedLocalPlayer) {
      debitLocalPlayer(
        data.victimId,
        data.victim?.paidAmount || lnq1.game?.joinAmount
      )
      lnq1.player = {...(lnq1.player || {}), status: 'dead'}
      window.game_entity_player?._kill()
    } else {
      window.game_remove_remote_player?.(data.victimId)
    }
    refreshGame().catch(error => console.warn('[lnq1] refresh failed', error))
  }
  if (data.type === 'player_left') {
    if (data.playerId !== lnq1.player?.id) {
      addFeed(playerLabel(data.player) + ' left the party.')
      window.game_remove_remote_player?.(data.playerId)
      delete lnq1.remoteSequences[data.playerId]
      delete lnq1.remoteLastSeen[data.playerId]
    }
    refreshGame().catch(error => console.warn('[lnq1] refresh failed', error))
  }
}

function showKillReward(victimId, payout = {}) {
  if (victimId && lnq1.rewarded.has(victimId)) return
  if (victimId) lnq1.rewarded.add(victimId)
  ui_confetti?.()
  const amount = payoutSats(payout)
  if (payout?.ok && amount > 0) {
    window.game_show_message?.('KILL PAYOUT ' + (amount|0) + ' SATS')
  } else if (payout && payout.ok === false) {
    window.game_show_message?.('PAYOUT FAILED')
    addFeed('Payout failed: ' + (payout.error || 'wallet could not pay'))
  } else {
    window.game_show_message?.('KILL CONFIRMED')
  }
}

function payoutSats(payout = {}) {
  const amount = Number(payout.amount ?? payout.amountSat ?? payout.amount_sat ?? 0)
  if (amount > 0) return amount
  return Number(payout.amountMsat ?? payout.amount_msat ?? 0) / 1000
}

function addFeed(message) {
  renderSessionHud()
  const feed = document.getElementById('feed')
  if (!feed || !message) return
  const line = document.createElement('div')
  line.textContent = message
  feed.prepend(line)
  while (feed.children.length > 5) {
    feed.lastChild.remove()
  }
  window.setTimeout(() => line.remove(), 5000)
}

function playerLabel(player) {
  return player?.lnAddress || player?.name || 'Someone'
}

function announceJoinedPlayers(previousAlive) {
  const alivePlayers = (lnq1.players || []).filter(player => player?.id && player.status === 'alive')
  if (!lnq1.rosterSynced) {
    for (const player of alivePlayers) lnq1.announcedPlayers.add(player.id)
    lnq1.rosterSynced = true
    return
  }
  for (const player of alivePlayers) {
    if (previousAlive.has(player.id) || lnq1.announcedPlayers.has(player.id)) continue
    lnq1.announcedPlayers.add(player.id)
    addFeed(playerLabel(player) + ' has joined the game')
  }
}

function addSats(amount) {
  const next = Math.trunc(Number(sessionGet(LNQ1_SESSION_SATS) || 0) + Number(amount || 0))
  sessionSet(LNQ1_SESSION_SATS, String(next))
  updateSatsHud()
}

function debitLocalPlayer(playerId, amount) {
  const id = String(playerId || '')
  const debit = Math.trunc(Number(amount || 0))
  if (!id || debit <= 0 || lnq1.debited.has(id)) return false
  lnq1.debited.add(id)
  addSats(-debit)
  return true
}

function updateSatsHud() {
  const earn = document.getElementById('earn')
  if (!earn) return
  const amount = Math.trunc(Number(sessionGet(LNQ1_SESSION_SATS) || 0))
  earn.textContent = amount + 'sats'
}

function renderPlayersHud() {
  const players = document.getElementById('players')
  if (!players) return
  const now = Date.now()
  const seenAddresses = new Set()
  const alivePlayers = (lnq1.players || []).filter(player => {
    if (player?.status !== 'alive') return false
    const label = playerLabel(player)
    if (seenAddresses.has(label)) return false
    const isMe = player?.id && player.id === lnq1.player?.id
    const recentlySeen = player?.id && now - Number(lnq1.remoteLastSeen[player.id] || 0) <= LNQ1_STALE_PLAYER_MS
    if (!isMe && !recentlySeen) return false
    seenAddresses.add(label)
    return true
  })
  if (!alivePlayers.length) {
    players.innerHTML = ''
    return
  }
  players.innerHTML = alivePlayers.map(player => {
    const isMe = player?.id && player.id === lnq1.player?.id
    const slot = Number(player?.slot || 0)
    return '<div class="' + (isMe ? 'me' : '') + '">' +
      (slot ? '<span class="slot">' + slot + '</span> ' : '') +
      escapeHtml(playerLabel(player)) +
      '</div>'
  }).join('')
}

function renderSessionHud() {
  updateSatsHud()
  renderPlayersHud()
}

async function copyInvoice(paymentRequest, status) {
  try {
    await navigator.clipboard?.writeText(paymentRequest)
    if (status) status.textContent = 'Invoice copied.'
  } catch (error) {
    if (status) status.textContent = 'Copy failed. Select and copy from the button text.'
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

function sessionGet(key) {
  return lnq1.session[key] || ''
}

function sessionSet(key, value) {
  const stringValue = String(value || '')
  lnq1.session[key] = stringValue
  api().setSessionValue(key, stringValue).catch(() => {})
}

async function hydrateSession() {
  for (const key of [LNQ1_SESSION_LN, LNQ1_SESSION_SATS]) {
    try {
      const result = await api().getSessionValue(key)
      lnq1.session[key] = String(result?.value || '')
    } catch (error) {
      lnq1.session[key] = ''
    }
  }
}

function delay(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

function pruneStalePlayers() {
  const now = Date.now()
  for (const [playerId, lastSeen] of Object.entries(lnq1.remoteLastSeen)) {
    if (now - Number(lastSeen || 0) > LNQ1_STALE_PLAYER_MS) {
      window.game_remove_remote_player?.(playerId)
      delete lnq1.remoteSequences[playerId]
      delete lnq1.remoteLastSeen[playerId]
      renderPlayersHud()
    }
  }
}

function leaveGame() {
  if (!lnq1.playerToken || !lnq1.gameId || lnq1.player?.status !== 'alive') return
  if (lnq1.heartbeatTimer) window.clearInterval(lnq1.heartbeatTimer)
  lnq1.heartbeatTimer = null
  const token = lnq1.playerToken
  lnq1.playerToken = ''
  api().leaveGame(lnq1.gameId, {playerToken: token}).catch(() => {})
}

function cleanup() {
  leaveGame()
  if (lnq1.realtime) lnq1.realtime()
  if (lnq1.stateTimer) window.clearInterval(lnq1.stateTimer)
  if (lnq1.heartbeatTimer) window.clearInterval(lnq1.heartbeatTimer)
  if (lnq1.staleTimer) window.clearInterval(lnq1.staleTimer)
  if (lnq1.pollTimer) window.clearInterval(lnq1.pollTimer)
}
