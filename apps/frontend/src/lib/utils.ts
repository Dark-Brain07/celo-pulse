/**
 * CeloPulse Utility Functions
 * Shared helpers for formatting, validation, and blockchain utilities.
 */

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
 * Format a Wei value to human-readable CELO.
 * @param wei Value in Wei (as bigint or string)
 * @param decimals Number of decimal places to show
 * @returns Formatted CELO string
 */
export function formatCelo(wei: bigint | string, decimals = 4): string {
  const value = typeof wei === "string" ? BigInt(wei) : wei;
  const wholePart = value / BigInt(10 ** 18);
  const fracPart = value % BigInt(10 ** 18);
  const fracStr = fracPart.toString().padStart(18, "0").slice(0, decimals);
  return `${wholePart}.${fracStr}`;
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
