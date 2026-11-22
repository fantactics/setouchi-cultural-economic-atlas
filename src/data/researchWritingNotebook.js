// Curated and incrementally updated findings for future SETOUCHI ATLAS essays.
// A finding is a reading of the linked evidence, not a universally proved law.
// Each new essay may add a new topic or revise an existing one.
export const notebookUpdated = '2026-11-22';
export const notebookPrinciples = [
  [
    "風景の疑問から始める",
    "地名や理論の分類を先に決めず、現地に見える不思議な形や営みから問いを立てる。"
  ],
  [
    "自然と人間の関係を、時間の中で読む",
    "地形・海・気候などの変化と、それに対する人々の選択・改変を重ねる。"
  ],
  [
    "証拠と比較で確かめる",
    "史料、行政資料、地図、航空写真、統計、現地観察を照合する。事実・解釈・仮説を分ける。"
  ],
  [
    "予想外の発見を歓迎する",
    "既存の分析枠組みに合わない事例も捨てない。新しい証拠によって説明や分類を更新する。"
  ]
];
export const notebookEntries = [
  {
    "id": "straits",
    "title": "海峡と、目に見えない海底",
    "question": "潮が速い場所と渦が見える場所は、何が違うのか。",
    "finding": "狭い海峡では、潮位差、海峡の形、水深や海底の起伏などが潮の流れ方に関係する。航行条件や港の位置も、海図に見えない水の動きと結びついている。渦の有無を流速だけで説明しない。",
    "next": [
      "海釜の位置・形状と渦の発生域を、海底地形図・潮流資料・観測記録で重ねられるか。",
      "渦が見える日時や潮位差について、海峡間で同じ条件の記録を比較できるか。"
    ],
    "use": "海面に見える現象の奥に、水深・海底地形という別の景観を探す。",
    "essays": [
      [
        "地乗り・沖乗りから航路を読む",
        "jinori-okinori-navigation-system"
      ],
      [
        "潮と船がつくった鞆の港",
        "tomo-two-act-tidal-port"
      ]
    ],
    "research": [
      [
        "地形・地理構造",
        "geography"
      ],
      [
        "錨地という見えない港",
        "anchorage-network"
      ]
    ],
    "sources": []
  },
  {
    "id": "shore",
    "title": "動く海岸線と、その上にある町",
    "question": "いま陸続きの場所は、昔から陸だったのか。",
    "finding": "引田の砂州や城山の地形は、海と陸の境界が変化してきたことを考える手掛かりになる。自然による堆積と、人が水際へ加えた工事・利用を区別して追う必要がある。",
    "next": [
      "引田城山の陸繋化を年代資料や地層でどこまで限定できるか。",
      "小海川の流路変更と埋立・塩田の時期を旧地図と記録で接続できるか。"
    ],
    "use": "現在の地形を昔の海岸線と重ね、町が成立した時間の厚みを探す。",
    "essays": [
      [
        "引田の人々は、海が陸になる未来を見ていたか",
        "hiketa-castle-port-town"
      ],
      [
        "錦川が分けた岩国の町",
        "iwakuni-river-city"
      ]
    ],
    "research": [
      [
        "動的自然資本",
        "dynamic-natural-capital"
      ],
      [
        "地域別・動的自然資本",
        "regional-dynamic-natural-capital"
      ]
    ],
    "sources": [
      [
        "東かがわ市｜引田城跡",
        "https://www.higashikagawa.jp/soshikikarasagasu/shogaigakuka/gyomuannai/8/hiketa_z/992.html"
      ]
    ]
  },
  {
    "id": "salt",
    "title": "塩田のあとに残る、水を逃す仕事",
    "question": "産業が終わった土地で、何を止められずにいるのか。",
    "finding": "鹿忍の旧リゾートと錦海の太陽光発電所は、それぞれ異なる用途へ転換した塩田跡。両者を比べると、土地の再利用と、低地から水を排出し続ける責任とは切り離せない場合があることが見える。",
    "next": [
      "鹿忍の施設廃止・ポンプ停止の時期と管理主体を、一次資料で確認できるか。",
      "錦海の2038年以降について、排水施設の更新・費用・管理者の取り決めがどうなるか。"
    ],
    "use": "新しい建物や施設だけでなく、見えない維持管理の仕組みを調べる。",
    "essays": [
      [
        "鹿忍の水没ペンション村",
        "kashino-sunken-pension-village"
      ],
      [
        "錦海塩田跡地と太陽光発電所",
        "kinkai-salt-field-to-solar"
      ]
    ],
    "research": [
      [
        "塩田産業の地域資産継承",
        "salt-fields-legacy"
      ],
      [
        "錦海塩田跡地の2038年以降",
        "kinkai-solar-after-2038-note"
      ]
    ],
    "sources": [
      [
        "瀬戸内市｜錦海塩田跡地について",
        "https://www.city.setouchi.lg.jp/soshiki/21/3995.html"
      ]
    ]
  },
  {
    "id": "ports",
    "title": "港町をつくった「待つ時間」",
    "question": "港に船が来なくなっても、町に何が残ったのか。",
    "finding": "鞆、御手洗、多度津、尾道の比較では、潮待ち・寄港から生じた商いと都市のかたちは、その後の交通変化に対して異なる経路をたどった。港を一律に『衰退』と説明するより、残ったものを個別に追う方が具体的になる。",
    "next": [
      "港の位置と航路が変わった年代を、地図・港湾施設・航海資料でどこまで復元できるか。",
      "街並みに残る建物は、待機客向けの商売とどの程度結びついていたか。"
    ],
    "use": "石段、船宿、倉庫、寺などの現物から、当時の航路と暮らしを復元する。",
    "essays": [
      [
        "船が待たなくなったとき、港町には何が残ったのか",
        "ports-that-needed-waiting"
      ],
      [
        "信仰から昔の航路をたどる",
        "faith-as-transport-map"
      ]
    ],
    "research": [
      [
        "潮待ち港の機能転換",
        "waiting-ports-transition"
      ],
      [
        "錨地を含む港のネットワーク",
        "anchorage-network"
      ]
    ],
    "sources": [
      [
        "福山市｜鞆の浦の雁木",
        "https://www.city.fukuyama.hiroshima.jp/soshiki/kowankasen/179045.html"
      ]
    ]
  },
  {
    "id": "food",
    "title": "海の生き物から、地域の食卓まで",
    "question": "同じ海で獲れたものが、なぜ違う食文化になるのか。",
    "finding": "魚介の食文化は、生息環境だけで決まらない。獲り方、鮮度管理、加工、流通、料理、食べる場が重なり、産地の個性が形づくられる。牡蠣殻の行方も、食材を『食べた後』ではなく『食べる前』から考えると見え方が変わる。",
    "next": [
      "日生と広島湾の牡蠣の風味差は、海況・養殖手法・流通・調理を分けて比較できるか。",
      "牡蠣殻の発生量と地域ごとの再利用先を、同じ単位・年度で比較できるか。"
    ],
    "use": "食卓を入口に、生態系、加工現場、市場、廃棄物の流れまでたどる。",
    "essays": [
      [
        "日生と広島の牡蠣を食べ比べる",
        "oysters-taste-of-small-seas"
      ],
      [
        "20万立方メートルの牡蠣殻はどこへ",
        "oyster-shells-where-they-go"
      ]
    ],
    "research": [
      [
        "沿岸食資源の価値形成",
        "coastal-food-value-formation"
      ],
      [
        "食文化の再生産構造",
        "food-culture-reproduction"
      ]
    ],
    "sources": []
  },
  {
    "id": "craft",
    "title": "産業が姿を変えても残る技術",
    "question": "製品が変わったあと、町には何が残るのか。",
    "finding": "児島の繊維産業では、素材・服種の変化を通じて縫製などの能力が引き継がれてきた。今治の造船では、船の修繕、船主、資金、企業間分業も形成史を考える材料になる。ただし、この『能力継承』の見方は産業史に有効な一つの方法であって、すべての景観の説明原理ではない。",
    "next": [
      "児島の各業種間で、同じ企業・工場・職人・設備が実際に引き継がれた範囲はどこか。",
      "今治・波止浜の修繕から新造船への移行を示す個別の一次史料は何か。"
    ],
    "use": "製品や企業名だけでなく、設備、技能、人、買い手、港の機能をたどる。",
    "essays": [
      [
        "児島は、なぜジーンズの町になったのか",
        "kojima-from-cotton-to-jeans"
      ],
      [
        "今治で造船が生まれた理由",
        "imabari-why-shipbuilding"
      ]
    ],
    "research": [
      [
        "瀬戸内造船業の形成",
        "shipbuilding-system"
      ],
      [
        "産業の転換と能力継承",
        "setouchi-industrial-transformation"
      ]
    ],
    "sources": []
  },
  {
    "id": "islands",
    "title": "島の水と、見えない生活インフラ",
    "question": "島を支える水や下水は、どこから来てどこへ行くのか。",
    "finding": "直島では島内のダムだけでなく、岡山県側からの海底送水管が生活を支える。鴻島でも、居住者・別荘利用者・訪問者が使うインフラを人口だけで理解することは難しい。水道と下水は仕組みが別なので混同しない。",
    "next": [
      "直島の島内水源と海底送水の供給量・役割は時期によってどう変わったか。",
      "鴻島の上水、浄化槽、汲み取り、公共設備の実際の利用分担を確認できるか。"
    ],
    "use": "景観に見えない管・設備・管理主体を追うことで、島の暮らしが広域につながる姿を明かす。",
    "essays": [
      [
        "直島の水は、海を渡ってくる",
        "naoshima-water-across-sea"
      ],
      [
        "鴻島の水道と下水の話",
        "kojima-island-infrastructure-per-capita"
      ]
    ],
    "research": [
      [
        "人口ではなく島の利用強度を測る",
        "island-use-intensity"
      ],
      [
        "少雨地域の水貯留・配分制度",
        "water-storage-allocation"
      ]
    ],
    "sources": [
      [
        "直島町｜水道ビジョン",
        "https://www.town.naoshima.lg.jp/torikumi/suido/item/nsb.pdf"
      ]
    ]
  },
  {
    "id": "towns",
    "title": "町並みの裏側にある仕事と物流",
    "question": "白壁や寺の並ぶ町は、どんな仕事で育ったのか。",
    "finding": "柳井の白壁の背後には木綿・菜種油の流通や加工があり、尾道の寺の集積も港湾・都市形成の長い歴史と切り離せない。『美しい古い町』という説明にとどめず、何が運ばれ、誰が働いた場所かまで掘り下げると固有性が見える。",
    "next": [
      "柳井の小田家が担った流通・加工の実態を、土地や建物の配置と史料からもっと細かく復元できるか。",
      "尾道の寺院集積・宗派構成と、商人・海運・都市拡大の関係を時代別に確かめられるか。"
    ],
    "use": "町家の表側だけでなく、蔵・水路・加工場・路地・寺と港の位置関係を見る。",
    "essays": [
      [
        "柳井の白壁と木綿・油の流通",
        "yanai-trade-profit-to-whitewalls"
      ],
      [
        "港と寺の町・尾道の成り立ち",
        "onomichi-capital-to-culture-and-ships"
      ]
    ],
    "research": [
      [
        "港湾機能と都市資産の転換",
        "port-node-urban-assets"
      ],
      [
        "町並み保存の実際",
        "townscape-preservation"
      ]
    ],
    "sources": []
  }
];
export const notebookArchiveGroups = [
  {
    "title": "海・地形・水を調べる",
    "kind": "regional",
    "items": [
      [
        "動的自然資本",
        "dynamic-natural-capital"
      ],
      [
        "自然資本は自然に変わり続ける",
        "dynamic-natural-systems"
      ],
      [
        "変動する自然への人間の応答",
        "human-response-to-dynamic-nature"
      ],
      [
        "地域別・動的自然資本（比較）",
        "regional-dynamic-natural-capital"
      ],
      [
        "地域比較の初期試行",
        "regional-dynamic-natural-capital-pilot"
      ],
      [
        "自然資本と暮らしの分析フレーム",
        "natural-capital-lifestyle-framework"
      ],
      [
        "少雨地域の水貯留・配分制度",
        "water-storage-allocation"
      ]
    ]
  },
  {
    "title": "港・航路の変化を調べる",
    "kind": "regional",
    "items": [
      [
        "見えない錨地のネットワーク",
        "anchorage-network"
      ],
      [
        "失われた地乗りの港",
        "disappeared-ports-network"
      ],
      [
        "港の結節機能と都市資産",
        "port-node-urban-assets"
      ],
      [
        "潮待ち港の機能転換",
        "waiting-ports-transition"
      ]
    ]
  },
  {
    "title": "塩田・土地・島の変化を調べる",
    "kind": "regional",
    "items": [
      [
        "小規模離島の利用強度",
        "island-use-intensity"
      ],
      [
        "地域資産の再生産構造",
        "regional-asset-reproduction"
      ],
      [
        "ネイチャーポジティブと土地利用",
        "setouchi-nature-positive"
      ],
      [
        "再自然化の試行",
        "strategic-renaturing-pilot-fields"
      ],
      [
        "再自然化の適地検討",
        "strategic-renaturing-screening-map"
      ],
      [
        "塩田が地域に残したもの",
        "salt-fields-legacy"
      ]
    ]
  },
  {
    "title": "海の食・生業を調べる",
    "kind": "regional",
    "items": [
      [
        "沿岸食資源の価値形成",
        "coastal-food-value-formation"
      ],
      [
        "食文化の再生産構造",
        "food-culture-reproduction"
      ],
      [
        "食文化再生産ダッシュボード",
        "food-culture-dashboard"
      ],
      [
        "瀬戸内海の生命の一年",
        "setouchi-life-year"
      ],
      [
        "地域資源循環",
        "regional-resource-circulation"
      ],
      [
        "食文化の自然環境基盤",
        "gastronomy-environment"
      ]
    ]
  },
  {
    "title": "産業・技術の系譜を調べる",
    "kind": "specialty",
    "items": [
      [
        "福山のデニム生地",
        "fukuyama-denim-genealogy"
      ],
      [
        "今治の海事産業集積",
        "imabari-maritime-cluster"
      ],
      [
        "産業転換と自然資本",
        "industrial-transformation-natural-capital-framework"
      ],
      [
        "産業研究の自然資本監査",
        "industry-natural-capital-audit"
      ],
      [
        "児島の繊維産業系譜",
        "kojima-textile-genealogy"
      ],
      [
        "呉の造船都市",
        "kure-state-led-industrial-transition"
      ],
      [
        "別子銅山と新居浜の産業",
        "niihama-industrial-genealogy"
      ],
      [
        "尾道・因島の造船技能",
        "onomichi-innoshima-skill-ecosystem"
      ],
      [
        "瀬戸内産業の転換と継承",
        "setouchi-industrial-transformation"
      ],
      [
        "瀬戸内造船の集積",
        "setouchi-shipbuilding-cluster"
      ],
      [
        "造船と自然資本",
        "shipbuilding-natural-capital-lifestyle"
      ],
      [
        "造船の再生産モデル",
        "shipbuilding-reproduction-models"
      ],
      [
        "造船業の形成と再生産",
        "shipbuilding-system"
      ],
      [
        "塩田から化学工業へ",
        "shunan-soda-chemical-genealogy"
      ],
      [
        "玉野の造船都市",
        "tamano-company-town-shipbuilding"
      ]
    ]
  },
  {
    "title": "町並みと保存・継承を調べる",
    "kind": "regional",
    "items": [
      [
        "町並みの保存と継続",
        "townscape-preservation"
      ],
      [
        "町並みの再生産条件",
        "townscape-reproduction-dashboard"
      ],
      [
        "町並みの維持管理データ",
        "townscape-reproduction-ledger"
      ]
    ]
  },
  {
    "title": "観光・AI・地域政策の専門分析",
    "kind": "specialty",
    "items": [
      [
        "AIデータセンターの立地と集積",
        "ai-datacenter-ecosystem"
      ],
      [
        "AIデータセンターと暮らし",
        "ai-datacenter-natural-capital-lifestyle"
      ],
      [
        "AIデータセンターの適地評価",
        "ai-datacenter-suitability-map"
      ],
      [
        "AIデータセンターの地域接続",
        "ai-datacenter-system"
      ],
      [
        "サイクル観光の経済捕捉",
        "cycle-tourism-capture"
      ],
      [
        "サイクルルートの効果測定",
        "cycle-tourism-counterfactual-kpi"
      ],
      [
        "サイクルツーリズムの評価法",
        "cycle-tourism-evaluation-protocol"
      ],
      [
        "自転車と地域の関係",
        "cycle-tourism-regional-impact"
      ],
      [
        "サイクル観光の時系列分析",
        "cycle-tourism-system"
      ],
      [
        "サイクル観光の前後比較",
        "cycle-tourism-timeseries"
      ],
      [
        "Physical AIのプレイヤー分布",
        "physical-ai-player-ecosystem"
      ],
      [
        "Physical AIの実用例",
        "physical-ai-usecase-map"
      ],
      [
        "瀬戸内AI産業集積の可能性",
        "setouchi-ai-cluster-physical-ai"
      ],
      [
        "電力と情報の地理",
        "setouchi-watt-bit-geography"
      ]
    ]
  },
  {
    "title": "初期資料・個別の補助ノート",
    "kind": "support",
    "items": [
      [
        "地形・地理構造",
        "geography"
      ],
      [
        "気候・水循環",
        "climate-water"
      ],
      [
        "生態系",
        "ecosystems"
      ],
      [
        "自然資源の生業化",
        "livelihoods"
      ],
      [
        "港・交易史",
        "ports-trade"
      ],
      [
        "地域の能力と蓄積",
        "capabilities"
      ],
      [
        "文化・信仰",
        "culture"
      ],
      [
        "食文化資料",
        "gastronomy"
      ],
      [
        "都市・集落形成",
        "cities"
      ],
      [
        "技術標準化と産業",
        "standardization"
      ],
      [
        "農地と太陽光の土地利用",
        "farmland-solar-land-use-note"
      ],
      [
        "錦海の2038年以降",
        "kinkai-solar-after-2038-note"
      ],
      [
        "AI時代の地域計画",
        "ai-regional-planning-adaptive-note"
      ],
      [
        "一潮五里の港湾網",
        "one-tide-five-ri-port-network"
      ],
      [
        "タダノと志度",
        "tadano-shido-industrial-ecosystem-note"
      ],
      [
        "三浦工業と松山",
        "miura-matsuyama-boiler-note"
      ]
    ]
  }
];
