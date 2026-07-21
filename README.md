# StreetFighter

StreetFighter is an LNbits WebAssembly extension for paid public fighting game
matches. An LNbits user enables the extension, chooses a payout haircut, creates
a match with a join amount, and shares the public match link. Two players enter
Lightning addresses and pay invoices to join. The winner receives the pot minus
the configured haircut.

The public page includes the StreetFighter canvas game from
`/home/ben/Projects/StreetFighter`, a join flow, a player list, and a troll box.
Realtime move updates and troll-box sync are intentionally left as placeholders
until LNbits core exposes websocket support for WASM extensions.

## Extension Details

- Extension ID: `streetfighterwasm`
- Extension type: `wasm`
- Minimum LNbits version: `1.5.5`
- Admin route: `/ext/streetfighterwasm`
- Public game route: `/ext/streetfighterwasm/games/{game_id}`
- WASM module: `wasm/module.wasm`

## Permissions

This extension requests:

- `ext.storage.read` and `ext.storage.write` for settings, games, players, and
  payout state.
- `ext.storage.read_public` for the public match page.
- `wallet.list` so the admin UI can use the installing user's wallet.
- `wallet.create_invoice_public` to create public join invoices.
- `wallet.pay_invoice` to pay the winner's Lightning address.

## Current Flow

1. Open the StreetFighter extension in LNbits.
2. Enable matches, choose the wallet, and set the haircut percentage.
3. Create a match with a title and join amount.
4. Share the public match link with two players.
5. Each player enters a Lightning address and pays the join invoice.
6. Settled payments assign the first player to Ryu and the second to Ken.
7. The public page starts the local canvas fight once a paid player opens their
   private player-token URL.
8. For now, the page can record the local player's win and the admin can settle
   payout from the games table.

Both sides use the player-1 controls because the intended realtime version will
run each player on a separate device. Until websocket support is added, movement
and chat are local placeholders rather than synchronized state.

## Build

From this extension's development directory:

```bash
cd lnbits/extensions/streetfighterwasm/dev
npm run build:wasm
```

The build writes the installable component to `../wasm/module.wasm`.

Static UI changes in `static/` do not require a WASM rebuild, but LNbits or the
browser may need a hard refresh to pick up changed assets.
