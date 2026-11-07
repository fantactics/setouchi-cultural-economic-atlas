#!/usr/bin/env node
// Fail CI if a Pages CMS visual editor would silently strip embedded HTML.
// This is intentionally read-only: it never rewrites essay text or photo metadata.
import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const folder='src/content/essays';
const cms=readFileSync('.pages.yml','utf8');
const visualEntries=[...cms.matchAll(/^\s*path:\s*src\/content\/essays\/([^\n]+\.md)\s*$/gm)].map(m=>m[1].trim());
const allEssaysVisual = /^\s*- name:\s*essays\s*$/m.test(cms) && /^\s*type:\s*rich-text\s*$/m.test(cms);
const files=readdirSync(folder).filter(f=>f.endsWith('.md')).sort();
const results=[];
let failed=false;

for(const file of files){
  const source=readFileSync(join(folder,file),'utf8');
  const frontmatter=source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if(!frontmatter){console.error('Missing YAML frontmatter:',file);failed=true;continue;}
  const body=source.slice(frontmatter[0].length);
  const comments=[...body.matchAll(/<!--[\s\S]*?-->/g)];
  const legacy=[...body.matchAll(/<sup class="book-footnotes">([\s\S]*?)<\/sup>/g)];
  const otherHTML=body.replace(/<sup class="book-footnotes">[\s\S]*?<\/sup>/g,'')
    .replace(/<!--[\s\S]*?-->/g,'').match(/<\/?[a-z][^>]*>/gi)||[];
  const markdownAnchors=[...body.matchAll(/\[(\d+)\]\(#source-(\d+)\)/g)];
  const invalidMarkdown=markdownAnchors.filter(m=>m[1]!==m[2]);
  const invalidHTML=legacy.filter(m=>{
    const refs=[...m[1].matchAll(/<a href="#source-(\d+)">\[(\d+)\]<\/a>/g)];
    return !refs.length || refs.map(r=>r[0]).join('')!==m[1] || refs.some(r=>r[1]!==r[2]);
  });
  const visual=allEssaysVisual || visualEntries.includes(file);
  const issues=[];
  if(visual&&comments.length)issues.push('hidden HTML comments in visual editor');
  if(visual&&legacy.length)issues.push('legacy HTML footnotes in visual editor');
  if(visual&&otherHTML.length)issues.push('other HTML in visual editor');
  if(invalidMarkdown.length||invalidHTML.length)issues.push('malformed citation link(s)');
  if(source.includes('視覚編集テスト'))issues.push('leftover test text');
  const slug=basename(file,'.md');
  const fmSlug=frontmatter[1].match(/^slug:\s*["']?([a-z0-9-]+)/m)?.[1];
  if(fmSlug!==slug)issues.push('frontmatter slug differs from filename');
  results.push({slug,visual,comments:comments.length,legacy:legacy.length,markdown:markdownAnchors.length,issues});
  if(issues.length){failed=true;console.error('CMS SAFETY:',slug,issues.join('; '));}
}

const visual=results.filter(r=>r.visual);
if(!allEssaysVisual || visual.length!==files.length){
  console.error('CMS SAFETY: expected the entire essays collection to use visual editor, audited',visual.length,'of',files.length);
  failed=true;
}
const legacy=results.filter(r=>r.legacy);
const photoComments=results.filter(r=>r.comments);
console.log('CMS essay audit:',JSON.stringify({
  total:files.length,visualEditors:visual.length,collectionVisual:allEssaysVisual,legacyCitationEssays:legacy.length,
  hiddenPhotoCommentEssays:photoComments.length,
  visualSlugs:visual.map(r=>r.slug),failed:results.filter(r=>r.issues.length).length
},null,2));
if(visualEntries.some(f=>!files.includes(f))){
  console.error('Pages CMS targets missing Markdown file');failed=true;
}
if(failed)process.exitCode=1;
