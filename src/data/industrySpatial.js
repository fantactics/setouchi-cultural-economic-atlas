export const industrySpatialCategories = {
  heritage:{label:'歴史産業・商業',description:'旧塩田、商家地区、歴史的産業拠点'},
  infrastructure:{label:'港・交通・造成地',description:'港湾、交通結節、臨海造成地'},
  headquarters:{label:'本社・金融',description:'地域中枢企業・金融本店'},
  factory:{label:'工場・製造',description:'地域構造を説明する主要製造拠点'},
  cluster:{label:'産業集積',description:'複数企業・技能が集中する地区'}
};

export const industryRelationTypes = {
  direct_continuity:{label:'直系・長期継続',description:'同一主体・技能・事業が長期に継続'},
  land_inheritance:{label:'土地継承',description:'旧産業用地・造成地が次の産業立地へ転換'},
  logistics_inheritance:{label:'物流継承',description:'港・航路・交通結節の機能が次世代産業へ継承'},
  skill_inheritance:{label:'技能継承',description:'地域技能・加工知識が次の製品・企業群へ蓄積'},
  capital_inheritance:{label:'資本・中枢機能',description:'商業・金融・本社機能の蓄積が都市中心性へ継承'},
  parallel_modern_layer:{label:'近代以降の新層',description:'歴史産業の直系ではなく、既存立地条件に新たに加わった産業'}
};

export const industrySpatialNodes = [
  {
    id:'matsuyama-mitsuhama',placeId:'matsuyama',name:'三津浜港',category:'infrastructure',
    lat:33.8610,lon:132.7140,precision:'approximate',
    era:'近世〜現代',note:'松山城下の海の玄関口。海運・商業と近代交通の接続点。',
    sourceUrl:'https://www.city.matsuyama.ehime.jp/shisei/keikaku/mitsukasseika/'
  },
  {
    id:'matsuyama-iyotetsu',placeId:'matsuyama',name:'伊予鉄グループ本社',category:'headquarters',
    lat:33.8353,lon:132.7623,precision:'address',
    era:'1887〜',note:'地域資本による私鉄から、鉄道・バス・観光・不動産へ展開する都市交通企業。',
    sourceUrl:'https://www.iyotetsu.co.jp/group/'
  },
  {
    id:'matsuyama-miura',placeId:'matsuyama',name:'三浦工業 松山本社',category:'headquarters',
    lat:33.9000,lon:132.7520,precision:'district',
    era:'1959〜',note:'ボイラ、水処理、舶用・環境機器へ展開する松山発の製造企業。',
    sourceUrl:'https://www.miuraz.co.jp/corporate/profile.html'
  },

  {
    id:'shimonoseki-port',placeId:'shimonoseki',name:'赤間関・唐戸港湾地区',category:'infrastructure',
    lat:33.9560,lon:130.9410,precision:'approximate',
    era:'近世〜現代',note:'全国航路が集中した赤間関から、関門港・市場・観光へ機能を更新。',
    sourceUrl:'https://www.city.shimonoseki.lg.jp/site/kisya/128320.html'
  },
  {
    id:'shimonoseki-ymfg',placeId:'shimonoseki',name:'山口フィナンシャルグループ本店',category:'headquarters',
    lat:33.9495,lon:130.9225,precision:'address',
    era:'現代',note:'下関に本店を置く広域金融グループ。港湾商業都市に残る中枢機能の現代表現。',
    sourceUrl:'https://www.ymfg.co.jp/about/profile/'
  },
  {
    id:'shimonoseki-hayashikane',placeId:'shimonoseki',name:'林兼産業 本社・下関工場',category:'factory',
    lat:33.9440,lon:130.9190,precision:'district',
    era:'1941〜',note:'水産・食品・飼料事業を展開する下関本拠の加工企業。',
    sourceUrl:'https://www.hayashikane.co.jp/company/office/'
  },

  {
    id:'yanai-shirakabe',placeId:'yanai',name:'古市・金屋 白壁の町並み',category:'heritage',
    lat:33.9630,lon:132.1017,precision:'district',
    era:'近世',note:'瀬戸内交易で形成された商人資本が商家・蔵として残る歴史地区。',
    sourceUrl:'https://www.city-yanai.jp/site/bunkazai/denkenchiku.html'
  },
  {
    id:'yanai-chemical',placeId:'yanai',name:'柳井化学工業 柳井本社工場',category:'factory',
    lat:33.9580,lon:132.1260,precision:'district',
    era:'1938〜',note:'医薬原料・農薬中間体・機能性化学品などを扱う受託化学製造拠点。',
    sourceUrl:'https://www.yanai.co.jp/plant/'
  },
  {
    id:'yanai-industrial',placeId:'yanai',name:'柳井駅東部・南浜産業地区',category:'cluster',
    lat:33.9610,lon:132.1150,precision:'approximate',
    era:'現代',note:'化学・材料などの製造投資が重なる、歴史商都に加わった新しい産業層。',
    sourceUrl:'https://www.city-yanai.jp/life/2/18/145/'
  },

  {
    id:'hofu-salt',placeId:'hofu',name:'三田尻塩田記念産業公園',category:'heritage',
    lat:34.01775,lon:131.55958,precision:'site',
    era:'近世〜1960年',note:'大規模製塩都市だった三田尻の技術・土地利用を伝える産業遺産。',
    sourceUrl:'https://www.city.hofu.yamaguchi.jp/soshiki/25/endenpark.html'
  },
  {
    id:'hofu-port',placeId:'hofu',name:'三田尻中関港',category:'infrastructure',
    lat:34.0300,lon:131.5500,precision:'approximate',
    era:'近世〜現代',note:'塩積出港から、現在の完成車・部材物流を支える港湾へ機能転換。',
    sourceUrl:'https://www.pref.yamaguchi.lg.jp/soshiki/130/24055.html'
  },
  {
    id:'hofu-mazda',placeId:'hofu',name:'マツダ 防府工場 西浦地区',category:'factory',
    lat:34.02090,lon:131.51572,precision:'site',
    era:'1982〜',note:'完成車組立を核に部品・素材・物流集積を形成する防府の主要製造拠点。',
    sourceUrl:'https://www.mazda.com/ja/about/facilities/'
  },

  {
    id:'hiketa-port',placeId:'hiketa',name:'引田港・旧市街',category:'infrastructure',
    lat:34.2248,lon:134.4047,precision:'district',
    era:'中世〜現代',note:'風待ち・潮待ち港を基礎に城・商家・漁業が重なった港町。',
    sourceUrl:'https://www.higashikagawa.jp/soshikikarasagasu/chiikisoseika/gyomuannai/2/area_information/index.html'
  },
  {
    id:'hiketa-kamebishi',placeId:'hiketa',name:'かめびし醤油蔵',category:'heritage',
    lat:34.2249,lon:134.4027,precision:'address',
    era:'1753〜',note:'江戸期以来の醤油醸造を現在まで継続する、直系継承の分かりやすい産業拠点。',
    sourceUrl:'https://online.bunka.go.jp/heritages/detail/116484'
  },
  {
    id:'higashikagawa-glove',placeId:'hiketa',name:'東かがわ手袋産業圏',category:'cluster',
    lat:34.2470,lon:134.3580,precision:'approximate',
    era:'明治〜現代',note:'縫製・皮革・デザイン・スポーツ用品加工の技能が市域に集積する。',
    sourceUrl:'https://www.higashikagawa.jp/soshikikarasagasu/senryaku/gyomuannai/EXPO2025/6350.html'
  },

  {
    id:'sakaide-saltland',placeId:'sakaide',name:'坂出旧塩田・臨海造成地',category:'heritage',
    lat:34.3163,lon:133.8606,precision:'approximate',
    era:'近世〜20世紀',note:'塩田と浅瀬造成が、後の港湾・工業用地形成の前提となった。',
    sourceUrl:'https://www.city.sakaide.lg.jp/soshiki/kouwanka/profile.html'
  },
  {
    id:'sakaide-khi',placeId:'sakaide',name:'川崎重工 坂出工場',category:'factory',
    lat:34.33480,lon:133.83184,precision:'site',
    era:'1967〜',note:'番の州の大型造船拠点。液化ガス運搬船などを建造する。',
    sourceUrl:'https://www.khi.co.jp/corporate/network/'
  },
  {
    id:'sakaide-power',placeId:'sakaide',name:'四国電力 坂出発電所',category:'factory',
    lat:34.34276,lon:133.84291,precision:'site',
    era:'現代',note:'番の州臨海工業地帯のエネルギー機能を担う。',
    sourceUrl:'https://www.yonden.co.jp/energy/p_station/thermal/sakaide.html'
  },
  {
    id:'sakaide-bannosu',placeId:'sakaide',name:'番の州臨海工業地区',category:'cluster',
    lat:34.3390,lon:133.8370,precision:'district',
    era:'戦後〜現代',note:'造船・エネルギー・化学・物流が港湾インフラを共有する臨海集積。',
    sourceUrl:'https://www.city.sakaide.lg.jp/soshiki/kouwanka/profile.html'
  },

  {
    id:'takamatsu-portcastle',placeId:'takamatsu',name:'高松港・高松城周辺',category:'infrastructure',
    lat:34.3500,lon:134.0520,precision:'district',
    era:'中世〜現代',note:'中世港町から海城・県都・四国玄関口へ更新された都市中枢。',
    sourceUrl:'https://www.city.takamatsu.kagawa.jp/smph/kurashi/kurashi/shisetsu/park/tamamo/nishinomaru.html'
  },
  {
    id:'takamatsu-yonden',placeId:'takamatsu',name:'四国電力 本店',category:'headquarters',
    lat:34.34775,lon:134.05022,precision:'address',
    era:'1951〜',note:'四国広域のエネルギー中枢機能を高松に置く。',
    sourceUrl:'https://www.yonden.co.jp/corporate/yonden/summary.html'
  },
  {
    id:'takamatsu-114',placeId:'takamatsu',name:'百十四銀行 本店',category:'headquarters',
    lat:34.34104,lon:134.04809,precision:'site',
    era:'1878〜',note:'明治初期から高松に本店を置く地域金融の中枢。',
    sourceUrl:'https://www.114bank.co.jp/company/about_114bank/'
  },
  {
    id:'takamatsu-tadano',placeId:'takamatsu',name:'タダノ 本社・高松工場',category:'factory',
    lat:34.33572,lon:134.10071,precision:'site',
    era:'1948〜',note:'建設用クレーン・高所作業車などを世界展開する高松本社の機械メーカー。',
    sourceUrl:'https://www.tadano.co.jp/ja/company/overview/'
  },
  {
    id:'ako-salt',placeId:'ako',name:'赤穂旧塩田・塩業地区',category:'heritage',
    lat:34.744,lon:134.390,precision:'approximate',
    era:'近世〜20世紀',note:'海水・遠浅海岸を利用した製塩が、赤穂の産業形成の起点となった。',
    sourceUrl:'https://www.city.ako.lg.jp/edu/bunka/ako-salt.html'
  },
  {
    id:'ako-industrial',placeId:'ako',name:'赤穂臨海工業地区',category:'cluster',
    lat:34.735,lon:134.375,precision:'approximate',
    era:'近代〜現代',note:'塩田跡地・臨海用地に素材・化学・重工系の事業所が集積する。',
    sourceUrl:'https://www.city.ako.lg.jp/sangyo/kigyo/ritchi.html'
  },

  {
    id:'onomichi-port',placeId:'onomichi',name:'尾道水道・旧商港',category:'infrastructure',
    lat:34.405,lon:133.195,precision:'district',
    era:'中世〜近代',note:'天然港と交易が商人・金融・廻船資本を蓄積した。',
    sourceUrl:'https://www.city.onomichi.hiroshima.jp/soshiki/38/59103.html'
  },
  {
    id:'onomichi-shipbuilding',placeId:'onomichi',name:'尾道・向島造船集積',category:'cluster',
    lat:34.390,lon:133.200,precision:'approximate',
    era:'近代〜現代',note:'港湾・修繕技能・海運需要を背景に造船・海事産業が集積。',
    sourceUrl:'https://www.city.onomichi.hiroshima.jp/kaijitoshi/'
  },

  {
    id:'imabari-strait',placeId:'imabari',name:'来島海峡・波止浜',category:'infrastructure',
    lat:34.112,lon:132.970,precision:'approximate',
    era:'近世〜現代',note:'急潮流海峡と港湾が船主・航海技能の蓄積を促した。',
    sourceUrl:'https://www.city.imabari.ehime.jp/kaiji/rekisi/'
  },
  {
    id:'imabari-maritime',placeId:'imabari',name:'今治海事産業集積',category:'cluster',
    lat:34.066,lon:132.998,precision:'approximate',
    era:'近代〜現代',note:'船主、造船、舶用、金融・保険等が地域内で需要と資本を循環させる。',
    sourceUrl:'https://www.city.imabari.ehime.jp/kaiji/'
  },

  {
    id:'shimotsui-port',placeId:'shimotsui',name:'下津井歴史港',category:'infrastructure',
    lat:34.432,lon:133.805,precision:'district',
    era:'近世',note:'北前船・金毘羅参詣・渡海交通と漁業が重なった備讃瀬戸の港。',
    sourceUrl:'https://www.city.kurashiki.okayama.jp/culture/art/1007596/1007818/1007890/1011524.html'
  },
  {
    id:'shimotsui-fishery',placeId:'shimotsui',name:'下津井漁港・食文化圏',category:'cluster',
    lat:34.430,lon:133.807,precision:'district',
    era:'現代',note:'タコなどの漁業・水産食文化と港町観光が現在の地域価値を構成する。',
    sourceUrl:'https://www.city.kurashiki.okayama.jp/culture/tourism/1002215/1002246.html'
  },

  {
    id:'tadotsu-port',placeId:'tadotsu',name:'多度津旧港',category:'infrastructure',
    lat:34.280,lon:133.748,precision:'approximate',
    era:'近世',note:'北前船・金毘羅参詣の物資集散港として発達した。',
    sourceUrl:'https://www.town.tadotsu.kagawa.jp/kanko_bunka_event/rekishi_bunka/1315.html'
  },
  {
    id:'tadotsu-railindustry',placeId:'tadotsu',name:'多度津鉄道・臨海産業地区',category:'cluster',
    lat:34.272,lon:133.753,precision:'district',
    era:'1889〜現代',note:'港の結節機能が四国最初の鉄道と臨海工業・物流へ継承された。',
    sourceUrl:'https://www.town.tadotsu.kagawa.jp/tadoritsukutadotsu/about_tadotsu/about_tadotsu.html'
  },

  {
    id:'mitarai-port',placeId:'mitarai',name:'御手洗・風待ち潮待ち港',category:'heritage',
    lat:34.183,lon:132.866,precision:'district',
    era:'近世',note:'航海待機による滞留経済が商家・船宿・茶屋の町並みを形成。',
    sourceUrl:'https://www.city.kure.lg.jp/site/bunkazai/kunijyudenken-1.html'
  },
  {
    id:'mitarai-tourism',placeId:'mitarai',name:'御手洗重伝建・観光地区',category:'cluster',
    lat:34.181,lon:132.867,precision:'district',
    era:'現代',note:'港町の建築・景観資産が保存活用され、観光・文化産業の基盤となる。',
    sourceUrl:'https://www.city.kure.lg.jp/site/bunkazai/kunijyudenken-1.html'
  },

  {
    id:'ushimado-port',placeId:'ushimado',name:'牛窓歴史港',category:'infrastructure',
    lat:34.614,lon:134.156,precision:'district',
    era:'古代〜近世',note:'外交航路・海運・文化交流が重なった良港。',
    sourceUrl:'https://www.city.setouchi.lg.jp/site/kankoubutsu/117401.html'
  },
  {
    id:'ushimado-coastal',placeId:'ushimado',name:'牛窓海辺産業・観光圏',category:'cluster',
    lat:34.616,lon:134.160,precision:'approximate',
    era:'現代',note:'海運・造船の記憶と農漁業・観光が重なる沿岸産業圏。',
    sourceUrl:'https://www.city.setouchi.lg.jp/soshiki/23/3406.html'
  },

  {
    id:'tomo-port',placeId:'tomonoura',name:'鞆の浦・潮待ち港',category:'heritage',
    lat:34.383,lon:133.383,precision:'district',
    era:'近世',note:'潮流転換を待つ滞留が商業・宿泊・鍛冶・酒造を集積させた。',
    sourceUrl:'https://www.city.fukuyama.hiroshima.jp/soshiki/kanko/85750.html'
  },
  {
    id:'tomo-tourism',placeId:'tomonoura',name:'鞆港町文化・観光圏',category:'cluster',
    lat:34.384,lon:133.386,precision:'district',
    era:'現代',note:'歴史港湾施設、町並み、食・酒文化が観光・地域ブランドへ転換されている。',
    sourceUrl:'https://www.city.fukuyama.hiroshima.jp/soshiki/kowankasen/179954.html'
  },

  {
    id:'mihara-castleport',placeId:'mihara',name:'三原城下港・交通結節',category:'infrastructure',
    lat:34.4006,lon:133.0787,precision:'district',
    era:'近世〜近代',note:'海上交通支配の城下港から鉄道・港湾交通へ更新された。',
    sourceUrl:'https://www.city.mihara.hiroshima.jp/soshiki/30/rekisi.html'
  },
  {
    id:'mihara-industry',placeId:'mihara',name:'三原工業・広域交通圏',category:'cluster',
    lat:34.401,lon:133.090,precision:'approximate',
    era:'近代〜現代',note:'港・鉄道・新幹線・高速道路・空港アクセスを背景に製造・物流立地が進む。',
    sourceUrl:'https://www.city.mihara.hiroshima.jp/soshiki/24/kigyouritti.html'
  },

  {
    id:'takehara-salt',placeId:'takehara',name:'竹原塩田・商人町',category:'heritage',
    lat:34.345,lon:132.912,precision:'district',
    era:'近世',note:'製塩利益が酒造・廻船・問屋・建築へ再投資された。',
    sourceUrl:'https://www.city.takehara.lg.jp/kanko_bunka_sports/rekishi_bunkazai/bunkazai/5/2934.html'
  },
  {
    id:'takehara-townscape',placeId:'takehara',name:'竹原町並み・醸造文化圏',category:'cluster',
    lat:34.347,lon:132.910,precision:'district',
    era:'現代',note:'商人資本が残した町並みと醸造文化が観光・地域ブランドとして活用される。',
    sourceUrl:'https://www.city.takehara.lg.jp/soshikikarasagasu/bunkashogaigakushuka/gyomuannai/9/1548.html'
  },

];

export const industrySpatialRelations = [
  {from:'matsuyama-mitsuhama',to:'matsuyama-iyotetsu',type:'logistics_inheritance',confidence:'high',note:'港町三津浜と城下を結ぶ交通需要が、1888年の私鉄開通へつながった。'},
  {from:'matsuyama-iyotetsu',to:'matsuyama-miura',type:'parallel_modern_layer',confidence:'medium',note:'直接の企業系譜ではなく、県都交通圏に戦後製造業が加わった複層化。'},

  {from:'shimonoseki-port',to:'shimonoseki-ymfg',type:'capital_inheritance',confidence:'medium',note:'港湾商業都市として蓄積した中枢性が、金融本店機能と併存する。直接承継ではない。'},
  {from:'shimonoseki-port',to:'shimonoseki-hayashikane',type:'logistics_inheritance',confidence:'high',note:'水産集荷・港湾物流を背景に食品・飼料加工が立地。'},

  {from:'yanai-shirakabe',to:'yanai-industrial',type:'parallel_modern_layer',confidence:'high',note:'近世商都の直系産業ではなく、現代の企業誘致・製造投資が重なった新層。'},
  {from:'yanai-industrial',to:'yanai-chemical',type:'parallel_modern_layer',confidence:'high',note:'化学製造が現在の柳井産業圏を構成。'},

  {from:'hofu-salt',to:'hofu-port',type:'logistics_inheritance',confidence:'high',note:'塩積出港としての港湾機能が、時代を変えて工業物流へ利用される。'},
  {from:'hofu-port',to:'hofu-mazda',type:'logistics_inheritance',confidence:'high',note:'三田尻中関港と臨海交通基盤が完成車・部材物流を支える。'},
  {from:'hofu-salt',to:'hofu-mazda',type:'land_inheritance',confidence:'medium',note:'製塩から自動車への直接継承ではなく、沿岸土地造成・港湾投資を媒介した地域構造の転換。'},

  {from:'hiketa-port',to:'hiketa-kamebishi',type:'direct_continuity',confidence:'high',note:'港町商業の中で成立した醤油醸造が同地で長期継続。'},
  {from:'hiketa-kamebishi',to:'higashikagawa-glove',type:'parallel_modern_layer',confidence:'high',note:'醸造と手袋は直接系譜ではなく、異なる時期に蓄積した地域技能産業。'},

  {from:'sakaide-saltland',to:'sakaide-bannosu',type:'land_inheritance',confidence:'high',note:'塩田・浅瀬利用から大規模埋立・臨海工業地へ土地利用が転換。'},
  {from:'sakaide-bannosu',to:'sakaide-khi',type:'land_inheritance',confidence:'high',note:'造成された番の州工業地に大型造船所が立地。'},
  {from:'sakaide-bannosu',to:'sakaide-power',type:'land_inheritance',confidence:'high',note:'同じ臨海基盤をエネルギー産業が共有。'},

  {from:'takamatsu-portcastle',to:'takamatsu-114',type:'capital_inheritance',confidence:'medium',note:'城下・港町の都市中心性に地域金融本店が加わった。直接承継ではない。'},
  {from:'takamatsu-portcastle',to:'takamatsu-yonden',type:'capital_inheritance',confidence:'medium',note:'県都・交通結節性が広域本社機能の立地を支える。'},
  {from:'takamatsu-portcastle',to:'takamatsu-tadano',type:'parallel_modern_layer',confidence:'medium',note:'港町の直系企業ではなく、県都圏に成立した世界展開型製造業。'},
  {from:'ako-salt',to:'ako-industrial',type:'land_inheritance',confidence:'high',note:'塩田跡地・臨海用地が素材・化学・重工業立地へ転換。'},
  {from:'onomichi-port',to:'onomichi-shipbuilding',type:'capital_inheritance',confidence:'medium',note:'交易・廻船・修繕技能の蓄積が、近代海運・造船集積の背景となった。'},
  {from:'imabari-strait',to:'imabari-maritime',type:'skill_inheritance',confidence:'high',note:'海峡航海と海運技能が船主・造船・舶用の地域集積へ厚みを与えた。'},
  {from:'shimotsui-port',to:'shimotsui-fishery',type:'direct_continuity',confidence:'medium',note:'歴史港の海域利用が漁業・食文化・観光として現在まで残る。'},
  {from:'tadotsu-port',to:'tadotsu-railindustry',type:'logistics_inheritance',confidence:'high',note:'港の物資集散機能が鉄道・臨海物流へ置き換わりながら継承された。'},
  {from:'mitarai-port',to:'mitarai-tourism',type:'direct_continuity',confidence:'high',note:'滞留経済が形成した町並みそのものが現在の文化・観光資産になった。'},
  {from:'ushimado-port',to:'ushimado-coastal',type:'parallel_modern_layer',confidence:'medium',note:'歴史的海運・外交港の空間に、農漁業・観光など現在の沿岸産業が重なる。'},
  {from:'tomo-port',to:'tomo-tourism',type:'direct_continuity',confidence:'high',note:'潮待ち港が残した港湾施設・町並み・商業文化が現在の観光資産へ転換。'},
  {from:'mihara-castleport',to:'mihara-industry',type:'logistics_inheritance',confidence:'high',note:'城下港の結節性が鉄道・道路・空港を含む広域交通機能へ更新された。'},
  {from:'takehara-salt',to:'takehara-townscape',type:'capital_inheritance',confidence:'high',note:'製塩利益が酒造・廻船・商家建築へ再投資され、その資産が町並みとして残った。'}
];
