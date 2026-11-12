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
const getMeta=(html,property)=>decode(html.match(new RegExp(`<meta\\s+property="${property}"\\s+content="([^"]*)"`))?.[1]||'');
let checked=0;
const skipped=[];
for(const file of readdirSync(essayRoot).filter(f=>f.endsWith('.md'))){
 const slug=file.slice(0,-3);
 const candidate=path.join(builtRoot,slug,'index.html');
 if(!existsSync(candidate)){skipped.push(slug);continue;}
 const html=readFileSync(candidate,'utf8');
 const h1=decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'').trim();
 const pageTitle=getTag(html,'title');
 const og=getMeta(html,'og:title');
 const twitter=decode(html.match(/<meta\\s+name="twitter:title"\\s+content="([^"]*)"/)?.[1]||'');
 assert.ok(h1,`Missing essay H1: ${slug}`);
 assert.equal(pageTitle,`${h1}｜SETOUCHI ATLAS`,`Stale <title>: ${slug}`);
 assert.equal(og,pageTitle,`Mismatched og:title: ${slug}`);
 assert.equal(twitter,h1,`Mismatched twitter:title: ${slug}`);
 const jsonLd=html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(jsonLd,`Missing JSON-LD: ${slug}`);
 const schema=JSON.parse(jsonLd);
 assert.equal(schema.headline,h1,`Outdated JSON-LD headline: ${slug}`);
 checked++;
}
assert.ok(checked>=30,`Unexpectedly few published Markdown essays checked: ${checked}`);
console.log(`Essay SEO titles verified: ${checked} built pages. Unpublished Markdown files skipped: ${skipped.length}.`);
