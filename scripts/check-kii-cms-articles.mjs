#!/usr/bin/env node
// Read-only checks for the KII ATLAS Pages CMS Markdown collection.
// Do not require body text to match the legacy JS copy: editorial edits are intentional.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { kiiArticles } from '../src/data/kiiArticles.js';
import { kiiNaturalTagVocabulary } from '../src/data/kiiNaturalTags.js';

const folder='src/content/kii-essays';
const files=readdirSync(folder).filter(name=>name.endsWith('.md')).sort();
const known=new Map(kiiArticles.map(article=>[article.slug,article]));
const vocabulary=new Set(kiiNaturalTagVocabulary);
const config=readFileSync('.pages.yml','utf8');
if(!config.includes('name: kii-essays') || !config.includes('path: src/content/kii-essays') ||
   !/name: kii-essays[\s\S]*?name: body\s*\n\s*label: [^\n]+\n\s*type: rich-text/.test(config)){
  throw Error('Pages CMS does not expose KII ATLAS Markdown as a rich-text collection');
}
if(files.length!==known.size) throw Error('KII CMS article count mismatch: '+files.length+' / '+known.size);
for(const name of files){
  const slug=name.slice(0,-3),original=known.get(slug);
  if(!original) throw Error('Unknown KII CMS slug: '+slug);
  const text=readFileSync(join(folder,name),'utf8');
  const match=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if(!match) throw Error('Missing KII YAML frontmatter: '+slug);
  // Pages CMS may normalize quoted JSON-style YAML into block-style YAML;
  // validate presence/identity, not the incidental formatting of lists.
  const fm=match[1];
  const keys=[...fm.matchAll(/^([a-zA-Z]\w*):/gm)].map(x=>x[1]);
  for(const key of ['slug','title','teaser','region','category','tags','imageUrl','alt','photoCredit','sources']){
    if(!keys.includes(key)) throw Error('Missing KII field '+key+': '+slug);
  }
  const readScalar=(key)=>{
    const line=fm.split(/\r?\n/).find(line=>line.startsWith(key+':'));
    return line?.slice(key.length+1).trim().replace(/^["']|["']$/g,'');
  };
  if(readScalar('slug')!==slug) throw Error('KII slug mismatch: '+slug);
  for(const key of ['title','teaser','region','category','imageUrl','alt','photoCredit']){
    if(!readScalar(key)) throw Error('Empty KII '+key+': '+slug);
  }
  for(const key of ['imageUrl','alt']){
    if(readScalar(key)!==original[key]) throw Error('KII photo asset changed unintentionally: '+slug);
  }
  // A self-authored first-person essay should not retain third-person
  // "original author" photo credits from the import pipeline. Keep the
  // source brand and factual date/prop details when modernizing the credit.
  const credit=readScalar('photoCredit');
  if(!credit.startsWith('写真：クアトロのジオ紀行')) {
    throw Error('KII original photography attribution missing: '+slug);
  }
  if(original.photoCredit.includes('2022年5月') && !credit.includes('2022年5月')) {
    throw Error('KII original photo date lost: '+slug);
  }
  if(original.photoCredit.includes('恐竜の模型') && !credit.includes('恐竜の模型')) {
    throw Error('KII original photo prop note lost: '+slug);
  }
  if(!fm.includes('https://')) throw Error('KII reference URLs missing: '+slug);
  const body=text.slice(match[0].length).trim();
  if(!body.startsWith('## ')||!body.includes('\n\n')||body.includes('<!--')||body.includes('視覚編集テスト'))
    throw Error('KII body unsafe or empty: '+slug);
  if((body.match(/^## /gm)||[]).length<1) throw Error('Missing KII section headings: '+slug);
  if(/原著者|撮影者による持ち込み|筆者の(?:現地|旅の)?記録|旅の記録には/.test(body)) {
    throw Error('KII self-authored firsthand observation written in third person: '+slug);
  }
}
console.log('KII Pages CMS validation: '+files.length+' editable articles, photos and source metadata retained.');
