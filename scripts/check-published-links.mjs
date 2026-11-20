// Validate public editorial routes and curated entry links before deployment.
// Unlike link checks that only inspect frontmatter, this checks actual built HTML.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { storyOrder } from '../src/data/bookArticles.js';

const dist=path.resolve('dist');
const legacy='/setouchi-cultural-economic-atlas/';
const collection='collections/salt-afterlife';
const collectionEssays=[
  'ako-after-salt-fields',
  'iwagi-salt-pans-to-shrimp-ponds',
  'takehara-salt-capital-to-townscape',
  'sakaide-salt-fields-to-industry',
  'kinkai-salt-field-to-solar'
];
const requiredSlugs=[...new Set([...storyOrder,...collectionEssays,'four-salt-fields'])];
assert.equal(new Set(storyOrder).size,storyOrder.length,'Duplicate slug in published storyOrder');

const built=(pathname)=>path.join(dist,pathname,'index.html');
const assertPage=(pathname)=>{
  const file=built(pathname);
  assert.ok(existsSync(file),`Published page missing: /${pathname}/ (check storyOrder/getStaticPaths)`);
  return readFileSync(file,'utf8');
};
for(const slug of requiredSlugs) assertPage('book/'+slug);

const collectionHtml=assertPage(collection);
const sitemap=readFileSync(path.join(dist,'sitemap-0.xml'),'utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>m[1]);
for(const pathname of [collection,...collectionEssays.map(slug=>'book/'+slug),'book/four-salt-fields']){
  assert.ok(sitemapUrls.some(url=>url.includes('/'+pathname+'/')),`Missing sitemap entry: /${pathname}/`);
}

const important=[
  'index.html',
  'book/index.html',
  collection+'/index.html',
  ...collectionEssays.map(slug=>'book/'+slug+'/index.html'),
  'book/four-salt-fields/index.html'
];
const missing=new Map();
let checked=0;
for(const relative of important){
  const html=readFileSync(path.join(dist,relative),'utf8');
  for(const match of html.matchAll(/\bhref=(["'])(.*?)\1/g)){
    const raw=match[2].replaceAll('&amp;','&').trim();
    if(!raw || raw.startsWith('#') || raw.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(raw)) continue;
    let target=raw.split(/[?#]/,1)[0];
    if(target.startsWith(legacy)) target=target.slice(legacy.length);
    else if(target.startsWith('/')) target=target.slice(1);
    else continue; // same-page and relative anchors do not define article routes
    if(!target.startsWith('book/')&&!target.startsWith('collections/'))continue;
    const normalized=target.replace(/\/+$/,'');
    if(!normalized || !normalized.includes('/')) continue;
    checked++;
    if(!existsSync(built(normalized))){
      const list=missing.get(normalized)||[];
      list.push(relative);
      missing.set(normalized,list);
    }
  }
}
assert.equal(missing.size,0,'Broken editorial links: '+JSON.stringify(Object.fromEntries(missing)));
assert.ok(collectionHtml.includes('五つの土地、五つの問い'), 'The salt collection comparison is missing');
assert.ok(collectionHtml.includes('坂出の番の州は、旧塩田ではなく沖合の海を埋め立てて造られた土地'), 'Sakaide geographical caveat is missing');
console.log(`Published route checks passed: ${requiredSlugs.length} required essays, ${checked} editorial links, collection and sitemap.`);
