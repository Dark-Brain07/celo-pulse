"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(99, 102, 241, 0.1)",
        padding: "48px 24px 32px",
        background: "rgba(10, 14, 26, 0.6)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ⚡
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CeloPulse
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, maxWidth: 300 }}>
            Proof-of-Activity dApp for the Celo ecosystem. Earn rewards, climb
            leaderboards, and drive real onchain engagement.
          </p>
        </div>

        {/* Ecosystem */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Ecosystem
          </h4>
          {["Dashboard", "Actions", "Leaderboard", "Analytics"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                display: "block",
                fontSize: 14,
                color: "#64748b",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Resources
          </h4>
          {[
            { label: "Celo Docs", url: "https://docs.celo.org" },
            { label: "Blockscout", url: "https://explorer.celo.org" },
            { label: "GitHub", url: "#" },
            { label: "SDK Docs", url: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: 14,
                color: "#64748b",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Community */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Community
          </h4>
          {["Twitter", "Discord", "Telegram", "Talent Protocol"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: "block",
                fontSize: 14,
                color: "#64748b",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: "32px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(99, 102, 241, 0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "#475569" }}>
          © 2025 CeloPulse. Built on Celo for the Talent Protocol ecosystem.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 11, color: "#475569" }}>Powered by Celo</span>
          <span style={{ fontSize: 11, color: "#475569" }}>•</span>
          <span style={{ fontSize: 11, color: "#475569" }}>Indexed by Blockscout</span>
        </div>
      </div>
    </footer>
  );
}
