"use client";

import { useState, useEffect } from "react";
import {
  getReferralStats,
  type ReferralStats,
} from "../lib/referralSystem";

/**
 * React hook that fetches live referral data from the on-chain
 * ReferralSystem contract on Celo Mainnet.
 *
 * @param walletAddress - The connected wallet address (or null)
 * @returns { referralStats, loading }
 */
export function useReferralStats(walletAddress: string | null) {
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchReferralStats() {
      if (!walletAddress) {
        setReferralStats(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const stats = await getReferralStats(walletAddress);
        if (!cancelled) {
          setReferralStats(stats);
        }
      } catch (error) {
        console.error("[useReferralStats] fetch failed:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReferralStats();

    return () => {
      cancelled = true;
    };
  }, [walletAddress]);

  return { referralStats, loading };
}
