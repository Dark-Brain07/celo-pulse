export interface ITransaction {
  id: string;
  type: "referral" | "claim" | "play" | "react";
  amount?: string;
  timestamp: number;
  hash: string;
  status: "success" | "pending" | "failed";
}

export interface IHistoryProps {
  transactions: ITransaction[];
  loading?: boolean;
}
