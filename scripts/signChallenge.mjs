/**
 * Sign a Self Protocol challenge hash using Ed25519.
 *
 * Usage:
 *   AGENT_PRIVATE_KEY=<hex> node scripts/signChallenge.mjs
 *
 * Or place AGENT_PRIVATE_KEY in .env.local and run:
 *   node scripts/signChallenge.mjs
 */

import { readFileSync } from "fs";
import { sign, createPrivateKey } from "crypto";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local manually (no dotenv dependency) ──────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");

function loadEnv(path) {
  try {
    const content = readFileSync(path, "utf-8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local is optional if env var is already set
  }
}

loadEnv(envPath);

// ── Validate input ───────────────────────────────────────────────
const CHALLENGE_HASH =
  "0xe874bd5f6cdf88e04d4de232cd2d220e9203a05597073e1794dd6f9a35cc2253";

const privateKeyHex = process.env.AGENT_PRIVATE_KEY;
if (!privateKeyHex) {
  console.error("ERROR: AGENT_PRIVATE_KEY not found in env or .env.local");
  process.exit(1);
}

// Strip optional 0x prefix
const rawHex = privateKeyHex.replace(/^0x/, "");
const privateKeyBuf = Buffer.from(rawHex, "hex");

if (privateKeyBuf.length !== 32) {
  console.error(
    `ERROR: Private key must be 32 bytes (got ${privateKeyBuf.length})`
  );
  process.exit(1);
}

// ── Build Ed25519 key object ─────────────────────────────────────
const keyObject = createPrivateKey({
  key: Buffer.concat([
    // PKCS#8 DER prefix for Ed25519 (RFC 8410)
    Buffer.from("302e020100300506032b657004220420", "hex"),
    privateKeyBuf,
  ]),
  format: "der",
  type: "pkcs8",
});

// ── Sign the challenge hash ──────────────────────────────────────
const challengeBuf = Buffer.from(CHALLENGE_HASH.replace(/^0x/, ""), "hex");
const signature = sign(null, challengeBuf, keyObject);
const signatureHex = signature.toString("hex");

// ── Output ───────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════");
console.log("  Self Protocol – Ed25519 Challenge Signature");
console.log("═══════════════════════════════════════════════════════");
console.log();
console.log("Challenge Hash :", CHALLENGE_HASH);
console.log("Signature (hex):", signatureHex);
console.log("Signature length:", signature.length, "bytes");
console.log();
console.log("═══════════════════════════════════════════════════════");
