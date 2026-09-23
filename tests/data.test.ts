import { strict as assert } from "node:assert";
import { test } from "node:test";
import { parseKp, isStale, toAU, planets, articles } from "../src/data.ts";
import { constellationCatalog, seasons } from "../src/constellationCatalog.ts";
import { constellationStories } from "../src/constellationStories.ts";
import { constellationSketches } from "../src/constellationSketches.ts";
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
    articles.every((a) => a.sections.length >= 4 && a.sources.length >= (a.spacecraft ? 1 : 2)),
  );
});
test("all 88 constellations have distinct stories, seasonal coverage and preserved public routes", () => {
  assert.equal(constellationCatalog.length, 88);
  assert.equal(constellationStories.length, 88);
  assert.equal(new Set(constellationStories.map((s) => s[0])).size, 88);
  assert.equal(new Set(constellationStories.map((s) => s[4])).size, 88);
  assert.equal(articles.length, 99);
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

test("spacecraft archives preserve the catalogue and cite mission agencies", () => {
  const craft = articles.filter((a) => a.spacecraft);
  assert.equal(craft.length, 8);
  assert.equal(articles.filter((a) => !a.constellation && !a.spacecraft).length, 3);
  assert.equal(new Set(craft.map((a) => a.spacecraft!.kind)).size, 8);
  craft.forEach((a, i) => {
    assert.equal(a.archiveId, `AA-${String(92 + i).padStart(3, "0")}`);
    assert.equal(a.image, "spacecraft");
    assert.ok(a.sections.every(([title, body]) => title.length > 0 && body.length > 60));
    assert.ok(a.sources.every((s) => ["science.nasa.gov", "www.esa.int", "www.cnsa.gov.cn"].includes(new URL(s.url).hostname)));
    assert.ok(a.spacecraft!.target && a.spacecraft!.type);
  });
});

test("every constellation has a connected-line cover within the viewport", () => {
  assert.equal(Object.keys(constellationSketches).length, 88);
  const signatures = new Set<string>();
  for (const a of articles.filter((a) => a.constellation)) {
    const sketch = a.sketch!;
    assert.ok(sketch, a.slug);
    assert.ok(sketch.points.length >= 2 && sketch.links.length > 0, a.slug);
    assert.ok(sketch.points.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y) && x >= 12 && x <= 208 && y >= 12 && y <= 178), a.slug);
    assert.ok(sketch.points.every((_, i) => sketch.links.some((line) => line.includes(i))), a.slug);
    signatures.add(JSON.stringify(sketch));
  }
  assert.equal(signatures.size, 88);
  // Serpens remains two disconnected figures in one catalogue entry.
  const ser = constellationSketches.Ser;
  const visited = new Set<number>();
  let components = 0;
  for (let i = 0; i < ser.points.length; i++) {
    if (visited.has(i)) continue;
    components++;
    const pending = [i];
    while (pending.length) {
      const point = pending.pop()!;
      if (visited.has(point)) continue;
      visited.add(point);
      for (const [a, b] of ser.links) {
        if (a === point && !visited.has(b)) pending.push(b);
        if (b === point && !visited.has(a)) pending.push(a);
      }
    }
  }
  assert.equal(components, 2);
});
