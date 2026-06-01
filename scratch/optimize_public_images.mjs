/**
 * Generate hero + thumb WebP variants for /public/fleet and /public/tourImages.
 * Run: npm run images:optimize
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const HERO_WIDTH_FLEET = 960;
const HERO_WIDTH_TOUR = 1280;
const THUMB_WIDTH = 240;
const HERO_QUALITY = 82;
const THUMB_QUALITY = 76;

let totalBefore = 0;
let totalAfter = 0;

async function optimizeFile(src, heroOut, thumbOut, heroWidth) {
  const before = fs.statSync(src).size;
  totalBefore += before;

  await sharp(src)
    .rotate()
    .resize({ width: heroWidth, withoutEnlargement: true })
    .webp({ quality: HERO_QUALITY, effort: 4 })
    .toFile(heroOut);

  await sharp(src)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY, effort: 4 })
    .toFile(thumbOut);

  const after = fs.statSync(heroOut).size + fs.statSync(thumbOut).size;
  totalAfter += after;
  return { before, after };
}

function shouldSkip(src, heroOut, thumbOut) {
  if (!fs.existsSync(heroOut) || !fs.existsSync(thumbOut)) return false;
  const srcMtime = fs.statSync(src).mtimeMs;
  return (
    fs.statSync(heroOut).mtimeMs >= srcMtime &&
    fs.statSync(thumbOut).mtimeMs >= srcMtime
  );
}

async function optimizeFleet() {
  const fleetDir = path.join(ROOT, "public", "fleet");
  if (!fs.existsSync(fleetDir)) return;

  for (const model of fs.readdirSync(fleetDir)) {
    const dir = path.join(fleetDir, model);
    if (!fs.statSync(dir).isDirectory()) continue;

    const jpgs = fs
      .readdirSync(dir)
      .filter((f) => /^\d+\.jpe?g$/i.test(f))
      .sort((a, b) => parseInt(a) - parseInt(b));

    for (const file of jpgs) {
      const src = path.join(dir, file);
      const n = path.basename(file).replace(/\.jpe?g$/i, "");
      const heroOut = path.join(dir, `${n}-hero.webp`);
      const thumbOut = path.join(dir, `${n}-thumb.webp`);
      if (shouldSkip(src, heroOut, thumbOut)) {
        console.log(`skip fleet/${model}/${n} (up to date)`);
        continue;
      }
      const { before, after } = await optimizeFile(
        src,
        heroOut,
        thumbOut,
        HERO_WIDTH_FLEET
      );
      console.log(
        `fleet/${model}/${n}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB webp`
      );
    }
  }
}

async function optimizeTour() {
  const tourDir = path.join(ROOT, "public", "tourImages");
  if (!fs.existsSync(tourDir)) return;

  const sources = fs
    .readdirSync(tourDir)
    .filter((f) => /^\d+\.(png|jpe?g)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  for (const file of sources) {
    const src = path.join(tourDir, file);
    const n = path.basename(file).replace(/\.(png|jpe?g)$/i, "");
    const heroOut = path.join(tourDir, `${n}-hero.webp`);
    const thumbOut = path.join(tourDir, `${n}-thumb.webp`);
    if (shouldSkip(src, heroOut, thumbOut)) {
      console.log(`skip tourImages/${n} (up to date)`);
      continue;
    }
    const { before, after } = await optimizeFile(
      src,
      heroOut,
      thumbOut,
      HERO_WIDTH_TOUR
    );
    console.log(
      `tourImages/${n}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024).toFixed(0)}KB webp`
    );
  }
}

console.log("Optimizing fleet images…");
await optimizeFleet();
console.log("\nOptimizing tour package images…");
await optimizeTour();
console.log(
  `\nDone: ${(totalBefore / 1024 / 1024).toFixed(1)}MB sources → ${(totalAfter / 1024 / 1024).toFixed(1)}MB WebP (hero+thumb)`
);
