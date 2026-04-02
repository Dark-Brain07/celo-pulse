"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { CONTRACTS } from "@/lib/contracts";

interface ActionState {
  loading: string | null;
  canCheckIn: boolean;
  canPlay: boolean;
  streak: number;
  tipAmount: string;
  tipAddress: string;
}

export default function UserActions() {
  const { signer, address, isConnected } = useWallet();
  const [state, setState] = useState<ActionState>({
    loading: null,
    canCheckIn: true,
    canPlay: true,
    streak: 0,
    tipAmount: "0.001",
    tipAddress: "",
  });
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check if user can perform actions
  const refreshState = useCallback(async () => {
    if (!signer || !address) return;
    try {
      const activityContract = new ethers.Contract(
        CONTRACTS.ACTIVITY_MANAGER.address,
        CONTRACTS.ACTIVITY_MANAGER.abi,
        signer
      );
      const microContract = new ethers.Contract(
        CONTRACTS.MICRO_ACTIONS.address,
        CONTRACTS.MICRO_ACTIONS.abi,
        signer
      );

      const [canCheck, canPlay, activity] = await Promise.all([
        activityContract.canCheckIn(address).catch(() => true),
        microContract.canPlayAction(address).catch(() => true),
        activityContract.getUserActivity(address).catch(() => [0, 0, 0, 0, 0]),
      ]);

      setState((prev) => ({
        ...prev,
        canCheckIn: canCheck,
        canPlay: canPlay,
        streak: Number(activity[1]),
      }));
    } catch (err) {
      console.error("Failed to refresh state:", err);
    }
  }, [signer, address]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  const handleCheckIn = async () => {
    if (!signer) return;
    setState((prev) => ({ ...prev, loading: "checkin" }));
    try {
      const contract = new ethers.Contract(
        CONTRACTS.ACTIVITY_MANAGER.address,
        CONTRACTS.ACTIVITY_MANAGER.abi,
        signer
      );
      const tx = await contract.dailyCheckIn();
      showToast("⏳ Check-in transaction sent...", "info");
      await tx.wait();
      showToast("✅ Daily check-in successful! Streak updated.", "success");
      refreshState();
    } catch (err: any) {
      showToast(`❌ ${err.reason || "Check-in failed"}`, "error");
    } finally {
      setState((prev) => ({ ...prev, loading: null }));
    }
  };

  const handleClaimReward = async () => {
    if (!signer) return;
    setState((prev) => ({ ...prev, loading: "claim" }));
    try {
      const contract = new ethers.Contract(
        CONTRACTS.REWARD_DISTRIBUTOR.address,
        CONTRACTS.REWARD_DISTRIBUTOR.abi,
        signer
      );
      const tx = await contract.claimReward();
      showToast("⏳ Claiming reward...", "info");
      await tx.wait();
      showToast("🎉 Reward claimed successfully!", "success");
    } catch (err: any) {
      showToast(`❌ ${err.reason || "Claim failed"}`, "error");
    } finally {
      setState((prev) => ({ ...prev, loading: null }));
    }
  };

  const handlePlayAction = async () => {
    if (!signer) return;
    setState((prev) => ({ ...prev, loading: "play" }));
    try {
      const contract = new ethers.Contract(
        CONTRACTS.MICRO_ACTIONS.address,
        CONTRACTS.MICRO_ACTIONS.abi,
        signer
      );
      const tx = await contract.playAction();
      showToast("⏳ Playing action...", "info");
      await tx.wait();
      showToast("🎮 Action completed! +5 points", "success");
      refreshState();
    } catch (err: any) {
      showToast(`❌ ${err.reason || "Action failed"}`, "error");
    } finally {
      setState((prev) => ({ ...prev, loading: null }));
    }
  };

  const handleSendTip = async () => {
    if (!signer || !state.tipAddress) return;
    setState((prev) => ({ ...prev, loading: "tip" }));
    try {
      const contract = new ethers.Contract(
        CONTRACTS.MICRO_ACTIONS.address,
        CONTRACTS.MICRO_ACTIONS.abi,
        signer
      );
      const tx = await contract.sendTip(state.tipAddress, {
        value: ethers.parseEther(state.tipAmount),
      });
      showToast("⏳ Sending tip...", "info");
      await tx.wait();
      showToast("💸 Tip sent successfully!", "success");
    } catch (err: any) {
      showToast(`❌ ${err.reason || "Tip failed"}`, "error");
    } finally {
      setState((prev) => ({ ...prev, loading: null }));
    }
  };

  const handleQuickReact = async (reactionType: number) => {
    if (!signer) return;
    setState((prev) => ({ ...prev, loading: "react" }));
    try {
      const contract = new ethers.Contract(
        CONTRACTS.MICRO_ACTIONS.address,
        CONTRACTS.MICRO_ACTIONS.abi,
        signer
      );
      const tx = await contract.quickReact(reactionType);
      await tx.wait();
      showToast("⚡ Reaction recorded!", "success");
      refreshState();
    } catch (err: any) {
      showToast(`❌ ${err.reason || "Reaction failed"}`, "error");
    } finally {
      setState((prev) => ({ ...prev, loading: null }));
    }
  };

  const actions = [
    {
      id: "checkin",
      title: "Daily Check-in",
      description: "Log your daily activity",
      icon: "📅",
      color: "#6366f1",
      onClick: handleCheckIn,
      disabled: !state.canCheckIn,
      badge: state.streak > 0 ? `🔥 ${state.streak} day streak` : undefined,
    },
    {
      id: "claim",
      title: "Claim Reward",
      description: "Collect earned rewards",
      icon: "🎁",
      color: "#10b981",
      onClick: handleClaimReward,
    },
    {
      id: "play",
      title: "Play Action",
      description: "Earn points instantly",
      icon: "🎮",
      color: "#8b5cf6",
      onClick: handlePlayAction,
      disabled: !state.canPlay,
    },
  ];

  return (
    <section id="actions" style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>User Actions</h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Perform actions to earn points and climb the leaderboard
        </p>
      </div>

      {!isConnected ? (
        <div
          className="glass-card"
          style={{ textAlign: "center", padding: 48 }}
        >
          <p style={{ fontSize: 48, marginBottom: 16 }}>🔗</p>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Connect Your Wallet
          </p>
          <p style={{ color: "#64748b", fontSize: 14 }}>
            Connect your wallet to start earning activity points
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Main Action Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {actions.map((action) => (
              <button
                key={action.id}
                className="action-card"
                onClick={action.onClick}
                disabled={state.loading === action.id || action.disabled}
                style={{
                  opacity: action.disabled ? 0.5 : 1,
                  border: `1px solid ${
                    state.loading === action.id ? action.color : "rgba(99, 102, 241, 0.15)"
                  }`,
                }}
              >
                <div
                  className="icon-wrapper"
                  style={{
                    background: `${action.color}20`,
                    border: `1px solid ${action.color}40`,
                  }}
                >
                  {state.loading === action.id ? "⏳" : action.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>{action.title}</p>
                  <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                    {action.description}
                  </p>
                </div>
                {action.badge && (
                  <span className="streak-badge streak-fire">{action.badge}</span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Reactions */}
          <div className="glass-card">
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#94a3b8" }}>
              ⚡ Quick Reactions (30s cooldown)
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["👍", "🔥", "💎", "🚀", "⭐"].map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReact(i + 1)}
                  disabled={!!state.loading}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(99, 102, 241, 0.08)",
                    border: "1px solid rgba(99, 102, 241, 0.15)",
                    fontSize: 22,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.15)";
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Send Tip */}
          <div className="glass-card">
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#94a3b8" }}>
              💸 Send Tip
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <input
                type="text"
                placeholder="Recipient address (0x...)"
                value={state.tipAddress}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, tipAddress: e.target.value }))
                }
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "rgba(17, 24, 39, 0.8)",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  borderRadius: 10,
                  color: "#f1f5f9",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <input
                type="number"
                value={state.tipAmount}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, tipAmount: e.target.value }))
                }
                style={{
                  width: 120,
                  padding: "12px 16px",
                  background: "rgba(17, 24, 39, 0.8)",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  borderRadius: 10,
                  color: "#f1f5f9",
                  fontSize: 14,
                  outline: "none",
                  textAlign: "right",
                }}
                step="0.001"
                min="0.001"
              />
              <button
                className="btn-success"
                onClick={handleSendTip}
                disabled={state.loading === "tip" || !state.tipAddress}
              >
                {state.loading === "tip" ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className="toast"
          style={{
            borderLeft: `3px solid ${
              toast.type === "success"
                ? "#10b981"
                : toast.type === "error"
                ? "#ef4444"
                : "#6366f1"
            }`,
          }}
        >
          <span style={{ fontSize: 14 }}>{toast.message}</span>
        </div>
      )}
    </section>
  );
}
