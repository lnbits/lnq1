import {storage, system, wallet, websocket} from './lnbits-sdk.js'

const SETTINGS_TABLE = 'lnq1_settings'
const GAMES_TABLE = 'lnq1_games'
const PLAYERS_TABLE = 'lnq1_players'
const SETTINGS_ID = 'lnq1-settings'
const MAX_PLAYERS = 5
const GAME_SEARCH_FIELDS = ['name', 'status']

export function getLnq1Settings(_requestJson) {
  return runJson(() => ({settings: publicSettings(getSettings())}))
}

export function saveLnq1Settings(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const existing = getSettings()
    const now = system.now()
    const settings = {
      id: SETTINGS_ID,
      wallet_id: cleanText(request.walletId ?? request.wallet_id, 128),
      wallet_name: cleanText(request.walletName ?? request.wallet_name, 120),
      enabled: request.enabled === true,
      haircut: normalizeInteger(request.haircut, 0, 0, 100000000),
      created_at: existing.created_at || now,
      updated_at: now
    }
    if (settings.enabled && !settings.wallet_id) throw new Error('walletId is required when LNQ1 is enabled.')
    storage.set(SETTINGS_TABLE, settings)
    return {settings: publicSettings(settings)}
  })
}

export function listLnq1Wallets(_requestJson) {
  return runJson(() => ({wallets: wallet.listUserWallets()}))
}

export function createLnq1Game(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const settings = getSettings()
    if (!settings.enabled) throw new Error('LNQ1 arenas are disabled.')
    if (!settings.wallet_id) throw new Error('LNQ1 wallet is not configured.')
    const now = system.now()
    const game = {
      id: cleanId(request.id) || idValue(system.id('arena')),
      settings_id: settings.id,
      wallet_id: settings.wallet_id,
      name: cleanText(request.name, 80) || 'LNQ1 public arena',
      join_amount: normalizeInteger(request.joinAmount ?? request.join_amount, 100, 1, 100000000),
      haircut: normalizeInteger(request.haircut ?? settings.haircut, settings.haircut, 0, 100000000),
      players_count: 0,
      max_players: MAX_PLAYERS,
      status: 'active',
      created_at: now,
      updated_at: now
    }
    storage.set(GAMES_TABLE, game)
    return {game: publicGame(game), publicUrl: '/lnq1/games/' + game.id}
  })
}

export function listLnq1Games(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const rowsPerPage = normalizePageSize(request.rowsPerPage)
    const page = normalizePage(request.page)
    const response = storage.getPaginated(GAMES_TABLE, {
      search: cleanText(request.search, 256),
      searchFields: GAME_SEARCH_FIELDS,
      sortBy: normalizeGameSortBy(request.sortBy),
      descending: request.descending === true || request.descending === 'true',
      limit: rowsPerPage,
      offset: (page - 1) * rowsPerPage
    })
    return {games: response.data.map(game => publicGame(withFreshPlayerCount(game))), total: response.total}
  })
}

export function deleteLnq1Game(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const gameId = requiredText(request.gameId, 'gameId', 128)
    getGame(gameId)
    for (const player of playersForGame(gameId, 100)) storage.delete(PLAYERS_TABLE, player.id)
    storage.delete(GAMES_TABLE, gameId)
    return {deleted: true, gameId}
  })
}

export function getPublicLnq1Game(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const game = withFreshPlayerCount(getGame(requiredText(request.gameId, 'gameId', 128)))
    const token = cleanText(request.playerToken ?? request.player_token, 128)
    const player = token ? playerForToken(game.id, token) : null
    const players = playersForGame(game.id).filter(player => ['alive', 'dead'].includes(player.status))
    return {
      game: publicGame(game),
      players: players.map(player => publicPlayer(player, true)),
      player: player ? publicPlayer(player, true) : null,
      canJoin: game.status === 'active' && alivePlayersForGame(game.id).length < MAX_PLAYERS,
      serverTimeMs: system.now() * 1000,
      realtimeReady: true
    }
  })
}

export function joinLnq1Game(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const game = getGame(requiredText(request.gameId, 'gameId', 128))
    if (game.status !== 'active') throw new Error('This arena is not active.')
    if (alivePlayersForGame(game.id).length >= MAX_PLAYERS) throw new Error('This arena is full.')
    const lnAddress = normalizeLnAddress(request.lnAddress ?? request.ln_address)
    const playerName = cleanText(request.name, 18) || 'PLAYER'
    const playerToken = idValue(system.id('player'))
    const invoice = wallet.createInvoicePublic({
      sourceId: game.id,
      amount: Number(game.join_amount),
      currency: 'sat',
      memo: 'LNQ1 Arena entry for ' + playerName,
      extra: {
        game_id: game.id,
        ln_address: lnAddress,
        player_name: playerName,
        player_token: playerToken
      }
    })
    return {
      playerToken,
      paymentHash: invoice.paymentHash,
      paymentRequest: invoice.paymentRequest,
      checkingId: invoice.checkingId
    }
  })
}

export function recordLnq1Payment(eventJson) {
  return runJson(() => {
    const event = parseJsonObject(eventJson)
    const paymentHash = eventPaymentHash(event)
    if (!paymentHash) throw new Error('paymentHash is required.')
    const extra = event.extra?.extra_lnq1 || event.payment?.extra?.extra_lnq1 || {}
    const gameId = cleanText(extra.game_id || event.extra?.game_id || event.payment?.extra?.game_id, 128)
    const lnAddress = normalizeLnAddress(extra.ln_address || event.extra?.ln_address || event.payment?.extra?.ln_address)
    const playerName = cleanText(extra.player_name || event.extra?.player_name || event.payment?.extra?.player_name, 18) || 'PLAYER'
    const playerToken = cleanText(extra.player_token || event.extra?.player_token || event.payment?.extra?.player_token || paymentHash, 128)
    const game = getGame(gameId)
    const existing = storage.get(PLAYERS_TABLE, paymentHash, null)
    if (existing) return {game: publicGame(withFreshPlayerCount(game)), player: publicPlayer(existing, true), status: existing.status}
    const paidAmount = Math.trunc(Math.abs(Number(event.amount || event.payment?.amount || 0)) / 1000) || Number(game.join_amount)
    const alivePlayers = alivePlayersForGame(game.id)
    if (alivePlayers.length >= MAX_PLAYERS) {
      const refused = makePlayer({paymentHash, game, lnAddress, playerName, playerToken, slot: 0, status: 'refund-pending', paidAmount})
      storage.set(PLAYERS_TABLE, refused)
      refundPlayer(game, lnAddress, paidAmount, game.id, 'full')
      return {game: publicGame(withFreshPlayerCount(game)), player: publicPlayer(refused, true), status: refused.status}
    }
    const player = makePlayer({paymentHash, game, lnAddress, playerName, playerToken, slot: nextSlot(game.id), status: 'alive', paidAmount})
    storage.set(PLAYERS_TABLE, player)
    const updatedGame = withFreshPlayerCount({...game, updated_at: system.now()})
    storage.set(GAMES_TABLE, updatedGame)
    publishGameMessage(game.id, {type: 'player_paid', player: publicPlayer(player, true), playersCount: updatedGame.players_count})
    return {game: publicGame(updatedGame), player: publicPlayer(player, true), status: 'alive'}
  })
}

export function declareLnq1Kill(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const game = getGame(requiredText(request.gameId, 'gameId', 128))
    const killer = requireAlivePlayer(game.id, requiredText(request.playerToken ?? request.player_token, 'playerToken', 128))
    const victim = storage.get(PLAYERS_TABLE, requiredText(request.victimPlayerId ?? request.victim_player_id, 'victimPlayerId', 128), null)
    if (!victim || victim.game_id !== game.id || victim.status !== 'alive') throw new Error('Victim is not alive in this arena.')
    if (victim.id === killer.id) throw new Error('Self kills cannot be paid out.')
    const payoutAmount = Math.max(0, Number(victim.paid_amount || game.join_amount) - Number(game.haircut || 0))
    const payout = payPlayer({
      walletId: game.wallet_id,
      lnAddress: killer.ln_address,
      amount: payoutAmount,
      comment: 'LNQ1 kill payout',
      description: 'LNQ1 kill payout in ' + game.name,
      extra: {lnq1_game_id: game.id, lnq1_killer_id: killer.id, lnq1_victim_id: victim.id}
    })
    const killed = {
      ...victim,
      status: 'dead',
      killer_id: killer.id,
      payout_amount: payoutAmount,
      payout_status: payout.ok ? 'paid' : 'failed',
      killed_at: system.now()
    }
    storage.set(PLAYERS_TABLE, killed)
    const updatedGame = withFreshPlayerCount({...game, updated_at: system.now()})
    storage.set(GAMES_TABLE, updatedGame)
    publishGameMessage(game.id, {type: 'player_killed', killerId: killer.id, victimId: victim.id, payout, playersCount: updatedGame.players_count})
    return {game: publicGame(updatedGame), killer: publicPlayer(killer, true), victim: publicPlayer(killed, true), payout}
  })
}

export function publishLnq1State(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const game = getGame(requiredText(request.gameId, 'gameId', 128))
    const player = requireAlivePlayer(game.id, requiredText(request.playerToken ?? request.player_token, 'playerToken', 128))
    const state = normalizePlayerState(request.state)
    publishGameMessage(game.id, {type: 'player_state', playerId: player.id, state, sentAt: system.now()})
    return {sent: true}
  })
}

export function publishLnq1Chat(requestJson) {
  return runJson(() => {
    const request = parseJsonObject(requestJson)
    const game = getGame(requiredText(request.gameId, 'gameId', 128))
    const player = requireAlivePlayer(game.id, requiredText(request.playerToken ?? request.player_token, 'playerToken', 128))
    const message = requiredText(request.message, 'message', 160)
    publishGameMessage(game.id, {type: 'chat', playerId: player.id, name: player.name, message, sentAt: system.now()})
    return {sent: true}
  })
}

export function settleLnq1Payout(_requestJson) {
  return runJson(() => ({settled: false, message: 'LNQ1 payouts are attempted immediately when a kill is declared.'}))
}

function runJson(fn) {
  try {
    return JSON.stringify({ok: true, data: fn()})
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return JSON.stringify({ok: false, error: message})
  }
}

function parseJsonObject(value) {
  if (!value) return {}
  const parsed = typeof value === 'string' ? JSON.parse(value) : value
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('request must be a JSON object.')
  return parsed
}

function getSettings() {
  return storage.get(SETTINGS_TABLE, SETTINGS_ID, defaultSettings())
}

function defaultSettings() {
  const now = system.now()
  return {id: SETTINGS_ID, wallet_id: '', wallet_name: '', enabled: false, haircut: 0, created_at: now, updated_at: now}
}

function getGame(gameId) {
  const game = storage.get(GAMES_TABLE, gameId, null)
  if (!game) throw new Error('LNQ1 arena not found.')
  return game
}

function playersForGame(gameId, limit = 25) {
  return storage.getPaginated(PLAYERS_TABLE, {filters: {game_id: gameId}, sortBy: 'paid_at', descending: false, limit, offset: 0}).data
}

function alivePlayersForGame(gameId) {
  return storage.getPaginated(PLAYERS_TABLE, {filters: {game_id: gameId, status: 'alive'}, sortBy: 'paid_at', descending: false, limit: MAX_PLAYERS, offset: 0}).data
}

function playerForToken(gameId, token) {
  return storage.getPaginated(PLAYERS_TABLE, {filters: {game_id: gameId, player_token: token}, limit: 1, offset: 0}).data[0] || null
}

function requireAlivePlayer(gameId, token) {
  const player = playerForToken(gameId, token)
  if (!player || player.status !== 'alive') throw new Error('A live paid player token is required.')
  return player
}

function makePlayer({paymentHash, game, lnAddress, playerName, playerToken, slot, status, paidAmount}) {
  const now = system.now()
  return {
    id: paymentHash,
    game_id: game.id,
    name: playerName,
    ln_address: lnAddress,
    payment_hash: paymentHash,
    player_token: playerToken,
    slot,
    status,
    paid_amount: paidAmount,
    killer_id: '',
    payout_amount: 0,
    payout_status: '',
    created_at: now,
    paid_at: ['alive', 'refund-pending'].includes(status) ? now : null,
    killed_at: null
  }
}

function nextSlot(gameId) {
  const used = new Set(alivePlayersForGame(gameId).map(player => Number(player.slot || 0)))
  for (let i = 1; i <= MAX_PLAYERS; i += 1) if (!used.has(i)) return i
  return 0
}

function withFreshPlayerCount(game) {
  return {...game, players_count: alivePlayersForGame(game.id).length, max_players: MAX_PLAYERS}
}

function payPlayer({walletId, lnAddress, amount, comment, description, extra}) {
  if (!Number.isInteger(amount) || amount <= 0) return {ok: false, error: 'Payout amount must be greater than zero.'}
  if (!walletId) return {ok: false, error: 'LNQ1 wallet is not configured.'}
  if (!lnAddress) return {ok: false, error: 'Lightning address is missing.'}
  const response = wallet.payLnurl({walletId, lnurl: lnAddress, amount, currency: 'sat', comment, maxSat: amount, description, extra})
  return {
    ok: response.ok === true,
    error: response.error || '',
    checkingId: response.checkingId || '',
    paymentHash: response.paymentHash || '',
    status: response.status || '',
    amountMsat: Number(response.amountMsat || 0),
    feeMsat: Number(response.feeMsat || 0)
  }
}

function refundPlayer(game, lnAddress, amount, gameId, reason) {
  return payPlayer({
    walletId: game.wallet_id,
    lnAddress,
    amount,
    comment: 'LNQ1 refund',
    description: 'LNQ1 refund for ' + game.name,
    extra: {lnq1_game_id: gameId, lnq1_refund_reason: reason}
  })
}

function publishGameMessage(gameId, data) {
  websocket.publish(gameChannel(gameId), data)
}

function gameChannel(gameId) {
  const clean = cleanText(gameId, 96).replace(/[^A-Za-z0-9_.:-]/g, '_')
  if (!clean) throw new Error('gameId is required.')
  return ('game_' + clean).slice(0, 128)
}

function normalizePlayerState(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('state must be an object.')
  return {
    sequence: normalizeInteger(value.sequence, 0, 0, 1000000000),
    x: normalizeNumber(value.x, 0, -100000, 100000),
    y: normalizeNumber(value.y, 0, -100000, 100000),
    z: normalizeNumber(value.z, 0, -100000, 100000),
    yaw: normalizeNumber(value.yaw, 0, -100, 100),
    pitch: normalizeNumber(value.pitch, 0, -10, 10),
    health: normalizeInteger(value.health, 100, 0, 100),
    dead: value.dead === true,
    shooting: value.shooting === true,
    weapon: normalizeInteger(value.weapon, 0, 0, 20),
    ammo: normalizeInteger(value.ammo, 0, 0, 10000),
    vx: normalizeNumber(value.vx, 0, -10000, 10000),
    vy: normalizeNumber(value.vy, 0, -10000, 10000),
    vz: normalizeNumber(value.vz, 0, -10000, 10000),
    onGround: value.onGround === true,
    slot: normalizeInteger(value.slot, 0, 0, MAX_PLAYERS),
    name: cleanText(value.name, 18),
    t: normalizeNumber(value.t, 0, 0, 1000000000),
    sentAt: normalizeNumber(value.sentAt, 0, 0, 10000000000000)
  }
}

function publicSettings(settings) {
  return {
    id: settings.id,
    enabled: settings.enabled === true,
    haircut: Number(settings.haircut || 0),
    walletId: settings.wallet_id || '',
    walletName: settings.wallet_name || '',
    createdAt: Number(settings.created_at || 0),
    updatedAt: Number(settings.updated_at || 0)
  }
}

function publicGame(game) {
  return {
    id: game.id,
    settingsId: game.settings_id,
    name: game.name,
    joinAmount: Number(game.join_amount || 0),
    haircut: Number(game.haircut || 0),
    playersCount: Number(game.players_count || 0),
    maxPlayers: Number(game.max_players || MAX_PLAYERS),
    status: game.status || 'active',
    createdAt: Number(game.created_at || 0),
    updatedAt: Number(game.updated_at || 0)
  }
}

function publicPlayer(player, includeId) {
  return {
    id: includeId ? player.id : '',
    gameId: player.game_id,
    name: player.name || 'PLAYER',
    lnAddress: maskLnAddress(player.ln_address),
    slot: Number(player.slot || 0),
    status: player.status || 'pending',
    paidAmount: Number(player.paid_amount || 0),
    paidAt: Number(player.paid_at || 0),
    killedAt: Number(player.killed_at || 0)
  }
}

function eventPaymentHash(event) {
  return cleanText(event.payment_hash || event.paymentHash || event.payment?.payment_hash || event.payment?.paymentHash, 256)
}

function normalizeLnAddress(value) {
  const text = requiredText(value, 'lnAddress', 320).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) throw new Error('Enter a valid Lightning address.')
  return text
}

function normalizeInteger(value, fallback, min, max) {
  const number = Number(value ?? fallback)
  const integer = Number.isFinite(number) ? Math.trunc(number) : fallback
  return Math.min(max, Math.max(min, integer))
}

function normalizeNumber(value, fallback, min, max) {
  const number = Number(value ?? fallback)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, number))
}

function normalizePage(value) {
  return normalizeInteger(value, 1, 1, 1000000)
}

function normalizePageSize(value) {
  return normalizeInteger(value, 10, 1, 100)
}

function normalizeGameSortBy(value) {
  const field = cleanText(value, 80)
  const camelToSnake = {joinAmount: 'join_amount', playersCount: 'players_count', createdAt: 'created_at', updatedAt: 'updated_at'}
  const clean = camelToSnake[field] || field
  return ['name', 'join_amount', 'players_count', 'status', 'created_at', 'updated_at'].includes(clean) ? clean : 'created_at'
}

function requiredText(value, field, maxLength) {
  const text = cleanText(value, maxLength)
  if (!text) throw new Error(field + ' is required.')
  return text
}

function cleanText(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function cleanId(value) {
  const text = cleanText(value, 128)
  return /^[A-Za-z0-9_-]+$/.test(text) ? text : ''
}

function idValue(value) {
  return typeof value === 'string' ? value : value?.id || ''
}

function maskLnAddress(value) {
  const text = cleanText(value, 320)
  if (!text || !text.includes('@')) return text
  const [name, domain] = text.split('@')
  if (name.length <= 4) return name + '@' + domain
  return name.slice(0, 3) + '...@' + domain
}
