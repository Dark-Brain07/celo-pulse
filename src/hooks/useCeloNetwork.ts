/**
 * useCeloNetwork Hook
 *
 * Fetches and auto-refreshes Celo Mainnet health metrics
 * (block number and gas price) every 30 seconds.
 */

import { useState, useEffect } from "react";
import { getCeloBlockNumber, getCeloGasPrice } from "@/lib/celoNetwork";

export function useCeloNetwork() {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<string>("0");

  useEffect(() => {
    let isMounted = true;

    async function fetchNetworkData() {
      try {
        const [block, gas] = await Promise.all([
          getCeloBlockNumber(),
          getCeloGasPrice(),
        ]);
        if (isMounted) {
          setBlockNumber(block);
          setGasPrice(gas);
        }
      } catch (error) {
        console.error("[useCeloNetwork] Failed to fetch network data:", error);
      }
    }

    // Fetch immediately on mount
    fetchNetworkData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchNetworkData, 30_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { blockNumber, gasPrice };
}
