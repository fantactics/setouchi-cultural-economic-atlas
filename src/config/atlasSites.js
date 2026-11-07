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
      { label: '自然条件から', path: 'book/nature/' }
    ],
    footer: [
      { label: 'このサイトについて', path: 'about/' },
      { label: '地域別', path: 'places/' },
      { label: 'エッセイ', path: 'book/' },
      { label: '研究ノート', path: 'chapters/' },
      { label: '編集・調査の方法', path: 'methodology/' }
    ]
  },
  kii: {
    id: 'kii',
    name: 'KII ATLAS',
    tagline: '風景の理由をたどる、紀伊半島の旅。',
    description: '山、川、森、海。紀伊半島の風景から自然と文化のつながりをたどるエッセイ。',
    // First-stage preview within the existing GitHub Pages deployment.
    // A dedicated public origin can be introduced later without moving article data.
    basePath: '/setouchi-cultural-economic-atlas/kii/',
    theme: 'forest',
    indexable: false, // Keep the empty KII prototype out of search indexes until editorial launch.
    navigation: [{ label: 'トップ', path: '' }, { label: 'エッセイ', path: '#essays' }, { label: 'このサイトについて', path: '#about-kii' }],
    footer: [{ label: 'トップ', path: '' }, { label: 'このサイトについて', path: '#about-kii' }]
  }
};
export function atlasHref(site, path = '') {
  return path.startsWith('#') ? site.basePath + path : site.basePath + path;
}
