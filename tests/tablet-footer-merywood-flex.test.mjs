import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('Original footer flex with Bio-A categories is responsive only in approved desktop-fluid window',()=>{
 assert.ok(css.includes('.footer-top .footer-top__wrapper'));
 assert.ok(css.includes('.footer-top .footer-top__menu'));
 assert.ok(css.includes('.footer-top .footer-top__nav:nth-child(2)'));
 assert.ok(css.includes('.footer-top .footer-top__nav:nth-child(4)'));
 assert.ok(!css.includes('grid-template-columns'));
 assert.ok(!css.includes('repeat(2,'));
});
