export const climateProfiles = {
  ako: {
    station:'上郡', stationContext:'内陸側の近隣観測点。赤穂沿岸そのものではないため参考値として扱う。',
    period:'1991–2020', annualTemp:14.6, annualRain:1302.2, annualSun:1984.7,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0619&prec_no=63'
  },
  onomichi: {
    station:'生口島', stationContext:'尾道市島嶼部の代表観測点。旧市街とは海峡・地形条件が異なる。',
    period:'1991–2020', annualTemp:15.9, annualRain:1138.4, annualSun:2047.1,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0687&prec_no=67'
  },
  imabari: {
    station:'今治', stationContext:'今治市の代表観測点。',
    period:'1991–2020', annualTemp:16.0, annualRain:1325.5, annualSun:2072.9,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1077&prec_no=73'
  },
  shimotsui: {
    station:'玉野', stationContext:'備讃瀬戸北岸の近隣沿岸観測点。下津井とは海岸線・地形が異なるため参考値。',
    period:'1991–2020', annualTemp:16.1, annualRain:1038.5, annualSun:2187.1,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0670&prec_no=66'
  },
  tadotsu: {
    station:'多度津', stationContext:'町内の特別地域気象観測所。',
    period:'1991–2020', annualTemp:16.5, annualRain:1116.8, annualSun:2113.9,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_ym.php?block_no=47890&prec_no=72'
  },
  mitarai: {
    station:'呉市蒲刈', stationContext:'とびしま海道内の近隣島嶼観測点。統計期間が2009–2020と短い点に注意。',
    period:'2009–2020', annualTemp:16.2, annualRain:1524.4, annualSun:2253.5,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1606&prec_no=67'
  },
  ushimado: {
    station:'虫明', stationContext:'瀬戸内市内の近隣観測点。牛窓より内陸寄りのため最低気温などに差が出うる。',
    period:'1991–2020', annualTemp:15.1, annualRain:1150.6, annualSun:2059.8,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0668&prec_no=66'
  },
  tomonoura: {
    station:'福山', stationContext:'福山市の代表観測点。鞆の浦の海岸部とは地形・海風条件が異なる。',
    period:'1991–2020', annualTemp:15.7, annualRain:1171.7, annualSun:2069.8,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_ym.php?block_no=47767&prec_no=67'
  },
  mihara: {
    station:'本郷', stationContext:'三原市内陸側・広島空港近傍の観測点。沿岸市街地より冷涼。日照平年値は掲載なし。',
    period:'2003–2020', annualTemp:14.2, annualRain:1374.6, annualSun:null,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1472&prec_no=67'
  },
  takehara: {
    station:'竹原', stationContext:'竹原市の代表観測点。',
    period:'1991–2020', annualTemp:15.4, annualRain:1212.3, annualSun:2190.8,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0686&prec_no=67'
  }
};
