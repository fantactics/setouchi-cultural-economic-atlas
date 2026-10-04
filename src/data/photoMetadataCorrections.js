export const photoMetadataCorrections = {
  'https://commons.wikimedia.org/wiki/File:%E5%BE%A1%E6%89%8B%E6%B4%97%E6%B8%AF%E9%98%B2%E6%B3%A2%E5%A0%A4%E7%81%AF%E5%8F%B0.jpg': {
    author:'柳田亮',
    license:'CC BY-SA 3.0',
    licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  'https://commons.wikimedia.org/wiki/File:%E8%9B%B8%E5%A3%BA%EF%BC%88%E6%98%8E%E7%9F%B3%EF%BC%89P5231862.JPG': {
    author:'松岡明芳',
    license:'Public domain',
    licenseUrl:'https://commons.wikimedia.org/wiki/File:%E8%9B%B8%E5%A3%BA%EF%BC%88%E6%98%8E%E7%9F%B3%EF%BC%89P5231862.JPG'
  },
  'https://commons.wikimedia.org/wiki/File:Mihara_Castle,_tenshudai.jpg': {
    author:'Saigen Jiro',
    license:'CC0 1.0',
    licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'
  }
};

export function applyPhotoMetadataCorrection(photo){
  if(!photo) return photo;
  const correction=photoMetadataCorrections[photo.sourcePage];
  return correction ? {...photo,...correction} : photo;
}
