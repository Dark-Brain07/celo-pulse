"use client";

/**
 * useActivityStats Hook
 *
 * Fetches user-level and global activity statistics from the
 * ActivityManager contract on Celo Mainnet.
 */

import { useState, useEffect } from "react";
import {
  getUserStats,
  getTotalUsers,
  getTotalCheckIns,
  type UserStats,
} from "@/lib/activityManager";

interface GlobalStats {
  totalUsers: string;
  totalCheckIns: string;
}

export function useActivityStats(walletAddress: string | null) {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      setLoading(true);
      try {
        const [totalUsers, totalCheckIns] = await Promise.all([
          getTotalUsers(),
          getTotalCheckIns(),
        ]);

        if (!isMounted) return;

        setGlobalStats({ totalUsers, totalCheckIns });

        if (walletAddress) {
          const stats = await getUserStats(walletAddress);
          if (isMounted) {
            setUserStats(stats);
          }
        } else {
          setUserStats(null);
        }
      } catch (error) {
        console.error("[useActivityStats] Failed to fetch stats:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [walletAddress]);

  return { userStats, globalStats, loading };
}
