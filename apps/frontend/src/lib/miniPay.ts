/**
 * MiniPay Wallet Integration for CeloPulse
 * 
 * Provides utility functions for detecting and interacting with the 
 * MiniPay wallet (Opera MiniPay) on the Celo network.
 * 
 * Reference: https://docs.celo.org/build-on-celo/build-on-minipay/quickstart
 */

// ─── Fee Currency Addresses ───

/**
 * cUSD (USDm) fee currency address for gas fee abstraction.
 * MiniPay currently supports setting the feeCurrency property when running
 * eth_sendTransaction. Currency support is limited to cUSD/USDm.
 * 
 * Per official docs:
 * - MiniPay only accepts legacy transactions (type 0).
 * - EIP-1559 properties won't be considered when handling requests.
 */
export const MINIPAY_FEE_CURRENCY_CUSD: Record<number, string> = {
  42220: "0x765DE816845861e75A25fCA122bb6898B8B1282a",   // Celo Mainnet (cUSD / USDm)
  44787: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",   // Alfajores Testnet (cUSD)
};

// ─── MiniPay Detection ───

/**
 * Check if the current environment is the MiniPay wallet WebView.
 * MiniPay injects `window.ethereum` with `isMiniPay = true`.
 * 
 * Must run in a browser environment — returns false on server/Node.js.
 * 
 * @example
 * if (isMiniPayWallet()) {
 *   // Auto-connect, skip chain switching, enable fee abstraction
 * }
 */
export function isMiniPayWallet(): boolean {
  if (typeof window === "undefined") return false;
  const ethereum = (window as any).ethereum;
  return !!(ethereum && ethereum.isMiniPay);
}

/**
 * Alias for `isMiniPayWallet` — used across wallet hooks and contexts.
 */
export const detectMiniPay = isMiniPayWallet;

// ─── MiniPay Address Retrieval ───

/**
 * Get the connected wallet address from MiniPay's injected provider.
 * Uses the raw `eth_requestAccounts` RPC method (no library needed).
 * 
 * @returns The connected wallet address, or null if not available
 */
export async function getMiniPayAddress(): Promise<string | null> {
  if (!isMiniPayWallet()) return null;
  
  try {
    const ethereum = (window as any).ethereum;
    const accounts: string[] = await ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });
    return accounts[0] || null;
  } catch (error) {
    console.error("[MiniPay] Failed to get address:", error);
    return null;
  }
}

// ─── Fee Currency Helper ───

/**
 * Returns the correct feeCurrency address for the given chain.
 * Pass this into your transaction overrides when running inside MiniPay.
 * 
 * @example
 * const overrides = isMiniPayWallet()
 *   ? { feeCurrency: getFeeCurrency(42220), type: 0 }
 *   : {};
 * await contract.dailyCheckIn(overrides);
 */
export function getFeeCurrency(chainId: number | null): string | undefined {
  if (!chainId) return undefined;
  return MINIPAY_FEE_CURRENCY_CUSD[chainId];
}

/**
 * Returns raw transaction override fields for MiniPay fee currency.
 * Use this when you need direct control over the transaction parameters.
 * 
 * MiniPay only accepts legacy transactions — EIP-1559 properties are ignored.
 */
export function getMiniPayTxOverrides(chainId: number | null): Record<string, any> {
  if (!isMiniPayWallet()) return {};
  
  const fee = getFeeCurrency(chainId);
  if (!fee) return {};

  return {
    // MiniPay intercepts eth_sendTransaction and reads feeCurrency
    feeCurrency: fee,
    // Force legacy transaction type (MiniPay doesn't support EIP-1559)
    type: 0,
  };
}

// ─── MiniPay Info ───

export const MINIPAY_INFO = {
  name: "MiniPay",
  description: "Opera MiniPay — Easy Global Wallet on Celo",
  downloadLinks: {
    android: "https://play.google.com/store/apps/details?id=com.opera.minipay",
    ios: "https://apps.apple.com/de/app/minipay-easy-global-wallet/id6504087257",
    web: "https://www.opera.com/products/minipay",
  },
  supportedChains: [42220], // Celo Mainnet
  supportedFeeCurrencies: ["USDm", "cUSD"],
} as const;
