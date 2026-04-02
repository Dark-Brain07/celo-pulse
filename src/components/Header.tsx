"use client";

import { useWallet } from "@/context/WalletContext";

export default function Header() {
  const { address, balance, isConnecting, isConnected, connect, disconnect } = useWallet();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10, 14, 26, 0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
            }}
          >
            ⚡
          </div>
          <div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              CeloPulse
            </h1>
            <p style={{ fontSize: 11, color: "#64748b", marginTop: -2 }}>
              Proof-of-Activity
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", gap: 32 }}>
          {["Dashboard", "Actions", "Leaderboard", "Analytics"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Wallet */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isConnected && address ? (
            <>
              <div
                style={{
                  padding: "8px 16px",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "#10b981",
                  fontWeight: 600,
                }}
              >
                {parseFloat(balance).toFixed(3)} CELO
              </div>
              <button
                onClick={disconnect}
                style={{
                  padding: "8px 16px",
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "#6366f1",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {truncateAddress(address)}
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              onClick={connect}
              disabled={isConnecting}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {isConnecting ? (
                <span className="animate-pulse-glow">Connecting...</span>
              ) : (
                <>🔗 Connect Wallet</>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
