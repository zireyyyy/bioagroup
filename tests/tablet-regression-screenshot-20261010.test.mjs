import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');

test('Tablet Header email must defeat legacy 42px min-height and align sibling controls',()=>{
 const start=css.indexOf('.header .bioa-header-actions .header__email a');
 const end=css.indexOf('.header .bioa-header-actions .header__socials .socials__link,',start);
 assert.ok(start>=0&&end>start);
 const owner=css.slice(start,end);
 assert.ok(owner.includes('min-height:0 !important'));
 assert.ok(owner.includes('height:clamp(30px,2.4479vw,42px) !important'));
 assert.ok(owner.includes('font-size:clamp(10.5px,.8333vw,14px) !important'));
});

test('Footer Zalo uses high-specificity image AND flex-basis dimensions',()=>{
 assert.ok(css.includes('.footer-top .footer-top__socials a[aria-label="Zalo"] .bioa-zalo-icon'));
 assert.ok(css.includes('flex:0 0 clamp(17px,1.5625vw,23px) !important'));
 assert.ok(css.includes('font-size:clamp(11px,.8333vw,14px) !important'));
});

test('BIO-A CTA restores readable height without touching mobile and desktop',()=>{
 assert.ok(css.includes('min-height:clamp(165px,14vw,225px) !important'));
 assert.ok(css.includes('font-size:clamp(23px,2vw,32px) !important'));
 assert.ok(css.includes('opacity:1 !important'));
 assert.ok(css.includes('.whatsapp .whatsapp__content[data-bioa-aos]'));
 assert.equal((css.match(/@media/g)||[]).length,1);
});

test('Formats owner uses a readable tablet text floor with source layout intact',async()=>{
 const t=await read('bioa-transform.mjs');
 const start=t.indexOf('@media(min-width:769px) and (max-width:1200px){');
 const end=t.indexOf('\n\n.block-reviews{',start);
 assert.ok(start>=0&&end>start);
 const band=t.slice(start,end);
 assert.ok(band.includes('font-size:clamp(11px,.8333vw,14px)!important'));
 assert.ok(band.includes('font-size:clamp(21px,1.6667vw,32px)!important'));
 assert.ok(!band.includes('.whatsapp__btn'));
});
