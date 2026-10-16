import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const browser = await chromium.launch({channel:'chrome',headless:true});
try {
  for (const file of ['index.html','dist/index.html']) {
    const page = await browser.newPage({viewport:{width:402,height:900},hasTouch:true,isMobile:true});
    const errors = [];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve(file)).href);
    await page.getByRole('button',{name:'메뉴 열기',exact:true}).click();
    assert.equal(await page.locator('#mobile-navigation').isVisible(),true);
    await page.getByRole('button',{name:'메뉴 닫기',exact:true}).click();
    await page.locator('.category-button').nth(4).tap();
    await page.locator('#category-preview img').evaluate(image=>image.decode());
    const trigger = page.locator('.friends-hotspot').first();
    await trigger.tap();
    assert.equal(await trigger.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');
    assert.equal(await trigger.getAttribute('aria-expanded'),'false');
    await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));await document.fonts.ready;});
    assert.deepEqual(errors,[]);
    console.log(`PASS: ${file}, direct file loading, images, menu, category, product popup and Escape.`);
    await page.close();
  }
} finally {await browser.close();}
