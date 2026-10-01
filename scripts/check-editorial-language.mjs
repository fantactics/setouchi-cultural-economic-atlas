import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const strict = process.argv.includes('--strict');

const cautionTerms = [
  { term: '地域課題', note: '課題と呼ぶ評価基準を明示するか、「変化した可能性と制約」へ分解する' },
  { term: '活性化', note: '何が増加・改善したのか具体的な観測値へ置き換える' },
  { term: '衰退', note: '人口・店舗・生産・利用頻度など、何が減ったのか具体化する' },
  { term: '成功', note: '成功基準と、同時に生じた損失・外部性を示す' },
  { term: '失敗', note: '失敗基準を明示し、価値判断と事実を分ける' },
  { term: '発展', note: '所得・雇用・人口・インフラ等、何の変化を指すか具体化する' },
  { term: '振興', note: '政策目的語として使う場合、誰のどの可能性を広げるのかを明示する' },
  { term: '守るべき', note: 'VALUE JUDGMENTとして明示し、誰にとって望ましいかを書く' },
  { term: '残すべき', note: 'VALUE JUDGMENTとして明示し、維持費・代替案とのトレードオフを書く' },
  { term: '有効活用', note: '何に対して有効か、評価軸を具体化する' },
  { term: '適正化', note: '適正の基準を明示する' },
  { term: '再生', note: '何をどの状態へ戻す／変えるのかを具体化する' },
  { term: '再編集', note: '処方箋として断定せず、選択肢・作業仮説として扱う' },
  { term: '維持すべき', note: 'VALUE JUDGMENTとして明示し、維持による利得と費用を示す' }
];

const extensions = new Set(['.astro', '.js', '.mjs', '.md']);
const ignored = new Set(['node_modules', 'dist', '.git']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return extensions.has(path.extname(entry.name)) ? [full] : [];
  });
}

const hits = [];
for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const item of cautionTerms) {
      if (line.includes(item.term)) {
        hits.push({
          file: path.relative(process.cwd(), file),
          line: index + 1,
          term: item.term,
          note: item.note,
          excerpt: line.trim().slice(0, 180)
        });
      }
    }
  });
}

if (!hits.length) {
  console.log('Editorial language check: no caution terms found.');
  process.exit(0);
}

console.log(`Editorial language check: ${hits.length} caution-term occurrence(s).`);
console.log('These are review prompts, not automatic errors.\n');

for (const hit of hits) {
  console.log(`${hit.file}:${hit.line}  [${hit.term}]`);
  console.log(`  ${hit.excerpt}`);
  console.log(`  Review: ${hit.note}\n`);
}

if (strict) {
  console.error('Strict mode: caution terms require editorial review.');
  process.exit(1);
}
