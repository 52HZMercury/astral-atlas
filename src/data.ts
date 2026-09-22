import { constellationCatalog, SEASON_SOURCE, type Season } from "./constellationCatalog.ts";
import { constellationStories } from "./constellationStories.ts";

export const NASA_FACTS = "https://nssdc.gsfc.nasa.gov/planetary/factsheet/";
export const AU_SOURCE = "https://www.iau.org/public/themes/measuring/";
export const KP_URL =
  "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";
export const planets = [
  {
    name: "水星",
    en: "MERCURY",
    diameter: 4879,
    days: 88,
    distance: 57.9,
    color: "#9d9992",
    type: "类地行星",
    text: "紧邻太阳的岩石世界。稀薄的外逸层无法像地球的大气那样有效保留热量。",
  },
  {
    name: "金星",
    en: "VENUS",
    diameter: 12104,
    days: 224.7,
    distance: 108.2,
    color: "#d6b77c",
    type: "类地行星",
    text: "浓厚的云层遮住地表，强烈的温室效应让这颗行星成为炽热的世界。",
  },
  {
    name: "地球",
    en: "EARTH",
    diameter: 12756,
    days: 365.2,
    distance: 149.6,
    color: "#729da9",
    type: "类地行星",
    text: "我们出发的地方。液态海洋、大气与岩石共同塑造了这个仍在变化的家园。",
  },
  {
    name: "火星",
    en: "MARS",
    diameter: 6792,
    days: 687,
    distance: 228,
    color: "#bf7555",
    type: "类地行星",
    text: "地表的氧化铁赋予它红色。古老河道与沉积地形记录着曾经流动的水。",
  },
  {
    name: "木星",
    en: "JUPITER",
    diameter: 142984,
    days: 4331,
    distance: 778.5,
    color: "#c3a88c",
    type: "气态巨行星",
    text: "太阳系最大的行星。云带与风暴在厚重的大气中交织，没有可供站立的固体表面。",
  },
  {
    name: "土星",
    en: "SATURN",
    diameter: 120536,
    days: 10747,
    distance: 1432,
    color: "#c6ba98",
    type: "气态巨行星",
    text: "醒目的环系由无数冰与岩石碎片组成。看似完整的圆环，其实是各自绕行的微小世界。",
  },
  {
    name: "天王星",
    en: "URANUS",
    diameter: 51118,
    days: 30589,
    distance: 2867,
    color: "#9abfc2",
    type: "冰巨行星",
    text: "自转轴高度倾斜，仿佛侧躺着绕太阳运行。大气中的甲烷影响了它的颜色。",
  },
  {
    name: "海王星",
    en: "NEPTUNE",
    diameter: 49528,
    days: 59800,
    distance: 4515,
    color: "#6689aa",
    type: "冰巨行星",
    text: "远离太阳的冰巨行星。暗淡的阳光之下，大气仍然展现出活跃的风与风暴。",
  },
];
export const toAU = (millionKm: number) => (millionKm / 149.5978707).toFixed(2);
export type KpRecord = { time: number; kp: number };
export function parseKp(input: unknown): KpRecord[] {
  if (!Array.isArray(input)) throw new Error("观测数据格式异常");
  const records = input.flatMap((row: unknown) => {
    if (!row || typeof row !== "object") return [];
    const r = row as Record<string, unknown>;
    if (
      typeof r.time_tag !== "string" ||
      (typeof r.Kp !== "number" && typeof r.Kp !== "string") ||
      r.Kp === ""
    )
      return [];
    const time = Date.parse(
      /[zZ]|[+-]\d\d:\d\d$/.test(r.time_tag) ? r.time_tag : `${r.time_tag}Z`,
    );
    const kp = Number(r.Kp);
    return Number.isFinite(time) && Number.isFinite(kp) && kp >= 0 && kp <= 9
      ? [{ time, kp }]
      : [];
  });
  if (input.length && !records.length) throw new Error("观测数据格式异常");
  return [...new Map(records.map((r) => [r.time, r])).values()].sort(
    (a, b) => a.time - b.time,
  );
}
export const isStale = (time: number, now = Date.now()) =>
  now - time > 6 * 3600_000;
export const utc = (time: number) =>
  new Date(time).toISOString().replace("T", " ").slice(0, 16) + " UTC";
export type Article = {
  slug: string;
  archiveId: string;
  archiveTitle: string;
  archiveEn: string;
  category: string;
  title: string;
  description: string;
  image: "saturn" | "stars" | "moon" | "constellation";
  constellation?: { abbr: string; season: Season; origin: string; visibility: string };
  sketch?: {
    points: [number, number][];
    links: [number, number][];
    accent: number[];
  };
  sections: [string, string][];
  sources: { label: string; url: string }[];
};
const baseArticles: Article[] = [
  {
    slug: "solar-system-scale",
    archiveId: "AA-001",
    archiveTitle: "太阳系尺度",
    archiveEn: "SOLAR SYSTEM SCALE",
    category: "空间尺度",
    title: "行星之间的距离，\n比想象中更辽阔。",
    description: "走出示意图，重新理解行星之间的距离。",
    image: "saturn",
    sections: [
      [
        "轨道图藏起了什么",
        "把太阳与所有行星放进同一张图，通常必须改变比例。否则，要么行星小得几乎不可见，要么外侧轨道远远超出屏幕。本站的交互模型因此压缩了轨道间距，并放大了天体；它帮助你认识顺序与结构，不用于测量真实距离。",
      ],
      [
        "换一把更合适的尺",
        "在太阳系中，天文学家常用天文单位 AU 表示距离。按国际天文学联合会的定义，1 AU 等于 149,597,870,700 米，约为日地平均距离。行星轨道并非正圆，因此我们用轨道半长轴描述轨道的大小，而不是把它误认为每一刻的日心距离。",
      ],
      [
        "亲手做一个比例模型",
        "先在纸上任选一段长度代表一个天文单位，再将行星表中的 AU 数值乘以这段长度，标记每颗行星的位置。你会发现内侧行星挤在太阳附近，外侧行星之间却留下很大的空白。模型的价值，恰恰在这些空白里。",
      ],
      [
        "边界并不是一道墙",
        "海王星轨道之外还有其他太阳系天体。太阳风的影响范围与太阳引力的影响范围，也不是同一个边界。当我们谈论“太阳系边缘”，应先说明使用的是哪一种定义。带着这个问题观察地图，会比记住一条边界线更有帮助。",
      ],
    ],
    sources: [
      { label: "NASA · Planetary Fact Sheet", url: NASA_FACTS },
      { label: "IAU · Measuring the Universe", url: AU_SOURCE },
      {
        label: "NASA · Solar System",
        url: "https://science.nasa.gov/solar-system/",
      },
    ],
  },
  {
    slug: "star-colors",
    archiveId: "AA-002",
    archiveTitle: "恒星的颜色",
    archiveEn: "STELLAR COLOURS",
    category: "恒星物理",
    title: "星光的颜色，\n是一封温度来信。",
    description: "从偏红到蓝白，读懂恒星表面的温度线索。",
    image: "stars",
    sections: [
      [
        "颜色来自哪里",
        "恒星会发出许多不同波长的光。表面温度改变了这些光的分布，也改变了我们看到的总体颜色。通常，偏蓝的恒星表面更热，偏红的恒星表面更冷；这里的冷与热都是恒星之间的比较。",
      ],
      [
        "不只是一种颜色",
        "恒星并不是只发出与外观颜色对应的单一波长。它们的光谱覆盖很宽的范围，颜色是眼睛与探测器对这些光的综合响应。把一颗恒星理解为一束单色灯光，会错过光谱中丰富的信息。",
      ],
      [
        "眼睛也有局限",
        "暗处的人眼辨色能力下降，微弱的星光因此常显得接近白色。大气、星际尘埃以及照片处理也会影响颜色。比较天文照片时，应先阅读图像说明，分清自然色呈现与用于突出特定波段的配色。",
      ],
      [
        "从颜色走向光谱",
        "颜色是一条入门线索，光谱则提供更细致的证据。把星光按波长展开，可以研究吸收特征，并进一步认识恒星的大气成分与物理状态。观察不止是“看见”，也是学习如何解释光。",
      ],
    ],
    sources: [
      {
        label: "NASA · Stars in an Exoplanet World",
        url: "https://science.nasa.gov/exoplanets/stars/",
      },
      {
        label: "NASA Webb · Stellar Spectra",
        url: "https://science.nasa.gov/asset/webb/continuous-spectra-blackbody-curves-of-stars/",
      },
    ],
  },
  {
    slug: "first-telescope",
    archiveId: "AA-003",
    archiveTitle: "观星入门",
    archiveEn: "FIELD OBSERVATION",
    category: "观测入门",
    title: "第一场观星，\n从抬头开始。",
    description: "先认识天空，再选择适合自己的观测工具。",
    image: "moon",
    sections: [
      [
        "先给夜空一点时间",
        "选择安全、视野开阔且尽量远离直射灯光的位置。先用肉眼辨认月亮与明亮的星群，再对照星图寻找方向。让眼睛适应环境，减少明亮屏幕的干扰；一次只寻找少量目标，会比匆忙扫过整片天空更容易留下印象。",
      ],
      [
        "双筒望远镜也是起点",
        "双筒望远镜便于携带，视野通常比天文望远镜更宽，适合熟悉星区与欣赏较大范围的目标。使用手头已有的器材，或参加天文社团的公众观测，可以帮助你判断自己喜欢怎样的观测体验。",
      ],
      [
        "选择稳定，而不只是放大",
        "望远镜的使用体验不只由放大倍率决定。稳定的支架、容易操作的寻星方式、可接受的体积与重量，都影响你是否愿意经常把它搬出去。购买之前，尽量实际体验不同器材，并了解它们适合的目标。",
      ],
      [
        "把月亮作为练习对象",
        "月面明暗交界附近的阴影能帮助你辨认地形。尝试在不同夜晚记录同一片区域，你会看到照明角度如何改变景观。绝不要把未经专门安全配置的望远镜或双筒镜指向太阳；日间观测需要另行学习正规的太阳观测方法。",
      ],
    ],
    sources: [
      {
        label: "NASA · Skywatching",
        url: "https://science.nasa.gov/skywatching/",
      },
      {
        label: "NASA · Binoculars: A Great First Telescope",
        url: "https://science.nasa.gov/solar-system/skywatching/night-sky-network/binoculars-a-great-first-telescope/",
      },
      {
        label: "NASA · Moon Viewing Tips",
        url: "https://science.nasa.gov/moon/viewing-tips/",
      },
    ],
  },
  {
    slug: "orion",
    archiveId: "AA-004",
    archiveTitle: "猎户座",
    archiveEn: "ORION",
    category: "星座辨认",
    title: "沿着猎户的腰带，\n找到冬夜的路标。",
    description: "从醒目的腰带星群出发，辨认亮星与恒星诞生的云。",
    image: "constellation",
    sketch: {
      points: [
        [67, 32],
        [159, 46],
        [89, 85],
        [110, 91],
        [132, 97],
        [60, 156],
        [165, 167],
        [109, 137],
      ],
      links: [
        [0, 1],
        [0, 2],
        [1, 4],
        [2, 3],
        [3, 4],
        [2, 5],
        [4, 6],
        [5, 6],
        [3, 7],
      ],
      accent: [0, 2, 3, 4],
    },
    sections: [
      [
        "先寻找腰带，再连接轮廓",
        "猎户座中央近乎排成一线的三颗亮星，构成了醒目的腰带星群。先找到这条短线，再向周围辨认肩部与足部的亮星，比一开始就寻找完整的人形轮廓容易。封面只提炼了这一识别特征，连线用于辅助记忆，并非精确星图。",
      ],
      [
        "用星光的颜色认识亮星",
        "参宿四与参宿七是猎户座中容易辨认的亮星，前者呈偏红色，后者呈蓝白色。它们并不是画在同一张平面上的灯泡：从地球看上去相邻，不代表在空间中彼此紧挨。将星座当作天空中的方向索引，能帮助我们区分图案与真实的宇宙结构。",
      ],
      [
        "腰带下方，藏着恒星的摇篮",
        "腰带下方的剑部包含猎户座星云。在足够晴朗、黑暗的条件下，肉眼可能发现一小片模糊光斑；照片中丰富的颜色与细节，则不等于肉眼所见。NASA 的相关资料展示了这里的气体、尘埃以及恒星形成活动，可以将观测印象与科学图像对照阅读。",
      ],
      [
        "选择适合自己的观测时刻",
        "在北半球许多地区，猎户座是冬季夜空的典型目标；南北半球的季节与所见朝向并不相同。它何时升起、位于哪一侧天空，仍取决于所在位置、日期与时刻。出门前用设置好位置和时间的星图核对，不要将示意图上方直接当成当地天顶。",
      ],
    ],
    sources: [
      {
        label: "NASA · Orion Constellation",
        url: "https://science.nasa.gov/asset/hubble/orion-constellation/",
      },
      {
        label: "NASA · Discovering the Universe Through Orion",
        url: "https://science.nasa.gov/universe/stories/quick-reads/discovering-the-universe-through-the-constellation-orion/",
      },
      {
        label: "NASA · Skywatching FAQ",
        url: "https://science.nasa.gov/skywatching/faq/",
      },
    ],
  },
  {
    slug: "cassiopeia",
    archiveId: "AA-005",
    archiveTitle: "仙后座",
    archiveEn: "CASSIOPEIA",
    category: "星座辨认",
    title: "夜空中的字母 W，\n是仙后的轮廓。",
    description: "认识北天醒目的折线，也认识星图会转动的原因。",
    image: "constellation",
    sketch: {
      points: [
        [30, 55],
        [72, 134],
        [112, 72],
        [153, 123],
        [187, 37],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ],
      accent: [1, 2],
    },
    sections: [
      [
        "从一条折线开始辨认",
        "仙后座最容易辨认的部分是一组呈 W 形或 M 形排列的亮星。它们像一个不完全对称的字母，适合作为初识北天的轮廓。先辨认折线，再对照星图确认周围星区；不要只凭某一颗明亮的星就断定目标。",
      ],
      [
        "为什么 W 会变成 M",
        "随着观测时刻改变，星群在天空中的位置和朝向也会改变。仙后座的折线有时显得端正，有时倾斜，有时更像字母 M。星图通常可以随观察方向旋转；把屏幕或纸张转到与眼前星群相近的朝向，比要求夜空始终保持书上的方向更自然。",
      ],
      [
        "北天并不等于处处可见",
        "仙后座位于北天。它是否始终在地平线上方，取决于观测者的纬度；建筑、树木和地形也可能挡住较低的天空。本文不提供面向所有地点的固定可见时间，实际寻找时应先检查本地星图与地平线条件。",
      ],
      [
        "从轮廓走向更深的天空",
        "明亮折线之外，仙后座所在天区还包含星团与星云。NASA 的资料介绍了这一方向上的深空目标，包括被称为仙后座幽灵的星云。辨认星座，是建立方位感的起点；阅读图像说明，则能帮助你理解同一方向上不同距离、不同性质的天体。",
      ],
    ],
    sources: [
      {
        label: "NASA · Hubble Captures the Ghost of Cassiopeia",
        url: "https://science.nasa.gov/missions/hubble/hubble-captures-the-ghost-of-cassiopeia/",
      },
      {
        label: "NASA · Circumpolar Constellations",
        url: "https://science.nasa.gov/solar-system/skywatching/night-sky-network/feb2024-night-sky-notes/",
      },
      {
        label: "NASA · Skywatching FAQ",
        url: "https://science.nasa.gov/skywatching/faq/",
      },
    ],
  },
  {
    slug: "ursa-major",
    archiveId: "AA-006",
    archiveTitle: "大熊座与北斗",
    archiveEn: "URSA MAJOR",
    category: "星座辨认",
    title: "认出北斗之后，\n再找到大熊与北方。",
    description: "区分星座与星群，沿着熟悉的斗形寻找北极星。",
    image: "constellation",
    sketch: {
      points: [
        [24, 52],
        [56, 67],
        [85, 103],
        [123, 112],
        [184, 104],
        [174, 154],
        [125, 155],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 3],
      ],
      accent: [4, 5],
    },
    sections: [
      [
        "北斗是图案，大熊是星座",
        "北斗是大熊座中一组著名的星群，轮廓像带柄的勺子。星群是便于辨认的星星图案，不能直接等同于整个星座。认识北斗之后，可以继续对照完整星图寻找大熊座的其他部分，建立从局部图案到较大天区的联系。",
      ],
      [
        "沿斗口寻找北极星",
        "北斗斗口外侧的两颗星，可以帮助指示北极星的方向。先确定斗柄与斗身，再沿斗口的指向在星图上核对目标。北极星位于小熊座，接近北天极；它不是北斗的一员，也不以全天最亮的星这一身份充当路标。",
      ],
      [
        "方向提示有使用条件",
        "北极星在北半球是很有用的方位参照，但越接近赤道，它在天空中的位置越低；在南半球多数地点不能依赖它来辨认方向。树木、建筑与地形也会影响寻找。将星图、实际地平线与所在纬度结合起来，比只记住一条连线更可靠。",
      ],
      [
        "记录同一个图案的变化",
        "在安全且视野开阔的地点，尝试在不同时间画下北斗相对地平线的朝向。保留地点、日期与时间记录，再比较图案如何转动。封面展示的是北斗识别轮廓，不是大熊座的完整边界，也不是此刻当地天空的实时位置。",
      ],
    ],
    sources: [
      {
        label: "NASA · What Is the North Star?",
        url: "https://science.nasa.gov/solar-system/what-is-the-north-star-and-how-do-you-find-it/",
      },
      {
        label: "NASA · Skywatching FAQ",
        url: "https://science.nasa.gov/skywatching/faq/",
      },
      {
        label: "NASA · Constellation Ursa Major",
        url: "https://science.nasa.gov/asset/hubble/constellation-ursa-major/",
      },
    ],
  },
];

// Preserve published archive IDs and routes while enriching the original three files.
let nextArchiveId = 7;
export const articles: Article[] = [
  ...baseArticles.filter((a) => a.image !== "constellation"),
  ...constellationCatalog.map((record): Article => {
    const story = constellationStories.find((item) => item[0] === record.abbr);
    if (!story) throw new Error(`Missing constellation story: ${record.abbr}`);
    const [, name, title, origin, body, note, sky] = story;
    const previous = baseArticles.find((a) => a.slug === record.slug);
    return {
      slug: record.slug,
      archiveId: previous?.archiveId ?? `AA-${String(nextArchiveId++).padStart(3, "0")}`,
      archiveTitle: name,
      archiveEn: record.en.toUpperCase(),
      category: "星座故事",
      title,
      description: `${name} · ${body.split("。").slice(0, 2).join("。")}。`,
      image: "constellation",
      sketch: previous?.sketch,
      constellation: { abbr: record.abbr, season: record.season, origin, visibility: record.visibility },
      sections: [
        [`${origin} · ${title}`, body],
        ["版本与名称辨析", note],
        ["从故事回到夜空", sky],
        ["季节与观测条件", `本档案按北半球的${record.season}晚间星空编排，南半球对应相反季节。季节是查阅线索，不代表只在这个季节可见。${record.visibility}近极星座在合适纬度可能全年可见；改变观测时刻也会改变能看到的星空。分组依据见参考资料中的季节星空表。`],
        ...(previous?.sections ?? []),
      ],
      sources: [
        { label: `Constellation Guide · ${record.en}：来历、星图与观测资料`, url: record.url },
        { label: "Constellation Guide · 晚间季节分组与适用条件", url: SEASON_SOURCE },
        ...(previous?.sources ?? []),
      ],
    };
  }),
];
