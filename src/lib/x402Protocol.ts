/**
 * x402 Protocol Integration — REAL Onchain Transactions
 * 
 * Implements x402 payment flows on Celo using direct ethers.js contract calls.
 * For full thirdweb SDK integration, install `thirdweb` and use `wrapFetchWithPayment`.
 * 
 * @see https://docs.celo.org/build-on-celo/build-with-ai/x402
 * @see https://x402.org
 * @see https://portal.thirdweb.com/x402
 */

import { ethers } from "ethers";

// ─── x402 Configuration ───

export const X402_CONFIG = {
  chainId: 42220,
  chainIdentifier: "eip155:42220",
  protocolVersion: "v2",
  /** Supported payment tokens on Celo (from Celo docs) */
  tokens: {
    USDC: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
    USDT: "0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
    cUSD: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  },
  /** Default payment token */
  defaultToken: "cUSD",
  defaultTokenAddress: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  /** thirdweb facilitator (when using thirdweb SDK) */
  facilitatorEndpoint: "https://x402.thirdweb.com",
  /** Celo block explorer */
  explorerBase: "https://celoscan.io",
} as const;

// ─── ERC-20 ABI for token transfers (the actual onchain transactions) ───

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

// ─── Types ───

export interface X402TransactionRecord {
  id: string;
  type: "micropayment" | "data_access" | "api_call" | "agent_action";
  description: string;
  amount: string;
  token: string;
  tokenAddress: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  status: "pending" | "confirmed" | "failed";
  recipient?: string;
}

// ─── Real Onchain Transaction Functions ───

/**
 * Execute a real x402 micropayment on Celo.
 * This sends an actual ERC-20 token transfer (e.g., cUSD) to a recipient.
 * 
 * In a full x402 flow, this would be triggered automatically by
 * thirdweb's `wrapFetchWithPayment` when an API returns HTTP 402.
 * Here we expose it as a direct action for the dashboard.
 */
export async function executeX402Payment(
  signer: ethers.Signer,
  recipient: string,
  amount: string,
  tokenAddress: string = X402_CONFIG.defaultTokenAddress,
  description: string = "x402 micropayment"
): Promise<X402TransactionRecord> {
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

  // Get decimals for proper amount formatting
  let decimals = 18;
  try {
    decimals = Number(await token.decimals());
  } catch {
    decimals = 18;
  }

  let symbol = "cUSD";
  try {
    symbol = await token.symbol();
  } catch {
    symbol = "cUSD";
  }

  const amountWei = ethers.parseUnits(amount, decimals);

  // Execute the actual onchain transfer
  const tx = await token.transfer(recipient, amountWei);
  const receipt = await tx.wait();

  const record: X402TransactionRecord = {
    id: `x402-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: "micropayment",
    description,
    amount,
    token: symbol,
    tokenAddress,
    transactionHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    timestamp: Date.now(),
    status: "confirmed",
    recipient,
  };

  saveX402Transaction(record);
  return record;
}

/**
 * Get cUSD balance for a wallet
 */
export async function getTokenBalance(
  provider: ethers.Provider,
  walletAddress: string,
  tokenAddress: string = X402_CONFIG.defaultTokenAddress
): Promise<{ balance: string; symbol: string; decimals: number }> {
  try {
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const [rawBalance, decimals, symbol] = await Promise.all([
      token.balanceOf(walletAddress),
      token.decimals().catch(() => 18),
      token.symbol().catch(() => "cUSD"),
    ]);
    return {
      balance: ethers.formatUnits(rawBalance, Number(decimals)),
      symbol: symbol as string,
      decimals: Number(decimals),
    };
  } catch {
    return { balance: "0", symbol: "cUSD", decimals: 18 };
  }
}

/**
 * Send a native CELO transfer (generates a real onchain transaction)
 */
export async function sendCeloTransfer(
  signer: ethers.Signer,
  recipient: string,
  amountCelo: string,
  description: string = "CELO transfer"
): Promise<X402TransactionRecord> {
  const tx = await signer.sendTransaction({
    to: recipient,
    value: ethers.parseEther(amountCelo),
  });

  const receipt = await tx.wait();
  if (!receipt) throw new Error("Transaction failed — no receipt");

  const record: X402TransactionRecord = {
    id: `celo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: "micropayment",
    description,
    amount: amountCelo,
    token: "CELO",
    tokenAddress: "native",
    transactionHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    timestamp: Date.now(),
    status: "confirmed",
    recipient,
  };

  saveX402Transaction(record);
  return record;
}

// ─── Transaction History (localStorage) ───

const X402_STORAGE_KEY = "celopulse_x402_history";

export function getX402History(): X402TransactionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(X402_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveX402Transaction(record: X402TransactionRecord): void {
  if (typeof window === "undefined") return;
  const history = getX402History();
  history.unshift(record);
  localStorage.setItem(X402_STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}

export function getSessionSpend(): number {
  const history = getX402History();
  const sessionStart = Date.now() - 24 * 60 * 60 * 1000;
  return history
    .filter((tx) => tx.timestamp >= sessionStart && tx.status === "confirmed")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
}

// ─── Predefined x402 Actions ───

export const X402_ACTIONS = [
  {
    id: "micro_tip_cusd",
    type: "micropayment" as const,
    title: "Micro Tip (cUSD)",
    description: "Send 0.001 cUSD micropayment via x402 protocol",
    icon: "💸",
    color: "#10b981",
    amount: "0.001",
    tokenAddress: X402_CONFIG.tokens.cUSD,
    token: "cUSD",
    cooldown: 10,
  },
  {
    id: "micro_tip_celo",
    type: "micropayment" as const,
    title: "Micro Tip (CELO)",
    description: "Send 0.0001 CELO native transfer",
    icon: "🪙",
    color: "#f59e0b",
    amount: "0.0001",
    tokenAddress: "native",
    token: "CELO",
    cooldown: 10,
  },
  {
    id: "data_access_cusd",
    type: "data_access" as const,
    title: "Data Access Payment",
    description: "Pay 0.002 cUSD for premium analytics data",
    icon: "📊",
    color: "#6366f1",
    amount: "0.002",
    tokenAddress: X402_CONFIG.tokens.cUSD,
    token: "cUSD",
    cooldown: 30,
  },
  {
    id: "agent_action_cusd",
    type: "agent_action" as const,
    title: "Agent Interaction",
    description: "Execute agent action with 0.005 cUSD settlement",
    icon: "🤖",
    color: "#8b5cf6",
    amount: "0.005",
    tokenAddress: X402_CONFIG.tokens.cUSD,
    token: "cUSD",
    cooldown: 60,
  },
] as const;

// ─── Helpers ───

export function formatX402Amount(amount: string, token: string = "cUSD"): string {
  const num = parseFloat(amount);
  if (num < 0.001) return `<0.001 ${token}`;
  return `${num.toFixed(4)} ${token}`;
}

export function getCeloExplorerTxUrl(txHash: string): string {
  return `${X402_CONFIG.explorerBase}/tx/${txHash}`;
}

export function getCeloExplorerBlockUrl(blockNumber: number): string {
  return `${X402_CONFIG.explorerBase}/block/${blockNumber}`;
}
