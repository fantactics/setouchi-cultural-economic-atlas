export const climateProfiles = {
  ako: {
    monthly:[
      [1,3.2,37.5,142.1],[2,4.0,48.0,140.3],[3,7.4,91.6,177.2],[4,12.8,102.4,193.0],
      [5,17.9,135.8,198.0],[6,22.0,172.4,145.6],[7,25.9,201.4,150.8],[8,26.8,120.1,203.1],
      [9,22.7,177.9,157.4],[10,16.5,108.1,170.0],[11,10.5,58.0,153.9],[12,5.3,49.1,146.9]
    ],    station:'上郡', stationContext:'内陸側の近隣観測点。赤穂沿岸そのものではないため参考値として扱う。',
    period:'1991–2020', annualTemp:14.6, annualRain:1302.2, annualSun:1984.7,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0619&prec_no=63'
  },
  onomichi: {
    monthly:[
      [1,5.7,39.5,141.9],[2,5.8,49.7,140.1],[3,8.6,84.4,177.0],[4,13.4,88.9,192.1],
      [5,18.1,108.3,206.5],[6,21.8,172.3,149.7],[7,25.9,177.6,189.9],[8,27.5,89.5,220.7],
      [9,24.1,126.8,163.7],[10,18.6,95.9,169.8],[11,12.9,59.2,146.2],[12,8.0,46.2,140.8]
    ],    station:'生口島', stationContext:'尾道市島嶼部の代表観測点。旧市街とは海峡・地形条件が異なる。',
    period:'1991–2020', annualTemp:15.9, annualRain:1138.4, annualSun:2047.1,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0687&prec_no=67'
  },
  imabari: {
    monthly:[
      [1,5.9,49.6,139.6],[2,6.1,59.8,146.0],[3,9.0,96.6,184.7],[4,13.7,97.0,198.8],
      [5,18.4,111.8,215.0],[6,22.0,196.2,163.4],[7,26.2,191.8,202.4],[8,27.4,93.8,229.7],
      [9,24.0,165.2,161.6],[10,18.6,122.2,165.3],[11,13.0,69.6,136.8],[12,8.1,59.4,129.7]
    ],    station:'今治', stationContext:'今治市の代表観測点。',
    period:'1991–2020', annualTemp:16.0, annualRain:1325.5, annualSun:2072.9,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1077&prec_no=73'
  },
  shimotsui: {
    monthly:[
      [1,5.5,35.5,158.5],[2,5.8,42.9,152.4],[3,8.8,77.9,182.3],[4,13.7,78.7,202.1],
      [5,18.5,103.1,212.7],[6,22.2,146.2,166.2],[7,26.3,152.5,203.6],[8,28.1,78.3,237.8],
      [9,24.7,137.4,171.1],[10,19.0,97.4,179.1],[11,13.1,48.4,161.6],[12,7.9,40.3,159.8]
    ],    station:'玉野', stationContext:'備讃瀬戸北岸の近隣沿岸観測点。下津井とは海岸線・地形が異なるため参考値。',
    period:'1991–2020', annualTemp:16.1, annualRain:1038.5, annualSun:2187.1,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0670&prec_no=66'
  },
  tadotsu: {
    station:'多度津', stationContext:'町内の特別地域気象観測所。',
    period:'1991–2020', annualTemp:16.5, annualRain:1116.8, annualSun:2113.9,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_ym.php?block_no=47890&prec_no=72'
  },
  mitarai: {
    monthly:[
      [1,6.6,48.5,174.6],[2,6.7,65.7,157.7],[3,9.6,109.3,198.5],[4,13.7,118.8,208.0],
      [5,18.2,116.2,236.3],[6,21.5,230.0,164.7],[7,25.2,265.8,189.4],[8,27.1,115.8,242.2],
      [9,24.1,161.3,174.5],[10,19.3,131.2,183.9],[11,14.1,80.1,165.7],[12,8.7,68.8,157.5]
    ],    station:'呉市蒲刈', stationContext:'とびしま海道内の近隣島嶼観測点。統計期間が2009–2020と短い点に注意。',
    period:'2009–2020', annualTemp:16.2, annualRain:1524.4, annualSun:2253.5,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1606&prec_no=67'
  },
  ushimado: {
    monthly:[
      [1,4.2,36.1,149.6],[2,4.5,43.8,143.3],[3,7.7,83.8,177.4],[4,12.8,88.3,197.5],
      [5,17.8,116.2,207.9],[6,21.9,154.2,159.0],[7,25.9,172.8,186.4],[8,27.3,98.8,228.0],
      [9,23.5,162.6,159.3],[10,17.6,98.0,149.9],[11,11.7,53.6,146.6],[12,6.5,43.1,158.6]
    ],    station:'虫明', stationContext:'瀬戸内市内の近隣観測点。牛窓より内陸寄りのため最低気温などに差が出うる。',
    period:'1991–2020', annualTemp:15.1, annualRain:1150.6, annualSun:2059.8,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0668&prec_no=66'
  },
  tomonoura: {
    station:'福山', stationContext:'福山市の代表観測点。鞆の浦の海岸部とは地形・海風条件が異なる。',
    period:'1991–2020', annualTemp:15.7, annualRain:1171.7, annualSun:2069.8,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_ym.php?block_no=47767&prec_no=67'
  },
  mihara: {
    monthly:[
      [1,2.9,33.4,null],[2,3.9,53.9,null],[3,7.2,88.0,null],[4,12.6,115.3,null],
      [5,17.6,133.4,null],[6,21.0,189.7,null],[7,24.6,240.8,null],[8,25.9,140.6,null],
      [9,22.3,152.3,null],[10,16.7,105.6,null],[11,11.0,64.4,null],[12,5.2,57.2,null]
    ],    station:'本郷', stationContext:'三原市内陸側・広島空港近傍の観測点。沿岸市街地より冷涼。日照平年値は掲載なし。',
    period:'2003–2020', annualTemp:14.2, annualRain:1374.6, annualSun:null,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=1472&prec_no=67'
  },
  takehara: {
    monthly:[
      [1,5.7,38.1,156.5],[2,5.8,48.5,153.6],[3,8.6,88.6,180.2],[4,13.0,95.6,199.9],
      [5,17.3,121.1,219.2],[6,20.8,193.2,166.6],[7,24.5,213.7,205.1],[8,26.5,98.1,238.5],
      [9,23.7,121.8,172.5],[10,18.4,86.4,183.6],[11,12.9,59.9,163.2],[12,8.0,45.3,154.7]
    ],    station:'竹原', stationContext:'竹原市の代表観測点。',
    period:'1991–2020', annualTemp:15.4, annualRain:1212.3, annualSun:2190.8,
    sourceUrl:'https://www.data.jma.go.jp/stats/etrn/view/nml_amd_ym.php?block_no=0686&prec_no=67'
  }
};
