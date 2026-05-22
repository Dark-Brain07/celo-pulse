# @rajuice/celo-airdrop-sdk

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Celo](https://img.shields.io/badge/Network-Celo-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

A lightweight, strictly-typed TypeScript SDK for integrating the CeloPulse Proof-of-Activity ecosystem. This SDK provides a clean wrapper over `ethers.js` to interact with the `RewardDistributor` and `ActivityManager` smart contracts directly within your decentralized applications.

## 📦 Installation

Install the package via your preferred package manager:

```bash
npm install @rajuice/celo-airdrop-sdk
# or
yarn add @rajuice/celo-airdrop-sdk
# or
pnpm add @rajuice/celo-airdrop-sdk
```

## 🚀 Quick Start

The SDK provides a unified `CeloAirdropSDK` class to interact with the CeloPulse rewards system.

```typescript
import { CeloAirdropSDK } from '@rajuice/celo-airdrop-sdk';
import { ethers } from 'ethers';

// 1. Setup your provider and signer
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// 2. Initialize the SDK with contract addresses
const REWARD_DISTRIBUTOR = '0xC0d5E5a0644CFFA5fE44fF1Cb542026e29E00c61';
const ACTIVITY_MANAGER = '0x52C26081bb28351Dae6A4D678B4b144bc5A0B956';

const sdk = new CeloAirdropSDK(
  REWARD_DISTRIBUTOR,
  ACTIVITY_MANAGER,
  signer
);

// 3. Check Eligibility and Claim
const address = await signer.getAddress();
const isEligible = await sdk.isClaimable(address);

if (isEligible) {
  const tx = await sdk.claimReward();
  console.log('Transaction sent:', tx.hash);
  await tx.wait();
  console.log('Reward successfully claimed!');
}
```

## 📚 API Reference

### Initialization
```typescript
new CeloAirdropSDK(rewardAddress: string, activityAddress: string, signerOrProvider: ethers.Signer | ethers.Provider)
```

### Core Methods

- **`claimReward()`**: Validates caller eligibility and issues a standard state-transition transaction to claim accumulated CeloPulse rewards.
- **`checkEligibility(userAddress: string)`**: Returns a boolean indicating if the user is authorized to claim from the rewards pool.
- **`getRewardInfo(userAddress: string)`**: Returns detailed struct containing `totalClaimed`, `pending`, `lastClaim`, `claimCount`, and `canClaim`.
- **`getUserStats(userAddress: string)`**: Fetches on-chain activity metrics including `currentStreak`, `longestStreak`, and `totalActions`.
- **`isClaimable(userAddress: string)`**: A convenience wrapper combining pending balance checks with eligibility status.
- **`getPoolStats()`**: Returns global protocol analytics including the total reward pool size and total distributed assets.
- **`getContractMetadata()`**: Returns the instantiated network and contract addresses.

## 🛠 Development

To build the SDK locally:

```bash
npm install
npm run build
```

## 📜 License

This project is licensed under the MIT License.
