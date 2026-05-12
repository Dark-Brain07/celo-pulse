"use client";

import { useState, useEffect, memo } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  gradient: string;
  suffix?: string;
}

/**
 * Animated stat card that displays a single metric with a count-up effect.
 * Memoized to prevent unnecessary re-renders when parent state changes.
 */
const StatCard = memo(function StatCard({ title, value, change, icon, gradient, suffix }: StatCardProps) {
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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="stat-card" 
      role="status" 
      aria-label={`${title}: ${value}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isHovered ? "0 10px 25px -5px rgba(99, 102, 241, 0.15)" : "none",
        borderColor: isHovered ? "rgba(99, 102, 241, 0.25)" : "rgba(255,255,255,0.06)"
      }}
    >
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
});

export default StatCard;
export type { StatCardProps };
