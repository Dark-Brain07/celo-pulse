"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for fetching live gas prices from the Celo RPC endpoint.
 * Polls every 15 seconds and provides a formatted Gwei string.
 */
export function useGasPrice() {
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGasPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://forno.celo.org";
      const res = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_gasPrice",
          params: [],
          id: 1,
        }),
      });
      const data = await res.json();
      if (data.result) {
        const gwei = parseInt(data.result, 16) / 1e9;
        setGasPrice(`${gwei.toFixed(2)} Gwei`);
      }
    } catch {
      setGasPrice("~0.10 Gwei (Fallback)");
      setError("Failed to fetch gas price");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 15000);
    return () => clearInterval(interval);
  }, [fetchGasPrice]);

  return { gasPrice, loading, error, refetch: fetchGasPrice };
}
