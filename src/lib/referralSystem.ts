/**
 * ReferralSystem Contract Reader
 *
 * Reads on-chain referral data from the deployed ReferralSystem contract
 * on Celo Mainnet using ethers.js v6.
 */

import { JsonRpcProvider, Contract } from "ethers";
import { CELO_CONTRACTS, CELO_MAINNET } from "@/lib/celoContracts";

// ─── ABI ───

/** Minimal ABI for the ReferralSystem contract (view functions only) */
export const REFERRAL_SYSTEM_ABI = [
  "function getReferrer(address user) view returns (address)",
  "function getReferralCount(address user) view returns (uint256)",
  "function getReferralRewards(address user) view returns (uint256)",
];

// ─── Types ───

export type ReferralStats = {
  referrer: string;
  referralCount: string;
  rewards: string;
};

// ─── Provider & Contract (lazy singletons) ───

let _provider: JsonRpcProvider | null = null;

function getProvider(): JsonRpcProvider {
  if (!_provider) {
    _provider = new JsonRpcProvider(CELO_MAINNET.rpcUrl);
  }
  return _provider;
}

function getReferralContract(): Contract {
  return new Contract(
    CELO_CONTRACTS.REFERRAL_SYSTEM,
    REFERRAL_SYSTEM_ABI,
    getProvider()
  );
}

// ─── Query Functions ───

/**
 * Fetches referral statistics for a given wallet address from the
 * on-chain ReferralSystem contract.
 *
 * @param walletAddress - The wallet address to look up
 * @returns A ReferralStats object with referrer, referralCount, and rewards
 */
export async function getReferralStats(
  walletAddress: string
): Promise<ReferralStats> {
  try {
    const contract = getReferralContract();

    const [referrer, referralCount, rewards] = await Promise.all([
      contract.getReferrer(walletAddress) as Promise<string>,
      contract.getReferralCount(walletAddress) as Promise<bigint>,
      contract.getReferralRewards(walletAddress) as Promise<bigint>,
    ]);

    return {
      referrer,
      referralCount: referralCount.toString(),
      rewards: rewards.toString(),
    };
  } catch (error) {
    console.error("[referralSystem] getReferralStats failed:", error);
    return {
      referrer: "0x0000000000000000000000000000000000000000",
      referralCount: "0",
      rewards: "0",
    };
  }
}
