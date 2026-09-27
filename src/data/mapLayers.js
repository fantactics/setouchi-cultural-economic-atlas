export const mapLayers = {
  tidePorts: [
    {name:'鞆の浦',lat:34.3834,lon:133.3818,note:'潮待ち港',sourceId:'X-03'},
    {name:'波止浜',lat:34.1276,lon:132.9566,note:'潮待ち・修繕港',sourceId:'X-07'}
  ],
  strongCurrents: [
    {name:'備讃瀬戸',lat:34.42,lon:133.82,note:'潮流の強い海域'},
    {name:'来島海峡',lat:34.119,lon:132.976,note:'瀬戸内有数の強潮流海峡',sourceId:'X-08'}
  ],
  foodCulture: [
    {name:'下津井',lat:34.435,lon:133.806,note:'タコ・瀬戸内魚介'},
    {name:'笠岡諸島',lat:34.43,lon:133.51,note:'真鯛・イイダコ・メバル等',sourceId:'X-01'},
    {name:'鞆の浦',lat:34.3834,lon:133.3818,note:'鯛・サワラ'},
    {name:'尾道',lat:34.4089,lon:133.205,note:'魚介・柑橘'},
    {name:'今治',lat:34.0661,lon:132.9978,note:'鯛・島嶼柑橘'}
  ],
  maritimeIndustry: [
    {name:'尾道',lat:34.4089,lon:133.205,note:'海運・造船・修繕',sourceId:'X-05'},
    {name:'今治',lat:34.0661,lon:132.9978,note:'船主・海運・造船・舶用',sourceId:'IMA-01'}
  ]
};

export const mapLayerLabels = {
  tidePorts:'潮待ち港',
  strongCurrents:'強潮流',
  foodCulture:'食文化',
  maritimeIndustry:'海事産業'
};
