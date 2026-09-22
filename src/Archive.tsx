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
  const constellation = article.category === "星座辨认";
  const collection = articles
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => (record.category === "星座辨认") === constellation);
  const position = collection.findIndex((record) => record.index === selected);
  const remembered = useRef({
    constellation: articles.findIndex(
      (record) => record.category === "星座辨认",
    ),
    foundation: 0,
  });
  useEffect(() => {
    remembered.current[constellation ? "constellation" : "foundation"] =
      selected;
  }, [selected, constellation]);
  const change = (index: number) =>
    onSelect(collection[(index + collection.length) % collection.length].index);
  const handleKeys = (event: KeyboardEvent<HTMLElement>) => {
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
      <div className="section-heading">
        <span className="eyebrow">ASTRAL ATLAS / 天文知识档案</span>
        <h2>把每一次仰望，收进档案。</h2>
        <p>选择一份档案，从一个问题读懂一片宇宙。</p>
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
            onClick={() => onSelect(remembered.current.constellation)}
          >
            星座档案 <span>CONSTELLATIONS</span>
          </button>
          <button
            aria-pressed={!constellation}
            onClick={() => onSelect(remembered.current.foundation)}
          >
            宇宙基础 <span>FUNDAMENTALS</span>
          </button>
        </div>
        <div className="archive-stage" role="group" aria-label="选择档案">
          <div className="archive-deck">
            {collection.map(({ record, index }, slot) => {
              const offset =
                (slot - position + collection.length) % collection.length;
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
              {collection.map(({ record, index }) => (
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
      </div>
      <p className="archive-collection-note">
        档案编号为本站编目。封面为主题示意，正文附原始科学资料链接。
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
          <p>封面为主题示意，不代表实际天体比例或观测星图。</p>
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
          <div className="archive-rule" />
          <dl className="archive-metadata">
            <div>
              <dt>SUBJECT / 主题</dt>
              <dd>{article.category}</dd>
            </div>
            <div>
              <dt>TYPE / 文档类型</dt>
              <dd>中文科普整理</dd>
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
                  REFERENCES / 原始资料
                </span>
                <h2>让每一份知识，都有出处。</h2>
                <p>
                  本档案为中文科普整理。以下是原始资料与延伸阅读，点击将在新窗口打开。
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
