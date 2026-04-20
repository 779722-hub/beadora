/**
 * Scan public/images/products/NNNN/ and update src/data/products.json with real image lists.
 * Runs before `astro build` so the built site picks up whatever photos user dropped in.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMG_ROOT = join(ROOT, 'public', 'images', 'products');
const PRODUCTS_JSON = join(ROOT, 'src', 'data', 'products.json');
const PLACEHOLDER = '/images/product-placeholder.svg';

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov']);

async function listMedia(sku) {
  const dir = join(IMG_ROOT, sku);
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return { images: [], videos: [] };
  }
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }));
  const ext = (n) => '.' + n.split('.').pop().toLowerCase();
  return {
    images: files.filter((f) => IMAGE_EXT.has(ext(f))).map((f) => `/images/products/${sku}/${f}`),
    videos: files.filter((f) => VIDEO_EXT.has(ext(f))).map((f) => `/images/products/${sku}/${f}`),
  };
}

async function main() {
  const products = JSON.parse(await readFile(PRODUCTS_JSON, 'utf-8'));

  let filled = 0;
  let empty = 0;
  let withVideos = 0;
  for (const p of products) {
    const { images, videos } = await listMedia(p.sku);
    if (images.length > 0) {
      p.images = images;
      filled++;
    } else {
      p.images = [PLACEHOLDER];
      empty++;
    }
    if (videos.length > 0) {
      p.videos = videos;
      withVideos++;
    } else {
      delete p.videos;
    }
  }

  await writeFile(PRODUCTS_JSON, JSON.stringify(products, null, 2), 'utf-8');
  console.log(
    `sync-product-images: ${filled} SKUs with photos, ${empty} empty (placeholder), ${withVideos} with videos`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
