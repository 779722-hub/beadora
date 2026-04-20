import { chromium } from 'playwright';
const BASE = 'http://localhost:4327';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';
const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem('beadora_theme_mode', t), theme);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000);

  // Testimonials
  const testi = await p.$('.testimonials');
  if (testi) {
    await testi.scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    const box = await testi.boundingBox();
    if (box) await p.screenshot({ path: `${OUT}\\r3-testimonials-${theme}.png`, clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: Math.min(900, box.height + 100) } });
  }

  // Lookbook
  const look = await p.$('.lookbook');
  if (look) {
    await look.scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    const box = await look.boundingBox();
    if (box) await p.screenshot({ path: `${OUT}\\r3-lookbook-${theme}.png`, clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: Math.min(900, box.height + 100) } });

    // Open lightbox
    await p.click('.lookbook .item:first-of-type');
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}\\r3-lightbox-${theme}.png` });
    await p.keyboard.press('Escape');
  }
  await ctx.close();
}
await browser.close();
console.log('done');
