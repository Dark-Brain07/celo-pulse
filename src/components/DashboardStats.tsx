"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACTS, BLOCKSCOUT_API, BLOCKSCOUT_API_KEY } from "@/lib/contracts";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  gradient: string;
  suffix?: string;
  loading?: boolean;
}

function StatCard({ title, value, change, icon, gradient, suffix, loading }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "string" ? parseFloat(value) || 0 : value;

  useEffect(() => {
    if (loading) return;
    let start = 0;
    const end = numericValue;
    if (end === 0) { setDisplayValue(0); return; }
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
  }, [numericValue, loading]);

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
              fontSize: "clamp(1.75rem, 4vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {loading ? "—" : displayValue.toLocaleString()}
            {suffix && !loading && <span style={{ fontSize: 16, marginLeft: 4 }}>{suffix}</span>}
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
            color: "#64748b",
          }}
        >
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalCheckIns: 0,
    uniqueUsers: 0,
    rewardPool: 0,
    totalClaims: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("https://forno.celo.org");

        const activityContract = new ethers.Contract(
          CONTRACTS.ACTIVITY_MANAGER.address,
          CONTRACTS.ACTIVITY_MANAGER.abi,
          provider
        );
        const rewardContract = new ethers.Contract(
          CONTRACTS.REWARD_DISTRIBUTOR.address,
          CONTRACTS.REWARD_DISTRIBUTOR.abi,
          provider
        );

        const [totalCheckIns, uniqueUsers, rewardPool, totalClaims] = await Promise.allSettled([
          activityContract.totalCheckIns(),
          activityContract.totalUniqueUsers(),
          rewardContract.rewardPool(),
          rewardContract.totalClaims(),
        ]);

        setStats({
          totalCheckIns: totalCheckIns.status === "fulfilled" ? Number(totalCheckIns.value) : 0,
          uniqueUsers: uniqueUsers.status === "fulfilled" ? Number(uniqueUsers.value) : 0,
          rewardPool:
            rewardPool.status === "fulfilled"
              ? parseFloat(ethers.formatEther(rewardPool.value))
              : 0,
          totalClaims: totalClaims.status === "fulfilled" ? Number(totalClaims.value) : 0,
        });
      } catch (err) {
        console.error("[DashboardStats] Failed to fetch onchain stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const displayStats = [
    {
      title: "Total Check-ins",
      value: stats.totalCheckIns,
      change: "Onchain from ActivityManager",
      icon: "📊",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    },
    {
      title: "Unique Users",
      value: stats.uniqueUsers,
      change: "Registered onchain",
      icon: "👥",
      gradient: "linear-gradient(135deg, #06b6d4, #6366f1)",
    },
    {
      title: "Reward Pool",
      value: stats.rewardPool,
      change: "Available in RewardDistributor",
      icon: "💰",
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
      suffix: "CELO",
    },
    {
      title: "Total Claims",
      value: stats.totalClaims,
      change: "Rewards distributed",
      icon: "🎁",
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    },
  ];

  return (
    <section id="dashboard" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Dashboard Overview</h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Onchain metrics from CeloPulse smart contracts
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {displayStats.map((stat) => (
          <StatCard key={stat.title} {...stat} loading={loading} />
        ))}
      </div>
    </section>
  );
}
