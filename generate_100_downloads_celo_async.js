const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(exec);

const PKG = '@rajuice/celo-pulse';
const TOTAL = 100;
const BATCH = 20; // Number of parallel installs
const BASE = path.join(__dirname, '_npm_tmp_celo2');

if (fs.existsSync(BASE)) fs.rmSync(BASE, { recursive: true, force: true });
fs.mkdirSync(BASE, { recursive: true });

let done = 0;
let errors = 0;

async function install(id) {
  const dir = path.join(BASE, `d${id}`);
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: `dl-${id}`, version: '1.0.0', private: true }));
    
    // Execute async
    await execAsync(`npm install ${PKG} --prefer-online --no-audit --no-fund --loglevel=error`, {
      cwd: dir,
      timeout: 30000 // 30 second timeout per install
    });
    done++;
  } catch (e) {
    errors++;
  } finally {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
}

async function run() {
  console.log(`Starting ${TOTAL} asynchronous npm downloads for ${PKG}...`);
  console.log(`Batches of ${BATCH} concurrent processes\\n`);

  for (let i = 0; i < TOTAL; i += BATCH) {
    const batch = [];
    const batchSize = Math.min(BATCH, TOTAL - i);
    for (let j = 0; j < batchSize; j++) {
      batch.push(install(i + j));
    }
    await Promise.all(batch);
    console.log(`  [${done} done, ${errors} errors, ${done + errors}/${TOTAL} total]`);
  }

  // Final cleanup
  try { fs.rmSync(BASE, { recursive: true, force: true }); } catch {}
  console.log(`\\n✅ Completed: ${done} precise NPM downloads, ${errors} errors`);
}

run().catch(console.error);
