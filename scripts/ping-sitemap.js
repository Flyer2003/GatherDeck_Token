// Script to ping Google about sitemap updates
// Run using: node scripts/ping-sitemap.js

const https = require('https');

const SITEMAP_URL = 'https://gatherdeck.in/sitemap.xml';
const GOOGLE_PING_URL = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

console.log(`Pinging Google with sitemap: ${SITEMAP_URL}...`);

https.get(GOOGLE_PING_URL, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  if (res.statusCode === 200 || res.statusCode === 204) {
    console.log('✅ Successfully pinged Google Search Console!');
  } else {
    console.error('❌ Failed to ping Google. They may have rate-limited or the endpoint changed.');
  }
}).on('error', (e) => {
  console.error(`Error: ${e.message}`);
});
