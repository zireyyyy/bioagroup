import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('No fixed 208px Tablet Footer email shell or duplicate source email rule',async()=>{
 const s=await read('bioa-home-refine.mjs');
 const a7=own(s,'const patchA7Css = `','const patchA8Css = `');
 const footer=own(s,'const patchD5FooterTabletCss = `','const patchCookieConsentCss = `');
 assert.ok(!a7.includes('@media(min-width:769px)'));
 assert.ok(!footer.includes('@media('));
 assert.ok(css.includes('.footer-top .footer-top__email a'));
 assert.ok(css.includes('width:100%'));
 assert.ok(css.includes('.header .bioa-header-actions .header__email a'));
});
