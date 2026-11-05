// Article map positions: explicit locations take precedence over a city-name fallback.
// This metadata is about today's geography, not a reconstruction of historical coastlines.
const essayMapOverrides = {
  'takehara-salt-capital-to-townscape': {
    query: '広島県竹原市本町 竹原町並み保存地区',
    name: '竹原の町並み保存地区',
    zoom: 14,
    description: '白壁の町並みが残る旧市街地を起点に、賀茂川や瀬戸内海との位置関係を確かめられます。'
  },
  'four-salt-fields': {
    query: '瀬戸内海',
    name: '瀬戸内海の塩田の町々',
    zoom: 8,
    description: '赤穂・竹原・坂出・三田尻。瀬戸内海のどこに塩田が広がっていたか、地図を動かして見比べてください。'
  },
  'ports-that-needed-waiting': {
    query: '瀬戸内海',
    name: '潮待ち港のある瀬戸内海',
    zoom: 8,
    description: '鞆の浦・御手洗・多度津・尾道など、島と海峡に囲まれた港の位置を確かめられます。'
  },
  'setouchi-sushi-not-nigiri': {
    query: '瀬戸内海',
    name: '瀬戸内の寿司文化が育った地域',
    zoom: 8,
    description: '岡山・讃岐・広島・松山の位置関係を、瀬戸内海を中心に見渡してみてください。'
  },
  'setouchi-ship-materials': {
    query: 'ふたみシーサイド公園 愛媛県伊予市',
    name: '伊予灘の地引き網船が残る場所',
    zoom: 12,
    description: '伊予灘沿岸の漁村を地図で見ながら、遠く宮崎の杉が船の材料になった経路を思い浮かべてみてください。'
  },
  'setouchi-itinerant-trade-boats': {
    query: '睦月島 愛媛県松山市',
    name: '行商船が行き交った睦月島',
    zoom: 13,
    description: '松山沖の睦月島と周辺の島々。狭い耕地と広い航路の位置関係が見えてきます。'
  },
  'setouchi-shrimp-middle-layer': {
    query: '香川県高松市庵治町',
    name: '小エビの漁が行われる庵治',
    zoom: 12,
    description: '庵治の港と屋島、備讃瀬戸の海を見渡せます。'
  },
  'sanuki-store-the-rain': {
    query: '香川県高松市 讃岐平野',
    name: 'ため池の広がる讃岐平野',
    zoom: 11,
    description: '山地から短い川が流れ、平野にため池が点在する位置関係を確かめてください。'
  },
  'hijiki-tidal-time': {
    query: '沖家室島 山口県周防大島町',
    name: '潮の動きと暮らす沖家室島',
    zoom: 12
  },
  'kojima-island-infrastructure-per-capita': {
    query: '鴻島 岡山県備前市',
    name: '日生諸島の鴻島',
    zoom: 13
  },
  'kojima-island-cycling-without-consumption': {
    query: '鴻島 岡山県備前市',
    name: '日生諸島の鴻島',
    zoom: 13
  },
  'kojima-island-bubble-villas-second-life': {
    query: '鴻島 岡山県備前市',
    name: '日生諸島の鴻島',
    zoom: 13
  },
  'sawara-spring-two-gates': {
    query: '瀬戸内海',
    name: 'サワラが回遊する瀬戸内海',
    zoom: 8
  },
  'ai-era-regional-planning-learning-velocity': {
    query: '瀬戸内海',
    name: '地域を見渡すための瀬戸内海の地図',
    zoom: 8,
    description: 'この記事は特定の町の話ではありません。地図は地域の違いを考えるための広域図です。'
  },
  'farmland-or-solar': {
    query: '瀬戸内海',
    name: '瀬戸内の農地と土地利用',
    zoom: 8
  }
};

// These articles have a more detailed, hand-edited Google Map within their text.
const dedicatedMapSlugs = new Set([
  'takamatsu-sea-castle-to-gateway',
  'hiketa-castle-port-town',
  'matsuyama-three-centers-one-city',
  'yanai-trade-profit-to-whitewalls',
  'niihama-after-copper'
]);

export const essayHasDedicatedMap = (slug) => dedicatedMapSlugs.has(slug);

export function essayMapFor(article) {
  const override = essayMapOverrides[article?.slug] || {};
  const city = article?.cities?.find((name) => name && name !== '瀬戸内') || '瀬戸内海';
  const isWide = city === '瀬戸内海' || city === '瀬戸内' || /海$/.test(city);
  const query = override.query || `${city} 日本`;
  const name = override.name || `${city}の位置`;
  const zoom = override.zoom || (isWide ? 9 : 12);
  return {
    query,
    name,
    zoom,
    description: override.description || '記事の主な舞台を、今の地形や海岸線と重ねて確かめられます。複数の地域を扱う記事では代表的な場所を示しています。'
  };
}
