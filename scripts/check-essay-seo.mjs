// After building Astro, ensure browser-tab and social titles match the visible
// essay H1. Curated SEO focus retains descriptions, not competing titles.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { essaySeoFocus } from '../src/data/essaySeo.js';

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
 const candidate=path.join(builtRoot,slug,'index.html');
 if(!existsSync(candidate)){skipped.push(slug);continue;}
 const html=readFileSync(candidate,'utf8');
 const h1=decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'').trim();
 const pageTitle=getTag(html,'title');
 const og=getMeta(html,'property','og:title');
 const twitter=getMeta(html,'name','twitter:title');
 const description=getMeta(html,'name','description');
 const ogDescription=getMeta(html,'property','og:description');
 const canonicalTag=(html.match(/<link\b[^>]*>/g)||[]).find(tag=>/\brel="canonical"/.test(tag))||'';
 const canonical=decode(canonicalTag.match(/\bhref="([^"]+)"/)?.[1]||'');
 assert.ok(h1,`Missing essay H1: ${slug}`);
 assert.ok(description.length>=10 && description.length<=250,`Unusable search description: ${slug} (${description.length} chars)`);
 assert.equal(ogDescription,description,`Mismatched og:description: ${slug}`);
 assert.ok(canonical.endsWith('/book/'+slug+'/'),`Incorrect canonical essay path: ${slug}: ${canonical}`);
 assert.equal(sameSpacing(pageTitle),sameSpacing(`${h1}｜SETOUCHI ATLAS`),`Browser title differs from article H1: ${slug}`);
 assert.equal(sameSpacing(og),sameSpacing(pageTitle),`Mismatched og:title: ${slug}`);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`Expected exactly one H1: ${slug}`);
 assert.ok(sameSpacing(twitter).startsWith(sameSpacing(h1)),`Mismatched twitter:title: ${slug}: ${twitter}`);
 const jsonLd=html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(jsonLd,`Missing JSON-LD: ${slug}`);
 const schema=JSON.parse(jsonLd);
 assert.ok(sameSpacing(schema.headline).startsWith(sameSpacing(h1)),`Outdated JSON-LD headline: ${slug}: ${schema.headline}`);
 checked++;
}
assert.ok(checked>=30,`Unexpectedly few published Markdown essays checked: ${checked}`);
// Curated SEO metadata also covers legacy JS-authored essays without a Markdown file.
let curatedChecked=0;
for(const [slug, focus] of Object.entries(essaySeoFocus)){
 const file=path.join(builtRoot,slug,'index.html');
 assert.ok(existsSync(file),`Curated SEO article is missing from published build: ${slug}`);
 const html=readFileSync(file,'utf8');
 const actualTitle=getTag(html,'title');
 const actualDescription=getMeta(html,'name','description');
 const canonicalTag=(html.match(/<link\b[^>]*>/g)||[]).find(tag=>/\brel="canonical"/.test(tag))||'';
 const canonical=decode(canonicalTag.match(/\bhref="([^"]+)"/)?.[1]||'');
 const actualHeading=decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'').trim();
 assert.ok(actualHeading,`Missing article H1: ${slug}`);
 assert.equal(sameSpacing(actualTitle),sameSpacing(actualHeading+'｜SETOUCHI ATLAS'),`Browser title differs from article H1: ${slug}`);
 assert.equal(sameSpacing(actualDescription),sameSpacing(focus.description),`Wrong SEO description for ${slug}`);
 assert.ok(canonical.endsWith('/book/'+slug+'/'),`Wrong canonical for curated essay ${slug}`);
 curatedChecked++;
}

console.log(`Essay SEO titles verified: ${checked} Markdown built pages and ${curatedChecked} curated essay pages. Unpublished Markdown files skipped: ${skipped.length}.`);
