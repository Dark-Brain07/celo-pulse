import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

/**
 * cUSD ERC-20 contract address on Celo Mainnet (chain 42220).
 * @see https://docs.celo.org/token-addresses
 */
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

const ERC20_BALANCE_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const CELO_RPC = "https://forno.celo.org";

/**
 * React hook that fetches the cUSD balance for a given wallet address
 * directly from Celo Mainnet via the public Forno RPC.
 *
 * Polls every 15 seconds while a valid address is provided.
 *
 * @param walletAddress - The wallet address to query, or undefined/null
 * @returns {{ balance: string; loading: boolean; error: string | null; refetch: () => void }}
 */
export function useCusdBalance(walletAddress: string | undefined | null) {
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!walletAddress) {
      setBalance("0");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.JsonRpcProvider(CELO_RPC);
      const token = new ethers.Contract(CUSD_ADDRESS, ERC20_BALANCE_ABI, provider);
      const [rawBalance, decimals] = await Promise.all([
        token.balanceOf(walletAddress),
        token.decimals().catch(() => 18),
      ]);
      setBalance(ethers.formatUnits(rawBalance, Number(decimals)));
    } catch (err: any) {
      setError(err.message || "Failed to fetch cUSD balance");
      setBalance("0");
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchBalance();
    if (!walletAddress) return;

    const interval = setInterval(fetchBalance, 15_000);
    return () => clearInterval(interval);
  }, [fetchBalance, walletAddress]);

  return { balance, loading, error, refetch: fetchBalance };
}
