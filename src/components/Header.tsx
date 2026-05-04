"use client";

import { useWallet } from "@/context/WalletContext";
import { MINIPAY_INFO } from "@/lib/miniPay";

export default function Header() {
  const { address, balance, isConnecting, isConnected, isMiniPay, connect, disconnect } = useWallet();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <>
      {/* MiniPay Banner */}
      {isMiniPay ? (
        <div
          id="minipay-banner"
          style={{
            background: "linear-gradient(90deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08))",
            borderBottom: "1px solid rgba(16, 185, 129, 0.2)",
            padding: "8px 24px",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>✅</span>
          Connected via MiniPay — Gas fees paid in USDm
        </div>
      ) : (
        <div
          id="minipay-info-banner"
          style={{
            background: "linear-gradient(90deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.06))",
            borderBottom: "1px solid rgba(99, 102, 241, 0.12)",
            padding: "8px 24px",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 500,
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14 }}>📱</span>
          Open in MiniPay for the best experience
          <a
            href={MINIPAY_INFO.downloadLinks.web}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#8b5cf6",
              textDecoration: "underline",
              fontWeight: 600,
              marginLeft: 4,
            }}
          >
            Get MiniPay →
          </a>
        </div>
      )}

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
            <img
              src="/logo.png"
              alt="CeloPulse"
              style={{
                width: 120,
                height: 120,
                objectFit: "contain",
                margin: "-40px -20px -40px -30px",
                pointerEvents: "none",
              }}
            />
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
                {/* In MiniPay, show address badge instead of disconnect button */}
                {isMiniPay ? (
                  <div
                    style={{
                      padding: "8px 16px",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.15)",
                      borderRadius: 10,
                      fontSize: 13,
                      color: "#10b981",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 10 }}>●</span>
                    {truncateAddress(address)}
                  </div>
                ) : (
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
                )}
              </>
            ) : (
              /* Hide Connect Wallet button entirely when inside MiniPay */
              !isMiniPay && (
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
              )
            )}
          </div>
        </div>
      </header>
    </>
  );
}
