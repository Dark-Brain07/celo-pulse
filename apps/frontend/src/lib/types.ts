export interface ITransaction {
  hash: string;
  method: string;
  contract: string;
  timestamp: number;
  status: "confirmed" | "pending" | "failed";
  gasUsed?: string;
}

export interface IHistoryProps {
  walletAddress: string | null;
}

export interface ITxSuccessEventPayload {
  hash: string;
  method: string;
  contractAddress: string;
  timestamp: number;
  pointsEarned?: number;
}
