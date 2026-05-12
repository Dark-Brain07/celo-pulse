"use client";

import { useState, useMemo } from "react";
import { useReferral } from "@/hooks/useReferral";
import { LoadingButton } from "./LoadingButton";

export default function ReferralPanel() {
  const {
    address,
    isConnected,
    referralInput,
    setReferralInput,
    loading,
    toast,
    handleRegister
  } = useReferral();
  const [copied, setCopied] = useState(false);

  const referralLink = useMemo(() => {
    return address
      ? `${typeof window !== "undefined" ? window.location.origin : ""}?ref=${address}`
      : "";
  }, [address]);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) return null;

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>
          👥 Referral Program
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Invite friends to earn rewards — both of you get rewarded!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Share your link */}
        <div className="glass-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#f1f5f9" }}>
            🔗 Your Referral Link
          </h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
            Share this link. When someone registers through it, you both earn CELO rewards.
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            <input
              readOnly
              value={referralLink}
              style={{
                flex: 1,
                padding: "12px 16px",
                background: "rgba(17, 24, 39, 0.8)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                borderRadius: 10,
                color: "#6366f1",
                fontSize: 13,
                fontFamily: "monospace",
                outline: "none",
              }}
              aria-label="Your referral link"
            />
            <button
              className="btn-primary"
              onClick={copyLink}
              style={{ 
                whiteSpace: "nowrap",
                transform: copied ? "scale(0.95)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                background: copied ? "#10b981" : undefined,
                borderColor: copied ? "#10b981" : undefined
              }}
              aria-label="Copy referral link to clipboard"
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>

          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "rgba(16, 185, 129, 0.06)",
              border: "1px solid rgba(16, 185, 129, 0.12)",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "#10b981", marginBottom: 8 }}>
              💰 Referral Rewards
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#10b981" }}>0.0005</p>
                <p style={{ fontSize: 11, color: "#64748b" }}>CELO per referral (you)</p>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#06b6d4" }}>0.0002</p>
                <p style={{ fontSize: 11, color: "#64748b" }}>CELO welcome bonus (them)</p>
              </div>
            </div>
          </div>

          {/* Share buttons */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`I'm earning rewards on CeloPulse! Join me and get bonus CELO 👉 ${referralLink}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(37, 211, 102, 0.1)",
                border: "1px solid rgba(37, 211, 102, 0.2)",
                color: "#25d366",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              aria-label="Share referral link on WhatsApp"
            >
              🟢 WhatsApp
            </a>
            <a
              href={`https://warpcast.com/~/compose?text=${encodeURIComponent(`I'm earning rewards on CeloPulse! Join me and get bonus CELO 👉`)}&embeds[]=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(71, 31, 145, 0.1)",
                border: "1px solid rgba(71, 31, 145, 0.2)",
                color: "#7c65c1",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              aria-label="Share referral link on Warpcast"
            >
              🟣 Warpcast
            </a>
          </div>
        </div>

        {/* Register with referral */}
        <div className="glass-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#f1f5f9" }}>
            📝 Register
          </h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
            Register your wallet to start earning. Paste a referrer's address to give them credit!
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, display: "block", marginBottom: 6 }}>
              Referrer Address (optional)
            </label>
            <input
              type="text"
              placeholder="0x... (leave empty for no referral)"
              value={referralInput}
              onChange={(e) => setReferralInput(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(17, 24, 39, 0.8)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                borderRadius: 10,
                color: "#f1f5f9",
                fontSize: 14,
                outline: "none",
              }}
              aria-label="Referrer wallet address input"
            />
          </div>

          <LoadingButton
            variant="success"
            onClick={handleRegister}
            loading={loading}
            loadingText="Registering..."
            fullWidth
            style={{ padding: "14px 24px" }}
            aria-label="Register wallet to start earning"
          >
            🚀 Register Now
          </LoadingButton>

          {/* Benefits */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "✅", text: "1 onchain transaction" },
              { icon: "📊", text: "Starts your activity tracking" },
              { icon: "🏆", text: "Begins leaderboard scoring" },
              { icon: "💰", text: "Both get CELO reward (with referral)" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#94a3b8" }}>
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast">
          <span style={{ fontSize: 14 }}>{toast}</span>
        </div>
      )}
    </section>
  );
}
