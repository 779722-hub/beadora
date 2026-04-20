import { chromium } from 'playwright';

const BASE = 'http://localhost:4323';
const OUT_DIR = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1600 } });
await ctx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'dark'));

for (const sku of ['0083', '0088', '0019', '0001']) {
  const p = await ctx.newPage();
  await p.goto(`${BASE}/product/${sku}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT_DIR}\\product-${sku}-final.png`, fullPage: false });
  await p.close();
}

// Also catalog
const p = await ctx.newPage();
await p.goto(`${BASE}/catalog/`, { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
await p.screenshot({ path: `${OUT_DIR}\\catalog-final.png`, fullPage: false });

await browser.close();
console.log('done');
