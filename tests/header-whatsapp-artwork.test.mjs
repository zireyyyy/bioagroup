import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');

test('Header WhatsApp visual reuses approved Footer SVG instead of old Merywood phone icon',async()=>{
 const s=await read('bioa-home-refine.mjs');
 const begin=s.indexOf('function normalizeHeaderActions($){');
 const end=s.indexOf('function mobileLocalPath(',begin);
 assert.ok(begin>0&&end>begin,'header owner exists');
 const owner=s.slice(begin,end);
 assert.ok(owner.includes("const headerWhatsApp=contacts.find('.header__socials a').first()"));
 assert.ok(owner.includes('headerWhatsApp.html(icons.whatsapp)'));
 assert.ok(s.includes("[company.whatsapp,'WhatsApp',icons.whatsapp]"),
   'same accepted WhatsApp SVG remains canonical in Footer');
 assert.ok(!owner.includes('icons.zalo'),'do not change other Header controls');
});
