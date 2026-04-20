import { chromium } from 'playwright';
const BASE = 'http://localhost:4327';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';
const browser = await chromium.launch();

for (const theme of ['light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem('beadora_theme_mode', t), theme);
  const p = await ctx.newPage();

  await p.goto(`${BASE}/stones`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}\\r4-stones-cat-${theme}.png`, fullPage: true });

  await p.goto(`${BASE}/stones/ametist`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}\\r4-stone-ametist-${theme}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

  await ctx.close();
}
await browser.close();
console.log('done');
