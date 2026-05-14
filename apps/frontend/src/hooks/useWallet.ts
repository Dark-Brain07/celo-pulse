"use client";

/**
 * useWallet hook — re-exports from WalletContext for backward compatibility.
 * All wallet state logic is centralized in WalletContext.tsx.
 * This file ensures components importing from `@/hooks/useWallet` work correctly.
 */
export { useWallet } from "@/context/WalletContext";

// ─── MiniPay Detection Re-exports ───
// Re-export MiniPay utilities so existing consumers can still import them
// from this module. The canonical implementations live in @/lib/miniPay.
export {
  isMiniPayWallet,
  detectMiniPay,
  getMiniPayAddress,
  getFeeCurrency,
  getMiniPayTxOverrides,
  MINIPAY_FEE_CURRENCY_CUSD,
  MINIPAY_INFO,
} from "@/lib/miniPay";

// ─── Legacy Fee Abstraction Constants ───
// Kept for backward compatibility with older imports.
// USDm address per official MiniPay docs:
// https://docs.celo.org/build-on-celo/build-on-minipay/quickstart
export const CUSD_FEE_CURRENCY = {
  mainnet: "0x765DE816845861e75A25fCA122bb6898B8B1282a",   // Celo Mainnet (USDm)
  alfajores: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", // Alfajores Testnet (cUSD)
};
