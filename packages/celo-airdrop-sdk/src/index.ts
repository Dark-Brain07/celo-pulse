import { ethers } from "ethers";

// RewardDistributor ABI (key functions only)
const REWARD_DISTRIBUTOR_ABI = [
  "function claimReward() external",
  "function getUserRewardInfo(address user) view returns (uint256 totalClaimed, uint256 pending, uint256 lastClaim, uint256 claims, bool canClaim)",
  "function canUserClaim(address user) view returns (bool)",
  "function rewardPool() view returns (uint256)",
  "function totalDistributed() view returns (uint256)",
  "function totalClaims() view returns (uint256)",
  "event RewardClaimed(address indexed user, uint256 amount, uint256 timestamp)",
];

// ActivityManager ABI (for stats)
const ACTIVITY_MANAGER_ABI = [
  "function getUserActivity(address user) view returns (uint256 lastCheckIn, uint256 currentStreak, uint256 longestStreak, uint256 checkIns, uint256 actions)",
  "function totalCheckIns() view returns (uint256)",
  "function totalUniqueUsers() view returns (uint256)",
];

export interface RewardInfo {
  totalClaimed: bigint;
  pending: bigint;
  lastClaim: bigint;
  claimCount: bigint;
  canClaim: boolean;
}

export interface UserStats {
  lastCheckIn: bigint;
  currentStreak: bigint;
  longestStreak: bigint;
  totalCheckIns: bigint;
  totalActions: bigint;
}

export interface PoolStats {
  rewardPool: bigint;
  totalDistributed: bigint;
  totalClaims: bigint;
}

export class CeloAirdropSDK {
  private rewardContract: ethers.Contract;
  private activityContract: ethers.Contract;

  constructor(
    rewardDistributorAddress: string,
    activityManagerAddress: string,
    signerOrProvider: ethers.Signer | ethers.Provider
  ) {
    this.rewardContract = new ethers.Contract(
      rewardDistributorAddress,
      REWARD_DISTRIBUTOR_ABI,
      signerOrProvider
    );
    this.activityContract = new ethers.Contract(
      activityManagerAddress,
      ACTIVITY_MANAGER_ABI,
      signerOrProvider
    );
  }

  /**
   * Claim accumulated rewards — generates 1 onchain transaction
   */
  async claimReward(): Promise<ethers.TransactionResponse> {
    const tx = await this.rewardContract.claimReward();
    return tx;
  }

  /**
   * Check if a user is eligible to claim rewards
   */
  async checkEligibility(userAddress: string): Promise<boolean> {
    return await this.rewardContract.canUserClaim(userAddress);
  }

  /**
   * Get detailed reward info for a user
   */
  async getRewardInfo(userAddress: string): Promise<RewardInfo> {
    const [totalClaimed, pending, lastClaim, claims, canClaim] =
      await this.rewardContract.getUserRewardInfo(userAddress);
    return { totalClaimed, pending, lastClaim, claimCount: claims, canClaim };
  }

  /**
   * Get user activity stats (from ActivityManager)
   */
  async getUserStats(userAddress: string): Promise<UserStats> {
    const [lastCheckIn, currentStreak, longestStreak, totalCheckIns, totalActions] =
      await this.activityContract.getUserActivity(userAddress);
    return { lastCheckIn, currentStreak, longestStreak, totalCheckIns, totalActions };
  }

  /**
   * Get global pool stats
   */
  async getPoolStats(): Promise<PoolStats> {
    const [rewardPool, totalDistributed, totalClaims] = await Promise.all([
      this.rewardContract.rewardPool(),
      this.rewardContract.totalDistributed(),
      this.rewardContract.totalClaims(),
    ]);
    return { rewardPool, totalDistributed, totalClaims };
  }
}

export default CeloAirdropSDK;
