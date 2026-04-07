const https = require('https');

const PACKAGE_NAME = '@rajuice/celo-pulse';
const VERSION = '1.0.0';
// Form: https://registry.npmjs.org/@rajuice/celo-pulse/-/celo-pulse-1.0.0.tgz
const URL = `https://registry.npmjs.org/${PACKAGE_NAME}/-/${PACKAGE_NAME.split('/')[1]}-${VERSION}.tgz`;
const TOTAL = 100;
const CONCURRENCY = 10;

let done = 0;
let failed = 0;

function download() {
  return new Promise((resolve) => {
    https.get(URL, { timeout: 10000, headers: { 'User-Agent': 'npm/10.0.0 node/v20.0.0' } }, (res) => {
      res.on('data', () => {}); // consume stream to free memory
      res.on('end', () => {
        if (res.statusCode === 200) done++;
        else failed++;
        resolve();
      });
    }).on('error', () => {
      failed++;
      resolve();
    }).on('timeout', () => {
      failed++;
      resolve();
    });
  });
}

async function run() {
  console.log(`📡 Initiating exactly ${TOTAL} HTTP download hits directly to NPM Registry for ${PACKAGE_NAME}...`);
  let active = [];
  
  for (let i = 0; i < TOTAL; i++) {
    const p = download().finally(() => {
      active.splice(active.indexOf(p), 1);
    });
    active.push(p);
    
    if (active.length >= CONCURRENCY) {
      await Promise.race(active);
    }
  }
  
  await Promise.all(active);
  console.log(`\n🎉 Finished! Successfully downloaded: ${done} times. Failed: ${failed}`);
}

run();
