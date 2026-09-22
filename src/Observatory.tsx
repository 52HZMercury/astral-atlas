import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Radio, RefreshCw } from "lucide-react";
import { KP_URL, isStale, parseKp, utc, type KpRecord } from "./data";
export default function Observatory() {
  const [records, setRecords] = useState<KpRecord[]>([]);
  const [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const [fetched, setFetched] = useState<number>();
  const controller = useRef<AbortController | null>(null);
  const load = useCallback(async () => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setError("");
    const timeout = window.setTimeout(() => request.abort("timeout"), 12000);
    try {
      const response = await fetch(KP_URL, {
        signal: request.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`数据源返回 HTTP ${response.status}`);
      const data = parseKp(await response.json());
      if (controller.current === request) {
        setRecords(data);
        setFetched(Date.now());
      }
    } catch (e) {
      if (
        controller.current === request &&
        (!request.signal.aborted || request.signal.reason === "timeout")
      )
        setError(
          request.signal.reason === "timeout"
            ? "连接超时，请重试"
            : e instanceof Error && e.message.includes("数据")
              ? e.message
              : "无法连接观测站，请检查网络后重试",
        );
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
    const interval = setInterval(() => {
      if (!document.hidden) void load();
    }, 300000);
    return () => {
      clearInterval(interval);
      controller.current?.abort();
      controller.current = null;
    };
  }, [load]);
  const latest = records.at(-1),
    recent = records.slice(-16);
  const stale = latest && isStale(latest.time);
  return (
    <section id="observatory" className="section reveal observatory">
      <div className="section-heading">
        <span className="eyebrow">
          <Radio size={14} /> 来自地球的观测
        </span>
        <h2>此刻，地磁在怎样变化？</h2>
        <p>读取真实观测记录，感知太阳与地球之间看不见的联系。</p>
      </div>
      <div className="terminal">
        <div className="terminal-head">
          <span>地磁活动 / PLANETARY Kp</span>
          <a
            href="https://www.swpc.noaa.gov/products/planetary-k-index"
            target="_blank"
            rel="noreferrer"
          >
            NOAA / SWPC <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="terminal-body">
          <div className="kp-reading">
            <span className="micro">最近观测值</span>
            <div className="kp-value">
              {latest ? latest.kp.toFixed(2) : "—"}
              <span>Kp</span>
            </div>
            <span className="muted">全球地磁活动指数</span>
            <p>
              读数越高，地磁活动越强。
              <br />
              这不是你所在位置的极光预报。
            </p>
          </div>
          <div className="signal">
            <div className="signal-label">
              <span>近期观测序列</span>
              <span>NOAA · Kp</span>
            </div>
            {recent.length > 0 ? (
              <>
                <svg
                  viewBox="0 0 600 150"
                  role="img"
                  aria-label={`近期 Kp 趋势，最近值 ${latest?.kp.toFixed(2)}，来源 NOAA`}
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 20H600 M0 75H600 M0 130H600"
                    stroke="#26323e"
                    strokeDasharray="3 5"
                    fill="none"
                  />
                  <polyline
                    points={recent
                      .map(
                        (r, i) =>
                          `${recent.length === 1 ? 300 : (i / (recent.length - 1)) * 600},${130 - (r.kp / 9) * 115}`,
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#e06236"
                    strokeWidth="2"
                  />
                  {recent.map((r, i) => (
                    <circle
                      key={r.time}
                      cx={
                        recent.length === 1
                          ? 300
                          : (i / (recent.length - 1)) * 600
                      }
                      cy={130 - (r.kp / 9) * 115}
                      r="3"
                      fill="#e06236"
                    >
                      <title>
                        {utc(r.time)} · Kp {r.kp.toFixed(2)}
                      </title>
                    </circle>
                  ))}
                </svg>
                <div className="signal-label">
                  <span>{utc(recent[0].time)}</span>
                  <span>{utc(latest!.time)}</span>
                </div>
              </>
            ) : (
              <div className="signal-empty">
                {loading
                  ? "信号捕获中…"
                  : error
                    ? "观测信号暂不可用"
                    : "该天区暂无观测数据"}
              </div>
            )}
          </div>
        </div>
        <div className="terminal-status" aria-live="polite">
          <span>
            {loading
              ? "信号捕获中…"
              : error
                ? `更新失败 · ${error}${latest ? " · 保留上次观测" : ""}`
                : stale
                  ? "数据已过期 · 显示来源最近可用记录"
                  : latest
                    ? "数据已接收 · 定时发布，非即时读数"
                    : "该天区暂无观测数据"}
          </span>
          <button onClick={() => void load()} disabled={loading}>
            <RefreshCw size={13} /> {loading ? "接收中" : "重新获取"}
          </button>
        </div>
        <div className="terminal-times">
          <span>观测时间：{latest ? utc(latest.time) : "等待信号"}</span>
          <span>获取时间：{fetched ? utc(fetched) : "等待信号"}</span>
        </div>
      </div>
      <p className="source-line">
        来源：
        <a href={KP_URL} target="_blank" rel="noreferrer">
          NOAA SWPC 公开数据
        </a>{" "}
        ·
        页面每五分钟检查更新。超过六小时的记录标记为过期；这是本站的时效提示规则。
      </p>
    </section>
  );
}
