// Editorial rhythm: quiet, purposeful visual breaks — not a photo after every heading.
// Only phrases chosen by the editor are emphasized. Never automatically bold all keywords.
const curatedEmphasis = {
  'kojima-from-cotton-to-jeans': {
    1: '由加山',
    3: 'キャントンミルズ'
  },
  'takehara-salt-capital-to-townscape': {
    1: '入浜式塩田',
    2: '賀茂川の瀬替え',
    3: '商人の資本'
  },
  'niihama-after-copper': {
    0: '海底の熱水活動',
    2: '二酸化硫黄',
    3: '過燐酸石灰'
  },
  'shimonoseki-resource-made-by-market': {
    1: '砂礫',
    3: '袋競り',
    4: '活かし込み'
  },
  'gangi-tide-port-functions': {
    2: '折れ目',
    3: '一般の人',
    4: '海側へ位置を変えていった'
  },
  'jinori-okinori-navigation-system': {
    1: '芸州灘の地乗り',
    2: '伊予路沖乗り',
    3: '木綿帆'
  }
};


// A single editorially chosen term per additional essay. No automatic tag-highlighting.
const curatedSingleEmphasis = {
  'four-salt-fields': '製塩工場',
  'kojima-from-cotton-to-jeans': '干拓',
  'ports-that-needed-waiting': '雁木',
  'imabari-why-shipbuilding': '波止浜湾',
  'shodoshima-open-island': '佃煮',
  'shodoshima-somen-to-sesame-oil': '小麦',
  'faith-as-transport-map': '千砂子波止',
  'sanuki-store-the-rain': 'ため池',
  'iwakuni-river-city': '錦川',
  'onomichi-capital-to-culture-and-ships': '尾道水道',
  'mitarai-economy-of-waiting': '風待ち',
  'shimonoseki-resource-made-by-market': '砂礫底',
  'yanai-trade-profit-to-whitewalls': '柳井川',
  'mihara-castle-to-multimodal-city': '海城',
  'matsuyama-three-centers-one-city': '砂嘴',
  'hiketa-castle-port-town': '岬',
  'ako-after-salt-fields': '入浜式塩田',
  'takamatsu-sea-castle-to-gateway': '三角州',
  'tai-meshi-two-seas': '黒潮',
  'shimotsui-tako-meshi': 'タコ',
  'oysters-taste-of-small-seas': '筏',
  'hijiki-tidal-time': 'ひじき',
  'mikan-slope-and-varieties': '段畑',
  'oyster-shells-after-the-meal': '牡蠣殻',
  'sea-bream-scales-to-collagen': 'ウロコ',
  'fish-waste-to-feed-and-citrus': '魚のアラ',
  'olive-pomace-to-cattle': '搾りかす',
  'soy-sauce-lees-to-chomeiso': '長命草',
  'ibuki-fat-sardines-revalued': 'いりこ',
  'kinkai-salt-field-to-solar': '錦海塩田',
  'sakaide-salt-fields-to-industry': '番の州',
  'ako-salt-fields-to-city': '塩田',
  'farmland-or-solar': '営農型太陽光',
  'after-the-solar-farm': '排水ポンプ',
  'tadano-shido-industrial-ecosystem': 'クレーン',
  'miura-matsuyama-small-boiler-revolution': '小型貫流ボイラ',
  'sawara-spring-two-gates': '産卵',
  'kada-sea-bream-one-line': '一本釣り',
  'kitan-strait-tai-to-shirasu': '紀淡海峡',
  'kada-sea-bream-distribution-ecosystem': '生簀',
  'kada-steel-data-center-transition': '鉄鉱石',
  'gangi-tide-port-functions': '雁木',
  'jinori-okinori-navigation-system': '地乗り',
  'kojima-jeans-circular-economy': 'リベット',
  'kojima-island-infrastructure-per-capita': '給水',
  'kojima-island-cycling-without-consumption': '日帰り客',
  'kojima-island-bubble-villas-second-life': '別荘',
  'what-cyclists-leave-behind': 'しまなみ海道',
  'tomo-two-act-tidal-port': '潮待ち',
  'shimotsui-hijiki-peperoncino': 'ひじき',
  'setouchi-sushi-not-nigiri': '押し抜きずし',
  'setouchi-shrimp-middle-layer': 'えびこぎ',
  'setouchi-itinerant-trade-boats': '長屋門',
  'setouchi-ship-materials': '飫肥杉',
  'ai-era-regional-planning-learning-velocity': 'マスタープラン',
  'niboshi-shirasu-two-food-cultures': 'カタクチイワシ',
  'citrus-pomace-cascade': '搾汁粕',
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
  if(indexes.length) return indexes.includes(index) ? terms[index] : null;

  const phrase = curatedSingleEmphasis[article?.slug];
  if(!phrase) return null;
  // Only the first relevant section receives the highlight; never paint every mention.
  const first = (article?.sections || []).findIndex((section)=>
    (section.paragraphs || []).some((paragraph)=>paragraph.text?.includes(phrase)));
  return first===index ? phrase : null;
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
