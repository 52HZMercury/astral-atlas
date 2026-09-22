import { strict as assert } from "node:assert";
import { test } from "node:test";
import { parseKp, isStale, toAU, planets, articles } from "../src/data.ts";
test("NOAA records normalize UTC, sort, deduplicate, preserve zero and reject invalid values", () => {
  assert.deepEqual(
    parseKp([
      { time_tag: "2026-09-21T03:00:00", Kp: "2.33" },
      { time_tag: "2026-09-21T00:00:00", Kp: 0 },
      { time_tag: "2026-09-21T03:00:00Z", Kp: 3 },
      { time_tag: "bad", Kp: 2 },
      { time_tag: "2026-09-21T04:00:00", Kp: 20 },
    ]),
    [
      { time: Date.parse("2026-09-21T00:00:00Z"), kp: 0 },
      { time: Date.parse("2026-09-21T03:00:00Z"), kp: 3 },
    ],
  );
  assert.deepEqual(parseKp([]), []);
  assert.throws(() => parseKp({}));
  assert.throws(() => parseKp([{ time_tag: "bad", Kp: null }]));
});
test("six-hour freshness boundary and AU conversion", () => {
  assert.equal(isStale(0, 6 * 3600000), false);
  assert.equal(isStale(0, 6 * 3600000 + 1), true);
  assert.equal(toAU(149.5978707), "1.00");
  assert.equal(planets.length, 8);
});
test("all article routes are unique and contain complete sourced sections", () => {
  assert.equal(new Set(articles.map((a) => a.slug)).size, articles.length);
  assert.equal(new Set(articles.map((a) => a.archiveId)).size, articles.length);
  assert.ok(articles.every((a) => /^AA-\d{3}$/.test(a.archiveId)));
  assert.equal(articles.filter((a) => a.category === "星座辨认").length, 3);
  for (const article of articles) {
    if (article.sketch) {
      assert.ok(
        article.sketch.links.every((link) =>
          link.every((i) => i >= 0 && i < article.sketch!.points.length),
        ),
      );
      assert.ok(
        article.sketch.accent.every(
          (i) => i >= 0 && i < article.sketch!.points.length,
        ),
      );
    }
  }
  assert.ok(
    articles.every((a) => a.sections.length === 4 && a.sources.length >= 2),
  );
});
