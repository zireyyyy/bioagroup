import test from 'node:test';import assert from 'node:assert/strict';import {sourceComponentCss as css} from '../bioa-source-components.mjs';
test('Header logo shares approved Desktop viewport ratio',()=>{assert.ok(css.includes('width:4.0278vw'));assert.ok(css.includes('width:3.3333vw'));});
test('Zalo image, flex-basis and social slot follow accepted Desktop ratio',()=>{assert.ok(css.includes('flex:0 0 1.5972vw'));assert.ok(css.includes('flex:0 0 3.1944vw'));});
test('Chat launcher and teaser scale only within existing 769-1200 source owner',()=>{assert.ok(css.includes('.bioa-contact-fab .bioa-contact-fab__toggle'));assert.ok(css.includes('width:4.7222vw'));assert.ok(css.includes('.bioa-contact-fab .bioa-chat__teaser'));assert.equal((css.match(/@media/g)||[]).length,1);});
