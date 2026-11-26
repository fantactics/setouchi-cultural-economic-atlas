// Reader-facing geographic index. Existing research profiles are retained separately.
import { atlasPlaces } from './additionalPlaces.js';
import { publishedEssays } from './publishedEssayList.js';
import { photoEvidence } from './photoEvidence.js';
import { additionalPlacePhotos } from './additionalPlacePhotos.js';
import { essayIndexPhotoOverrides } from './essayIndexPhotos.js';

const photoById=Object.fromEntries([...photoEvidence,...Object.values(additionalPlacePhotos).flat()].map(p=>[p.id,p]));
export const regionCoverPhotoIds={kada:'photo-kada-kitan-strait',akashi:'photo-akashi-strait-bridge',ako:'photo-ako-salt-terrace',hinase:'photo-hinase-bay',ushimado:'photo-ushimado-islands',shimotsui:'photo-shimotsui-geography',tomonoura:'photo-tomonoura-port',onomichi:'photo-onomichi-panorama',mihara:'photo-mihara-castle-station',takehara:'photo-takehara-view',mitarai:'photo-mitarai-panorama',iwakuni:'photo-iwakuni-kintai',yanai:'photo-yanai-whitewall',hofu:'photo-hofu-salt-official',shimonoseki:'photo-shimonoseki-kanmon',naruto:'photo-naruto-whirlpool',hiketa:'photo-hiketa-townscape',shodoshima:'photo-shodoshima-olive-sea',takamatsu:'photo-takamatsu-seawater-moat',sakaide:'photo-sakaide-bannosu-aerial',tadotsu:'photo-tadotsu-station',niihama:'photo-niihama-tonaru',imabari:'photo-imabari-kurushima',matsuyama:'photo-matsuyama-city-view'};
const regionTeasers={
  kada:'速い潮の向こうに、漁と祈りの町がある。',
  akashi:'海峡の魚と、城下町のにぎわい。',
  ako:'塩田の跡から、工場のある町へ。',
  hinase:'牡蠣筏の下で、海の仕事が変わっていく。',
  ushimado:'島々を望む港に、朝鮮通信使が訪れた。',
  shimotsui:'北前船と干しダコの港へ。',
  tomonoura:'潮を待つ船が、港町を育てた。',
  onomichi:'海と坂のあいだに、町がぎゅっと詰まる。',
  mihara:'新幹線の駅の下に、城がある。',
  takehara:'塩づくりの富が、白壁の町並みへ。',
  mitarai:'船を待つ時間が、商いになった。',
  iwakuni:'五つのアーチの向こうに、城下町。',
  yanai:'白壁の路地に、港の商いが残る。',
  hofu:'塩田と北前船が出会った海辺。',
  shimonoseki:'海峡の潮が、魚と人を集めてきた。',
  naruto:'渦潮の海から、わかめと塩の物語へ。',
  hiketa:'小さな港に、城と醤油の時間が残る。',
  shodoshima:'オリーブ、醤油、そうめん。島は味の宝箱。',
  takamatsu:'海に開いた城から、四国の玄関口へ。',
  sakaide:'塩田の跡に、工場と大きな橋が現れた。',
  tadotsu:'船の港から、こんぴらへ続く鉄道へ。',
  niihama:'山の銅が、海辺の工場を育てた。',
  imabari:'急流の海峡と造船の町。タオルも忘れずに。',
  matsuyama:'城下町、道後温泉、港。三つの顔を歩く。'
};
const legacyGroups={
  "mainland": [
    "kada",
    "akashi",
    "ako",
    "hinase",
    "ushimado",
    "shimotsui",
    "tomonoura",
    "onomichi",
    "mihara",
    "takehara",
    "iwakuni",
    "yanai",
    "hofu",
    "shimonoseki"
  ],
  "islands": [
    "shodoshima",
    "mitarai"
  ],
  "shikoku": [
    "naruto",
    "hiketa",
    "takamatsu",
    "sakaide",
    "tadotsu",
    "niihama",
    "imabari",
    "matsuyama"
  ]
};
const legacyLinks={
  "kada": [
    [
      "加太",
      "和歌山・加太"
    ],
    [
      "kada-sea-bream-one-line",
      "kitan-strait-tai-to-shirasu",
      "kada-steel-data-center-transition"
    ]
  ],
  "akashi": [
    [
      "明石"
    ],
    [
      "setouchi-250-submarine-caldrons",
      "tai-meshi-two-seas"
    ]
  ],
  "ako": [
    [
      "赤穂"
    ],
    [
      "ako-after-salt-fields"
    ]
  ],
  "hinase": [
    [
      "日生"
    ],
    [
      "oysters-taste-of-small-seas",
      "sawara-spring-two-gates",
      "kojima-island-infrastructure-per-capita"
    ]
  ],
  "ushimado": [
    [
      "牛窓",
      "鹿忍",
      "錦海湾",
      "邑久",
      "瀬戸内市",
      "長浜"
    ],
    [
      "kinkai-salt-field-to-solar",
      "kashino-sunken-pension-village",
      "ushimado-nagahama-kinkai-two-reclaimed-landscapes",
      "gangi-tide-port-functions"
    ]
  ],
  "shimotsui": [
    [
      "下津井"
    ],
    [
      "kojima-from-cotton-to-jeans",
      "shimotsui-tako-meshi"
    ]
  ],
  "tomonoura": [
    [
      "鞆の浦",
      "鞆",
      "福山・鞆の浦",
      "福山"
    ],
    [
      "tomo-two-act-tidal-port",
      "gangi-tide-port-functions",
      "jinori-okinori-navigation-system",
      "setouchi-ship-materials",
      "tai-meshi-two-seas"
    ]
  ],
  "onomichi": [
    [
      "尾道"
    ],
    [
      "onomichi-capital-to-culture-and-ships",
      "jinori-okinori-navigation-system",
      "what-cyclists-leave-behind"
    ]
  ],
  "mihara": [
    [
      "三原"
    ],
    [
      "mihara-castle-to-multimodal-city"
    ]
  ],
  "takehara": [
    [
      "竹原"
    ],
    [
      "takehara-salt-capital-to-townscape"
    ]
  ],
  "mitarai": [
    [
      "御手洗",
      "大崎下島"
    ],
    [
      "mitarai-economy-of-waiting",
      "faith-as-transport-map",
      "jinori-okinori-navigation-system",
      "gangi-tide-port-functions",
      "what-cyclists-leave-behind"
    ]
  ],
  "iwakuni": [
    [
      "岩国"
    ],
    [
      "iwakuni-river-city"
    ]
  ],
  "yanai": [
    [
      "柳井"
    ],
    [
      "yanai-trade-profit-to-whitewalls"
    ]
  ],
  "hofu": [
    [
      "防府",
      "防府（三田尻）",
      "三田尻"
    ],
    []
  ],
  "shimonoseki": [
    [
      "下関"
    ],
    [
      "shimonoseki-resource-made-by-market"
    ]
  ],
  "naruto": [
    [
      "鳴門"
    ],
    [
      "setouchi-250-submarine-caldrons",
      "tai-meshi-two-seas"
    ]
  ],
  "hiketa": [
    [
      "引田"
    ],
    [
      "hiketa-castle-port-town"
    ]
  ],
  "shodoshima": [
    [
      "小豆島",
      "土庄",
      "池田"
    ],
    [
      "shodoshima-open-island",
      "shodoshima-somen-to-sesame-oil",
      "olive-pomace-to-cattle"
    ]
  ],
  "takamatsu": [
    [
      "高松"
    ],
    [
      "takamatsu-sea-castle-to-gateway",
      "sanuki-store-the-rain"
    ]
  ],
  "sakaide": [
    [
      "坂出",
      "坂出・王越"
    ],
    [
      "sakaide-salt-fields-to-industry",
      "tai-meshi-two-seas"
    ]
  ],
  "tadotsu": [
    [
      "多度津"
    ],
    []
  ],
  "niihama": [
    [
      "新居浜",
      "別子",
      "東平"
    ],
    [
      "niihama-after-copper"
    ]
  ],
  "imabari": [
    [
      "今治",
      "波止浜",
      "来島海峡"
    ],
    [
      "imabari-why-shipbuilding",
      "kurushima-tides-and-navigation",
      "what-cyclists-leave-behind",
      "tai-meshi-two-seas"
    ]
  ],
  "matsuyama": [
    [
      "松山",
      "松山・北条"
    ],
    [
      "matsuyama-three-centers-one-city",
      "tai-meshi-two-seas",
      "setouchi-itinerant-trade-boats",
      "setouchi-sushi-not-nigiri"
    ]
  ]
};
const seedPlaces=[
  {
    "id": "awaji",
    "name": "淡路島",
    "prefecture": "兵庫県",
    "group": "islands",
    "lat": 34.4,
    "lon": 134.84,
    "aliases": [
      "南あわじ"
    ],
    "subtitle": "田んぼで育つ玉ねぎと、海人が祀った神。",
    "photoId": "photo-awaji-onion-rice-field",
    "photoEssay": null,
    "essaySlugs": [
      "awaji-onion-rice-field",
      "setouchi-sea-gods-and-power"
    ]
  },
  {
    "id": "tatsuno",
    "name": "龍野",
    "prefecture": "兵庫県",
    "group": "mainland",
    "lat": 34.87,
    "lon": 134.55,
    "aliases": [
      "たつの"
    ],
    "subtitle": "揖保川の水と、淡口醤油が育った城下町。",
    "photoId": null,
    "photoEssay": "tatsuno-water-castle-and-soy-sauce",
    "essaySlugs": [
      "tatsuno-water-castle-and-soy-sauce"
    ]
  },
  {
    "id": "kojima",
    "name": "児島",
    "prefecture": "岡山県",
    "group": "mainland",
    "lat": 34.47,
    "lon": 133.81,
    "aliases": [
      "倉敷・児島"
    ],
    "subtitle": "干拓地の綿作から、ジーンズの産地へ。",
    "photoId": "photo-kojima-jeans",
    "photoEssay": null,
    "essaySlugs": [
      "kojima-from-cotton-to-jeans",
      "kojima-jeans-circular-economy",
      "shimotsui-tako-meshi"
    ]
  },
  {
    "id": "kojima-bay",
    "name": "児島湾",
    "prefecture": "岡山県",
    "group": "mainland",
    "lat": 34.6,
    "lon": 133.98,
    "aliases": [],
    "subtitle": "四つ手網から、アキアミとママカリの海を読む。",
    "photoId": null,
    "photoEssay": null,
    "essaySlugs": [
      "setouchi-shrimp-middle-layer"
    ]
  },
  {
    "id": "hiroshima",
    "name": "広島・広島湾",
    "prefecture": "広島県",
    "group": "mainland",
    "lat": 34.34,
    "lon": 132.43,
    "aliases": [
      "広島",
      "広島市",
      "広島湾"
    ],
    "subtitle": "牡蠣筏と、牡蠣殻が向かう先。",
    "photoId": "photo-hiroshima-oyster-rafts",
    "photoEssay": null,
    "essaySlugs": [
      "oysters-taste-of-small-seas",
      "oyster-shells-where-they-go",
      "oyster-shells-after-the-meal"
    ]
  },
  {
    "id": "hinase-islands",
    "name": "日生諸島",
    "prefecture": "岡山県",
    "group": "islands",
    "lat": 34.69,
    "lon": 134.29,
    "aliases": [
      "大多府島",
      "鴻島"
    ],
    "subtitle": "水道と下水から、三つの島の暮らしを考える。",
    "photoId": null,
    "photoEssay": "kojima-island-infrastructure-per-capita",
    "essaySlugs": [
      "kojima-island-infrastructure-per-capita"
    ]
  },
  {
    "id": "naoshima",
    "name": "直島",
    "prefecture": "香川県",
    "group": "islands",
    "lat": 34.46,
    "lon": 134,
    "aliases": [],
    "subtitle": "暮らしと工場を支える、海を渡る水。",
    "photoId": null,
    "photoEssay": "naoshima-water-across-sea",
    "essaySlugs": [
      "naoshima-water-across-sea"
    ]
  },
  {
    "id": "ikuchijima",
    "name": "生口島・瀬戸田",
    "prefecture": "広島県",
    "group": "islands",
    "lat": 34.29,
    "lon": 133.1,
    "aliases": [
      "生口島",
      "瀬戸田"
    ],
    "subtitle": "レモン畑とレモン色の郵便ポスト。",
    "photoId": "photo-tatara-cycling-ikuchijima",
    "photoEssay": null,
    "essaySlugs": [
      "tatara-bridge-citrus-seasons"
    ]
  },
  {
    "id": "omishima",
    "name": "大三島",
    "prefecture": "愛媛県",
    "group": "islands",
    "lat": 34.25,
    "lon": 133.02,
    "aliases": [],
    "subtitle": "山の神と航海の神、島に残る武具。",
    "photoId": null,
    "photoEssay": "omishima-mountains-and-sea-faith",
    "essaySlugs": [
      "omishima-mountains-and-sea-faith",
      "setouchi-sea-gods-and-power",
      "what-cyclists-leave-behind"
    ]
  },
  {
    "id": "iwagijima",
    "name": "岩城島",
    "prefecture": "愛媛県",
    "group": "islands",
    "lat": 34.26,
    "lon": 133.15,
    "aliases": [
      "上島町"
    ],
    "subtitle": "塩田が終わったあと、海老を育てた島。",
    "photoId": null,
    "photoEssay": "iwagi-salt-pans-to-shrimp-ponds",
    "essaySlugs": [
      "iwagi-salt-pans-to-shrimp-ponds"
    ]
  },
  {
    "id": "hakatajima",
    "name": "伯方島",
    "prefecture": "愛媛県",
    "group": "islands",
    "lat": 34.22,
    "lon": 133.09,
    "aliases": [],
    "subtitle": "塩の歴史と、瀬戸内の海底地形。",
    "photoId": null,
    "photoEssay": null,
    "essaySlugs": [
      "setouchi-250-submarine-caldrons"
    ]
  },
  {
    "id": "miyajima",
    "name": "宮島",
    "prefecture": "広島県",
    "group": "islands",
    "lat": 34.28,
    "lon": 132.31,
    "aliases": [
      "厳島"
    ],
    "subtitle": "海に浮かぶ社殿と、海を渡る水。",
    "photoId": null,
    "photoEssay": "setouchi-sea-gods-and-power",
    "essaySlugs": [
      "setouchi-sea-gods-and-power",
      "kojima-island-infrastructure-per-capita"
    ]
  },
  {
    "id": "suo-oshima",
    "name": "周防大島・沖家室島",
    "prefecture": "山口県",
    "group": "islands",
    "lat": 33.9,
    "lon": 132.31,
    "aliases": [
      "周防大島",
      "沖家室島"
    ],
    "subtitle": "冬の夜、潮が引くと現れるひじきの磯。",
    "photoId": null,
    "photoEssay": null,
    "essaySlugs": [
      "hijiki-tidal-time"
    ]
  },
  {
    "id": "ibukijima",
    "name": "伊吹島",
    "prefecture": "香川県",
    "group": "islands",
    "lat": 34.13,
    "lon": 133.53,
    "aliases": [
      "観音寺・伊吹島"
    ],
    "subtitle": "島の漁場と加工場が育てたいりこ。",
    "photoId": "photo-ibuki-island",
    "photoEssay": null,
    "essaySlugs": [
      "ibuki-fat-sardines-revalued",
      "niboshi-shirasu-two-food-cultures"
    ]
  },
  {
    "id": "mutsukijima",
    "name": "睦月島・忽那諸島",
    "prefecture": "愛媛県",
    "group": "islands",
    "lat": 33.95,
    "lon": 132.65,
    "aliases": [
      "睦月島",
      "忽那諸島"
    ],
    "subtitle": "海上の行商が残した長屋門の町並み。",
    "photoId": null,
    "photoEssay": null,
    "essaySlugs": [
      "setouchi-itinerant-trade-boats"
    ]
  },
  {
    "id": "manno",
    "name": "まんのう",
    "prefecture": "香川県",
    "group": "shikoku",
    "lat": 34.16,
    "lon": 133.87,
    "aliases": [
      "満濃池",
      "まんのう池"
    ],
    "subtitle": "ため池の水を線香で分ける知恵。",
    "photoId": "photo-mannou-reservoir",
    "photoEssay": null,
    "essaySlugs": [
      "sanuki-store-the-rain"
    ]
  },
  {
    "id": "mitoyo",
    "name": "三豊",
    "prefecture": "香川県",
    "group": "shikoku",
    "lat": 34.18,
    "lon": 133.65,
    "aliases": [
      "父母ヶ浜"
    ],
    "subtitle": "引き潮がつくる、水面に映る空。",
    "photoId": null,
    "photoEssay": "chichibugahama-sky-in-tide",
    "essaySlugs": [
      "chichibugahama-sky-in-tide"
    ]
  },
  {
    "id": "futami",
    "name": "双海",
    "prefecture": "愛媛県",
    "group": "shikoku",
    "lat": 33.68,
    "lon": 132.63,
    "aliases": [
      "伊予市・双海"
    ],
    "subtitle": "地引き網船に残る、海を越えた木材の道。",
    "photoId": null,
    "photoEssay": null,
    "essaySlugs": [
      "setouchi-ship-materials"
    ]
  },
  {
    "id": "karihama",
    "name": "西予・狩浜",
    "prefecture": "愛媛県",
    "group": "shikoku",
    "lat": 33.29,
    "lon": 132.45,
    "aliases": [
      "狩浜",
      "西予"
    ],
    "subtitle": "宇和海へ向かう石積みのみかん畑。",
    "photoId": "photo-karihama-citrus-terraces",
    "photoEssay": null,
    "essaySlugs": [
      "mikan-slope-and-varieties"
    ]
  },
  {
    "id": "uwajima",
    "name": "宇和島",
    "prefecture": "愛媛県",
    "group": "shikoku",
    "lat": 33.22,
    "lon": 132.57,
    "aliases": [],
    "subtitle": "刺身を使う鯛めしと、南予の食文化。",
    "photoId": null,
    "photoEssay": null,
    "essaySlugs": [
      "tai-meshi-two-seas"
    ]
  }
];
const groupIds=['mainland','islands','shikoku'];
const articleBySlug=new Map(publishedEssays.map(a=>[a.slug,a]));
const allPlaces=new Map(atlasPlaces.map(p=>[p.id,{...p,legacy:true,group:groupIds.find(g=>legacyGroups[g].includes(p.id)),aliases:legacyLinks[p.id]?.[0]||[p.name],essaySlugs:legacyLinks[p.id]?.[1]||[],subtitle:regionTeasers[p.id]||p.subtitle,photoId:regionCoverPhotoIds[p.id]}]));
for(const p of seedPlaces) allPlaces.set(p.id,p);

// New essays can declare primaryPlaces in Markdown frontmatter. A string uses
// an existing ID; a new place object supplies id, name, prefecture, group and
// optional coordinates, aliases, subtitle and photoId/photoEssay. No incidental
// comparison place becomes a new region just because it appears in cities.
for(const article of publishedEssays){
  for(const item of article.primaryPlaces||[]){
    const id=typeof item==='string'?item:item?.id;
    if(!id||!/^[-a-z0-9]+$/.test(id))throw Error('Invalid primaryPlaces ID: '+article.slug);
    if(!allPlaces.has(id)){
      if(typeof item!=='object'||!item.name||!item.prefecture||!groupIds.includes(item.group))throw Error('Unknown primary place; provide name, prefecture and group: '+id);
      allPlaces.set(id,{...item,essaySlugs:[],aliases:item.aliases||[],subtitle:item.subtitle||'',photoEssay:item.photoEssay||null});
    }
    const p=allPlaces.get(id);
    p.essaySlugs=[...new Set([...p.essaySlugs,article.slug])];
  }
}
const nameMatches=(p,name)=>[p.name,...(p.aliases||[])].includes(name);
export const regionalEssaysFor=(p)=>publishedEssays.filter(a=>
  (p.essaySlugs||[]).includes(a.slug) ||
  (!(a.primaryPlaces||[]).length && nameMatches(p,a.cities?.[0]))
);
export const regionalPlaces=[...allPlaces.values()].filter(p=>p.legacy||regionalEssaysFor(p).length>0);
export const regionById=Object.fromEntries(regionalPlaces.map(p=>[p.id,p]));
export const regionIdForName=(name)=>regionalPlaces.find(p=>p.name===name)?.id||regionalPlaces.find(p=>nameMatches(p,name))?.id;
export const regionPhotoFor=(p)=>{
  if(p.photoId&&photoById[p.photoId])return photoById[p.photoId];
  if(p.legacy&&additionalPlacePhotos[p.id]?.[0])return additionalPlacePhotos[p.id][0];
  const article=p.photoEssay&&articleBySlug.get(p.photoEssay);
  return article?(essayIndexPhotoOverrides[article.slug]||article.heroPhoto||photoById[article.heroPhotoId]||null):null;
};
export const regionGroups=[{id:'mainland',title:'本州の町・海辺'},{id:'islands',title:'瀬戸内の島々'},{id:'shikoku',title:'四国の町・海辺'}].map(g=>({...g,note:'東から西へ →',items:regionalPlaces.filter(p=>p.group===g.id).sort((a,b)=>(b.lon??-Infinity)-(a.lon??-Infinity)||a.name.localeCompare(b.name,'ja'))}));
