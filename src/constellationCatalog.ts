// 星座名与缩写：Constellation Guide 星座表（基于 IAU 编目）。
// 季节：同站 Seasonal Constellations 的北半球晚间分组，不代表独占可见季节。
export const SEASON_SOURCE = "https://www.constellation-guide.com/seasonal-constellations/";
export const CATALOG_SOURCE = "https://www.constellation-guide.com/constellation-list/";
export const seasons = ["春季", "夏季", "秋季", "冬季"] as const;
export type Season = (typeof seasons)[number];
export const constellationCatalog = [
  {
    "en": "Andromeda",
    "abbr": "And",
    "url": "https://www.constellation-guide.com/constellation-list/andromeda-constellation/",
    "slug": "andromeda",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Antlia",
    "abbr": "Ant",
    "url": "https://www.constellation-guide.com/constellation-list/antlia-constellation/",
    "slug": "antlia",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Apus",
    "abbr": "Aps",
    "url": "https://www.constellation-guide.com/constellation-list/apus-constellation/",
    "slug": "apus",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Aquarius",
    "abbr": "Aqr",
    "url": "https://www.constellation-guide.com/constellation-list/aquarius-constellation/",
    "slug": "aquarius",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Aquila",
    "abbr": "Aql",
    "url": "https://www.constellation-guide.com/constellation-list/aquila-constellation/",
    "slug": "aquila",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Ara",
    "abbr": "Ara",
    "url": "https://www.constellation-guide.com/constellation-list/ara-constellation/",
    "slug": "ara",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Aries",
    "abbr": "Ari",
    "url": "https://www.constellation-guide.com/constellation-list/aries-constellation/",
    "slug": "aries",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Auriga",
    "abbr": "Aur",
    "url": "https://www.constellation-guide.com/constellation-list/auriga-constellation/",
    "slug": "auriga",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Boötes",
    "abbr": "Boo",
    "url": "https://www.constellation-guide.com/constellation-list/bootes-constellation/",
    "slug": "bootes",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Caelum",
    "abbr": "Cae",
    "url": "https://www.constellation-guide.com/constellation-list/caelum-constellation/",
    "slug": "caelum",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Camelopardalis",
    "abbr": "Cam",
    "url": "https://www.constellation-guide.com/constellation-list/camelopardalis-constellation/",
    "slug": "camelopardalis",
    "season": "冬季",
    "visibility": "北天近极；部分北纬地区可全年见到主要星群。"
  },
  {
    "en": "Cancer",
    "abbr": "Cnc",
    "url": "https://www.constellation-guide.com/constellation-list/cancer-constellation/",
    "slug": "cancer",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Canes Venatici",
    "abbr": "CVn",
    "url": "https://www.constellation-guide.com/constellation-list/canes-venatici-constellation/",
    "slug": "canes-venatici",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Canis Major",
    "abbr": "CMa",
    "url": "https://www.constellation-guide.com/constellation-list/canis-major-constellation/",
    "slug": "canis-major",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Canis Minor",
    "abbr": "CMi",
    "url": "https://www.constellation-guide.com/constellation-list/canis-minor-constellation/",
    "slug": "canis-minor",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Capricornus",
    "abbr": "Cap",
    "url": "https://www.constellation-guide.com/constellation-list/capricornus-constellation/",
    "slug": "capricornus",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Carina",
    "abbr": "Car",
    "url": "https://www.constellation-guide.com/constellation-list/carina-constellation/",
    "slug": "carina",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Cassiopeia",
    "abbr": "Cas",
    "url": "https://www.constellation-guide.com/constellation-list/cassiopeia-constellation/",
    "slug": "cassiopeia",
    "season": "秋季",
    "visibility": "北天近极；部分北纬地区可全年见到主要星群。"
  },
  {
    "en": "Centaurus",
    "abbr": "Cen",
    "url": "https://www.constellation-guide.com/constellation-list/centaurus-constellation/",
    "slug": "centaurus",
    "season": "春季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Cepheus",
    "abbr": "Cep",
    "url": "https://www.constellation-guide.com/constellation-list/cepheus-constellation/",
    "slug": "cepheus",
    "season": "秋季",
    "visibility": "北天近极；部分北纬地区可全年见到主要星群。"
  },
  {
    "en": "Cetus",
    "abbr": "Cet",
    "url": "https://www.constellation-guide.com/constellation-list/cetus-constellation/",
    "slug": "cetus",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Chamaeleon",
    "abbr": "Cha",
    "url": "https://www.constellation-guide.com/constellation-list/chamaeleon-constellation/",
    "slug": "chamaeleon",
    "season": "春季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Circinus",
    "abbr": "Cir",
    "url": "https://www.constellation-guide.com/constellation-list/circinus-constellation/",
    "slug": "circinus",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Columba",
    "abbr": "Col",
    "url": "https://www.constellation-guide.com/constellation-list/columba-constellation/",
    "slug": "columba",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Coma Berenices",
    "abbr": "Com",
    "url": "https://www.constellation-guide.com/constellation-list/coma-berenices-constellation/",
    "slug": "coma-berenices",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Corona Australis",
    "abbr": "CrA",
    "url": "https://www.constellation-guide.com/constellation-list/corona-australis-constellation/",
    "slug": "corona-australis",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Corona Borealis",
    "abbr": "CrB",
    "url": "https://www.constellation-guide.com/constellation-list/corona-borealis-constellation/",
    "slug": "corona-borealis",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Corvus",
    "abbr": "Crv",
    "url": "https://www.constellation-guide.com/constellation-list/corvus-constellation/",
    "slug": "corvus",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Crater",
    "abbr": "Crt",
    "url": "https://www.constellation-guide.com/constellation-list/crater-constellation/",
    "slug": "crater",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Crux",
    "abbr": "Cru",
    "url": "https://www.constellation-guide.com/constellation-list/crux-constellation/",
    "slug": "crux",
    "season": "春季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Cygnus",
    "abbr": "Cyg",
    "url": "https://www.constellation-guide.com/constellation-list/cygnus-constellation/",
    "slug": "cygnus",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Delphinus",
    "abbr": "Del",
    "url": "https://www.constellation-guide.com/constellation-list/delphinus-constellation/",
    "slug": "delphinus",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Dorado",
    "abbr": "Dor",
    "url": "https://www.constellation-guide.com/constellation-list/dorado-constellation/",
    "slug": "dorado",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Draco",
    "abbr": "Dra",
    "url": "https://www.constellation-guide.com/constellation-list/draco-constellation/",
    "slug": "draco",
    "season": "夏季",
    "visibility": "北天近极；部分北纬地区可全年见到主要星群。"
  },
  {
    "en": "Equuleus",
    "abbr": "Equ",
    "url": "https://www.constellation-guide.com/constellation-list/equuleus-constellation/",
    "slug": "equuleus",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Eridanus",
    "abbr": "Eri",
    "url": "https://www.constellation-guide.com/constellation-list/eridanus-constellation/",
    "slug": "eridanus",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Fornax",
    "abbr": "For",
    "url": "https://www.constellation-guide.com/constellation-list/fornax-constellation/",
    "slug": "fornax",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Gemini",
    "abbr": "Gem",
    "url": "https://www.constellation-guide.com/constellation-list/gemini-constellation/",
    "slug": "gemini",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Grus",
    "abbr": "Gru",
    "url": "https://www.constellation-guide.com/constellation-list/grus-constellation/",
    "slug": "grus",
    "season": "秋季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Hercules",
    "abbr": "Her",
    "url": "https://www.constellation-guide.com/constellation-list/hercules-constellation/",
    "slug": "hercules",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Horologium",
    "abbr": "Hor",
    "url": "https://www.constellation-guide.com/constellation-list/horologium-constellation/",
    "slug": "horologium",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Hydra",
    "abbr": "Hya",
    "url": "https://www.constellation-guide.com/constellation-list/hydra-constellation/",
    "slug": "hydra",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Hydrus",
    "abbr": "Hyi",
    "url": "https://www.constellation-guide.com/constellation-list/hydrus-constellation/",
    "slug": "hydrus",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Indus",
    "abbr": "Ind",
    "url": "https://www.constellation-guide.com/constellation-list/indus-constellation/",
    "slug": "indus",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Lacerta",
    "abbr": "Lac",
    "url": "https://www.constellation-guide.com/constellation-list/lacerta-constellation/",
    "slug": "lacerta",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Leo",
    "abbr": "Leo",
    "url": "https://www.constellation-guide.com/constellation-list/leo-constellation/",
    "slug": "leo",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Leo Minor",
    "abbr": "LMi",
    "url": "https://www.constellation-guide.com/constellation-list/leo-minor-constellation/",
    "slug": "leo-minor",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Lepus",
    "abbr": "Lep",
    "url": "https://www.constellation-guide.com/constellation-list/lepus-constellation/",
    "slug": "lepus",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Libra",
    "abbr": "Lib",
    "url": "https://www.constellation-guide.com/constellation-list/libra-constellation/",
    "slug": "libra",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Lupus",
    "abbr": "Lup",
    "url": "https://www.constellation-guide.com/constellation-list/lupus-constellation/",
    "slug": "lupus",
    "season": "春季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Lynx",
    "abbr": "Lyn",
    "url": "https://www.constellation-guide.com/constellation-list/lynx-constellation/",
    "slug": "lynx",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Lyra",
    "abbr": "Lyr",
    "url": "https://www.constellation-guide.com/constellation-list/lyra-constellation/",
    "slug": "lyra",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Mensa",
    "abbr": "Men",
    "url": "https://www.constellation-guide.com/constellation-list/mensa-constellation/",
    "slug": "mensa",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Microscopium",
    "abbr": "Mic",
    "url": "https://www.constellation-guide.com/constellation-list/microscopium-constellation/",
    "slug": "microscopium",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Monoceros",
    "abbr": "Mon",
    "url": "https://www.constellation-guide.com/constellation-list/monoceros-constellation/",
    "slug": "monoceros",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Musca",
    "abbr": "Mus",
    "url": "https://www.constellation-guide.com/constellation-list/musca-constellation/",
    "slug": "musca",
    "season": "春季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Norma",
    "abbr": "Nor",
    "url": "https://www.constellation-guide.com/constellation-list/norma-constellation/",
    "slug": "norma",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Octans",
    "abbr": "Oct",
    "url": "https://www.constellation-guide.com/constellation-list/octans-constellation/",
    "slug": "octans",
    "season": "秋季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Ophiuchus",
    "abbr": "Oph",
    "url": "https://www.constellation-guide.com/constellation-list/ophiuchus-constellation/",
    "slug": "ophiuchus",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Orion",
    "abbr": "Ori",
    "url": "https://www.constellation-guide.com/constellation-list/orion-constellation/",
    "slug": "orion",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Pavo",
    "abbr": "Pav",
    "url": "https://www.constellation-guide.com/constellation-list/pavo-constellation/",
    "slug": "pavo",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Pegasus",
    "abbr": "Peg",
    "url": "https://www.constellation-guide.com/constellation-list/pegasus-constellation/",
    "slug": "pegasus",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Perseus",
    "abbr": "Per",
    "url": "https://www.constellation-guide.com/constellation-list/perseus-constellation/",
    "slug": "perseus",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Phoenix",
    "abbr": "Phe",
    "url": "https://www.constellation-guide.com/constellation-list/phoenix-constellation/",
    "slug": "phoenix",
    "season": "秋季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Pictor",
    "abbr": "Pic",
    "url": "https://www.constellation-guide.com/constellation-list/pictor-constellation/",
    "slug": "pictor",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Pisces",
    "abbr": "Psc",
    "url": "https://www.constellation-guide.com/constellation-list/pisces-constellation/",
    "slug": "pisces",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Piscis Austrinus",
    "abbr": "PsA",
    "url": "https://www.constellation-guide.com/constellation-list/piscis-austrinus-constellation/",
    "slug": "piscis-austrinus",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Puppis",
    "abbr": "Pup",
    "url": "https://www.constellation-guide.com/constellation-list/puppis-constellation/",
    "slug": "puppis",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Pyxis",
    "abbr": "Pyx",
    "url": "https://www.constellation-guide.com/constellation-list/pyxis-constellation/",
    "slug": "pyxis",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Reticulum",
    "abbr": "Ret",
    "url": "https://www.constellation-guide.com/constellation-list/reticulum-constellation/",
    "slug": "reticulum",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Sagitta",
    "abbr": "Sge",
    "url": "https://www.constellation-guide.com/constellation-list/sagitta-constellation/",
    "slug": "sagitta",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Sagittarius",
    "abbr": "Sgr",
    "url": "https://www.constellation-guide.com/constellation-list/sagittarius-constellation/",
    "slug": "sagittarius",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Scorpius",
    "abbr": "Sco",
    "url": "https://www.constellation-guide.com/constellation-list/scorpius-constellation/",
    "slug": "scorpius",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Sculptor",
    "abbr": "Scl",
    "url": "https://www.constellation-guide.com/constellation-list/sculptor-constellation/",
    "slug": "sculptor",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Scutum",
    "abbr": "Sct",
    "url": "https://www.constellation-guide.com/constellation-list/scutum-constellation/",
    "slug": "scutum",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Serpens",
    "abbr": "Ser",
    "url": "https://www.constellation-guide.com/constellation-list/serpens-constellation/",
    "slug": "serpens",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Sextans",
    "abbr": "Sex",
    "url": "https://www.constellation-guide.com/constellation-list/sextans-constellation/",
    "slug": "sextans",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Taurus",
    "abbr": "Tau",
    "url": "https://www.constellation-guide.com/constellation-list/taurus-constellation/",
    "slug": "taurus",
    "season": "冬季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Telescopium",
    "abbr": "Tel",
    "url": "https://www.constellation-guide.com/constellation-list/telescopium-constellation/",
    "slug": "telescopium",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Triangulum",
    "abbr": "Tri",
    "url": "https://www.constellation-guide.com/constellation-list/triangulum-constellation/",
    "slug": "triangulum",
    "season": "秋季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Triangulum Australe",
    "abbr": "TrA",
    "url": "https://www.constellation-guide.com/constellation-list/triangulum-australe-constellation/",
    "slug": "triangulum-australe",
    "season": "夏季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Tucana",
    "abbr": "Tuc",
    "url": "https://www.constellation-guide.com/constellation-list/tucana-constellation/",
    "slug": "tucana",
    "season": "秋季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Ursa Major",
    "abbr": "UMa",
    "url": "https://www.constellation-guide.com/constellation-list/ursa-major-constellation/",
    "slug": "ursa-major",
    "season": "春季",
    "visibility": "北天近极；部分北纬地区可全年见到主要星群。"
  },
  {
    "en": "Ursa Minor",
    "abbr": "UMi",
    "url": "https://www.constellation-guide.com/constellation-list/ursa-minor-constellation/",
    "slug": "ursa-minor",
    "season": "春季",
    "visibility": "北天近极；部分北纬地区可全年见到主要星群。"
  },
  {
    "en": "Vela",
    "abbr": "Vel",
    "url": "https://www.constellation-guide.com/constellation-list/vela-constellation/",
    "slug": "vela",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Virgo",
    "abbr": "Vir",
    "url": "https://www.constellation-guide.com/constellation-list/virgo-constellation/",
    "slug": "virgo",
    "season": "春季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  },
  {
    "en": "Volans",
    "abbr": "Vol",
    "url": "https://www.constellation-guide.com/constellation-list/volans-constellation/",
    "slug": "volans",
    "season": "冬季",
    "visibility": "南天偏远；北半球中纬度难见全貌，宜在更南方核对当地星图。"
  },
  {
    "en": "Vulpecula",
    "abbr": "Vul",
    "url": "https://www.constellation-guide.com/constellation-list/vulpecula-constellation/",
    "slug": "vulpecula",
    "season": "夏季",
    "visibility": "可见高度随纬度、日期与时刻改变，出发前请核对当地星图。"
  }
] as const;
