// Contract ABIs and addresses for CeloPulse
export const CONTRACTS = {
  ACTIVITY_MANAGER: {
    address: process.env.NEXT_PUBLIC_CONTRACT_ACTIVITY_MANAGER || "0x0000000000000000000000000000000000000000",
    abi: [
      "function dailyCheckIn() external",
      "function getUserActivity(address user) view returns (uint256 lastCheckIn, uint256 currentStreak, uint256 longestStreak, uint256 checkIns, uint256 actions)",
      "function canCheckIn(address user) view returns (bool)",
      "function totalCheckIns() view returns (uint256)",
      "function totalUniqueUsers() view returns (uint256)",
      "function getActiveUsersCount() view returns (uint256)",
      "event CheckIn(address indexed user, uint256 timestamp, uint256 streak)",
      "event NewUser(address indexed user, uint256 timestamp)",
      "event MilestoneReached(address indexed user, uint256 totalCheckIns, string milestone)",
    ],
  },
  REWARD_DISTRIBUTOR: {
    address: process.env.NEXT_PUBLIC_CONTRACT_REWARD_DISTRIBUTOR || "0x0000000000000000000000000000000000000000",
    abi: [
      "function claimReward() external",
      "function fundPool() external payable",
      "function getUserRewardInfo(address user) view returns (uint256 totalClaimed, uint256 pending, uint256 lastClaim, uint256 claims, bool canClaim)",
      "function canUserClaim(address user) view returns (bool)",
      "function rewardPool() view returns (uint256)",
      "function totalDistributed() view returns (uint256)",
      "function totalClaims() view returns (uint256)",
      "event RewardClaimed(address indexed user, uint256 amount, uint256 timestamp)",
    ],
  },
  MICRO_ACTIONS: {
    address: process.env.NEXT_PUBLIC_CONTRACT_MICRO_ACTIONS || "0x0000000000000000000000000000000000000000",
    abi: [
      "function sendTip(address recipient) external payable",
      "function playAction() external",
      "function quickReact(uint8 reactionType) external",
      "function getUserStats(address user) view returns (uint256 tipsSent, uint256 tipsReceived, uint256 tipAmount, uint256 actionsPlayed, uint256 lastAction)",
      "function canPlayAction(address user) view returns (bool)",
      "function getGlobalStats() view returns (uint256 tips, uint256 volume, uint256 actions)",
      "event TipSent(address indexed from, address indexed to, uint256 amount, uint256 timestamp)",
      "event ActionPerformed(address indexed user, string actionType, uint256 timestamp)",
    ],
  },
  LEADERBOARD: {
    address: process.env.NEXT_PUBLIC_CONTRACT_LEADERBOARD || "0x0000000000000000000000000000000000000000",
    abi: [
      "function getUserScore(address user) view returns (uint256 score, uint256 lastUpdated, bool isActive)",
      "function getTopUsers(uint256 offset, uint256 limit) view returns (address[] users, uint256[] scores)",
      "function getTotalRankedUsers() view returns (uint256)",
      "event ScoreUpdated(address indexed user, uint256 newScore, uint256 timestamp)",
    ],
  },
  REFERRAL_SYSTEM: {
    address: process.env.NEXT_PUBLIC_CONTRACT_REFERRAL_SYSTEM || "0x0000000000000000000000000000000000000000",
    abi: [
      "function registerWithReferral(address referrer) external",
      "function register() external",
      "function getUserReferralInfo(address user) view returns (address referrer, uint256 referralCount, uint256 totalEarned, uint256 joinedAt, bool registered)",
      "function getReferredUsers(address user) view returns (address[])",
      "function totalReferrals() view returns (uint256)",
      "function totalRegistered() view returns (uint256)",
      "event UserRegistered(address indexed user, address indexed referrer, uint256 timestamp)",
      "event ReferralRewardPaid(address indexed referrer, address indexed referee, uint256 amount, uint256 timestamp)",
    ],
  },
};

export const CELO_FAUCET_URL = "https://faucet.celo.org";

export const CELO_CHAIN = {
  chainId: 42220,
  chainIdHex: "0xa4ec",
  name: "Celo Mainnet",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://forno.celo.org",
  blockExplorer: "https://explorer.celo.org",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
};

export const BLOCKSCOUT_API = process.env.NEXT_PUBLIC_BLOCKSCOUT_API || "https://explorer.celo.org/mainnet/api";
export const BLOCKSCOUT_API_KEY = process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY || "";
