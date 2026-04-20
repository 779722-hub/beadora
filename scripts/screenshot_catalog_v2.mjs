import { chromium } from 'playwright';

const BASE = 'http://localhost:4322';
const OUT_DIR = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots';

const browser = await chromium.launch();

// Dark theme viewport
const darkCtx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
await darkCtx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'dark'));
let page = await darkCtx.newPage();
await page.goto(`${BASE}/catalog/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT_DIR}\\catalog-dark-v2.png`, fullPage: false });
await page.close();

// Light theme viewport
const lightCtx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
await lightCtx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'light'));
page = await lightCtx.newPage();
await page.goto(`${BASE}/catalog/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT_DIR}\\catalog-light-v2.png`, fullPage: false });
await page.close();

// Product detail page
page = await darkCtx.newPage();
await page.goto(`${BASE}/product/0083/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT_DIR}\\product-0083-v2.png`, fullPage: false });

await browser.close();
console.log('saved');
