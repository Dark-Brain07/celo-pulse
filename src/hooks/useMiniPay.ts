import { useEffect, useState } from "react";

/**
 * React hook to detect whether the app is running inside Opera MiniPay.
 *
 * MiniPay injects `window.ethereum` with an `isMiniPay` flag set to `true`.
 * This hook checks for that flag on mount and returns a boolean.
 *
 * @returns {{ isMiniPay: boolean }} Whether the current environment is MiniPay
 */
export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum && (window.ethereum as any).isMiniPay) {
      setIsMiniPay(true);
    }
  }, []);

  return { isMiniPay };
}
