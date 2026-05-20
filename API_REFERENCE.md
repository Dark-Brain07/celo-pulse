# CeloPulse SDK API Reference

Detailed documentation for the internal TypeScript SDKs used in the CeloPulse dashboard.

## CeloActivityHelper (`packages/celo-activity-helper`)

The core SDK for interacting with activity tracking, micro-actions, and leaderboards.

### Methods

#### `checkIn()`
- **Returns**: `Promise<TransactionResponse>`
- **Description**: Triggers the `dailyCheckIn` function on the ActivityManager contract.

#### `getUserTier(address: string)`
- **Returns**: `Promise<number>` (0: Bronze, 1: Silver, 2: Gold, 3: Platinum)
- **Description**: Returns the user's current engagement tier.

#### `calculateGasSavings(transactionCount: number)`
- **Returns**: `Object` `{ ethCostUSD, celoCostUSD, savingsUSD, multiplier }`
- **Description**: Utility method to estimate cost benefits of using Celo.

---

## CeloAirdropSDK (`packages/celo-airdrop-sdk`)

SDK focused on reward distribution and claim eligibility.

### Methods

#### `claimReward()`
- **Returns**: `Promise<TransactionResponse>`
- **Description**: Collects accumulated rewards from the RewardDistributor.

#### `isClaimable(address: string)`
- **Returns**: `Promise<boolean>`
- **Description**: Checks if the user has pending rewards and meets all eligibility criteria.

#### `getContractMetadata()`
- **Returns**: `Promise<Object>`
- **Description**: Returns version info and contract addresses for the current environment.

---

## Shared Types (`packages/core`)

Standard interfaces used across all packages.

- `ITransaction`: Represents an on-chain interaction.
- `IUserStats`: Composite object for user progress tracking.

---

## Blockscout Indexed Events

CeloPulse contracts emit standardized events to enable fast indexing and historical query filters via Blockscout:

### `ActivityManager`
- `ActivityRecorded(address indexed user, uint256 count, uint256 timestamp)`: Emitted upon registering a new activity.
- `TierUpdated(address indexed user, uint8 newTier, uint256 timestamp)`: Emitted when a user undergoes a tier promotion.

### `RewardDistributor`
- `RewardClaimed(address indexed user, uint256 amount, uint256 timestamp)`: Emitted upon claiming pending rewards.
- `RewardAccrued(address indexed user, uint256 amount)`: Emitted when action rewards accrue to the user.
- `PoolFunded(address indexed funder, uint256 amount)`: Emitted when the distributor pool receives extra funding.
- `RewardConfigUpdated(uint256 rewardPerAction, uint256 minThreshold, uint256 cooldown)`: Emitted when configurations change.

### `Leaderboard`
- `ScoreUpdated(address indexed user, uint256 newScore, uint256 timestamp)`: Emitted upon recalculating point updates.
- `PointsUpdated(address indexed user, uint256 pointsAdded, string reason)`: Emitted when adding score weights.
- `PointsDeducted(address indexed user, uint256 pointsSubtracted, string reason)`: Emitted upon penalty points deduction.
- `RankChanged(address indexed user, uint256 oldRank, uint256 newRank)`: Emitted when rank standings update.
- `NewRankedUser(address indexed user, uint256 initialScore)`: Emitted upon first registration on the leaderboard.
