/**
 * MiniPay Transaction Helper
 *
 * Provides utilities for sending Celo transactions with MiniPay-specific
 * fee currency support and gas estimation.
 */

import { ethers } from "ethers";

// ─── Constants ───

/** cUSD token contract address on Celo Mainnet */
export const CUSD_MAINNET = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

// ─── Types ───

export type MiniPayTxOptions = {
  to: string;
  value: string;
  data?: string;
  isMiniPay: boolean;
};

// ─── Transaction Functions ───

/**
 * Sends a transaction via the given signer, optionally attaching MiniPay
 * fee-currency metadata so that gas is paid in cUSD.
 *
 * @param signer   - An ethers Signer instance (e.g. from MiniPay provider)
 * @param options  - Transaction target, value, optional calldata, and MiniPay flag
 * @returns The transaction hash as a hex string
 */
export async function sendMiniPayTransaction(
  signer: ethers.Signer,
  options: MiniPayTxOptions
): Promise<string> {
  try {
    const tx: Record<string, unknown> = {
      to: options.to,
      value: ethers.parseEther(options.value),
    };

    if (options.data) {
      tx.data = options.data;
    }

    if (options.isMiniPay) {
      tx.customData = { feeCurrency: CUSD_MAINNET };
    }

    const txResponse = await signer.sendTransaction(
      tx as ethers.TransactionRequest
    );
    return txResponse.hash;
  } catch (error) {
    console.error("[miniPayTx] sendMiniPayTransaction failed:", error);
    throw error;
  }
}

/**
 * Estimates gas for a given transaction request and returns a
 * human-readable formatted string.
 *
 * @param provider - An ethers Provider instance
 * @param tx       - The transaction request to estimate
 * @returns The estimated gas as a formatted string (e.g. "21000")
 */
export async function estimateCeloGas(
  provider: ethers.Provider,
  tx: ethers.TransactionRequest
): Promise<string> {
  try {
    const gasEstimate = await provider.estimateGas(tx);
    return gasEstimate.toString();
  } catch (error) {
    console.error("[miniPayTx] estimateCeloGas failed:", error);
    throw error;
  }
}
