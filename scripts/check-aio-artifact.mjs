// Validate the actual independently packaged deployment artifacts, not preview URLs.
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {articleMetadata, essayDates} from '../src/data/articleMetadata.js';

assert.deepEqual(essayDates({}),{datePublished:undefined,dateModified:undefined});
assert.throws(()=>essayDates({datePublished:'2026-02-30'}));
assert.throws(()=>essayDates({datePublished:'2026-11-20',dateModified:'2026-11-19'}));
assert.equal(articleMetadata({article:{},regions:['灘','灘'],naturalTags:['断層'],cultureTags:['醸造'],sources:[{url:'https://example.org/a',title:'資料'},{url:'javascript:bad',title:'bad'}]}).citations.length,1);

const targets={
  setouchi:{root:'dist',origin:'https://setouchi-atlas.pia2.org',name:'SETOUCHI ATLAS',minimum:30},
  kii:{root:'dist-kii',origin:process.env.KII_PUBLIC_ORIGIN?.replace(/\/$/,'') || 'https://kii-atlas.pia2.org',name:'KII ATLAS',minimum:3}
};
const read=(root,file)=>readFileSync(path.join(root,file),'utf8');
const attr=(tag,key)=>tag?.match(new RegExp('\\b'+key+'="([^"]*)"'))?.[1]||'';
const links=html=>html.match(/<link\b[^>]*>/g)||[];
const canonical=html=>attr(links(html).find(tag=>attr(tag,'rel')==='canonical'),'href');
const meta=(html,key,kind='name')=>attr((html.match(/<meta\b[^>]*>/g)||[]).find(tag=>attr(tag,kind)===key),'content');
const locs=xml=>[...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>m[1].trim());
for(const key of process.argv.slice(2).length?process.argv.slice(2):Object.keys(targets)){
  const {root,origin,name,minimum}=targets[key];
  const robots=read(root,'robots.txt');
  assert.match(robots,/User-agent:\s*\*\s*\nAllow:\s*\//i);
  assert.ok(robots.includes('Sitemap: '+origin+'/sitemap.xml'), key+' wrong robots sitemap');
  const home=read(root,'index.html');
  assert.equal(new URL(canonical(home)).href,origin+'/');
  const index=read(root,'sitemap.xml');
  const pageUrls=index.includes('<sitemapindex')?locs(index).flatMap(url=>{
    assert.ok(url.startsWith(origin+'/'));
    return locs(read(root,new URL(url).pathname.slice(1)));
  }):locs(index);
  assert.ok(pageUrls.length>=minimum && pageUrls.every(url=>url.startsWith(origin+'/')),key+' wrong sitemap origin');
  let count=0;
  for(const dir of readdirSync(path.join(root,'book'),{withFileTypes:true})){
    if(!dir.isDirectory())continue;
    const file=path.join('book',dir.name,'index.html');
    if(!existsSync(path.join(root,file)))continue;
    const html=read(root,file);
    const json=html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
    if(!json || meta(html,'robots').includes('noindex'))continue;
    const schema=JSON.parse(json);
    if(schema['@type']!=='Article')continue;
    // Exclude non-essay navigation routes (the shared layout historically classifies them as Article).
    if(!html.includes('class="book-article"') && !html.includes('class="atlas-shared-essay"'))continue;
    const url=origin+'/book/'+dir.name+'/';
    assert.equal(canonical(html),url);
    assert.equal(meta(html,'og:url','property'),url);
    assert.equal(schema.url,url);
    assert.equal(schema['@id'],url+'#article');
    assert.equal(schema.mainEntityOfPage['@id'],url);
    assert.equal(schema.publisher.name,name);
    assert.equal(schema.publisher['@id'],origin+'/#publisher');
    assert.equal(schema.inLanguage,'ja');
    assert.ok(schema.headline && schema.description);
    assert.ok(!JSON.stringify(schema).includes('https://fantactics.github.io/setouchi-cultural-economic-atlas/'));
    if(schema.citation)assert.ok(schema.citation.every(c=>c.name && /^https?:\/\//.test(c.url)));
    for(const field of ['datePublished','dateModified'])if(schema[field])assert.ok(html.includes('datetime="'+schema[field]+'"'),url+' missing visible date');
    count++;
  }
  assert.ok(count>=minimum,key+' insufficient Article metadata: '+count);
  console.log(name+' AIO checks passed: '+count+' Article pages, '+pageUrls.length+' sitemap URLs, robots and canonical/OG/JSON-LD alignment.');
}
