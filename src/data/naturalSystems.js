export const naturalSystemProfiles = {
  onomichi: {
    summary:'尾道は、山と島が海へ迫る狭い都市空間と、多島海・尾道水道という海上交通環境の上に成立した地域です。平地の少なさは斜面市街地を生み、温暖少雨の気候は島嶼部の柑橘栽培と結びつきました。港・渡船・造船・観光は、この自然条件を別々の時代に使い直してきた結果として読みます。',
    chain:['山地・島嶼','狭い沿岸平地と尾道水道','港・渡船・斜面居住','交易・海運','造船・修繕','柑橘・観光','海事都市＋文化都市'],
    layers:[
      {title:'地形・地質',body:'市域の大半は山地で、島しょ部も急峻で平地が少ない。旧市街は尾道水道と山の斜面に挟まれた細長い土地に発達し、向島が対岸に近接する。',claim:'fact',href:'/setouchi-cultural-economic-atlas/transect/'},
      {title:'気候・水',body:'沿岸・島しょ部は温暖で降雨が比較的少ない瀬戸内型気候に属する。内陸部は温度較差が大きく、同じ市域でも海側と山側で条件が異なる。',claim:'fact',href:'/setouchi-cultural-economic-atlas/climate/'},
      {title:'海況・沿岸環境',body:'尾道水道という狭い海域と、多数の島が連続する内海環境が、対岸交通・海上物流・港湾利用を日常化させた。海と陸が近いこと自体が都市構造の前提になっている。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/wind-tide/'},
      {title:'生態系・資源',body:'温暖少雨の島嶼斜面ではレモン、八朔、温州ミカンなど柑橘栽培が展開した。向島ではわけぎも特産化し、海産物と農産物が近接する食資源構成をつくる。',claim:'fact',href:'/setouchi-cultural-economic-atlas/seafood/#place-onomichi'},
      {title:'生業・技術',body:'港湾交易、渡船、漁業、柑橘栽培に加え、海運・船舶修繕・造船の技能が蓄積した。自然条件そのものより、海を使い続ける技術とネットワークの継承が重要である。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/industry/'},
      {title:'人為改変',body:'狭い沿岸部に港、鉄道、道路、造船所、市街地を重ね、斜面にも住宅と寺社を展開してきた。限られた平地を高密度に使う都市化が、現在の景観と交通制約の双方を生んだ。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/land-use/'},
      {title:'現在への継承',body:'海事産業、島嶼農業、渡船、斜面景観、寺社・町並み、サイクリング観光が同じ海峡都市の上に重なる。自然条件は変わらなくても、その使い方が時代ごとに更新されている。',claim:'interpretation',href:null}
    ],
    sources:[
      {label:'尾道市の概要',publisher:'尾道市',url:'https://www.city.onomichi.hiroshima.jp/soshiki/2/2977.html'},
      {label:'尾道市街地の観光は公共交通機関で',publisher:'尾道市',url:'https://www.city.onomichi.hiroshima.jp/site/onomichikanko/49732.html'},
      {label:'尾道市歴史的風致維持向上計画',publisher:'尾道市',url:'https://www.city.onomichi.hiroshima.jp/uploaded/attachment/43318.pdf'}
    ]
  },

  tomonoura: {
    summary:'鞆の浦は、沼隈半島の先端で山が海へ迫る小さな港町です。東西から進む潮が沖合で出会い、島々が波を遮る位置は、帆船時代には「潮を待つ」ための好条件でした。その航海上の制約が滞在需要を生み、港湾施設、商業、酒造、鍛冶、漁業へ展開しました。',
    chain:['半島先端・急斜面','潮流の結節＋島の遮蔽','天然港','潮待ち・停泊','商業・酒造・鍛冶・漁業','港湾施設・高密度市街','歴史港湾景観＋観光・漁業'],
    layers:[
      {title:'地形・地質',body:'鞆は沼隈半島の東南端にあり、急峻な山地が海岸近くまで迫る。平地が少ないため、港の背後に町家が高密度に集まる都市形態となった。',claim:'fact',href:'/setouchi-cultural-economic-atlas/transect/'},
      {title:'気候・水',body:'瀬戸内海中央部の内海性環境にあり、河川平野よりも海と斜面の関係が地域形成を強く規定する。生活・産業の水利用は限られた平地と港町空間の中で組み立てられてきた。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/climate/'},
      {title:'海況・沿岸環境',body:'紀伊水道側と豊後水道側から進む満ち潮が鞆沖で出会い、潮の切替を待つ必要があった。仙酔島など周辺の島々は波を遮り、停泊に適した港湾条件をつくった。',claim:'fact',href:'/setouchi-cultural-economic-atlas/wind-tide/'},
      {title:'生態系・資源',body:'複雑な潮流、干満、海底の深浅、水温などが多様な魚類の生息環境をつくり、鯛をはじめとする沿岸漁業資源を支えた。',claim:'fact',href:'/setouchi-cultural-economic-atlas/seafood/#place-tomonoura'},
      {title:'生業・技術',body:'潮待ち・風待ちの船を相手にした商業や宿泊、酒造、鍛冶が集積し、海では鯛網など地域固有の漁法が発達した。航海の摩擦をサービスと技術へ変換した町と読める。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/industry/'},
      {title:'人為改変',body:'雁木、波止、常夜燈など、干満と波に対応する港湾施設が整備された。自然港をそのまま利用したのではなく、航海と荷役に合わせて海岸線を継続的に作り替えてきた。',claim:'fact',href:'/setouchi-cultural-economic-atlas/land-use/'},
      {title:'現在への継承',body:'帆船交通の衰退後も、港湾施設、町家、漁業、保命酒などが歴史資産・生活文化として残る。現在の観光価値は、かつての停泊経済が残した都市ストックの再利用でもある。',claim:'interpretation',href:null}
    ],
    sources:[
      {label:'鞆町の歴史（位置と自然）',publisher:'福山市',url:'https://www.city.fukuyama.hiroshima.jp/soshiki/kowankasen/179016.html'},
      {label:'鞆の浦について',publisher:'福山市',url:'https://www.city.fukuyama.hiroshima.jp/soshiki/kanko/85750.html'},
      {label:'日本遺産 福山 鞆の浦について',publisher:'福山市',url:'https://www.city.fukuyama.hiroshima.jp/soshiki/kowankasen/179954.html'}
    ]
  },

  takehara: {
    summary:'竹原は、三方を山に囲まれ、賀茂川が瀬戸内海へ注ぐ河口域に形成された町です。近世には竹原湾を干拓し、潮の満ち引きを利用する入浜式塩田を造成しました。自然条件を利用するだけでなく、海を土地と生産設備へ作り替えたことが、塩・廻船・酒造・町並みへ連鎖しました。',
    chain:['山地＋賀茂川河口','竹原湾の沿岸低地','干拓','入浜式塩田','製塩＋廻船＋酒造','商人資本・町家','保存町並み＋酒造文化'],
    layers:[
      {title:'地形・地質',body:'竹原市は沿岸部で三方を山に囲まれ、市域中央を賀茂川が南北に流れて瀬戸内海へ注ぐ。河川下流と海岸部の限られた平地が都市・農地・産業用地となった。',claim:'fact',href:'/setouchi-cultural-economic-atlas/transect/'},
      {title:'気候・水',body:'温暖な瀬戸内海沿岸の気候にあり、賀茂川流域では上・中流の田畑と下流域の農地が連続する。河川と海の双方を利用できることが地域資源の幅を広げた。',claim:'fact',href:'/setouchi-cultural-economic-atlas/climate/'},
      {title:'海況・沿岸環境',body:'賀茂川河口の竹原湾では、潮の満ち引きを利用できる沿岸環境が製塩技術と結びついた。遠浅の海を生産空間へ転換した点が地域形成の転機となった。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/wind-tide/'},
      {title:'生態系・資源',body:'河川流域の農地、瀬戸内海の海水、沿岸低地という異なる資源が近接する。竹原では海水そのものを塩という交易商品へ変換したことが特に大きい。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/seafood/#place-takehara'},
      {title:'生業・技術',body:'干拓と入浜式塩田による製塩を基盤に、廻船業や酒造業などの多角経営が発達した。塩づくりの利益だけでなく、物流と加工へ事業を広げたことが町の富を厚くした。',claim:'fact',href:'/setouchi-cultural-economic-atlas/industry/'},
      {title:'人為改変',body:'竹原湾の干拓は、海を塩田と市街地へ変える大規模な土地改変だった。自然環境を利用したというより、潮汐を制御しながら新しい生産基盤を造成した事例と位置づけられる。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/land-use/'},
      {title:'現在への継承',body:'製塩で形成された富は町家や蔵へ投資され、酒造文化とともに現在の保存地区へ継承された。産業が消えても、資本が固定された建築・町割りが地域資産として残る。',claim:'interpretation',href:null}
    ],
    sources:[
      {label:'市のプロフィール',publisher:'竹原市',url:'https://www.city.takehara.lg.jp/soshikikarasagasu/kikakuseisakuka/gyomuannai/16/2369.html'},
      {label:'竹原市歴史的風致維持向上計画について',publisher:'竹原市',url:'https://www.city.takehara.lg.jp/soshikikarasagasu/bunkashogaigakushuka/gyomuannai/9/1548.html'},
      {label:'竹原市竹原地区伝統的建造物群保存地区',publisher:'竹原市',url:'https://www.city.takehara.lg.jp/kanko_bunka_sports/rekishi_bunkazai/bunkazai/5/2934.html'}
    ]
  },

  mitarai: {
    summary:'御手洗は、大崎下島の山裾と海岸の間にあるごく狭い平地に形成された港町です。沖合の天然港が潮待ち・風待ちに適していたため船が滞在し、その需要に応える商家、茶屋、船宿が集まりました。土地不足には埋立で対応し、港湾施設と町割りそのものが海上交通への適応の記録になっています。',
    chain:['島の急斜面＋狭い平地','天然港','潮待ち・風待ち','船の滞在','商家・茶屋・船宿','埋立＋港湾土木','伝建地区＋柑橘＋サイクル観光'],
    layers:[
      {title:'地形・地質',body:'大崎下島では山裾と海岸に挟まれたわずかな平坦地に集落が密集する。御手洗も平地が極めて限られ、海と斜面の距離が短い島嶼集落である。',claim:'fact',href:'/setouchi-cultural-economic-atlas/transect/'},
      {title:'気候・水',body:'瀬戸内の島嶼気候と斜面地は柑橘栽培に利用され、大長みかんをはじめとするみかん・レモン類が地域の主要な農業資源となった。',claim:'fact',href:'/setouchi-cultural-economic-atlas/climate/'},
      {title:'海況・沿岸環境',body:'御手洗沖は潮待ち・風待ちに適した天然の良港として注目され、西廻り航路の発展とともに中継港として成長した。海上交通上の「待つ必要」が立地価値を生んだ。',claim:'fact',href:'/setouchi-cultural-economic-atlas/wind-tide/'},
      {title:'生態系・資源',body:'海上交通に適した港湾条件と、背後斜面の柑橘農地という二つの資源利用が併存する。港町の経済と島の農業は、狭い土地の中で別々の高度利用として成立した。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/seafood/#place-mitarai'},
      {title:'生業・技術',body:'船の停泊に伴う商業、茶屋、船宿、荷役などの港湾サービスが発達し、近代以降は柑橘栽培も地域経済を支えた。交通サービスと斜面農業という異なる生業が島の条件に適応した。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/industry/'},
      {title:'人為改変',body:'土地不足を補うため地区は数度にわたり埋め立てられ、大波止、石橋、高燈籠、石垣護岸、雁木など港湾土木が整備された。町の地形そのものが人為的に拡張されている。',claim:'fact',href:'/setouchi-cultural-economic-atlas/land-use/'},
      {title:'現在への継承',body:'交通体系の変化で中継港機能は衰退したが、町割りと建築・港湾遺構が残り、重要伝統的建造物群保存地区、柑橘産地、とびしま海道の観光資源として再利用されている。',claim:'interpretation',href:null}
    ],
    sources:[
      {label:'御手洗町並み保存地区',publisher:'呉市',url:'https://www.city.kure.lg.jp/soshiki/67/m000200.html'},
      {label:'呉市豊町御手洗伝統的建造物群保存地区',publisher:'呉市',url:'https://www.city.kure.lg.jp/site/bunkazai/kunijyudenken-1.html'},
      {label:'呉市都市計画マスタープラン',publisher:'呉市',url:'https://www.city.kure.lg.jp/uploaded/attachment/19858.pdf'}
    ]
  },

  shimotsui: {
    summary:'下津井は、児島半島南端の丘陵と瀬戸内海の島々に面した港町です。海上交通の結節点として北前船や四国への渡海客を受け入れ、背後の児島では干拓地に綿が育ちました。港が肥料を入れ、綿・塩・繊維製品を外へ出すことで、海運と内陸生産が一つの地域経済を形成しました。',
    chain:['児島丘陵＋瀬戸内海','港＋島しょ海域','北前船・渡海','肥料搬入','干拓地の綿・塩＋漁業','繊維産業・港町商業','漁港＋デニム産地＋瀬戸大橋観光'],
    layers:[
      {title:'地形・地質',body:'児島地域は標高300m以下の丘陵と、干拓・塩田造成で形成された平地から成る。下津井はその南端で、丘陵が海へ迫り、沖合に島々が点在する。',claim:'fact',href:'/setouchi-cultural-economic-atlas/transect/'},
      {title:'気候・水',body:'児島諸島を含む沿岸部は典型的な瀬戸内海気候に属する。降水の少ない環境と遠浅の沿岸低地は、歴史的に塩田や干拓地利用と結びついた。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/climate/'},
      {title:'海況・沿岸環境',body:'瀬戸内航路と四国への渡海点に位置し、下津井は船舶と旅客の結節港となった。現在は瀬戸大橋が同じ海峡部を跨ぎ、交通結節の形が海路から橋へ更新されている。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/wind-tide/'},
      {title:'生態系・資源',body:'下津井沿岸ではマダコ、イイダコ、サッパなどが主要な水産資源となり、タコ飯や干しダコなどの食文化につながった。海産物は「下津井直送」の地域ブランドとしても扱われる。',claim:'fact',href:'/setouchi-cultural-economic-atlas/seafood/#place-shimotsui'},
      {title:'生業・技術',body:'北前船による交易、漁業、塩業に加え、背後の児島では干拓地の綿作から織布・縫製へ展開した。港は肥料を搬入し、綿・塩・繊維製品を移出する物流装置として機能した。',claim:'fact',href:'/setouchi-cultural-economic-atlas/textiles/'},
      {title:'人為改変',body:'児島では干拓と塩田造成によって海域が農地・生産用地へ変えられた。近代以降は市街地化・工業化が進み、さらに瀬戸大橋建設が海峡景観と交通構造を大きく変更した。',claim:'interpretation',href:'/setouchi-cultural-economic-atlas/land-use/'},
      {title:'現在への継承',body:'港町景観と漁業、児島の繊維・デニム産業、瀬戸大橋観光が重なる。帆船交易は終わっても、海と後背地を結ぶ機能は商品・交通手段を変えながら残っている。',claim:'interpretation',href:null}
    ],
    sources:[
      {label:'倉敷市の日本遺産ストーリー',publisher:'倉敷市',url:'https://www.city.kurashiki.okayama.jp/culture/tourism/1002215/1013347/index.html'},
      {label:'下津井保存地区について',publisher:'倉敷市',url:'https://www.city.kurashiki.okayama.jp/culture/art/1007596/1007818/1007890/1011524.html'},
      {label:'倉敷市の生物多様性の現状と課題（児島地域）',publisher:'倉敷市',url:'https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/010/841/3syou.pdf'}
    ]
  }
};
