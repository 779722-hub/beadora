import { chromium } from 'playwright';

const BASE = 'http://localhost:4327';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1800 } });
  await ctx.addInitScript((t) => localStorage.setItem('beadora_theme_mode', t), theme);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}\\logo-home-${theme}.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
console.log('done');
