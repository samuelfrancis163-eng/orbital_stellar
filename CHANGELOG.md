# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This file rolls up changes across the public packages: `@orbital/pulse-core`,
`@orbital/pulse-webhooks`, and `@orbital/pulse-notify`. Per-package changelogs
live in each package directory.

## [Unreleased]

### Added

- `@orbital/pulse-webhooks`: `verifyWebhookEdge` for Cloudflare Workers and
  Vercel Edge runtimes (Web Crypto API, no Node `crypto` dependency).
- `@orbital/pulse-core`: `allow_trust` and `set_trust_line_flags` operations
  normalized into `trustline.authorized` / `trustline.deauthorized` events.
- `@orbital/pulse-core`: `liquidity_pool_deposit` and `liquidity_pool_withdraw`
  operations normalized into `lp.deposited` / `lp.withdrawn` events.
- `@orbital/pulse-core`: `engine.stopped` notification emitted on `stop()`.
- `@orbital/pulse-core`: `EventEngine.unsubscribeAll()`.
- `@orbital/pulse-core`: claimable balance lifecycle events (`claimable.created`,
  `claimable.claimed`).
- `@orbital/pulse-core`: `manage_data` operations normalized into `data.set` /
  `data.cleared` events.
- `@orbital/pulse-core`: `engine.rate_limited` notification emitted when
  Horizon returns HTTP 429.
- `@orbital/pulse-core`: `bump_sequence` operation normalized into
  `account.bump_sequence` events.
- `@orbital/pulse-core`: DEX offer lifecycle events (`offer.created`,
  `offer.updated`, `offer.deleted`).
- `@orbital/pulse-core`: `create_account` operation normalized into
  `account.created` events.
- `@orbital/pulse-core`: optional filter predicate on `EventEngine.subscribe()`.
- `@orbital/pulse-core`: self-payments where `from === to` now emit a single
  `payment.self` event instead of separate `payment.received` and `payment.sent`
  events.

### Changed

- `@orbital/pulse-core`: `start()` now returns a boolean (`true` on a successful
  start, `false` if the engine was already running). Pass `{ strict: true }` to
  throw `EngineAlreadyStartedError` instead.
- `@orbital/pulse-core`: `WatcherNotification.timestamp` renamed to `emittedAt`
  to distinguish from the on-chain `created_at` timestamp used in other events.

### Fixed

- `@orbital/pulse-webhooks`: cap concurrent retries to prevent unbounded memory
  growth when consumer endpoints are unreachable.
- `@orbital/pulse-core`: align reconnect attempt numbers across logs and
  `engine.reconnecting` notifications.
- `@orbital/pulse-core`: warn when listeners are added after watcher stop.
