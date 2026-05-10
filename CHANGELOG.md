# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-05-10

### Added
- **Contracts**: Implementation of `Pausable` circuit breaker in `RewardDistributor`.
- **Contracts**: Batch execution support in `MicroActions` for gas optimization.
- **Contracts**: Administrative batch point updates in `Leaderboard`.
- **Frontend**: Pagination support for Leaderboard list.
- **Frontend**: Real-time user rank highlighting in Leaderboard.
- **Frontend**: Reusable `LoadingButton` component with standardized states.
- **Frontend**: Copy-to-clipboard success animations for referral links.
- **Frontend**: SVG empty state illustrations for transaction history.

### Fixed
- **Frontend**: Standardized date formatting using centralized `formatTimestamp` utility.
- **Docs**: Corrected testnet references from Sepolia to Alfajores in testing guides.

## [1.1.0] - 2026-05-09

### Added
- **Frontend**: Auto-refresh countdown indicator for wallet statistics.
- **Frontend**: ARIA accessibility attributes to all skeleton loading components.
- **Frontend**: Toast notification queue for stacking messages.
- **Contracts**: Maximum referral cap per user to prevent pool exhaustion.

### Refactored
- **Frontend**: Extracted `StatCard` into dedicated modular component.
- **Frontend**: Centralized gas price fetching into `useGasPrice` hook.

## [1.0.0] - 2026-05-08

### Added
- Initial release of CeloPulse dashboard.
- Core smart contract suite: `ActivityManager`, `Leaderboard`, `MicroActions`.
- MiniPay wallet integration and auto-connect.
