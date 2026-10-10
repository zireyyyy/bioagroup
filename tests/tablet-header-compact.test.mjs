import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('Header inherits Merywood DOM and has just one tablet CSS owner',async()=>{
 const s=await read('bioa-home-refine.mjs');
 const a7=own(s,'const patchA7Css = `','const patchA8Css = `');
 const a8=own(s,'const patchA8Css = `','const patchBCss = `');
 assert.ok(!a7.includes('@media(min-width:769px) and (max-width:1200px)'));
 assert.ok(!a8.includes('@media(min-width:769px) and (max-width:1200px)'));
 assert.ok(s.includes("normalizeHeaderActions($);"));
 assert.ok(css.includes('.header .header__wrapper'));
 assert.ok(css.includes('.header .bioa-header-actions'));
 assert.ok(css.includes('height:2.4479vw'));
});
