// Ensure the living research notebook is a complete and grounded writing aid.
import assert from 'node:assert/strict';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import path from 'node:path';
import {notebookEntries,notebookArchiveGroups,notebookPrinciples,notebookUpdated} from '../src/data/researchWritingNotebook.js';
import {researchChapters} from '../src/data/researchChapters.js';
import {transportResearchChapters} from '../src/data/transportResearchChapters.js';

const root=path.resolve('dist');
const built=(type,slug)=>existsSync(path.join(root,type,slug,'index.html'));
assert.equal(notebookPrinciples.length,4,'Keep only the four cross-topic editorial research principles');
assert.ok(notebookEntries.length>=8,'Living notebook needs substantial seeded landscape inquiries');
assert.match(notebookUpdated,/^\d{4}-\d{2}-\d{2}$/,'Missing notebook update date');
assert.equal(new Set(notebookEntries.map(item=>item.id)).size,notebookEntries.length,'Duplicate notebook topic ids');

for(const note of notebookEntries){
  assert.ok(note.title?.length>5 && note.finding?.length>40 && note.use?.length>10,'Notebook finding is too thin: '+note.id);
  assert.ok(note.next?.length>=1,'No open questions for '+note.id);
  assert.ok(note.essays?.length>=1 && note.research?.length>=1,'No evidence/backlinks for '+note.id);
  for(const [label,slug] of note.essays){
    assert.ok(label && built('book',slug),'Unpublished essay referenced by '+note.id+': '+slug);
  }
  for(const [label,slug] of note.research){
    assert.ok(label && built('chapters',slug),'Missing research note referenced by '+note.id+': '+slug);
  }
  for(const [label,url] of note.sources||[]){
    assert.ok(label && /^https:\/\//.test(url),'Invalid first-party source link in '+note.id);
  }
}

const groupSlugs=notebookArchiveGroups.flatMap(group=>group.items.map(pair=>pair[1]));
assert.equal(new Set(groupSlugs).size,groupSlugs.length,'Research archive contains duplicate links');
for(const slug of groupSlugs) assert.ok(built('chapters',slug),'Research archive points to a missing route: '+slug);
// Include every published static, nested, and data-generated research chapter.
// These indexes must not silently drop older specialist or source notes.
const directRoot=path.resolve('src/pages/chapters');
const direct=readdirSync(directRoot,{withFileTypes:true})
  .filter(ent=>ent.isFile() && ent.name.endsWith('.astro') && ent.name!=='index.astro' && ent.name!=='[slug].astro')
  .map(ent=>ent.name.slice(0,-6));
const nested=readdirSync(directRoot,{withFileTypes:true})
  .filter(ent=>ent.isDirectory() && existsSync(path.join(directRoot,ent.name,'index.astro')))
  .map(ent=>ent.name);
const all=[...direct,...nested,...researchChapters.map(ch=>ch.slug),...transportResearchChapters.map(ch=>ch.slug)];
const unique=[...new Set(all)].sort();
assert.deepEqual([...groupSlugs].sort(),unique,'Research/archive inventory must cover all real chapter routes exactly once');
const page=readFileSync(path.join(root,'chapters/index.html'),'utf8');
assert.ok(page.includes('次のエッセイへつながる知見'),'Research page lost the living knowledge shelf');
assert.ok(page.includes('次に確かめたいこと'),'Research page needs unresolved questions');
assert.ok(page.includes('専門的なモデルは適用できる分野でだけ使い'),'Specialist models must not be presented as universal theory');
assert.ok(!page.includes('22地域を比較'),'Do not overstate the number of published regional comparisons');
console.log('Research notebook PASS: '+notebookEntries.length+' evidence-linked topics, '+notebookPrinciples.length+' principles, '+groupSlugs.length+' classified reference routes');
