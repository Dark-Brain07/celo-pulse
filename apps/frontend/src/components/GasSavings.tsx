"use client";

import React, { useMemo } from "react";
import { useWallet } from "@/context/WalletContext";

/**
 * GasSavings Component
 * Visualizes the cost benefits of using Celo vs Ethereum.
 */
export function GasSavings({ totalTransactions = 0 }: { totalTransactions?: number }) {
  const { isMiniPay } = useWallet();

  // Simulated savings logic based on average gas prices
  // Ethereum avg tx: $2.50
  // Celo avg tx: $0.001
  const ETH_AVG_TX_COST = 2.50;
  const CELO_AVG_TX_COST = 0.001;

  const savings = useMemo(() => {
    const ethCost = totalTransactions * ETH_AVG_TX_COST;
    const celoCost = totalTransactions * CELO_AVG_TX_COST;
    const totalSaved = ethCost - celoCost;
    return {
      ethCost: ethCost.toFixed(2),
      celoCost: celoCost.toFixed(3),
      totalSaved: totalSaved.toFixed(2),
    };
  }, [totalTransactions]);

  if (totalTransactions === 0) return null;

  return (
    <div className="glass-card" style={{ padding: 24, marginBottom: 32 }} aria-label="Gas Savings Calculator">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>💎 Gas Savings</h3>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            Estimated savings by choosing Celo over Ethereum
          </p>
        </div>
        <div style={{
          background: "rgba(53, 208, 127, 0.1)",
          padding: "6px 12px",
          borderRadius: 20,
          border: "1px solid rgba(53, 208, 127, 0.2)",
          color: "#35D07F",
          fontSize: 12,
          fontWeight: 700
        }}>
          {isMiniPay ? "📱 MiniPay Optimized" : "⚡ Ultra Low Gas"}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ padding: 16, borderRadius: 12, background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Cost on Ethereum
          </p>
          <p style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>
            ${savings.ethCost}
          </p>
          <div style={{ height: 4, width: "100%", background: "rgba(239, 68, 68, 0.1)", borderRadius: 2, marginTop: 12 }}>
             <div style={{ height: "100%", width: "100%", background: "#ef4444", borderRadius: 2 }} />
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 12, background: "rgba(53, 208, 127, 0.03)", border: "1px solid rgba(53, 208, 127, 0.1)" }}>
          <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Cost on Celo
          </p>
          <p style={{ fontSize: 24, fontWeight: 800, color: "#35D07F" }}>
            ${savings.celoCost}
          </p>
          <div style={{ height: 4, width: "100%", background: "rgba(53, 208, 127, 0.1)", borderRadius: 2, marginTop: 12 }}>
             <div style={{ height: "100%", width: "1%", background: "#35D07F", borderRadius: 2 }} />
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: "16px 20px",
        borderRadius: 12,
        background: "linear-gradient(135deg, rgba(53, 208, 127, 0.1), rgba(252, 255, 81, 0.1))",
        border: "1px solid rgba(53, 208, 127, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>📈</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>Total Saved</p>
            <p style={{ fontSize: 12, color: "#94a3b8" }}>Across {totalTransactions} on-chain actions</p>
          </div>
        </div>
        <p style={{ fontSize: 28, fontWeight: 900, color: "#35D07F" }}>
          +${savings.totalSaved}
        </p>
      </div>
    </div>
  );
}

export default GasSavings;
