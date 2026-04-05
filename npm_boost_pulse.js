const https = require('https');

const PACKAGE_NAME = '@rajuice/celo-pulse';
const VERSION = '1.0.0';
const URL = `https://registry.npmjs.org/${PACKAGE_NAME}/-/${PACKAGE_NAME.split('/')[1]}-${VERSION}.tgz`;
const TOTAL = 15000;
const CONCURRENCY = 50;

let done = 0;
let failed = 0;

function download() {
  return new Promise((resolve) => {
    https.get(URL, { timeout: 5000 }, (res) => {
      res.resume(); // Discard data to save memory
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
  console.log('Initiating Download Sequence... Target: 15,000');
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
