import { chromium } from 'playwright';

const BASE = 'http://localhost:4327';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem('beadora_theme_mode', t), theme);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);

  // Hero (top viewport)
  await p.screenshot({
    path: `${OUT}\\sec-hero-${theme}.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // Scroll + screenshot each known section by selector
  const sections = [
    { sel: '.categories', name: 'cats' },
    { sel: '.quiz-promo', name: 'quiz' },
    { sel: '.stone-power', name: 'stones' },
  ];
  for (const s of sections) {
    const el = await p.$(s.sel);
    if (!el) continue;
    await el.scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    const box = await el.boundingBox();
    if (box) {
      await p.screenshot({
        path: `${OUT}\\sec-${s.name}-${theme}.png`,
        clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: Math.min(900, box.height + 60) },
      });
    }
  }
  await ctx.close();
}

await browser.close();
console.log('done');
