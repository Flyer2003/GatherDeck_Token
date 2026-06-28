const fs = require('fs');
const svg = fs.readFileSync('public/assets/icons/gatherdeck2.svg', 'utf8');
const paths = [...svg.matchAll(/<path d="([^"]+)"[^>]*transform="translate\(([^,]+),([^)]+)\)"/g)];
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const match of paths) {
  const d = match[1];
  const tx = parseFloat(match[2]);
  const ty = parseFloat(match[3]);
  const parts = d.split(/[\sMCLZ]+/).filter(Boolean);
  for (let i = 0; i < parts.length; i += 2) {
    if (i + 1 >= parts.length) break;
    const x = parseFloat(parts[i]) + tx;
    const y = parseFloat(parts[i+1]) + ty;
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log('minX:', minX, 'minY:', minY, 'maxX:', maxX, 'maxY:', maxY);
console.log('width:', maxX - minX, 'height:', maxY - minY);
