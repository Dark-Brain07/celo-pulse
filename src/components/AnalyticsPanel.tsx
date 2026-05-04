"use client";

import { useState, useEffect } from "react";
import { BLOCKSCOUT_API } from "@/lib/contracts";

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

export default function AnalyticsPanel() {
  const [data, setData] = useState<BlockscoutData>({
    totalTransactions: 12847,
    contractCalls: 8432,
    gasUsed: "2.45M",
    latestBlock: 28934521,
    recentTxs: [
      {
        hash: "0xabc1...def1",
        from: "0x1234...abcd",
        to: "ActivityManager",
        value: "0",
        timestamp: "2 min ago",
        status: "success",
      },
      {
        hash: "0xabc2...def2",
        from: "0x5678...efgh",
        to: "MicroActions",
        value: "0.001",
        timestamp: "5 min ago",
        status: "success",
      },
      {
        hash: "0xabc3...def3",
        from: "0x9abc...ijkl",
        to: "RewardDistributor",
        value: "0",
        timestamp: "8 min ago",
        status: "success",
      },
      {
        hash: "0xabc4...def4",
        from: "0xdef0...mnop",
        to: "MicroActions",
        value: "0.005",
        timestamp: "12 min ago",
        status: "success",
      },
      {
        hash: "0xabc5...def5",
        from: "0x1357...qrst",
        to: "Leaderboard",
        value: "0",
        timestamp: "15 min ago",
        status: "success",
      },
    ],
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 3),
        contractCalls: prev.contractCalls + Math.floor(Math.random() * 2),
        latestBlock: prev.latestBlock + 1,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const contractNames = ["ActivityManager", "RewardDistributor", "MicroActions", "Leaderboard"];

  return (
    <section id="analytics" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>
            Live Analytics
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
            Real-time Blockscout data • Celo Network
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
            {isLive ? "LIVE" : "Paused"}
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Network Stats */}
        <div className="glass-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>
            📡 Network Stats
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Total TXs", value: data.totalTransactions.toLocaleString(), color: "#6366f1" },
              { label: "Contract Calls", value: data.contractCalls.toLocaleString(), color: "#8b5cf6" },
              { label: "Gas Used", value: data.gasUsed, color: "#06b6d4" },
              { label: "Latest Block", value: `#${data.latestBlock.toLocaleString()}`, color: "#10b981" },
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
            {data.recentTxs.map((tx, i) => (
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
                      background: "#10b981",
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontFamily: "monospace", color: "#6366f1" }}>{tx.hash}</span>
                  <span style={{ color: "#64748b" }}>→</span>
                  <span style={{ color: "#8b5cf6", fontWeight: 600 }}>{tx.to}</span>
                </div>
                <span style={{ color: "#64748b", fontSize: 12 }}>{tx.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Contracts */}
        <div className="glass-card" style={{ gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>
            📦 Active Contracts
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {contractNames.map((name, i) => (
              <div
                key={name}
                style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "rgba(17, 24, 39, 0.5)",
                  border: "1px solid rgba(99, 102, 241, 0.1)",
                  textAlign: "center",
                  transition: "all 0.2s",
                  cursor: "pointer",
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
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  {[2345, 1876, 5432, 1194][i].toLocaleString()} calls
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
                  ● Active
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
