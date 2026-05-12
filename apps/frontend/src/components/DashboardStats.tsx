"use client";

import StatCard from "./StatCard";

export default function DashboardStats() {
  // Demo data — in production these come from Blockscout API + contracts
  const stats = [
    {
      title: "Total Transactions",
      value: 12847,
      change: "+18.2%",
      icon: "📊",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    },
    {
      title: "Active Users",
      value: 342,
      change: "+12.5%",
      icon: "👥",
      gradient: "linear-gradient(135deg, #06b6d4, #6366f1)",
    },
    {
      title: "Gas Usage",
      value: 4521,
      change: "+24.7%",
      icon: "⛽",
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
      suffix: "Gwei",
    },
    {
      title: "Active Streak",
      value: 12,
      change: "+3 days",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
      suffix: " days",
    },
    {
      title: "Activity Level",
      value: 4,
      change: "Gold Tier",
      icon: "🏆",
      gradient: "linear-gradient(135deg, #eab308, #f97316)",
      suffix: " / 10",
    },
    {
      title: "Activity Rate",
      value: 87,
      change: "+5.3%",
      icon: "🔥",
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
      suffix: "%",
    },
  ];

  return (
    <section id="dashboard" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Dashboard Overview</h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Real-time CeloPulse ecosystem metrics
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}
