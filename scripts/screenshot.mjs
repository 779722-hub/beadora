import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'http://localhost:4321';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const pages = [
  { url: '/', slug: 'home' },
  { url: '/catalog/', slug: 'catalog' },
  { url: '/product/0083/', slug: 'product-0083' },
  { url: '/stones/', slug: 'stones' },
  { url: '/stones/ametist/', slug: 'stone-ametist' },
  { url: '/catalog/zodiac/lev/', slug: 'zodiac-lev' },
  { url: '/quiz/', slug: 'quiz' },
  { url: '/about/', slug: 'about' },
];

async function run() {
  await mkdir(join(OUT, 'dark'), { recursive: true });
  await mkdir(join(OUT, 'light'), { recursive: true });
  const browser = await chromium.launch();

  for (const theme of ['dark', 'light']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    // pre-inject theme mode into localStorage
    await context.addInitScript((t) => {
      localStorage.setItem('beadora_theme_mode', t);
    }, theme);

    for (const page of pages) {
      const p = await context.newPage();
      console.log(`[${theme}] ${page.url}`);
      try {
        await p.goto(`${BASE}${page.url}`, { waitUntil: 'networkidle', timeout: 30000 });
        await p.waitForTimeout(800);
      } catch (e) {
        console.log(`  warn: ${e.message}`);
      }
      await p.screenshot({
        path: join(OUT, theme, `${page.slug}.png`),
        fullPage: true,
      });
      await p.close();
    }
    await context.close();
  }

  await browser.close();
  console.log('done');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
