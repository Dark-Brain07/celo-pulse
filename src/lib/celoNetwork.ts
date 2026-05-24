/**
 * Celo Mainnet Network Health Monitor Utility
 *
 * Provides functions to query the Celo mainnet for real-time network
 * health metrics such as block number and gas price.
 *
 * Uses ethers.js v6 JsonRpcProvider against the public Forno RPC endpoint.
 */

import { JsonRpcProvider, formatUnits } from "ethers";

// ─── Constants ───

/** Public RPC endpoint for Celo Mainnet (Forno) */
export const CELO_MAINNET_RPC = "https://forno.celo.org";

/** Chain ID for Celo Mainnet */
export const CELO_CHAIN_ID = 42220;

// ─── Provider (lazy singleton) ───

let _provider: JsonRpcProvider | null = null;

function getProvider(): JsonRpcProvider {
  if (!_provider) {
    _provider = new JsonRpcProvider(CELO_MAINNET_RPC);
  }
  return _provider;
}

// ─── Network Health Functions ───

/**
 * Fetches the latest block number from Celo Mainnet.
 * @returns The current block number as a number
 */
export async function getCeloBlockNumber(): Promise<number> {
  const provider = getProvider();
  return await provider.getBlockNumber();
}

/**
 * Fetches the current gas price from Celo Mainnet.
 * @returns The gas price formatted as a string in Gwei
 */
export async function getCeloGasPrice(): Promise<string> {
  const provider = getProvider();
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice ?? BigInt(0);
  return formatUnits(gasPrice, "gwei");
}

/**
 * Checks whether the given chain ID matches Celo Mainnet.
 * @param chainId - The chain ID to verify
 * @returns true if chainId === 42220
 */
export async function isCeloMainnet(chainId: number): Promise<boolean> {
  return chainId === CELO_CHAIN_ID;
}
