#!/usr/bin/env node
// Ensure every public KII route renders the CMS body and keeps photo/SEO metadata.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const slugs=readdirSync('src/content/kii-essays').filter(x=>x.endsWith('.md')).map(x=>x.slice(0,-3));
let fails=0;
let published=0;
let drafts=0;
for(const slug of slugs){
 const source=readFileSync(join('src/content/kii-essays',slug+'.md'),'utf8');
 const front=source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
 if(!front){console.error(slug+': no frontmatter');fails++;continue;}
 const body=source.slice(front[0].length);
 const headings=[...body.matchAll(/^##\s+(.+)$/gm)].map(x=>x[1]);
 const page=join('dist','kii','book',slug,'index.html');
 const standalone=join('dist-kii','book',slug,'index.html');
 if(/^draft:\s*true\s*$/m.test(front[0])){
   drafts++;
   const surfaces=['index.html','book/index.html','regions/index.html','nature/index.html','culture/index.html','sitemap.xml'];
   if(existsSync(page)||existsSync(standalone)||surfaces.some(path=>readFileSync(join('dist-kii',path),'utf8').includes('/book/'+slug+'/'))){
     console.error(slug+': draft leaked into public routes or discovery');fails++;
   }
   continue;
 }
 published++;
 if(!existsSync(page)||!existsSync(standalone)){console.error(slug+': missing route');fails++;continue;}
 const html=readFileSync(page,'utf8');
 const separate=readFileSync(standalone,'utf8');
 const renderedHeadings=(html.match(/<h2\b/g)||[]).length;
 const renderedParagraphs=(html.match(/<p\b/g)||[]).length;
 const errs=[];
 if(renderedHeadings<headings.length) errs.push('missing Markdown headings');
 if(renderedParagraphs<3) errs.push('missing body paragraphs');
 if(!html.includes('<h1')||!html.includes('<img')) errs.push('missing title or photo');
 if(!html.includes('rel="canonical"')) errs.push('canonical absent');
 if(!html.includes('index,follow')) errs.push('KII indexing metadata absent');
 if(!separate.includes('index,follow')) errs.push('KII standalone indexing metadata absent');
 if(!separate.includes('href="/"')) errs.push('standalone navigation broken');
 if(errs.length){console.error(slug,errs.join(', '));fails++;}
}
console.log('KII CMS rendered route checks: '+published+' public essays, '+drafts+' drafts, '+fails+' failures.');
if(fails)process.exitCode=1;
