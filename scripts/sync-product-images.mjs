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

const EXT_ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function listImages(sku) {
  const dir = join(IMG_ROOT, sku);
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => EXT_ALLOWED.has('.' + n.split('.').pop().toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }));
  return files.map((f) => `/images/products/${sku}/${f}`);
}

async function main() {
  const products = JSON.parse(await readFile(PRODUCTS_JSON, 'utf-8'));

  let filled = 0;
  let empty = 0;
  for (const p of products) {
    const found = await listImages(p.sku);
    if (found.length > 0) {
      p.images = found;
      filled++;
    } else {
      p.images = [PLACEHOLDER];
      empty++;
    }
  }

  await writeFile(PRODUCTS_JSON, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`sync-product-images: ${filled} SKUs with photos, ${empty} empty (placeholder)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
