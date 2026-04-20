import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'light'));
const p = await ctx.newPage();
await p.goto('http://localhost:4333/', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
await p.screenshot({ path: 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots\\r5-hero-slide1.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
await browser.close();
