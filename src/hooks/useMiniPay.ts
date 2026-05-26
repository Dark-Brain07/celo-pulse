import { useEffect, useState } from "react";

/**
 * React hook for Opera MiniPay wallet integration.
 *
 * Detects whether the app is running inside MiniPay's WebView
 * and auto-connects to retrieve the user's wallet address.
 *
 * MiniPay injects `window.ethereum` with `isMiniPay = true`.
 * When detected, this hook calls `eth_requestAccounts` to get the address.
 *
 * @returns {{ isMiniPay: boolean, address: string | null }}
 */
export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ethereum = (window as any).ethereum;
    if (!ethereum?.isMiniPay) return;

    setIsMiniPay(true);

    // Auto-connect: MiniPay always has an account ready
    ethereum
      .request({ method: "eth_requestAccounts", params: [] })
      .then((accounts: string[]) => {
        if (accounts[0]) setAddress(accounts[0]);
      })
      .catch((err: Error) => {
        console.error("[useMiniPay] auto-connect failed:", err);
      });
  }, []);

  return { isMiniPay, address };
}
