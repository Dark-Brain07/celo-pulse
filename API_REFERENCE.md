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
