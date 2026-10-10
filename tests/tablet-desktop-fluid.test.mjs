import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('Desktop-like tablet uses original Merywood breakpoint without scale()',()=>{
 assert.ok(css.includes('@media (min-width:769px) and (max-width:1200px)'));
 assert.ok(!css.includes('transform:scale('));
 assert.ok(css.includes('.footer-top .footer-top__wrapper'));
 assert.ok(css.includes('.footer-top .footer-top__menu'));
 assert.ok(css.includes('display:flex'));
});
