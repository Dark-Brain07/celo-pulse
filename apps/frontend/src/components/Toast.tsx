"use client";

import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  visible: boolean;
  onClose: () => void;
}

const TOAST_COLORS = {
  success: { bg: "rgba(53,208,127,0.15)", border: "rgba(53,208,127,0.3)", icon: "✅" },
  error: { bg: "rgba(255,60,60,0.15)", border: "rgba(255,60,60,0.3)", icon: "❌" },
  info: { bg: "rgba(99,179,237,0.15)", border: "rgba(99,179,237,0.3)", icon: "ℹ️" },
  warning: { bg: "rgba(252,255,81,0.15)", border: "rgba(252,255,81,0.3)", icon: "⚠️" },
};

/**
 * Toast notification component for transaction feedback.
 * Appears at the top-right of the viewport and auto-dismisses.
 */
export function Toast({ message, type = "info", visible, onClose }: ToastProps) {
  const colors = TOAST_COLORS[type];

  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 20px",
        borderRadius: 12,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(16px)",
        color: "#fff",
        fontSize: "0.95rem",
        fontWeight: 500,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        animation: "toastSlideIn 0.3s ease-out",
        maxWidth: 400,
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>{colors.icon}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          fontSize: "1.2rem",
          padding: 0,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}

/**
 * Hook for managing toast state.
 */
export function useToast() {
  const [toast, setToast] = React.useState<{
    message: string;
    type: ToastProps["type"];
    visible: boolean;
  }>({
    message: "",
    type: "info",
    visible: false,
  });

  const showToast = React.useCallback(
    (message: string, type: ToastProps["type"] = "info") => {
      setToast({ message, type, visible: true });
    },
    []
  );

  const hideToast = React.useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return { toast, showToast, hideToast };
}
