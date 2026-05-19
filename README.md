<div align="center">
  <img src="public/logo.png" alt="CeloPulse Logo" width="150"/>
  <h1>CeloPulse — Proof-of-Activity dApp</h1>
  <p>The definitive Proof-of-Activity (PoA) dashboard for the Celo Ecosystem — <strong>MiniPay Ready</strong></p>

  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-green.svg)](https://celo-pulse-omega.vercel.app/)
  [![Network](https://img.shields.io/badge/Network-Celo_Mainnet-yellow.svg)](https://celoscan.io/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.1-blue.svg)](https://nextjs.org/)
  [![MiniPay](https://img.shields.io/badge/MiniPay-Compatible-brightgreen.svg)](https://docs.celo.org/developer/build-on-minipay/overview)
</div>

---

## 📌 Problem & Solution

The **CeloPulse Dashboard** is a fast, responsive, and data-rich Web3 application built specifically for the Celo Ecosystem. It incentivizes and visualizes high-frequency onchain interactions.

### The Mechanism
1. **Connect Wallet:** Seamlessly integrate with any Celo-compatible wallet including **MiniPay** via Ethers/Wagmi.
2. **ERC-8004 Agent ID (Self Protocol):** Register your wallet as a cryptographically verifiable "human-backed agent" via the official ERC-8004 Identity Registry, minting an ERC-721 Agent NFT to expose secure agent endpoints.
3. **x402 Micropayments (thirdweb):** Execute native CELO and cUSD micropayments directly matching the thirdweb x402 specification for automated, zero-friction developer API settlement.
4. **Perform Micro-Actions:** Trigger gamified, low-stakes interactions (Daily Check-ins, Streaks, Gaming) that write to Celo Smart Contracts.
3. **Earn Rewards:** Achieve high ranks on the global leaderboard, earn badges, and win automatic CELO airdrops through the Reward Pool.
4. **Ascend Tiers:** Level up from Bronze to Platinum based on total on-chain interaction volume, unlocking higher reward multipliers and exclusive badges.

---

## 🎖️ Tiered Activity Architecture

CeloPulse implements a robust on-chain tiering system within `ActivityManager.sol` to track and reward long-term user engagement:

| Tier | Requirement | Benefits |
|------|-------------|----------|
| **Bronze** | 0+ Interactions | Base participation, standard rewards |
| **Silver** | 10+ Interactions | 1.2x Point multiplier, Silver badge |
| **Gold** | 50+ Interactions | 1.5x Point multiplier, Gold badge |
| **Platinum** | 100+ Interactions | 2.0x Point multiplier, Platinum badge, Priority claims |

The tiering logic is fully decentralized and can be verified via the `getUserStats` method on the ActivityManager contract. Referrers must meet a minimum activity threshold (Silver) to be eligible for dual-reward payouts, ensuring the growth remains organic and sybil-resistant.

---

## 📱 MiniPay Integration

CeloPulse is **fully optimized for MiniPay**, Opera's self-custodial stablecoin wallet on Celo:

- **Auto-detection:** Detects `window.ethereum.isMiniPay` to auto-connect without wallet popups
- **Fee Abstraction:** All transactions use **USDm** (cUSD) as gas fee currency via Celo's fee abstraction (`feeCurrency: 0x4F604735c1cF31399C6E711D5962b2B3E0225AD3`)
- **No Chain Switching:** Skips chain-switch dialogs when running inside MiniPay
- **Mobile-First UI:** Responsive design optimized for MiniPay's WebView
- **Zero Friction:** Users can daily check-in, play micro-actions, send tips, and claim rewards without gas popups

### Testing with MiniPay
See the full guide: [MINIPAY_TESTING.md](./MINIPAY_TESTING.md)

```bash
# 1. Start the dev server
npm run dev

# 2. Expose via ngrok
ngrok http 3000

# 3. Load the ngrok URL in MiniPay → Developer Settings → Load Test Page
```

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router + Server Components)
- **Styling:** Vanilla CSS Modules + Tailwind Utility Classes
- **Web3 Integration:** `ethers.js` v6 + Custom Celo SDKs
- **Wallet:** MiniPay + MetaMask + any EIP-1193 wallet
- **Analytics Visualization:** Integrated with `recharts` and dynamic SVG renderers powered by direct Blockscout developer REST API feeds and JSON-RPC query models.
- **Smart Contracts:** Solidity (Hardhat + OpenZeppelin)

---

## 📋 Smart Contracts (Celo Mainnet — Chain ID 42220)

All contracts are deployed and verified on Celo Mainnet via Blockscout:

| Contract | Address | Purpose |
|----------|---------|---------|
| **ActivityManager** | `0x52C26081bb28351Dae6A4D678B4b144bc5A0B956` | Handles 24h cycle check-ins and streak tracking |
| **RewardDistributor** | `0xC0d5E5a0644CFFA5fE44fF1Cb542026e29E00c61` | Treasury vault for CELO reward distribution |
| **MicroActions** | `0xDdD816E5e469279dcB385F039a470077b5F58930` | High-frequency gaming transactions (30s cooldown) |
| **Leaderboard** | `0xb2137812BC7b1439C238693df4e2F7AB07691014` | Composite scoring from activity + micro-actions |
| **ReferralSystem** | `0x7f4E1Cbe199B1ed7C85c382632Ee3B6fa7412838` | Dual-reward referral tracking |
| **ERC-8004 IdentityRegistry** | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` | Self Protocol verifiable AI Agent Identity (mints ERC-721 NFT) |
| **ERC-8004 ReputationRegistry** | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` | Trust & Attestation score tracker for AI-Agent activities |

Contract source code: [`packages/contracts/contracts/`](./packages/contracts/contracts/)

---

## 🚀 Quick Start — Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment variables
cp .env.example .env.local

# 3. Add your Blockscout API key to .env.local

# 4. Start the development server
npm run dev
```

Navigate to `http://localhost:3000` to view your dashboard.

---

## 📁 Project Structure

```
celo-pulse/
├── apps/
│   └── frontend/           # Next.js frontend app
│       └── src/
│           ├── hooks/       # useWallet.ts (MiniPay auto-connect)
│           ├── components/  # UI components (GasBanner, NetworkBadge, etc.)
│           └── app/         # Next.js App Router pages
├── packages/
│   ├── contracts/           # Solidity smart contracts (Hardhat)
│   │   ├── contracts/       # .sol files
│   │   ├── scripts/         # Deploy scripts
│   │   └── test/            # Contract tests
│   ├── celo-activity-helper/  # TypeScript SDK
│   ├── celo-airdrop-sdk/    # Airdrop SDK
│   ├── core/                # Shared utilities
│   └── sdk/                 # Client SDK
├── src/                     # Root-level source
├── MINIPAY_TESTING.md       # MiniPay testing guide
└── README.md                # This file
```

---

## 🔗 Deployed Contracts Map

| Contract Role | Responsibility |
|--------------|----------------|
| **ActivityManager** | Handles 24h cycle check-ins and calculates global streaks. |
| **MicroActions** | Allows rapid 30s-cooldown gaming actions resulting in 1-tx each. |
| **RewardDistributor**| Liquidity pool which dispenses rewards upon milestones. |
| **ReferralSystem** | Manages the dual-reward invite tracking mechanism. |
| **Leaderboard** | Calculates ranks based on composite onchain weighting. |

---

## 🛠️ Administrative & Operator Playbook

The CeloPulse contracts include advanced operational controllers designed for ecosystem safety and governance:

### 1. Circuit Breakers & Emergencies
- **ActivityManager / RewardDistributor Pausability**: The system owner can pause check-ins or reward disbursements under `Pausable` inheritance using standard `pause()` and `unpause()` write-calls.
- **ERC20 Token Recovery**: Stuck ERC20 tokens accidentally sent to the RewardDistributor can be retrieved using `recoverERC20(address token, uint256 amount)` by the contract owner.

### 2. Gamification & Leaderboard Integrity
- **Anti-Sybil Deductions**: Points can be deducted from users violating standard usage policies. Use `deductPoints(address user, uint256 points, string reason)` or its batch variant `batchDeductPoints(...)`.
- **Developer Cooldown Bypass**: For high-volume testing, developers can bypass the 30-second cooldown in `MicroActions` using `setCooldownBypass(address user, bool bypassed)`.

---

## 🧪 Environmental Considerations 
Ensure `.env.local` is fully populated. It MUST include your Blockscout API credentials specifically configured for the `Celo Mainnet (42220)`. Wait for 3-5 seconds on first load for the real-time API charts to inject data.

---

## 🔬 Local Sandbox & Hardhat Testing

You can compile, test, and deploy the contract suite locally using Hardhat:

```bash
# 1. Navigate to contracts package
cd packages/contracts

# 2. Compile contracts
npx hardhat compile

# 3. Run localized unit tests
npx hardhat test

# 4. Deploy to local node or Alfajores testnet
npx hardhat run scripts/deploy.js --network alfajores
```

Our testing suites verify all reentrancy locks, administrative access controls, and referral reward pools under synthetic Celo forks.

---

---

## 🗺️ Roadmap: The Future of CeloPulse

Our journey continues with upcoming features focused on governance, social graph integration, and cross-chain expansion:

### Phase 1: Tier 2 Governance (Q2 2026)
- **DAO Voting**: Users in Platinum tier unlock voting rights on reward pool allocation ratios.
- **Snapshot Integration**: Off-chain voting for high-frequency consensus on feature prioritization.

### Phase 2: Social Graph & Proof-of-Personhood (Q3 2026)
- **Talent Protocol Integration**: Direct sync with Talent Builder scores to boost leaderboard multipliers.
- **Warpcast Frames**: Perform daily check-ins directly within the Farcaster feed using native frames.

### Phase 3: Cross-Chain Pulse (Q4 2026)
- **L2 Expansion**: Deploying Pulse engines on Arbitrum and Optimism with unified cross-chain leaderboards.
- **Celo L2 Transition**: Native optimization for the upcoming Celo L2 architecture.

---

## 📜 License 
This project is covered under the MIT open-source license.

## Daily Workflow Tracking

The CeloPulse dashboard now includes a daily local workflow tracking component. This helps users track their daily streaks and accrued local points, completely safely in localStorage without external dependencies.

## Decoupled Frontend Transaction Event Broadcasting

To support reactive real-time dashboard updates without hard component dependencies, CeloPulse incorporates a custom, lightweight event dispatcher (`subscribeTxSuccess` / `dispatchTxSuccess` under `apps/frontend/src/lib/txEvents.ts`).

- **Decoupled Architecture**: Components emitting transaction actions (like `UserActions`) publish transaction confirmation events.
- **Dynamic Session Count**: Listening components (like `ActivityGuide` or dashboard stat rings) subscribe to these events and increment session transaction count indices instantly, removing the need for polling.
- **Zero Overhead**: Utilizes standard browser CustomEvents for zero impact on bundle sizes, completely side-stepping state synchronization lag.
