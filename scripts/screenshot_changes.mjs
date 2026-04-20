import { chromium } from 'playwright';
const BASE = 'http://localhost:4327';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';
const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem('beadora_theme_mode', t), theme);
  const p = await ctx.newPage();

  // Home - contacts + footer
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000);
  const contacts = await p.$('.contacts');
  if (contacts) {
    await contacts.scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
    await p.screenshot({ path: `${OUT}\\r2-contacts-${theme}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(800);
  const footer = await p.locator('footer.site-footer').boundingBox();
  if (footer) await p.screenshot({ path: `${OUT}\\r2-footer-${theme}.png`, clip: footer });

  // Stones page
  await p.goto(`${BASE}/stones`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}\\r2-stones-catalog-${theme}.png`, fullPage: true });

  // Quiz page
  await p.goto(`${BASE}/quiz`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}\\r2-quiz-${theme}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Zodiac page (e.g. lev)
  await p.goto(`${BASE}/catalog/zodiac/lev`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}\\r2-zodiac-${theme}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

  await ctx.close();
}
await browser.close();
console.log('done');
