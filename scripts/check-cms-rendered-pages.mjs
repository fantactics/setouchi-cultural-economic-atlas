#!/usr/bin/env node
// Compare critical essay features against Astro's generated HTML, not just Markdown source.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const slugs=[
  'setouchi-sushi-not-nigiri', // rich inline citations and separate source list
  'four-salt-fields', // five photo placement markers, converted to metadata
  'faith-as-transport-map', // repeated photo IDs across sections
  'sanuki-store-the-rain', // historical essay with hero photo
  'chichibugahama-sky-in-tide' // own travel photography
];
let failures=0;
for(const slug of slugs){
 const source=readFileSync(join('src/content/essays',slug+'.md'),'utf8');
 const split=source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
 if(!split){console.error('No frontmatter',slug);failures++;continue;}
 const body=source.slice(split[0].length);
 const refs=[...body.matchAll(/\[(\d+)\]\(#source-(\d+)\)/g)].map(m=>m[2]);
 const target=join('dist/book',slug,'index.html');
 if(!existsSync(target)){console.error('Missing generated essay',target);failures++;continue;}
 const html=readFileSync(target,'utf8');
 const missing=[...new Set(refs)].filter(id=>!html.includes('id="source-'+id+'"'));
 const actualRefs=(html.match(/href="#source-\d+"/g)||[]).length;
 // Output may include other contexts; require at least those from the essay.
 const imageCount=(html.match(/<img\b/g)||[]).length;
 const hasCanonical=html.includes('rel="canonical"') || html.includes('rel="canonical"');
 const errors=[];
 if(missing.length)errors.push('missing citation targets: '+missing.join(','));
 if(actualRefs<refs.length)errors.push('rendered source references '+actualRefs+' < '+refs.length);
 if(imageCount===0)errors.push('no images rendered');
 if(!hasCanonical)errors.push('canonical link absent');
 if(!html.includes('<h1'))errors.push('article title absent');
 console.log(slug,JSON.stringify({sourceRefs:refs.length,renderedRefs:actualRefs,images:imageCount,missingTargets:missing,errors}));
 if(errors.length)failures++;
}
if(failures)process.exitCode=1;
