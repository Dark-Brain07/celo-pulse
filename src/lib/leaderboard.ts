/**
 * Leaderboard Contract Reader
 *
 * Reads on-chain leaderboard data from the deployed Leaderboard contract
 * on Celo Mainnet using ethers.js v6.
 */

import { JsonRpcProvider, Contract, formatUnits } from "ethers";
import { CELO_MAINNET_RPC } from "./celoNetwork";

// ─── Constants ───

/** Deployed Leaderboard contract address on Celo Mainnet */
export const LEADERBOARD_ADDRESS = "0xb2137812BC7b1439C238693df4e2F7AB07691014";

/** Minimal ABI for the Leaderboard contract (view functions only) */
export const LEADERBOARD_ABI = [
  "function getTopUsers(uint256 count) view returns (address[], uint256[])",
  "function getUserRank(address) view returns (uint256)",
];

// ─── Types ───

export type LeaderboardEntry = {
  address: string;
  score: string;
  rank: number;
};

// ─── Provider & Contract (lazy singletons) ───

let _provider: JsonRpcProvider | null = null;

function getProvider(): JsonRpcProvider {
  if (!_provider) {
    _provider = new JsonRpcProvider(CELO_MAINNET_RPC);
  }
  return _provider;
}

function getLeaderboardContract(): Contract {
  return new Contract(LEADERBOARD_ADDRESS, LEADERBOARD_ABI, getProvider());
}

// ─── Query Functions ───

/**
 * Fetches the top N users from the on-chain Leaderboard contract.
 *
 * @param count - Number of top users to retrieve
 * @returns An array of LeaderboardEntry objects sorted by rank
 */
export async function getTopLeaderboard(
  count: number
): Promise<LeaderboardEntry[]> {
  try {
    const contract = getLeaderboardContract();
    const [addresses, scores]: [string[], bigint[]] =
      await contract.getTopUsers(count);

    return addresses.map((addr: string, i: number) => ({
      address: addr,
      score: scores[i].toString(),
      rank: i + 1,
    }));
  } catch (error) {
    console.error("[leaderboard] getTopLeaderboard failed:", error);
    return [];
  }
}

/**
 * Fetches the rank of a specific wallet address from the Leaderboard contract.
 *
 * @param walletAddress - The wallet address to look up
 * @returns The user's rank as a number, or 0 on error
 */
export async function getUserRank(walletAddress: string): Promise<number> {
  try {
    const contract = getLeaderboardContract();
    const rank: bigint = await contract.getUserRank(walletAddress);
    return Number(rank);
  } catch (error) {
    console.error("[leaderboard] getUserRank failed:", error);
    return 0;
  }
}
