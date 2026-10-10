import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('BIO-A CTA is visible even if scroll observer does not notify on Tablet',async()=>{
 const home=await read('bioa-home-refine.mjs');
 const transform=await read('bioa-transform.mjs');
 assert.ok(home.includes("mark('.whatsapp .whatsapp__content','fade-up',300)"));
 assert.ok(css.includes('.whatsapp .whatsapp__content[data-bioa-aos]'));
 assert.ok(css.includes('opacity:1 !important'));
 assert.ok(css.includes('visibility:visible !important'));
 assert.ok(css.includes('.whatsapp .whatsapp__btn'));
 const intermediate=transform.slice(transform.indexOf('@media(min-width:769px) and (max-width:1200px){'),transform.indexOf('\n\n.block-reviews{'));
 assert.ok(!intermediate.includes('.whatsapp__btn'));
 assert.ok(intermediate.includes('.block-product-formats'));
});
