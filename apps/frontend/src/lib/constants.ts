/**
 * CeloPulse Constants
 * Centralized configuration for contract addresses, network params, and app settings.
 */

// ─── Network Configuration ───

export const CELO_MAINNET = {
  chainId: 42220,
  name: "Celo Mainnet",
  rpcUrl: "https://forno.celo.org",
  blockExplorer: "https://celoscan.io",
  currency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
} as const;

export const CELO_ALFAJORES = {
  chainId: 44787,
  name: "Celo Alfajores Testnet",
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  blockExplorer: "https://alfajores.celoscan.io",
  currency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
} as const;

// ─── Contract Addresses (Mainnet) ───

export const CONTRACT_ADDRESSES = {
  ActivityManager: "0x52C26081bb28351Dae6A4D678B4b144bc5A0B956",
  RewardDistributor: "0xC0d5E5a0644CFFA5fE44fF1Cb542026e29E00c61",
  MicroActions: "0xDdD816E5e469279dcB385F039a470077b5F58930",
  Leaderboard: "0xb2137812BC7b1439C238693df4e2F7AB07691014",
  ReferralSystem: "0x7f4E1Cbe199B1ed7C85c382632Ee3B6fa7412838",
} as const;

// ─── Activity Thresholds ───

export const ACTIVITY_CONFIG = {
  /** Minimum time between daily check-ins (seconds) */
  CHECKIN_COOLDOWN: 20 * 60 * 60, // 20 hours
  /** Grace period for maintaining streak (seconds) */
  STREAK_WINDOW: 48 * 60 * 60, // 48 hours
  /** Minimum time between micro-actions (seconds) */
  ACTION_COOLDOWN: 30, // 30 seconds
  /** Actions needed for combo bonus */
  COMBO_THRESHOLD: 5,
} as const;

// ─── Milestone Definitions ───

export const MILESTONES = [
  { checkIns: 7, name: "Weekly Warrior", emoji: "🏅", color: "#CD7F32" },
  { checkIns: 30, name: "Monthly Master", emoji: "🥈", color: "#C0C0C0" },
  { checkIns: 100, name: "Century Champion", emoji: "🥇", color: "#FFD700" },
] as const;

// ─── Referral Configuration ───

export const REFERRAL_CONFIG = {
  /** Reward for the person who invites (in CELO) */
  referrerReward: 0.0005,
  /** Welcome reward for new user (in CELO) */
  refereeReward: 0.0002,
} as const;

// ─── API Configuration ───

export const API_CONFIG = {
  blockscoutBaseUrl: "https://explorer.celo.org/mainnet/api",
  /** Polling interval for live data refresh (ms) */
  pollInterval: 15000,
  /** Maximum retries for failed API calls */
  maxRetries: 3,
} as const;

// ─── UI Constants ───

export const THEME = {
  colors: {
    primary: "#35D07F",
    secondary: "#FCFF51",
    accent: "#63B3ED",
    danger: "#ff6b6b",
    background: "#0a0a12",
    surface: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.06)",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255,255,255,0.6)",
    textMuted: "rgba(255,255,255,0.3)",
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
} as const;
