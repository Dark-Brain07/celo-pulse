import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CeloPulse — Proof-of-Activity dApp | Celo Ecosystem",
  description:
    "CeloPulse is a Proof-of-Activity dashboard built on the Celo blockchain. Daily check-ins, rewards, micro-actions, and leaderboards — all generating real onchain engagement.",
  keywords: [
    "CeloPulse",
    "Celo",
    "Web3",
    "dApp",
    "Proof of Activity",
    "Talent Protocol",
    "blockchain",
    "leaderboard",
    "rewards",
  ],
  openGraph: {
    title: "CeloPulse — Proof-of-Activity dApp",
    description:
      "Earn rewards, climb leaderboards, and drive real onchain engagement on Celo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
