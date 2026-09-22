import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Crosshair,
  Menu,
  MoveHorizontal,
  Orbit,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./styles.css";
import { articles, AU_SOURCE, NASA_FACTS, planets, toAU } from "./data";
import Observatory from "./Observatory";
import { ArchiveBrowser, ArchiveReader } from "./Archive";
const SolarScene = lazy(() => import("./SolarScene"));

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(m.matches);
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  return reduced;
}
function PlanetDisc({
  index,
  large = false,
}: {
  index: number;
  large?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`planet-disc planet-${index} ${large ? "large" : ""}`}
      style={{ "--planet": planets[index].color } as React.CSSProperties}
    />
  );
}
function App() {
  const [hash, setHash] = useState(location.hash || "#/");
  const [selected, setSelected] = useState(2),
    [reset, setReset] = useState(0),
    [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [visible, setVisible] = useState(true),
    [tabVisible, setTabVisible] = useState(!document.hidden);
  const sceneRef = useRef<HTMLDivElement>(null),
    topRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [flat, setFlat] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState(() =>
    articles.findIndex((article) => article.slug === "orion"),
  );
  const articleRoute = hash.startsWith("#/articles/");
  const article = articleRoute
    ? articles.find((a) => `#/articles/${a.slug}` === hash)
    : undefined;
  useEffect(() => {
    const change = () => {
      setHash(location.hash || "#/");
      setMenu(false);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.title = article
      ? `${article.title.replace("\n", "")} | 星序`
      : "星序 · Astral Atlas | 让宇宙有迹可循";
    if (hash.startsWith("#/") || !hash)
      window.scrollTo({ top: 0, behavior: "instant" });
    else
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }),
      );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [hash, article, reduced]);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) =>
      setScrolled(!e.isIntersecting),
    );
    if (topRef.current) observer.observe(topRef.current);
    const sceneObserver = new IntersectionObserver(([e]) =>
      setVisible(e.isIntersecting),
    );
    if (sceneRef.current) sceneObserver.observe(sceneRef.current);
    const change = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => {
      observer.disconnect();
      sceneObserver.disconnect();
      document.removeEventListener("visibilitychange", change);
    };
  }, [articleRoute]);
  useEffect(() => {
    if (article) setSelectedArchive(articles.indexOf(article));
  }, [article]);
  const p = planets[selected];
  return (
    <>
      <a className="skip-link" href="#main">
        跳至主要内容
      </a>
      <div ref={topRef} className="top-sentinel" />
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <div className="header-inner">
          <a href="#/" className="brand" aria-label="星序首页">
            <Orbit size={29} strokeWidth={1.3} />
            <span>
              星序<span className="brand-en">ASTRAL ATLAS</span>
            </span>
          </a>
          <nav aria-label="主导航" className={menu ? "nav open" : "nav"}>
            <a href="#solar-system">太阳系图谱</a>
            <a href="#knowledge">宇宙知识</a>
            <a href="#observatory">观测数据</a>
            <a href="#reading">天文档案</a>
          </nav>
          <a className="header-action" href="#solar-system">
            开启探索 <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? "关闭导航" : "打开导航"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        {articleRoute ? (
          article ? (
            <ArchiveReader key={article.slug} article={article} />
          ) : (
            <div className="not-found shell">
              <h1>这条航线尚未收录。</h1>
              <p>没有找到对应文章，请返回图谱继续探索。</p>
              <a className="button" href="#/">
                返回首页 <ArrowRight size={16} />
              </a>
            </div>
          )
        ) : (
          <>
            <section className="hero shell">
              <div className="hero-copy">
                <span className="eyebrow">
                  <span className="tiny-line" /> 给每一份仰望，一个坐标
                </span>
                <h1>
                  从太阳系边缘，
                  <br />到<span className="accent">宇宙的边界。</span>
                </h1>
                <p>
                  让遥远的世界变得可以理解。
                  <br />
                  沿着轨道、星光与真实观测，建立你的宇宙图景。
                </p>
                <a className="button" href="#solar-system">
                  从我们的太阳系出发 <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="hero-visual" ref={sceneRef}>
                <div className="visual-top">
                  <span>THE SOLAR SYSTEM</span>
                  <Crosshair size={17} />
                </div>
                <div className="canvas-frame">
                  <Suspense
                    fallback={<div className="scene-loading">星图载入中…</div>}
                  >
                    <SolarScene
                      selected={selected}
                      onSelect={setSelected}
                      reset={reset}
                      onFallback={setFlat}
                      running={visible && tabVisible && !paused && !reduced}
                    />
                  </Suspense>
                </div>
                <div className="scene-controls">
                  <span>
                    <MoveHorizontal size={14} />{" "}
                    {flat ? "二维轨道 · 选择天体查看资料" : "拖拽旋转轨道"}
                  </span>
                  <div>
                    <button
                      aria-label={paused ? "播放轨道运动" : "暂停轨道运动"}
                      disabled={reduced || flat}
                      onClick={() => setPaused(!paused)}
                    >
                      {paused || reduced ? (
                        <Play size={15} />
                      ) : (
                        <Pause size={15} />
                      )}
                    </button>
                    <button
                      aria-label="重置轨道视角"
                      disabled={flat}
                      onClick={() => setReset((v) => v + 1)}
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>
                </div>
                <div className="scene-selection">
                  <label htmlFor="planet-select">当前天体</label>
                  <select
                    id="planet-select"
                    value={selected}
                    onChange={(e) => setSelected(Number(e.target.value))}
                  >
                    {planets.map((planet, i) => (
                      <option key={planet.en} value={i}>
                        {planet.name} / {planet.en}
                      </option>
                    ))}
                  </select>
                  <span className="selection-au">
                    {toAU(p.distance)} <small>AU</small>
                  </span>
                </div>
                <p className="scene-note">
                  教学示意：距离、尺寸与运动速度非真实比例。
                  <a href={NASA_FACTS} target="_blank" rel="noreferrer">
                    数据 NASA
                  </a>{" "}
                  /{" "}
                  <a href={AU_SOURCE} target="_blank" rel="noreferrer">
                    AU 换算 IAU
                  </a>
                </p>
              </div>
            </section>
            <div className="intro-strip shell">
              <span>保持好奇，校准想象。</span>
              <p>从熟悉的蓝色星球开始，认识我们所在的宇宙。</p>
              <Orbit size={18} />
            </div>
            <div className="shell">
              <section
                id="solar-system"
                className="section reveal solar-section"
              >
                <div className="section-heading">
                  <span className="eyebrow">我们的宇宙邻里</span>
                  <h2>
                    每一条轨道，
                    <br />
                    都有一个不同的世界。
                  </h2>
                  <p>选择一颗行星，读懂它在太阳系中的位置。</p>
                </div>
                <div className="solar-layout">
                  <aside className="planet-focus">
                    <div className="focus-head">
                      <span>{p.type}</span>
                      <Crosshair size={18} />
                    </div>
                    <div className="focus-planet">
                      <PlanetDisc index={selected} large />
                    </div>
                    <div className="focus-name">
                      <h3>{p.name}</h3>
                      <span>{p.en}</span>
                    </div>
                    <p>{p.text}</p>
                    <a
                      href={`https://science.nasa.gov/${["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"][selected]}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      阅读 NASA 天体档案 <ArrowUpRight size={15} />
                    </a>
                  </aside>
                  <div className="planet-list">
                    <div className="planet-table-head">
                      <span>行星 / PLANET</span>
                      <span>直径 · km</span>
                      <span>公转周期 · 天</span>
                      <span>轨道 · AU</span>
                    </div>
                    {planets.map((planet, i) => (
                      <button
                        key={planet.en}
                        className={`planet-row ${selected === i ? "selected" : ""}`}
                        aria-expanded={selected === i}
                        onClick={() => setSelected(i)}
                      >
                        <span className="planet-row-main">
                          <span className="planet-identity">
                            <PlanetDisc index={i} />
                            <span>
                              {planet.name}
                              <small>{planet.en}</small>
                            </span>
                          </span>
                          <span className="datum">
                            <small>直径 km</small>
                            {planet.diameter.toLocaleString("en-US")}
                          </span>
                          <span className="datum">
                            <small>周期 天</small>
                            {planet.days.toLocaleString("en-US")}
                          </span>
                          <span className="datum">
                            <small>轨道 AU</small>
                            {toAU(planet.distance)}
                            {selected === i ? (
                              <Check size={12} />
                            ) : (
                              <ChevronDown size={12} />
                            )}
                          </span>
                        </span>
                        <span className="planet-extra">{planet.text}</span>
                      </button>
                    ))}
                    <p className="source-line">
                      数值来源：
                      <a href={NASA_FACTS} target="_blank" rel="noreferrer">
                        NASA Planetary Fact Sheet
                      </a>
                      。直径为赤道直径；轨道为半长轴，依据{" "}
                      <a href={AU_SOURCE} target="_blank" rel="noreferrer">
                        IAU 天文单位定义
                      </a>
                      换算并取近似值。
                    </p>
                  </div>
                </div>
              </section>
              <section id="knowledge" className="section reveal">
                <div className="section-heading">
                  <h2>把好奇，向更远处延伸。</h2>
                  <p>从一个问题开始，找到理解宇宙的新角度。</p>
                </div>
                <div className="knowledge-grid">
                  <a
                    className="feature-story"
                    href="#/articles/solar-system-scale"
                  >
                    <div className="feature-orbit" aria-hidden="true">
                      <PlanetDisc index={5} large />
                    </div>
                    <div className="feature-content">
                      <span className="micro">尺度与距离</span>
                      <h3>
                        宇宙很大。
                        <br />
                        先找到我们的刻度。
                      </h3>
                      <p>太阳系的广阔，藏在行星之间的留白里。</p>
                      <span className="text-link">
                        认识太阳系尺度 <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </a>
                  <div className="side-stories">
                    <a href="#/articles/star-colors" className="small-story">
                      <span className="micro">恒星与光</span>
                      <div className="spectrum-art" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <h3>星光，为什么有颜色？</h3>
                      <p>读懂恒星写在光里的温度。</p>
                      <ArrowUpRight size={20} />
                    </a>
                    <a
                      href="#/articles/first-telescope"
                      className="small-story observing-story"
                    >
                      <span className="micro">从今晚开始</span>
                      <h3>你的第一份观星指南。</h3>
                      <p>一片夜空，就是最好的起点。</p>
                      <span className="text-link">
                        准备出发 <ArrowUpRight size={18} />
                      </span>
                    </a>
                  </div>
                </div>
              </section>
              <Observatory />
              <ArchiveBrowser
                selected={selectedArchive}
                onSelect={setSelectedArchive}
              />
            </div>
          </>
        )}
      </main>
      <footer className="shell">
        <a className="brand" href="#/">
          <Orbit size={27} strokeWidth={1.3} />
          <span>
            星序<span className="brand-en">ASTRAL ATLAS</span>
          </span>
        </a>
        <p>宇宙辽阔，理解从这里开始。</p>
        <a href={NASA_FACTS} target="_blank" rel="noreferrer">
          以公开科学资料为依据 <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
