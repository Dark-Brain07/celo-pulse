"use client";

import React from "react";

/**
 * Settings Component
 * Provides support links, account recovery guides, and technical resources.
 */
export function Settings() {
  const sections = [
    {
      title: "🛡️ Account Security",
      items: [
        { name: "Backup Recovery Phrase", icon: "🔑", link: "#" },
        { name: "MiniPay Security Guide", icon: "📱", link: "https://docs.celo.org/build-on-celo/build-on-minipay/overview" },
        { name: "Revoke Permissions", icon: "🚫", link: "https://celoscan.io/tokenapprovalchecker" },
      ]
    },
    {
      title: "🆘 Support & Resources",
      items: [
        { name: "CeloPulse Documentation", icon: "📖", link: "#" },
        { name: "Join Discord Community", icon: "💬", link: "https://discord.com/invite/celo" },
        { name: "Report a Bug", icon: "🐞", link: "https://github.com/Dark-Brain07/celo-pulse/issues" },
      ]
    },
    {
      title: "⚙️ Technical Info",
      items: [
        { name: "Network Status", icon: "🌐", link: "https://stats.celo.org/" },
        { name: "View on CeloScan", icon: "🔍", link: "https://celoscan.io/" },
        { name: "Open Source License", icon: "📜", link: "#" },
      ]
    }
  ];

  return (
    <div className="glass-card" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>
        Support & Settings
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {section.title}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {section.items.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    color: "#cbd5e1",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.color = "#cbd5e1";
                  }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 32,
        paddingTop: 24,
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        textAlign: "center"
      }}>
        <p style={{ fontSize: 12, color: "#64748b" }}>
          CeloPulse Dashboard v1.5.0 • Built on Celo Mainnet
        </p>
      </div>
    </div>
  );
}

export default Settings;
