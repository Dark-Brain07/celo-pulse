"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@/context/WalletContext";
import {
  type X402TransactionRecord,
  X402_ACTIONS,
  executeX402Payment,
  sendCeloTransfer,
  getTokenBalance,
  getX402History,
  getSessionSpend,
  formatX402Amount,
  getCeloExplorerTxUrl,
  X402_CONFIG,
} from "@/lib/x402Protocol";

export default function X402TransactionPanel() {
  const { address, signer, provider, isConnected } = useWallet();
  const [history, setHistory] = useState<X402TransactionRecord[]>([]);
  const [sessionSpend, setSessionSpend] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [animateIn, setAnimateIn] = useState(false);
  const [cusdBalance, setCusdBalance] = useState("0");
  const [recipientAddress, setRecipientAddress] = useState(
    process.env.NEXT_PUBLIC_X402_RECIPIENT_ADDRESS || ""
  );

  useEffect(() => { const t = setTimeout(() => setAnimateIn(true), 200); return () => clearTimeout(t); }, []);

  // Load history + balance
  useEffect(() => {
    setHistory(getX402History());
    setSessionSpend(getSessionSpend());
  }, []);

  useEffect(() => {
    if (!provider || !address) return;
    getTokenBalance(provider, address).then(({ balance }) => setCusdBalance(balance));
  }, [provider, address]);

  // Cooldown ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const next = { ...prev };
        for (const key in next) { next[key] = Math.max(0, next[key] - 1); if (next[key] === 0) delete next[key]; }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleAction = useCallback(async (actionId: string) => {
    if (!address || !signer) return;

    const action = X402_ACTIONS.find((a) => a.id === actionId);
    if (!action) return;

    // Use self-address as recipient for demo or the entered address
    const recipient = recipientAddress || address;

    setLoading(actionId);
    try {
      showToast(`⏳ Signing x402 payment for ${action.title}...`, "info");

      let record: X402TransactionRecord;

      if (action.tokenAddress === "native") {
        // Native CELO transfer
        record = await sendCeloTransfer(signer, recipient, action.amount, action.description);
      } else {
        // ERC-20 token transfer (cUSD, USDC, etc.)
        record = await executeX402Payment(signer, recipient, action.amount, action.tokenAddress, action.description);
      }

      setHistory(getX402History());
      setSessionSpend(getSessionSpend());
      setCooldowns((prev) => ({ ...prev, [actionId]: action.cooldown }));
      showToast(`✅ ${action.title} confirmed — ${formatX402Amount(record.amount, record.token)} on block #${record.blockNumber}`, "success");

      // Refresh balance
      if (provider) {
        getTokenBalance(provider, address).then(({ balance }) => setCusdBalance(balance));
      }
    } catch (err: any) {
      const errorMsg = err.reason || err.message || "Transaction failed";
      showToast(`❌ ${action.title}: ${errorMsg}`, "error");
    } finally {
      setLoading(null);
    }
  }, [address, signer, provider, recipientAddress]);

  const truncateHash = (hash: string) => `${hash.slice(0, 10)}...${hash.slice(-6)}`;
  const recentTxs = history.slice(0, 5);

  return (
    <section id="x402-transactions" style={{ marginBottom: 32, opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>Onchain Transactions</h2>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(16,185,129,0.15))", border: "1px solid rgba(99,102,241,0.3)", color: "#6366f1", fontWeight: 700 }}>x402</span>
          <a href="https://docs.celo.org/build-on-celo/build-with-ai/x402" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#64748b", textDecoration: "none" }}>docs ↗</a>
        </div>
        <p style={{ fontSize: 14, color: "#64748b" }}>Execute real onchain micropayments on Celo using the x402 protocol (thirdweb)</p>
      </div>

      {/* Session Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 20 }}>
        {[
          { label: "cUSD Balance", value: parseFloat(cusdBalance).toFixed(4), color: "#10b981", icon: "💰" },
          { label: "Session Spend", value: formatX402Amount(sessionSpend.toFixed(4)), color: "#6366f1", icon: "📊" },
          { label: "Transactions", value: history.length.toString(), color: "#8b5cf6", icon: "⚡" },
          { label: "Network", value: "Celo (42220)", color: "#06b6d4", icon: "🌐" },
        ].map((s) => (
          <div key={s.label} className="stat-card" style={{ textAlign: "center" }}>
            <span style={{ fontSize: 20, display: "block", marginBottom: 6 }}>{s.icon}</span>
            <p style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#64748b", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {!isConnected ? (
        <div className="glass-card" style={{ textAlign: "center", padding: 48 }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>⚡</p>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Connect Wallet for x402</p>
          <p style={{ color: "#64748b", fontSize: 14 }}>Connect to execute real onchain micropayments via the x402 protocol</p>
        </div>
      ) : (
        <>
          {/* Recipient input */}
          <div className="glass-card" style={{ marginBottom: 16, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#94a3b8" }}>📍 Recipient Address (leave empty to self-transfer for activity)</p>
            <input
              type="text"
              placeholder={address || "0x..."}
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              style={{ width: "100%", padding: "10px 16px", background: "rgba(17,24,39,0.8)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 10, color: "#f1f5f9", fontSize: 13, outline: "none", fontFamily: "monospace" }}
            />
          </div>

          {/* Action Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 24 }}>
            {X402_ACTIONS.map((action) => {
              const onCooldown = (cooldowns[action.id] || 0) > 0;
              const isLoading = loading === action.id;
              return (
                <button key={action.id} onClick={() => handleAction(action.id)} disabled={isLoading || onCooldown} className="action-card" style={{ opacity: onCooldown ? 0.5 : 1, border: `1px solid ${isLoading ? action.color : "rgba(99,102,241,0.15)"}`, position: "relative", overflow: "hidden" }}>
                  {isLoading && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2 }} className="animate-shimmer" />}
                  <div className="icon-wrapper" style={{ background: `${action.color}20`, border: `1px solid ${action.color}40` }}>
                    {isLoading ? "⏳" : action.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{action.title}</p>
                    <p style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{action.description}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: action.color }}>{formatX402Amount(action.amount, action.token)}</span>
                    {onCooldown && <span style={{ fontSize: 11, color: "#f59e0b" }}>{cooldowns[action.id]}s</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Transaction History */}
          {recentTxs.length > 0 && (
            <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(99,102,241,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#94a3b8" }}>Recent Onchain Transactions</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>{history.length} total</span>
              </div>
              {recentTxs.map((tx) => (
                <div key={tx.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 16, padding: "14px 24px", borderBottom: "1px solid rgba(99,102,241,0.05)", alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>
                    {tx.type === "micropayment" ? "💸" : tx.type === "data_access" ? "📊" : tx.type === "api_call" ? "🔍" : "🤖"}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{tx.description}</p>
                    <a href={getCeloExplorerTxUrl(tx.transactionHash)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#6366f1", textDecoration: "none", fontFamily: "monospace" }}>
                      {truncateHash(tx.transactionHash)} ↗
                    </a>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>
                    {formatX402Amount(tx.amount, tx.token)}
                  </span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast" style={{ borderLeft: `3px solid ${toast.type === "success" ? "#10b981" : toast.type === "error" ? "#ef4444" : "#6366f1"}` }}>
          <span style={{ fontSize: 14 }}>{toast.msg}</span>
        </div>
      )}
    </section>
  );
}
