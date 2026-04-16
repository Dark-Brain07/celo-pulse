"use client";

import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
}

/**
 * Skeleton loading placeholder component.
 * Displays a pulsing animation while content is loading.
 */
export function Skeleton({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
        backgroundSize: "200% 100%",
        animation: "skeletonShimmer 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

/**
 * Card-shaped skeleton for dashboard widgets.
 */
export function CardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Skeleton width="40%" height={16} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} width={`${85 - i * 15}%`} height={12} />
      ))}
      <Skeleton width="60%" height={40} borderRadius={12} />
    </div>
  );
}

/**
 * Stat card skeleton for the dashboard hero section.
 */
export function StatSkeleton() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minWidth: 160,
      }}
    >
      <Skeleton width={80} height={12} />
      <Skeleton width={120} height={28} />
      <Skeleton width={60} height={10} />
    </div>
  );
}

/**
 * Leaderboard row skeleton.
 */
export function LeaderboardRowSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Skeleton width={32} height={32} borderRadius="50%" />
      <Skeleton width="40%" height={14} />
      <div style={{ marginLeft: "auto" }}>
        <Skeleton width={60} height={14} />
      </div>
    </div>
  );
}
