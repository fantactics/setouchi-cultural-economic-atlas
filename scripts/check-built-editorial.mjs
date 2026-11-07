/**
 * Structural regression tests for representative SETOUCHI essays.
 * Editorial text is intentionally *not* asserted word for word: reviewed
 * titles and paragraphs change frequently during copyediting.
 * This verifies routes, rendered substantial text, source section, photos,
 * accessible image descriptions and absence of research-only endings.
 */
import { readFileSync, existsSync } from 'node:fs';

const slugs = [
  'mihara-castle-to-multimodal-city',
  'kojima-jeans-circular-economy',
  'setouchi-ship-materials',
  'niihama-after-copper',
  'shimonoseki-resource-made-by-market',
  'faith-as-transport-map',
  'sanuki-store-the-rain',
  'iwakuni-river-city',
  'mikan-slope-and-varieties',
  'four-salt-fields',
  'setouchi-sushi-not-nigiri'
];
const decode = (value) => value
  .replace(/&nbsp;/g,' ')
  .replace(/&amp;/g,'&')
  .replace(/&lt;/g,'<')
  .replace(/&gt;/g,'>')
  .replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi,(_,hex,dec)=>String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10)));

for (const slug of slugs) {
  const file = `dist/book/${slug}/index.html`;
  if (!existsSync(file)) throw Error(`${slug}: page not generated`);
  const html = readFileSync(file,'utf8');
  const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!title || !decode(title[1].replace(/<[^>]+>/g,'')).trim()) throw Error(`${slug}: missing essay h1`);
  // Require sufficient meaningful rendered prose, not merely metadata.
  const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m)=>decode(m[1].replace(/<[^>]*>/g,'').trim())).filter(Boolean);
  const japaneseCharacters = paragraphs.join('').match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || [];
  if (japaneseCharacters.length < 300) throw Error(`${slug}: rendered article body is suspiciously short`);
  if (!html.includes('出典・参照資料')) throw Error(`${slug}: missing references section`);
  if (/class="kicker">(?:暫定的なまとめ|まだ分からないこと)<\/div>/.test(html)) {
    throw Error(`${slug}: research-only ending exposed`);
  }
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m)=>m[0]);
  if (!images.length) throw Error(`${slug}: no rendered images`);
  if (images.some((img)=>!/\balt=/.test(img))) throw Error(`${slug}: image without alt`);
  console.log(`${slug}: rendered essay structure, body, citations and image accessibility OK`);
}
