"use client";

import { useState } from "react";

// Simple SVG chart since recharts may have SSR issues
// We'll render inline SVG charts for the dashboard

interface DataPoint {
  label: string;
  value: number;
}

const activityData: DataPoint[] = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 150 },
  { label: "Thu", value: 240 },
  { label: "Fri", value: 200 },
  { label: "Sat", value: 310 },
  { label: "Sun", value: 280 },
];

const gasData: DataPoint[] = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 95 },
  { label: "Fri", value: 80 },
  { label: "Sat", value: 120 },
  { label: "Sun", value: 105 },
];

const growthData: DataPoint[] = [
  { label: "W1", value: 42 },
  { label: "W2", value: 78 },
  { label: "W3", value: 115 },
  { label: "W4", value: 165 },
  { label: "W5", value: 220 },
  { label: "W6", value: 290 },
  { label: "W7", value: 342 },
];

function AreaChart({
  data,
  color,
  gradientId,
  height = 200,
}: {
  data: DataPoint[];
  color: string;
  gradientId: string;
  height?: number;
}) {
  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1;
  const width = 100;
  const padding = 5;
  const chartWidth = width - padding * 2;
  const chartHeight = height;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * chartWidth,
    y: chartHeight - (d.value / maxValue) * (chartHeight - 30),
  }));

  const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <svg
      viewBox={`0 0 ${width} ${chartHeight}`}
      style={{ width: "100%", height: height }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1={padding}
          y1={chartHeight - ratio * (chartHeight - 30)}
          x2={width - padding}
          y2={chartHeight - ratio * (chartHeight - 30)}
          stroke="rgba(99, 102, 241, 0.08)"
          strokeDasharray="2 2"
        />
      ))}

      {/* Area fill */}
      <path d={areaD} fill={`url(#${gradientId})`} />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: `drop-shadow(0 0 4px ${color}60)`,
        }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={hoveredIndex === i ? 2.5 : 1.5}
            fill={color}
            style={{ transition: "r 0.2s", cursor: "pointer" }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
          {hoveredIndex === i && (
            <>
              <rect
                x={p.x - 10}
                y={p.y - 18}
                width={20}
                height={12}
                rx={3}
                fill="rgba(17, 24, 39, 0.9)"
                stroke={color}
                strokeWidth="0.5"
              />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontSize="5"
                fill="#f1f5f9"
                fontWeight="600"
              >
                {data[i].value}
              </text>
            </>
          )}
        </g>
      ))}

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={padding + (i / (data.length - 1)) * chartWidth}
          y={chartHeight - 2}
          textAnchor="middle"
          fontSize="3.5"
          fill="#64748b"
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}

function BarChart({
  data,
  color,
  height = 200,
}: {
  data: DataPoint[];
  color: string;
  height?: number;
}) {
  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1;
  const width = 100;
  const padding = 8;
  const barWidth = (width - padding * 2) / data.length - 2;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: "100%", height: height }}
      preserveAspectRatio="none"
    >
      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * (height - 35);
        const x = padding + i * ((width - padding * 2) / data.length) + 1;
        const y = height - 20 - barHeight;
        const isHovered = hoveredIndex === i;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={2}
              fill={isHovered ? color : `${color}80`}
              style={{
                transition: "all 0.2s",
                filter: isHovered ? `drop-shadow(0 0 6px ${color}60)` : "none",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {isHovered && (
              <>
                <rect
                  x={x + barWidth / 2 - 8}
                  y={y - 14}
                  width={16}
                  height={10}
                  rx={3}
                  fill="rgba(17, 24, 39, 0.9)"
                  stroke={color}
                  strokeWidth="0.4"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 7}
                  textAnchor="middle"
                  fontSize="4.5"
                  fill="#f1f5f9"
                  fontWeight="600"
                >
                  {d.value}
                </text>
              </>
            )}
            <text
              x={x + barWidth / 2}
              y={height - 5}
              textAnchor="middle"
              fontSize="3.5"
              fill="#64748b"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Charts() {
  const [activeChart, setActiveChart] = useState("activity");

  const charts = [
    { id: "activity", label: "📊 Activity", color: "#6366f1" },
    { id: "gas", label: "⛽ Gas Usage", color: "#06b6d4" },
    { id: "growth", label: "📈 User Growth", color: "#10b981" },
  ];

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Analytics Charts</h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Track ecosystem activity trends
        </p>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Chart tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
            padding: "0 24px",
          }}
        >
          {charts.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              style={{
                padding: "16px 24px",
                fontSize: 14,
                fontWeight: 600,
                color: activeChart === chart.id ? chart.color : "#64748b",
                background: "transparent",
                border: "none",
                borderBottom: activeChart === chart.id
                  ? `2px solid ${chart.color}`
                  : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {chart.label}
            </button>
          ))}
        </div>

        {/* Chart content */}
        <div style={{ padding: "24px" }}>
          {activeChart === "activity" && (
            <AreaChart
              data={activityData}
              color="#6366f1"
              gradientId="activityGradient"
              height={220}
            />
          )}
          {activeChart === "gas" && (
            <BarChart data={gasData} color="#06b6d4" height={220} />
          )}
          {activeChart === "growth" && (
            <AreaChart
              data={growthData}
              color="#10b981"
              gradientId="growthGradient"
              height={220}
            />
          )}
        </div>
      </div>
    </section>
  );
}
