import { kiiArticles } from '../src/data/kiiArticles.js';
import { kiiNaturalTagVocabulary } from '../src/data/kiiNaturalTags.js';

const slugs = new Set();
const tags = new Set(kiiNaturalTagVocabulary);
for (const article of kiiArticles) {
  if (!article || typeof article !== 'object') throw Error('Invalid KII article record');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug || '')) throw Error(`Invalid slug: ${article.slug}`);
  if (slugs.has(article.slug)) throw Error(`Duplicate KII slug: ${article.slug}`);
  slugs.add(article.slug);
  for (const field of ['title','teaser','region']) {
    if (typeof article[field] !== 'string' || !article[field].trim()) throw Error(`${article.slug}: missing ${field}`);
  }
  if (!Array.isArray(article.sections) || !article.sections.length) throw Error(`${article.slug}: article needs reviewed sections`);
  for (const section of article.sections) {
    if (!Array.isArray(section.paragraphs) || !section.paragraphs.length || section.paragraphs.some(p=>typeof p !== 'string' || !p.trim())) {
      throw Error(`${article.slug}: invalid section paragraphs`);
    }
  }
  if (article.tags && (!Array.isArray(article.tags) || article.tags.some(tag=>!tags.has(tag)))) throw Error(`${article.slug}: unregistered natural tag`);
  if (article.imageUrl && (!article.alt || !article.photoCredit)) throw Error(`${article.slug}: photo requires alt text and credit`);
  if (article.sources && (!Array.isArray(article.sources) || article.sources.some(s=>!s.label || !/^https:\/\//.test(s.url || '')))) {
    throw Error(`${article.slug}: invalid source reference`);
  }
}
console.log(`KII editorial collection validated: ${kiiArticles.length} published essays.`);
