import { chromium } from 'playwright';

const BASE = 'http://localhost:4324';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
await ctx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'dark'));

for (const [path, name] of [['/catalog/', 'catalog-with-photos'], ['/product/0083/', 'product-0083-with-photos'], ['/product/0088/', 'product-0088-with-photos']]) {
  const p = await ctx.newPage();
  await p.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}\\${name}.png`, fullPage: false });
  await p.close();
}

await browser.close();
console.log('done');
