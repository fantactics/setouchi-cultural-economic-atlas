const kojimaFromFerry={
  imageUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Kou%20island%20in%20Bizen%2C%20Okayama%2CJapan%20%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%82%99%E5%89%8D%E5%B8%82%E6%97%A5%E7%94%9F%E7%94%BA%E6%97%A5%E7%94%9F%2C%E9%B4%BB%E5%B3%B6%20380.JPG?width=1400',
  alt:'大生汽船から見た岡山県備前市日生町の鴻島',
  author:'松岡明芳',
  sourcePage:'https://commons.wikimedia.org/wiki/File:Kou_island_in_Bizen,_Okayama,Japan_%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%82%99%E5%89%8D%E5%B8%82%E6%97%A5%E7%94%9F%E7%94%BA%E6%97%A5%E7%94%9F,%E9%B4%BB%E5%B3%B6_380.JPG',
  license:'CC BY-SA 4.0',
  licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'
};

const kojimaAerial={
  imageUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/%E9%B4%BB%E5%B3%B6.jpg?width=1400',
  alt:'岡山県備前市鴻島の航空写真',
  author:'国土地理院（国土交通省 国土画像情報）',
  sourcePage:'https://commons.wikimedia.org/wiki/File:%E9%B4%BB%E5%B3%B6.jpg',
  license:'出典明記で利用可（国土画像情報）',
  licenseUrl:'https://commons.wikimedia.org/wiki/File:%E9%B4%BB%E5%B3%B6.jpg'
};

const hinaseBay={
  imageUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Hinase%20Bay%20Bizen%20Okayama%20pref%20Japan03n.jpg?width=1400',
  alt:'岡山県備前市日生町から見た日生湾',
  author:'663highland',
  sourcePage:'https://commons.wikimedia.org/wiki/File:Hinase_Bay_Bizen_Okayama_pref_Japan03n.jpg',
  license:'CC BY 2.5 / GFDL',
  licenseUrl:'https://creativecommons.org/licenses/by/2.5/'
};

export const essayPhotoGalleriesMore18={
  'kojima-island-infrastructure-per-capita':[
    {
      ...kojimaAerial,
      priority:100,
      title:'島全体｜人口ではなく、まず「ストックの大きさ」を見る',
      caption:'鴻島の航空写真。小さな島の斜面と海岸線に道路・住宅・港湾部が広がる。常住人口だけを見ても、維持すべき物理ストックの規模は分からない。',
      insight:'人口が減っても、道路・給水・港などのネットワークは同じ比率では縮まない。島の公共負担を考える出発点は、人口ではなく地形上に残る設備と住宅ストックである。'
    },
    {
      ...kojimaFromFerry,
      priority:99,
      title:'接続｜島の暮らしは、船着場から本土へつながる',
      caption:'大生汽船から見た鴻島。橋のない島では、住民・別荘利用者・物資・修繕資材のすべてが海上交通を経由する。',
      insight:'島内インフラだけでなく「本土との接続」も固定費の一部である。利用者が少なくても代替経路がなければ、維持の意味は単純な一人当たり費用では測れない。'
    }
  ],
  'kojima-island-cycling-without-consumption':[
    {
      ...kojimaFromFerry,
      priority:100,
      title:'入口｜自転車旅も、まず船で島へ入る',
      caption:'本土から鴻島へ渡る海上交通。島のサイクリングは、道路だけでなく船への自転車積載や発着時間によって体験の自由度が決まる。',
      insight:'シクロツーリズムのインフラはサイクルルートだけではない。船・待合・荷物・給水・休憩の接続設計まで含めて初めて、島での滞在を延ばせる。'
    },
    {
      ...hinaseBay,
      priority:99,
      title:'景観｜日生湾そのものが強い観光資源になる',
      caption:'日生湾と島々の眺め。自転車との相性がよい景観資源があっても、それだけでは島内の飲食・買物・宿泊消費は自動的には生まれない。',
      insight:'「走りたい風景」と「お金を使う場所」は別物である。鴻島は、来訪者数と地域所得を分けて評価する必要性を端的に示す。'
    }
  ],
  'kojima-island-bubble-villas-second-life':[
    {
      ...kojimaFromFerry,
      priority:100,
      title:'別荘島｜斜面の住宅群が、島の景観そのものになった',
      caption:'海上から見た鴻島。島の特徴は自然景観だけではなく、バブル期までに形成された大量の別荘ストックが斜面景観を構成していることにある。',
      insight:'別荘価格が下がっても建物と眺望は残る。金融資産としての価値が低下すると、同じストックを別の所得層・別の用途が使える余地が生まれる。'
    },
    {
      ...kojimaAerial,
      priority:99,
      title:'ストック｜価格が崩れても、土地と建物は島に残る',
      caption:'航空写真で見る鴻島。バブル後に市場価格が下落しても、造成地・道路・住宅という物理ストックは消えず、次の利用者を待つ。',
      insight:'「バブル遺産」を失敗の残骸とだけ見ると、価格低下が生む新しい参入可能性を見落とす。重要なのは元値への回復ではなく、誰がどう使い直すかである。'
    }
  ],
  'kojima-island-when-ruins-are-not-a-problem':[
    {
      ...kojimaAerial,
      priority:100,
      title:'距離｜空き家の意味は、周囲との関係で変わる',
      caption:'鴻島の航空写真。住宅が斜面に分散する島では、未利用建物が密集市街地にある場合と、周囲から離れて存在する場合とで外部不経済の大きさが異なる。',
      insight:'「空き家である」という属性だけでは公共介入の必要性は決まらない。倒壊先、道路への影響、隣家との距離、消防・インフラ負担まで含めて判断する必要がある。'
    },
    {
      ...kojimaFromFerry,
      priority:99,
      title:'景観｜使われない建物があっても、島全体がただちに「問題」になるわけではない',
      caption:'海から見る鴻島。住宅・別荘・緑地が混在する島では、利用中の建物と低利用の建物が同じ景観の中に共存する。',
      insight:'地域政策で問うべきなのは未利用資産の数ではなく、第三者へどの程度の損失や行政負担を発生させているかである。'
    }
  ]
};
