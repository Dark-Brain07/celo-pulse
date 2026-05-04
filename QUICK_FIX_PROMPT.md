## CeloPulse Project — Quick Fix Request

**Project:** CeloPulse — Proof-of-Activity dApp for Celo Proof of Ship (Talent Protocol)
**Repo:** https://github.com/Dark-Brain07/celo-pulse (branch: main)
**Talent Page:** https://talent.app/~/projects/0cb56f43-e9a9-44c3-92bb-5dfa55d27bf5
**NPM Package:** @rajuice/celo-pulse (current version: 1.0.5)
**NPM Auth Recovery Code:** [PASTE YOUR CURRENT RECOVERY CODE HERE]
**Vercel URL:** https://celo-pulse-omega.vercel.app/
**Network:** Celo Mainnet (Chain ID 42220)
**Workspace:** f:\Celo Project For Talent Protocol\celo-pulse

### Tracked Contracts (5 total on Talent Protocol):
| Contract | Address |
|----------|---------|
| ActivityManager | 0x52C26081bb28351Dae6A4D678B4b144bc5A0B956 |
| RewardDistributor | 0xC0d5E5a0644CFFA5fE44fF1Cb542026e29E00c61 |
| MicroActions | 0xDdD816E5e469279dcB385F039a470077b5F58930 |
| MicroActionsNoTimeout | 0x9fe7f2Ef67b2F1eB0BD599588E93bB81A7e88556 |
| ReferralSystem | 0x7f4E1Cbe199B1ed7C85c382632Ee3B6fa7412838 |

### Critical Rules (DO NOT BREAK):
1. **No broken gitlinks** — Run `git ls-files --stage | Select-String "160000"` before every push. Must return EMPTY.
2. **No test artifacts in git** — `.gitignore` blocks `**/test_integration_sync/`, `generate_*.js`, `_npm_tmp*/`, `.build-log`, `.activity_log`
3. **Sync package-lock.json** — After version bumps, run `npm install --package-lock-only` before pushing to avoid CI failure.
4. **MiniPay integration must stay intact** — `apps/frontend/src/hooks/useWallet.ts` has isMiniPay detection + feeCurrency abstraction. Don't overwrite.
5. **NPM publish needs --otp** — Use `npm publish --access public --otp=[RECOVERY_CODE]`
6. **CI workflow** at `.github/workflows/build.yml` runs `npm ci && npm run build` on every push to main.

### What I need you to do:
[DESCRIBE YOUR ISSUE HERE — e.g., "push 500 commits without breaking gitlinks", "publish v1.0.6 to NPM", "add new contract 0xABC... to frontend", "fix CI failure", "boost NPM downloads"]

Make sure after ALL changes:
- GitHub shows today's date for last commit
- NPM shows today's date for last publish (if version was bumped)
- Zero broken gitlinks (mode 160000)
- CI build passes (green check)
- Talent Protocol can fetch all data from GitHub, NPM, and onchain contracts
