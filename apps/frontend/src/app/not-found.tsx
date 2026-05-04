"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a12 0%, #1a1a2e 50%, #0a0a12 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #FCFF51, #35D07F)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          marginBottom: "0.75rem",
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.6)",
          maxWidth: 440,
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Check the URL or head back to the dashboard.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 32px",
          borderRadius: 12,
          background: "linear-gradient(135deg, #35D07F, #FCFF51)",
          color: "#0a0a12",
          fontWeight: 700,
          fontSize: "1rem",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 24px rgba(53,208,127,0.3)",
        }}
      >
        ← Back to Dashboard
      </Link>

      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          gap: "2rem",
          opacity: 0.4,
          fontSize: "0.85rem",
        }}
      >
        <span>CeloPulse</span>
        <span>·</span>
        <span>Proof-of-Activity dApp</span>
        <span>·</span>
        <span>Celo Mainnet</span>
      </div>
    </div>
  );
}
