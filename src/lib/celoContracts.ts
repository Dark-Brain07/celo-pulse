/**
 * Celo Ecosystem Contract Constants
 *
 * Canonical addresses for all deployed Celo Pulse contracts
 * and stable-token addresses on Celo Mainnet.
 */

// ─── Contract Addresses ───

export const CELO_CONTRACTS = {
  CUSD: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  CEUR: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
  ACTIVITY_MANAGER: "0x52C26081bb28351Dae6A4D678B4b144bc5A0B956",
  REWARD_DISTRIBUTOR: "0xC0d5E5a0644CFFA5fE44fF1Cb542026e29E00c61",
  MICRO_ACTIONS: "0xDdD816E5e469279dcB385F039a470077b5F58930",
  LEADERBOARD: "0xb2137812BC7b1439C238693df4e2F7AB07691014",
  REFERRAL_SYSTEM: "0x7f4E1Cbe199B1ed7C85c382632Ee3B6fa7412838",
  ERC8004_IDENTITY: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
  ERC8004_REPUTATION: "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63",
} as const;

// ─── Network Configuration ───

export const CELO_MAINNET = {
  chainId: 42220,
  rpcUrl: "https://forno.celo.org",
  blockscoutApi: "https://explorer.celo.org/mainnet/api",
  name: "Celo Mainnet",
} as const;
