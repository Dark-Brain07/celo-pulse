"use client";

import { useWallet } from "@/context/WalletContext";

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirement: string;
  earned: boolean;
  progress: number; // 0-100
}

export default function StreakBadges() {
  const { isConnected } = useWallet();

  // Demo badges — in production, computed from contract data
  const badges: Badge[] = [
    {
      id: "first_checkin",
      name: "First Step",
      icon: "🌱",
      description: "Complete your first check-in",
      requirement: "1 check-in",
      earned: true,
      progress: 100,
    },
    {
      id: "weekly_warrior",
      name: "Weekly Warrior",
      icon: "⚔️",
      description: "7-day check-in streak",
      requirement: "7 day streak",
      earned: false,
      progress: 57,
    },
    {
      id: "monthly_master",
      name: "Monthly Master",
      icon: "👑",
      description: "30-day check-in streak",
      requirement: "30 day streak",
      earned: false,
      progress: 13,
    },
    {
      id: "century_champion",
      name: "Century Champion",
      icon: "🏆",
      description: "100 total check-ins",
      requirement: "100 check-ins",
      earned: false,
      progress: 4,
    },
    {
      id: "tipper",
      name: "Generous Tipper",
      icon: "💎",
      description: "Send 10 tips to other users",
      requirement: "10 tips sent",
      earned: false,
      progress: 30,
    },
    {
      id: "action_hero",
      name: "Action Hero",
      icon: "🎮",
      description: "Perform 50 micro-actions",
      requirement: "50 actions",
      earned: false,
      progress: 24,
    },
    {
      id: "referrer",
      name: "Growth Driver",
      icon: "👥",
      description: "Refer 5 new users",
      requirement: "5 referrals",
      earned: false,
      progress: 0,
    },
    {
      id: "combo_king",
      name: "Combo King",
      icon: "🔥",
      description: "Hit 3 action combos in one session",
      requirement: "3 combos",
      earned: false,
      progress: 33,
    },
  ];

  if (!isConnected) return null;

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>
            🏅 Activity Badges
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
            Earn badges through consistent activity — {earnedCount}/{badges.length} earned
          </p>
        </div>
        <div
          style={{
            padding: "6px 16px",
            borderRadius: 20,
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            fontSize: 13,
            fontWeight: 600,
            color: "#8b5cf6",
          }}
        >
          Level {Math.floor(earnedCount / 2) + 1}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              padding: 18,
              borderRadius: 14,
              background: badge.earned
                ? "rgba(16, 185, 129, 0.06)"
                : "rgba(17, 24, 39, 0.5)",
              border: `1px solid ${
                badge.earned ? "rgba(16, 185, 129, 0.2)" : "rgba(99, 102, 241, 0.08)"
              }`,
              transition: "all 0.2s",
              cursor: "pointer",
              opacity: badge.progress > 0 ? 1 : 0.6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = badge.earned
                ? "rgba(16, 185, 129, 0.4)"
                : "rgba(99, 102, 241, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = badge.earned
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(99, 102, 241, 0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 28, filter: badge.earned ? "none" : "grayscale(0.5)" }}>
                {badge.icon}
              </span>
              {badge.earned && (
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "#10b981",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  ✓ EARNED
                </span>
              )}
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: badge.earned ? "#10b981" : "#f1f5f9" }}>
              {badge.name}
            </p>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{badge.description}</p>

            {/* Progress bar */}
            {!badge.earned && (
              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: "rgba(99, 102, 241, 0.1)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${badge.progress}%`,
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      borderRadius: 2,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
                <p style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                  {badge.progress}% • {badge.requirement}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
