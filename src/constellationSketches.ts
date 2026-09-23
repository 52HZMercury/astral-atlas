import lines from "./constellationLines.json" with { type: "json" };
import type { Article } from "./data.ts";

export const LINE_SOURCE = "https://github.com/ofrohn/d3-celestial/blob/d2e20e104b86429d90ac8227a5b021262b45d75a/data/constellations.lines.json";
// Olaf Frohn / d3-celestial, BSD-3-Clause; see public/d3-celestial-LICENSE.txt.
// Tangent-plane projection, north up / east left at each chart centre.
// These fitted cover diagrams are not local sky charts or magnitude maps.
const grouped: Record<string, number[][][]> = {};
for (const feature of lines.features) {
  (grouped[feature.id] ??= []).push(...feature.geometry.coordinates);
}

export const constellationSketches = Object.fromEntries(
  Object.entries(grouped).map(([abbr, paths]) => {
    const stars: number[][] = [];
    const links: [number, number][] = [];
    for (const path of paths) {
      const indices = path.map(([ra, dec]) => {
        let index = stars.findIndex(([a, d]) => a === ra && d === dec);
        if (index === -1) index = stars.push([ra, dec]) - 1;
        return index;
      });
      indices.slice(1).forEach((to, i) => {
        const from = indices[i];
        if (from !== to && !links.some(([a, b]) => (a === from && b === to) || (a === to && b === from))) links.push([from, to]);
      });
    }
    const radians = stars.map(([ra, dec]) => [ra * Math.PI / 180, dec * Math.PI / 180]);
    const centre = radians.reduce((sum, [a, d]) => [sum[0] + Math.cos(d) * Math.cos(a), sum[1] + Math.cos(d) * Math.sin(a), sum[2] + Math.sin(d)], [0, 0, 0]);
    const a0 = Math.atan2(centre[1], centre[0]);
    const d0 = Math.atan2(centre[2], Math.hypot(centre[0], centre[1]));
    const projected = radians.map(([a, d]) => {
      const denominator = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(a - a0);
      if (denominator <= 0) throw new Error(`Constellation exceeds tangent hemisphere: ${abbr}`);
      return [
        -Math.cos(d) * Math.sin(a - a0) / denominator,
        -(Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(a - a0)) / denominator,
      ];
    });
    const minX = Math.min(...projected.map(([x]) => x)), maxX = Math.max(...projected.map(([x]) => x));
    const minY = Math.min(...projected.map(([, y]) => y)), maxY = Math.max(...projected.map(([, y]) => y));
    const scale = Math.min(172 / (maxX - minX || 1), 138 / (maxY - minY || 1));
    const points: [number, number][] = projected.map(([x, y]) => [
      +(110 + (x - (minX + maxX) / 2) * scale).toFixed(2),
      +(95 + (y - (minY + maxY) / 2) * scale).toFixed(2),
    ]);
    // Graph junctions are visual anchors, not a claim about stellar brightness.
    const accent = stars.map((_, i) => i).sort((a, b) => links.filter((l) => l.includes(b)).length - links.filter((l) => l.includes(a)).length).slice(0, 2);
    return [abbr, { points, links, accent }];
  }),
) as Record<string, NonNullable<Article["sketch"]>>;
