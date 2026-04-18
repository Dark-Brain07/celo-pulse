# Celo Activity Helper SDK

A developer-friendly abstraction layer for interacting with the `ActivityManager`, `MicroActions`, `ReferralSystem`, and `Leaderboard` smart contracts on the Celo network.

This SDK parses complex ABI data and exposes simple, typed classes for seamless frontend and backend integrations.

## 📦 Installation

```bash
npm install celo-activity-helper
# or
yarn add celo-activity-helper
```

## 🚀 Quick Usage

```typescript
import { ActivityHelper, ActionSDK, ReferralSDK } from 'celo-activity-helper';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://forno.celo.org');
const signer = await provider.getSigner();

// 1. Maintain Daily Activity Streaks
const activity = new ActivityHelper(signer);
await activity.dailyCheckIn();
const streak = await activity.getStreak(await signer.getAddress());

// 2. Execute Micro-Actions
const gamification = new ActionSDK(signer);
await gamification.playAction(); // Adheres to rigid 30s cooldown

// 3. Register Referrals
const tracker = new ReferralSDK(signer);
await tracker.registerWithReferral('0xSponsorAddress...');
```

## 🧠 Why use this SDK?

1. **Type Safety:** Built-in TypeScript support guarantees you're submitting the right params to Celo.
2. **Error Handling:** Wraps rigid EVM revert errors (like `CooldownActive()`) into readable JS exceptions.
3. **Zero ABI Management:** All ABI arrays and deployed mainnet addresses are statically wrapped inside the library, saving you bundle size and fetching trips.

## License
MIT
