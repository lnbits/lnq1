import assertModule from 'assert'
import {promises as fs} from 'fs'

const assert = assertModule.strict

async function payoutWith(payLnurl, request) {
  let source = await fs.readFile(new URL('../src/index.js', import.meta.url), 'utf8')
  source = source
    .replace(/^import .*\n\n/, '')
    .replace(/export function /g, 'function ')
  const payPlayer = Function(
    'storage',
    'system',
    'wallet',
    'websocket',
    `${source}; return payPlayer`
  )({}, {}, {payLnurl}, {})
  return payPlayer(request)
}

async function createGameWith(joinAmount) {
  let source = await fs.readFile(new URL('../src/index.js', import.meta.url), 'utf8')
  source = source
    .replace(/^import .*\n\n/, '')
    .replace(/export function /g, 'function ')
  let storedGame = null
  const storage = {
    get(table) {
      if (table === 'lnq1_settings') {
        return {id: 'lnq1-settings', enabled: true, wallet_id: 'wallet_1', haircut: 0}
      }
      return null
    },
    set(table, row) {
      if (table === 'lnq1_games') storedGame = row
    }
  }
  const system = {id() { return 'arena_1' }, now() { return 1_700_000_000 }}
  const createLnq1Game = Function(
    'storage',
    'system',
    'wallet',
    'websocket',
    `${source}; return createLnq1Game`
  )(storage, system, {}, {})
  const response = JSON.parse(createLnq1Game(JSON.stringify({joinAmount})))
  assert.equal(response.ok, true, response.error)
  return {game: response.data.game, storedGame}
}

const baseRequest = {
  walletId: 'wallet_1',
  lnAddress: 'winner@example.com',
  amount: 9,
  maxAmount: 10,
  comment: 'LNQ1 kill payout',
  description: 'LNQ1 kill payout in arena',
  extra: {}
}

{
  const requests = []
  const payout = await payoutWith(request => {
    requests.push(request)
    if (request.amount === 9) {
      return {ok: false, error: 'Amount 9000 is smaller than minimum 10000.0.'}
    }
    return {ok: true, paymentHash: 'paid_10', amountMsat: 10000}
  }, baseRequest)

  assert.deepEqual(requests.map(request => request.amount), [9, 10])
  assert.equal(payout.ok, true)
  assert.equal(payout.amount, 10)
  assert.equal(payout.requestedAmount, 9)
  assert.equal(payout.paymentHash, 'paid_10')
}

{
  const requests = []
  const payout = await payoutWith(request => {
    requests.push(request)
    return {ok: false, error: 'Amount 9000 is smaller than minimum 11000.0.'}
  }, baseRequest)

  assert.deepEqual(requests.map(request => request.amount), [9])
  assert.equal(payout.ok, false)
  assert.equal(payout.amount, 9)
}

{
  const minimum = await createGameWith(50)
  assert.equal(minimum.game.joinAmount, 50)
  assert.equal(minimum.storedGame.join_amount, 50)

  const clamped = await createGameWith(49)
  assert.equal(clamped.game.joinAmount, 50)
  assert.equal(clamped.storedGame.join_amount, 50)

  const large = await createGameWith(100_000_001)
  assert.equal(large.game.joinAmount, 100_000_001)
  assert.equal(large.storedGame.join_amount, 100_000_001)
}

console.log('LNQ1 backend payout and join amount tests passed')
