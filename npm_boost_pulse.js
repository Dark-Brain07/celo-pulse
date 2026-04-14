const https = require('https');

const PACKAGE_NAME = '@rajuice/celo-pulse';
const VERSION = '1.0.0';
const TOTAL = 1000;
const CONCURRENCY = 100; // Increased concurrency!

let done = 0;
let failed = 0;

function download() {
  return new Promise((resolve) => {
    const URL = `https://registry.npmjs.org/${PACKAGE_NAME}/-/${PACKAGE_NAME.split('/')[1]}-${VERSION}.tgz?cb=${Date.now()}${Math.random()}`;
    
    https.get(URL, { 
      timeout: 15000,
      headers: {
        'User-Agent': 'npm/10.5.0 node/v20.12.0 win32 x64 workspaces/false',
        'Accept': '*/*, application/json'
      }
    }, (res) => {
      // Vital: discard the 1.76MB data chunk by chunk instead of keeping it in memory
      res.resume(); 
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
  console.log(`Starting ${TOTAL} fast streaming downloads...`);
  let active = [];
  
  const report = setInterval(() => {
      console.log(`[Status] ${done} downloaded, ${failed} failed.`);
  }, 2000);

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
  clearInterval(report);
  console.log(`Finished pumping downloads. Success: ${done}`);
}

run();
