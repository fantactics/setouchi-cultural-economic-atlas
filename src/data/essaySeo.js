// The published essay title is the single source of truth for Google title links.
// Markdown frontmatter takes precedence on essay detail pages and on discovery pages.
// Do not keep separate hard-coded SEO headlines: they become stale after revisions.
const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const firstSentence = (value) => {
  const text=normalize(value);
  return text.match(/^[^。！？!?]+[。！？!?]/u)?.[0] || text;
};

const finishSentence = (value) => {
  const text=normalize(value).replace(/[。！？!?]+$/u, '');
  return text ? `${text}。` : '';
};

export const essaySearchMeta = (article) => {
  const title=normalize(article?.title) || '地域エッセイ';
  const subtitle=normalize(article?.subtitle);
  const lead=firstSentence(article?.lead);

  // Use the currently published editorial heading, not a cached alternative.
  const seoTitle=`${title}｜SETOUCHI ATLAS`;

  // A short description remains accurate as the Markdown subtitle/lead evolves.
  const first=finishSentence(subtitle || title);
  const description=lead && lead !== first && first.length+lead.length<=170
    ? first+lead
    : first;

  return { title:seoTitle, description };
};
