"use client";

import { useState, useEffect } from "react";
import {
  getTopLeaderboard,
  getUserRank,
  type LeaderboardEntry,
} from "../lib/leaderboard";

/**
 * React hook that fetches live leaderboard data from the on-chain
 * Leaderboard contract on Celo Mainnet.
 *
 * @param walletAddress - The connected wallet address (or null)
 * @returns { entries, userRank, loading }
 */
export function useLeaderboard(walletAddress: string | null) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const topEntries = await getTopLeaderboard(10);
        if (!cancelled) {
          setEntries(topEntries);
        }

        if (walletAddress && !cancelled) {
          const rank = await getUserRank(walletAddress);
          if (!cancelled) {
            setUserRank(rank);
          }
        }
      } catch (error) {
        console.error("[useLeaderboard] fetch failed:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchLeaderboard();

    return () => {
      cancelled = true;
    };
  }, [walletAddress]);

  return { entries, userRank, loading };
}
