// Make frontmatter the preferred source for editorial labels once an essay is
// available as Markdown. Legacy JS remains the fallback for articles not yet migrated.
// This does not change routes, section layouts, citations or photo references.
const modules = import.meta.glob('../content/essays/*.md', { eager: true });
const frontmatterBySlug = Object.fromEntries(
  Object.entries(modules).map(([file, mod]) => [
    file.split('/').pop().replace(/\.md$/, ''),
    mod.frontmatter || {}
  ])
);
const editableFields = ['title', 'subtitle', 'lead', 'part', 'cities', 'keywords'];

export function withMarkdownMetadata(article) {
  if (!article?.slug) return article;
  const fm = frontmatterBySlug[article.slug];
  if (!fm) return article;
  const patch = Object.fromEntries(
    editableFields.filter((key) => Object.hasOwn(fm, key)).map((key) => [key, fm[key]])
  );
  return { ...article, ...patch };
}
