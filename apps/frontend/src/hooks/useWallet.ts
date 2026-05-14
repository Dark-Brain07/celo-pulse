"use client";

/**
 * useWallet hook — re-exports from WalletContext for backward compatibility.
 * All wallet state logic is centralized in WalletContext.tsx.
 * This file ensures components importing from `@/hooks/useWallet` work correctly.
 */
export { useWallet } from "@/context/WalletContext";

// ─── MiniPay Fee Abstraction Constants ───
// USDm address per official MiniPay docs:
// https://docs.celo.org/build-on-celo/build-on-minipay/quickstart
export const CUSD_FEE_CURRENCY = {
  mainnet: "0x765DE816845861e75A25fCA122bb6898B8B1282a",   // Celo Mainnet (USDm)
  alfajores: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", // Alfajores Testnet (cUSD)
};

/**
 * Returns the correct USDm feeCurrency address for a given chain ID.
 * Pass the result as `feeCurrency` in transaction overrides when inside MiniPay.
 *
 * @example
 * const overrides = isMiniPay ? { feeCurrency: getFeeCurrency(chainId) } : {};
 * await contract.dailyCheckIn(overrides);
 */
export function getFeeCurrency(chainId: number | null): string | undefined {
  if (chainId === 42220) return CUSD_FEE_CURRENCY.mainnet;
  if (chainId === 44787) return CUSD_FEE_CURRENCY.alfajores;
  return undefined;
}
