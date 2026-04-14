import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // MiniPay compatibility: Custom headers for WebView support
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow the app to be loaded in MiniPay's WebView iframe
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          // Content Security Policy: allow inline scripts for wallet injection
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
