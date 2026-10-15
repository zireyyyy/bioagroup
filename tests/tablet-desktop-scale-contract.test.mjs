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
 assert.ok(css.includes('grid-template-columns:22.2222vw minmax(0,1fr) 14.4444vw'));
 assert.ok(css.includes('.footer-top .footer-top__socials a[aria-label="Zalo"] .bioa-zalo-icon'));
 assert.ok(css.includes('flex:0 0 2.0833vw !important'));
});
test('BIO-A formats preserve shared layout with minimum readable type on Tablet',async()=>{
 const t=await read('bioa-transform.mjs');
 const i=t.indexOf('@media(min-width:769px) and (max-width:1200px){');
 const j=t.indexOf('\n\n.block-reviews{',i);
 assert.ok(i>=0&&j>i);
 const band=t.slice(i,j);
 assert.ok(band.includes('.block-product-formats .formats__tab'));
 assert.ok(band.includes('font-size:clamp(12px,.8333vw,16px)!important'));
 assert.ok(band.includes('font-size:clamp(13px,.8333vw,16px)!important'));
 assert.ok(band.includes('font-weight:550'));
 assert.ok(band.includes('.block-product-formats .formats__cta-content'));
});
