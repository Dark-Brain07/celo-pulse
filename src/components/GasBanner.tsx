"use client";

import { useWallet } from "@/context/WalletContext";
import { CELO_FAUCET_URL } from "@/lib/contracts";

export default function GasBanner() {
  const { isConnected, balance } = useWallet();

  // Only show if connected and balance is very low
  if (!isConnected) return null;
  const balanceNum = parseFloat(balance);
  if (balanceNum >= 0.01) return null;

  return (
    <div
      style={{
        margin: "0 0 24px",
        padding: "16px 24px",
        borderRadius: 14,
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.05))",
        border: "1px solid rgba(245, 158, 11, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "rgba(245, 158, 11, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          ⛽
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b" }}>
            Low Gas Balance Detected
          </p>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
            You need CELO to perform transactions.{" "}
            {balanceNum === 0
              ? "Your balance is 0 CELO."
              : `Current balance: ${balanceNum.toFixed(4)} CELO.`}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <a
          href={CELO_FAUCET_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "#0a0e1a",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          🚰 Get Test CELO
        </a>
        <a
          href="https://app.ubeswap.org/#/swap"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "1px solid rgba(245, 158, 11, 0.3)",
            background: "transparent",
            color: "#f59e0b",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Buy CELO
        </a>
      </div>
    </div>
  );
}
