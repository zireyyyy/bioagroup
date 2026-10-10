import test from 'node:test';import assert from 'node:assert/strict';import {sourceComponentCss as css} from '../bioa-source-components.mjs';
test('Desktop BIO-A grid proportions transfer to Tablet without page-wide scaling',()=>{
 assert.ok(css.includes('@media (min-width:769px) and (max-width:1200px)'));
 assert.ok(css.includes('grid-template-columns:22.2222vw minmax(0,1fr) 14.4444vw'));
 assert.ok(css.includes('grid-template-columns:minmax(0,1.08fr) minmax(0,1.18fr)'));
 assert.ok(!css.includes('transform:scale('));
});