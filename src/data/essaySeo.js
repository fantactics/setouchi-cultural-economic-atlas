// Search-facing metadata: retain the literary on-page H1 while using an
// explicit question and place when this improves search-intent clarity.
// Re-check curated entries when the corresponding essay is rewritten.
const normalize=(value)=>String(value||'').replace(/\s+/g,' ').trim();

const firstSentence=(value)=>{
  const text=normalize(value);
  return text.match(/^[^。！？!?]+[。！？!?]/u)?.[0]||text;
};

const finishSentence=(value)=>{
  const text=normalize(value).replace(/[。！？!?]+$/u,'');
  return text?`${text}。`:'';
};

// These are hypotheses about reader questions, not measured search volumes.
// The title shown to readers in the article remains article.title.
export const essaySeoFocus={
  'mihara-castle-to-multimodal-city':{
    title:'三原城はなぜ鉄道に貫かれた？山陽鉄道と新幹線が残した城跡',
    description:'海上交通の拠点だった三原城は、1894年に本丸を山陽鉄道が横切り、近代の駅に場所を譲った。城跡と石垣、港湾整備、歴史的景観の喪失をたどる。'
  },
  'ibuki-fat-sardines-revalued':{
    title:'伊吹いりこの脂イワシはなぜ干さない？急速冷凍と讃岐うどん',
    description:'讃岐うどんの出汁を支える伊吹いりこ。脂が多い魚はなぜ干しにくいのか。急速冷凍の導入や一匹ずつの加工から、脂イワシの新しい用途をたどる。'
  },
  'onomichi-capital-to-culture-and-ships':{
    title:'山と海に挟まれた港町を、あとから鉄道が貫いた',
    description:'山と海に挟まれた尾道の港町を、明治の鉄道が貫いた。常称寺の山門と本堂の分断、斜面住宅の成り立ちから、時代が積み重なった景観をたどる。'
  },
  'sanuki-store-the-rain':{
    title:'香川・讃岐平野にため池が多いのはなぜ？少雨と水配分',
    description:'雨が少ない讃岐平野に数多くのため池がある理由を、短い河川、降水条件、水利の工夫からたどる。線香で水を分ける約束の背景にも迫る。'
  },
  'kojima-from-cotton-to-jeans':{
    title:'児島はなぜジーンズの産地に？綿花・足袋・学生服の歴史',
    description:'岡山県児島がジーンズの町になった理由とは。干拓地の綿花から足袋、学生服、デニムへ。土地の条件と縫製技術の変化をたどる。'
  },
  'kojima-jeans-circular-economy':{
    title:'児島のノーリベットジーンズはなぜ鋲を外したのか',
    description:'丈夫さの象徴だったリベットを、なぜ児島のジーンズ職人は外したのか。繊維の再利用や裁断くずの循環から、産地の新しい技術を読む。'
  },
  'oyster-shells-where-they-go':{
    title:'広島の牡蠣殻はどう処理される？年20万立方メートルの行方',
    description:'広島県で年約20万立方メートル発生する牡蠣殻は、どこへ行くのか。海中保管から肥料・飼料、海底の環境改善まで、産地の物流をたどる。'
  },
  'ports-that-needed-waiting':{
    title:'鞆の浦・御手洗・多度津・尾道｜港町がたどった別々の道',
    description:'瀬戸内の港町は、船が待つ時間に支えられただけではない。潮待ちの鞆、船宿の御手洗、参詣鉄道の多度津、商業と造船の尾道。それぞれの町に残った仕事を見比べる。'
  },
  'tomo-two-act-tidal-port':{
    title:'鞆の浦で東西の潮が出会うと何が起きる？月が動かす港の時間',
    description:'瀬戸内海の東西から潮が集まる鞆の浦では、船が出港に適した流れを待った。翌日は少しずれる潮の時刻、夜の航海、雁木の石段から、太陽と月の二つの時間をたどる。'
  },
  'yanai-trade-profit-to-whitewalls':{
    title:'柳井の白壁の町並みはなぜできた？木綿と菜種油の交易',
    description:'山口県柳井の白壁の町並みは、どんな商いから生まれたのか。川の港、木綿と菜種油の流通、商家や蔵が並ぶ町の構造を読み解く。'
  },
  'takehara-salt-capital-to-townscape':{
    title:'竹原の町並みと塩田はどうつながる？塩づくりが残した白壁',
    description:'広島県竹原の歴史的町並みと、かつての塩田の関係とは。干拓地の塩づくりで蓄えた富が、白壁の商家の景観へ変わる歴史をたどる。'
  },
  'imabari-why-shipbuilding':{
    title:'今治で造船業が発達したのはなぜ？波止浜の海と産業の転換',
    description:'今治・波止浜では、塩田のあった海辺がどのように造船の産地になったのか。遠浅の海と深い海、船の大型化から地域産業を読み解く。'
  },
  'oysters-taste-of-small-seas':{
    title:'日生と広島の牡蠣はなぜ違う？海の環境と養殖の風景',
    description:'日生の島々がつくる潮の流れと、広島湾に流れ込む川の水。二つの海で育つ牡蠣を、海の自然条件や養殖の風景から読み比べる。'
  },
  'tai-meshi-two-seas':{
    title:'宇和島鯛めしと瀬戸内の鯛めしはどう違う？二つの食文化',
    description:'生の鯛を使う宇和島鯛めしと、鯛を炊き込む瀬戸内の鯛めし。同じ魚料理が土地によって異なる理由を、海と食卓からたどる。'
  },
  'hijiki-tidal-time':{
    title:'ひじき採りはなぜ潮に合わせる？瀬戸内の岩場と暮らし',
    description:'ひじきが育つ岩場は、潮の満ち引きで海から姿を現す。瀬戸内の島の採集風景から、自然の時間と人の仕事の結びつきを読む。'
  },
  'hiketa-castle-port-town':{
    title:'引田の港町はなぜこの形？城山と安戸池を生んだ地形',
    description:'香川県東かがわ市・引田。城山と港町、安戸池の位置関係をたどり、かつての海岸地形が城下の暮らしや町並みにどう関わったかを読む。'
  },
  'shodoshima-somen-to-sesame-oil':{
    title:'小豆島のそうめんがごま油産業を育てたのはなぜ？',
    description:'小豆島の手延べそうめんと、ごま油の製油工場はどうつながったのか。少雨の土地と冬の風、そうめんの製法から、島の産業の連鎖をたどる。'
  },
  'naoshima-water-across-sea':{
    title:'直島の水はどこから？観光と製錬所を支える水道・海底送水管',
    description:'雨の少ない直島で観光客と住民の水はどう賄われるのか。島のダムと工業用水、高梁川から海底送水管を通る生活用水、2026年の渇水をたどる。'
  },
  'awaji-onion-rice-field':{
    title:'淡路島の玉ねぎはなぜ田んぼで育つ？水田裏作と二毛作',
    description:'淡路島の玉ねぎ畑は夏になると水田に変わる。稲作と玉ねぎを組み合わせる農業、牛ふん堆肥、乾燥の工夫から、三原平野の農業景観を読み解く。'
  },
  'chichibugahama-sky-in-tide':{
    title:'父母ヶ浜の水鏡はなぜできる？干潮・遠浅・夕日の条件',
    description:'香川県三豊市の父母ヶ浜で、空が水面に映るのはなぜか。遠浅の砂浜、干潮で残る薄い水、凪と夕日が重なる短い時間を、地形と潮の動きから読み解く。'
  },
  'matsuyama-three-centers-one-city':{
    title:'松山の港はなぜ三津浜から高浜へ移った？砂嘴と汽船の歴史',
    description:'三津浜の砂嘴に生まれた港は、汽船の大型化とともに高浜へ主役を譲った。遠浅の海と西風、伊予鉄道の延伸から、松山の港町が変わった理由をたどる。'
  },
  'iwakuni-river-city':{
    title:'錦帯橋はなぜ五連の橋なのか？錦川の洪水と橋出米',
    description:'山と錦川に挟まれた岩国の城下町では、対岸を結ぶ橋が必要だった。洪水に耐える五連の錦帯橋と、維持のため米を集めた橋出米の仕組みを読む。'
  },
  'niihama-after-copper':{
    title:'別子銅山から新居浜の工業都市へ｜製錬・煙害・住友の産業史',
    description:'山の別子銅山から海辺の新居浜へ。鉱石輸送、製錬所の煙害対策、化学・機械産業への展開をたどると、鉱山の閉山後も工場が残った理由が見えてくる。'
  },
  'shimonoseki-resource-made-by-market':{
    title:'下関がふぐの町になったのはなぜ？南風泊市場と集荷の仕組み',
    description:'下関のふぐは関門海峡だけで獲れるわけではない。全国から集まるふぐを、唐戸から南風泊への市場移転、活かし込み、専門加工の仕事から読み解く。'
  },
  'tatsuno-water-castle-and-soy-sauce':{
    title:'龍野の淡口醤油はなぜ生まれた？揖保川の軟水と甘酒',
    description:'兵庫県たつの市・龍野は淡口醤油の産地。酒づくりでは扱いにくかったという揖保川の軟水が、なぜ醤油づくりに生かされたのか。城下町の産業史をたどる。'
  },
  'setouchi-itinerant-trade-boats':{
    title:'睦月島に長屋門が並ぶのはなぜ？瀬戸内の行商船と沖売り',
    description:'松山沖の睦月島に残る長屋門の町並みは、島の行商とどう結びついたのか。潮待ちの船へ布を売った沖売りと、海を渡る商人の仕事をたどる。'
  },
  'tatara-bridge-citrus-seasons':{
    title:'生口島のレモンと大三島のみかん｜多々羅大橋の先で変わる柑橘',
    description:'しまなみ海道の多々羅大橋を渡ると、柑橘の品種や産地の歴史はどう変わるのか。生口島のレモン谷と大三島を、自転車で巡る風景から読み解く。'
  },
  'mikan-slope-and-varieties':{
    title:'宇和海のみかん段畑に石垣が多いのはなぜ？狩浜の桑畑の歴史',
    description:'愛媛県西予市の狩浜に広がる石積みの段畑は、もともと桑畑だった。土と雨を支える石垣が、どのようにみかんの産地の景観になったのかをたどる。'
  },
  'kada-sea-bream-one-line':{
    title:'加太の鯛の一本釣りはなぜ竿を使わない？紀淡海峡と漁師の技',
    description:'友ヶ島の急潮に面した和歌山市・加太では、竿を使わず指先で真鯛の反応を読む一本釣りがある。潮を読む技と活魚流通から、加太の真鯛の価値を考える。'
  },
  'faith-as-transport-map':{
    title:'御手洗の住吉神社は誰が建てた？鴻池善右衛門と海の交易',
    description:'広島県大崎下島・御手洗の住吉神社には、大阪の豪商や茶屋の女性たちの名前が残る。下津井の祇園神社とも比較し、瀬戸内の船と商人が育てた信仰の風景を読む。'
  },
  'fish-waste-to-feed-and-citrus':{
    title:'八幡浜の魚のアラはなぜみかん畑へ？魚肥と柑橘の循環',
    description:'愛媛県八幡浜の水産加工で残った魚の頭や骨は、肥料となってみかん山に届く。港の魚と斜面の果樹園をつなぐ、見えにくい地域の資源循環を追う。'
  },
  'gangi-tide-port-functions':{
    title:'瀬戸内の雁木はなぜ港ごとに違う？鞆の浦・牛窓・御手洗',
    description:'鞆の浦、三之瀬、牛窓、御手洗の港には海へ下りる石段「雁木」が残る。潮の満ち引きだけでなく、荷役や来訪者など港の役割が形をどう変えたかをたどる。'
  },
  'kashino-sunken-pension-village':{
    title:'牛窓・鹿忍の水没ペンション村はなぜ沈んだ？塩田跡と排水ポンプ',
    description:'牛窓の鹿忍グリーンファーム跡では、なぜロッジが水没したのか。1959年の塩田廃止、リゾート開業、排水ポンプ停止、住民の生活と錦海塩田との対照をたどる。'
  },
  'kinkai-salt-field-to-solar':{
    title:'錦海塩田はなぜ太陽光発電所に？干拓地と排水ポンプの歴史',
    description:'岡山県瀬戸内市の錦海塩田跡が太陽光発電所になった背景には、塩田廃止後も必要だった排水ポンプがある。二度の干拓と水の道から土地利用の転換を読む。'
  },
  'mitarai-economy-of-waiting':{
    title:'御手洗の町並みはなぜ残った？船宿・波止・港の変化',
    description:'大崎下島の御手洗は、船が寄る港から路地と船宿の町へ育った。1829年の千砂子波止、1907年の改修、1994年の町並み保存を通じて、港の仕事と建物がどう変わったかをたどる。'
  },
  'oyster-shells-after-the-meal':{
    title:'広島の牡蠣殻と平和公園の折り鶴はどう壁材になった？',
    description:'広島湾で生まれた牡蠣殻と、平和記念公園に寄せられた折り鶴。異なる二つの残りものが壁材になるまでを追い、海の産業と町の記憶の結びつきを考える。'
  },
  'sawara-spring-two-gates':{
    title:'瀬戸内のサワラはなぜ春に来る？産卵回遊と日生の祝いずし',
    description:'春の瀬戸内海にサワラが現れるのはなぜか。海の東西の入口から入る魚の回遊と産卵の道を、岡山県日生の祝い料理「こうこずし」からたどる。'
  },
  'shimotsui-tako-meshi':{
    title:'下津井でタコを干すのはなぜ？瀬戸大橋の港の保存食',
    description:'岡山県倉敷市・下津井では冬の港に干しダコが並ぶ。新鮮な魚介が手に入る漁港なのに、なぜタコを干すのか。保存食から生まれた食文化と風景を読む。'
  },
  'citrus-pomace-cascade':{
    title:'愛媛のみかんの搾りかすはどこへ？飼料と剪定枝の再利用',
    description:'愛媛の柑橘産業では、ジュースを搾ったあとに皮や薄皮が、畑には剪定枝が残る。飼料、敷料、炭などへ向かう別々の利用の道をたどる。'
  },
  'jinori-okinori-navigation-system':{
    title:'瀬戸内の地乗りと沖乗りは何が違う？船の航路と港町の変化',
    description:'山陽沿岸の港をたどる地乗りと、島々の間を抜ける沖乗り。帆船の航路選択が変わると、尾道や御手洗など港町の役割はどう変わったのか。'
  },
  'kada-sea-bream-distribution-ecosystem':{
    title:'加太の真鯛は釣られたあとどこへ行く？港の生簀と活魚流通',
    description:'和歌山市・加太で一本釣りされた真鯛は、港の生簀、入札、仲買、市場、料理店へと運ばれる。魚の価値を守る、漁師の後に続く仕事をたどる。'
  },
  'kada-steel-data-center-transition':{
    title:'加太の製鉄所とデータセンター候補地｜海辺と丘の土地改変',
    description:'和歌山市・加太の周辺では、製鉄所の建設や関西空港に向けた土砂採取が土地を変えてきた。データセンター候補地にもなった丘から、産業が土地に求める条件を考える。'
  },
  'kitan-strait-tai-to-shirasu':{
    title:'紀淡海峡ではなぜ鯛としらすの漁法が違う？加太と泉州',
    description:'紀淡海峡の加太では一本の糸で真鯛を釣り、大阪湾の泉州では網でしらすを獲る。友ヶ島の潮と魚の回遊、鮮度を守る流通から漁法の違いをたどる。'
  },
  'kojima-island-infrastructure-per-capita':{
    title:'瀬戸内の島の水道と下水はどう違う？大多府島・鴻島・宮島',
    description:'瀬戸内の大多府島、鴻島、宮島では、飲み水をどこから届け、生活排水をどこへ流すのか。漁村・別荘地・観光地という島ごとのインフラを比較する。'
  },
  'ako-after-salt-fields':{
    title:'赤穂はなぜ塩田を手放しても塩をつくれた？西浜の選択',
    description:'兵庫県赤穂市の西浜では、1965年に塩田の大部分を売却し、新しい製塩設備を導入した。塩田をなくすことが塩づくりの継続につながった、産業転換の歴史を読む。'
  },
  'niboshi-shirasu-two-food-cultures':{
    title:'しらすといりこは何が違う？泉州と伊吹島の乾燥・冷凍の歴史',
    description:'泉州はしらすの浜であると同時に、かつて煮干しの産地だった。伊吹島では干したいりこに加え、冷凍の釜揚げいりこも商品化。小魚の加工と輸送方法が食文化をどう変えたかを比べる。'
  },
  'olive-pomace-to-cattle':{
    title:'小豆島のオリーブ搾りかすはなぜ牛の餌に？オリーブ牛の循環',
    description:'小豆島のオリーブから油を搾ったあと、残った果肉や種はどこへ行くのか。海を越えて牛の飼料に使われ、オリーブ牛となって食卓へ戻る産業の循環をたどる。'
  },
  'setouchi-ship-materials':{
    title:'伊予灘の漁船はなぜ宮崎の飫肥杉でできていた？船材の交易',
    description:'愛媛県伊予市・双海に残る1952年製の地引き網船には、遠い宮崎県の飫肥杉が使われた。山の木、木材流通、船大工の技能から瀬戸内の船づくりを読む。'
  },
  'setouchi-shrimp-middle-layer':{
    title:'児島湾の四つ手網とアキアミ｜ママカリをつなぐ海の食物網',
    description:'児島湾の四つ手網で獲れるアキアミとママカリ。小さなエビの繁殖、潮汐による移動、ママカリの餌、そして岡山の郷土料理を結ぶ、海中の見えない生態系。'
  },
  'setouchi-sushi-not-nigiri':{
    title:'瀬戸内の郷土寿司はなぜ握らない？ばら寿司・押し抜きずし',
    description:'岡山のばら寿司、讃岐の押し抜きずし、広島の角寿司、松山鮓。瀬戸内の祝いの料理には、取り分けて人に振る舞うという共通の役割があった。'
  },
  'shodoshima-open-island':{
    title:'小豆島の醤油蔵から佃煮産業が生まれたのはなぜ？醤の郷',
    description:'小豆島・醤の郷の黒い醤油蔵のそばに、なぜ佃煮工場が並ぶのか。1945年の芋の葉柄の加工を出発点に、島の醤油づくりから新しい産業が生まれた歴史をたどる。'
  },
  'mihara-castle-to-multimodal-city':{
    title:'三原駅はなぜ城跡を貫いている？海城と山陽鉄道の歴史',
    description:'広島県三原市では、新幹線駅のそばに三原城の天主台が残る。山と海に挟まれた狭い平地に、海城と鉄道が重なった理由を地形と歴史から読み解く。'
  },
  'takamatsu-sea-castle-to-gateway':{
    title:'高松城はなぜ海から遠くなった？砂州と埋立ての港町史',
    description:'高松城の堀には今も海水が入り、魚が泳ぐ。かつて海に面していた城が、なぜ港や道路の奥にあるのか。香東川の土砂と埋立て、鉄道・港湾整備をたどる。'
  },
  'iwagi-salt-pans-to-shrimp-ponds':{
    title:'岩城島の塩田跡はどう使われた？北浜のクルマエビ・南浜の運動場',
    description:'岩城島の塩田は1971年に終了。北浜にはクルマエビ養殖池、南浜には運動施設、新浜には造船関連の工場ができた。同じ島の塩田跡が選んだ異なる土地利用と、水・砂の条件をたどる。'
  },
  'ushimado-nagahama-kinkai-two-reclaimed-landscapes':{
    title:'牛窓の長浜干拓地と錦海塩田｜二つの堤防が分けた畑と湿地',
    description:'牛窓の錦海湾は二度仕切られた。奥の長浜干拓地では白菜・キャベツを育て、その海側では錦海塩田が造られた。廃止後の塩田に生まれた塩性湿地まで、二本の堤防から土地の歴史を読み解く。'
  }
};

export const essaySearchMeta=(article)=>{
  const title=normalize(article?.title)||'地域エッセイ';
  const subtitle=normalize(article?.subtitle);
  const lead=firstSentence(article?.lead);
  const focus=essaySeoFocus[article?.slug];
  const seoTitle=focus?.title?`${focus.title}｜SETOUCHI ATLAS`:`${title}｜SETOUCHI ATLAS`;
  const first=finishSentence(subtitle||title);
  const fallbackDescription=lead&&lead!==first&&first.length+lead.length<=170?first+lead:first;
  return {title:seoTitle,description:focus?.description||fallbackDescription};
};
