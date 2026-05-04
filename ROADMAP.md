# Roadmap

Orbital's open-source packages are on a multi-year trajectory from Stellar event SDKs to a complete programmable runtime — hooks, payments, identity, agent payments, and the standards behind them. This document describes the planned work in concrete terms. Dates are targets, not guarantees.

---

## Phase 0 — Foundation (now, `v0.x`)

**Goal:** SDKs that any Stellar developer can install and use today.

| Area | Status |
|---|---|
| Classic operation event streaming via Horizon SSE | ✅ Done |
| Full classic operation taxonomy (payments, accounts, trustlines, offers, claimables, LP, data, manage-data, bump-sequence) | ✅ Done |
| HMAC-signed webhook delivery with retry, backoff, and concurrent-retry caps | ✅ Done |
| Edge-runtime webhook verification (Cloudflare Workers, Vercel Edge) | ✅ Done |
| React hooks (`useStellarEvent`, `useStellarPayment`, `useStellarActivity`) | ✅ Done |
| Public marketing + documentation site (`apps/web`) | ✅ Done |
| Testnet + mainnet support | ✅ Done |
| CI, CodeQL, and Dependabot | ✅ Done |

---

## Phase 1 — Production-grade SDK (Q2–Q3 2026, `v1.0`)

**Goal:** a stability-pledged `v1.0` that teams can build on without worrying about breaking changes.

- **Soroban event subscription** — subscribe to smart contract events by contract ID and topic filter via Stellar RPC.
- **ABI Registry client** — auto-decode Soroban events into typed, human-readable JSON using a community-contributed contract ABI registry.
- **Discriminated union refinement** — narrow `NormalizedEvent` types so consumers can `switch` on `event.type` with full type narrowing.
- **Replay primitives in pulse-webhooks** — pluggable durable adapters (Redis, Postgres, S3) so consumers can implement their own replay layer.
- **Cursor persistence in pulse-core** — resumable streams so a crash doesn't lose events.
- **Starter boilerplates** — `orbital-next-starter`, `orbital-express-starter`, `orbital-anchor-starter`.
- **v1.0 stability pledge** — `@orbital/pulse-core`, `@orbital/pulse-webhooks`, and `@orbital/pulse-notify` adopt strict semver with a documented stability contract.
- **npm publish** — all three packages published to npm under `@orbital/`.

---

## Phase 2 — SDK Ecosystem (2027)

**Goal:** own the full Stellar developer SDK surface with a coherent, composable package family.

- **`@orbital/hooks`** — complete data-hook library: `useAccount`, `useBalance`, `useTransaction`, `useOrderBook`, full account activity surface.
- **`@orbital/payments`** — transaction primitives: send, receive, path payment, payroll batch, with typed results.
- **`@orbital/auth`** — embedded wallets via WebAuthn/passkeys, fee sponsorship, WalletConnect.
- **`@orbital/analytics`** — client library and event-volume reference dashboards.
- **Reactor contracts** — reference SDK and library of Soroban Rust contracts that react to events from other contracts. Open for anyone to fork.
- **First SEP submission** — propose a Stellar Ecosystem Proposal formalizing the event normalization format so other implementations can interoperate.

---

## Phase 3 — Trust & Agent Layer (2028+)

**Goal:** turn event subscriptions into programmable intent pipelines and capture the AI-agent economy on Stellar.

- **`@orbital/x402`** — Express/Next.js middleware for payment-gated API access via the HTTP 402 / x402 protocol.
- **`@orbital/agent-sdk`** — payment client for autonomous AI agents; integrates with x402 for agent-to-agent and agent-to-service payments on Stellar.
- **`@orbital/anchor-sdk`** — client library for SEP-24 and SEP-31 lifecycle events.
- **Intent compiler** — declare "when X happens, do Y" as a typed intent; the compiler produces a webhook + reactor contract + replay policy. Open-sourced at maturity.
- **Shadow-Fork simulator (OSS core)** — fork any ledger state, inject hypothetical operations, replay Soroban invocations.
- **Additional SEPs** — reactor contract spec, intent schema, attestation format.

---

## Phase 4 — Protocol Permanence (long-term)

**Goal:** become the protocol layer on Stellar that other implementations follow.

- **Identity layer** — reference implementation for passkey-based embedded wallets and federated Stellar addresses, aiming to become Stellar's standard sign-in primitive.
- **Reactor-contract library** — community-contributed library of hundreds of composable reactor patterns, maintained as an OSS standard.
- **10+ SEPs** — spanning identity, events, reactors, x402, compliance reporting, attestation formats. Standards authorship is the long-term leverage; shipping features is secondary to writing the protocols others follow.

---

## What's not on this roadmap

- Support for non-Stellar networks
- Hosted/managed infrastructure (a hosted runtime is a separate product, not part of this open-source repository)
- Operational dashboards and admin UIs (these belong in deployment tooling, not the SDKs)

---

## Contributing to the roadmap

If you have a feature request or want to propose a change to the roadmap, open a GitHub Discussion in the [Ideas category](https://github.com/orbital/orbital/discussions/categories/ideas). Roadmap items that attract significant community interest move up in priority.
