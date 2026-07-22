# LNQ1 Arena

LNQ1 is an LNbits WebAssembly extension for paid multiplayer Quake 1
deathmatches in the browser. An arena owner selects an LNbits wallet, chooses a
payout haircut, sets the entry price, and shares the public arena link. Players
enter a Lightning address and pay an invoice to join the live match.

Each frag transfers the defeated player's entry stake to the killer, minus the
arena's configured haircut. Payouts are attempted immediately to the killer's
Lightning address. Arenas remain open for new players and support up to five
simultaneous paid players.

The public page embeds the Quake game, displays the current players and local
sats total, and includes a live activity feed. Player movement and game state
are synchronized over LNbits extension websockets, with HTTP fallback when a
websocket send fails. Heartbeats remove stale players from the active roster.

## Extension details

- Extension ID: `lnq1`
- Extension type: `wasm`
- Minimum LNbits version: `1.5.6`
- Admin route: `/ext/lnq1`
- Public arena route: `/ext/lnq1/games/{game_id}`
- WASM module: `wasm/module.wasm`
- Maximum active players per arena: 5
- Minimum entry price: 50 sats, with no maximum imposed by LNQ1

## Gameplay and payments

1. Open LNQ1 in LNbits and select the wallet used for entry payments and kill
   payouts.
2. Enable arenas and choose the default haircut percentage.
3. Create an arena with a title and entry price, then share its public link.
4. Each player supplies a Lightning address and pays the generated invoice.
5. Once payment settles, the player's private token admits them to the arena.
6. Player state, movement, joins, departures, and frags are synchronized with
   the other connected players.
7. When a player is fragged, their paid entry amount minus the percentage
   haircut is paid immediately to the killer's Lightning address.
8. The defeated player leaves the active roster and may pay to join again.

For example, with a 100-sat entry and a 10% haircut, a successful frag pays 90
sats to the killer.

## Permissions

LNQ1 requests the following extension capabilities:

- Storage read and write access for settings, arenas, players, presence, and
  payout state.
- Wallet listing so the arena owner can choose an LNbits wallet.
- Public invoice creation for player entry payments.
- Invoice payment and background-payment permission for automatic kill
  payouts to Lightning addresses.
- Websocket subscription for realtime multiplayer messages.

Background-payment authorization is optional until an automatic payout is
required. The approved maximum must be large enough for the arena's possible
kill payout.

## Build and checks

From the extension development directory:

```bash
cd lnbits/extensions/lnq1/dev
npm run check
npm run build:wasm
```

The WASM build writes the installable component to `../wasm/module.wasm`.

After changing the browser game source under `static/game/src`, rebuild the
browser bundle separately:

```bash
npm run build:game
```

Other static UI changes do not require a WASM rebuild, although the browser may
need a hard refresh before it loads updated assets.
