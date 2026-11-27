// Shared public Article metadata, derived from the same data as the visible essay.
// Do not infer a byline from the publisher or dates from the build clock.
const clean = value => typeof value === 'string' ? value.trim() : '';
const unique = values => [...new Set((values || []).map(clean).filter(Boolean))];
const httpUrl = value => {
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : undefined; }
  catch { return undefined; }
};
export function editorialDate(value) {
  const text = clean(value);
  if (!text) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || !Number.isFinite(Date.parse(text)) ||
      new Date(text).toISOString().slice(0,10) !== text)
    throw new Error('Invalid editorial date: ' + text);
  return text;
}
export function essayDates(article) {
  const datePublished = editorialDate(article.datePublished);
  const dateModified = editorialDate(article.dateModified);
  if (datePublished && dateModified && dateModified < datePublished)
    throw new Error('Modified date precedes publication: ' + article.slug);
  return { datePublished, dateModified };
}
export function articleMetadata({article, regions, naturalTags, cultureTags, sources}) {
  return {
    ...essayDates(article),
    regions: unique(regions),
    tags: unique([...(naturalTags || []), ...(cultureTags || [])]),
    // Only references visible on the page are passed by the caller.
    citations: (sources || []).flatMap(source => {
      const url = httpUrl(source?.url);
      const name = clean(source?.title || source?.label);
      return url && name ? [{'@type':'CreativeWork', name, url}] : [];
    }).filter((item,i,all)=>all.findIndex(other=>other.url===item.url)===i)
  };
}
export function enrichArticleSchema(base, meta, site, siteRoot, canonicalUrl) {
  if (!meta) return base;
  const publisher = {
    '@type':'Organization',
    '@id':siteRoot + '#publisher',
    name:site.name,
    url:siteRoot
  };
  return {
    ...base,
    '@type':'Article',
    '@id':canonicalUrl + '#article',
    mainEntityOfPage:{'@type':'WebPage','@id':canonicalUrl},
    publisher,
    spatialCoverage:meta.regions.length ? meta.regions.map(name=>({'@type':'Place',name})) : undefined,
    keywords:meta.tags.length ? meta.tags : undefined,
    citation:meta.citations.length ? meta.citations : undefined,
    datePublished:meta.datePublished,
    dateModified:meta.dateModified
  };
}
