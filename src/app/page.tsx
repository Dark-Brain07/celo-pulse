"use client";

import Header from "@/components/Header";
import DashboardStats from "@/components/DashboardStats";
import ActivityGuide from "@/components/ActivityGuide";
import GasBanner from "@/components/GasBanner";
import UserActions from "@/components/UserActions";
import ReferralPanel from "@/components/ReferralPanel";
import StreakBadges from "@/components/StreakBadges";
import Charts from "@/components/Charts";
import Leaderboard from "@/components/Leaderboard";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <Header />

      {/* Hero Section */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "48px 24px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 20,
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            marginBottom: 24,
            fontSize: 13,
            color: "#8b5cf6",
            fontWeight: 600,
          }}
        >
          <span className="animate-pulse-glow">●</span>
          Live on Celo Mainnet
        </div>

        <h1
          style={{
            fontSize: 56,
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: "-0.03em",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Proof-of-Activity
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            on Celo
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#64748b",
            maxWidth: 600,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Check in daily, earn rewards, send tips, and climb the leaderboard.
          Every action generates real onchain activity.
        </p>

        {/* Quick stats */}
        <div
          style={{
            display: "inline-flex",
            gap: 32,
            padding: "16px 32px",
            borderRadius: 16,
            background: "rgba(17, 24, 39, 0.5)",
            border: "1px solid rgba(99, 102, 241, 0.1)",
          }}
        >
          {[
            { label: "Contracts", value: "5" },
            { label: "Actions", value: "8+" },
            { label: "Min TXs/Session", value: "5-10" },
            { label: "Referral Bonus", value: "2x" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: 24, fontWeight: 800, color: "#6366f1" }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "#64748b" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 48px" }}>
        {/* Gas warning banner — only shows if balance is low */}
        <GasBanner />

        {/* Dashboard overview */}
        <DashboardStats />

        {/* Activity guide with session progress — only shows when connected */}
        <ActivityGuide />

        {/* Core user actions */}
        <UserActions />

        {/* Streak & badges gamification */}
        <StreakBadges />

        {/* Referral program */}
        <ReferralPanel />

        {/* Analytics charts */}
        <Charts />

        {/* Leaderboard */}
        <Leaderboard />

        {/* Live Blockscout analytics */}
        <AnalyticsPanel />
      </main>

      <Footer />
    </div>
  );
}
