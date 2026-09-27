export const mapLayers = {
  tidePorts: [
    {
      name:'鞆の浦',lat:34.3834,lon:133.3818,note:'潮待ち港',
      status:'verified',sourceId:'X-03',sourceLabel:'鞆の浦について（福山市）',
      sourceUrl:'https://www.city.fukuyama.hiroshima.jp/soshiki/kanko/85750.html',verifiedAt:'2026-09-27'
    },
    {
      name:'波止浜',lat:34.1276,lon:132.9566,note:'潮待ち・修繕港',
      status:'verified',sourceId:'X-07',sourceLabel:'今治の歴史 海事編（今治市）',
      sourceUrl:'https://www.city.imabari.ehime.jp/kaiji/rekisi/',verifiedAt:'2026-09-27'
    }
  ],
  strongCurrents: [
    {
      name:'備讃瀬戸',lat:34.42,lon:133.82,note:'潮流の強い海域',
      status:'verified',sourceId:'MAP-01',sourceLabel:'備讃瀬戸海上交通センター 潮流情報',
      sourceUrl:'https://www6.kaiho.mlit.go.jp/bisan/currenttide.html',verifiedAt:'2026-09-27'
    },
    {
      name:'来島海峡',lat:34.119,lon:132.976,note:'瀬戸内有数の強潮流海峡',
      status:'verified',sourceId:'X-08',sourceLabel:'海事関連施設・来島海峡（今治市）',
      sourceUrl:'https://www.city.imabari.ehime.jp/kaiji/sisetsu/',verifiedAt:'2026-09-27'
    }
  ],
  foodCulture: [
    {name:'下津井',lat:34.435,lon:133.806,note:'タコ・瀬戸内魚介',status:'pending'},
    {
      name:'笠岡諸島',lat:34.43,lon:133.51,note:'真鯛・イイダコ・メバル等',
      status:'verified',sourceId:'X-01',sourceLabel:'そうだ、釣りに行こう（笠岡市観光協会）',
      sourceUrl:'https://www.kasaoka-kankou.jp/feature/feature05',verifiedAt:'2026-09-27'
    },
    {
      name:'鞆の浦',lat:34.3834,lon:133.3818,note:'鯛・サワラ',
      status:'verified',sourceId:'MAP-02',sourceLabel:'備後フィッシュ（福山市）',
      sourceUrl:'https://www.city.fukuyama.hiroshima.jp/site/bingofish/121083.html',verifiedAt:'2026-09-27'
    },
    {name:'尾道',lat:34.4089,lon:133.205,note:'魚介・柑橘',status:'pending'},
    {name:'今治',lat:34.0661,lon:132.9978,note:'鯛・島嶼柑橘',status:'pending'}
  ],
  maritimeIndustry: [
    {
      name:'尾道',lat:34.4089,lon:133.205,note:'海運・造船・修繕',
      status:'verified',sourceId:'X-05',sourceLabel:'海とともに歩む 海事都市尾道（尾道市）',
      sourceUrl:'https://www.city.onomichi.hiroshima.jp/uploaded/attachment/59103.pdf',verifiedAt:'2026-09-27'
    },
    {
      name:'今治',lat:34.0661,lon:132.9978,note:'船主・海運・造船・舶用',
      status:'verified',sourceId:'IMA-01',sourceLabel:'日本最大の海事都市今治とは（今治市）',
      sourceUrl:'https://www.city.imabari.ehime.jp/kaiji/about/',verifiedAt:'2026-09-27'
    }
  ]
};

export const mapLayerLabels = {
  tidePorts:'潮待ち港',
  strongCurrents:'強潮流',
  foodCulture:'食文化',
  maritimeIndustry:'海事産業'
};
