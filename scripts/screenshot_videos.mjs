import { chromium } from 'playwright';

const BASE = 'http://localhost:4326';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
await ctx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'dark'));

for (const [path, name] of [
  ['/', 'home-with-video'],
  ['/product/0017-vostochnaya-mudrost', 'product-0017-video'],
  ['/product/0088-zhemchuzhnaya-estetika', 'product-0088-video'],
  ['/catalog', 'catalog-video-badges'],
]) {
  const p = await ctx.newPage();
  await p.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}\\${name}.png`, fullPage: false });
  await p.close();
}

await browser.close();
console.log('done');
