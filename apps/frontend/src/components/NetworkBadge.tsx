"use client";

import React from "react";

/**
 * Network status badge component.
 * Displays the current blockchain connection state visually.
 */
export function NetworkBadge() {
  const [status, setStatus] = React.useState<"connected" | "disconnected" | "checking">("checking");
  const [blockNumber, setBlockNumber] = React.useState<number | null>(null);

  React.useEffect(() => {
    const checkNetwork = async () => {
      try {
        const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://forno.celo.org";
        const response = await fetch(rpcUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
            id: 1,
          }),
        });
        const data = await response.json();
        if (data.result) {
          setBlockNumber(parseInt(data.result, 16));
          setStatus("connected");
        }
      } catch {
        setStatus("disconnected");
      }
    };

    checkNetwork();
    const interval = setInterval(checkNetwork, 15000);
    return () => clearInterval(interval);
  }, []);

  const colors = {
    connected: { dot: "#35D07F", text: "rgba(53,208,127,0.8)" },
    disconnected: { dot: "#ff6b6b", text: "rgba(255,107,107,0.8)" },
    checking: { dot: "#FCFF51", text: "rgba(252,255,81,0.8)" },
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        fontSize: "0.78rem",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: colors[status].dot,
          boxShadow: `0 0 8px ${colors[status].dot}`,
          animation: status === "checking" ? "pulse 1.5s infinite" : undefined,
        }}
      />
      <span style={{ color: colors[status].text }}>
        {status === "connected" && blockNumber
          ? `Celo #${blockNumber.toLocaleString()}`
          : status === "checking"
          ? "Connecting..."
          : "Disconnected"}
      </span>
    </div>
  );
}
