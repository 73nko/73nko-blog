// One-off: render public/og-image.svg → public/og-image.png at 1200x630.
// Run: node scripts/render-og.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, '../public/og-image.svg');
const pngPath = resolve(__dirname, '../public/og-image.png');

const svg = readFileSync(svgPath);
const png = await sharp(svg, { density: 192 })
  .resize(1200, 630, { fit: 'fill' })
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(pngPath, png);
console.log(`Wrote ${pngPath} (${png.length} bytes)`);
