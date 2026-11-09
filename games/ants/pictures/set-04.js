// Sleep on it / Ants: sea, river and small creatures. Half are objects on a transparent
// background with ink outlines, half are small scenes with a background.
"use strict";
(() => {
  // star(cx, cy, outer, inner, points, rotation): the corners of a star polygon
  const star = (cx, cy, ro, rin, n, rot) => {
    const pts = [];
    for (let i = 0; i < n * 2; i++) { const a = rot + i * Math.PI / n, r = i % 2 ? rin : ro; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    return pts;
  };
  // path(P, colour, points, width): a thick line through several points
  const path = (P, k, pts, w) => { for (let i = 1; i < pts.length; i++) P.line(k, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], w); };
  // zoom(P, z): the same drawing helpers with every coordinate multiplied by z (draw on a 28 grid, paint on a bigger one)
  const zoom = (P, z) => ({
    all: P.all, outline: P.outline,
    rect: (k, x0, y0, x1, y1) => P.rect(k, x0 * z, y0 * z, x1 * z, y1 * z),
    ell: (k, cx, cy, rx, ry) => P.ell(k, cx * z, cy * z, rx * z, ry * z),
    rell: (k, cx, cy, rx, ry, a) => P.rell(k, cx * z, cy * z, rx * z, ry * z, a),
    poly: (k, pts) => P.poly(k, pts.map(([x, y]) => [x * z, y * z])),
    line: (k, x0, y0, x1, y1, w) => P.line(k, x0 * z, y0 * z, x1 * z, y1 * z, w * z),
    when: (k, f) => P.when(k, (x, y) => f(x / z, y / z)),
    on: (k, olds, f) => P.on(k, olds, (x, y) => f(x / z, y / z)),
  });
  // a small ant seen from above, facing angle a
  const tinyAnt = (P, k, x, y, a) => {
    const dx = Math.cos(a), dy = Math.sin(a);
    P.ell(k, x + dx * 1.9, y + dy * 1.9, 1, 1); P.ell(k, x, y, 0.7, 0.7); P.ell(k, x - dx * 2, y - dy * 2, 1.4, 1.3);
  };

  PICTURES.push(
    // ----- simple -----
    { tier: 1, name: "starfish", make: () => picture(["orange", "peach", "yellow", "ink"], P => {
      P.poly("orange", star(14, 14.5, 13.5, 5.6, 5, -Math.PI / 2));
      P.on("peach", "orange", (x, y) => Math.hypot(x - 14, y - 14.5) < 3.8);
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
        P.ell("yellow", 14 + Math.cos(a) * 6.6, 14.5 + Math.sin(a) * 6.6, 1.3, 1.3);
        P.ell("yellow", 14 + Math.cos(a) * 9.6, 14.5 + Math.sin(a) * 9.6, 0.9, 0.9);
      }
      P.outline("ink");
    }, 28) },
    { tier: 1, name: "scallop shell", make: () => picture(["peach", "pink", "orange", "ink"], P => {
      const A0 = -Math.PI + 0.3, W = (Math.PI - 0.6) / 7;
      P.when("pink", (x, y) => {
        const a = Math.atan2(y - 21, x - 14); if (a < A0 || a > -0.3) return false;
        const k = (a - A0) / W; return Math.hypot(x - 14, y - 21) < 12.6 + 0.8 * Math.sin((k - fl(k)) * Math.PI);
      });
      P.on("peach", "pink", (x, y) => fl((Math.atan2(y - 21, x - 14) - A0) / W) % 2 === 0);
      P.poly("orange", [[8, 19.5], [20, 19.5], [18.5, 25.5], [9.5, 25.5]]);
      P.outline("ink");
      P.on("ink", ["pink", "peach"], (x, y) => { const k = (Math.atan2(y - 21, x - 14) - A0) / W; return Math.hypot(x - 14, y - 21) > 3 && y < 19.5 && Math.abs(k - Math.round(k)) * W * Math.hypot(x - 14, y - 21) < 0.45; });
    }, 28) },
    { tier: 1, name: "clownfish", make: () => picture(["orange", "white", "pink", "lilac", "purple", "ink"], P => {
      for (let i = 0; i < 8; i++) { const bx = 3.5 + i * 3.6; path(P, i % 2 ? "lilac" : "pink", [[bx, 30], [bx + 1.2, 25], [bx - 0.6, 20.5]], 3.4); }
      P.ell("purple", 16, 31, 15, 2.6);
      P.ell("orange", 14, 5.5, 5, 2.6); P.ell("orange", 17, 16.5, 3, 2.6);
      P.poly("orange", [[22, 11], [29.5, 4.5], [31, 11], [29.5, 17.5]]);
      P.ell("orange", 15, 11, 9.5, 6);
      P.on("white", "orange", (x, y) => Math.abs(x - 9 - ((y - 11) ** 2) / 14) < 1.5 || Math.abs(x - 15.8) < 1.6 || (Math.abs(x - 23.3) < 1.1 && y > 6 && y < 16));
      P.outline("ink", true);
      P.rect("ink", 7, 9, 9, 11);
    }, 32) },
    { tier: 1, name: "jellyfish", make: () => picture(["navy", "pink", "lilac", "purple", "white"], P0 => {
      const P = zoom(P0, 32 / 28);
      P.all("navy");
      for (const [bx, by] of [[3, 4], [24, 3], [4, 20], [25, 18], [21, 25], [6, 26]]) P.ell("white", bx, by, 0.8, 0.8);
      for (const bx of [8, 11, 17, 20]) P.when("lilac", (x, y) => y > 12 && y < 26 - Math.abs(bx - 14) * 0.6 && Math.abs(x - (bx + Math.sin(y * 0.7 + bx) * 1.1)) < 0.6);
      for (const bx of [12.5, 15.5]) P.when("purple", (x, y) => y > 11 && y < 24 && Math.abs(x - (bx + Math.sin(y * 0.55 + bx) * 1.2)) < 1.2);
      P.when("pink", (x, y) => ((x - 14) / 9.5) ** 2 + ((y - 11) / 7.5) ** 2 <= 1 && y < 11.5);
      for (let i = 0; i < 6; i++) P.ell("pink", 5.9 + i * 3.25, 11.5, 1.7, 1.4);
      P.on("lilac", "pink", (x, y) => y > 10.6);
      P.rell("white", 9.8, 7, 1.1, 2.8, 0.9);
    }, 32) },
    { tier: 1, name: "crab", make: () => picture(["red", "orange", "white", "ink"], P => {
      for (const s of [-1, 1]) for (const d of [0, 2.6, 5.2]) path(P, "orange", [[16 + s * 6, 18 + d * 0.5], [16 + s * 11.5, 18.5 + d], [16 + s * 13.5, 23 + d * 0.8]], 2.8);
      for (const s of [-1, 1]) {
        P.line("red", 16 + s * 6, 16, 16 + s * 10.5, 11, 3.2);
        P.ell("red", 16 + s * 11, 8, 3.8, 4.4);
        P.poly("none", [[16 + s * 11.3, 8.5], [16 + s * 9, 2.5], [16 + s * 13.8, 3]]);
        P.line("red", 16 + s * 3, 14, 16 + s * 3.4, 9, 2.4);
      }
      P.ell("red", 16, 19, 9, 6);
      P.ell("orange", 12, 18, 1.6, 1.3); P.ell("orange", 20, 18, 1.6, 1.3); P.ell("orange", 16, 16, 1.6, 1.3);
      P.ell("white", 12.6, 8.3, 2.5, 2.5); P.ell("white", 19.4, 8.3, 2.5, 2.5);
      P.outline("ink");
      P.rect("ink", 12, 8, 13, 9); P.rect("ink", 19, 8, 20, 9);
      P.when("ink", (x, y) => Math.abs(y - 21 - ((x - 16) ** 2) * -0.06) < 0.5 && Math.abs(x - 16) < 3);
    }, 32) },
    { tier: 1, name: "bee", make: () => picture(["yellow", "sky", "white", "ink"], P => {
      P.rell("sky", 12, 7.5, 3.4, 5.4, -0.35); P.rell("sky", 18, 8, 3.1, 4.8, 0.35);
      P.rell("white", 11.6, 6.8, 1.3, 3, -0.35); P.rell("white", 18.2, 7.4, 1.2, 2.6, 0.35);
      P.poly("yellow", [[22, 15], [27.2, 17.5], [22, 20]]);
      P.ell("yellow", 15, 17.5, 8.5, 6.2); P.ell("yellow", 6.5, 16.5, 4.2, 4.2);
      P.outline("ink");
      P.on("ink", "yellow", (x, y) => x > 11 && (fl(x) === 12 || fl(x) === 13 || fl(x) === 17 || fl(x) === 18 || fl(x) >= 22));
      P.rect("ink", 4, 15, 6, 17);
      P.line("ink", 6, 12.5, 4, 7, 1); P.line("ink", 8, 12.5, 9, 7.5, 1);
    }, 28) },
    { tier: 1, name: "caterpillar", make: () => picture(["sky", "dkgreen", "lime", "green", "red", "ink"], P => {
      P.all("sky");
      P.rell("dkgreen", 16, 25, 17, 6.5, -0.12);
      P.line("lime", 0, 27.5, 32, 23.5, 1);
      const seg = [[4, 19.5], [7.5, 17.5], [11, 15.8], [14.5, 15.2], [18, 16], [21.5, 18]];
      seg.forEach(([cx, cy], i) => { P.rect("ink", cx - 0.5, cy + 2.5, cx + 0.5, cy + 3.8); P.ell(i % 2 ? "lime" : "green", cx, cy, 3, 3); });
      P.ell("red", 25.5, 16.5, 3.6, 3.6);
      P.rect("ink", 26, 15, 28, 17);
      P.line("ink", 24.5, 13, 23, 8, 1); P.line("ink", 26.5, 13, 28.5, 8.5, 1);
      P.ell("red", 23, 7.5, 1.2, 1.2); P.ell("red", 28.5, 8, 1.2, 1.2);
    }, 32) },
    { tier: 1, name: "ant", make: () => picture(["brown", "green", "dkgreen", "ink"], P => {
      P.rell("green", 15, 6.5, 9.5, 4.2, -0.25);
      P.line("dkgreen", 6, 9, 24, 4, 1);
      for (const t of [0.3, 0.5, 0.7]) { const mx = 6 + 18 * t, my = 9 - 5 * t; P.line("dkgreen", mx, my, mx - 1.5, my - 3, 0.8); P.line("dkgreen", mx, my, mx + 1.2, my + 3, 0.8); }
      P.line("ink", 21, 13, 19, 10, 1);
      for (const [a, b, c, d, e, f] of [[13, 17, 10, 21, 8, 24.5], [14.5, 17.5, 15, 21, 13.5, 24.5], [15.5, 17, 18.5, 20.5, 20.5, 24.5]]) path(P, "ink", [[a, b], [c, d], [e, f]], 1);
      P.ell("brown", 7, 18.5, 4.8, 3.6); P.ell("brown", 11.6, 17.4, 1.4, 1.3);
      P.rell("brown", 14.5, 16.8, 3, 1.9, -0.3); P.ell("brown", 19.8, 14.8, 3, 2.7);
      P.outline("ink");
      P.rect("ink", 20, 14, 21, 15);
      path(P, "ink", [[21.5, 13], [24, 11.5], [26.5, 12.5]], 1);
    }, 28) },
    { tier: 1, name: "earthworm", make: () => picture(["sky", "yellow", "green", "brown", "tan", "pink"], P0 => {
      const P = zoom(P0, 32 / 24);
      P.all("sky"); P.ell("yellow", 4, 3.5, 2.5, 2.5);
      P.rect("brown", 0, 10, 24, 24); P.rect("green", 0, 8, 24, 10);
      for (const gx of [1, 4, 7, 10, 20, 23]) P.poly("green", [[gx - 1, 8.5], [gx, 5.5], [gx + 1, 8.5]]);
      for (const [sx, sy] of [[4, 21], [20, 21.5], [12, 22.5], [21, 14]]) P.ell("tan", sx, sy, 1.7, 1.1);
      path(P, "pink", [[2, 17], [5, 15], [8, 17.5], [11, 18.5], [14, 17], [15.5, 13], [16, 9], [16.3, 5.5]], 2.8);
      P.ell("pink", 16.3, 5.2, 1.6, 1.8);
      P.rect("brown", 15.2, 4, 16, 4.8); P.rect("brown", 16.8, 4, 17.6, 4.8);
    }, 32) },
    { tier: 1, name: "frog on a lily pad", make: () => picture(["teal", "cyan", "dkgreen", "green", "lime", "white", "pink"], P => {
      P.all("teal");
      for (const [rx, ry] of [[6, 7], [26, 5], [5, 30], [27, 30.5]]) P.when("cyan", (x, y) => y > ry && y < ry + 1 && Math.abs(x - rx) < 3.5);
      for (const [rx, ry] of [[6, 7], [26, 5]]) P.when("cyan", (x, y) => y > ry + 2 && y < ry + 3 && Math.abs(x - rx) < 2);
      P.ell("dkgreen", 16, 23, 14, 5.6); P.poly("teal", [[16, 23], [24, 29], [28, 27]]);
      P.ell("pink", 26, 18, 1.5, 2.6); P.ell("pink", 24, 19.5, 2.2, 1.3); P.ell("pink", 28, 19.5, 2.2, 1.3); P.ell("white", 26, 19.5, 1, 0.8);
      P.ell("green", 9.5, 21, 3.6, 2.3); P.ell("green", 22.5, 21, 3.6, 2.3);
      P.ell("green", 16, 17.5, 6.5, 5.6);
      P.ell("lime", 16, 19.6, 4.2, 3.4);
      P.ell("green", 12.5, 12, 2.9, 2.9); P.ell("green", 19.5, 12, 2.9, 2.9);
      P.ell("white", 12.5, 11.6, 1.8, 1.8); P.ell("white", 19.5, 11.6, 1.8, 1.8);
      P.rect("dkgreen", 12, 11, 13, 13); P.rect("dkgreen", 19, 11, 20, 13);
      P.when("dkgreen", (x, y) => Math.abs(y - 15.2 - ((x - 16) ** 2) * 0.03) < 0.5 && Math.abs(x - 16) < 3.5);
      P.ell("green", 12.5, 22.6, 2, 1.1); P.ell("green", 19.5, 22.6, 2, 1.1);
    }, 32) },
    { tier: 1, name: "firefly", make: () => picture(["navy", "white", "dkgreen", "lime", "yellow", "brown", "red"], P => {
      P.all("navy");
      for (const [sx, sy] of [[3, 3], [12, 2], [28, 3], [2, 12], [29, 14], [20, 4], [7, 7], [30, 21]]) P.ell("white", sx + 0.5, sy + 0.5, 0.8, 0.8);
      for (let gx = -1; gx < 34; gx += 2.6) P.poly("dkgreen", [[gx - 1.3, 32], [gx + Math.sin(gx) * 1.5, 26 + (gx * 7 % 4)], [gx + 1.3, 32]]);
      for (const [fx, fy] of [[4.5, 22], [28.5, 24], [25, 7]]) { P.ell("lime", fx, fy, 1.7, 1.7); P.rect("yellow", fx - 0.5, fy - 0.5, fx + 0.5, fy + 0.5); }
      P.ell("lime", 22.5, 18, 7, 6.5);
      for (const [a, b, c, d] of [[11, 18.5, 9.5, 23], [14, 19, 14, 23.5], [17, 19, 18.5, 23]]) P.line("brown", a, b, c, d, 1);
      P.line("brown", 6, 15.5, 2, 11, 1); P.line("brown", 6.5, 15, 4, 9.5, 1);
      P.ell("yellow", 22, 18, 4, 3.2);
      P.rell("brown", 14.5, 17, 6, 3, 0.05);
      P.ell("red", 8.5, 16.5, 2.6, 2.6); P.ell("brown", 5.8, 17, 1.5, 1.5);
      P.rell("white", 16, 10.5, 6, 2.2, -0.5); P.rell("white", 11.5, 10.5, 5, 1.9, -1.05);
    }, 32) },
    { tier: 1, name: "pufferfish", make: () => picture(["yellow", "white", "orange", "ink"], P => {
      for (let i = 0; i < 14; i++) {
        const a = i * Math.PI / 7 + Math.PI / 14; if (Math.cos(a) > 0.75) continue;
        P.poly("yellow", [[14 + Math.cos(a - 0.2) * 9, 15 + Math.sin(a - 0.2) * 9], [14 + Math.cos(a) * 12.5, 15 + Math.sin(a) * 12.5], [14 + Math.cos(a + 0.2) * 9, 15 + Math.sin(a + 0.2) * 9]]);
      }
      P.poly("orange", [[22, 15], [29.5, 9.5], [28, 15], [29.5, 20.5]]);
      P.ell("yellow", 14, 15, 10, 9.5);
      P.on("white", "yellow", (x, y) => y > 18 + Math.sin(x * 0.4) * 0.6);
      P.on("orange", "yellow", (x, y) => y < 17 && x > 11 && Math.hypot(x - 14, (y - 15) * 1.05) < 8.5 && (fl(x) * 3 + fl(y) * 5) % 8 === 0);
      P.ell("orange", 3.6, 16.5, 1.8, 1.6); P.rell("orange", 15, 16.5, 2.8, 1.5, 0.5);
      P.ell("white", 8.5, 11.5, 2.7, 2.7);
      P.outline("ink", true);
      P.ell("ink", 8, 11.6, 1.3, 1.3);
    }, 30) },
    { tier: 1, name: "dragonfly", make: () => picture(["blue", "teal", "sky", "white", "ink"], P => {
      P.rell("sky", 8.5, 10.5, 7.8, 2.4, -0.12); P.rell("sky", 23.5, 10.5, 7.8, 2.4, 0.12);
      P.rell("sky", 9, 15.5, 7.2, 2.3, 0.18); P.rell("sky", 23, 15.5, 7.2, 2.3, -0.18);
      for (const [wx, wy, a] of [[8.5, 10.5, -0.12], [23.5, 10.5, 0.12], [9, 15.5, 0.18], [23, 15.5, -0.18]]) P.rell("white", wx, wy, 5, 0.7, a);
      P.line("blue", 16, 14, 16, 30, 3.4);
      P.ell("teal", 16, 12, 2.7, 3.4); P.ell("teal", 16, 7, 3.6, 2.6);
      P.outline("ink");
      P.on("ink", "blue", (x, y) => y > 16 && fl(y) % 3 === 0);
      P.ell("blue", 14.2, 6.4, 1.2, 1.2); P.ell("blue", 17.8, 6.4, 1.2, 1.2);
    }, 32) },
    { tier: 1, name: "seagull", make: () => picture(["sky", "white", "blue", "grey", "yellow", "dkgrey"], P0 => {
      const P = zoom(P0, 32 / 28);
      P.all("sky");
      P.ell("white", 5, 4, 4, 1.4); P.ell("white", 8, 3, 2.4, 1.4); P.ell("yellow", 23.5, 3.5, 2.4, 2.4);
      P.rect("blue", 0, 21, 28, 28);
      P.when("white", (x, y) => y > 22 && fl(y) % 2 === 1 && (fl(x) + fl(y) * 3) % 9 < 2);
      P.poly("grey", [[11, 14], [7, 8], [1.5, 10.5], [7, 11.5], [10, 15]]);
      P.poly("grey", [[15, 14], [19.5, 6.5], [26.5, 7.5], [20, 10.5], [17, 15]]);
      P.on("dkgrey", "grey", x => x < 5.5 || x > 22.5);
      P.poly("white", [[8, 14.5], [3.5, 13], [4, 16.5], [8, 16]]);
      P.ell("white", 13, 15, 5, 2.2); P.ell("white", 18.5, 13.5, 2.4, 2.2);
      P.poly("yellow", [[20, 12.5], [25, 14.2], [20, 15.6]]);
      P.rect("dkgrey", 18.5, 12, 19.5, 13);
    }, 32) },
    { tier: 1, name: "squid", make: () => picture(["pink", "red", "white", "ink"], P => {
      P.poly("pink", [[14, 1.5], [20.5, 7.5], [14, 10.5], [7.5, 7.5]]);
      P.poly("pink", [[14, 1], [18.5, 7], [18.5, 15], [9.5, 15], [9.5, 7]]);
      for (let i = 0; i < 6; i++) { const bx = 10 + i * 1.6, ex = 5 + i * 3.6; path(P, "pink", [[bx, 17], [(bx + ex) / 2 + (i % 2 ? 1 : -1), 22], [ex, 25]], 2.8); }
      P.ell("pink", 14, 16.5, 4.8, 2.8);
      P.on("red", "pink", (x, y) => y < 14 && y > 3 && (fl(x) * 3 + fl(y) * 5) % 6 === 0);
      P.ell("white", 11.4, 16.3, 2, 2); P.ell("white", 16.6, 16.3, 2, 2);
      P.outline("ink");
      P.rect("ink", 11, 16, 12, 17); P.rect("ink", 16, 16, 17, 17);
    }, 28) },
    { tier: 1, name: "shrimp", make: () => picture(["orange", "peach", "red", "ink"], P => {
      const cx = 16, cy = 29, R = 11.5, T = (x, y) => (Math.atan2(y - cy, x - cx) + 2.75) / 2.4;
      P.poly("peach", [[25, 24], [28, 23.5], [31.5, 29.5], [27.5, 31.5], [23.5, 29.5]]);
      P.when("orange", (x, y) => { const t = T(x, y); return t > 0 && t < 1 && Math.abs(Math.hypot(x - cx, y - cy) - R) < 4.4 * (1 - 0.6 * t); });
      P.rell("orange", 6.5, 22.5, 5.2, 3.8, 0.35);
      P.poly("orange", [[3, 19], [0.5, 17.5], [4, 21]]);
      P.on("peach", "orange", (x, y) => { const t = T(x, y); return t > 0.12 && t < 1 && Math.hypot(x - cx, y - cy) < R - 1.2 * (1 - 0.6 * t); });
      P.outline("ink", true);
      P.on("ink", ["orange", "peach"], (x, y) => { const t = T(x, y); return t > 0.2 && t < 0.98 && Math.abs(t * 7 - Math.round(t * 7)) * 2.4 / 7 * Math.hypot(x - cx, y - cy) < 0.5; });
      for (const [a, b, c, d] of [[5, 26, 4, 30], [8, 26.5, 8, 30.5], [11, 25.5, 12, 29.5], [14.5, 23.5, 16, 27], [18, 23, 19.5, 26.5], [21.5, 23.5, 22.5, 26.5]]) P.line("red", a, b, c, d, 1);
      path(P, "red", [[3.5, 19.5], [6, 10], [14, 4], [26, 2]], 1); path(P, "red", [[4.5, 19], [9, 12], [20, 8], [30, 9]], 1);
      P.rect("ink", 5, 20, 7, 22);
    }, 32) },
    { tier: 1, name: "seal", make: () => picture(["sky", "white", "blue", "tan", "grey", "dkgrey"], P0 => {
      const P = zoom(P0, 32 / 28);
      P.all("sky"); P.ell("white", 21, 4.5, 4.5, 1.5); P.ell("white", 5, 6, 3, 1.1);
      P.rect("blue", 0, 19, 28, 28);
      P.when("white", (x, y) => y > 20 && fl(y) % 2 === 0 && (fl(x) + fl(y) * 5) % 9 < 2);
      P.poly("tan", [[2, 28], [4, 21], [10, 18], [19, 18.5], [25, 21.5], [27, 28]]);
      P.poly("grey", [[7, 15.5], [2.5, 12.5], [3, 18.5]]);
      P.rell("grey", 13, 16, 8, 3.4, -0.12);
      P.line("grey", 17, 15, 20.5, 11, 4.4); P.ell("grey", 21.5, 10, 3.1, 2.8);
      P.on("white", "grey", (x, y) => y > 17.5 - (x - 13) * 0.12 && x > 8);
      P.rell("dkgrey", 15.5, 18.5, 2.4, 1, 0.6);
      for (const [sx, sy] of [[9, 14], [12, 13], [15, 13.5]]) P.rect("dkgrey", sx, sy, sx + 1, sy + 1);
      P.rect("dkgrey", 22, 9, 23, 10); P.rect("dkgrey", 24, 10, 25, 11);
    }, 32) },
    { tier: 1, name: "duckling 2", make: () => picture(["sky", "white", "blue", "green", "brown", "yellow", "gold", "orange"], P0 => {
      const P = zoom(P0, 32 / 28);
      P.all("sky"); P.ell("white", 9, 4, 4, 1.4); P.ell("white", 12, 3, 2.4, 1.3);
      for (const [rx, h] of [[2, 6], [4, 9], [24.5, 7], [26.5, 10]]) { P.line("green", rx, 28, rx + 0.6, h, 1); P.ell("brown", rx + 0.6, h + 1.5, 0.8, 2); }
      P.rell("green", 3.5, 15, 3, 0.8, -1.1); P.rell("green", 25, 14, 3, 0.8, 1.1);
      P.poly("yellow", [[7, 17], [4.5, 13.5], [9, 15.5]]);
      P.ell("yellow", 13, 18, 6.5, 4.2); P.ell("yellow", 18, 11.5, 3.7, 3.6);
      P.rell("gold", 11.5, 17, 3.8, 2, 0.25);
      P.poly("orange", [[20.4, 10.8], [25.5, 12.6], [20.4, 14.6]]);
      P.rect("brown", 18, 10, 19.8, 11);
      P.when("blue", (x, y) => y > 20.5 + Math.sin(x * 0.7) * 0.5);
      P.when("white", (x, y) => y > 21 && y < 22 && Math.abs(x - 13) > 6 && Math.abs(x - 13) < 10);
      P.when("white", (x, y) => y > 24 && y < 25 && fl(x) % 6 < 2);
    }, 32) },

    // ----- medium -----
    { tier: 2, name: "octopus", make: () => picture(["purple", "lilac", "white", "ink"], P => {
      const arms = [[11, 17, 3, 27, -1], [13.5, 18, 8, 32, 1], [16.5, 19, 14.5, 34, -1], [19.5, 19, 21.5, 34, 1], [22.5, 18, 28, 32, -1], [25, 17, 33, 27, 1]];
      for (const [bx, by, ex, ey, s] of arms) {
        const pts = [];
        for (let i = 0; i <= 8; i++) { const t = i / 8; pts.push([bx + (ex - bx) * t + Math.sin(t * Math.PI * 1.6) * 1.6 * s, by + (ey - by) * t]); }
        for (let i = 1; i < pts.length; i++) P.line("purple", pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], 4 - i * 0.28);
        const [lx, ly] = pts[8]; P.ell("purple", lx + (ex < 18 ? -1 : 1), ly - 1, 1.4, 1.4);
        for (const i of [3, 5]) P.ell("lilac", pts[i][0], pts[i][1] + 0.4, 0.8, 0.8);
      }
      P.ell("purple", 18, 11, 9.5, 9);
      for (const [sx, sy, r] of [[13, 5.5, 1.3], [20.5, 4, 1], [24, 8, 1.2], [11, 9.5, 0.9]]) P.ell("lilac", sx, sy, r, r);
      P.ell("white", 14.5, 12.5, 2.2, 2.6); P.ell("white", 21.5, 12.5, 2.2, 2.6);
      P.outline("ink");
      P.rect("ink", 14, 12, 16, 14); P.rect("ink", 21, 12, 23, 14);
      P.when("ink", (x, y) => Math.abs(y - 16.5 - ((x - 18) ** 2) * -0.08) < 0.5 && Math.abs(x - 18) < 2.5);
    }, 36) },
    { tier: 2, name: "seahorse", make: () => picture(["orange", "yellow", "peach", "ink"], P => {
      P.poly("peach", [[11.5, 12.5], [4, 15.5], [4, 23], [11.5, 22]]);
      P.ell("orange", 18, 7.5, 4.4, 3.7);
      P.poly("orange", [[15, 4.5], [15.5, 0.8], [17.5, 3.5], [19.5, 0.8], [20.5, 4.5]]);
      P.line("orange", 20, 8.5, 27.5, 10, 3); P.ell("orange", 28, 10, 1.3, 1.8);
      P.line("orange", 16, 9, 12.5, 15, 5.4);
      P.ell("orange", 15, 18.5, 6, 6.6);
      P.line("orange", 13.5, 23, 13, 29.5, 4.2);
      P.when("orange", (x, y) => { const d = Math.hypot(x - 17, y - 30), a = Math.atan2(y - 30, x - 17); return d > 1.4 && d < 4.2 && !(a > -2.2 && a < -1.2); });
      P.on("yellow", "orange", (x, y) => ((x - 17) / 3.8) ** 2 + ((y - 18.5) / 5.4) ** 2 <= 1 && x > 15.5);
      P.outline("ink", true);
      P.on("ink", "yellow", (x, y) => fl(y) % 2 === 0);
      P.on("ink", "orange", (x, y) => x < 14 && y > 22 && y < 30 && fl(y) % 2 === 0);
      P.rect("ink", 18, 6, 20, 8);
    }, 36) },
    { tier: 2, name: "lobster", make: () => picture(["red", "maroon", "orange", "ink"], P => {
      for (const s of [-1, 1]) {
        path(P, "red", [[20 + s * 3.5, 13.5], [20 + s * 9, 13], [20 + s * 11, 9.5]], 3.4);
        P.rell("red", 20 + s * 12, 6, 3.8, 5.4, s * 0.25);
        P.poly("none", [[20 + s * 12.3, 5.5], [20 + s * 10.6, -1], [20 + s * 14.6, 0]]);
        P.on("orange", "red", (x, y) => Math.hypot(x - 20 - s * 12, y - 7) < 1.8);
      }
      P.ell("red", 20, 16.5, 4.8, 6.5); P.poly("red", [[18, 11], [20, 7], [22, 11]]);
      [[23.5, 4.4], [26.5, 4.1], [29.5, 3.7], [32, 3.2]].forEach(([y, rx], i) => P.ell(i % 2 ? "red" : "maroon", 20, y, rx, 1.9));
      for (const dx of [-4, -2, 0, 2, 4]) P.ell("orange", 20 + dx, 36, 1.4, 2.6);
      P.outline("ink", true);
      for (const s of [-1, 1]) {
        for (let i = 0; i < 3; i++) path(P, "orange", [[20 + s * 5, 15.5 + i * 2.6], [20 + s * 8.5, 16.5 + i * 3.4], [20 + s * 9, 19.5 + i * 3.6]], 1);
        path(P, "maroon", [[20 + s * 1.5, 9], [20 + s * 5, 12], [20 + s * 15, 21], [20 + s * 18, 33]], 1);
      }
      P.rect("ink", 18, 11, 19, 12); P.rect("ink", 21, 11, 22, 12);
    }, 40) },
    { tier: 2, name: "dolphin", make: () => picture(["sky", "yellow", "white", "blue", "cyan", "grey"], P => {
      P.all("sky"); P.ell("yellow", 30, 6, 3.5, 3.5); P.ell("white", 7, 6, 4.5, 1.5); P.ell("white", 10, 5, 2.5, 1.2);
      P.rect("blue", 0, 27, 36, 36);
      P.when("cyan", (x, y) => y > 28 && fl(y) % 3 === 1 && (fl(x) + fl(y) * 4) % 10 < 4);
      const R = 11.5, cx = 18, cy = 28;
      const T = (x, y) => (Math.atan2(y - cy, x - cx) + 2.7) / 2.25;
      P.when("grey", (x, y) => {
        const t = T(x, y); if (t < 0 || t > 1) return false;
        const hw = t < 0.7 ? 0.7 + 2.9 * t / 0.7 : 3.6 - (t - 0.7) / 0.3 * 2.4;
        return Math.abs(Math.hypot(x - cx, y - cy) - R) < hw;
      });
      P.line("grey", 27.5, 21.5, 30, 25.5, 2);
      const at = (a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
      P.poly("grey", [at(-1.85, R + 2), at(-1.4, R + 2), at(-2.0, R + 6.5)]);
      P.poly("grey", [[8.5, 22.5], [3, 22], [1.5, 25], [5, 24.5], [4.5, 28.5], [8.5, 25]]);
      P.on("white", "grey", (x, y) => { const t = T(x, y); return t > 0.2 && t < 1 && Math.hypot(x - cx, y - cy) < R - 0.6; });
      P.on("white", "grey", (x, y) => x > 28 && y > 24);
      P.rect("blue", 26, 20, 27, 21);
      for (const [sx, sy] of [[8, 27], [29, 27]]) { P.ell("white", sx, sy, 3, 1.3); P.ell("white", sx - 1, sy - 2.5, 0.7, 0.7); P.ell("white", sx + 1.5, sy - 3, 0.7, 0.7); }
    }, 36) },
    { tier: 2, name: "shark", make: () => picture(["blue", "navy", "tan", "green", "grey", "white"], P => {
      P.all("blue");
      P.when("navy", (x, y) => y > 25 + Math.sin(x * 0.3) * 1.2);
      P.when("tan", (x, y) => y > 32 + Math.sin(x * 0.5) * 0.8);
      for (const bx of [4, 7, 31]) P.when("green", (x, y) => y > 22 + (bx % 3) && y < 34 && Math.abs(x - (bx + Math.sin(y * 0.6 + bx) * 1.1)) < 0.9);
      for (const [bx, by] of [[6, 10], [7, 7], [5.5, 4]]) P.ell("white", bx, by, 0.7, 0.7);
      P.poly("grey", [[14, 12], [19, 4.5], [21.5, 12.5]]);
      P.poly("grey", [[12, 19], [16.5, 24.5], [17.5, 19.5]]);
      P.poly("grey", [[25, 14], [31, 15.5], [31, 17], [25, 18.5]]);
      P.poly("grey", [[29.5, 16], [35, 7.5], [33.5, 16.5], [35, 23], [29.5, 17]]);
      P.ell("grey", 17, 16, 11, 4.6); P.poly("grey", [[8, 12.5], [2.5, 15.5], [8, 18.8]]);
      P.on("white", "grey", (x, y) => y > 16.8 + (x - 17) * 0.06 && x < 27 && x > 3);
      P.rect("navy", 8, 14, 10, 15);
      for (const gx of [12, 13.5, 15]) P.line("navy", gx, 14.5, gx - 0.5, 17.5, 0.8);
      P.line("navy", 4.5, 17.3, 8.5, 17.8, 0.8);
    }, 36) },
    { tier: 2, name: "manta ray", make: () => picture(["blue", "cyan", "tan", "yellow", "navy", "white"], P => {
      P.all("blue");
      P.when("cyan", (x, y) => y < 18 && ((x - y * 0.45) % 9 + 9) % 9 < 1.6 && (fl(x) + fl(y)) % 2 === 0);
      P.when("tan", (x, y) => y > 32 + Math.sin(x * 0.45) * 0.9);
      for (const [fx, fy] of [[6, 7], [9, 10], [29, 28]]) { P.ell("yellow", fx, fy, 1.5, 0.9); P.poly("yellow", [[fx + 1, fy], [fx + 2.6, fy - 1.1], [fx + 2.6, fy + 1.1]]); }
      P.line("navy", 18, 25, 20, 34, 1);
      P.poly("navy", [[18, 8], [24, 10], [34.5, 18.5], [24, 20], [20, 26], [16, 26], [12, 20], [1.5, 18.5], [12, 10]]);
      P.line("navy", 15.8, 9, 14.5, 5.5, 2); P.line("navy", 20.2, 9, 21.5, 5.5, 2);
      P.rell("white", 12.5, 15, 3.6, 1.4, -0.45); P.rell("white", 23.5, 15, 3.6, 1.4, 0.45);
      for (const [bx, by] of [[18, 4], [19, 2]]) P.rect("white", bx, by, bx + 1, by + 1);
    }, 36) },
    { tier: 2, name: "puffin 2", make: () => picture(["sky", "white", "blue", "grey", "green", "ink", "orange", "yellow"], P => {
      P.all("sky"); P.ell("white", 7, 5, 5, 1.6); P.ell("white", 29, 8, 4, 1.3);
      P.rect("blue", 0, 17, 36, 30);
      P.when("white", (x, y) => y > 18 && y < 26 && fl(y) % 3 === 0 && (fl(x) + fl(y) * 3) % 11 < 2);
      P.poly("grey", [[0, 36], [0, 28], [10, 27], [24, 26.5], [36, 28], [36, 36]]);
      P.when("green", (x, y) => y > 25.5 && y < 29.5 + Math.sin(x * 1.3) * 0.7);
      P.on("ink", "grey", (x, y) => (fl(x) * 5 + fl(y) * 3) % 13 === 0 && y > 31);
      P.poly("ink", [[12.5, 22], [8.5, 26.5], [13, 25]]);
      P.ell("ink", 17, 19.5, 5.6, 7.5); P.ell("ink", 19, 9.5, 4.8, 4.6);
      P.ell("white", 20.5, 10.2, 3.2, 3.3); P.ell("white", 19.8, 20.5, 3.2, 6);
      P.poly("orange", [[22.5, 7.8], [28.5, 10.5], [22.5, 13.5]]);
      P.on("yellow", "orange", x => x < 24.6);
      P.rect("ink", 20, 8, 22, 10);
      P.rect("orange", 15.5, 26.5, 19, 28); P.rect("orange", 19.5, 26.5, 23, 28);
    }, 36) },
    { tier: 2, name: "otter 2", make: () => picture(["blue", "cyan", "dkgreen", "brown", "tan", "pink", "ink"], P => {
      P.all("blue");
      for (const [rx, ry, w] of [[5, 6, 4], [28, 30, 5], [4, 29, 3], [31, 8, 3]]) P.when("cyan", (x, y) => y > ry && y < ry + 1 && Math.abs(x - rx) < w);
      P.when("dkgreen", (x, y) => Math.abs(y - (33 + Math.sin(x * 0.5) * 1.3)) < 1.1);
      P.when("dkgreen", (x, y) => x > 14 && Math.abs(y - (3 + Math.sin(x * 0.45 + 1) * 1.2)) < 1);
      P.rell("brown", 31, 23, 4.5, 1.8, 0.4);
      P.ell("brown", 29, 13.5, 2, 3); P.ell("brown", 32, 17.5, 2.8, 2);
      P.ell("brown", 20, 19.5, 10.5, 5);
      P.ell("tan", 20.5, 18.5, 7.5, 3);
      P.ell("brown", 4.5, 11.5, 1.6, 1.6); P.ell("brown", 12.5, 11.5, 1.6, 1.6);
      P.ell("brown", 8.5, 17, 6, 5.8);
      P.ell("tan", 8.5, 18.5, 4.4, 3.8);
      P.rect("ink", 6, 14, 7, 16); P.rect("ink", 10, 14, 11, 16); P.rect("ink", 7.5, 17.5, 9.5, 19);
      P.ell("pink", 15.5, 15.5, 2.8, 2.4); P.on("tan", "pink", (x, y) => fl(x) === 15);
      P.ell("brown", 13.5, 17.5, 1.5, 1.2); P.ell("brown", 17.5, 17.8, 1.5, 1.2);
    }, 36) },
    { tier: 2, name: "spider on a web", make: () => picture(["dkgreen", "green", "white", "cyan", "brown", "yellow"], P => {
      P.all("dkgreen");
      P.rell("green", 2, 3, 6, 2.6, 0.5); P.rell("green", 4, 1, 4, 2, -0.3); P.rell("green", 34, 33, 6, 2.6, 0.5); P.rell("green", 32, 35, 4, 2, -0.3);
      const cx = 18, cy = 16, n = 8, sec = 2 * Math.PI / n;
      P.when("white", (x, y) => {
        const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx) + Math.PI;
        const phi = a - Math.round(a / sec) * sec;
        if (d * Math.abs(Math.sin(phi)) < 0.55) return true;
        const ph = (a % sec) - sec / 2, u = d * Math.cos(ph) / Math.cos(sec / 2);
        return u > 2 && Math.abs(u - (2 + Math.round((u - 2) / 4.4) * 4.4)) < 0.45;
      });
      for (const [a, r] of [[0.39, 10.8], [1.96, 14.2], [3.53, 10.8], [4.32, 18.5], [5.89, 14.2], [2.75, 18.5], [5.1, 10.8], [1.18, 20]]) P.ell("cyan", cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0.9, 0.9);
      for (const s of [-1, 1]) for (let i = 0; i < 4; i++) path(P, "brown", [[18 + s * 1.5, 14 + i * 0.7], [18 + s * (5 + i * 0.4), 10 + i * 2.6], [18 + s * (7.5 + i * 0.3), 13 + i * 3.6]], 1);
      P.ell("brown", 18, 14.5, 2.3, 2.1); P.ell("brown", 18, 20, 3.4, 4);
      P.rect("yellow", 17, 17, 19, 23); P.rect("yellow", 15, 18.5, 21, 20.5);
    }, 36) },
    { tier: 2, name: "moth", make: () => picture(["mint", "green", "yellow", "maroon", "white", "ink"], P => {
      for (const s of [-1, 1]) {
        P.poly("mint", [[16 + s * 1.5, 14], [16 + s * 10, 15], [16 + s * 10, 21], [16 + s * 6.5, 24], [16 + s * 4.5, 31.5], [16 + s * 2.5, 24], [16 + s * 1, 19]]);
        P.poly("mint", [[16 + s * 1.5, 8.5], [16 + s * 13, 3], [16 + s * 15, 6], [16 + s * 10.5, 15.5], [16 + s * 1.5, 15]]);
        P.line("green", 16 + s * 2, 9.2, 16 + s * 13.8, 4.2, 2.6);
        P.ell("yellow", 16 + s * 8.5, 10.5, 2.1, 2.1); P.ell("maroon", 16 + s * 8.5, 10.5, 1.2, 1.2);
        P.ell("yellow", 16 + s * 6.5, 19.5, 1.9, 1.9); P.ell("maroon", 16 + s * 6.5, 19.5, 1.1, 1.1);
      }
      P.ell("white", 16, 15, 2.2, 7.2); P.ell("white", 16, 7.8, 2, 1.8);
      P.outline("ink");
      for (const s of [-1, 1]) { P.line("ink", 16 + s * 1, 6.5, 16 + s * 4, 1.5, 1); P.line("ink", 16 + s * 2.5, 4, 16 + s * 4.5, 4.5, 1); P.line("ink", 16 + s * 3, 2.8, 16 + s * 1.8, 1.5, 1); }
    }, 32) },
    { tier: 2, name: "hermit crab", make: () => picture(["tan", "brown", "peach", "red", "white", "ink"], P => {
      P.poly("tan", [[22, 10], [32.5, 2], [30, 14]]);
      P.ell("tan", 21.5, 17.5, 10.5, 9.5);
      P.on("brown", "tan", (x, y) => { const d = Math.hypot(x - 27, y - 10), a = Math.atan2(y - 10, x - 27); const f = a / (2 * Math.PI) - Math.log(d + 0.5) / Math.log(2.3); return f - fl(f) < 0.38; });
      P.ell("peach", 13, 21.5, 5, 4.8);
      for (const [a, b, c, d] of [[12, 25, 6.5, 31.5], [14.5, 26, 11, 33], [17, 26.5, 16.5, 33.5]]) path(P, "red", [[a, b], [(a + c) / 2 - 1, (b + d) / 2 - 1], [c, d]], 3);
      P.ell("red", 8, 24.5, 4, 3.2); P.poly("none", [[6.5, 24.5], [2, 22], [3, 25.5]]);
      P.ell("red", 14.5, 27.5, 2.4, 1.8);
      P.line("red", 11, 21, 9, 14.5, 2.4); P.line("red", 13.5, 21, 13, 13.5, 2.4);
      P.ell("white", 9, 13.5, 2.3, 2.3); P.ell("white", 13, 12.5, 2.3, 2.3);
      P.outline("ink", true);
      P.rect("ink", 9, 13, 10, 14); P.rect("ink", 13, 12, 14, 13);
    }, 36) },
    { tier: 2, name: "angelfish", make: () => picture(["teal", "green", "tan", "cyan", "yellow", "white", "ink"], P => {
      P.all("teal");
      P.when("tan", (x, y) => y > 32.5 + Math.sin(x * 0.5) * 0.7);
      for (const [bx, top] of [[3.5, 9], [6.5, 16], [31, 12], [33.5, 18]]) P.when("green", (x, y) => y > top && Math.abs(x - (bx + Math.sin(y * 0.5 + bx) * 1.2)) < 1);
      for (const [bx, by, r] of [[28, 8, 1.4], [30, 4, 1], [27, 2, 0.8]]) P.when("cyan", (x, y) => { const d = Math.hypot(x - bx, y - by); return d < r + 0.5 && d > r - 0.6; });
      P.poly("yellow", [[13, 12], [19, 1.5], [21, 12]]);
      P.poly("yellow", [[13, 24], [19, 34.5], [21, 24]]);
      P.poly("yellow", [[23, 18], [31, 11.5], [29.5, 18], [31, 24.5]]);
      P.line("yellow", 13, 23, 10, 32, 1.2);
      P.poly("white", [[6, 18], [16, 9], [25, 18], [16, 27]]);
      P.on("ink", ["white", "yellow"], (x, y) => Math.abs(x - 11.2) < 0.9 || Math.abs(x - 16.8) < 1.1 || Math.abs(x - 22) < 0.8);
      P.rect("ink", 8, 16, 10, 18);
    }, 36) },
    { tier: 2, name: "swordfish", make: () => picture(["blue", "grey", "white", "ink"], P => {
      P.poly("blue", [[17, 17], [20.5, 4.5], [23.5, 6], [25, 16.5]]);
      P.poly("blue", [[31, 20], [38.5, 9.5], [36.5, 20], [38.5, 30.5]]);
      P.poly("blue", [[20, 23], [24, 30], [25, 23]]);
      P.poly("grey", [[14, 17.5], [0.5, 19.5], [0.5, 21.5], [14, 23.5]]);
      P.rell("blue", 22, 20.5, 11, 4.8, 0);
      P.poly("blue", [[30, 18.5], [33.5, 19.6], [33.5, 21.4], [30, 22.5]]);
      P.on("white", "blue", (x, y) => y > 21.5 && x < 32 && x > 11);
      P.ell("white", 16, 19.2, 2.3, 2.3);
      P.outline("ink", true);
      P.rect("ink", 16, 19, 17, 20);
    }, 40) },
    { tier: 2, name: "kingfisher", make: () => picture(["peach", "blue", "white", "green", "brown", "cyan", "orange", "ink"], P => {
      P.all("peach");
      P.when("blue", (x, y) => y > 29 + Math.sin(x * 0.5) * 0.5);
      P.when("white", (x, y) => y > 31 && y < 32 && fl(x) % 7 < 3);
      for (const [rx, top] of [[2, 14], [4, 18], [32, 16], [34.5, 20]]) { P.line("green", rx, 36, rx + 1, top, 1.2); }
      P.line("brown", 0, 25.5, 36, 22.5, 2.8); P.line("brown", 27, 23, 32, 17, 1.5);
      P.rell("green", 33, 15.5, 2.6, 1.2, -0.6); P.rell("green", 29, 16, 2.2, 1, 0.8);
      P.poly("blue", [[22, 20], [26.5, 28], [24.5, 28.5], [20, 22]]);
      P.rell("cyan", 19, 17, 4.4, 6.2, 0.35);
      P.on("orange", "cyan", (x, y) => x < 19.5 - (y - 17) * 0.35 && y > 12.5);
      P.rell("blue", 21, 16.5, 3, 5.4, 0.35);
      P.ell("cyan", 15.5, 10, 4, 3.9);
      P.rell("orange", 15, 11.2, 2.8, 1.2, 0.1);
      P.ell("white", 13.5, 13.8, 1.9, 1.4); P.ell("white", 18.5, 11.8, 1.3, 1.7);
      P.poly("ink", [[13, 9], [4.5, 11], [13, 12]]);
      P.rect("ink", 15, 9, 16, 10);
      P.rect("orange", 17.5, 22, 19, 24); P.rect("orange", 19.5, 22, 21, 23.5);
    }, 36) },
    { tier: 2, name: "heron", make: () => picture(["sky", "white", "green", "brown", "blue", "grey", "yellow", "ink"], P => {
      P.all("sky"); P.ell("white", 30, 5, 5, 1.6); P.ell("white", 33, 4, 3, 1.3);
      P.rect("green", 0, 25, 40, 30);
      for (let gx = 1; gx < 40; gx += 3) P.poly("green", [[gx - 1, 25.5], [gx, 23], [gx + 1, 25.5]]);
      P.rect("blue", 0, 30, 40, 40);
      for (const [rx, top] of [[2, 12], [4.5, 15], [6.5, 11], [36, 14], [38, 18]]) { P.line("green", rx, 40, rx + 0.5, top, 1.2); P.ell("brown", rx + 0.5, top + 2, 0.9, 2.2); }
      P.line("yellow", 22.5, 23, 21.5, 34, 1.2); P.line("yellow", 25.5, 23, 26, 34, 1.2);
      P.when("blue", (x, y) => y > 33 && x > 18 && x < 30);
      P.when("white", (x, y) => y > 33.5 && y < 34.5 && x > 18 && x < 30 && Math.abs(x - 24) > 1.5);
      P.when("white", (x, y) => y > 36 && y < 37 && x > 15 && x < 33 && fl(x) % 5 < 3);
      P.poly("grey", [[29, 21], [35, 27], [29.5, 24.5]]);
      P.rell("grey", 24, 19, 7.2, 4.2, 0.35);
      P.on("ink", "grey", (x, y) => y > 20 + (x - 24) * 0.35 + 1.8 && x > 24);
      path(P, "white", [[19, 17], [16.5, 13], [18, 9], [16.5, 6]], 2.6);
      P.ell("white", 16.5, 5.5, 2.6, 2);
      P.poly("yellow", [[14.5, 4.8], [6.5, 6.5], [14.5, 6.8]]);
      path(P, "ink", [[17, 4.5], [21, 4], [23.5, 5]], 0.9);
      P.rect("ink", 16, 5, 17, 6);
      for (const [nx, ny] of [[17, 10], [16.6, 12], [17.4, 14]]) P.rect("ink", nx, ny, nx + 1, ny + 1);
    }, 40) },
    { tier: 2, name: "grasshopper", make: () => picture(["green", "lime", "dkgreen", "ink"], P => {
      P.rell("green", 15, 20, 10.5, 3.4, -0.06);
      P.rell("dkgreen", 16.5, 17.3, 9, 2.2, -0.1);
      P.ell("green", 25.5, 17.5, 4, 4);
      P.rell("green", 30, 17, 3.2, 4, 0.2);
      P.rell("green", 16, 13.5, 8, 2.8, 0.62);
      P.on("lime", "green", (x, y) => y > 20.5 && x > 6);
      P.on("lime", "green", (x, y) => { const u = (x - 16) * Math.cos(0.62) + (y - 13.5) * Math.sin(0.62), v = -(x - 16) * Math.sin(0.62) + (y - 13.5) * Math.cos(0.62); return Math.abs(u) < 6.5 && v > 0.6 && v < 2.8; });
      P.outline("ink");
      path(P, "ink", [[9.5, 8.5], [7.5, 24], [4, 25]], 1.4);
      for (const [a, b, c, d, e, f] of [[24, 21, 25, 25, 23, 27], [27, 21, 30, 24.5, 31.5, 27]]) path(P, "ink", [[a, b], [c, d], [e, f]], 1);
      path(P, "ink", [[30.5, 13.5], [32.5, 7], [35, 3]], 1); path(P, "ink", [[29.5, 13.5], [29.5, 6], [31, 2]], 1);
      P.ell("ink", 31, 15.5, 1.2, 1.3);
    }, 36) },
    { tier: 2, name: "salmon leap", make: () => picture(["sky", "dkgreen", "blue", "grey", "white", "red", "pink"], P => {
      P.all("sky"); P.ell("white", 8, 4, 4.5, 1.4);
      P.when("dkgreen", (x, y) => y > 9 + Math.abs(Math.sin(x * 0.55)) * -3 + Math.sin(x * 1.7) * 0.6 && y < 15);
      P.rect("blue", 0, 14, 40, 19);
      P.rect("grey", 0, 19, 40, 23); P.ell("grey", 4, 24, 6, 6); P.ell("grey", 36, 24, 6, 6); P.rect("grey", 0, 23, 9, 34); P.rect("grey", 31, 23, 40, 34);
      P.on("white", "grey", (x, y) => (fl(x) * 7 + fl(y) * 3) % 17 === 0);
      P.when("blue", (x, y) => y >= 18 && y < 34 && x > 9 && x < 31);
      P.on("white", "blue", (x, y) => y > 18 && y < 34 && (fl(x) % 4 === 0 || y > 31));
      P.rect("blue", 0, 34, 40, 40);
      P.when("white", (x, y) => y > 33 && y < 35.5 && Math.abs(Math.sin(x * 0.9)) > 0.3 && x > 7 && x < 33);
      P.when("white", (x, y) => y > 37 && y < 38 && fl(x) % 6 < 3);
      const a = -0.75, ux = Math.cos(a), uy = Math.sin(a), cx = 21, cy = 14;
      const ex = cx - ux * 7, ey = cy - uy * 7;
      P.poly("red", [[ex + ux, ey + uy], [ex - ux * 3.5 - uy * 3, ey - uy * 3.5 + ux * 3], [ex - ux * 2, ey - uy * 2], [ex - ux * 3.5 + uy * 3, ey - uy * 3.5 - ux * 3]]);
      P.rell("red", cx, cy, 7.6, 2.9, a);
      P.on("pink", "red", (x, y) => -(x - cx) * uy + (y - cy) * ux > 0.6 && Math.abs((x - cx) * ux + (y - cy) * uy) < 6.5);
      P.rect("white", 25, 9, 27, 10); P.rect("grey", 26, 9, 27, 10);
    }, 40) },
    { tier: 2, name: "stag beetle", make: () => picture(["maroon", "brown", "tan", "ink"], P => {
      for (const s of [-1, 1]) {
        path(P, "ink", [[18 + s * 4, 15], [18 + s * 9, 13], [18 + s * 11, 9]], 1.1);
        path(P, "ink", [[18 + s * 5, 20], [18 + s * 10, 21], [18 + s * 13, 18.5]], 1.1);
        path(P, "ink", [[18 + s * 5, 26], [18 + s * 9.5, 29.5], [18 + s * 11, 34.5]], 1.1);
        path(P, "ink", [[18 + s * 4.5, 9], [18 + s * 8, 8], [18 + s * 9, 10]], 1);
        path(P, "brown", [[18 + s * 2.5, 9], [18 + s * 5.5, 5], [18 + s * 5, 1.8], [18 + s * 2.8, 1]], 3.2);
        P.line("brown", 18 + s * 5.2, 4.5, 18 + s * 3, 4, 2.2);
      }
      P.ell("brown", 18, 9.8, 5.6, 2.8);
      P.ell("brown", 18, 14.6, 6.6, 3.4);
      P.ell("maroon", 18, 25, 7.4, 9.8);
      P.rell("tan", 15, 21.5, 1.4, 4.6, 0.1); P.rell("tan", 21, 21.5, 1.4, 4.6, -0.1); P.ell("tan", 15.5, 13.6, 1.8, 0.9);
      P.outline("ink", true);
      P.line("ink", 18, 16, 18, 34, 1);
    }, 36) },
    { tier: 2, name: "anglerfish", make: () => picture(["navy", "white", "brown", "tan", "lime", "yellow"], P => {
      P.all("navy");
      for (const [sx, sy] of [[3, 4], [10, 2], [5, 31], [20, 33], [33, 30], [33, 15], [15, 3]]) P.rect("white", sx, sy, sx + 1, sy + 1);
      path(P, "brown", [[14, 12], [16, 5], [21, 2], [26.5, 4.5], [28, 7]], 1.2);
      P.ell("lime", 28, 8.5, 4, 4); P.ell("yellow", 28, 8.5, 2, 2);
      P.poly("tan", [[6, 20], [0.5, 13.5], [2, 20], [0.5, 26.5]]);
      P.ell("brown", 15.5, 20.5, 11, 9.5);
      P.on("tan", "brown", (x, y) => y > 26 + Math.sin(x * 0.6) * 0.5);
      P.rell("tan", 12, 23, 3.2, 1.7, 0.6);
      P.ell("navy", 27, 21.5, 5.5, 4.2);
      for (const tx of [22.5, 25, 27.5]) { P.poly("white", [[tx - 1, 17.6], [tx + 1, 17.6], [tx, 20.2]]); P.poly("white", [[tx - 1, 25.6], [tx + 1, 25.6], [tx, 23]]); }
      P.ell("white", 19, 14.5, 2.5, 2.5); P.ell("navy", 19.5, 14.5, 1.1, 1.1);
    }, 36) },
    { tier: 2, name: "crocodile 2", make: () => picture(["green", "dkgreen", "lime", "white", "ink"], P => {
      P.poly("green", [[8, 24], [13, 24], [12.5, 30], [15, 31], [15, 33.5], [7.5, 33.5], [9, 28.5]]);
      P.poly("green", [[23, 24], [28, 24], [28, 30], [30.5, 31], [30.5, 33.5], [23, 33.5]]);
      P.poly("green", [[10, 18], [0.5, 27], [1.5, 28.5], [10, 27]]);
      P.rell("green", 19, 22.5, 11, 5.6, 0);
      P.ell("green", 30, 21.5, 4.6, 4.2);
      P.poly("green", [[29.5, 18.8], [39.5, 21.5], [39.5, 25.2], [29.5, 26]]);
      P.ell("green", 31, 17.6, 2.3, 2.2);
      for (let sx = 2.5; sx < 28; sx += 2.8) { const top = sx < 10 ? 18 + (10 - sx) * 0.95 : 17.1; P.poly("dkgreen", [[sx - 1.3, top + 1.2], [sx, top - 1.6], [sx + 1.3, top + 1.2]]); }
      P.on("dkgreen", "green", (x, y) => (x > 9 && x < 28 && y < 19.6) || (x <= 9.5 && y < 18 + (10 - x) * 0.95 + 2.2));
      P.on("lime", "green", (x, y) => y > 25 && x > 9 && x < 35);
      P.outline("ink", true);
      P.line("ink", 31, 24.6, 39.5, 23.6, 0.9);
      for (let tx = 32; tx < 39; tx += 2) { P.rect("white", tx, 23.4 - (tx - 31) * 0.1, tx + 1, 24.2 - (tx - 31) * 0.1); P.rect("white", tx + 1, 24.8, tx + 2, 25.8); }
      P.rect("white", 30, 16.5, 32.5, 18); P.rect("ink", 31, 16.5, 32, 18);
      P.rect("ink", 38, 21, 39, 22);
    }, 40) },
    { tier: 3, name: "pelican 2", make: () => picture(["white", "grey", "yellow", "orange", "brown", "tan", "ink"], P => {
      P.rect("brown", 14, 34, 25, 44); P.ell("tan", 19.5, 34.5, 5.5, 2.4);
      P.on("tan", "brown", (x, y) => y > 37.5 && (fl(x) === 16 || fl(x) === 19 || fl(x) === 22) && fl(y) % 4 !== 0);
      P.rect("orange", 16.5, 30.5, 18.5, 34); P.rect("orange", 20.5, 30.5, 22.5, 34);
      P.poly("white", [[10, 25], [3.5, 31], [9, 30.5], [12, 28]]);
      P.ell("white", 17, 25, 9, 7);
      P.rell("grey", 13.5, 24.5, 8.4, 4.6, 0.25);
      P.on("ink", "grey", (x, y) => x < 10 && fl(x + y) % 2 === 0);
      P.line("white", 23, 22, 25, 12, 5.4);
      P.poly("white", [[22.5, 7.5], [18.5, 6], [22.5, 9.5]]);
      P.ell("white", 25.5, 9.5, 4.3, 3.7);
      P.poly("orange", [[27, 11], [43, 15], [37, 19.5], [31, 20], [27, 15.5]]);
      P.poly("yellow", [[27, 7], [43, 12.8], [43, 15], [27, 11]]);
      P.ell("orange", 42.5, 14.6, 1.3, 1.3);
      P.outline("ink", true);
      P.rect("ink", 26, 8, 28, 10);
    }, 44) },
    { tier: 3, name: "rock pool", make: () => picture(["grey", "dkgrey", "teal", "tan", "green", "red", "orange", "purple", "white"], P => {
      P.all("grey");
      P.on("dkgrey", "grey", (x, y) => Math.abs(Math.sin(x * 0.55 + y * 0.25) + Math.sin(y * 0.7 - x * 0.2)) < 0.12);
      const pool = (x, y) => ((x - 22) / 18) ** 2 + ((y - 23) / 16.5) ** 2 + 0.07 * Math.sin(Math.atan2(y - 23, x - 22) * 5) <= 1;
      P.when("teal", pool);
      P.on("tan", "teal", (x, y) => y > 31 + Math.sin(x * 0.4) * 1.5);
      for (const [bx, by, ex, ey] of [[6, 26, 13, 21], [8, 32, 15, 33], [36, 12, 30, 17]]) for (let k = 0; k < 2; k++) path(P, "green", [[bx, by + k * 2], [(bx + ex) / 2 + 1, (by + ey) / 2 + k * 2 - 1.5], [ex, ey + k * 2]], 1.6);
      for (let i = 0; i < 9; i++) { const a = i * Math.PI * 2 / 9; P.line("red", 13, 14, 13 + Math.cos(a) * 4.6, 14 + Math.sin(a) * 4.6, 1.4); }
      P.ell("red", 13, 14, 2.2, 2.2); P.ell("orange", 13, 14, 1.1, 1.1);
      P.poly("orange", star(30, 30, 6, 2.3, 5, -1.3));
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; P.line("purple", 16, 31, 16 + Math.cos(a) * 3.8, 31 + Math.sin(a) * 3.8, 1); }
      P.ell("purple", 16, 31, 2.4, 2.4);
      for (const s of [-1, 1]) { P.line("red", 30 + s * 2, 15, 30 + s * 4.5, 11.5, 1.2); P.ell("red", 30 + s * 4.8, 10.8, 1.5, 1.3); for (const d of [0, 1.6]) P.line("red", 30 + s * 2, 16.5 + d, 30 + s * 5, 18 + d * 1.4, 0.9); }
      P.ell("red", 30, 16.5, 3.2, 2.3);
      P.ell("white", 23, 37, 1.8, 1.3); P.ell("white", 37.5, 24, 1.4, 1.8); P.ell("white", 24, 21, 1.3, 1);
      P.when("white", (x, y) => pool(x, y) && y > 9 && y < 10 && x > 18 && x < 24);
      P.when("white", (x, y) => pool(x, y) && y > 11 && y < 12 && x > 20 && x < 23);
    }, 44) },
    { tier: 3, name: "beehive", make: () => picture(["sky", "white", "green", "pink", "brown", "tan", "ink", "yellow"], P => {
      P.all("sky"); P.ell("white", 7, 5, 5, 1.6); P.ell("white", 10, 4, 3, 1.3); P.ell("white", 33, 7, 4, 1.4);
      P.rect("green", 0, 34, 40, 40);
      for (let gx = 1; gx < 40; gx += 3) P.poly("green", [[gx - 1, 34.5], [gx, 32], [gx + 1, 34.5]]);
      for (const [fx, fy] of [[4, 36], [35, 37], [26, 38.5]]) { for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5; P.ell("pink", fx + Math.cos(a) * 1.4, fy + Math.sin(a) * 1.4, 1.1, 1.1); } P.rect("yellow", fx - 0.5, fy - 0.5, fx + 0.5, fy + 0.5); }
      P.rect("brown", 8, 31, 32, 33.5); P.rect("brown", 10, 33, 12, 40); P.rect("brown", 28, 33, 30, 40);
      P.when("tan", (x, y) => y < 31 && ((x - 20) / 11) ** 2 + ((y - 31) / 19.5) ** 2 <= 1);
      P.on("brown", "tan", (x, y) => fl(y) % 3 === 0);
      P.ell("ink", 20, 30, 2.6, 1.8);
      for (const [bx, by] of [[8, 16], [31, 14], [27, 22], [6, 25], [35, 27], [14, 9], [24, 6]]) {
        P.ell("white", bx - 0.3, by - 1.5, 1.1, 0.9);
        P.ell("yellow", bx, by, 1.9, 1.3);
        P.rect("ink", bx - 0.4, by - 1, bx + 0.6, by + 1); P.rect("ink", bx + 1.5, by - 0.5, bx + 2.5, by + 0.5);
      }
      for (const [dx, dy] of [[11, 18], [13, 20.5], [9.5, 21.5], [29, 18], [33, 19.5]]) P.rect("ink", dx, dy, dx + 1, dy + 1);
    }, 40) },
    { tier: 3, name: "ant colony", make: () => picture(["sky", "yellow", "green", "brown", "tan", "white", "orange", "ink"], P => {
      P.all("sky"); P.ell("yellow", 38, 5, 3.2, 3.2);
      P.rect("brown", 0, 12, 44, 44); P.ell("brown", 22, 12, 6.5, 3.5);
      P.rect("green", 0, 10.5, 15, 12.5); P.rect("green", 29, 10.5, 44, 12.5);
      for (const gx of [2, 6, 10, 32, 36, 41]) P.poly("green", [[gx - 1, 11], [gx, 8], [gx + 1, 11]]);
      for (const pts of [[[22, 8.5], [22, 18]], [[22, 17], [15, 19]], [[22, 17], [28, 21]], [[10, 21], [12.5, 28], [17, 33]], [[33, 24], [34, 30]]]) path(P, "tan", pts, 3);
      P.ell("tan", 10, 19, 6, 3); P.ell("tan", 33, 22, 6.5, 3); P.ell("tan", 22, 35, 8.5, 3.6); P.ell("tan", 34.5, 32.5, 5.5, 2.6);
      for (const [ex, ey] of [[19, 35.5], [21.5, 34.5], [24, 35.8], [26.5, 34.8], [21, 37]]) P.ell("white", ex, ey, 1.3, 1);
      for (const [sx, sy] of [[6.5, 19.5], [9, 20.3], [11.5, 19.3], [8, 17.8], [13.5, 20.3]]) P.ell("orange", sx, sy, 1.4, 1.1);
      P.rell("green", 31, 22.5, 2.8, 1.2, 0.4); P.rell("green", 35.5, 22, 2.2, 1.1, -0.5); P.rell("green", 35, 33, 2.4, 1, 0.3);
      for (const [x, y, a] of [[22, 13.5, 1.57], [25.5, 19.3, 0.6], [12.4, 26, 1.25], [16, 35, 0], [32, 32.5, 3.14], [5, 8.5, 0], [29.5, 8.8, 3.3], [33.6, 27, 1.5]]) tinyAnt(P, "ink", x, y, a);
    }, 44) },
    { tier: 3, name: "pond life", make: () => picture(["sky", "white", "dkgreen", "green", "blue", "pink", "yellow", "brown", "teal"], P => {
      P.all("sky"); P.ell("white", 9, 4, 5, 1.6); P.ell("white", 12, 3, 3, 1.3); P.ell("white", 34, 6, 4, 1.3);
      P.when("dkgreen", (x, y) => y > 12 - Math.abs(Math.sin(x * 0.42)) * 3.5 - Math.abs(Math.sin(x * 1.1)) && y < 17);
      P.rect("green", 0, 16, 44, 18);
      P.rect("blue", 0, 18, 44, 44);
      P.when("white", (x, y) => y > 19 && fl(y) % 6 === 2 && (fl(x) + fl(y) * 5) % 13 < 2);
      P.ell("yellow", 29, 5, 2.8, 2.8);
      for (const [px, py, rx, ry, na] of [[10, 31, 6, 2.4, 0.4], [31, 37, 7, 2.7, 2.6], [23, 24, 4, 1.6, 1.2], [38, 27, 3.8, 1.5, 2], [6, 40, 4.5, 1.8, 0.2]]) {
        P.ell("green", px, py, rx, ry);
        P.poly("blue", [[px, py], [px + Math.cos(na) * rx * 1.4, py + Math.sin(na) * ry * 1.4 - 0.8], [px + Math.cos(na) * rx * 1.4, py + Math.sin(na) * ry * 1.4 + 0.8]]);
      }
      for (const [fx, fy] of [[10, 29.5], [29, 35.5]]) { P.ell("pink", fx - 1.6, fy, 1.4, 1.1); P.ell("pink", fx + 1.6, fy, 1.4, 1.1); P.ell("pink", fx, fy - 1.2, 1.1, 1.6); P.ell("yellow", fx, fy, 0.9, 0.8); }
      for (const [rx, top] of [[38, 14], [40, 17], [42.5, 13], [2, 18], [4, 21]]) { P.line("green", rx, 44, rx + 0.5, top, 1.2); P.ell("brown", rx + 0.5, top + 2.2, 0.9, 2.3); }
      P.rell("white", 17.5, 11, 3.6, 1.2, -0.4); P.rell("white", 17.5, 15, 3.6, 1.2, 0.4); P.rell("white", 20.5, 11, 3, 1.1, -0.7); P.rell("white", 20.5, 15, 3, 1.1, 0.7);
      P.line("teal", 11, 13, 21, 13, 1.8); P.ell("teal", 22, 13, 1.5, 1.5);
    }, 44) },
    { tier: 3, name: "mackerel shoal", make: () => picture(["blue", "sky", "navy", "teal", "white", "grey"], P => {
      P.all("blue");
      P.when("sky", (x, y) => y < 5 + Math.sin(x * 0.4) * 1);
      P.when("navy", (x, y) => y > 38 + Math.sin(x * 0.3) * 1.5);
      const fish = (cx, cy, L) => {
        const H = L * 0.3, inb = (x, y) => ((x - cx) / L) ** 2 + ((y - cy) / H) ** 2 <= 1;
        P.poly("grey", [[cx + L * 0.8, cy], [cx + L + 3, cy - 2.6], [cx + L + 2, cy], [cx + L + 3, cy + 2.6]]);
        P.poly("grey", [[cx - L * 0.1, cy - H * 0.8], [cx + L * 0.3, cy - H - 1.5], [cx + L * 0.4, cy - H * 0.7]]);
        P.when("teal", inb);
        P.on("white", "teal", (x, y) => inb(x, y) && y > cy + 0.2);
        P.on("navy", "teal", (x, y) => inb(x, y) && x > cx - L * 0.5 && (fl(x) + fl(y * 0.6)) % 3 === 0);
        P.rect("navy", fl(cx - L * 0.7), fl(cy - 0.5), fl(cx - L * 0.7) + 1, fl(cy - 0.5) + 1);
      };
      for (const [cx, cy, L] of [[12, 11, 8], [30, 13, 7.5], [9, 24, 7.5], [27, 25, 8.5], [15, 35, 8], [33, 36, 6.5]]) fish(cx, cy, L);
      for (const [bx, by, r] of [[3, 15, 0.8], [4.5, 12, 0.7], [41, 20, 1], [40, 16.5, 0.7], [22, 18, 0.7]]) P.ell("white", bx, by, r, r);
    }, 44) },
    { tier: 3, name: "lionfish", make: () => picture(["red", "white", "peach", "maroon", "ink"], P => {
      P.poly("peach", [[33, 21], [43, 14], [43.5, 33], [33, 27]]);
      P.on("maroon", "peach", (x, y) => (fl(x) + fl(y) * 2) % 4 === 0);
      P.when("peach", (x, y) => { const a = Math.atan2(y - 27, x - 18), d = Math.hypot(x - 18, y - 27); return a > 0.75 && a < 2.45 && d < 15.5 - Math.abs(Math.sin((a - 0.75) * 9)) * 1.5; });
      for (let a = 0.85; a < 2.45; a += 0.2) P.line("red", 18, 27, 18 + Math.cos(a) * 14.5, 27 + Math.sin(a) * 14.5, 1.4);
      P.poly("peach", [[12, 20], [14, 12], [31, 12], [33, 20]]);
      for (let i = 0; i < 9; i++) { const bx = 12.5 + i * 2.4, tx = 11 + i * 2.8, ty = 2 + Math.abs(i - 3) * 1.1; P.poly("red", [[bx - 1.3, 20], [tx, ty], [bx + 1.3, 20]]); }
      P.rell("red", 24, 23.5, 11, 6.5, 0.04);
      P.ell("red", 14, 23.5, 5.6, 5.2);
      P.on("white", "red", (x, y) => {
        const body = ((x - 24) / 11) ** 2 + ((y - 23.5) / 6.5) ** 2 <= 1 || Math.hypot(x - 14, y - 23.5) <= 5.2;
        return body ? fl(x + (y - 23) * 0.3) % 4 < 2 : (y < 20 ? fl(y) % 3 === 0 : fl(Math.hypot(x - 18, y - 27)) % 3 === 0);
      });
      P.outline("ink");
      P.rect("ink", 12, 21, 14, 23);
      P.line("ink", 9, 26, 12, 26.5, 0.9);
    }, 44) },
    { tier: 3, name: "nautilus", make: () => picture(["white", "orange", "brown", "peach", "ink"], P => {
      for (const [ex, ey] of [[1, 27], [2, 31.5], [4.5, 34.5], [8, 36], [1.5, 23]]) P.line("peach", 9, 25, ex, ey, 2.6);
      P.ell("white", 23, 19, 14.5, 14);
      P.on("orange", "white", (x, y) => { const a = Math.atan2(y - 19, x - 23), d = Math.hypot(x - 23, y - 19); return a > -2.9 && a < 0.9 && Math.sin(a * 8 + d * 0.32) > 0.3 && d > 4; });
      P.on("brown", "orange", (x, y) => Math.hypot(x - 23, y - 19) < 9);
      P.ell("peach", 10, 23, 4.5, 6);
      P.rell("brown", 11.5, 15.5, 5, 2.6, -0.5);
      P.outline("ink");
      P.when("ink", (x, y) => { const d = Math.hypot(x - 24, y - 20); return Math.abs(d - 5) < 0.5 && y > 17; });
      P.ell("ink", 24, 20, 1.3, 1.3);
      P.rect("ink", 10, 20, 12, 22);
    }, 40) },
    { tier: 3, name: "praying mantis", make: () => picture(["green", "lime", "dkgreen", "brown", "ink"], P => {
      P.line("brown", 0, 39, 44, 35.5, 3.4);
      P.rell("dkgreen", 39, 39.5, 3.5, 1.5, 0.5); P.rell("dkgreen", 5, 36, 3, 1.3, -0.6);
      P.rell("green", 12, 27, 10, 3.8, 0.28);
      P.rell("dkgreen", 13.5, 25.3, 9, 2.4, 0.22);
      P.line("green", 21, 26, 27, 13, 3.4);
      P.poly("green", [[24, 10.5], [32, 9], [28.5, 15.5]]);
      P.ell("lime", 24.8, 10.5, 1.7, 1.7); P.ell("lime", 31.2, 9.3, 1.7, 1.7);
      P.line("green", 26, 16, 32, 21, 3); P.line("green", 32, 21, 29.5, 13.5, 2.6);
      P.on("lime", "green", (x, y) => y > 27 + (x - 12) * 0.28 + 0.8);
      P.outline("ink");
      for (const [a, b, c, d, e, f] of [[20, 27, 23, 32.5, 25, 36], [16, 29, 15.5, 33, 13.5, 37.5], [22, 26, 29, 29, 32, 35.5]]) path(P, "ink", [[a, b], [c, d], [e, f]], 1);
      path(P, "ink", [[26, 10], [22, 4], [18, 2]], 1); path(P, "ink", [[29, 9.5], [30, 3], [34, 0.5]], 1);
    }, 44) },
    { tier: 3, name: "chameleon 2", make: () => picture(["green", "lime", "dkgreen", "brown", "ink"], P => {
      P.line("brown", 0, 37, 44, 33, 4);
      P.rell("dkgreen", 40.5, 29.5, 3.6, 1.6, -0.6); P.rell("dkgreen", 42, 37, 3, 1.4, 0.5); P.rell("dkgreen", 3, 40, 3, 1.3, -0.4);
      P.when("green", (x, y) => { const d = Math.hypot(x - 8, y - 30), a = Math.atan2(y - 30, x - 8); return d > 2 && d < 6.2 && !(a > -0.5 && a < 0.6); });
      P.line("green", 12.5, 26, 16, 24, 4.6);
      P.line("green", 16, 28, 14, 35, 3.6); P.line("green", 30, 28, 32.5, 34, 3.6);
      P.ell("green", 13.5, 35.2, 2, 1.2); P.ell("green", 33, 34, 2, 1.2);
      P.rell("green", 22, 22.5, 12, 8, -0.08);
      P.poly("green", [[30.5, 14.5], [41, 19], [43.5, 25], [35.5, 30], [30.5, 28]]);
      P.poly("green", [[29.5, 16.5], [33, 9.5], [36.5, 16.5]]);
      P.on("lime", "green", (x, y) => { const u = x + (y - 22) * 0.35; return (Math.abs(u - 17) < 1.4 || Math.abs(u - 24) < 1.4) && y > 15 && y < 29 && x < 30; });
      P.on("dkgreen", "green", (x, y) => y > 25.5 && x > 12 && x < 30 && fl(x) % 3 === 0 && fl(y) % 2 === 0);
      P.ell("lime", 36, 21, 3.4, 3.4);
      P.outline("ink");
      for (let bx = 12; bx < 30; bx += 2.5) P.poly("ink", [[bx - 1, 15.6 + Math.abs(bx - 21) * 0.08], [bx, 13.6 + Math.abs(bx - 21) * 0.08], [bx + 1, 15.6 + Math.abs(bx - 21) * 0.08]]);
      P.ell("ink", 36.5, 21, 1.2, 1.2);
      P.line("ink", 35.5, 26.5, 42.5, 24.5, 0.9);
    }, 44) },
    { tier: 3, name: "walrus 2", make: () => picture(["brown", "tan", "white", "sky", "ink"], P => {
      P.poly("white", [[1, 33.5], [43, 33.5], [41, 37], [3, 37]]);
      P.poly("sky", [[3, 37], [41, 37], [39, 43], [5, 43]]);
      P.poly("brown", [[8, 28], [1.5, 31], [2.5, 34], [9, 32]]);
      P.ell("brown", 19, 26, 13, 7.5);
      P.ell("brown", 30, 16.5, 7, 6.8);
      P.line("brown", 27, 20, 26, 26, 8);
      P.poly("brown", [[24, 30], [31, 33.5], [23, 33.5]]);
      P.on("tan", "brown", (x, y) => y > 29 && x > 9 && x < 24);
      P.ell("tan", 32, 20, 5, 3);
      P.poly("white", [[29.3, 22], [31.6, 22], [31, 31.5], [30, 31.5]]); P.poly("white", [[33, 22], [35.3, 22], [34.6, 31.5], [33.6, 31.5]]);
      P.outline("ink", true);
      for (const [dx, dy] of [[29, 19], [31, 18.5], [33, 18.5], [35, 19]]) P.rect("brown", dx, dy, dx + 1, dy + 1);
      P.rect("ink", 27, 13, 29, 15); P.rect("ink", 32, 13, 34, 15);
    }, 44) },
    { tier: 3, name: "beaver dam", make: () => picture(["sky", "dkgreen", "green", "blue", "white", "maroon", "tan", "brown", "dkgrey"], P => {
      P.all("sky"); P.ell("white", 9, 4, 5, 1.5); P.ell("white", 35, 3.5, 4, 1.3);
      for (let tx = -2; tx < 46; tx += 5) { const h = 7 + (tx * 7 % 5); P.poly("dkgreen", [[tx - 3.5, 17], [tx, h], [tx + 3.5, 17]]); }
      P.rect("green", 0, 16, 44, 19);
      P.rect("blue", 0, 19, 44, 44);
      P.when("white", (x, y) => y > 20 && y < 24 && fl(y) % 2 === 1 && (fl(x) * 3) % 11 < 2 && x < 18);
      const dam = (x, y) => y > 24.5 + Math.sin(x * 0.8) * 0.8 && y < 34;
      P.when("maroon", dam);
      for (const [a, b, c, d] of [[0, 27, 14, 25], [5, 31.5, 21, 27.5], [12, 26, 28, 29.5], [19, 33, 35, 27], [27, 26.5, 44, 30], [33, 33, 44, 26.5], [1, 33, 9, 29], [38, 26, 44, 27], [13, 31, 22, 33.5]]) P.on("tan", "maroon", (x, y) => { const dx = c - a, dy = d - b, t = Math.max(0, Math.min(1, ((x - a) * dx + (y - b) * dy) / (dx * dx + dy * dy))); return Math.hypot(x - a - t * dx, y - b - t * dy) < 0.85; });
      P.when("white", (x, y) => y > 34 && y < 35.5 && fl(x) % 3 !== 0);
      P.when("white", (x, y) => y > 38 && y < 39 && fl(x) % 7 < 3);
      P.when("white", (x, y) => y > 41 && y < 42 && (fl(x) + 3) % 8 < 3);
      P.rell("dkgrey", 19.5, 22, 6.2, 2.3, 0.3);
      P.ell("brown", 29.5, 19, 8, 5.6);
      P.ell("brown", 38.5, 15.5, 4.2, 3.8);
      P.ell("brown", 36.3, 11.8, 1.4, 1.4);
      P.ell("tan", 41.3, 16.8, 2.3, 1.9);
      P.rect("dkgrey", 39, 13.5, 40, 15); P.rect("dkgrey", 42.6, 15.5, 43.6, 16.5);
      P.line("tan", 31, 23.5, 43.5, 20.5, 1.7);
      P.ell("brown", 34.5, 22.3, 1.8, 1.4); P.ell("brown", 27.5, 24, 2.6, 1.2);
    }, 44) },
  );
})();
