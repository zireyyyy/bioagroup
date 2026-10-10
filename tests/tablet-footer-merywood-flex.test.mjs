import test from 'node:test';import assert from 'node:assert/strict';import {sourceComponentCss as css} from '../bioa-source-components.mjs';
test('BIO-A four-column Desktop grid remains intact across desktop-fluid Tablet',()=>{
 assert.ok(css.includes('.footer-top .footer-top__wrapper'));
 assert.ok(css.includes('display:grid !important'));
 assert.ok(css.includes('grid-template-columns:22.2222vw'));
 assert.ok(css.includes('.footer-top .footer-top__nav'));
 assert.ok(css.includes('.footer-top .footer-top__socials a[aria-label="Zalo"]'));
 assert.ok(!css.includes('repeat(2,'));
});