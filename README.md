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

## 交互与数据

- 拖拽轨道图旋转；选择框与行星条目同步选择；提供暂停和重置视角。
- WebGL 不可用时使用二维轨道，保留完整的天体选择与内容。
- 轨道布局、天体尺寸与运动速度为教学示意，不是实时星历。画布离屏、标签页隐藏时暂停运动；遵循减少动态效果设置。
- 行星直径、公转周期和轨道距离来自 NASA Planetary Fact Sheet；AU 按 IAU 定义由百万千米换算。页面提供来源链接。
- NOAA SWPC Kp 数据每五分钟刷新，显示观测与获取时间。超时、空数据、无效数据和网络故障有独立提示；更新失败保留旧数据，超过六小时标记过期。Kp 不等于本地极光预报。
- 文章使用 hash 路由，支持直接打开、刷新和浏览器前进后退；未知文章显示返回入口。
- 文章以档案形式展示，参考 `RhineLabUI` 的实体档案与分栏阅读结构，使用本站的深空黑与铜橙配色。首页提供编号、叠层封面、选档与读取；详情按「档案概览 / 阅读全文 / 参考资料」分组，保留原文章地址和完整正文。
- 档案库包含「星座档案」与「宇宙基础」两类，共六份文档。默认展示猎户座，可切换仙后座、大熊座与北斗；原有太阳系、恒星颜色和观星入门归入宇宙基础。分类内首尾循环，浏览期间记住各分类选档。
- 星座档案地址为 `#/articles/orion`、`#/articles/cassiopeia`、`#/articles/ursa-major`。封面连线是识别轮廓示意，不是精确坐标或实时星空；文章说明可见性与所在位置、时刻的关系，并附 NASA 原始资料。
- 档案库支持点击、左右方向键、Home/End 与前后切换按钮；详情页签支持方向键，目录可跳到正文对应段落。返回档案库保留当前选档。移动端正文随页面自然滚动，桌面使用独立阅读区。
- 档案封面和抽取反馈使用 CSS，不新增 WebGL 场景，也不复制参考项目的模型、品牌、字体或虚构授权信息。`src/data.ts` 中的 `archiveId` 为稳定站内编号；插图为主题示意。
- 字体通过 Fontsource 在构建中本地打包，无在线字体依赖。行星缩略图为程序化示意，不使用未标注来源的天文照片。
