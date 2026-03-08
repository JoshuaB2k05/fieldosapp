import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
        page.on('pageerror', err => console.error('BROWSER_ERROR:', err.message));

        console.log("Navigating to local preview server...");
        await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

        console.log("Page loaded. Waiting 2 seconds for JS execution...");
        await new Promise(r => setTimeout(r, 2000));

        await browser.close();
        console.log("Test finished.");
    } catch (e) {
        console.error("Script error:", e);
    }
})();
