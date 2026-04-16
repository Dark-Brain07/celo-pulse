"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { CONTRACTS } from "@/lib/contracts";

export default function ReferralPanel() {
  const { signer, address, isConnected } = useWallet();
  const [referralInput, setReferralInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const referralLink = address
    ? `${typeof window !== "undefined" ? window.location.origin : ""}?ref=${address}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = async () => {
    if (!signer) return;
    setLoading(true);
    try {
      const contract = new ethers.Contract(
        CONTRACTS.REFERRAL_SYSTEM.address,
        CONTRACTS.REFERRAL_SYSTEM.abi,
        signer
      );

      let tx;
      if (referralInput && ethers.isAddress(referralInput)) {
        tx = await contract.registerWithReferral(referralInput);
        setToast("⏳ Registering with referral...");
      } else {
        tx = await contract.register();
        setToast("⏳ Registering...");
      }

      await tx.wait();
      setToast("✅ Registered successfully! Start earning points.");
    } catch (err: any) {
      setToast(`❌ ${err.reason || "Registration failed"}`);
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
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
            />
            <button
              className="btn-primary"
              onClick={copyLink}
              style={{ whiteSpace: "nowrap" }}
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
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <a
              href={`https://twitter.com/intent/tweet?text=I'm%20earning%20rewards%20on%20CeloPulse!%20Join%20me%20and%20get%20bonus%20CELO%20👉&url=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(29, 155, 240, 0.1)",
                border: "1px solid rgba(29, 155, 240, 0.2)",
                color: "#1d9bf0",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              🐦 Tweet
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20CeloPulse%20and%20earn%20rewards!`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(0, 136, 204, 0.1)",
                border: "1px solid rgba(0, 136, 204, 0.2)",
                color: "#0088cc",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ✈️ Telegram
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
            />
          </div>

          <button
            className="btn-success"
            onClick={handleRegister}
            disabled={loading}
            style={{ width: "100%", padding: "14px 24px" }}
          >
            {loading ? "⏳ Registering..." : "🚀 Register Now"}
          </button>

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
