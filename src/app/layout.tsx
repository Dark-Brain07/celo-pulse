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
  authors: [{ name: "CeloPulse Builder" }],
  creator: "CeloPulse Team",
  robots: "index, follow",
  openGraph: {
    title: "CeloPulse — Proof-of-Activity dApp",
    description:
      "Earn rewards, climb leaderboards, and drive real onchain engagement on Celo.",
    type: "website",
    siteName: "CeloPulse Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "CeloPulse — Proof-of-Activity Dashboard",
    description: "Generate real onchain Celo activity and earn rewards.",
    creator: "@CeloPulseApp",
  },
  other: {
    "talentapp:project_verification": "b8e55e668d06babf3822223ce13a1d961f92ad3a357d4717cb12128db7834a866063740f16a4cbd895edcadd38fe727aadd6fda39b8e869c90e8d1288cdad2aa",
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
