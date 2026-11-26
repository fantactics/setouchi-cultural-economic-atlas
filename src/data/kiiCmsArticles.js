// KII ATLAS uses its own Markdown collection, independent of SETOUCHI ATLAS.
// The JS catalogue remains as a compatibility fallback for metadata and routing.
import { kiiArticles as legacyKiiArticles } from './kiiArticles.js';

const modules = import.meta.glob('../content/kii-essays/*.md', { eager: true });
export const kiiMarkdownBySlug = Object.fromEntries(
  Object.values(modules).map((entry) => [entry.frontmatter.slug, entry])
);

const allKiiArticles = legacyKiiArticles.map((article) => {
  const markdown = kiiMarkdownBySlug[article.slug];
  if (!markdown) throw Error('KII Markdown not found: ' + article.slug);
  return {
    ...article, ...markdown.frontmatter, slug: article.slug,
    tags: (markdown.frontmatter.tags || article.tags || []).slice(0, 3),
    cultureTags: (markdown.frontmatter.cultureTags || []).slice(0, 3)
  };
});

if (Object.keys(kiiMarkdownBySlug).length !== legacyKiiArticles.length) {
  throw Error('KII CMS article count disagrees with KII article catalogue');
}

// Drafts remain editable in Pages CMS but never enter public routes or discovery.
export const kiiArticles = allKiiArticles.filter(article => article.draft !== true);
