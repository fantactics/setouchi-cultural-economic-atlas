// Article map positions: explicit locations take precedence over a city-name fallback.
// This metadata is about today's geography, not a reconstruction of historical coastlines.
const essayMapOverrides = {
  'tatara-bridge-citrus-seasons': {
    query: 'レモン谷 多々羅大橋 生口島 広島県尾道市瀬戸田町',
    name: '生口島・レモン谷から大三島へ',
    zoom: 11,
    description: '生口島側のレモン谷から多々羅大橋を越え、大三島の柑橘畑へ。橋を境に県が変わることと、海を挟んだ果樹園のつながりを見てください。'
  },
  'awaji-onion-rice-field': {
    query: '兵庫県南あわじ市 三原平野',
    name: '淡路島・三原平野の玉ねぎ畑',
    zoom: 11,
    description: '淡路島南部の水田と玉ねぎ畑の広がりを眺めてください。記事では紀の川や香川とも比較します。'
  },
  'faith-as-transport-map': {
    query: '住吉神社 広島県呉市豊町御手洗',
    name: '大崎下島・御手洗の住吉神社と千砂子波止',
    zoom: 16,
    description: '広島県呉市・大崎下島の御手洗港です。住吉神社と千砂子波止、高燈籠の位置関係を見てください。同名の地名と区別するため、呉市豊町御手洗を指定しています。'
  },
  'kitan-strait-tai-to-shirasu': {
    query: '大阪湾南部',
    name: '友ヶ島から泉州・岸和田へ',
    zoom: 9,
    description: '加太・友ヶ島の海峡、岬町・阪南の漁港、岸和田地蔵浜の共同荷捌き場。大阪湾の南から北へ地図を動かし、しらすが運ばれる海と港を見比べてください。'
  },
  'kada-sea-bream-one-line': {
    query: '加太漁港 和歌山県和歌山市',
    name: '加太の漁港と友ヶ島の海峡',
    zoom: 11,
    description: '加太の港と友ヶ島、その間に広がる紀淡海峡を見比べてください。島が水路を分ける地形から、漁師が向き合う潮の道を思い浮かべられます。'
  },
  'gangi-tide-port-functions': {
    query: '瀬戸内海',
    name: '四つの港で、雁木の位置を比べる',
    zoom: 8,
    description: '鞆の浦・下蒲刈島三之瀬・牛窓・大崎下島御手洗。地図を動かして港の位置と島影を見比べてください。現在の地形を示す地図で、往時の雁木を復元したものではありません。'
  },
  'jinori-okinori-navigation-system': {
    query: '芸予諸島 広島県 愛媛県',
    name: '山陽沿岸と芸予諸島、二つの海の道',
    zoom: 9,
    description: '鞆の浦・尾道・三之瀬に近い北側の海と、弓削瀬戸・鼻栗瀬戸・御手洗へ続く島々の間を見比べてください。現在の航空写真であり、歴史的な航路を線で復元した地図ではありません。'
  },
  'tomo-two-act-tidal-port': {
    query: '鞆の浦 常夜燈 広島県福山市鞆町',
    name: '鞆港の石段と島影',
    zoom: 14,
    description: '常夜燈と雁木を起点に、港の前の仙酔島や半島の地形を確かめてください。潮が船を待たせた舞台が見えてきます。'
  },
  'niboshi-shirasu-two-food-cultures': {
    query: '瀬戸内海',
    name: '泉州・和歌浦から伊吹島へ',
    zoom: 8,
    description: '大阪湾南部の岬町と和歌浦、瀬戸内海を西へ進んだ燧灘の伊吹島。海岸と小島の位置を比べながら、しらすといりこの二つの旅をたどれます。'
  },
  'oyster-shells-after-the-meal': {
    query: 'マザーハウス シミントひろしま 広島市中区',
    name: '牡蠣の殻と折り鶴が出会った場所',
    zoom: 13,
    description: 'ひろしまゲートパークの店舗と平和記念公園、そして広島湾へ続く太田川の位置を見比べてください。広島の海と人々の願いが交わる場所です。'
  },
  'shimonoseki-resource-made-by-market': {
    query: '唐戸市場 山口県下関市',
    name: '関門海峡から彦島の南風泊へ',
    zoom: 12,
    description: '唐戸市場の前の関門海峡と、彦島西側の南風泊市場の位置関係を確認してください。ふぐ市場が移った理由を海岸線から眺められます。'
  },
  'kojima-jeans-circular-economy': {
    query: '児島ジーンズストリート 岡山県倉敷市児島味野',
    name: '児島ジーンズストリートと工場の町',
    zoom: 13,
    description: 'ジーンズが並ぶ町の通りと、周辺の繊維産業の広がりを見渡せます。服のポケットの小さな鋲から、町の工場へ思いを巡らせてください。'
  },
  'kojima-from-cotton-to-jeans': {
    query: '児島ジーンズストリート 岡山県倉敷市児島味野',
    name: '綿の土地からジーンズの町へ',
    zoom: 12,
    description: 'ジーンズストリートと旧野﨑家住宅、南の下津井港、由加山の位置関係を地図で確かめてみてください。現在の地形を示す地図で、干拓以前の海岸線ではありません。'
  },
  'takehara-salt-capital-to-townscape': {
    query: '広島県竹原市本町 竹原町並み保存地区',
    name: '竹原の町並み保存地区',
    zoom: 14,
    description: '白壁の町並みが残る旧市街地を起点に、賀茂川や瀬戸内海との位置関係を確かめられます。'
  },
  'ako-after-salt-fields': {
    query: '赤穂海浜公園 塩の国 兵庫県赤穂市',
    name: '塩田が残る景色と工場の海辺',
    zoom: 12,
    description: '「塩の国」の復元塩田を起点に、西浜の臨海工場地帯までを地図で見比べてください。現代の地図であり、1965年当時の塩田の境界を復元したものではありません。'
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
  // Some Japanese place names repeat across prefectures: resolve ambiguous names explicitly.
  const placeQueryByCity = { '御手洗': '広島県呉市豊町御手洗' };
  const query = override.query || placeQueryByCity[city] || `${city} 日本`;
  const name = override.name || `${city}の位置`;
  const zoom = override.zoom || (isWide ? 9 : 12);
  return {
    query,
    name,
    zoom,
    description: override.description || '記事の主な舞台を、今の地形や海岸線と重ねて確かめられます。複数の地域を扱う記事では代表的な場所を示しています。'
  };
}
