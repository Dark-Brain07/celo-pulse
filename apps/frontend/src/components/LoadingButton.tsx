"use client";

import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "success" | "danger" | "secondary";
  fullWidth?: boolean;
}

/**
 * Reusable button component with a loading spinner and transition states.
 */
export function LoadingButton({
  children,
  loading,
  loadingText,
  variant = "primary",
  fullWidth = false,
  style,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: fullWidth ? "100%" : "auto",
    opacity: disabled || loading ? 0.6 : 1,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    ...style,
  };

  const getVariantClass = () => {
    switch (variant) {
      case "success": return "btn-success";
      case "danger": return "btn-danger";
      case "secondary": return "btn-secondary";
      default: return "btn-primary";
    }
  };

  return (
    <button
      className={`${getVariantClass()} ${className || ""}`}
      style={baseStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin" 
            style={{ width: 18, height: 18 }} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
