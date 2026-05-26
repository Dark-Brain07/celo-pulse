/**
 * ActivityManager Contract Reader
 *
 * Read-only interface for the CeloPulse ActivityManager smart contract
 * deployed on Celo Mainnet. Provides functions to query user stats
 * and global metrics directly from the blockchain.
 */

import { ethers } from "ethers";

// ─── Contract Address ───

export const ACTIVITY_MANAGER_ADDRESS = "0x52C26081bb28351Dae6A4D678B4b144bc5A0B956";

// ─── Minimal Read-Only ABI ───

export const ACTIVITY_MANAGER_ABI = [
  "function getUserActivity(address user) view returns (uint256 lastCheckIn, uint256 currentStreak, uint256 longestStreak, uint256 checkIns, uint256 actions)",
  "function totalUniqueUsers() view returns (uint256)",
  "function totalCheckIns() view returns (uint256)",
];

// ─── Types ───

export type UserStats = {
  lastCheckIn: string;
  currentStreak: string;
  longestStreak: string;
  checkIns: string;
  actions: string;
};

// ─── Provider Helper ───

let _provider: ethers.JsonRpcProvider | null = null;

function getProvider(): ethers.JsonRpcProvider {
  if (!_provider) {
    _provider = new ethers.JsonRpcProvider("https://forno.celo.org");
  }
  return _provider;
}

function getContract(): ethers.Contract {
  return new ethers.Contract(
    ACTIVITY_MANAGER_ADDRESS,
    ACTIVITY_MANAGER_ABI,
    getProvider()
  );
}

// ─── Read Functions ───

/**
 * Fetches on-chain stats for a specific user address.
 * Returns zeroed UserStats on error.
 */
export async function getUserStats(walletAddress: string): Promise<UserStats> {
  try {
    const contract = getContract();
    const result = await contract.getUserActivity(walletAddress);
    return {
      lastCheckIn: result[0].toString(),
      currentStreak: result[1].toString(),
      longestStreak: result[2].toString(),
      checkIns: result[3].toString(),
      actions: result[4].toString(),
    };
  } catch (error) {
    console.error("[activityManager] getUserStats failed:", error);
    return { lastCheckIn: "0", currentStreak: "0", longestStreak: "0", checkIns: "0", actions: "0" };
  }
}

/**
 * Fetches the total number of registered users from the contract.
 */
export async function getTotalUsers(): Promise<string> {
  try {
    const contract = getContract();
    const total = await contract.totalUniqueUsers();
    return total.toString();
  } catch (error) {
    console.error("[activityManager] getTotalUsers failed:", error);
    return "0";
  }
}

/**
 * Fetches the total number of check-ins from the contract.
 */
export async function getTotalCheckIns(): Promise<string> {
  try {
    const contract = getContract();
    const total = await contract.totalCheckIns();
    return total.toString();
  } catch (error) {
    console.error("[activityManager] getTotalCheckIns failed:", error);
    return "0";
  }
}
