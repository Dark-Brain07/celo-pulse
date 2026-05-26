import { useEffect, useState } from "react";

/**
 * React hook to detect whether the app is running inside Opera MiniPay
 * and retrieve the connected wallet address.
 *
 * MiniPay injects `window.ethereum` with an `isMiniPay` flag set to `true`.
 * This hook checks for that flag on mount, auto-connects, and returns the
 * wallet address for downstream use (e.g. leaderboard lookups).
 *
 * @returns {{ isMiniPay: boolean; address: string | null }}
 */
export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ethereum = (window as any).ethereum;
    if (!ethereum?.isMiniPay) return;

    setIsMiniPay(true);

    // Auto-request accounts to get the connected wallet address
    ethereum
      .request({ method: "eth_requestAccounts", params: [] })
      .then((accounts: string[]) => {
        if (accounts?.length > 0) {
          setAddress(accounts[0]);
        }
      })
      .catch((err: unknown) => {
        console.error("[useMiniPay] Failed to get address:", err);
      });
  }, []);

  return { isMiniPay, address };
}
