"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@/context/WalletContext";

interface ActivitySuggestion {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  available: boolean;
  urgency: "now" | "soon" | "later";
  cooldownEnd?: number;
}

export default function ActivityGuide() {
  const { isConnected, address } = useWallet();
  const [suggestions, setSuggestions] = useState<ActivitySuggestion[]>([]);
  const [sessionTxCount, setSessionTxCount] = useState(0);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    // Generate activity suggestions based on current state
    const now = Date.now();
    setSuggestions([
      {
        id: "checkin",
        title: "Daily Check-in",
        description: "Start your day with a check-in to maintain your streak",
        icon: "📅",
        points: 10,
        available: true,
        urgency: "now",
      },
      {
        id: "play1",
        title: "Play Action #1",
        description: "Quick play — only 30s cooldown between plays!",
        icon: "🎮",
        points: 5,
        available: true,
        urgency: "now",
      },
      {
        id: "play2",
        title: "Play Action #2",
        description: "Chain multiple plays for combo bonuses",
        icon: "🎮",
        points: 5,
        available: true,
        urgency: "soon",
        cooldownEnd: now + 30000,
      },
      {
        id: "react",
        title: "Quick React",
        description: "React to the community — 5 options available",
        icon: "⚡",
        points: 5,
        available: true,
        urgency: "now",
      },
      {
        id: "tip",
        title: "Send a Tip",
        description: "Support another user with a micro-tip",
        icon: "💸",
        points: 25,
        available: true,
        urgency: "now",
      },
      {
        id: "claim",
        title: "Claim Rewards",
        description: "Collect your earned rewards when threshold is met",
        icon: "🎁",
        points: 0,
        available: false,
        urgency: "later",
      },
    ]);
  }, [isConnected, address]);

  if (!isConnected) return null;

  const completedCount = suggestions.filter((s) => !s.available).length;
  const totalPossiblePoints = suggestions.reduce((sum, s) => sum + s.points, 0);

  return (
    <section style={{ marginBottom: 32 }}>
      {/* Activity Progress Banner */}
      <div
        className="glass-card"
        style={{
          padding: 0,
          overflow: "hidden",
          marginBottom: 20,
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05))",
        }}
      >
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                boxShadow: "0 0 24px rgba(99, 102, 241, 0.4)",
              }}
            >
              🎯
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9" }}>
                Activity Session
              </h3>
              <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
                {sessionTxCount} transactions this session •{" "}
                <span style={{ color: sessionTxCount >= 5 ? "#10b981" : "#f59e0b" }}>
                  {sessionTxCount >= 10 ? "🔥 On fire!" : sessionTxCount >= 5 ? "✅ Great pace!" : "⚡ Keep going!"}
                </span>
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Session TX counter */}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: sessionTxCount >= 5 ? "#10b981" : "#6366f1" }}>
                {sessionTxCount}
              </p>
              <p style={{ fontSize: 11, color: "#64748b" }}>/ 10 target</p>
            </div>

            {/* Progress ring */}
            <div style={{ position: "relative", width: 48, height: 48 }}>
              <svg viewBox="0 0 36 36" style={{ width: 48, height: 48, transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={sessionTxCount >= 10 ? "#10b981" : "#6366f1"}
                  strokeWidth="3"
                  strokeDasharray="97.4"
                  strokeDashoffset={97.4 - (Math.min(sessionTxCount, 10) / 10) * 97.4}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#f1f5f9",
                }}
              >
                {Math.round((Math.min(sessionTxCount, 10) / 10) * 100)}%
              </span>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid rgba(99, 102, 241, 0.2)",
                background: "transparent",
                color: "#94a3b8",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {expanded ? "▼ Hide" : "▶ Show"} Guide
            </button>
          </div>
        </div>

        {/* Suggestions list */}
        {expanded && (
          <div style={{ borderTop: "1px solid rgba(99, 102, 241, 0.08)", padding: "16px 24px" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Suggested Actions — earn up to {totalPossiblePoints} points
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: s.urgency === "now"
                      ? "rgba(99, 102, 241, 0.06)"
                      : "rgba(17, 24, 39, 0.4)",
                    border: `1px solid ${
                      s.urgency === "now"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "rgba(99, 102, 241, 0.06)"
                    }`,
                    opacity: s.available ? 1 : 0.5,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{s.title}</p>
                    <p style={{ fontSize: 11, color: "#64748b" }}>{s.description}</p>
                  </div>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      background:
                        s.urgency === "now"
                          ? "rgba(16, 185, 129, 0.15)"
                          : s.urgency === "soon"
                          ? "rgba(245, 158, 11, 0.15)"
                          : "rgba(100, 116, 139, 0.15)",
                      color:
                        s.urgency === "now"
                          ? "#10b981"
                          : s.urgency === "soon"
                          ? "#f59e0b"
                          : "#64748b",
                    }}
                  >
                    {s.urgency === "now" ? "DO NOW" : s.urgency === "soon" ? "SOON" : "LATER"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
