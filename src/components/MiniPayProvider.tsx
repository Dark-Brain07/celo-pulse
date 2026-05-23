"use client";

import { useEffect } from "react";
import { useMiniPay } from "@/hooks/useMiniPay";

/**
 * MiniPayProvider — Auto-connect wrapper for Opera MiniPay.
 *
 * When the app is opened inside MiniPay, the wallet is injected automatically
 * via `window.ethereum`. This provider triggers `eth_requestAccounts` on mount
 * so the user is connected without needing to tap "Connect Wallet".
 *
 * Wrap this around the children inside your root layout (inside existing providers).
 */
export function MiniPayProvider({ children }: { children: React.ReactNode }) {
  const { isMiniPay } = useMiniPay();

  useEffect(() => {
    if (!isMiniPay) return;
    // When running inside MiniPay, wallet is injected automatically.
    // Trigger auto-connect using the injected window.ethereum provider.
    const autoConnect = async () => {
      try {
        const accounts = await (window.ethereum as any).request({
          method: "eth_requestAccounts",
        });
        if (accounts?.length > 0) {
          console.log("[MiniPay] Auto-connected:", accounts[0]);
        }
      } catch (err) {
        console.error("[MiniPay] Auto-connect failed:", err);
      }
    };
    autoConnect();
  }, [isMiniPay]);

  return <>{children}</>;
}
