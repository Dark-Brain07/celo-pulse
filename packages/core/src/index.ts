export const CORE_VERSION = "1.0.0";

/**
 * Standardized user scoring data structure
 */
export interface UserScore {
  score: number;
  rank: number;
  lastUpdated: number;
  isActive: boolean;
}

/**
 * Onchain activity definition for frontend indexing
 */
export interface Activity {
  id: string;
  type: "TIP" | "PLAY" | "REACT" | "CHECK_IN" | "REFERRAL";
  timestamp: number;
  txHash: string;
}
