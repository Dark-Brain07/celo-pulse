"use client";

import React, { useState } from "react";
import { ITransaction, IHistoryProps } from "@/lib/types";
import { formatTimestamp, truncateHash } from "@/lib/utils";

/**
 * Transaction History panel that shows recent user interactions.
 * Fetches data from Blockscout API and displays in a scrollable list.
 */
export function TransactionHistory({ walletAddress }: IHistoryProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  React.useEffect(() => {
    if (!walletAddress) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BLOCKSCOUT_API || "https://explorer.celo.org/mainnet/api";
        const apiKey = process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY || "";
        const response = await fetch(
          `${apiUrl}?module=account&action=txlist&address=${walletAddress}&sort=desc&page=${page}&offset=15&apikey=${apiKey}`
        );
        const data = await response.json();

        if (data.result && Array.isArray(data.result)) {
          const mapped: ITransaction[] = data.result.map(
            (tx: Record<string, string>) => ({
              hash: tx.hash,
              method: decodeMethod(tx.input),
              contract: tx.to || "Contract Creation",
              timestamp: parseInt(tx.timeStamp), // Store as seconds for formatTimestamp
              status: tx.txreceipt_status === "1" ? "confirmed" : "failed",
              gasUsed: tx.gasUsed,
            })
          );
          if (page === 1) {
            setTransactions(mapped);
          } else {
            setTransactions((prev) => [...prev, ...mapped]);
          }
          setHasMore(mapped.length === 15);
        }
      } catch (err) {
        console.error("[TransactionHistory] Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (!walletAddress) {
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>📜 Transaction History</h3>
        <p style={emptyStyle}>Connect your wallet to view transaction history.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>📜 Transaction History</h3>

      {loading ? (
        <p style={emptyStyle}>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <div style={emptyContainerStyle}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "rgba(255,255,255,0.1)", marginBottom: 16 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
            No transactions found.
          </p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", marginTop: 4 }}>
            Start interacting with CeloNova to see history.
          </p>
        </div>
      ) : (
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {transactions.map((tx) => (
            <div key={tx.hash} style={rowStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: tx.status === "confirmed" ? "#35D07F" : "#ff6b6b",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{tx.method}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                    {formatTimestamp(tx.timestamp)}
                  </div>
                </div>
              </div>
              <a
                href={`https://celoscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.78rem",
                  color: "#35D07F",
                  textDecoration: "none",
                }}
              >
                {truncateHash(tx.hash)}
              </a>
            </div>
          ))}
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 16,
                background: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Decode common function selectors
function decodeMethod(input: string): string {
  if (!input || input === "0x") return "Transfer";
  const selector = input.slice(0, 10);
  const methods: Record<string, string> = {
    "0x183a4f6e": "Daily Check-In",
    "0x7c0f1ee7": "Play Action",
    "0xa9059cbb": "Send Tip",
    "0x3ccfd60b": "Withdraw",
    "0xd5f39488": "Register Referral",
    "0x1aa3a008": "Register",
  };
  return methods[selector] || `Contract Call (${selector})`;
}

const containerStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 24,
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  marginBottom: 16,
  color: "#fff",
};

const emptyStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.9rem",
  textAlign: "center",
  padding: "2rem 0",
};

const emptyContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  textAlign: "center",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
};
