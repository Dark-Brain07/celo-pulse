# Celo Airdrop SDK

A lightweight, strictly-typed Typescript SDK for integrating the `RewardDistributor.sol` airdrop distribution contract directly into your dApps.

## 📦 Installation

```bash
npm install celo-airdrop-sdk
# or
yarn add celo-airdrop-sdk
```

## 🚀 Usage

The SDK provides singleton access to interact with the CeloPulse Reward system.

```typescript
import { AirdropDistributor } from 'celo-airdrop-sdk';
import { ethers } from 'ethers';

// Automatically handles contract ABI instantiation
const provider = new ethers.JsonRpcProvider('https://forno.celo.org');
const signer = await provider.getSigner();

const distributor = new AirdropDistributor(signer);

// Claim rewards based on on-chain eligibility
const tx = await distributor.claimReward();
await tx.wait();

// Query available rewards pool
const poolTotal = await distributor.getRewardPoolSize();
```

## API Reference

### `claimReward()`
Validates caller eligibility and issues a standard state-transition call to extract mapped CELO rewards from the treasury.

### `getRewardPoolSize()`
Returns the global numeric capacity of the Reward Distributor contract.

## License
MIT
