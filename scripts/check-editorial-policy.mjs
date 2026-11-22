// Check the canonical three-layer editorial policy and links without building Astro.
// Keep a single source of truth for philosophy, writing, and operating procedures.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const files={
  principles:'EDITORIAL_PRINCIPLES.md',
  writing:'EDITORIAL_WRITING_GUIDE.md',
  operations:'editorial/INTERNAL_EDITORIAL_POLICY.md',
  legacy:'EDITORIAL_INFERENCE_STYLE.md',
  readme:'README.md',
  kii:'KII_EDITORIAL_GUIDE.md'
};
const docs=Object.fromEntries(Object.entries(files).map(([key,file])=>[key,readFileSync(path.join(root,file),'utf8')]));
for(const [key,title] of [
  ['principles','第1層'],
  ['writing','第2層'],
  ['operations','第3層']
]) assert.ok(docs[key].includes(title),'Missing canonical editorial layer label: '+files[key]);

assert.ok(docs.principles.includes('風景から始める') && docs.principles.includes('多様性'),'Principles must retain the site editorial mission');
assert.ok(docs.writing.includes('根拠の強さ') && docs.writing.includes('文章'),'Writing guide must cover inference and essay construction');
assert.ok(docs.operations.includes('researchWritingNotebook.js') && docs.operations.includes('notebookUpdated'),'Living research notebook operating guidance missing');
assert.ok(docs.operations.includes('公開後'),'Post-deployment verification guidance missing');
assert.ok(!docs.principles.includes('4〜5節で1枚'),'Photo-count defaults must not be principles');
assert.ok(!docs.principles.includes('色付き強調は原則3箇所'),'Styling limits must not be principles');
assert.ok(!docs.legacy.includes('## 推定の強さ'),'Inference rules should have one authoritative home');
assert.ok(docs.legacy.includes('EDITORIAL_WRITING_GUIDE.md'),'Legacy writing reference must point to current guide');
for(const name of ['principles','writing','operations']){
 assert.ok(docs.readme.includes(files[name]),'README does not link to editorial layer: '+name);
}
assert.ok(docs.kii.includes('EDITORIAL_WRITING_GUIDE.md'),'KII supplemental document must link to shared writing principles');

for(const [key,content] of Object.entries(docs)){
 const base=path.dirname(path.join(root,files[key]));
 for(const match of content.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)){
  const link=match[1].split('#')[0];
  if(/^(?:https?:\/\/)/.test(link))continue;
  const target=path.resolve(base,link);
  assert.ok(existsSync(target),'Broken editorial markdown link: '+files[key]+' -> '+link);
 }
}
console.log('Editorial policy PASS: 3 canonical layers, shared inference rules, all document links and KII reference');
