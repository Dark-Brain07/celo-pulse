# CeloPulse ⚡

**Proof-of-Activity dApp for the Celo Ecosystem**

CeloPulse is a complete Web3 activity platform that rewards users for consistent onchain engagement. Built to maximize genuine user activity through daily check-ins, micro-actions, tipping, referrals, and leaderboard competition.

## 🏗️ Architecture

```
celo-pulse/
├── apps/
│   └── frontend/              # Next.js 15 + Tailwind 4 dashboard
├── packages/
│   ├── contracts/             # 5 Solidity smart contracts + Hardhat
│   ├── celo-airdrop-sdk/      # TypeScript SDK for rewards
│   └── celo-activity-helper/  # TypeScript SDK for activities
├── .env.example
└── package.json               # npm workspaces root
```

## 📦 Smart Contracts

| Contract | Purpose | Key Functions |
|---|---|---|
| **ActivityManager** | Daily check-ins & streaks | `dailyCheckIn()`, streak tracking, milestones |
| **RewardDistributor** | Reward pool & claims | `claimReward()`, `fundPool()` |
| **MicroActions** | Lightweight micro-transactions | `sendTip()`, `playAction()`, `quickReact()` |
| **Leaderboard** | On-chain ranking system | `addPoints()`, `getTopUsers()` |
| **ReferralSystem** | User growth & referrals | `registerWithReferral()`, dual rewards |

All contracts emit events for **Blockscout indexing**.

## 🔁 Activity Loop (Per Session)

Target: **8-11 transactions per user per session**

1. `dailyCheckIn()` → 1 tx (20h cooldown)
2. `playAction()` x3-5 → 3-5 tx (30s cooldown!)
3. `quickReact()` x2-3 → 2-3 tx
4. `sendTip()` → 1 tx
5. `claimReward()` → 1 tx

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask or Celo-compatible wallet
- CELO tokens for gas

### Install & Run Frontend
```bash
cd apps/frontend
npm install --legacy-peer-deps
npm run dev
```

### Deploy Contracts
```bash
cd packages/contracts
npm install
cp ../../.env.example ../../.env
# Edit .env with your DEPLOYER_PRIVATE_KEY

# Deploy to Alfajores testnet
npm run deploy:testnet

# Deploy to Celo mainnet
npm run deploy
```

Contracts are **automatically verified on Blockscout** after deployment.

### Build SDKs
```bash
cd packages/celo-airdrop-sdk && npm install && npm run build
cd packages/celo-activity-helper && npm install && npm run build
```

## 🌐 Vercel Deployment

1. Import the repo on Vercel
2. Set **Root Directory**: `apps/frontend`
3. Add environment variables from `.env.example`
4. Deploy!

## 🎨 UI Features

- Dark neon dashboard with glassmorphism
- Animated stat counters
- Interactive SVG charts
- Leaderboard with rank badges
- Activity session guide with TX progress ring
- 8 achievement badges with progress tracking
- Referral panel with Twitter/Telegram share
- Low gas warning banner with faucet link
- Live Blockscout transaction feed

## 📡 Blockscout Integration

All contracts emit events that Blockscout indexes:
- `CheckIn`, `NewUser`, `MilestoneReached`
- `RewardClaimed`, `PoolFunded`
- `TipSent`, `ActionPerformed`, `ActionCombo`
- `ScoreUpdated`, `NewRankedUser`
- `UserRegistered`, `ReferralRewardPaid`

## 📄 License

MIT
