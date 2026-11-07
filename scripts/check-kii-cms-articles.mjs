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
  const fields={};
  for(const line of match[1].split(/\r?\n/)){
    const m=line.match(/^([a-zA-Z]\w*):\s*(.+)$/);
    if(!m) throw Error('Invalid KII YAML line: '+slug+': '+line);
    // Initial migration uses JSON-compatible YAML scalar/array syntax.
    try{fields[m[1]]=JSON.parse(m[2]);}
    catch{throw Error('Unsafe KII initial frontmatter encoding in '+slug);}
  }
  if(fields.slug!==slug) throw Error('KII slug mismatch: '+slug);
  for(const key of ['title','teaser','region','category','imageUrl','alt','photoCredit']){
    if(typeof fields[key]!=='string'||!fields[key].trim()) throw Error('Missing KII '+key+': '+slug);
  }
  if(fields.imageUrl!==original.imageUrl||fields.alt!==original.alt||fields.photoCredit!==original.photoCredit){
    throw Error('KII photo attribution changed unintentionally: '+slug);
  }
  if(!Array.isArray(fields.tags)||fields.tags.some(x=>!vocabulary.has(x))) throw Error('KII natural tags invalid: '+slug);
  if(!Array.isArray(fields.sources)||fields.sources.some(x=>!x.label||!/^https:\/\//.test(x.url||''))) throw Error('KII sources invalid: '+slug);
  const body=text.slice(match[0].length).trim();
  if(!body.startsWith('## ')||!body.includes('\n\n')||body.includes('<!--')||body.includes('視覚編集テスト'))
    throw Error('KII body unsafe or empty: '+slug);
  if((body.match(/^## /gm)||[]).length<1) throw Error('Missing KII section headings: '+slug);
}
console.log('KII Pages CMS validation: '+files.length+' editable articles, photos and source metadata retained.');
