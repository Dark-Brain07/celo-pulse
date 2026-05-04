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
              background: "rgba(255,60,60,0.08)",
              border: "1px solid rgba(255,60,60,0.2)",
              borderRadius: 16,
              padding: "24px 32px",
              textAlign: "center",
              color: "#ff6b6b",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>
              Something went wrong
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                marginTop: 16,
                padding: "10px 24px",
                borderRadius: 8,
                border: "1px solid rgba(255,60,60,0.3)",
                background: "transparent",
                color: "#ff6b6b",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
