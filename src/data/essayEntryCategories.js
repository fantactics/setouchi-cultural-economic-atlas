// Reader-facing discovery entrances. The original article.part remains the editorial thesis.
// First id is the primary entrance; following ids give additional ways to discover the same essay.
export const essayEntryCategories = [
  {
    "id": "food",
    "label": "食文化",
    "description": "郷土料理、魚介、加工食品。食卓から土地の物語へ。"
  },
  {
    "id": "townscape",
    "label": "歴史的町並み",
    "description": "伝建地区、商家、白壁、城下町。残された建物を歩く。"
  },
  {
    "id": "agriculture",
    "label": "農業景観",
    "description": "みかん畑、干拓地、ため池、農村。耕す風景の成り立ち。"
  },
  {
    "id": "industry",
    "label": "工業景観",
    "description": "造船、製塩、繊維、工場。ものづくりの現場を眺める。"
  },
  {
    "id": "ports",
    "label": "港と船",
    "description": "船着き場、港湾、航路、雁木。海から町へ入る。"
  },
  {
    "id": "sea",
    "label": "海と島",
    "description": "海峡、潮流、多島海、島の暮らし。自然の姿をたどる。"
  },
  {
    "id": "tourism",
    "label": "観光景観",
    "description": "観光地、サイクリング、別荘地。旅人が訪れる風景。"
  },
  {
    "id": "urban",
    "label": "都市景観",
    "description": "駅、商店街、橋、市街地。町の形と変化を眺める。"
  }
];

export const essayEntryBySlug = {
  "four-salt-fields": [
    "industry",
    "townscape"
  ],
  "kojima-from-cotton-to-jeans": [
    "industry",
    "agriculture"
  ],
  "ports-that-needed-waiting": [
    "ports",
    "townscape"
  ],
  "imabari-why-shipbuilding": [
    "industry",
    "ports"
  ],
  "niihama-after-copper": [
    "industry",
    "urban"
  ],
  "shodoshima-open-island": [
    "food",
    "agriculture"
  ],
  "faith-as-transport-map": [
    "ports",
    "townscape"
  ],
  "sanuki-store-the-rain": [
    "agriculture",
    "urban"
  ],
  "iwakuni-river-city": [
    "urban",
    "townscape"
  ],
  "onomichi-capital-to-culture-and-ships": [
    "townscape",
    "industry",
    "ports"
  ],
  "takehara-salt-capital-to-townscape": [
    "townscape",
    "industry"
  ],
  "mitarai-economy-of-waiting": [
    "townscape",
    "ports",
    "tourism"
  ],
  "shimonoseki-resource-made-by-market": [
    "food",
    "ports"
  ],
  "yanai-trade-profit-to-whitewalls": [
    "townscape",
    "ports"
  ],
  "mihara-castle-to-multimodal-city": [
    "urban",
    "townscape"
  ],
  "matsuyama-three-centers-one-city": [
    "urban",
    "ports"
  ],
  "hiketa-castle-port-town": [
    "townscape",
    "ports"
  ],
  "ako-after-salt-fields": [
    "industry",
    "urban"
  ],
  "takamatsu-sea-castle-to-gateway": [
    "urban",
    "ports"
  ],
  "tai-meshi-two-seas": [
    "food",
    "sea"
  ],
  "shimotsui-tako-meshi": [
    "food",
    "ports"
  ],
  "oysters-taste-of-small-seas": [
    "sea",
    "food"
  ],
  "hijiki-tidal-time": [
    "sea",
    "food"
  ],
  "mikan-slope-and-varieties": [
    "agriculture",
    "food"
  ],
  "oyster-shells-after-the-meal": [
    "industry",
    "sea"
  ],
  "sea-bream-scales-to-collagen": [
    "industry",
    "food"
  ],
  "fish-waste-to-feed-and-citrus": [
    "agriculture",
    "food"
  ],
  "olive-pomace-to-cattle": [
    "agriculture",
    "food"
  ],
  "soy-sauce-lees-to-chomeiso": [
    "agriculture",
    "food"
  ],
  "ibuki-fat-sardines-revalued": [
    "food",
    "sea"
  ],
  "citrus-pomace-cascade": [
    "agriculture",
    "food"
  ],
  "kinkai-salt-field-to-solar": [
    "industry",
    "sea"
  ],
  "sakaide-salt-fields-to-industry": [
    "industry",
    "sea"
  ],
  "ako-salt-fields-to-city": [
    "urban",
    "industry"
  ],
  "farmland-or-solar": [
    "agriculture",
    "industry"
  ],
  "after-the-solar-farm": [
    "industry",
    "urban"
  ],
  "tadano-shido-industrial-ecosystem": [
    "industry",
    "urban"
  ],
  "miura-matsuyama-small-boiler-revolution": [
    "industry",
    "urban"
  ],
  "sawara-spring-two-gates": [
    "sea",
    "food"
  ],
  "kada-sea-bream-one-line": [
    "food",
    "sea"
  ],
  "kitan-strait-tai-to-shirasu": [
    "food",
    "sea"
  ],
  "kada-sea-bream-distribution-ecosystem": [
    "food",
    "ports"
  ],
  "kada-steel-data-center-transition": [
    "industry",
    "urban"
  ],
  "what-cyclists-leave-behind": [
    "tourism",
    "sea"
  ],
  "shimotsui-hijiki-peperoncino": [
    "food",
    "sea"
  ],
  "tomo-two-act-tidal-port": [
    "ports",
    "townscape"
  ],
  "gangi-tide-port-functions": [
    "ports",
    "townscape"
  ],
  "jinori-okinori-navigation-system": [
    "ports",
    "sea"
  ],
  "kojima-jeans-circular-economy": [
    "industry",
    "urban"
  ],
  "kojima-island-infrastructure-per-capita": [
    "sea",
    "urban"
  ],
  "kojima-island-cycling-without-consumption": [
    "tourism",
    "sea"
  ],
  "kojima-island-bubble-villas-second-life": [
    "tourism",
    "sea"
  ],
  "setouchi-sushi-not-nigiri": [
    "food",
    "townscape"
  ],
  "setouchi-shrimp-middle-layer": [
    "sea",
    "food"
  ],
  "setouchi-life-year": [
    "sea",
    "food"
  ],
  "setouchi-itinerant-trade-boats": [
    "ports",
    "food"
  ],
  "setouchi-ship-materials": [
    "industry",
    "ports"
  ],
  "niboshi-shirasu-two-food-cultures": [
    "food",
    "ports"
  ],
  "ai-era-regional-planning-learning-velocity": [
    "urban",
    "tourism"
  ]
};

export const entryIdsForEssay = (article) => essayEntryBySlug[article.slug] || [];
export const essaysForEntrance = (articles, entranceId) => articles.filter((article) => entryIdsForEssay(article).includes(entranceId));
