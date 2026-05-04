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
2. **Perform Micro-Actions:** Trigger gamified, low-stakes interactions (Daily Check-ins, Streaks, Gaming) that write to Celo Smart Contracts.
3. **Earn Rewards:** Achieve high ranks on the global leaderboard, earn badges, and win automatic CELO airdrops through the Reward Pool.

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
- **Analytics Visualization:** `recharts` / custom SVGs integrated with the active Blockscout API feed
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

## 🧪 Environmental Considerations 
Ensure `.env.local` is fully populated. It MUST include your Blockscout API credentials specifically configured for the `Celo Mainnet (42220)`. Wait for 3-5 seconds on first load for the real-time API charts to inject data.

---

## 📜 License 
This project is covered under the MIT open-source license.
