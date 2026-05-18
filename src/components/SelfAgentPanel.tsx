"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@/context/WalletContext";
import {
  type VerificationStatus,
  type AgentRegistrationResult,
  registerAgent,
  checkAgentRegistration,
  buildAgentRegistrationFile,
  getCachedRegistration,
  cacheRegistration,
  ERC8004_CONTRACTS,
} from "@/lib/selfProtocol";

export default function SelfAgentPanel() {
  const { address, signer, provider, isConnected } = useWallet();
  const [status, setStatus] = useState<VerificationStatus>("unverified");
  const [result, setResult] = useState<AgentRegistrationResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [registryConfigured, setRegistryConfigured] = useState(false);

  // Check if registry contract is configured
  useEffect(() => {
    const addr = ERC8004_CONTRACTS.IDENTITY_REGISTRY;
    setRegistryConfigured(!!addr && addr.length === 42 && addr.startsWith("0x") && addr !== "0x0000000000000000000000000000000000000000");
  }, []);

  // Check existing registration
  useEffect(() => {
    if (!address || !provider) { setStatus("unverified"); setResult(null); return; }

    // Check local cache first
    const cached = getCachedRegistration(address);
    if (cached && cached.status === "confirmed") {
      setStatus("confirmed");
      setResult(cached);
      return;
    }

    // If registry is configured, query onchain
    if (registryConfigured) {
      checkAgentRegistration(provider, address).then(({ isRegistered }) => {
        if (isRegistered) {
          setStatus("confirmed");
          setResult({ status: "confirmed", registeredAt: Date.now() });
        }
      }).catch(() => {});
    }
  }, [address, provider, registryConfigured]);

  useEffect(() => { const t = setTimeout(() => setAnimateIn(true), 100); return () => clearTimeout(t); }, []);

  const handleRegister = useCallback(async () => {
    if (!address || !signer) return;

    if (!registryConfigured) {
      setStatus("no_registry");
      setResult({ status: "no_registry", error: "Set NEXT_PUBLIC_ERC8004_IDENTITY_REGISTRY in your .env file with the deployed contract address from https://docs.celo.org/build-on-celo/build-with-ai/8004#contract-deployments" });
      return;
    }

    setStatus("pending");

    try {
      // Step 1: Build agent registration metadata
      const registrationFile = buildAgentRegistrationFile(address);
      // In production: upload to IPFS (e.g., via Pinata, web3.storage)
      // For now, use a data URI
      const agentURI = `data:application/json;base64,${btoa(JSON.stringify(registrationFile))}`;

      setStatus("registering");

      // Step 2: Call the real ERC-8004 Identity Registry contract
      const { agentId, txHash } = await registerAgent(signer, agentURI);

      const registrationResult: AgentRegistrationResult = {
        status: "confirmed",
        agentId,
        txHash,
        registeredAt: Date.now(),
      };

      setResult(registrationResult);
      setStatus("confirmed");
      cacheRegistration(address, registrationResult);
    } catch (err: any) {
      const errorMsg = err.reason || err.message || "Registration failed";
      setStatus("failed");
      setResult({ status: "failed", error: errorMsg });
    }
  }, [address, signer, registryConfigured]);

  const statusCfg: Record<VerificationStatus, { label: string; color: string; bg: string }> = {
    unverified: { label: "Not Registered", color: "#64748b", bg: "rgba(100,116,139,0.1)" },
    pending: { label: "Preparing...", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    registering: { label: "Minting Agent NFT...", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    confirmed: { label: "Registered ✓", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    failed: { label: "Failed", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
    no_registry: { label: "Not Configured", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  };

  const cur = statusCfg[status];
  const busy = status === "pending" || status === "registering";

  const features = [
    { icon: "🆔", title: "ERC-721 NFT", desc: "Onchain identity", active: status === "confirmed" },
    { icon: "📡", title: "Agent Endpoints", desc: "A2A + Wallet", active: status === "confirmed" },
    { icon: "⭐", title: "Reputation", desc: "Feedback system", active: status === "confirmed" },
    { icon: "🔗", title: "Cross-Chain", desc: "EVM compatible", active: true },
  ];

  return (
    <section id="self-agent" style={{ marginBottom: 32, opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Self Agent ID</h2>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "linear-gradient(135deg,rgba(6,182,212,0.15),rgba(139,92,246,0.15))", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", fontWeight: 700, letterSpacing: "0.05em" }}>ERC-8004</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b" }}>Register your agent identity on Celo via the ERC-8004 Identity Registry (ERC-721 NFT)</p>
      </div>

      <div className="glass-card" style={{ position: "relative", overflow: "hidden", padding: 0 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: status === "confirmed" ? "linear-gradient(90deg,#10b981,#06b6d4,#10b981)" : "linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)", opacity: status === "confirmed" ? 1 : 0.6 }} />
        {busy && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3 }} className="animate-shimmer" />}

        <div style={{ padding: 28 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: status === "confirmed" ? "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.2))" : "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))", border: `1px solid ${status === "confirmed" ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, animation: busy ? "pulse-glow 1.5s ease-in-out infinite" : "none" }}>
                {status === "confirmed" ? "🛡️" : "🆔"}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>ERC-8004 Agent Trust</span>
                  <a href="https://docs.celo.org/build-on-celo/build-with-ai/8004" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#64748b", textDecoration: "none" }}>docs ↗</a>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Identity, Reputation & Validation Registries on Celo</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 12, background: cur.bg, border: `1px solid ${cur.color}30` }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: cur.color, display: "inline-block", animation: busy ? "pulse-glow 1s ease-in-out infinite" : "none" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: cur.color }}>{cur.label}</span>
            </div>
          </div>

          {/* Features */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 24 }}>
            {features.map((f) => (
              <div key={f.title} style={{ padding: "14px 16px", borderRadius: 12, background: f.active ? "rgba(16,185,129,0.06)" : "rgba(17,24,39,0.4)", border: `1px solid ${f.active ? "rgba(16,185,129,0.2)" : "rgba(99,102,241,0.08)"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>{f.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: f.active ? "#10b981" : "#94a3b8" }}>{f.title}</span>
                </div>
                <p style={{ fontSize: 11, color: "#64748b" }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Confirmed details */}
          {status === "confirmed" && result && (
            <div style={{ marginBottom: 24, padding: "20px 24px", borderRadius: 14, background: "linear-gradient(135deg,rgba(16,185,129,0.06),rgba(6,182,212,0.04))", border: "1px solid rgba(16,185,129,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#10b981" }}>✓ Agent Registered on Celo Mainnet</span>
                <button onClick={() => setShowDetails(!showDetails)} style={{ fontSize: 12, color: "#06b6d4", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>{showDetails ? "Hide ▲" : "Details ▼"}</button>
              </div>
              {result.agentId && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Agent Token ID</p><p style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", fontFamily: "monospace" }}>#{result.agentId}</p></div>
                  <div><p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Registered</p><p style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{result.registeredAt ? new Date(result.registeredAt).toLocaleString() : "—"}</p></div>
                </div>
              )}
              {showDetails && result.txHash && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(16,185,129,0.1)" }}>
                  <p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Transaction</p>
                  <a href={`https://celoscan.io/tx/${result.txHash}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#6366f1", fontFamily: "monospace", wordBreak: "break-all", textDecoration: "none" }}>{result.txHash} ↗</a>
                </div>
              )}
            </div>
          )}

          {/* Error / No Registry */}
          {(status === "failed" || status === "no_registry") && result?.error && (
            <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 12, background: status === "no_registry" ? "rgba(245,158,11,0.06)" : "rgba(239,68,68,0.06)", border: `1px solid ${status === "no_registry" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"}`, color: status === "no_registry" ? "#f59e0b" : "#ef4444", fontSize: 13 }}>
              {status === "no_registry" ? "⚙️" : "⚠️"} {result.error}
            </div>
          )}

          {/* Action */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {!isConnected ? (
              <div style={{ padding: "16px 24px", borderRadius: 12, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", color: "#64748b", fontSize: 14, textAlign: "center", width: "100%" }}>
                🔗 Connect your wallet to register as an ERC-8004 agent
              </div>
            ) : status === "confirmed" ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 12, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", fontSize: 14, fontWeight: 600 }}>🛡️ Registered Agent (ERC-721 NFT)</div>
                <a href="https://www.8004.org" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 20px", borderRadius: 12, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", color: "#8b5cf6", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>8004.org ↗</a>
              </>
            ) : (
              <button onClick={handleRegister} disabled={busy} className="btn-primary" style={{ padding: "14px 28px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 10, boxShadow: busy ? "none" : "0 4px 16px rgba(99,102,241,0.3)", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.7 : 1 }}>
                {busy && <span style={{ animation: "pulse-glow 1s infinite" }}>◌</span>}
                {status === "pending" ? "Preparing Metadata..." : status === "registering" ? "Minting Agent NFT..." : status === "failed" ? "Retry Registration" : "Register Agent (Mint ERC-721)"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
