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
  "function getUserStats(address) view returns (uint256 checkIns, uint256 points, uint256 streak, uint256 tier)",
  "function getTotalUsers() view returns (uint256)",
  "function getTotalCheckIns() view returns (uint256)",
];

// ─── Types ───

export type UserStats = {
  checkIns: string;
  points: string;
  streak: string;
  tier: number;
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
    const result = await contract.getUserStats(walletAddress);
    return {
      checkIns: result.checkIns.toString(),
      points: result.points.toString(),
      streak: result.streak.toString(),
      tier: Number(result.tier),
    };
  } catch (error) {
    console.error("[activityManager] getUserStats failed:", error);
    return { checkIns: "0", points: "0", streak: "0", tier: 0 };
  }
}

/**
 * Fetches the total number of registered users from the contract.
 */
export async function getTotalUsers(): Promise<string> {
  try {
    const contract = getContract();
    const total = await contract.getTotalUsers();
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
    const total = await contract.getTotalCheckIns();
    return total.toString();
  } catch (error) {
    console.error("[activityManager] getTotalCheckIns failed:", error);
    return "0";
  }
}
