import { strict as assert } from "node:assert";
import { test } from "node:test";
import { parseKp, isStale, toAU, planets, articles } from "../src/data.ts";
import { constellationCatalog, seasons } from "../src/constellationCatalog.ts";
import { constellationStories } from "../src/constellationStories.ts";
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
  assert.equal(articles.filter((a) => a.constellation).length, 88);
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
    articles.every((a) => a.sections.length >= 4 && a.sources.length >= 2),
  );
});
test("all 88 constellations have distinct stories, seasonal coverage and preserved public routes", () => {
  assert.equal(constellationCatalog.length, 88);
  assert.equal(constellationStories.length, 88);
  assert.equal(new Set(constellationStories.map((s) => s[0])).size, 88);
  assert.equal(new Set(constellationStories.map((s) => s[4])).size, 88);
  assert.equal(articles.length, 91);
  for (const record of constellationCatalog) {
    const article = articles.find((a) => a.slug === record.slug)!;
    assert.equal(article.constellation?.abbr, record.abbr);
    assert.ok(article.sources.some((s) => s.url === record.url));
    assert.ok(article.sections[0][1].length >= 90, record.en);
    assert.ok(seasons.includes(article.constellation!.season));
    assert.ok(article.constellation!.visibility.length > 0);
  }
  assert.deepEqual(seasons.map((s) => articles.filter((a) => a.constellation?.season === s).length), [21, 27, 17, 23]);
  for (const [slug, id] of [["orion", "AA-004"], ["cassiopeia", "AA-005"], ["ursa-major", "AA-006"]]) {
    const article = articles.find((a) => a.slug === slug)!;
    assert.equal(article.archiveId, id);
    assert.ok(article.sketch);
    assert.ok(article.sections.length > 4);
  }
  assert.equal(articles.filter((a) => a.constellation?.abbr === "Ser").length, 1);
});
