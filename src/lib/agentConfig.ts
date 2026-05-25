/**
 * CeloPulse — ERC-8004 AI Agent Identity Configuration
 *
 * This module exports the on-chain identity parameters for the CeloPulse
 * verifiable AI agent registered on Celo Mainnet via Self Protocol.
 *
 * Token:    AgentIdentity (AGENT) #9093
 * Standard: ERC-8004 (AI Agent Identity)
 * Chain:    Celo Mainnet (42220)
 */

// ── Public Constants ─────────────────────────────────────────────

/** Ed25519 public key used for Self Protocol challenge verification */
export const AGENT_PUBLIC_KEY =
  "914472276af8f5b2c2a0b01b0fa5a47e5ef3cb632dfc3abe872fa1f62abfc11e";

/** Celo Mainnet wallet that owns the ERC-8004 Agent NFT */
export const AGENT_WALLET =
  "0xfd4960F33670f3477ebe817B184dd59fC4961437";

/** ERC-721 token ID of the minted AgentIdentity NFT */
export const ERC8004_TOKEN_ID = 9093;

/** ERC-8004 Identity Registry contract on Celo Mainnet */
export const ERC8004_REGISTRY =
  "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";

// ── Type Definition ──────────────────────────────────────────────

export interface AgentConfig {
  /** Ed25519 public key (hex, no 0x prefix) */
  publicKey: string;
  /** EVM wallet address (checksummed) */
  wallet: string;
  /** ERC-721 token ID on the Identity Registry */
  tokenId: number;
  /** Identity Registry contract address */
  registry: string;
}

// ── Default Export ───────────────────────────────────────────────

const agentConfig: AgentConfig = {
  publicKey: AGENT_PUBLIC_KEY,
  wallet: AGENT_WALLET,
  tokenId: ERC8004_TOKEN_ID,
  registry: ERC8004_REGISTRY,
};

export default agentConfig;
