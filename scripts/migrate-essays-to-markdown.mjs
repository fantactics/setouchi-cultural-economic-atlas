import fs from 'node:fs';
import path from 'node:path';
import { publishedEssays } from '../src/data/publishedEssayList.js';

const root=process.cwd();
const outDir=path.join(root,'src','content','essays');
fs.mkdirSync(outDir,{recursive:true});

const preserveExisting=new Set([
  'setouchi-sushi-not-nigiri',
  'setouchi-ship-materials',
  'shimotsui-hijiki-peperoncino'
]);

const yamlValue=(value)=>JSON.stringify(value);
const frontmatterFor=(article)=>{
  const lines=['---'];
  for(const [key,value] of Object.entries(article)){
    if(key==='sections' || value===undefined || typeof value==='function') continue;
    lines.push(`${key}: ${yamlValue(value)}`);
  }
  lines.push(`migration: ${yamlValue({status:'generated-copy',publicUrl:`/book/${article.slug}/`})}`);
  lines.push('---','');
  return lines.join('\n');
};

const refsHtml=(refs=[])=>refs.length
  ? `<sup class="book-footnotes">${refs.map((ref)=>`<a href="#source-${ref}">[${ref}]</a>`).join('')}</sup>`
  : '';

const bodyFor=(article)=>{
  const out=[];
  for(const section of article.sections||[]){
    out.push(`## ${section.heading}`,'');
    const sectionMeta=Object.fromEntries(Object.entries(section).filter(([key])=>!['heading','paragraphs','photoIds'].includes(key)));
    if(Object.keys(sectionMeta).length) out.push(`<!-- section-meta: ${JSON.stringify(sectionMeta)} -->`,'');
    for(const paragraph of section.paragraphs||[]){
      out.push(`${paragraph.text}${refsHtml(paragraph.refs)}`,'');
    }
    if(section.photoIds?.length) out.push(`<!-- photoIds: ${section.photoIds.join(', ')} -->`,'');
  }
  return out.join('\n').trim()+'\n';
};

const manifest=[];
let created=0;
let preserved=0;
for(const article of publishedEssays){
  if(!article?.slug) continue;
  const file=path.join(outDir,`${article.slug}.md`);
  if(fs.existsSync(file) && preserveExisting.has(article.slug)){
    preserved++;
  }else{
    fs.writeFileSync(file,frontmatterFor(article)+bodyFor(article),'utf8');
    created++;
  }
  manifest.push({
    slug:article.slug,
    title:article.title,
    path:`src/content/essays/${article.slug}.md`,
    publicUrl:`/book/${article.slug}/`
  });
}
manifest.sort((a,b)=>a.slug.localeCompare(b.slug));
fs.writeFileSync(path.join(outDir,'MIGRATION_MANIFEST.json'),JSON.stringify({
  generatedAt:'repository migration',
  articleCount:manifest.length,
  preservedPilotFiles:[...preserveExisting],
  articles:manifest
},null,2)+'\n','utf8');

console.log(`Markdown migration: ${manifest.length} essays; ${created} written; ${preserved} pilot files preserved.`);
