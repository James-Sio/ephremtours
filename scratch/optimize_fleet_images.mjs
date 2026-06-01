/**
 * Generate hero (960w) and thumb (200w) WebP variants from fleet JPEGs.
 * Run: npm run fleet:optimize
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FLEET_DIR = path.join(__dirname, "..", "public", "fleet");
const HERO_WIDTH = 960;
const THUMB_WIDTH = 200;
const HERO_QUALITY = 82;
const THUMB_QUALITY = 76;

const models = fs.readdirSync(FLEET_DIR).filter((d) =>
  fs.statSync(path.join(FLEET_DIR, d)).isDirectory()
);

let totalBefore = 0;
let totalAfter = 0;

for (const model of models) {
  const dir = path.join(FLEET_DIR, model);
  const jpgs = fs
    .readdirSync(dir)
    .filter((f) => /^\d+\.jpg$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  for (const file of jpgs) {
    const src = path.join(dir, file);
    const n = path.basename(file, ".jpg");
    const heroOut = path.join(dir, `${n}-hero.webp`);
    const thumbOut = path.join(dir, `${n}-thumb.webp`);
    const before = fs.statSync(src).size;
    totalBefore += before;

    await sharp(src)
      .rotate()
      .resize({ width: HERO_WIDTH, withoutEnlargement: true })
      .webp({ quality: HERO_QUALITY, effort: 4 })
      .toFile(heroOut);

    await sharp(src)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY, effort: 4 })
      .toFile(thumbOut);

    const after = fs.statSync(heroOut).size + fs.statSync(thumbOut).size;
    totalAfter += after;
    console.log(
      `${model}/${n}: ${(before / 1024).toFixed(0)}KB jpg → hero ${(fs.statSync(heroOut).size / 1024).toFixed(0)}KB + thumb ${(fs.statSync(thumbOut).size / 1024).toFixed(0)}KB webp`
    );
  }
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB JPEG → ${(totalAfter / 1024 / 1024).toFixed(1)}MB WebP (hero+thumb per image)`
);
