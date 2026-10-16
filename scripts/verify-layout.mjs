import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFile, stat } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const inventory = JSON.parse(await readFile('docs/Figma-asset-map.json', 'utf8'));
for (const asset of inventory.assets) {
  if (!(await stat(asset.file)).size || !asset.sourceNodeIds.length) throw new Error(`Missing asset/source: ${asset.name}`);
}
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [1920, 1024, 402, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1080 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      await document.fonts.ready;
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    });
    const layout = await page.evaluate(() => ({
      title: document.title,
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      imageCount: document.images.length,
      brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
      sections: [...document.querySelectorAll('main > section')].map(section => ({ name: section.className, y: Math.round(section.getBoundingClientRect().top + scrollY), height: Math.round(section.getBoundingClientRect().height) })),
      invalidAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
      images: [...document.images].map(img => { const r = img.getBoundingClientRect(); return { source: img.getAttribute('src'), className: img.className, width: Math.round(r.width), height: Math.round(r.height) }; }),
    }));
    if (width === 1920) {
      const rail = page.locator('.collection-rail');
      const before = await rail.evaluate(el => el.scrollLeft);
      await page.getByRole('button', { name: '다음 컬렉션', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.collection-rail').scrollLeft > 0);
      layout.carouselWorks = await rail.evaluate(el => el.scrollLeft > 0) && before === 0;
      await rail.evaluate(el => { el.scrollLeft = 0; });
    }
    if (width <= 700) {
      await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
      layout.mobileMenuWorks = await page.locator('#mobile-navigation').isVisible();
      await page.getByRole('button', { name: '메뉴 닫기', exact: true }).click();
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `artifacts/layout-${width}.png`, fullPage: true });
    if (width === 1920) await page.screenshot({ path: 'artifacts/desktop-top.png' });
    results.push({ ...layout, errors });
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile('artifacts/layout-report.json', JSON.stringify(results, null, 2));
for (const result of results) {
  console.log(JSON.stringify({ ...result, images: undefined }));
  if (result.errors.length || result.brokenImages.length || result.invalidAnchors.length || result.documentWidth > result.width || result.carouselWorks === false || result.mobileMenuWorks === false) process.exitCode = 1;
}
