import { chromium } from 'playwright';

const BASE = 'http://localhost:4327';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem('beadora_theme_mode', t), theme);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  // Crop to header
  const header = await p.locator('header.site-header').boundingBox();
  if (header) {
    await p.screenshot({ path: `${OUT}\\logo-header-${theme}.png`, clip: header });
  }
  // Scroll to footer
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(1000);
  const footer = await p.locator('footer.site-footer').boundingBox();
  if (footer) {
    await p.screenshot({ path: `${OUT}\\logo-footer-${theme}.png`, clip: footer });
  }
  await ctx.close();
}

await browser.close();
console.log('done');
