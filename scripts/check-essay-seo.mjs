// After building Astro, ensure Google-facing metadata follows the visible
// current essay heading. Prevents stale hand-maintained SEO titles from returning.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const essayRoot=path.resolve('src/content/essays');
const builtRoot=path.resolve('dist/book');
const decode=(text)=>String(text||'')
 .replace(/&quot;/g,'"').replace(/&#39;|&#x27;/gi,"'")
 .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')
 .replace(/&#(\d+);/g,(_,num)=>String.fromCodePoint(Number(num)));
const getTag=(html,tag)=>decode(html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]||'').trim();
const getMeta=(html,kind,key)=>{
 const tag=(html.match(/<meta\b[^>]*>/g)||[]).find(value=>value.includes(kind+'="'+key+'"'));
 return decode(tag?.match(/\bcontent="([^"]*)"/)?.[1]||'');
};
const sameSpacing=(value)=>String(value || '').replace(/[\s\u3000]+/g,' ').trim();
let checked=0;
const skipped=[];
for(const file of readdirSync(essayRoot).filter(f=>f.endsWith('.md'))){
 const slug=file.slice(0,-3);
 // Standalone Astro pages use independent page templates; this test covers
 // the generic Markdown-driven essay route only.
 const directAstro=path.resolve('src/pages/book',slug+'.astro');
 const directIndex=path.resolve('src/pages/book',slug,'index.astro');
 if(existsSync(directAstro)||existsSync(directIndex)){skipped.push(slug);continue;}
 const candidate=path.join(builtRoot,slug,'index.html');
 if(!existsSync(candidate)){skipped.push(slug);continue;}
 const html=readFileSync(candidate,'utf8');
 const h1=decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'').trim();
 const pageTitle=getTag(html,'title');
 const og=getMeta(html,'property','og:title');
 const twitter=getMeta(html,'name','twitter:title');
 assert.ok(h1,`Missing essay H1: ${slug}`);
 assert.equal(sameSpacing(pageTitle),sameSpacing(`${h1}｜SETOUCHI ATLAS`),`Stale <title>: ${slug}`);
 assert.equal(sameSpacing(og),sameSpacing(pageTitle),`Mismatched og:title: ${slug}`);
 assert.ok(sameSpacing(twitter).startsWith(sameSpacing(h1)),`Mismatched twitter:title: ${slug}: ${twitter}`);
 const jsonLd=html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(jsonLd,`Missing JSON-LD: ${slug}`);
 const schema=JSON.parse(jsonLd);
 assert.ok(sameSpacing(schema.headline).startsWith(sameSpacing(h1)),`Outdated JSON-LD headline: ${slug}: ${schema.headline}`);
 checked++;
}
assert.ok(checked>=30,`Unexpectedly few published Markdown essays checked: ${checked}`);
console.log(`Essay SEO titles verified: ${checked} built pages. Unpublished Markdown files skipped: ${skipped.length}.`);
