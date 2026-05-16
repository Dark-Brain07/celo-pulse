"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches rendering errors
 * and displays a user-friendly fallback UI.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[CeloPulse ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
              color: "#f8fafc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 240,
              boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              maxWidth: 500,
              margin: "24px auto"
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: 16, filter: "drop-shadow(0 0 12px rgba(239,68,68,0.4))" }}>🚨</div>
            <h3 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.01em", color: "#ef4444" }}>
              Application Execution Halted
            </h3>
            <p
              style={{
                margin: "0 0 28px",
                fontSize: "0.95rem",
                color: "#94a3b8",
                lineHeight: 1.6,
                maxWidth: 400,
              }}
            >
              {this.state.error?.message || "An unexpected error occurred while rendering this component."}
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  padding: "12px 28px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(239, 68, 68, 0.35)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.25)";
                }}
              >
                Reset Interface
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "12px 28px",
                  borderRadius: 12,
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Hard Reload
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
