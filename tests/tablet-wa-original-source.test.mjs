import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {load} from 'cheerio';

const source=await readFile('bioa-home-refine.mjs','utf8');
assert.ok(source.includes('function restoreMerywoodWhatsAppIcon($)'));
assert.ok(source.includes('icons.whatsapp=svg'));
assert.ok(source.includes('const patchTabletType3Css ='));
assert.ok(source.includes('sourceComponentCss+patchTabletType3Css'));

for(const route of ['','en/','about/','en/about/','blog/','en/blog/','contacts/','en/contacts/']){
 const $=load(await readFile('dist/'+route+'index.html','utf8'));
 const header=$('.header__socials .socials__link').first();
 assert.equal(header.length,1,'header social exists: '+route);
 const icon=header.find('svg').first();
 assert.equal(icon.length,1,'original WA svg retained in Header: '+route);
 assert.ok(icon.find('path,circle,rect,polygon,polyline,ellipse').length>0,'self-contained WhatsApp artwork: '+route);
 for(const label of ['WhatsApp']){
  const footer=$('.footer-top__socials > a[aria-label="'+label+'"]');
  assert.equal(footer.length,1,'WhatsApp Footer must exist: '+route);
  const footerIcon=footer.find('svg').first();
  assert.equal(footerIcon.length,1,'WhatsApp Footer svg: '+route);
  assert.equal(footerIcon.html(),icon.html(),'source icon parity Header vs Footer: '+route);
 }
 console.log('WA_SOURCE_PARITY '+(route||'/'));
}
