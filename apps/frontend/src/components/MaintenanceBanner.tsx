"use client";

import React, { useState, useEffect } from "react";

/**
 * MaintenanceBanner Component
 * Displays a global alert when the platform is undergoing scheduled maintenance
 * or experiencing technical issues.
 */
export function MaintenanceBanner() {
  // In a real app, this would be fetched from a remote config or contract state
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    // Check environment variable or mock remote flag
    const maintenanceFlag = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
    setIsMaintenance(maintenanceFlag);
  }, []);

  if (!isMaintenance) return null;

  return (
    <div style={{
      background: "linear-gradient(90deg, #f59e0b, #d97706)",
      color: "#000",
      padding: "8px 16px",
      textAlign: "center",
      fontSize: "13px",
      fontWeight: 600,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    }}>
      <span style={{ fontSize: 16 }}>⚠️</span>
      <span>
        System Maintenance: Some on-chain actions may be delayed or temporarily unavailable. 
        <a 
          href="https://stats.celo.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ marginLeft: 8, color: "#000", textDecoration: "underline" }}
        >
          Check Network Status
        </a>
      </span>
      <button 
        onClick={() => setIsMaintenance(false)}
        style={{
          marginLeft: "auto",
          background: "transparent",
          border: "none",
          fontSize: 18,
          cursor: "pointer",
          color: "#000",
          opacity: 0.6
        }}
      >
        ×
      </button>
    </div>
  );
}

export default MaintenanceBanner;
