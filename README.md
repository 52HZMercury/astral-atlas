# 星序 · Astral Atlas

面向非专业用户的中文天文知识网站。React、Vite、TypeScript、Tailwind CSS、React Three Fiber 与 Lucide React；无需后端或 API 密钥。

## 运行

使用 Node.js 22.13 或更新版本：

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
```

当前机器默认 Node.js 为 14，需先切换新版运行时。此次安装的独立运行时位于 `%LOCALAPPDATA%\astral-atlas-tools\node-v22.16.0-win-x64`。PowerShell 中可仅对当前终端设置：

```powershell
$env:PATH = "$env:LOCALAPPDATA\astral-atlas-tools\node-v22.16.0-win-x64;" + $env:PATH
cd D:\MyProgram\astral-atlas
npm run dev
```

## GitHub Pages 部署

`.github/workflows/pages.yml` 会在推送到 `main` 时运行测试、构建并部署，也支持在 Actions 页面手动执行。仓库需要先在 Settings → Pages 中启用 GitHub Actions 作为发布来源；私有仓库需要支持 Pages 的 GitHub 套餐。

```sh
npm run build:pages
npm run preview -- --mode github-pages
```

Pages 构建使用 `/astral-atlas/` 资源路径，普通本地构建仍使用根路径。预览时访问终端地址下的 `/astral-atlas/`。启用 Pages 并成功部署后，站点地址为 https://52hzmercury.github.io/astral-atlas/ ，文章可通过 `#/articles/orion` 等地址直接访问。

## 交互与数据

- 拖拽轨道图旋转；选择框与行星条目同步选择；提供暂停和重置视角。
- WebGL 不可用时使用二维轨道，保留完整的天体选择与内容。
- 轨道布局、天体尺寸与运动速度为教学示意，不是实时星历。画布离屏、标签页隐藏时暂停运动；遵循减少动态效果设置。
- 行星直径、公转周期和轨道距离来自 NASA Planetary Fact Sheet；AU 按 IAU 定义由百万千米换算。页面提供来源链接。
- NOAA SWPC Kp 数据每五分钟刷新，显示观测与获取时间。超时、空数据、无效数据和网络故障有独立提示；更新失败保留旧数据，超过六小时标记过期。Kp 不等于本地极光预报。
- 文章使用 hash 路由，支持直接打开、刷新和浏览器前进后退；未知文章显示返回入口。
- 文章以档案形式展示，参考 `RhineLabUI` 的实体档案与分栏阅读结构，使用本站的深空黑与铜橙配色。首页提供编号、叠层封面、选档与读取；详情按「档案概览 / 阅读全文 / 参考资料」分组，保留原文章地址和完整正文。
- 档案库收录全天 88 个现代星座、三份宇宙基础文档与八份航天器任务档案，共 99 份。每个星座有独立的故事、版本与名称辨析、辨认线索、季节与可见范围、参考资料。巨蛇的蛇头与蛇尾合为一份档案。
- 新增「深空探测器」分类与导航入口 `#spacecraft`，收录旅行者双子、先锋十号、卡西尼—惠更斯、新视野、朱诺、韦布、罗塞塔—菲莱与嫦娥四号。韦布明确标为空间天文台，任务历史不冒充实时遥测；每篇附 NASA、ESA 或国家航天局官方出处。
- 航天器使用八种独立的 SVG 结构示意，突出碟形天线、仪器臂、太阳能翼、镜面或着陆支腿。列表和档案封面共用图案，不依赖外部图片或额外 3D 场景。内容维护于 `src/spacecraft.ts`，图案维护于 `src/SpacecraftDrawing.tsx`；新增档案编号为 AA-092 至 AA-099，旧编号及路由保持稳定。
- 星座可按四季筛选，支持南北半球季节参照切换和中文名、拉丁名、IAU 缩写定位。北半球分组为春季 21、夏季 27、秋季 17、冬季 23 份；依据 [Constellation Guide 季节表](https://www.constellation-guide.com/seasonal-constellations/)。这是晚间阅读与观星编目，不代表只在该季节可见，也不保证当地可见。近极星群可能全年可见，深南天档案明确提示纬度限制。
- 原有 `#/articles/orion`、`#/articles/cassiopeia`、`#/articles/ursa-major` 地址、档案编号、识别图与观测正文保留。其余使用拉丁名路由，例如 `#/articles/andromeda`。新的封面采用 IAU 缩写编目图章，不伪造星图。
- 内容是独立撰写的中文摘要，区分古典神话、航海制图、仪器命名与历史纪念，不以星座解释性格或命运。逐星座出处在每篇「参考资料」中。用户提供的知乎主页访问返回 403，未将无法读取的文章列作已使用来源。
- 名录与季节信息维护于 `src/constellationCatalog.ts`，中文故事维护于 `src/constellationStories.ts`，`src/data.ts` 组合内容并保留旧档案。核对时已读取全部 88 个对应资料页；网站运行时不依赖这些页面请求。
- 档案库支持点击、左右方向键、Home/End 与前后切换按钮；详情页签支持方向键，目录可跳到正文对应段落。返回档案库保留当前选档。移动端正文随页面自然滚动，桌面使用独立阅读区。
- 档案封面和抽取反馈使用 CSS，不新增 WebGL 场景，也不复制参考项目的模型、品牌、字体或虚构授权信息。`src/data.ts` 中的 `archiveId` 为稳定站内编号；插图为主题示意。
- 字体通过 Fontsource 在构建中本地打包，无在线字体依赖。行星缩略图为程序化示意，不使用未标注来源的天文照片。
