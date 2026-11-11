// Search-result presentation for published essays.
// The visible, editorial H1 is always article.title; SEO titles do not overwrite it.
// Manual, article-specific headlines avoid keyword-stuffed boilerplate.
// Add a headline here when publishing a new essay; the fallback still remains valid.
const searchHeadlines = {
  'naoshima-water-across-sea':'直島の水道はどこから？｜高梁川・玉野市の海底送水管と直島ダム',
  'chichibugahama-sky-in-tide':'父母ヶ浜の水鏡はなぜできる？｜干潮・遠浅の浜・夕日の条件',
  'tatsuno-water-castle-and-soy-sauce':'龍野の城下町と淡口醤油｜揖保川の軟水が育てた町並み',
  'tatara-bridge-citrus-seasons':'多々羅大橋と生口島のレモン谷｜大三島の柑橘品種・歴史・旬',
  'awaji-onion-rice-field':'淡路島の玉ねぎは田んぼで育つ｜紀の川・香川の水田裏作と玉ねぎ小屋',
  'four-salt-fields':'赤穂・竹原・坂出・三田尻｜塩田が残した4つの風景',
  'kojima-from-cotton-to-jeans':'児島ジーンズの歴史｜綿作・足袋・学生服からデニムへ',
  'ports-that-needed-waiting':'潮待ち港の歴史｜鞆の浦・御手洗・多度津・尾道',
  'imabari-why-shipbuilding':'今治の造船業はなぜ育った？ 来島海峡と波止浜の歴史',
  'niihama-after-copper':'新居浜・別子銅山から工業都市へ｜産業の変遷',
  'shodoshima-open-island':'小豆島の佃煮産業｜醤油蔵から生まれた島の仕事',
  'shodoshima-somen-to-sesame-oil':'小豆島の素麺とごま油｜小麦と製油産業の歴史',
  'faith-as-transport-map':'御手洗の住吉神社｜鴻池善右衛門と茶屋の女性たち',
  'sanuki-store-the-rain':'讃岐平野のため池と水争い｜線香で分けた農業用水',
  'iwakuni-river-city':'岩国・錦帯橋の歴史｜洪水と橋出米が生まれた理由',
  'onomichi-capital-to-culture-and-ships':'尾道の坂道と寺有地｜時宗・鉄道・斜面住宅の歴史',
  'takehara-salt-capital-to-townscape':'竹原の町並みと塩田｜白壁の町ができた理由',
  'mitarai-economy-of-waiting':'御手洗の町並みと潮待ち港｜大崎下島の歴史',
  'shimonoseki-resource-made-by-market':'下関のふぐはなぜ集まる？ 唐戸市場と南風泊の歴史',
  'yanai-trade-profit-to-whitewalls':'山口・柳井の白壁の町並み｜商人と川港の歴史',
  'mihara-castle-to-multimodal-city':'三原城と山陽鉄道｜城跡を駅が横切った理由',
  'matsuyama-three-centers-one-city':'松山・三津浜と高浜港｜汽船が港を移した理由',
  'hiketa-castle-port-town':'引田城山はかつて島だった｜港・石垣・醤油蔵と町の歴史',
  'ako-after-salt-fields':'赤穂の塩田と製塩業｜塩田を売っても塩をつくる理由',
  'takamatsu-sea-castle-to-gateway':'高松城はなぜ港から遠くなった？ 海城と埋立の歴史',
  'tai-meshi-two-seas':'鯛めしはなぜ2種類？ 今治・松山と宇和島の食文化',
  'shimotsui-tako-meshi':'下津井のタコとたこめし｜瀬戸大橋の港の食文化',
  'oysters-taste-of-small-seas':'日生と広島湾の牡蠣養殖｜筏と川と潮の関係',
  'hijiki-tidal-time':'周防大島・沖家室島のひじき｜冬の干潮と磯の仕事',
  'mikan-slope-and-varieties':'愛媛・西宇和のみかん段々畑｜石垣と三つの太陽',
  'oyster-shells-after-the-meal':'広島の牡蠣殻と折り鶴｜再生素材から生まれた壁',
  'fish-waste-to-feed-and-citrus':'愛媛・八幡浜の魚のアラ｜養殖魚とみかんの循環',
  'olive-pomace-to-cattle':'小豆島のオリーブ搾りかす｜オリーブ牛の飼料へ',
  'ibuki-fat-sardines-revalued':'伊吹島のいりことイワシ｜脂の多い魚の新しい価値',
  'citrus-pomace-cascade':'愛媛みかんの搾りかすと剪定枝｜果樹園の資源循環',
  'kinkai-salt-field-to-solar':'岡山・錦海塩田跡と太陽光発電｜干拓地の排水管理',
  'sakaide-salt-fields-to-industry':'坂出の塩田と番の州工業地帯｜埋立地の歴史',
  'after-the-solar-farm':'錦海太陽光発電所の2038年問題｜土地と排水の管理',
  'tadano-shido-industrial-ecosystem':'志度の海辺の巨大クレーン工場｜タダノと香川の産業景観',
  'miura-matsuyama-small-boiler-revolution':'三浦工業はなぜ松山に？ 小型ボイラ技術の歴史',
  'sawara-spring-two-gates':'瀬戸内海のサワラ｜春の回遊と日生の食文化',
  'what-cyclists-leave-behind':'しまなみ海道の橋へ自転車はなぜ登る？｜船の航路と橋の高さの秘密',
  'shimotsui-hijiki-peperoncino':'下津井のひじき養殖｜海藻とペペロンチーノ',
  'tomo-two-act-tidal-port':'鞆の浦の潮待ち｜潮汐がつくった港町の暮らし',
  'niboshi-shirasu-two-food-cultures':'しらすといりこの違い｜泉州・和歌浦・伊吹島の食文化',
  'setouchi-sushi-not-nigiri':'瀬戸内の郷土寿司｜ばら寿司・押し寿司・松山鮓',
  'setouchi-shrimp-middle-layer':'讃岐の小エビかき揚げ｜庵治の漁法と備讃瀬戸',
  'setouchi-itinerant-trade-boats':'瀬戸内の行商船と沖売り｜睦月島の商家と長屋門',
  'setouchi-ship-materials':'伊予灘の地引き網船と飫肥杉｜木造船の材料と流通',
  'ai-era-regional-planning-learning-velocity':'AI時代の地域計画｜学習し続ける地域経営とは',
  'kojima-jeans-circular-economy':'児島ジーンズの循環型ものづくり｜リベットと再生繊維',
  'kojima-island-infrastructure-per-capita':'島の飲用水はどこから来る？生活排水はどこへ流す？｜大多府島・鴻島・宮島',
  'kada-sea-bream-one-line':'和歌山・加太の鯛一本釣り｜友ヶ島の潮と漁師の技',
  'kitan-strait-tai-to-shirasu':'加太の真鯛と泉州のしらす｜紀淡海峡の漁法',
  'kada-sea-bream-distribution-ecosystem':'加太の真鯛はどう流通する？ 生簀・入札・仲買',
  'kada-steel-data-center-transition':'和歌山・加太の製鉄所とデータセンター｜立地の理由',
  'gangi-tide-port-functions':'瀬戸内の雁木とは？ 鞆・牛窓・三之瀬・御手洗の石段',
  'jinori-okinori-navigation-system':'瀬戸内の地乗り・沖乗り｜海の道と港の役割',
};

// The shrine page's existing, carefully written meta description is preserved.
const specialDescriptions = {
  'faith-as-transport-map':'広島県呉市・大崎下島の御手洗。千砂子波止のそばの住吉神社は、なぜ大阪の豪商・鴻池善右衛門の寄進で建てられたのか。茶屋の女性たちが残した名前から、潮待ち港の歴史をたどります。'
};

const normalize = (text)=>String(text||'').replace(/\s+/g,' ').trim();
const firstSentence = (text) => {
  const t=normalize(text);
  return t.match(/^[^。！？!?]+[。！？!?]/u)?.[0] || t;
};

export const essaySearchMeta=(article)=>{
  const title=normalize(article?.title);
  const cities=(article?.cities||[]).filter(Boolean);
  const city=cities.find((c)=>c!=='瀬戸内' && c!=='瀬戸内海') || cities[0] || '';
  const fallbackHeadline=city && !title.includes(city) ? `${city}｜${title}` : title;
  const headline=searchHeadlines[article?.slug] || fallbackHeadline;
  const seoTitle=article?.slug==='faith-as-transport-map'
    ? `${headline} - SETOUCHI ATLAS`
    : `${headline}｜SETOUCHI ATLAS`;

  if(specialDescriptions[article?.slug]) return {title:seoTitle,description:specialDescriptions[article.slug]};
  const subtitle=normalize(article?.subtitle).replace(/[。！？!?]+$/u,'');
  const lead=firstSentence(article?.lead);
  const intro=subtitle || title;
  const prefix=city && !intro.includes(city) && !title.includes(city) ? `${city}を舞台に、` : '';
  const base=`${prefix}${intro}。`;
  const description=lead && lead!==intro && base.length+lead.length<=170
    ? base+lead
    : base;
  return {title:seoTitle,description};
};

export const getEssaySeoHeadlines=()=>({...searchHeadlines});
