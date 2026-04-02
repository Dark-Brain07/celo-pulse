"use client";

import { useState, useEffect } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  gradient: string;
  suffix?: string;
}

function StatCard({ title, value, change, icon, gradient, suffix }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "string" ? parseFloat(value) || 0 : value;

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (end === 0) return;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="stat-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
            {title}
          </p>
          <p
            className="animate-count-up"
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayValue.toLocaleString()}
            {suffix && <span style={{ fontSize: 16, marginLeft: 4 }}>{suffix}</span>}
          </p>
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: gradient,
            opacity: 0.15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            position: "relative",
          }}
        >
          <span style={{ position: "absolute", opacity: 1 / 0.15, fontSize: 22 }}>{icon}</span>
        </div>
      </div>
      {change && (
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: change.startsWith("+") ? "#10b981" : "#ef4444",
          }}
        >
          <span>{change.startsWith("+") ? "↗" : "↘"}</span>
          <span style={{ fontWeight: 600 }}>{change}</span>
          <span style={{ color: "#64748b" }}>vs last week</span>
        </div>
      )}
    </div>
  );
}

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
