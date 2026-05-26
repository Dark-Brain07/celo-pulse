"use client";

import { useLeaderboard } from "../hooks/useLeaderboard";
import { useMiniPay } from "../hooks/useMiniPay";

function RankBadge({ rank }: { rank: number }) {
  const emoji = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  if (emoji) {
    return (
      <div
        className={`rank-badge rank-${rank}`}
        style={{ fontSize: 18 }}
      >
        {emoji}
      </div>
    );
  }

  return (
    <div
      className="rank-badge"
      style={{
        background: "rgba(99, 102, 241, 0.1)",
        border: "1px solid rgba(99, 102, 241, 0.15)",
        color: "#94a3b8",
      }}
    >
      {rank}
    </div>
  );
}

export default function Leaderboard() {
  const { address } = useMiniPay();
  const { entries, userRank, loading: isLoading } = useLeaderboard(address);

  return (
    <section id="leaderboard" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Leaderboard</h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Top users ranked by on-chain activity score
        </p>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 120px",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
            fontSize: 12,
            fontWeight: 600,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span>Rank</span>
          <span>Address</span>
          <span style={{ textAlign: "right" }}>Score</span>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-shimmer"
                style={{
                  height: 60,
                  borderBottom: "1px solid rgba(99, 102, 241, 0.05)",
                }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && entries.length === 0 && (
          <div style={{ padding: "32px 20px", textAlign: "center", color: "#64748b" }}>
            No leaderboard data available yet.
          </div>
        )}

        {/* Leaderboard rows */}
        {!isLoading &&
          entries.map((entry) => (
            <div
              key={entry.rank}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 120px",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(99, 102, 241, 0.06)",
                transition: "all 0.2s",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99, 102, 241, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <RankBadge rank={entry.rank} />
              <div>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 14,
                    color: entry.rank <= 3 ? "#f1f5f9" : "#94a3b8",
                    fontWeight: entry.rank <= 3 ? 600 : 400,
                  }}
                >
                  {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                </span>
              </div>
              <span
                style={{
                  textAlign: "right",
                  fontWeight: 700,
                  fontSize: 15,
                  background:
                    entry.rank === 1
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {Number(entry.score).toLocaleString()}
              </span>
            </div>
          ))}

        {/* User rank footer */}
        {!isLoading && userRank > 0 && (
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid rgba(99, 102, 241, 0.15)",
              background: "rgba(99, 102, 241, 0.06)",
              fontSize: 13,
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            Your rank: <strong style={{ color: "#a78bfa" }}>#{userRank}</strong>
          </div>
        )}
      </div>
    </section>
  );
}
