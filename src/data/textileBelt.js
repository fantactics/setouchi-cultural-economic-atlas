export const textileZones = [
  {
    id:'kojima-kurashiki',
    name:'児島・倉敷',
    prefecture:'岡山県',
    lat:34.462,lon:133.806,
    precision:'district',
    relatedPlaceId:'shimotsui',
    scope:'児島・下津井・倉敷地域',
    origin:'干拓地の綿作と内海物流',
    historic:'真田紐・小倉織・足袋・近代紡績',
    modern:'学生服・作業服・ジーンズ・染色加工',
    coreSkill:'織布＋縫製＋染色・加工',
    mechanism:['land_resource','logistics','skill_adaptation','brand_adaptation'],
    chain:['干拓地・綿作','北前船・下津井港の肥料／木綿物流','織物・足袋','1881 下村紡績','学生服・作業服','1965 国産ジーンズ','加工・地域ブランド'],
    evidence:[
      {label:'倉敷市「一輪の綿花から始まる倉敷物語」',url:'https://www.city.kurashiki.okayama.jp/culture/tourism/1002215/1013347/1002267.html'},
      {label:'倉敷市 日本遺産デザインマンホール',url:'https://www.city.kurashiki.okayama.jp/culture/tourism/1002215/1002246.html'}
    ],
    note:'港湾物流だけで現在のデニム産地を説明するのではなく、干拓・綿作・織布・縫製・染色・需要転換を複合要因として扱う。'
  },
  {
    id:'imabari',
    name:'今治',
    prefecture:'愛媛県',
    lat:34.066,lon:132.998,
    precision:'city',
    relatedPlaceId:'imabari',
    scope:'今治市',
    origin:'白木綿産地と蒼社川の軟水',
    historic:'綿織物・染晒・縫製',
    modern:'タオル・染色整理・縫製品',
    coreSkill:'先染・染晒＋織布＋品質管理',
    mechanism:['water_process','skill_adaptation','brand_adaptation'],
    chain:['綿業地','蒼社川の軟水','1894 タオル製造開始','染晒・プリント','設備近代化','今治タオル・品質ブランド'],
    evidence:[
      {label:'今治市「今治の地場産業」',url:'https://www.city.imabari.ehime.jp/sangyou/jibasan/'},
      {label:'今治市「今治の特産品」',url:'https://www.city.imabari.ehime.jp/kanko/etc/tokusanhin.html'}
    ],
    note:'海事都市のイメージが強いが、綿業・水質・染色加工という別系統の産業遺伝子を持つ。'
  },
  {
    id:'higashikagawa',
    name:'東かがわ',
    prefecture:'香川県',
    lat:34.247,lon:134.358,
    precision:'city',
    relatedPlaceId:'hiketa',
    scope:'東かがわ市（引田を含む市域）',
    origin:'明治期の手袋製造技能',
    historic:'縫製・皮革加工',
    modern:'ファッション・防寒・スポーツ手袋、革製品',
    coreSkill:'縫製＋立体加工＋多品種対応',
    mechanism:['skill_specialization','product_diversification','brand_adaptation'],
    chain:['1888 手袋製造開始','縫製技能蓄積','地域企業集積','スポーツ・高機能化','革製品等へ応用','国内手袋生産約90%'],
    evidence:[
      {label:'東かがわ市「東かがわ市と手袋について」',url:'https://www.higashikagawa.jp/soshikikarasagasu/senryaku/gyomuannai/EXPO2025/6350.html'},
      {label:'東かがわ市「てぶくろの生産日本一」',url:'https://www.higashikagawa.jp/kosodate_kyoiku/kyoikuiinkai/furusatokyouzai/1/7176.html'}
    ],
    note:'引田港の歴史と手袋産業は同一市域にあるが、直接の港湾起源を断定しない。技能集積として独立に扱う。'
  },
  {
    id:'bingo-fukuyama',
    name:'福山・備後',
    prefecture:'広島県',
    lat:34.554,lon:133.272,
    precision:'regional',
    relatedPlaceId:'tomonoura',
    scope:'福山市北部・新市／芦田を中心とする備後繊維産地',
    origin:'綿作・備後絣・藍染',
    historic:'備後絣・織布・染色',
    modern:'デニム・紡績・染色・織布・加工・縫製・洗い',
    coreSkill:'藍染＋厚地織布＋分業型フルプロセス',
    mechanism:['resource','skill_adaptation','cluster_specialization','regional_brand_network'],
    chain:['江戸期 綿作','江戸後期 備後絣','藍染・厚地織布','分業集積','デニムへ転換','全国生産約8割','備中備後広域ブランド'],
    evidence:[
      {label:'福山市「備後絣」',url:'https://www.city.fukuyama.hiroshima.jp/site/miryoku2023/288041.html'},
      {label:'福山市「デニム」',url:'https://www.city.fukuyama.hiroshima.jp/site/miryoku2023/287847.html'},
      {label:'福山市「備中備後ジャパンデニムプロジェクト」',url:'https://www.city.fukuyama.hiroshima.jp/soshiki/sangyou/101173.html'}
    ],
    note:'鞆の浦と同じ福山市だが、備後絣・デニムの主産地は新市・芦田など北部。鞆の港町形成との直接系譜は置かない。'
  }
];

export const textileMechanisms = {
  land_resource:{label:'土地・原料',description:'干拓・綿作など原料生産と土地利用'},
  logistics:{label:'港湾物流',description:'肥料・原料・製品を外部市場へつなぐ物流'},
  water_process:{label:'水質・染晒',description:'水質条件が染色・晒し工程の品質を支える'},
  resource:{label:'原料・素材',description:'綿など素材利用を産業の起点とする'},
  skill_specialization:{label:'技能特化',description:'特定製品の縫製・加工技能を深掘りする'},
  skill_adaptation:{label:'技能適応',description:'既存技能を新製品へ転用する'},
  cluster_specialization:{label:'工程集積',description:'複数工程が地域内に分業集積する'},
  product_diversification:{label:'製品多角化',description:'技能を周辺製品へ展開する'},
  brand_adaptation:{label:'ブランド化',description:'品質・産地名を市場価値へ変換する'},
  regional_brand_network:{label:'広域連携',description:'隣接産地が広域ブランドとして連携する'}
};

export const textileRelations = [
  {
    from:'kojima-kurashiki',to:'bingo-fukuyama',type:'regional_brand_network',
    label:'備中備後ジャパンデニム',
    description:'歴史的に一本の企業系譜という意味ではなく、現在の広域産地ブランドとして連携。'
  }
];
