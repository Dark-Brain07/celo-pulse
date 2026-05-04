# CeloPulse Smart Contracts

The foundation of the CeloPulse ecosystem relies on 5 highly optimized, gas-efficient smart contracts deployed on the Celo Mainnet.

## Architecture

The system is decoupled into isolated logic contracts to maintain security and allow for modular upgrades.

### 1. ActivityManager.sol
Handles the 24-hour cycle validation. Requires users to trigger `dailyCheckIn()` exactly once per cycle to advance their streak or reset it back to zero.

### 2. MicroActions.sol
A high-frequency interaction contract. It allows users to execute lightweight transactions rapidly (respecting a 30-second cooldown) to heavily increase onchain transaction counts.

### 3. ReferralSystem.sol
Creates a linked-list referral structure. Once a user triggers `registerWithReferral()`, both the inviter and the invitee are natively tracked for downstream split-rewards.

### 4. Leaderboard.sol
A pure view and composite-scoring contract. It ingests data mathematically from `ActivityManager` and `MicroActions` to derive a unified dynamic score. 

### 5. RewardDistributor.sol
Acts as the secure treasury vault. Dispenses CELO tokens to high-ranking individuals via standard pull-patterns (withdrawn by the user to avoid griefing vectors).

---

## 🌎 Mainnet Deployments (Celo Mainnet - 42220)

All contracts are fully verified on the Celo Sourcify explorer (Blockscout).

- **ActivityManager**: `0x52C26081bb28351Dae6A4D678B4b144bc5A0B956`
- **RewardDistributor**: `0xC0d5E5a0644CFFA5fE44fF1Cb542026e29E00c61`
- **MicroActions**: `0xDdD816E5e469279dcB385F039a470077b5F58930`
- **Leaderboard**: `0xb2137812BC7b1439C238693df4e2F7AB07691014`
- **ReferralSystem**: `0x7f4E1Cbe199B1ed7C85c382632Ee3B6fa7412838`

## Development & Testing

Built with Hardhat and OpenZeppelin standards.

```shell
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Alfajores
npx hardhat run scripts/deploy.js --network alfajores
```
