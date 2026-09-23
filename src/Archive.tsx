import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Orbit,
} from "lucide-react";
import { articles } from "./data";
import { SpacecraftDrawing } from "./SpacecraftDrawing";
import { seasons, SEASON_SOURCE, CATALOG_SOURCE, type Season } from "./constellationCatalog";
import "./archive.css";

type Article = (typeof articles)[number];
type Tab = "overview" | "body" | "sources";
const tabs: { id: Tab; label: string; en: string }[] = [
  { id: "overview", label: "档案概览", en: "ABSTRACT" },
  { id: "body", label: "阅读全文", en: "DOCUMENT" },
  { id: "sources", label: "参考资料", en: "REFERENCES" },
];

function ArchivePlate({ article }: { article: Article }) {
  return (
    <span className={`archive-plate archive-plate-${article.image}`}>
      <span className="plate-fastener plate-fastener-tl" />
      <span className="plate-fastener plate-fastener-tr" />
      <span className="plate-fastener plate-fastener-bl" />
      <span className="plate-fastener plate-fastener-br" />
      <span className="plate-label">
        <Orbit size={17} strokeWidth={1.3} />
        <span>
          ASTRAL ATLAS<small>天文知识档案</small>
        </span>
        <span>{article.archiveId}</span>
      </span>
      <span className="plate-illustration">
        {article.spacecraft && <SpacecraftDrawing kind={article.spacecraft.kind} />}
        {article.sketch && (
          <svg
            className="plate-constellation"
            viewBox="0 0 220 190"
            aria-hidden="true"
          >
            <path d="M110 8V182 M12 95H208" className="constellation-guides" />
            {article.sketch.links.map(([from, to]) => (
              <line
                key={`${from}-${to}`}
                x1={article.sketch!.points[from][0]}
                y1={article.sketch!.points[from][1]}
                x2={article.sketch!.points[to][0]}
                y2={article.sketch!.points[to][1]}
                className="constellation-link"
              />
            ))}
            {article.sketch.points.map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={article.sketch!.accent.includes(i) ? 5 : 3.5}
                  className={
                    article.sketch!.accent.includes(i)
                      ? "constellation-star is-accent"
                      : "constellation-star"
                  }
                />
                {article.sketch!.accent.includes(i) && (
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    className="constellation-marker"
                  />
                )}
              </g>
            ))}
          </svg>
        )}
        {article.constellation && !article.sketch && (
          <span className="plate-catalog-stamp">
            <span>CONSTELLATION / 编目图章</span>
            <strong>{article.constellation.abbr}</strong>
            <small>{article.constellation.origin} · 非观测星图</small>
          </span>
        )}
        {article.image === "saturn" && (
          <>
            <span className="plate-orbit orbit-outer" />
            <span className="plate-orbit orbit-middle" />
            <span className="plate-orbit orbit-inner" />
            <span className="plate-sun" />
            <span className="plate-orbit-body" />
          </>
        )}
        {article.image === "stars" && (
          <>
            <span className="plate-star star-cool" />
            <span className="plate-star star-warm" />
            <span className="plate-spectrum" />
            <span className="plate-axis" />
          </>
        )}
        {article.image === "moon" && (
          <>
            <span className="plate-moon" />
            <span className="plate-sighting" />
            <span className="plate-horizon" />
          </>
        )}
      </span>
      <span className="plate-bottom">
        <span>
          {article.archiveEn}
          <strong>{article.archiveTitle}</strong>
        </span>
        <span className="plate-index">{article.archiveId.slice(-3)}</span>
      </span>
      <span className="plate-edge-mark" />
    </span>
  );
}

export function ArchiveBrowser({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const article = articles[selected];
  const root = useRef<HTMLElement>(null);
  const constellation = !!article.constellation;
  const spacecraft = !!article.spacecraft;
  const [season, setSeason] = useState("全部");
  const [query, setQuery] = useState("");
  const [hemisphere, setHemisphere] = useState("north");
  const seasonName = (value: Season, half = hemisphere) =>
    seasons[(seasons.indexOf(value) + (half === "south" ? 2 : 0)) % seasons.length];
  const matches = (record: Article, s: string, q: string, half: string) =>
    !!record.constellation &&
    (s === "全部" || seasonName(record.constellation.season, half) === s) &&
    `${record.archiveTitle} ${record.archiveEn} ${record.constellation.abbr} ${record.slug} ${record.slug === "aquarius" ? "水瓶" : record.slug === "virgo" ? "处女" : record.slug === "sagittarius" ? "射手" : ""}`
      .toLocaleLowerCase().includes(q.trim().toLocaleLowerCase());
  const collection = articles
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => constellation
      ? matches(record, season, query, hemisphere)
      : spacecraft ? !!record.spacecraft : !record.constellation && !record.spacecraft);
  const position = collection.findIndex((record) => record.index === selected);
  const chooseFilters = (s: string, q: string, half: string) => {
    setSeason(s);
    setQuery(q);
    setHemisphere(half);
    if (!matches(article, s, q, half)) {
      const first = articles.findIndex((record) => matches(record, s, q, half));
      if (first !== -1) onSelect(first);
    }
  };
  const remembered = useRef({
    constellation: articles.findIndex(
      (record) => !!record.constellation,
    ),
    foundation: 0,
    spacecraft: articles.findIndex((record) => !!record.spacecraft),
  });
  useEffect(() => {
    remembered.current[constellation ? "constellation" : spacecraft ? "spacecraft" : "foundation"] =
      selected;
  }, [selected, constellation, spacecraft]);
  useEffect(() => {
    const openMissions = () => {
      if (location.hash === "#spacecraft") onSelect(remembered.current.spacecraft);
    };
    openMissions();
    window.addEventListener("hashchange", openMissions);
    return () => window.removeEventListener("hashchange", openMissions);
  }, [onSelect]);
  const change = (index: number) => {
    if (!collection.length) return;
    const focusCover = document.activeElement?.closest(".archive-deck");
    onSelect(collection[(index + collection.length) % collection.length].index);
    if (focusCover) requestAnimationFrame(() => root.current?.querySelector<HTMLButtonElement>(".archive-object.is-selected")?.focus({ preventScroll: true }));
  };
  const handleKeys = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(".archive-filters")) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    change(
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? collection.length - 1
          : position + (event.key === "ArrowRight" ? 1 : -1),
    );
  };
  useEffect(() => {
    // Return to the same record without moving the page away from its archive anchor.
    try {
      if (sessionStorage.getItem("astral-archive-return") === "yes") {
        sessionStorage.removeItem("astral-archive-return");
        root.current
          ?.querySelector<HTMLAnchorElement>(".archive-open")
          ?.focus({ preventScroll: true });
      }
    } catch {
      /* Reading still works if browser storage is unavailable. */
    }
  }, []);
  return (
    <section id="reading" className="section reveal archive-section" ref={root}>
      <span id="spacecraft" className="spacecraft-anchor" aria-hidden="true" />
      <div className="section-heading">
        <span className="eyebrow">ASTRAL ATLAS / 天文知识档案</span>
        <h2>把每一次仰望，收进档案。</h2>
        <p>循着四季读星座，沿着航迹读远行，把故事带回真实的宇宙。</p>
      </div>
      <div
        className="archive-browser"
        onKeyDown={handleKeys}
        aria-label="天文档案浏览，左右方向键切换"
      >
        <div className="archive-browser-top">
          <span>ARCHIVE COLLECTION</span>
          <span>{String(articles.length).padStart(2, "0")} 份已收录文档</span>
        </div>
        <div
          className="archive-collection-switch"
          role="group"
          aria-label="档案分类"
        >
          <button
            aria-pressed={constellation}
            onClick={() => {
              setSeason("全部");
              setQuery("");
              onSelect(remembered.current.constellation);
            }}
          >
            星座档案 <span>CONSTELLATIONS</span>
          </button>
          <button
            aria-pressed={!constellation && !spacecraft}
            onClick={() => onSelect(remembered.current.foundation)}
          >
            宇宙基础 <span>FUNDAMENTALS</span>
          </button>
          <button aria-pressed={spacecraft} onClick={() => onSelect(remembered.current.spacecraft)}>
            深空探测器 <span>SPACECRAFT</span>
          </button>
        </div>
        {spacecraft && <div className="archive-filters mission-index">
          <div className="archive-filter-heading">
            <span className="eyebrow">MISSION FILES / 航天器任务索引</span>
            <span className="mission-history">任务回顾 · 非实时遥测</span>
          </div>
          <p>从巨行星到月球背面，也收录面向宇宙的空间天文台。选择一艘航天器，读取它的远行记录。</p>
          <div className="mission-directory">
            {collection.map(({ record, index }) => <button key={record.slug} aria-pressed={selected === index} onClick={() => onSelect(index)}>
              <SpacecraftDrawing kind={record.spacecraft!.kind} />
              <span><strong>{record.archiveTitle}</strong><small>{record.spacecraft!.target}</small></span>
              <span className="mission-file-id">{record.archiveId}</span>
            </button>)}
          </div>
        </div>}
        {constellation && (
          <div className="archive-filters">
            <div className="archive-filter-heading">
              <span className="eyebrow">SEASONAL INDEX / 四季星座索引</span>
              <label>季节参照
                <select value={hemisphere} onChange={(e) => chooseFilters(season, query, e.target.value)}>
                  <option value="north">北半球</option>
                  <option value="south">南半球</option>
                </select>
              </label>
            </div>
            <div className="archive-season-buttons" role="group" aria-label="按季节筛选星座">
              {["全部", ...seasons].map((s) => (
                <button key={s} aria-pressed={season === s} onClick={() => chooseFilters(s, query, hemisphere)}>
                  {s}<span>{articles.filter((a) => matches(a, s, "", hemisphere)).length}</span>
                </button>
              ))}
            </div>
            <div className="archive-find-row">
              <label htmlFor="constellation-find">按星座定位</label>
              <input id="constellation-find" type="search" value={query} placeholder="中文名、拉丁名或 IAU 缩写" onChange={(e) => chooseFilters(season, e.target.value, hemisphere)} />
              <span role="status">{collection.length} 份匹配档案</span>
            </div>
            <p className="archive-season-note">
              按{hemisphere === "north" ? "北" : "南"}半球晚间季节编目，并非只在该季节可见。南北半球季节相反，切换不改变星座的地理可见范围；近极星群在合适纬度可全年见到。
              <a href={SEASON_SOURCE} target="_blank" rel="noreferrer">季节分组依据 <ArrowUpRight size={12} /></a>
            </p>
            <div className="archive-directory" role="group" aria-label="星座目录">
              {collection.map(({ record, index }) => (
                <div className="archive-directory-row" key={record.slug}>
                <button aria-pressed={index === selected} onClick={() => onSelect(index)}>
                  <span>{record.constellation!.abbr}</span>
                  <strong>{record.archiveTitle}<small>{record.archiveEn}</small></strong>
                  <span>{seasonName(record.constellation!.season)}</span>
                </button>
                <a href={`#/articles/${record.slug}`} onClick={() => onSelect(index)} aria-label={`阅读${record.archiveTitle}档案`}>阅读<ArrowUpRight size={14} /></a>
                </div>
              ))}
            </div>
          </div>
        )}
        {collection.length === 0 ? (
          <div className="archive-empty" role="status">
            <FileText size={26} strokeWidth={1} />
            <h3>该天区暂无观测数据</h3>
            <p>当前条件未匹配到星座档案，可更换名称或清除筛选。</p>
            <button onClick={() => chooseFilters("全部", "", hemisphere)}>查看全部星座</button>
          </div>
        ) : <>
        <div className="archive-stage" role="group" aria-label="选择档案">
          <div className="archive-deck">
            {collection.map(({ record, index }, slot) => {
              const offset =
                (slot - position + collection.length) % collection.length;
              if (offset >= 3) return null;
              return (
                <button
                  key={record.slug}
                  className={`archive-object ${index === selected ? "is-selected" : ""}`}
                  style={{ "--slot": offset } as CSSProperties}
                  aria-label={`选择 ${record.archiveId} ${record.archiveTitle}`}
                  aria-pressed={index === selected}
                  onClick={() => onSelect(index)}
                >
                  <ArchivePlate article={record} />
                </button>
              );
            })}
          </div>
          <div className="archive-stage-caption">
            <span>DOCUMENT / {article.archiveId}</span>
            <span>点击档案切换</span>
          </div>
        </div>
        <div className="archive-callout" aria-live="polite" aria-atomic="true">
          <span className="archive-category">
            {article.category} / 公开科普
          </span>
          <div className="archive-file-number">
            FILE <span>{article.archiveId}</span>
          </div>
          <div className="archive-rule" />
          <h3 key={article.slug}>{article.title}</h3>
          <p>{article.description}</p>
          {article.spacecraft && <p className="archive-location-note">{article.spacecraft.type} · {article.spacecraft.target}<br />结构识别示意，非工程图。任务日期与科学事实见档案所附官方资料。</p>}
          {article.constellation && (
            <p className="archive-location-note">
              {seasonName(article.constellation.season)}晚间档案 · {article.constellation.origin}<br />
              {article.constellation.visibility}
            </p>
          )}
          <dl className="archive-preview-meta">
            <div>
              <dt>编目主题</dt>
              <dd>{article.archiveTitle}</dd>
            </div>
            <div>
              <dt>文献依据</dt>
              <dd>
                {[
                  ...new Set(
                    article.sources.map((s) => s.label.split(" · ")[0]),
                  ),
                ].join(" / ")}
              </dd>
            </div>
          </dl>
          <a className="archive-open" href={`#/articles/${article.slug}`}>
            <span>
              读取档案 <small>ACCESS FILE</small>
            </span>
            <ArrowUpRight size={21} />
          </a>
        </div>
        <div className="archive-browser-bottom">
          <span className="archive-counter">
            <strong>{String(position + 1).padStart(2, "0")}</strong>
            <span>/ {String(collection.length).padStart(2, "0")}</span>
          </span>
          <div className="archive-navigation">
            <button
              aria-label="上一份档案"
              onClick={() => change(position - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="archive-indices">
              {collection.length <= 3 && collection.map(({ record, index }) => (
                <button
                  key={record.slug}
                  onClick={() => onSelect(index)}
                  aria-label={`定位 ${record.archiveId} ${record.archiveTitle}`}
                  aria-pressed={index === selected}
                >
                  <span>{record.archiveId.slice(-3)}</span>
                </button>
              ))}
            </div>
            <button
              aria-label="下一份档案"
              onClick={() => change(position + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <span className="archive-key-hint">← → 切换档案 · Tab 选择操作</span>
        </div>
        </>}
      </div>
      <p className="archive-collection-note">
        {spacecraft ? "航天器封面为本站绘制的结构识别示意，距离、尺寸与组件比例不用于测量。任务资料依据 NASA、ESA 与国家航天局，逐篇附官方链接。" : <><a href={CATALOG_SOURCE} target="_blank" rel="noreferrer">全天星座名录与缩写依据</a> · 档案编号为本站编目，封面为编目图章或识别示意。故事为原创中文整理，神话与命名历史分开标注，逐篇附资料链接。</>}
      </p>
    </section>
  );
}

export function ArchiveReader({ article }: { article: Article }) {
  const [active, setActive] = useState<Tab>("overview");
  const panel = useRef<HTMLDivElement>(null);
  const sectionTarget = useRef<number | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const index = articles.findIndex((a) => a.slug === article.slug);
  const previous = articles[(index - 1 + articles.length) % articles.length];
  const next = articles[(index + 1) % articles.length];
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    if (active === "body" && sectionTarget.current !== null) {
      const target = document.getElementById(
        `archive-paragraph-${sectionTarget.current}`,
      );
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
      sectionTarget.current = null;
    } else if (panel.current) panel.current.scrollTop = 0;
  }, [active]);
  const changeTab = (tab: Tab) => {
    setActive(tab);
  };
  const tabKeys = (
    event: KeyboardEvent<HTMLButtonElement>,
    current: number,
  ) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const target =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (current + delta + tabs.length) % tabs.length;
    changeTab(tabs[target].id);
    document.getElementById(`archive-tab-${tabs[target].id}`)?.focus();
  };
  return (
    <article className="archive-reader shell">
      <div className="archive-reader-top">
        <a
          href="#reading"
          onClick={() => {
            try {
              sessionStorage.setItem("astral-archive-return", "yes");
            } catch {
              /* Focus restoration is optional when storage is blocked. */
            }
          }}
        >
          <ArrowLeft size={16} /> 返回档案库
        </a>
        <span>ASTRAL ATLAS / KNOWLEDGE ARCHIVE</span>
      </div>
      <div className="archive-reader-grid">
        <aside className="archive-cover">
          <div className="archive-cover-label">
            <span>DOCUMENT OBJECT</span>
            <span>{article.archiveId}</span>
          </div>
          <div className="archive-cover-object">
            <ArchivePlate article={article} />
          </div>
          <div className="archive-cover-caption">
            <span>
              <strong>{article.archiveId}</strong>
              <small>{article.archiveEn}</small>
            </span>
            <FileText size={23} strokeWidth={1} />
          </div>
          <p>{article.spacecraft ? "封面为航天器结构识别示意，不代表真实尺寸、组件比例或工程图。" : "封面为主题示意，不代表实际天体比例或观测星图。"}</p>
          <nav className="archive-related" aria-label="相邻档案">
            <a
              href={`#/articles/${previous.slug}`}
              aria-label={`上一份档案：${previous.archiveTitle}`}
            >
              <ChevronLeft size={16} />
              <span>
                <small>上一份</small>
                {previous.archiveTitle}
              </span>
            </a>
            <a
              href={`#/articles/${next.slug}`}
              aria-label={`下一份档案：${next.archiveTitle}`}
            >
              <span>
                <small>下一份</small>
                {next.archiveTitle}
              </span>
              <ChevronRight size={16} />
            </a>
          </nav>
        </aside>
        <div className="archive-document">
          <div className="archive-document-kicker">
            <span>FILE {article.archiveId}</span>
            <span>开放阅读</span>
          </div>
          <h1 ref={heading} tabIndex={-1}>
            {article.archiveTitle}
          </h1>
          <p className="archive-document-en">{article.archiveEn}</p>
          {article.spacecraft && <p className="archive-story-note">任务回顾 · 非实时遥测。历史节点与任务介绍依据所附官方资料。</p>}
          {article.constellation && (
            <p className="archive-story-note">
              {article.constellation.origin} · 文化叙事与观测事实分开记录，同一形象可能有多个传说版本。
            </p>
          )}
          <div className="archive-rule" />
          <dl className="archive-metadata">
            <div>
              <dt>SUBJECT / 主题</dt>
              <dd>{article.category}</dd>
            </div>
            <div>
              <dt>TYPE / 文档类型</dt>
              <dd>{article.constellation?.origin ?? article.spacecraft?.type ?? "中文科普整理"}</dd>
            </div>
            <div>
              <dt>REFERENCES / 文献依据</dt>
              <dd>
                {[
                  ...new Set(
                    article.sources.map((s) => s.label.split(" · ")[0]),
                  ),
                ].join(" / ")}
              </dd>
            </div>
            <div>
              <dt>COLLECTION / 编目</dt>
              <dd>{article.archiveId} · 星序知识库</dd>
            </div>
            {article.constellation && <>
              <div>
                <dt>SEASON / 晚间季节</dt>
                <dd>北半球{article.constellation.season} · 南半球{seasons[(seasons.indexOf(article.constellation.season) + 2) % 4]}</dd>
              </div>
              <div>
                <dt>VISIBILITY / 可见范围</dt>
                <dd>{article.constellation.visibility}</dd>
              </div>
            </>}
          </dl>
          <div className="archive-tabs" role="tablist" aria-label="档案内容">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                id={`archive-tab-${tab.id}`}
                role="tab"
                aria-controls="archive-content-panel"
                aria-selected={active === tab.id}
                tabIndex={active === tab.id ? 0 : -1}
                onClick={() => changeTab(tab.id)}
                onKeyDown={(e) => tabKeys(e, i)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className="archive-panel"
            ref={panel}
            id="archive-content-panel"
            role="tabpanel"
            aria-labelledby={`archive-tab-${active}`}
            tabIndex={0}
            key={active}
          >
            {active === "overview" && (
              <div className="archive-abstract">
                <span className="archive-panel-label">ABSTRACT / 摘要</span>
                <h2>{article.title.replace("\n", "")}</h2>
                <p>{article.description}</p>
                <p>{article.sections[0][1]}</p>
                <div className="archive-contents">
                  <span className="archive-panel-label">
                    CONTENTS / 档案目录
                  </span>
                  {article.sections.map(([title], i) => (
                    <button
                      key={title}
                      onClick={() => {
                        sectionTarget.current = i;
                        setActive("body");
                      }}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {title}
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {active === "body" && (
              <div className="archive-body">
                <span className="archive-panel-label">DOCUMENT / 正文</span>
                {article.sections.map(([title, body], i) => (
                  <section key={title}>
                    <h2 id={`archive-paragraph-${i}`} tabIndex={-1}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {title}
                    </h2>
                    <p>{body}</p>
                  </section>
                ))}
                <p className="archive-body-end">
                  档案正文结束。科学依据与延伸阅读见「参考资料」。
                </p>
              </div>
            )}
            {active === "sources" && (
              <div className="archive-sources">
                <span className="archive-panel-label">
                  REFERENCES / 资料来源
                </span>
                <h2>让每一份知识，都有出处。</h2>
                <p>
                  {article.spacecraft ? "本档案为依据任务机构公开资料撰写的中文科普回顾。封面为本站绘制的结构示意，未使用官方照片。日期对应历史事件，不表示实时工作状态；最新进展请查阅下方官方页面。" : article.constellation ? "本档案为原创中文整理，并非逐字翻译。故事与命名史据逐星座资料核对；季节表用于编目，不替代设定了地点和时间的星图。以下资料在新窗口打开。" : "本档案为原创中文科普整理。科学依据与延伸阅读见以下资料，链接在新窗口打开。"}
                </p>
                {article.sources.map((source, i) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {source.label}
                      <small>{new URL(source.url).hostname}</small>
                    </span>
                    <ArrowUpRight size={17} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="archive-document-bottom">
            <span>星序编目 · {article.archiveId}</span>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(articles.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
