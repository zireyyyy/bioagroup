import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('Tablet rebuild has one media scope, no Desktop or Mobile edits',async()=>{
 assert.equal((css.match(/@media/g)||[]).length,1);
 assert.ok(css.includes('(min-width:769px) and (max-width:1200px)'));
 assert.ok(!css.includes('max-width:768px'));
 assert.ok(!css.includes('min-width:1201px'));
 assert.ok(!css.includes('transform:scale('));
});
test('Project CTA is a separate Bio-A addition; all three source owners present',()=>{
 for(const token of ['.header .header__wrapper','.footer-top .footer-top__wrapper','.whatsapp .whatsapp__content']) assert.ok(css.includes(token));
 assert.ok(css.includes('data-bioa-aos'));
});
test('Previously approved Mobile, 404, company identity, and lead flows remain in code',async()=>{
 const [h,t,b] =await Promise.all([read('bioa-home-refine.mjs'),read('bioa-transform.mjs'),read('build.mjs')]);
 assert.ok(h.includes('const patchMobileHeaderSourceParityCss'));
 assert.ok(h.includes('function addHomeRoadmapColdLoadSync($)'));
 assert.ok(h.includes('function refineFooterNavigation($,lang)'));
 assert.ok(h.includes('function addContactLauncher($,lang)'));
 assert.ok(t.includes('contact@bioagroup.vn'));
 assert.ok(b.includes('renderNotFound'));
});
