import { getAddress } from "ethers";

/**
 * CeloPulse Utility Functions
 * Shared helpers for formatting, validation, and blockchain utilities.
 */

/**
 * Truncate an Ethereum address for display with checksum verification.
 * @param address Full hex address
 * @param startChars Number of characters to show at start (default: 6)
 * @param endChars Number of characters to show at end (default: 4)
 * @returns Truncated checksummed address string
 */
export function formatAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return "";
  try {
    const checksummed = getAddress(address);
    if (checksummed.length < startChars + endChars) return checksummed;
    return `${checksummed.slice(0, startChars)}...${checksummed.slice(-endChars)}`;
  } catch {
    return truncateAddress(address, startChars, endChars);
  }
}

/**
 * Truncate an Ethereum address for display.
 * @param address Full hex address
 * @param startChars Number of characters to show at start (default: 6)
 * @param endChars Number of characters to show at end (default: 4)
 * @returns Truncated address string
 */
export function truncateAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address || address.length < startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format a Wei value to human-readable token amount.
 * @param wei Value in Wei (as bigint or string)
 * @param decimals Number of decimal places to show
 * @param tokenSymbol Custom symbol to append (default: 'CELO')
 * @returns Formatted token string with symbol
 */
export function formatCelo(wei: bigint | string, decimals = 4, tokenSymbol = "CELO"): string {
  const value = typeof wei === "string" ? BigInt(wei) : wei;
  const wholePart = value / BigInt(10 ** 18);
  const fracPart = value % BigInt(10 ** 18);
  const fracStr = fracPart.toString().padStart(18, "0").slice(0, decimals);
  return `${wholePart}.${fracStr} ${tokenSymbol}`.trim();
}

/**
 * Format a timestamp into a relative time string (e.g., "2 hours ago").
 * @param timestamp Unix timestamp in seconds
 * @returns Relative time string
 */
export function timeAgo(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Format a large number with compact notation (e.g., 1.2K, 3.4M).
 * @param num Number to format
 * @returns Compact string
 */
export function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

/**
 * Validate an Ethereum/Celo address format.
 * @param address Address string to validate
 * @returns True if valid hex address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/**
 * Strict validation for Celo addresses including null check.
 */
export function isValidCeloAddress(address: string | null | undefined): address is string {
  if (!address) return false;
  return isValidAddress(address);
}

/**
 * Calculate the estimated gas cost in CELO.
 * @param gasUsed Gas units consumed
 * @param gasPriceGwei Gas price in Gwei
 * @returns Cost in CELO
 */
export function estimateGasCost(
  gasUsed: number,
  gasPriceGwei: number = 5
): string {
  const costWei = BigInt(gasUsed) * BigInt(gasPriceGwei) * BigInt(10 ** 9);
  return formatCelo(costWei, 6);
}

/**
 * Generate a Celoscan URL for a given entity.
 */
export function celoscanUrl(
  type: "tx" | "address" | "block",
  value: string
): string {
  return `https://celoscan.io/${type}/${value}`;
}

/**
 * Sleep utility for async operations.
 * @param ms Milliseconds to wait
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async function with exponential backoff.
 * @param fn Async function to retry
 * @param maxRetries Maximum number of retries
 * @param baseDelay Initial delay in ms
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (i < maxRetries) {
        await sleep(baseDelay * Math.pow(2, i));
      }
    }
  }
  throw lastError;
}

/**
 * Safely copy text to the user's clipboard.
 * @param text The string to copy
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator?.clipboard) {
    console.warn("Clipboard API not available");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

/**
 * Format a Unix timestamp (seconds) into a readable date and time string.
 * @param timestamp Unix timestamp in seconds
 * @returns Formatted date string (e.g. "Oct 12, 2024, 10:30 AM")
 */
export function formatTimestamp(timestamp: number): string {
  if (!timestamp) return "Unknown";
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Truncate a transaction hash for display.
 * @param hash Full hex transaction hash
 * @param startChars Number of characters to show at start (default: 8)
 * @param endChars Number of characters to show at end (default: 6)
 * @returns Truncated hash string
 */
export function truncateHash(
  hash: string,
  startChars = 8,
  endChars = 6
): string {
  if (!hash || hash.length < startChars + endChars) return hash;
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
}
