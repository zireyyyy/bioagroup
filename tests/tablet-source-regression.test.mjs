import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('Source footer is kept in place with exactly four Bio-A groups',async()=>{
 const s=await read('bioa-home-refine.mjs');
 assert.ok(s.includes("const navs=$('.footer-top__menu .footer-top__nav');"));
 assert.ok(s.includes("navs.slice(cols.length).remove()"));
 assert.ok(css.includes('.footer-top .footer-top__nav:nth-child(4)'));
 assert.ok(css.includes('.bioa-footer-company-info--desktop'));
 assert.ok(css.includes('.footer-top .footer-top__socials'));
});
