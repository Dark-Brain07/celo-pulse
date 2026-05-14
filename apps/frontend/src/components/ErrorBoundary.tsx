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
              background: "rgba(255,60,60,0.05)",
              border: "1px solid rgba(255,60,60,0.2)",
              borderRadius: 16,
              padding: "32px",
              textAlign: "center",
              color: "#ff6b6b",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🚨</div>
            <h3 style={{ margin: "0 0 8px", fontWeight: 700, fontSize: "1.2rem" }}>
              Application Error
            </h3>
            <p
              style={{
                margin: "0 0 24px",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.6)",
                maxWidth: 400,
              }}
            >
              {this.state.error?.message || "An unexpected error occurred while rendering this component."}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: "#ff6b6b",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Reset Interface
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,107,107,0.4)",
                  background: "transparent",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,107,107,0.1)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
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
