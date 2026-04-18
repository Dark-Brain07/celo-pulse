import { ethers } from "ethers";

// ActivityManager ABI
const ACTIVITY_MANAGER_ABI = [
  "function dailyCheckIn() external",
  "function getUserActivity(address user) view returns (uint256 lastCheckIn, uint256 currentStreak, uint256 longestStreak, uint256 checkIns, uint256 actions)",
  "function canCheckIn(address user) view returns (bool)",
  "function totalCheckIns() view returns (uint256)",
  "function totalUniqueUsers() view returns (uint256)",
  "function getActiveUsersCount() view returns (uint256)",
  "event CheckIn(address indexed user, uint256 timestamp, uint256 streak)",
];

// MicroActions ABI
const MICRO_ACTIONS_ABI = [
  "function sendTip(address recipient) external payable",
  "function playAction() external",
  "function quickReact(uint8 reactionType) external",
  "function getUserStats(address user) view returns (uint256 tipsSent, uint256 tipsReceived, uint256 tipAmount, uint256 actionsPlayed, uint256 lastAction)",
  "function canPlayAction(address user) view returns (bool)",
  "function getGlobalStats() view returns (uint256 tips, uint256 volume, uint256 actions)",
  "event TipSent(address indexed from, address indexed to, uint256 amount, uint256 timestamp)",
  "event ActionPerformed(address indexed user, string actionType, uint256 timestamp)",
];

// Leaderboard ABI
const LEADERBOARD_ABI = [
  "function getUserScore(address user) view returns (uint256 score, uint256 lastUpdated, bool isActive)",
  "function getTopUsers(uint256 offset, uint256 limit) view returns (address[] users, uint256[] scores)",
  "function getTotalRankedUsers() view returns (uint256)",
  "event ScoreUpdated(address indexed user, uint256 newScore, uint256 timestamp)",
];

// ReferralSystem ABI
const REFERRAL_SYSTEM_ABI = [
  "function registerWithReferral(address referrer) external",
  "function register() external",
  "function getUserReferralInfo(address user) view returns (address referrer, uint256 referralCount, uint256 totalEarned, uint256 joinedAt, bool registered)",
  "function getReferredUsers(address user) view returns (address[])",
  "function totalReferrals() view returns (uint256)",
  "function totalRegistered() view returns (uint256)",
  "event UserRegistered(address indexed user, address indexed referrer, uint256 timestamp)",
  "event ReferralRewardPaid(address indexed referrer, address indexed referee, uint256 amount, uint256 timestamp)",
];

export interface ActivityInfo {
  lastCheckIn: bigint;
  currentStreak: bigint;
  longestStreak: bigint;
  totalCheckIns: bigint;
  totalActions: bigint;
  canCheckIn: boolean;
}

export interface MicroActionStats {
  tipsSent: bigint;
  tipsReceived: bigint;
  totalTipAmount: bigint;
  actionsPlayed: bigint;
  lastAction: bigint;
  canPlay: boolean;
}

export interface LeaderboardEntry {
  address: string;
  score: bigint;
}

export interface ReferralInfo {
  referrer: string;
  referralCount: bigint;
  totalEarned: bigint;
  joinedAt: bigint;
  isRegistered: boolean;
}

export interface GlobalStats {
  totalTips: bigint;
  totalTipVolume: bigint;
  totalActions: bigint;
  totalCheckIns: bigint;
  totalUsers: bigint;
  totalReferrals: bigint;
}

export class CeloActivityHelper {
  private activityContract: ethers.Contract;
  private microActionsContract: ethers.Contract;
  private leaderboardContract: ethers.Contract;
  private referralContract: ethers.Contract | null;

  constructor(
    activityManagerAddress: string,
    microActionsAddress: string,
    leaderboardAddress: string,
    signerOrProvider: ethers.Signer | ethers.Provider,
    referralSystemAddress?: string
  ) {
    this.activityContract = new ethers.Contract(
      activityManagerAddress,
      ACTIVITY_MANAGER_ABI,
      signerOrProvider
    );
    this.microActionsContract = new ethers.Contract(
      microActionsAddress,
      MICRO_ACTIONS_ABI,
      signerOrProvider
    );
    this.leaderboardContract = new ethers.Contract(
      leaderboardAddress,
      LEADERBOARD_ABI,
      signerOrProvider
    );
    this.referralContract = referralSystemAddress
      ? new ethers.Contract(referralSystemAddress, REFERRAL_SYSTEM_ABI, signerOrProvider)
      : null;
  }

  // ─── Check-In ───

  /**
   * Perform daily check-in — generates 1 transaction
   */
  async checkIn(): Promise<ethers.TransactionResponse> {
    return await this.activityContract.dailyCheckIn();
  }

  /**
   * Check if user can check in now
   */
  async canCheckIn(userAddress: string): Promise<boolean> {
    return await this.activityContract.canCheckIn(userAddress);
  }

  /**
   * Get full activity info for a user
   */
  async getActivityInfo(userAddress: string): Promise<ActivityInfo> {
    const [lastCheckIn, currentStreak, longestStreak, totalCheckIns, totalActions] =
      await this.activityContract.getUserActivity(userAddress);
    const canCheck = await this.activityContract.canCheckIn(userAddress);
    return {
      lastCheckIn,
      currentStreak,
      longestStreak,
      totalCheckIns,
      totalActions,
      canCheckIn: canCheck,
    };
  }

  // ─── Micro Actions ───

  /**
   * Send a tip to another user — generates 1 transaction
   */
  async sendTip(
    recipientAddress: string,
    amountInEther: string
  ): Promise<ethers.TransactionResponse> {
    return await this.microActionsContract.sendTip(recipientAddress, {
      value: ethers.parseEther(amountInEther),
    });
  }

  /**
   * Play a micro-action — generates 1 transaction (30s cooldown)
   */
  async playAction(): Promise<ethers.TransactionResponse> {
    return await this.microActionsContract.playAction();
  }

  /**
   * Quick react — generates 1 transaction (30s cooldown)
   */
  async quickReact(reactionType: number): Promise<ethers.TransactionResponse> {
    return await this.microActionsContract.quickReact(reactionType);
  }

  /**
   * Check if user can play an action
   */
  async canPlay(userAddress: string): Promise<boolean> {
    return await this.microActionsContract.canPlayAction(userAddress);
  }

  /**
   * Get micro action stats for a user
   */
  async getMicroStats(userAddress: string): Promise<MicroActionStats> {
    const [tipsSent, tipsReceived, totalTipAmount, actionsPlayed, lastAction] =
      await this.microActionsContract.getUserStats(userAddress);
    const canPlay = await this.microActionsContract.canPlayAction(userAddress);
    return { tipsSent, tipsReceived, totalTipAmount, actionsPlayed, lastAction, canPlay };
  }

  // ─── Leaderboard ───

  /**
   * Get leaderboard entries sorted by score
   */
  async getLeaderboard(offset = 0, limit = 20): Promise<LeaderboardEntry[]> {
    const [users, scores] = await this.leaderboardContract.getTopUsers(offset, limit);
    const entries: LeaderboardEntry[] = [];
    for (let i = 0; i < users.length; i++) {
      entries.push({ address: users[i], score: scores[i] });
    }
    // Sort by score descending
    entries.sort((a, b) => (b.score > a.score ? 1 : b.score < a.score ? -1 : 0));
    return entries;
  }

  /**
   * Get user's score
   */
  async getUserScore(
    userAddress: string
  ): Promise<{ score: bigint; lastUpdated: bigint; isActive: boolean }> {
    const [score, lastUpdated, isActive] =
      await this.leaderboardContract.getUserScore(userAddress);
    return { score, lastUpdated, isActive };
  }

  // ─── Referral System ───

  /**
   * Register with a referral — generates 1 transaction
   * Both referrer and referee earn rewards
   */
  async registerWithReferral(referrerAddress: string): Promise<ethers.TransactionResponse> {
    if (!this.referralContract) throw new Error("Referral contract not configured");
    return await this.referralContract.registerWithReferral(referrerAddress);
  }

  /**
   * Register without a referral — generates 1 transaction
   */
  async register(): Promise<ethers.TransactionResponse> {
    if (!this.referralContract) throw new Error("Referral contract not configured");
    return await this.referralContract.register();
  }

  /**
   * Get referral info for a user
   */
  async getReferralInfo(userAddress: string): Promise<ReferralInfo> {
    if (!this.referralContract) throw new Error("Referral contract not configured");
    const [referrer, referralCount, totalEarned, joinedAt, registered] =
      await this.referralContract.getUserReferralInfo(userAddress);
    return { referrer, referralCount, totalEarned, joinedAt, isRegistered: registered };
  }

  /**
   * Get list of users referred by a user
   */
  async getReferredUsers(userAddress: string): Promise<string[]> {
    if (!this.referralContract) throw new Error("Referral contract not configured");
    return await this.referralContract.getReferredUsers(userAddress);
  }

  // ─── Global Stats ───

  /**
   * Get aggregated global stats across all contracts
   */
  async getGlobalStats(): Promise<GlobalStats> {
    const promises: Promise<any>[] = [
      this.microActionsContract.getGlobalStats(),
      this.activityContract.totalCheckIns(),
      this.activityContract.totalUniqueUsers(),
    ];

    if (this.referralContract) {
      promises.push(this.referralContract.totalReferrals());
    }

    const results = await Promise.all(promises);
    return {
      totalTips: results[0][0],
      totalTipVolume: results[0][1],
      totalActions: results[0][2],
      totalCheckIns: results[1],
      totalUsers: results[2],
      totalReferrals: results[3] || BigInt(0),
    };
  }
}

export default CeloActivityHelper;
