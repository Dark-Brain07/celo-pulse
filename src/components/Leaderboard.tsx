"use client";

import { useState, useEffect } from "react";

interface LeaderboardEntry {
  rank: number;
  address: string;
  score: number;
  checkIns: number;
  actions: number;
  streak: number;
}

// Demo leaderboard data — in production, fetched from Leaderboard contract
const demoLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: "0x1234...abcd", score: 4850, checkIns: 45, actions: 312, streak: 14 },
  { rank: 2, address: "0x5678...efgh", score: 3920, checkIns: 38, actions: 256, streak: 11 },
  { rank: 3, address: "0x9abc...ijkl", score: 3410, checkIns: 32, actions: 198, streak: 9 },
  { rank: 4, address: "0xdef0...mnop", score: 2890, checkIns: 28, actions: 167, streak: 7 },
  { rank: 5, address: "0x1357...qrst", score: 2340, checkIns: 22, actions: 145, streak: 5 },
  { rank: 6, address: "0x2468...uvwx", score: 1980, checkIns: 19, actions: 121, streak: 4 },
  { rank: 7, address: "0x3690...yzab", score: 1560, checkIns: 15, actions: 98, streak: 3 },
  { rank: 8, address: "0x4812...cdef", score: 1230, checkIns: 12, actions: 76, streak: 2 },
  { rank: 9, address: "0x5934...ghij", score: 890, checkIns: 9, actions: 54, streak: 2 },
  { rank: 10, address: "0x6045...klmn", score: 650, checkIns: 6, actions: 38, streak: 1 },
];

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
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setEntries(demoLeaderboard);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="leaderboard" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Leaderboard</h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Top users ranked by activity score
        </p>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 100px 100px 100px 80px",
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
          <span style={{ textAlign: "right" }}>Check-ins</span>
          <span style={{ textAlign: "right" }}>Actions</span>
          <span style={{ textAlign: "right" }}>Streak</span>
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

        {/* Leaderboard rows */}
        {!isLoading &&
          entries.map((entry) => (
            <div
              key={entry.rank}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 100px 100px 100px 80px",
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
                  {entry.address}
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
                {entry.score.toLocaleString()}
              </span>
              <span style={{ textAlign: "right", color: "#94a3b8", fontSize: 14 }}>
                {entry.checkIns}
              </span>
              <span style={{ textAlign: "right", color: "#94a3b8", fontSize: 14 }}>
                {entry.actions}
              </span>
              <span style={{ textAlign: "right" }}>
                {entry.streak > 0 && (
                  <span
                    className="streak-badge streak-fire"
                    style={{ fontSize: 12, padding: "3px 8px" }}
                  >
                    🔥 {entry.streak}
                  </span>
                )}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}
