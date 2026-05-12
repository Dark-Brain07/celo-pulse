# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-05-13

### Added
- **Frontend**: Implemented premium "Success Pulse" notification animations for tactile user feedback.
- **Frontend**: Enhanced `NotFound` error page with interactive Celo-themed hover states and dashboard navigation.
- **Frontend**: Integrated "Quick Tip" amount presets (0.1, 0.5, 1.0 CELO) to streamline micro-transactions.
- **Frontend**: Implemented visual rank change indicators (up/down arrows) in `Leaderboard` to track session trends.
- **Frontend**: Expanded social reach by integrating WhatsApp and Warpcast intent-sharing for referral codes.
- **Frontend**: Extended `Skeleton` loading states with configurable animation speeds matching network latency.
- **SDK**: Implemented `getInteractionHistory` in `celo-activity-helper` with native block-range event filtering.
- **SDK**: Added `isClaimable` convenience method to `celo-airdrop-sdk` for unified eligibility checks.
- **Contracts**: Refactored `ActivityManager` unit tests to align with current `recordActivity` implementation.
- **Contracts**: Implemented high-volume stress testing suite for `ActivityManager` interaction counters.

## [1.4.0] - 2026-05-12

### Added
- **Frontend**: Integrated active check-in streak and milestone level stats cards inside `DashboardStats`.
- **Frontend**: Enabled dynamic CeloScan contract explorer queries in `Footer` mapping to specific chainIds.
- **Frontend**: Implemented hard reload fallback recovery actions within `ErrorBoundary` fallback panels.
- **Frontend**: Integrated automated RPC latency metrics computation in the `NetworkBadge` component.
- **Frontend**: Integrated real-time on-chain cUSD ERC20 token balance tracking inside the user `WalletStats` container.
- **Frontend**: Toggled low-gas manually triggered simulation switches inside `GasBanner` for developer convenience.
- **Contracts**: Implemented emergency pause hooks (`Pausable`) in `ActivityManager.sol` for user check-in safeguards.
- **Contracts**: Implemented cooldown bypass admin configurations and remaining seconds queries in `MicroActions.sol`.
- **Contracts**: Implemented score deduction penalty administration features in `Leaderboard.sol`.

## [1.3.0] - 2026-05-11

### Added
- **Frontend**: Integrated `recharts` for weekly activity trend visualizations in `AnalyticsPanel`.
- **Frontend**: Implemented a network-aware `switchNetwork` helper to trigger chain transitions programmatically from the UI.
- **Frontend**: Integrated a reactive warning prompt in `Header` alerting users on incorrect chain selections.
- **Frontend**: Implemented state-based interactive hover tooltips explaining requirement thresholds for `StreakBadges`.
- **Frontend**: Extracted activity suggestions into modular `ActivityStep` sub-components.
- **Frontend**: Integrated action-type dropdown filtering in `TransactionHistory`.
- **Contracts**: Implemented on-chain milestone tier status (Bronze to Platinum) in `ActivityManager.sol`.
- **Contracts**: Implemented referrer minimum-activity checks in `ReferralSystem.sol` for sybil-resistant rewards.
- **Contracts**: Integrated `recoverERC20` recovery safety features in `RewardDistributor.sol`.
- **SDK**: Added `getUserTier` and `getTierName` on-chain query wrappers to `celo-activity-helper`.
- **SDK**: Implemented prefixed structured error formatting in `celo-airdrop-sdk`.

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
