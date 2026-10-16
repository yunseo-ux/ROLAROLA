import assert from 'node:assert/strict';
import { stat, mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const slugs = ['view-all', 'new-arrivals', 'best', 'nu-basic', 'maison-de-rola', 'outwear', 'top', 'dress', 'bottom', 'home'];
for (const slug of slugs) assert.ok((await stat(`src/assets/images/category-${slug}.svg`)).size > 0);
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1400 } });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  const section = page.locator('#shop');
  const buttons = section.locator('.category-button');
  await section.scrollIntoViewIfNeeded();
  assert.equal(await buttons.count(), 10);
  assert.equal(await section.locator('.category-preview img').count(), 0);
  for (const [index, slug] of slugs.entries()) {
    await buttons.nth(index).hover();
    const image = section.locator('.category-preview img');
    assert.ok((await image.getAttribute('src')).includes(`category-${slug}.svg`));
    await image.evaluate(img => img.decode());
    const geometry = await section.evaluate(el => {
      const sectionRect = el.getBoundingClientRect();
      const rect = el.querySelector('.category-preview img').getBoundingClientRect();
      const bar = el.querySelector('.category-highlight').getBoundingClientRect();
      return { x: rect.x - sectionRect.x, y: rect.y - sectionRect.y, width: rect.width, height: rect.height, barY: bar.y - sectionRect.y, barHeight: bar.height, barWidth: bar.width };
    });
    assert.equal(geometry.x, 64);
    assert.equal(geometry.y, 712);
    assert.equal(geometry.width, 302);
    assert.equal(geometry.height, 343);
    assert.equal(geometry.barY, 408 + index * 66);
    assert.equal(geometry.barHeight, 66);
    assert.equal(geometry.barWidth, 1920);
    results.push({ slug, ...geometry });
    if (index === 0 || index === 9) {
      await section.screenshot({ path: `artifacts/category-${slug}-1920.png` });
      assert.ok((await image.getAttribute('src')).includes(`category-${slug}.svg`));
    }
  }
  await page.mouse.move(10, 10);
  assert.equal(await section.locator('.category-preview img').count(), 0);
  await page.keyboard.press('Tab');
  await buttons.first().focus();
  assert.equal(await buttons.first().getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('Tab');
  assert.ok((await section.locator('.category-preview img').getAttribute('src')).includes('category-new-arrivals.svg'));
  await page.keyboard.press('Escape');
  assert.equal(await section.locator('.category-preview img').count(), 0);
  await page.close();

  for (const width of [402, 320]) {
    const mobile = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: true, isMobile: true });
    mobile.on('pageerror', error => errors.push(error.message));
    await mobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    const target = mobile.locator('#shop .category-button').nth(4);
    await target.tap();
    assert.equal(await target.getAttribute('aria-pressed'), 'true');
    const image = mobile.locator('#category-preview img');
    await image.evaluate(img => img.decode());
    assert.ok((await image.getAttribute('src')).includes('category-maison-de-rola.svg'));
    const bounds = await image.boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width);
    await mobile.locator('#shop').screenshot({ path: `artifacts/category-touch-${width}.png` });
    await target.tap();
    assert.equal(await mobile.locator('#category-preview img').count(), 0);
    assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth), width);
    await mobile.close();
  }
  assert.deepEqual(errors, []);
  await writeFile('artifacts/category-hover-report.json', JSON.stringify({ results, errors, keyboard: 'passed', touch: 'passed' }, null, 2));
  console.log('PASS: 10 hover images, Figma geometry, mouse leave, keyboard focus/Escape, mobile touch toggle (402/320), no page errors.');
} finally { await browser.close(); }
