"use client";

import { useState, useEffect, useCallback } from "react";
import { BLOCKSCOUT_API, BLOCKSCOUT_API_KEY } from "@/lib/contracts";
import { CONTRACT_ADDRESSES } from "@/lib/constants";

interface BlockscoutData {
  totalTransactions: number;
  contractCalls: number;
  gasUsed: string;
  latestBlock: number;
  recentTxs: {
    hash: string;
    from: string;
    to: string;
    value: string;
    timestamp: string;
    status: string;
  }[];
}

const contractNameMap: Record<string, string> = {
  [CONTRACT_ADDRESSES.ActivityManager.toLowerCase()]: "ActivityManager",
  [CONTRACT_ADDRESSES.RewardDistributor.toLowerCase()]: "RewardDistributor",
  [CONTRACT_ADDRESSES.MicroActions.toLowerCase()]: "MicroActions",
  [CONTRACT_ADDRESSES.Leaderboard.toLowerCase()]: "Leaderboard",
  [CONTRACT_ADDRESSES.ReferralSystem.toLowerCase()]: "ReferralSystem",
};

function resolveContractName(address: string): string {
  return contractNameMap[address.toLowerCase()] || `${address.slice(0, 8)}...${address.slice(-6)}`;
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function AnalyticsPanel() {
  const [data, setData] = useState<BlockscoutData>({
    totalTransactions: 0,
    contractCalls: 0,
    gasUsed: "—",
    latestBlock: 0,
    recentTxs: [],
  });
  const [isLive, setIsLive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      // Fetch recent transactions for the ActivityManager contract
      const apiKey = BLOCKSCOUT_API_KEY ? `&apikey=${BLOCKSCOUT_API_KEY}` : "";
      const contractAddress = CONTRACT_ADDRESSES.ActivityManager;

      const response = await fetch(
        `${BLOCKSCOUT_API}?module=account&action=txlist&address=${contractAddress}&sort=desc&page=1&offset=10${apiKey}`
      );
      const result = await response.json();

      if (result.status === "1" && Array.isArray(result.result)) {
        const txs = result.result;
        const recentTxs = txs.slice(0, 5).map((tx: Record<string, string>) => ({
          hash: `${tx.hash.slice(0, 8)}...${tx.hash.slice(-6)}`,
          from: `${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`,
          to: resolveContractName(tx.to || ""),
          value: tx.value === "0" ? "0" : (parseInt(tx.value) / 1e18).toFixed(4),
          timestamp: formatTimeAgo(parseInt(tx.timeStamp) * 1000),
          status: tx.txreceipt_status === "1" ? "success" : "failed",
        }));

        // Calculate stats from returned data
        const totalGas = txs.reduce(
          (sum: number, tx: Record<string, string>) => sum + parseInt(tx.gasUsed || "0"),
          0
        );

        setData({
          totalTransactions: txs.length,
          contractCalls: txs.filter((tx: Record<string, string>) => tx.input && tx.input !== "0x").length,
          gasUsed: totalGas > 1_000_000 ? `${(totalGas / 1_000_000).toFixed(2)}M` : totalGas.toLocaleString(),
          latestBlock: parseInt(txs[0]?.blockNumber || "0"),
          recentTxs,
        });
        setError(null);
      } else {
        setError("No transaction data available");
      }
    } catch (err) {
      console.error("[AnalyticsPanel] Fetch error:", err);
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Auto-refresh every 30 seconds when live
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [isLive, fetchAnalytics]);

  const contractNames = ["ActivityManager", "RewardDistributor", "MicroActions", "Leaderboard"];

  return (
    <section id="analytics" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>
            Contract Analytics
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
            Blockscout data • Celo Mainnet
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isLive ? "#10b981" : "#64748b",
              boxShadow: isLive ? "0 0 8px rgba(16, 185, 129, 0.6)" : "none",
            }}
            className={isLive ? "animate-pulse-glow" : ""}
          />
          <span style={{ fontSize: 13, color: isLive ? "#10b981" : "#64748b", fontWeight: 600 }}>
            {isLive ? "AUTO-REFRESH" : "Paused"}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              borderRadius: 6,
              border: "1px solid rgba(99, 102, 241, 0.2)",
              background: "transparent",
              color: "#94a3b8",
              cursor: "pointer",
              marginLeft: 8,
            }}
          >
            {isLive ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="glass-card" style={{ textAlign: "center", padding: 48 }}>
          <p style={{ color: "#64748b" }}>Loading analytics from Blockscout...</p>
        </div>
      ) : error ? (
        <div className="glass-card" style={{ textAlign: "center", padding: 48 }}>
          <p style={{ color: "#94a3b8", marginBottom: 12 }}>{error}</p>
          <button
            onClick={fetchAnalytics}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#6366f1",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Network Stats */}
          <div className="glass-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>
              📡 Contract Stats
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Recent TXs", value: data.totalTransactions.toLocaleString(), color: "#6366f1" },
                { label: "Contract Calls", value: data.contractCalls.toLocaleString(), color: "#8b5cf6" },
                { label: "Gas Used", value: data.gasUsed, color: "#06b6d4" },
                { label: "Latest Block", value: data.latestBlock ? `#${data.latestBlock.toLocaleString()}` : "—", color: "#10b981" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: "rgba(17, 24, 39, 0.5)",
                    border: "1px solid rgba(99, 102, 241, 0.08)",
                  }}
                >
                  <p style={{ fontSize: 11, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="glass-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>
              🔄 Recent Transactions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.recentTxs.length === 0 ? (
                <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", padding: 24 }}>
                  No recent transactions found
                </p>
              ) : (
                data.recentTxs.map((tx, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: "rgba(17, 24, 39, 0.5)",
                      border: "1px solid rgba(99, 102, 241, 0.06)",
                      fontSize: 13,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: tx.status === "success" ? "#10b981" : "#ef4444",
                          display: "inline-block",
                        }}
                      />
                      <span style={{ fontFamily: "monospace", color: "#6366f1" }}>{tx.hash}</span>
                      <span style={{ color: "#64748b" }}>→</span>
                      <span style={{ color: "#8b5cf6", fontWeight: 600 }}>{tx.to}</span>
                    </div>
                    <span style={{ color: "#64748b", fontSize: 12 }}>{tx.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Contracts */}
          <div className="glass-card" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>
              📦 Deployed Contracts
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {contractNames.map((name, i) => (
                <a
                  key={name}
                  href={`https://celoscan.io/address/${Object.values(CONTRACT_ADDRESSES)[i]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: 20,
                    borderRadius: 12,
                    background: "rgba(17, 24, 39, 0.5)",
                    border: "1px solid rgba(99, 102, 241, 0.1)",
                    textAlign: "center",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <p style={{ fontSize: 28, marginBottom: 8 }}>
                    {["📅", "🎁", "🎮", "🏆"][i]}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{name}</p>
                  <p style={{ fontSize: 11, color: "#64748b", marginTop: 4, fontFamily: "monospace" }}>
                    {Object.values(CONTRACT_ADDRESSES)[i].slice(0, 6)}...{Object.values(CONTRACT_ADDRESSES)[i].slice(-4)}
                  </p>
                  <div
                    style={{
                      marginTop: 12,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      fontSize: 11,
                      color: "#10b981",
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    View on Explorer ↗
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
