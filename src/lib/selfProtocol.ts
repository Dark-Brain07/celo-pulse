/**
 * Self Protocol (ERC-8004) Integration — REAL Contract Calls
 * 
 * Uses ethers.js to interact directly with the ERC-8004 Identity Registry
 * and Reputation Registry contracts deployed on Celo Mainnet.
 * 
 * @see https://docs.celo.org/build-on-celo/build-with-ai/8004
 * @see https://github.com/erc-8004/erc-8004-contracts
 */

import { ethers } from "ethers";

// ─── Deployed Contract Addresses (Celo Mainnet) ───
// From: https://docs.celo.org/build-on-celo/build-with-ai/8004#contract-deployments

export const ERC8004_CONTRACTS = {
  /** Identity Registry — ERC-721 agent NFTs */
  IDENTITY_REGISTRY: process.env.NEXT_PUBLIC_ERC8004_IDENTITY_REGISTRY || "",
  /** Reputation Registry — feedback & ratings */
  REPUTATION_REGISTRY: process.env.NEXT_PUBLIC_ERC8004_REPUTATION_REGISTRY || "",
};

// ─── Identity Registry ABI (from @chaoschain/sdk IdentityRegistry) ───
// Derived from the official ERC-8004 spec: each agent is an ERC-721 NFT
// register(agentURI) → mints NFT → emits Transfer event with tokenId

export const IDENTITY_REGISTRY_ABI = [
  // Registration
  "function register(string calldata agentURI) external returns (uint256)",
  // Query
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  // Metadata update
  "function updateAgentURI(uint256 tokenId, string calldata newURI) external",
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
];

// ─── Reputation Registry ABI ───
// giveFeedback(agentId, score, decimals, tag1, tag2, endpoint, feedbackURI, feedbackHash)
// readAllFeedback(agentId) → Feedback[]
// getSummary(agentId) → { averageScore, totalFeedback }

export const REPUTATION_REGISTRY_ABI = [
  "function giveFeedback(uint256 agentId, uint256 score, uint256 decimals, string tag1, string tag2, string endpoint, string feedbackURI, bytes32 feedbackHash) external",
  "function revokeFeedback(uint256 agentId, uint256 feedbackIndex) external",
  "function readAllFeedback(uint256 agentId) view returns (tuple(address rater, uint256 score, uint256 decimals, string tag1, string tag2, string endpoint, string feedbackURI, bytes32 feedbackHash, uint256 timestamp)[])",
  "function getSummary(uint256 agentId) view returns (uint256 averageScore, uint256 totalFeedback)",
];

// ─── Agent Registration File Schema ───
// This is the JSON metadata hosted at agentURI (on IPFS or a public URL)

export interface AgentRegistrationFile {
  type: "Agent";
  name: string;
  description: string;
  image?: string;
  endpoints: Array<{
    type: "a2a" | "mcp" | "wallet" | "ens" | "did";
    url?: string;
    address?: string;
    chainId?: number;
  }>;
  supportedTrust: ("reputation" | "validation" | "tee")[];
}

/**
 * Build the agent registration metadata file for CeloPulse
 */
export function buildAgentRegistrationFile(
  walletAddress: string
): AgentRegistrationFile {
  return {
    type: "Agent",
    name: "CeloPulse Activity Agent",
    description:
      "Autonomous Proof-of-Activity agent on the Celo blockchain. Tracks daily check-ins, rewards, micro-actions, leaderboard participation, and referral engagement.",
    endpoints: [
      {
        type: "wallet",
        address: walletAddress,
        chainId: 42220,
      },
      {
        type: "a2a",
        url:
          typeof window !== "undefined"
            ? `${window.location.origin}/.well-known/agent.json`
            : "",
      },
    ],
    supportedTrust: ["reputation"],
  };
}

// ─── Contract Interaction Helpers ───

/**
 * Register an agent on the ERC-8004 Identity Registry.
 * 
 * Steps per the official docs:
 * 1. Create a registration JSON file
 * 2. Host it (we'll use a data URI for simplicity, or you can upload to IPFS)
 * 3. Call registry.register(agentURI) → mints ERC-721 NFT
 * 
 * @returns The agent token ID (from Transfer event)
 */
export async function registerAgent(
  signer: ethers.Signer,
  agentURI: string
): Promise<{ agentId: string; txHash: string }> {
  const registryAddress = ERC8004_CONTRACTS.IDENTITY_REGISTRY;
  if (!registryAddress) {
    throw new Error("ERC-8004 Identity Registry address not configured. Set NEXT_PUBLIC_ERC8004_IDENTITY_REGISTRY in .env");
  }

  const registry = new ethers.Contract(
    registryAddress,
    IDENTITY_REGISTRY_ABI,
    signer
  );

  const tx = await registry.register(agentURI);
  const receipt = await tx.wait();

  // Extract agentId from Transfer event (ERC-721 mint: from=0x0, to=owner, tokenId)
  const transferEvent = receipt.logs.find(
    (log: any) => log.topics.length === 4 // Transfer has 3 indexed params
  );

  let agentId = "0";
  if (transferEvent) {
    const iface = new ethers.Interface(IDENTITY_REGISTRY_ABI);
    try {
      const parsed = iface.parseLog({
        topics: transferEvent.topics,
        data: transferEvent.data,
      });
      if (parsed) {
        agentId = parsed.args.tokenId.toString();
      }
    } catch {
      // Fallback: try to extract from topics directly
      agentId = ethers.toBigInt(transferEvent.topics[3]).toString();
    }
  }

  return { agentId, txHash: receipt.hash };
}

/**
 * Check if a wallet already has a registered agent (owns an ERC-721 token)
 */
export async function checkAgentRegistration(
  provider: ethers.Provider,
  walletAddress: string
): Promise<{ isRegistered: boolean; balance: number }> {
  const registryAddress = ERC8004_CONTRACTS.IDENTITY_REGISTRY;
  if (!registryAddress) {
    return { isRegistered: false, balance: 0 };
  }

  try {
    const registry = new ethers.Contract(
      registryAddress,
      IDENTITY_REGISTRY_ABI,
      provider
    );
    const balance = await registry.balanceOf(walletAddress);
    const balanceNum = Number(balance);
    return { isRegistered: balanceNum > 0, balance: balanceNum };
  } catch {
    return { isRegistered: false, balance: 0 };
  }
}

/**
 * Submit feedback/rating for an agent via the Reputation Registry
 */
export async function giveFeedback(
  signer: ethers.Signer,
  agentId: number,
  score: number,
  tag: string = "starred",
  comment: string = ""
): Promise<string> {
  const reputationAddress = ERC8004_CONTRACTS.REPUTATION_REGISTRY;
  if (!reputationAddress) {
    throw new Error("Reputation Registry address not configured.");
  }

  const reputation = new ethers.Contract(
    reputationAddress,
    REPUTATION_REGISTRY_ABI,
    signer
  );

  const feedbackHash = ethers.keccak256(
    ethers.toUtf8Bytes(`${agentId}-${score}-${tag}-${Date.now()}`)
  );

  const tx = await reputation.giveFeedback(
    agentId,
    score,       // score (0-100)
    0,           // decimals
    tag,         // tag1: category
    "",          // tag2: optional
    "",          // endpoint
    comment,     // feedbackURI
    feedbackHash
  );

  const receipt = await tx.wait();
  return receipt.hash;
}

/**
 * Query reputation summary for an agent
 */
export async function getAgentReputation(
  provider: ethers.Provider,
  agentId: number
): Promise<{ averageScore: number; totalFeedback: number }> {
  const reputationAddress = ERC8004_CONTRACTS.REPUTATION_REGISTRY;
  if (!reputationAddress) {
    return { averageScore: 0, totalFeedback: 0 };
  }

  try {
    const reputation = new ethers.Contract(
      reputationAddress,
      REPUTATION_REGISTRY_ABI,
      provider
    );
    const summary = await reputation.getSummary(agentId);
    return {
      averageScore: Number(summary.averageScore),
      totalFeedback: Number(summary.totalFeedback),
    };
  } catch {
    return { averageScore: 0, totalFeedback: 0 };
  }
}

// ─── Verification Status Types ───

export type VerificationStatus =
  | "unverified"
  | "pending"
  | "registering"
  | "confirmed"
  | "failed"
  | "no_registry";

export interface AgentRegistrationResult {
  status: VerificationStatus;
  agentId?: string;
  txHash?: string;
  registeredAt?: number;
  error?: string;
}

// ─── Local Storage for cached registration state ───

export function getCachedRegistration(
  walletAddress: string
): AgentRegistrationResult | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(
      `erc8004_agent_${walletAddress.toLowerCase()}`
    );
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function cacheRegistration(
  walletAddress: string,
  result: AgentRegistrationResult
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    `erc8004_agent_${walletAddress.toLowerCase()}`,
    JSON.stringify(result)
  );
}
