# Orbital

**Stellar's event SDKs — TypeScript + React.**

Three MIT-licensed packages for building real-time Stellar applications: an event engine that normalizes Horizon and Soroban output into typed events, HMAC-signed webhook delivery, and React hooks for live data.

```bash
pnpm add @orbital/pulse-core @orbital/pulse-webhooks @orbital/pulse-notify
```

## Why Orbital

Stellar's official APIs give you the raw firehose — Horizon for classic operations, Stellar RPC for Soroban. Turning that firehose into production application events has been a build-it-yourself problem for every team on the network. Orbital ships the primitives once, openly.

- **Typed event taxonomy** — payments, account ops, trustlines, offers, claimable balances, liquidity pools, data, and (soon) Soroban events, all normalized.
- **HMAC-signed webhook delivery** — retry, timeout, SSRF protection, edge-runtime verification (Cloudflare Workers, Vercel Edge).
- **React hooks** — `useStellarEvent`, `useStellarPayment`, `useStellarActivity` for live data in the browser.
- **Soroban-aware** — classic ops and smart contract events through one API.

## Packages

| Package | Description |
|---|---|
| [`@orbital/pulse-core`](./packages/pulse-core) | EventEngine: Horizon + Soroban subscription, normalization, watcher pub/sub |
| [`@orbital/pulse-webhooks`](./packages/pulse-webhooks) | HMAC-signed webhook delivery + verification (Node + Edge runtimes) |
| [`@orbital/pulse-notify`](./packages/pulse-notify) | React hooks (`useStellarEvent`, `useStellarPayment`, `useStellarActivity`) |

## Quickstart

```ts
import { EventEngine } from "@orbital/pulse-core";

const engine = new EventEngine({ network: "testnet" });
engine.start();

const watcher = engine.subscribe("GABC...YOUR_ACCOUNT");
watcher.on("payment.received", (event) => {
  console.log(`+${event.amount} ${event.asset} from ${event.from}`);
});
```

## Architecture

```
Stellar Network (Horizon + Stellar RPC)
        │
        ▼
@orbital/pulse-core
EventEngine · Watcher · Normalization · Reconnect
        │
   ┌────┴─────────────────┐
   ▼                      ▼
pulse-webhooks      pulse-notify (React)
HMAC delivery       useStellarEvent, useStellarPayment
```

## Production hosting

Running event subscriptions in production requires multi-region orchestration, persistent webhook registries, replay, and observability. **Orbital Cloud** — a managed runtime built on these packages — is in development. Until it ships, the SDKs run great against testnet for development and prototyping.

## Roadmap

- **Now** — Full classic operation taxonomy (payments, accounts, trustlines, offers, claimables, liquidity pools, data, manage-data, claimable balances, bump-sequence)
- **Q2–Q3 2026** — Soroban event subscription, ABI registry client, v1.0 stability pledge, npm publish
- **Q4 2026+** — `@orbital/hooks` (data hooks), `@orbital/payments`, `@orbital/auth`, `@orbital/x402`, first SEP submission

See [`ROADMAP.md`](./ROADMAP.md) for the full plan.

## Contributing

We welcome contributions from the Stellar community. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup, coding standards, and PR process.

- Browse [issues tagged `good-first-issue`](https://github.com/orbital/orbital/labels/good-first-issue)
- Run the test suite: `pnpm test`

## License

MIT — see [`LICENSE`](./LICENSE). Free to use in commercial and open-source projects.

## Community

- Discord: *(invite link)*
- Twitter: `@orbitalstellar`
- GitHub Discussions: https://github.com/orbital/orbital/discussions
