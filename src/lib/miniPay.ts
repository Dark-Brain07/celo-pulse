/**
 * MiniPay Wallet Integration for CeloPulse
 * 
 * Provides utility functions for detecting and interacting with the 
 * MiniPay wallet (Opera MiniPay) on the Celo network.
 * 
 * Reference: https://docs.celo.org/build-on-celo/build-on-minipay/quickstart
 */

// ─── Fee Currency Addresses ───

/** USDm (cUSD) fee currency address for gas fee abstraction on Celo Mainnet */
export const MINIPAY_FEE_CURRENCY_USDM = "0x4F604735c1cF31399C6E711D5962b2B3E0225AD3" as const;

/** USDm token address on Celo Mainnet (for balance checks, transfers) */
export const USDM_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;

// ─── MiniPay Detection ───

/**
 * Check if the current environment is the MiniPay wallet WebView.
 * Must run in a browser environment — returns false on server/Node.js.
 */
export function isMiniPayWallet(): boolean {
  if (typeof window === "undefined") return false;
  const ethereum = (window as any).ethereum;
  return !!(ethereum && ethereum.isMiniPay);
}

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
 * Returns the feeCurrency override for transactions when running inside MiniPay.
 * MiniPay supports paying gas fees in USDm instead of CELO.
 * 
 * Usage: Spread this into your contract call options:
 *   `const tx = await contract.someFunction({ ...getMiniPayFeeOptions() });`
 * 
 * @returns An object with `customData.feeCurrency` set if in MiniPay, or empty object
 */
export function getMiniPayFeeOptions(): Record<string, any> {
  if (!isMiniPayWallet()) return {};
  
  return {
    // For ethers.js v6: customData is forwarded to the transaction
    customData: {
      feeCurrency: MINIPAY_FEE_CURRENCY_USDM,
    },
  };
}

/**
 * Returns raw transaction override fields for MiniPay fee currency.
 * Use this when you need direct control over the transaction parameters.
 * 
 * MiniPay only accepts legacy transactions — EIP-1559 properties are ignored.
 */
export function getMiniPayTxOverrides(): Record<string, any> {
  if (!isMiniPayWallet()) return {};
  
  return {
    // MiniPay intercepts eth_sendTransaction and reads feeCurrency
    feeCurrency: MINIPAY_FEE_CURRENCY_USDM,
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
  supportedFeeCurrencies: ["USDm"],
} as const;
