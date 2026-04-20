import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => localStorage.setItem('beadora_theme_mode', 'light'));
const p = await ctx.newPage();
await p.goto('http://localhost:4335/contacts', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
await p.screenshot({ path: 'C:\\Users\\user\\beadora-migration\\new-site\\screenshots\\r7-contacts.png', fullPage: true });
await browser.close();
