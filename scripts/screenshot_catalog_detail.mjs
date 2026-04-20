import { chromium } from 'playwright';

const BASE = 'http://localhost:4321';
const OUT = 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots\\catalog-detail.png';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
const page = await context.newPage();
await page.goto(`${BASE}/catalog/`, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: OUT, fullPage: false });
await browser.close();
console.log('saved', OUT);
