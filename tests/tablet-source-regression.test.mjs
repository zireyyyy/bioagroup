import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {sourceComponentCss as css} from '../bioa-source-components.mjs';
test('Footer category owner remains four BIO-A groups and right contact column',async()=>{
 const h=await readFile(new URL('../bioa-home-refine.mjs',import.meta.url),'utf8');
 assert.ok(h.includes("const navs=$('.footer-top__menu .footer-top__nav');"));
 assert.ok(h.includes("navs.slice(cols.length).remove()"));
 assert.ok(css.includes('.footer-top .footer-top__right'));
 assert.ok(css.includes('grid-template-columns:minmax(0,1.08fr)'));
 assert.ok(css.includes('font-size:1.25vw'));
});