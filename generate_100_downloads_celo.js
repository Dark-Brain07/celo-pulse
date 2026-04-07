const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PKG = '@rajuice/celo-pulse';
const TOTAL = 100;
const BATCH = 10; // concurrent installs per round
const BASE = path.join(__dirname, '_npm_tmp_celo');

// Clean up old runs
if (fs.existsSync(BASE)) fs.rmSync(BASE, { recursive: true, force: true });
fs.mkdirSync(BASE, { recursive: true });

let done = 0;
let errors = 0;

async function install(id) {
  const dir = path.join(BASE, `d${id}`);
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: `dl-${id}`, version: '1.0.0', private: true }));
    execSync(`npm install ${PKG} --prefer-online --no-audit --no-fund --loglevel=error`, {
      cwd: dir,
      stdio: 'pipe',
      timeout: 60000,
    });
    done++;
  } catch (e) {
    errors++;
  } finally {
    // Clean up immediately to save disk
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
}

async function run() {
  console.log(`Starting ${TOTAL} actual npm downloads for ${PKG}...`);
  console.log(`Using batches of ${BATCH}\\n`);

  for (let i = 0; i < TOTAL; i += BATCH) {
    const batch = [];
    const batchSize = Math.min(BATCH, TOTAL - i);
    for (let j = 0; j < batchSize; j++) {
      batch.push(install(i + j));
    }
    await Promise.all(batch);
    
    if ((done + errors) % 20 === 0 || done + errors >= TOTAL) {
      console.log(`  [${done} done, ${errors} errors, ${done + errors}/${TOTAL} total]`);
    }
  }

  // Final cleanup
  try { fs.rmSync(BASE, { recursive: true, force: true }); } catch {}
  console.log(`\\n✅ Completed: ${done} actual NPM installations for ${PKG}, ${errors} errors`);
}

run().catch(console.error);
