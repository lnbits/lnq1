import assertModule from 'assert'
import {promises as fs} from 'fs'

const assert = assertModule.strict
const source = (
  await fs.readFile(new URL('../../static/public.js', import.meta.url), 'utf8')
).replace(
  "lnq1.ready = initLnq1().catch(error => console.error('[lnq1]', error))",
  ''
)

const savedValues = []
const windowMock = {
  location: {href: 'https://example.com/ext/lnq1/games/arena_1'},
  history: {replaceState() {}},
  createLNbitsExtensionClient() {
    return {
      setSessionValue(key, value) {
        savedValues.push({key, value})
        return Promise.resolve()
      }
    }
  }
}
const documentMock = {getElementById() { return null }}

const {lnq1, debitLocalPlayer} = Function(
  'window',
  'document',
  `${source}; return {lnq1, debitLocalPlayer}`
)(windowMock, documentMock)

lnq1.localPlayerId = 'player_1'
lnq1.session['lnq1.satsTally'] = '20'

assert.equal(debitLocalPlayer('player_1', 10), true)
assert.equal(lnq1.session['lnq1.satsTally'], '10')
assert.equal(debitLocalPlayer('player_1', 10), false)
assert.equal(lnq1.session['lnq1.satsTally'], '10')

lnq1.localPlayerId = 'player_2'
assert.equal(debitLocalPlayer('player_2', 10), true)
assert.equal(lnq1.session['lnq1.satsTally'], '0')
assert.deepEqual(savedValues.map(item => item.value), ['10', '0'])

console.log('LNQ1 frontend sat tally tests passed')
