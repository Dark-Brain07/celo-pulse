<div align="center">
  <img src="public/logo.png" alt="CeloPulse Logo" width="150"/>
  <h1>CeloPulse — Frontend Dashboard</h1>
  <p>The definitive Proof-of-Activity (PoA) dashboard for the Celo Ecosystem.</p>

  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-green.svg)](https://vercel.com/)
  [![Network](https://img.shields.io/badge/Network-Celo_Mainnet-yellow.svg)](https://celoscan.io/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.1-blue.svg)](https://nextjs.org/)
</div>

## 📌 Problem & Solution
The **CeloPulse Dashboard** is a fast, responsive, and data-rich Web3 application built specifically for the Celo Ecosystem. It incentivizes and visualizes high-frequency onchain interactions.

### The Mechanism
1. **Connect Wallet:** Seamlessly integrate with any Celo-compatible wallet via Ethers/Wagmi.
2. **Perform Micro-Actions:** Trigger gamified, low-stakes interactions (Daily Check-ins, Streaks, Gaming) that write to Celo Smart Contracts.
3. **Earn Rewards:** Achieve high ranks on the global leaderboard, earn badges, and win automatic CELO airdrops through the Reward Pool.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router Server Components)
- **Styling:** Vanilla CSS Modules + Tailwind Utility Classes
- **Web3 Integration:** `ethers.js` v6 + Custom Celo SDKs
- **Analytics Visualization:** `recharts` / custom SVGs integrated with the active Blockscout API feed.

## 🚀 Quick Start Local Development

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

## 🔗 Deployed Contracts Map

| Contract Role | Responsibility |
|--------------|----------------|
| **ActivityManager** | Handles 24h cycle check-ins and calculates global streaks. |
| **MicroActions** | Allows rapid 30s-cooldown gaming actions resulting in 1-tx each. |
| **RewardDistributor**| Liquidity pool which dispenses rewards upon milestones. |
| **ReferralSystem** | Manages the dual-reward invite tracking mechanism. |
| **Leaderboard** | Calculates ranks based on composite onchain weighting. |

## 🧪 Environmental Considerations
Ensure `.env.local` is fully populated. It MUST include your Blockscout API credentials specifically configured for the `Celo Mainnet (42220)`. Wait for 3-5 seconds on first load for the real-time API charts to inject data.

## 📜 License
This project is covered under the MIT open-source license.
