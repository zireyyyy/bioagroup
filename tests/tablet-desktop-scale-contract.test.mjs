import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
test('Merywood Desktop remains viewport-fluid on Tablet, without per-widget clamp floors',()=>{
 assert.equal((css.match(/@media/g)||[]).length,1);
 assert.ok(css.includes('(min-width:769px) and (max-width:1200px)'));
 assert.ok(!css.includes('clamp('));
 assert.ok(css.includes('height:2.4479vw !important; min-height:0 !important'));
 assert.ok(css.includes('.footer-top .footer-top__wrapper'));
 assert.ok(css.includes('display:flex !important'));
 assert.ok(css.includes('.footer-top .footer-top__socials a[aria-label="Zalo"] .bioa-zalo-icon'));
 assert.ok(css.includes('flex:0 0 1.5625vw !important'));
});
test('BIO-A formats return to shared 1920-relative scale and approved layout',async()=>{
 const t=await read('bioa-transform.mjs');
 const i=t.indexOf('@media(min-width:769px) and (max-width:1200px){');
 const j=t.indexOf('\n\n.block-reviews{',i);
 assert.ok(i>=0&&j>i);
 const band=t.slice(i,j);
 assert.ok(band.includes('.block-product-formats .formats__tab'));
 assert.ok(band.includes('font-size:.8333vw!important'));
 assert.ok(!band.includes('clamp('));
});
