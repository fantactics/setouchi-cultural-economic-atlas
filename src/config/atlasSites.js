// Shared configuration for regional ATLAS publications.
// Production URL roots remain explicit to preserve existing SETOUCHI links.
export const atlasSites = {
  setouchi: {
    id: 'setouchi',
    name: 'SETOUCHI ATLAS',
    tagline: 'ランドスケープ ＝ ネイチャー ｘ カルチャー',
    description: '港町の路地、島の食卓、海辺の工場をめぐる瀬戸内のエッセイ集。',
    basePath: '/setouchi-cultural-economic-atlas/',
    theme: 'sea',
    navigation: [
      { label: 'トップ', path: '' },
      { label: '一覧', path: 'book/' },
      { label: '地名から', path: 'places/' },
      { label: '自然条件から', path: 'book/nature/' },
      { label: '文化・風習から', path: 'book/culture/' }
    ],
    footer: [
      { label: 'このサイトについて', path: 'about/' },
      { label: '調査と研究ノート', path: 'chapters/' }
    ]
  },
  kii: {
    id: 'kii',
    name: 'KII ATLAS',
    tagline: 'ランドスケープ = ネイチャー x カルチャー',
    description: '山、川、森、海。紀伊半島の風景から自然と文化のつながりをたどるエッセイ。',
    // Internal shared-build path; the standalone KII bundle rewrites this to its own domain.
    basePath: '/setouchi-cultural-economic-atlas/kii/',
    theme: 'forest',
    indexable: true, // Canonical production domain: kii-atlas.pia2.org.
    navigation: [
      { label: 'トップ', path: '' },
      { label: '一覧', path: 'book/' },
      { label: '地名から', path: 'regions/' },
      { label: '自然条件から', path: 'nature/' },
      { label: '文化・営みから', path: 'culture/' }
    ],
    footer: [
      { label: 'トップ', path: '' },
      { label: 'エッセイ一覧', path: 'book/' },
      { label: '地名から', path: 'regions/' },
      { label: '自然条件から', path: 'nature/' },
      { label: '文化・営みから', path: 'culture/' },
      { label: 'このサイトについて', path: 'about/' }
    ]
  }
};
export function atlasHref(site, path = '') {
  return path.startsWith('#') ? site.basePath + path : site.basePath + path;
}
