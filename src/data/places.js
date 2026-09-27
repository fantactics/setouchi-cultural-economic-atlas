export const claimLabels = {
  fact: 'FACT',
  interpretation: 'INTERPRETATION',
  hypothesis: 'HYPOTHESIS'
};

export const places = [
  {
    id:'ako', name:'赤穂', prefecture:'兵庫県', lat:34.7549, lon:134.3903,
    subtitle:'海水と塩田が、技術と土地利用を通じて現代工業へつながった町',
    tags:['製塩','無機化学','臨海工業','城下町'],
    sections:[
      ['基本情報','播磨灘に面する兵庫県西端の都市。千種川河口部を中心に市街地が形成された。','fact'],
      ['地理・地形','千種川河口の平坦な臨海低地と、背後の丘陵・山地から成る。','fact'],
      ['気候・水・自然条件','瀬戸内海式気候の少雨・多日照という条件は、歴史的な製塩に適した自然条件の一つだった。','interpretation'],
      ['歴史・都市形成','赤穂藩の城下町、製塩都市、坂越の港町という複数の都市史が重なる。','fact'],
      ['港・交通・物流','坂越港などの海上交通と、近代以降の臨海工業立地が地域経済を支えてきた。','interpretation'],
      ['食文化','塩は調味料という枠を超え、赤穂の地域アイデンティティを構成する文化資源になっている。','interpretation'],
      ['地域産業','製塩、無機化学、セラミックス、セメント、重電など素材・重工系の製造業が目立つ。','fact'],
      ['代表企業','日本海水、タテホ化学工業、三菱電機、住友大阪セメントなどが地域産業を説明する代表例。','fact'],
      ['産業遺伝子','海水→製塩→苦汁利用→無機化学と、塩田→臨海用地→大型製造業という二系統が見える。','interpretation'],
      ['資本形成','塩業を通じた地域経済の蓄積が、近代以降の工業化を受け入れる基盤の一部になった可能性がある。','hypothesis'],
      ['産業生態系','製塩、化学、窯業、素材、重電など異なる業種が臨海部に共存する。','fact'],
      ['人口・地域経済','人口規模に比して製造業の存在感が大きい地方工業都市として捉えられる。','interpretation'],
      ['暮らし','城下町中心部と臨海工業地帯が近接し、観光都市と生活・産業都市の性格を併せ持つ。','interpretation'],
      ['観光・文化','赤穂城、赤穂義士、坂越の町並み、製塩文化が主要な文化資源。','fact'],
      ['災害・環境','千種川河口低地という地形上、洪水・高潮等のハザードを土地利用と合わせて読む必要がある。','interpretation'],
      ['現在の変化','既存製造業に加え、資源循環・リサイクル関連の企業立地も観察対象になる。','interpretation'],
      ['文化への経済的波及','製塩で形成された都市経済が、町並み・地域ブランド・観光表象へ長期的に波及している。','interpretation'],
      ['なぜこの町はこの町になったのか','瀬戸内の自然条件を利用した製塩が、技術と土地の二つの資産を残し、それが現代の素材・化学・臨海工業へ接続した。','interpretation']
    ],
    genes:[
      {name:'製塩・海水化学遺伝子',type:'資源型＋技能型',chain:['海水','製塩','苦汁利用','マグネシウム化学','セラミックス・先端素材']},
      {name:'塩田跡地・臨海工業遺伝子',type:'土地継承型＋物流型',chain:['塩田','塩田廃止','臨海工業用地','大型製造業立地']}
    ],
    sources:[
      {id:'AKO-01',label:'赤穂市史 編さん・販売',publisher:'赤穂市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.ako.lg.jp/edu/shougai/shishitosyo.html'},
      {id:'AKO-02',label:'赤穂市の日本遺産',publisher:'赤穂市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.ako.lg.jp/sangyoshinko/kankou/japan_heritage_ako.html'},
      {id:'AKO-03',label:'赤穂市企業紹介チャンネル',publisher:'赤穂市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.ako.lg.jp/kensetsu/shoukou/240301_kigyoushoukai_channel.html'},
      {id:'AKO-04',label:'赤穂市 都市計画資料（地形・水系）',publisher:'赤穂市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.ako.lg.jp/kensetsu/keikaku/documents/r6-2_tokeisin_giansyo2.pdf'}
    ],
    sectionSources:{
      0:['AKO-04'],1:['AKO-04'],2:['AKO-02'],3:['AKO-01','AKO-02'],4:['AKO-01'],5:['AKO-02'],
      6:['AKO-03'],7:['AKO-03'],8:['AKO-01','AKO-03'],9:['AKO-01'],10:['AKO-03'],13:['AKO-02'],
      15:['AKO-03'],16:['AKO-01','AKO-02'],17:['AKO-01','AKO-02','AKO-03']
    }
  },
  {
    id:'onomichi', name:'尾道', prefecture:'広島県', lat:34.4089, lon:133.2050,
    subtitle:'天然港と交易ネットワークが商業資本と海事産業を育てた町',
    tags:['港町','交易','造船','商業資本'],
    sections:[
      ['基本情報','旧尾道市街に加え、向島・因島・生口島など島嶼部を含む複合的な海域都市。','fact'],
      ['地理・地形','山が海へ迫り、尾道水道を挟んで向島が近接する狭隘な地形が港町景観を生んだ。','fact'],
      ['気候・水・自然条件','温暖少雨の瀬戸内型気候は、島嶼部の柑橘農業とも結びつく。','interpretation'],
      ['歴史・都市形成','中世の年貢積出港から近世・近代の商港へ発展し、港を中心に市街地が形成された。','fact'],
      ['港・交通・物流','尾道水道と瀬戸内航路の結節性が、交易・物流・海運の基盤となった。','interpretation'],
      ['食文化','瀬戸内の魚介と島嶼部の柑橘が、港町・島の食文化を構成する。','interpretation'],
      ['地域産業','造船、船舶修繕、舶用関連、商業、柑橘などが主要な地域産業。','fact'],
      ['代表企業','尾道造船、内海造船などが、現在も市内で大型船建造を続けている。','fact'],
      ['産業遺伝子','天然港→交易→商人・問屋→資本形成→海運→造船・修繕というネットワーク型遺伝子が強い。','interpretation'],
      ['資本形成','海上交易による商人・豪商の富の蓄積が、金融や文化への投資へ波及した。','interpretation'],
      ['産業生態系','造船所、修繕、舶用企業、鉄工、海運、行政機関などが海事生態系を形成する。','fact'],
      ['人口・地域経済','旧市街・島嶼部それぞれに異なる産業構造を持つため、市全体を一枚岩として見ないことが重要。','interpretation'],
      ['暮らし','斜面市街地、港、島という地形条件が交通・住宅・日常生活の形を強く規定する。','interpretation'],
      ['観光・文化','寺社、坂道、港町景観、近代建築、しまなみ海道など文化観光資源が多層的。','fact'],
      ['災害・環境','斜面地の土砂災害と沿岸部の水害・高潮を、居住地選択と併せて見る必要がある。','interpretation'],
      ['現在の変化','海事産業の人材確保・育成と、観光・移住による旧市街再生が同時進行している。','interpretation'],
      ['文化への経済的波及','交易で蓄積された富が寺社への寄進や町並み形成に波及し、現在の観光資産にもつながった。','interpretation'],
      ['なぜこの町はこの町になったのか','天然港と交易ネットワークが商業資本を生み、その資本・技能・海上交通が海運・造船と文化都市の双方へ展開した。','interpretation']
    ],
    genes:[
      {name:'港・商業・海事遺伝子',type:'ネットワーク型＋資本循環型',chain:['天然港','交易','商人・問屋','資本形成','海運','造船・修繕']},
      {name:'島嶼柑橘遺伝子',type:'資源型＋技能型',chain:['温暖少雨','島嶼農業','柑橘栽培','加工・地域ブランド','観光']}
    ],
    sources:[
      {id:'ONO-01',label:'造船業をはじめ海事機能が集積する尾道市',publisher:'尾道市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.onomichi.hiroshima.jp/kaijitoshi/development/prologue.html'},
      {id:'ONO-02',label:'海をめぐる歴史と文化',publisher:'尾道市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.onomichi.hiroshima.jp/kaijitoshi/history/index.html'},
      {id:'ONO-03',label:'進水式情報',publisher:'尾道市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.onomichi.hiroshima.jp/kaijitoshi/launching_ceremony/index.html'}
    ],
    sectionSources:{
      0:['ONO-01'],3:['ONO-01','ONO-02'],4:['ONO-01','ONO-02'],6:['ONO-01'],7:['ONO-03'],
      8:['ONO-01','ONO-02'],9:['ONO-01','ONO-02'],10:['ONO-01'],13:['ONO-02'],15:['ONO-01'],
      16:['ONO-02'],17:['ONO-01','ONO-02']
    }
  },
  {
    id:'imabari', name:'今治', prefecture:'愛媛県', lat:34.0661, lon:132.9978,
    subtitle:'船主資本が循環する海事都市と、技能が進化したタオル産地',
    tags:['海運','船主','造船','今治タオル'],
    sections:[
      ['基本情報','来島海峡沿岸の市街地と、しまなみ海道沿いの島嶼部を含む広域都市。','fact'],
      ['地理・地形','来島海峡という強潮流の海域と多数の島が、古くから海上交通の重要性を高めた。','fact'],
      ['気候・水・自然条件','温暖な瀬戸内型気候に加え、蒼社川の水資源が染晒など繊維産業の品質形成に関係する。','interpretation'],
      ['歴史・都市形成','海運・港湾と繊維産業の二つの系譜が都市経済を形成してきた。','interpretation'],
      ['港・交通・物流','今治港と瀬戸内航路、島嶼間交通が地域産業の物流基盤。','fact'],
      ['食文化','鯛など瀬戸内の魚介、島嶼部の柑橘など、海と島の双方の食文化を持つ。','interpretation'],
      ['地域産業','海運、船主、造船、舶用工業、タオル・繊維が主要産業。','fact'],
      ['代表企業','今治造船をはじめ、船主・海運・舶用企業群とタオル関連企業群が地域経済を支える。','fact'],
      ['産業遺伝子','海運→船主資本→造船・舶用という循環型遺伝子と、綿織物→染晒→タオルという技能型遺伝子が共存する。','interpretation'],
      ['資本形成','今治船主による船舶所有と再投資の循環が、海事産業の厚みを生み出した。','interpretation'],
      ['産業生態系','船主、海運、造船、舶用機器、金融、保険、人材、港湾が相互依存する海事エコシステムを形成する。','fact'],
      ['人口・地域経済','製造業と海運関連サービスが共存し、単純な工場都市では説明できない経済構造を持つ。','interpretation'],
      ['暮らし','本土市街地と島嶼部では交通・医療・買物条件が異なり、市内でも生活圏を分けて評価する必要がある。','interpretation'],
      ['観光・文化','しまなみ海道、来島海峡、今治城、タオル産地など、産業と観光が密接に重なる。','fact'],
      ['災害・環境','沿岸部・島嶼部の災害リスクと、本土側の河川・斜面リスクを分けて見る必要がある。','interpretation'],
      ['現在の変化','海事産業では脱炭素・次世代船舶、人材確保、国際競争力強化が重要テーマとなっている。','fact'],
      ['文化への経済的波及','海運・船主資本とタオル産業は、地域ブランドや都市アイデンティティの形成にも寄与している。','interpretation'],
      ['なぜこの町はこの町になったのか','海峡を利用した海運が船主資本と造船・舶用産業の循環を生み、別系統では繊維技能と水資源が高品質タオル産地へ進化した。','interpretation']
    ],
    genes:[
      {name:'海運・船主・造船遺伝子',type:'ネットワーク型＋資本循環型＋技能型',chain:['海上交通','海運','船主資本','新船需要','造船','舶用産業']},
      {name:'綿織物・タオル遺伝子',type:'技能型＋資源型＋ブランド適応型',chain:['綿織物','染晒','タオル','品質基準','産地ブランド']}
    ],
    sources:[
      {id:'IMA-01',label:'日本最大の海事都市今治とは',publisher:'今治市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.imabari.ehime.jp/kaiji/about/'},
      {id:'IMA-02',label:'今治の地場産業',publisher:'今治市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.imabari.ehime.jp/sangyou/jibasan/'},
      {id:'IMA-03',label:'今治海事都市発展ビジョン概要',publisher:'今治市',kind:'official',verifiedAt:'2026-09-27',url:'https://www.city.imabari.ehime.jp/kaiji/vision/vision_gaiyou.pdf'},
      {id:'IMA-04',label:'今治 平年値（1991–2020）',publisher:'気象庁',kind:'official',verifiedAt:'2026-09-27',url:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1077&prec_no=73'}
    ],
    sectionSources:{
      1:['IMA-03'],2:['IMA-02','IMA-04'],3:['IMA-03'],4:['IMA-01','IMA-03'],6:['IMA-01','IMA-02'],
      7:['IMA-01','IMA-02'],8:['IMA-02','IMA-03'],9:['IMA-03'],10:['IMA-01','IMA-03'],13:['IMA-01','IMA-02'],
      15:['IMA-03'],16:['IMA-03'],17:['IMA-01','IMA-02','IMA-03']
    }
  }
];
