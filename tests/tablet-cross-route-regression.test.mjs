import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceComponentCss as css} from '../bioa-source-components.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const own=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test('Shared pages and Home use the same source component stylesheet',async()=>{
 const s=await read('bioa-home-refine.mjs');
 assert.ok(s.includes("import { sourceComponentCss } from './bioa-source-components.mjs'"));
 const shell=own(s,'const sharedShellCss =','export function applySharedShell($,route,lang){');
 const homepage=own(s,'export function applyHomeRefinement($,route,lang){',"  localizeHomeCtas($,lang);");
 assert.ok(shell.includes('+sourceComponentCss'));
 assert.ok(homepage.includes('+sourceComponentCss'));
 assert.ok(s.includes('refineFooterNavigation($,lang)'));
 assert.ok(s.includes('addFooterCompanyInfo($)'));
});
