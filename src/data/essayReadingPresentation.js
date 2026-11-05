// Editorial rhythm: quiet, purposeful visual breaks — not a photo after every heading.
// Only phrases chosen by the editor are emphasized. Never automatically bold all keywords.
const curatedEmphasis = {
  'takehara-salt-capital-to-townscape': {
    1: '入浜式塩田',
    2: '賀茂川の瀬替え',
    3: '商人の資本'
  },
  'niihama-after-copper': {
    0: '海底の熱水活動',
    2: '二酸化硫黄',
    3: '過燐酸石灰'
  }
};

// The photograph must illuminate the section it follows, not merely decorate the page.
const curatedPhotoStops = {
  'takehara-salt-capital-to-townscape': [
    {after:1, photoId:'photo-takehara-view'}
  ],
  'niihama-after-copper': [
    {after:1, photoId:'photo-niihama-main-port'},
    {after:3, photoId:'photo-niihama-sumitomo-chemical'}
  ]
};

const reusableLicense = (photo) => /^(CC\s*(BY|0)|CC0|Public Domain|Public domain)/i.test(photo?.license || '');

const qualifiedPhoto = (photo, seen) =>
  photo?.imageUrl && photo?.sourcePage && photo?.author && photo?.license &&
  reusableLicense(photo) && !seen.has(photo.imageUrl);

export function essayEmphasisForSection(article, index) {
  // At most three deliberate highlights per essay; no highlight if no editorial choice.
  const terms = article?.editorialEmphasis || curatedEmphasis[article?.slug] || {};
  const indexes = Object.keys(terms).map(Number).filter(Number.isFinite).sort((a,b)=>a-b).slice(0,3);
  return indexes.includes(index) ? terms[index] : null;
}

export function essayEmphasisRuns(text, phrase) {
  if (!phrase || typeof text !== 'string') return [{text:text || '', emph:false}];
  const at = text.indexOf(phrase);
  if (at<0) return [{text,emph:false}];
  return [
    {text:text.slice(0,at),emph:false},
    {text:phrase,emph:true},
    {text:text.slice(at+phrase.length),emph:false}
  ].filter((part)=>part.text);
}

export function selectEssayInlinePhotos(article, photoById, hero) {
  const sections=article?.sections || [];
  const n=sections.length;
  if (n<4) return {};
  const chosen={};
  const seen=new Set([hero?.imageUrl,article?.heroPhoto?.imageUrl].filter(Boolean));
  const max=n>=6?2:1;

  const stops=curatedPhotoStops[article?.slug];
  if (stops) {
    for (const {after,photoId} of stops.slice(0,max)) {
      const photo=photoById[photoId];
      if (after>0 && after<n-1 && qualifiedPhoto(photo,seen)) {
        chosen[after]=photo;
        seen.add(photo.imageUrl);
      }
    }
    return chosen;
  }

  // Generic fallback, used only for essays with already-sourced section photographs.
  // Limit the number of photographs, exclude the hero and duplicates, and never invent an image.
  const targets = max===1 ? [Math.floor((n-1)/2)] : [Math.floor(n/3),Math.floor(2*n/3)];
  for (const target of targets) {
    const eligible=Array.from({length:n-2},(_,i)=>i+1)
      .filter((index)=>!chosen[index] && Object.keys(chosen).every((used)=>Math.abs(Number(used)-index)>=2))
      .sort((a,b)=>Math.abs(a-target)-Math.abs(b-target));
    // Keep the image close to the section it describes rather than moving it arbitrarily.
    for (const after of eligible.filter((index)=>Math.abs(index-target)<=1)) {
      const photo=(sections[after].photoIds||[]).map((id)=>photoById[id])
        .find((item)=>qualifiedPhoto(item,seen));
      if (!photo) continue;
      chosen[after]=photo;
      seen.add(photo.imageUrl);
      break;
    }
  }
  return chosen;
}
