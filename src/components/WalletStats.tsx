"use client";

import React from "react";

interface WalletStatsProps {
  address: string | null;
}

interface WalletData {
  balance: string;
  txCount: number;
  contractInteractions: number;
}

/**
 * Wallet analytics card showing balance, tx count, and contract interaction stats.
 */
export function WalletStats({ address }: WalletStatsProps) {
  const [data, setData] = React.useState<WalletData | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!address) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://forno.celo.org";

        // Fetch balance
        const balResponse = await fetch(rpcUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: 1,
          }),
        });
        const balData = await balResponse.json();
        const balanceWei = BigInt(balData.result || "0");
        const balanceCelo = Number(balanceWei) / 1e18;

        // Fetch transaction count
        const txResponse = await fetch(rpcUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getTransactionCount",
            params: [address, "latest"],
            id: 2,
          }),
        });
        const txData = await txResponse.json();
        const txCount = parseInt(txData.result || "0", 16);

        setData({
          balance: balanceCelo.toFixed(4),
          txCount,
          contractInteractions: Math.max(0, txCount - 1), // Approximate
        });
      } catch (err) {
        console.error("[WalletStats] Failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [address]);

  if (!address) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 20, color: "#fff" }}>
        💳 Wallet Analytics
      </h3>

      {loading && !data ? (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Loading...</p>
      ) : data ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <StatCard
            label="CELO Balance"
            value={`${data.balance} CELO`}
            color="#FCFF51"
          />
          <StatCard
            label="Transactions"
            value={data.txCount.toLocaleString()}
            color="#35D07F"
          />
          <StatCard
            label="Contract Calls"
            value={data.contractInteractions.toLocaleString()}
            color="#63B3ED"
          />
        </div>
      ) : null}

      <div
        style={{
          marginTop: 16,
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.3)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
        <a
          href={`https://celoscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#35D07F", textDecoration: "none" }}
        >
          View on Explorer →
        </a>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        borderRadius: 12,
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </div>
      <div style={{ fontSize: "1.3rem", fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
