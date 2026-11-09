// Sleep on it / Ants: food and drink. Objects with ink outlines and scenes with a background, at varied sizes.
"use strict";
{
  // rotated coordinates around (cx, cy): u along the angle a, v across it
  const rot = (x, y, cx, cy, a) => [(x - cx) * Math.cos(a) + (y - cy) * Math.sin(a), -(x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];
  // distance from a point to a triangle (0 inside)
  const triDist = (x, y, t) => {
    const seg = (ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay, s = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy))); return Math.hypot(x - ax - s * dx, y - ay - s * dy); };
    const [[ax, ay], [bx, by], [cx, cy]] = t;
    const s1 = (bx - ax) * (y - ay) - (by - ay) * (x - ax), s2 = (cx - bx) * (y - by) - (cy - by) * (x - bx), s3 = (ax - cx) * (y - cy) - (ay - cy) * (x - cx);
    if ((s1 >= 0 && s2 >= 0 && s3 >= 0) || (s1 <= 0 && s2 <= 0 && s3 <= 0)) return 0;
    return Math.min(seg(ax, ay, bx, by), seg(bx, by, cx, cy), seg(cx, cy, ax, ay));
  };
  // the same drawing API with every coordinate multiplied by s (draw on a small layout, paint on a bigger grid)
  const scaled = (P, s) => ({
    size: P.size, all: P.all, outline: P.outline,
    when: (k, f) => P.when(k, (x, y) => f(x / s, y / s)),
    on: (k, o, f) => P.on(k, o, (x, y) => f(x / s, y / s)),
    rect: (k, a, b, c, d) => P.rect(k, a * s, b * s, c * s, d * s),
    ell: (k, cx, cy, rx, ry) => P.ell(k, cx * s, cy * s, rx * s, ry * s),
    rell: (k, cx, cy, rx, ry, a) => P.rell(k, cx * s, cy * s, rx * s, ry * s, a),
    poly: (k, pts) => P.poly(k, pts.map(([x, y]) => [x * s, y * s])),
    line: (k, a, b, c, d, w) => P.line(k, a * s, b * s, c * s, d * s, w * s),
  });
  // a scene with ink lines between its colour areas, keeping the frame in the colours underneath
  const inkLines = (P, under) => {
    P.outline("ink", true);
    const S = P.size;
    for (const [k, f] of under) P.on(k, "ink", (x, y) => (x < 1 || y < 1 || x > S - 1 || y > S - 1) && f(x, y));
  };

  PICTURES.push(
    // ----- simple -----
    { tier: 1, name: "banana", make: () => picture(["yellow", "orange", "brown", "ink"], P => {
      const cx = 14, cy = 3, R = 13.5, D = (x, y) => Math.hypot(x - cx, y - cy);
      const T = (x, y) => (Math.atan2(y - cy, x - cx) - Math.PI / 2) / 1.08, W = t => 4.6 * (1 - t * t * 0.62);
      P.when("yellow", (x, y) => y > cy && Math.abs(T(x, y)) < 1 && Math.abs(D(x, y) - R) < W(T(x, y)));
      P.on("orange", "yellow", (x, y) => D(x, y) < R - W(T(x, y)) + 2.3);
      P.on("brown", ["yellow", "orange"], (x, y) => T(x, y) < -0.88 || T(x, y) > 0.9);
      P.line("brown", 25.8, 9, 25.6, 3.5, 2.8);
      P.outline("ink");
    }, 28) },
    { tier: 1, name: "lemon", make: () => picture(["yellow", "white", "green", "dkgreen", "ink"], P => {
      P.rell("dkgreen", 17.8, 4.6, 4.8, 2.3, -0.5); P.rell("green", 12.6, 4.4, 4.2, 2.2, 0.6);
      P.rell("yellow", 11.5, 14, 9, 6.5, -0.35);
      P.rell("yellow", 3.2, 17.2, 2, 1.7, -0.35); P.rell("yellow", 20, 11, 2, 1.7, -0.35);
      P.outline("ink", true);
      P.rell("white", 8.5, 12, 2.6, 1.1, -0.35);
    }, 24) },
    { tier: 1, name: "carrot", make: () => picture(["orange", "green", "dkgreen", "ink"], P => {
      P.rell("green", 10.5, 5, 1.9, 4.8, -0.5); P.rell("dkgreen", 14, 4, 1.9, 4.6, 0); P.rell("green", 17.5, 5, 1.9, 4.8, 0.5);
      P.poly("orange", [[8.5, 9.5], [19.5, 9.5], [15, 27], [13, 27]]); P.ell("orange", 14, 9.8, 5.6, 2.4);
      P.outline("ink", true);
      P.rect("ink", 10, 13, 13, 14); P.rect("ink", 15, 17, 18, 18); P.rect("ink", 12, 21, 14, 22);
    }, 28) },
    { tier: 1, name: "fried egg", make: () => picture(["white", "orange", "yellow", "ink"], P => {
      P.ell("white", 14, 15, 10.5, 7.5); P.ell("white", 9, 11, 6, 5.5); P.ell("white", 20, 19, 6, 5); P.ell("white", 19, 10, 5, 4.5);
      P.ell("orange", 15, 14, 4.8, 4.8); P.ell("yellow", 14.3, 13.3, 3.8, 3.8); P.rect("white", 12, 11, 14, 12);
      P.outline("ink");
    }, 28) },
    { tier: 1, name: "egg cup", make: () => picture(["lilac", "tan", "red", "white", "grey"], P0 => {
      const P = scaled(P0, 32 / 28);
      P.all("lilac"); P.rect("tan", 0, 23, 28, 28);
      P.ell("white", 13, 10.5, 5, 6.5);
      P.when("red", (x, y) => y >= 12 && ((x - 13) / 6.5) ** 2 + ((y - 12) / 6) ** 2 <= 1);
      P.rect("red", 11, 17, 15, 21); P.ell("red", 13, 22, 5, 1.6);
      P.on("white", "red", (x, y) => y > 12 && y < 17 && fl(x) % 3 === 1 && fl(y) % 3 === 0);
      P.line("grey", 19.5, 23, 24, 13, 1.3); P.rell("grey", 24.6, 11.4, 1.5, 2.4, 0.4);
    }, 32) },
    { tier: 1, name: "cookies", make: () => picture(["teal", "blue", "white", "tan", "brown"], P => {
      P.all("teal"); P.rect("blue", 0, 24, 32, 32);
      P.ell("white", 16, 25, 16, 6);
      const blob = (k, cx, cy, r) => P.when(k, (x, y) => Math.hypot(x - cx, y - cy) < r + 0.6 * Math.sin(7 * Math.atan2(y - cy, x - cx)));
      blob("brown", 20.5, 12, 9.5);
      for (const [a, b] of [[17, 6], [23, 5], [25, 11], [20, 12], [15, 10]]) P.rect("white", a, b, a + 2, b + 2);
      blob("tan", 11, 19.5, 9.5);
      for (const [a, b] of [[7, 15], [12, 13], [14, 20], [7, 21], [10, 24], [16, 16]]) P.rect("brown", a, b, a + 2, b + 2);
    }, 32) },
    { tier: 1, name: "donut", make: () => picture(["tan", "pink", "white", "sky", "ink"], P => {
      P.ell("tan", 16, 17, 13, 11);
      P.when("pink", (x, y) => Math.hypot(x - 16, (y - 16) * 1.18) < 10.5 + Math.sin(Math.atan2(y - 16, x - 16) * 7) * 0.9);
      P.on("tan", "pink", (x, y) => ((x - 16) / 5.6) ** 2 + ((y - 16.5) / 4.6) ** 2 <= 1);
      P.ell("none", 16, 16.5, 3.8, 3);
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6 + 0.25, sx = fl(16 + Math.cos(a) * 7.8), sy = fl(16 + Math.sin(a) * 6.4), k = i % 4 < 2 ? "white" : "sky";
        if (i % 2) P.rect(k, sx, sy, sx + 2, sy + 1); else P.rect(k, sx, sy, sx + 1, sy + 2);
      }
      P.outline("ink");
    }, 32) },
    { tier: 1, name: "grapes", make: () => picture(["mint", "maroon", "purple", "lilac", "brown", "green"], P0 => {
      const P = scaled(P0, 32 / 28);
      P.all("mint");
      P.line("brown", 14, 8, 16, 2, 1.8); P.rell("green", 20, 4.5, 4.5, 2.2, -0.4);
      const rows = [[9.5, [9.5, 14.5, 19.5]], [13.8, [7, 12, 17, 22]], [18.1, [9.5, 14.5, 19.5]], [22.4, [12, 17]], [26, [14.5]]];
      for (const [gy, xs] of rows) for (const gx of xs) {
        P.ell("maroon", gx, gy, 2.9, 2.9); P.ell("purple", gx - 0.3, gy - 0.3, 2.2, 2.2); P.ell("lilac", gx - 1.1, gy - 1.1, 0.75, 0.75);
      }
    }, 32) },
    { tier: 1, name: "pea pod", make: () => picture(["green", "lime", "dkgreen", "ink"], P => {
      const a = -0.18, cx = 16, cy = 16.5;
      P.rell("dkgreen", cx, cy, 14.5, 7, a);
      for (const t of [-9, -3, 3, 9]) P.ell("lime", cx + t * Math.cos(a) + 0.5 * Math.sin(a), cy - 0.5 + t * Math.sin(a), 2.8, 2.8);
      P.when("green", (x, y) => { const [u, v] = rot(x, y, cx, cy, a); return (u / 14.5) ** 2 + (v / 7) ** 2 <= 1 && v > 2.2 + (u / 14.5) ** 2 * 2; });
      P.line("green", 2.5, 21.5, 1.2, 26, 2.2);
      P.outline("ink", true);
    }, 32) },
    { tier: 1, name: "aubergine", make: () => picture(["purple", "lilac", "green", "ink"], P => {
      P.ell("purple", 16.5, 18, 7.5, 7.5); P.ell("purple", 10.5, 10, 4, 4); P.rell("purple", 13.2, 14, 4.6, 8, -0.75);
      P.rell("lilac", 19.2, 15, 1.7, 4, 0.75);
      P.poly("green", [[4.5, 7.5], [9, 4.5], [13.5, 7], [12.5, 11.5], [9.5, 9.5], [6, 11.5]]);
      P.line("green", 7.5, 6, 4.5, 2, 2.2);
      P.outline("ink", true);
    }, 28) },
    { tier: 1, name: "tomato", make: () => picture(["red", "green", "white", "ink"], P => {
      P.ell("red", 8.5, 14, 5.8, 7); P.ell("red", 15.5, 14, 5.8, 7); P.ell("red", 12, 14.5, 7.5, 7.5);
      const star = [];
      for (let i = 0; i < 10; i++) { const r = i % 2 ? 1.6 : 5, a = -Math.PI / 2 + i * Math.PI / 5; star.push([12 + Math.cos(a) * r, 8.5 + Math.sin(a) * r * 0.7]); }
      P.poly("green", star); P.rect("green", 11, 2.5, 13, 8);
      P.outline("ink");
      P.rell("white", 7, 13, 1.4, 2.6, 0.4);
    }, 24) },
    { tier: 1, name: "avocado", make: () => picture(["dkgreen", "green", "lime", "brown", "ink"], P => {
      const shape = (k, d) => { P.ell(k, 14, 17.5, 9.5 - d, 9.5 - d); P.ell(k, 14, 9, 6.2 - d, 6.8 - d); };
      shape("dkgreen", 0); shape("green", 2.2); shape("lime", 3.5);
      P.ell("brown", 14, 18, 3.6, 3.6);
      P.outline("ink");
    }, 28) },
    { tier: 1, name: "milk bottle", make: () => picture(["teal", "tan", "white", "blue", "grey"], P0 => {
      const P = scaled(P0, 32 / 28);
      P.all("teal"); P.rect("tan", 0, 24, 28, 28);
      P.rect("white", 7, 11, 17, 25); P.ell("white", 12, 11.5, 5, 3.5); P.rect("white", 9.5, 4, 14.5, 11); P.rect("blue", 9, 2, 15, 5);
      P.rect("blue", 7, 15, 17, 19);
      P.rect("white", 19, 17, 25, 25); P.rect("grey", 19, 13.5, 25, 17); P.rect("grey", 19, 25, 25, 26);
    }, 32) },
    { tier: 1, name: "kiwi slice", make: () => picture(["brown", "green", "lime", "white", "ink"], P => {
      P.ell("brown", 14, 14.5, 12.5, 12); P.ell("green", 14, 13.8, 10.8, 10.5); P.ell("lime", 14, 13.8, 6.5, 6.3);
      P.on("lime", "green", (x, y) => Math.abs(Math.sin(6 * Math.atan2(y - 13.8, x - 14))) < 0.13);
      P.ell("white", 14, 13.8, 3, 3);
      P.outline("ink");
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; P.rect("ink", fl(14 + Math.cos(a) * 5.2), fl(13.8 + Math.sin(a) * 5.2), fl(14 + Math.cos(a) * 5.2) + 1, fl(13.8 + Math.sin(a) * 5.2) + 1); }
    }, 28) },
    { tier: 1, name: "peach", make: () => picture(["peach", "orange", "green", "ink"], P => {
      P.rell("green", 16.5, 4.8, 4.2, 2, -0.4);
      P.ell("peach", 9.5, 14.5, 7, 7.8); P.ell("peach", 14.5, 14.5, 7, 7.8);
      P.on("orange", "peach", (x, y) => ((x - 16.5) / 5.5) ** 2 + ((y - 14.5) / 7) ** 2 <= 1);
      P.outline("ink");
      P.on("ink", ["peach", "orange"], (x, y) => y > 8 && y < 18 && Math.abs(x - (11.5 + Math.sin((y - 7) * 0.25) * 1.2)) < 0.5);
      P.rect("ink", 11, 2, 13, 7);
    }, 24) },
    { tier: 1, name: "flan", make: () => picture(["lilac", "white", "yellow", "brown", "red"], P0 => {
      const P = scaled(P0, 32 / 28);
      P.all("lilac"); P.ell("white", 14, 23.5, 14, 3.5);
      P.poly("yellow", [[7, 22], [21, 22], [19, 11], [9, 11]]); P.ell("yellow", 14, 22, 7, 1.8);
      P.ell("brown", 14, 11, 5.2, 1.8); P.rect("brown", 9, 11, 19, 13);
      P.rect("brown", 10, 13, 11, 15); P.rect("brown", 13, 13, 14, 16); P.rect("brown", 17, 13, 18, 14);
      P.ell("red", 14, 8, 2.3, 2.3);
    }, 32) },
    { tier: 1, name: "rice ball", make: () => picture(["white", "grey", "dkgreen", "ink"], P => {
      const t = [[12, 5.5], [18.5, 17], [5.5, 17]];
      P.when("white", (x, y) => triDist(x, y, t) < 3.3);
      P.on("grey", "white", (x, y) => (fl(x) * 7 + fl(y) * 3) % 11 === 0 && y < 15);
      P.on("dkgreen", ["white", "grey"], (x, y) => x > 8 && x < 16 && y > 13.5);
      P.outline("ink");
    }, 24) },
    { tier: 1, name: "baguette", make: () => picture(["sky", "brown", "red", "white", "gold"], P => {
      P.all("sky"); P.rect("brown", 0, 14, 32, 32);
      P.rect("red", 3, 19, 29, 32);
      const a = -0.5;
      P.rell("gold", 16, 18, 15, 3.8, a);
      for (const t of [-8, -3, 2, 7]) P.rell("white", 16 + t * Math.cos(a), 18 + t * Math.sin(a), 2.4, 0.75, a + 0.8);
    }, 32) },

    // ----- medium -----
    { tier: 2, name: "croissant", make: () => picture(["orange", "tan", "brown", "ink"], P => {
      const cx = 18, cy = 31, R = 12.5, N = 3.4;
      const cols = ["brown", "orange", "tan", "orange", "tan", "orange", "brown"];
      P.when("orange", (x, y) => {
        const t = (Math.atan2(y - cy, x - cx) + Math.PI / 2) / 1.5;
        if (Math.abs(t) > 1) return false;
        const b = t * N, w = 7 * (1 - 0.72 * t * t) * (0.86 + 0.14 * Math.cos(2 * Math.PI * (b - Math.round(b))));
        return Math.abs(Math.hypot(x - cx, y - cy) - R) < w;
      });
      for (let i = -3; i <= 3; i++) P.on(cols[i + 3], "orange", (x, y) => Math.round((Math.atan2(y - cy, x - cx) + Math.PI / 2) / 1.5 * N) === i);
      P.outline("ink", true);
    }, 36) },
    { tier: 2, name: "cheese wedge", make: () => picture(["yellow", "orange", "brown", "ink"], P => {
      const h = 11;
      P.poly("yellow", [[2, 14], [19, 21], [30, 11]]);
      P.poly("yellow", [[2, 14], [19, 21], [19, 21 + h], [2, 14 + h]]);
      P.poly("orange", [[19, 21], [30, 11], [30, 11 + h], [19, 21 + h]]);
      for (const [hx, hy, rx, ry] of [[8, 20.5, 2, 1.8], [14, 26, 2.5, 2.2], [17, 15.5, 2.4, 1.3]]) P.ell("orange", hx, hy, rx, ry);
      for (const [hx, hy, r] of [[24, 22, 2.4], [27.5, 15.5, 1.9]]) P.ell("brown", hx, hy, r * 0.8, r);
      P.outline("ink");
      P.line("ink", 2, 14, 19, 21, 1); P.line("ink", 19, 21, 30, 11, 1); P.rect("ink", 19, 21, 20, 32);
    }, 32) },
    { tier: 2, name: "pancakes", make: () => picture(["lilac", "white", "orange", "tan", "brown", "yellow"], P => {
      P.all("lilac"); P.ell("white", 18, 32, 19, 4.5);
      for (let k = 0; k < 4; k++) { const yk = 28.5 - k * 4; P.ell("orange", 18, yk, 15, 3); P.ell("tan", 18, yk - 1.8, 14.5, 2.3); }
      P.ell("brown", 18, 14.6, 12, 2);
      P.rect("brown", 4, 14.5, 6, 21); P.rect("brown", 30, 14.5, 32, 24);
      P.rect("yellow", 15, 10.5, 21, 14.5);
    }, 36) },
    { tier: 2, name: "pizza slice", make: () => picture(["orange", "yellow", "red", "green", "ink"], P => {
      P.poly("yellow", [[5, 9], [31, 9], [18, 33]]);
      P.rell("orange", 18, 8, 14.2, 3.4, 0);
      for (const [px, py, r] of [[12.5, 14.5, 2.9], [22.5, 14, 2.9], [18, 21.5, 2.7], [17.5, 28, 1.8]]) P.ell("red", px, py, r, r);
      for (const [bx, by, a] of [[18.5, 15, 0.5], [13, 21, -0.5], [22.5, 19.5, 0.3]]) P.rell("green", bx, by, 2.4, 1.4, a);
      P.outline("ink", true);
    }, 36) },
    { tier: 2, name: "burger", make: () => picture(["orange", "white", "green", "red", "yellow", "brown", "ink"], P => {
      P.when("orange", (x, y) => y >= 27 && y < 32 && Math.abs(x - 18) < 13 - Math.max(0, y - 30) * 2);
      P.when("brown", (x, y) => y >= 23 && y < 28 && Math.abs(x - 18) < 14 - (y < 24 || y > 27 ? 0.7 : 0));
      P.rect("yellow", 4.5, 21, 31.5, 23.5); P.poly("yellow", [[7, 23], [12, 23], [9.5, 26.5]]); P.poly("yellow", [[23, 23], [28, 23], [25.5, 26.5]]);
      P.rect("red", 6, 18.5, 30, 21);
      P.when("green", (x, y) => y > 15.5 && y < 18.8 + Math.sin(x * 1.3) * 0.9 && x > 3 && x < 33);
      P.when("orange", (x, y) => ((x - 18) / 13.5) ** 2 + ((y - 16.5) / 11) ** 2 <= 1 && y < 16.5);
      P.outline("ink", true);
      for (const [sx, sy] of [[12, 9], [17, 7.5], [22, 9], [14.5, 12], [20, 12], [9, 12.5], [26, 12.5]]) P.rect("white", sx, sy, sx + 2, sy + 1);
    }, 36) },
    { tier: 2, name: "sandwich", make: () => picture(["tan", "white", "green", "pink", "yellow", "ink"], P => {
      P.poly("tan", [[3, 14], [29, 14], [21, 4]]);
      P.when("white", (x, y) => triDist(x, y, [[6.5, 13.5], [25.5, 13.5], [21, 7]]) < 0.6);
      P.rect("white", 3, 14, 29, 17.5);
      P.when("green", (x, y) => x > 2 && x < 30 && y >= 17.5 && y < 19.6 + Math.sin(x * 1.4) * 0.7);
      P.rect("pink", 3, 19.5, 29, 21.5); P.ell("pink", 3, 20.5, 1.6, 1); P.ell("pink", 29, 20.5, 1.6, 1);
      P.rect("yellow", 3, 21.5, 29, 23); P.poly("yellow", [[25, 23], [30.5, 22], [30, 26]]);
      P.rect("white", 3, 23, 29, 26.5);
      P.rect("tan", 3, 14, 5, 17.5); P.rect("tan", 27, 14, 29, 17.5); P.rect("tan", 3, 23, 5, 27); P.rect("tan", 27, 23, 29, 27); P.rect("tan", 3, 25.5, 29, 27.5);
      P.outline("ink");
      P.line("ink", 3, 14, 29, 14, 1);
    }, 32) },
    { tier: 2, name: "honey jar", make: () => picture(["lilac", "purple", "gold", "white", "red", "brown"], P => {
      P.all("lilac"); P.rect("purple", 0, 26, 32, 32);
      P.when("gold", (x, y) => y > 9 && y < 28 && Math.abs(x - 15) < 8 - (y > 26 ? (y - 26) * 1.5 : 0) - (y < 12 ? (12 - y) * 0.8 : 0));
      P.poly("red", [[5.5, 11], [24.5, 11], [22, 5], [8, 5]]);
      P.on("white", "red", (x, y) => (fl(x / 2) + fl(y / 2)) % 2 === 0);
      P.rect("brown", 8, 9, 22, 10.5);
      P.rell("white", 10.5, 19, 1.1, 4.5, 0);
      P.line("brown", 24, 26, 30, 20, 1.6); P.rell("brown", 22, 27.5, 3, 2, -0.6);
    }, 32) },
    { tier: 2, name: "jam jar", make: () => picture(["mint", "tan", "red", "maroon", "white", "blue"], P => {
      P.all("mint"); P.rect("tan", 0, 26, 32, 32);
      P.when("red", (x, y) => y > 10 && y < 28 && Math.abs(x - 15) < 8.5 - (y > 26 ? (y - 26) * 1.5 : 0));
      P.on("maroon", "red", (x, y) => x > 20.5 || y > 25);
      P.rect("white", 9, 15, 21, 22); P.ell("red", 15, 18.5, 2.2, 2.2);
      P.poly("blue", [[5, 11], [25, 11], [23, 5], [7, 5]]);
      P.on("white", "blue", (x, y) => (fl(x / 2) + fl(y / 2)) % 2 === 0);
      P.rect("maroon", 7, 9, 23, 10.5);
    }, 32) },
    { tier: 2, name: "lemonade", make: () => picture(["teal", "white", "yellow", "cyan", "red", "green"], P => {
      P.all("teal"); P.rect("white", 0, 33, 36, 36);
      P.line("red", 21, 22, 27, 2, 2);
      P.on("white", "red", (x, y) => fl(y) % 4 < 2);
      P.poly("white", [[8, 10], [27, 10], [25, 33], [10, 33]]);
      P.poly("teal", [[9.5, 11], [25.5, 11], [25.2, 13.5], [9.7, 13.5]]);
      P.poly("yellow", [[9.7, 13.5], [25.2, 13.5], [23.5, 31.5], [11.5, 31.5]]);
      P.rect("cyan", 12, 15, 16, 19); P.rect("cyan", 18, 17, 22, 21); P.rect("cyan", 14, 22, 18, 26);
      P.on("red", ["yellow", "cyan", "teal"], (x, y) => { const t = (y - 2) / 20, sx = 27 - 6 * t; return y < 22 && Math.abs(x - sx) < 1; });
      P.ell("yellow", 9.5, 10, 5, 5); P.ell("white", 9.5, 10, 3.9, 3.9); P.ell("yellow", 9.5, 10, 3.1, 3.1);
      P.on("white", "yellow", (x, y) => Math.hypot(x - 9.5, y - 10) < 3.2 && (Math.abs(x - 9.5) < 0.5 || Math.abs(y - 10) < 0.5));
      P.rell("green", 14, 6, 3, 1.4, -0.6); P.rell("green", 16.5, 7.5, 2.6, 1.3, 0.3);
    }, 36) },
    { tier: 2, name: "coffee pot", make: () => picture(["peach", "grey", "dkgrey", "white", "brown", "red"], P => {
      P.all("peach"); P.rect("brown", 0, 32, 36, 36);
      for (const sx of [6, 10]) P.when("white", (x, y) => y > 0.5 && y < 6.5 && Math.abs(x - (sx + Math.sin(y * 1.1) * 1)) < 0.6);
      P.poly("dkgrey", [[22.5, 10], [28.5, 11], [27.5, 21], [24.5, 21], [25.5, 13], [22, 13]]);
      P.poly("grey", [[10, 22], [22, 22], [24, 32], [8, 32]]);
      P.rect("dkgrey", 11, 19, 21, 22);
      P.poly("grey", [[9, 9], [23, 9], [21, 19], [11, 19]]);
      P.poly("grey", [[9, 9.5], [23, 9.5], [20, 6], [12, 6]]); P.poly("grey", [[9.5, 10], [4.5, 7], [5, 10], [10, 13]]);
      P.rect("dkgrey", 15, 3, 17, 6); P.ell("dkgrey", 16, 3.5, 1.8, 1.2);
      P.rect("red", 27, 26, 33, 32); P.when("red", (x, y) => { const d = Math.hypot(x - 33, y - 29); return x > 33 && d > 1 && d < 2.4; });
      P.rect("brown", 27.5, 26, 32.5, 27);
    }, 36) },
    { tier: 2, name: "noodle bowl", make: () => picture(["lilac", "red", "white", "yellow", "tan", "brown", "green", "orange"], P => {
      P.all("lilac");
      for (const sx of [5, 9]) P.when("white", (x, y) => y > 4 && y < 13 && Math.abs(x - (sx + Math.sin(y * 0.9) * 1)) < 0.6);
      P.when("red", (x, y) => y >= 18 && ((x - 18) / 17) ** 2 + ((y - 18) / 13) ** 2 <= 1);
      P.rect("red", 12, 29, 24, 33);
      P.on("white", "red", (x, y) => y > 22 + Math.sin(x * 0.8) * 0.8 && y < 23.8 + Math.sin(x * 0.8) * 0.8);
      P.ell("tan", 18, 18, 16.5, 4);
      P.ell("yellow", 18, 17.6, 13.5, 2.8);
      P.ell("white", 10, 17, 4, 2.8); P.ell("orange", 10, 17, 2, 1.5);
      for (const [gx, gy] of [[25, 17], [21.5, 18.5], [15, 18.5], [28, 18.5]]) P.rell("green", gx, gy, 1.5, 0.9, 0.3);
      P.when("yellow", (x, y) => y > 8 && y < 17 && (Math.abs(x - (19.5 + Math.sin(y) * 0.6)) < 0.6 || Math.abs(x - (21.8 + Math.sin(y + 1) * 0.6)) < 0.6));
      P.line("brown", 13, 2, 23, 10, 1.5); P.line("brown", 16, 1, 25, 9, 1.5);
    }, 36) },
    { tier: 2, name: "cake slice", make: () => picture(["white", "tan", "pink", "red", "ink"], P => {
      const h = 13, A = [2, 15], C = [23, 21], B = [34, 11];
      const v = (x, y) => y - (A[1] + (x - A[0]) * (C[1] - A[1]) / (C[0] - A[0]));
      P.poly("white", [A, C, B]);
      P.poly("pink", [C, B, [B[0], B[1] + h], [C[0], C[1] + h]]);
      P.poly("tan", [A, C, [C[0], C[1] + h], [A[0], A[1] + h]]);
      P.on("white", "tan", (x, y) => v(x, y) < 2);
      P.on("pink", "tan", (x, y) => v(x, y) > 5.2 && v(x, y) < 7.6);
      P.ell("white", 22, 14.5, 3.4, 1.8); P.ell("red", 22, 12.5, 2.8, 2.4);
      P.outline("ink");
      P.line("ink", A[0], A[1], C[0], C[1], 1); P.line("ink", C[0] + 0.5, C[1], C[0] + 0.5, C[1] + h, 1);
    }, 36) },
    { tier: 2, name: "pineapple", make: () => picture(["yellow", "orange", "green", "dkgreen", "ink"], P => {
      P.rell("dkgreen", 11.5, 12, 1.6, 5, -0.9); P.rell("dkgreen", 24.5, 12, 1.6, 5, 0.9);
      P.rell("green", 14.5, 9.5, 1.7, 6, -0.45); P.rell("green", 21.5, 9.5, 1.7, 6, 0.45);
      P.rell("dkgreen", 18, 8, 1.9, 7, 0);
      P.ell("yellow", 18, 24, 8.5, 10.5);
      P.on("orange", "yellow", (x, y) => (fl(x) + fl(y)) % 5 === 0 || (fl(x) - fl(y) + 100) % 5 === 0);
      P.outline("ink");
    }, 36) },
    { tier: 2, name: "broccoli", make: () => picture(["green", "dkgreen", "lime", "ink"], P => {
      P.poly("lime", [[13, 16], [19, 16], [20, 29], [12, 29]]);
      P.line("lime", 14.5, 21, 9, 15, 2.6); P.line("lime", 17.5, 21, 23, 15, 2.6);
      for (const [cx, cy, r] of [[9, 13, 5], [16, 9, 6], [23, 13, 5], [12, 16, 3.8], [20, 16, 3.8], [16, 14.5, 4.5]]) P.ell("green", cx, cy, r, r);
      P.on("dkgreen", "green", (x, y) => Math.sin(x * 1.6) * Math.sin(y * 1.6) > 0.55);
      P.outline("ink");
    }, 32) },
    { tier: 2, name: "radishes", make: () => picture(["red", "white", "green", "dkgreen", "ink"], P => {
      P.line("dkgreen", 11, 15, 10, 8, 1.6); P.line("dkgreen", 21, 17, 22, 9, 1.6);
      P.rell("green", 7, 6.5, 2.6, 5, -0.5); P.rell("dkgreen", 13, 5.5, 2.6, 5, 0.2); P.rell("green", 19.5, 6.5, 2.6, 5, -0.2); P.rell("dkgreen", 25.5, 8.5, 2.4, 4.8, 0.7);
      P.poly("white", [[9, 23], [13, 23], [11, 30.5]]); P.poly("white", [[19, 25], [23, 25], [21, 31.5]]);
      P.ell("red", 11, 19.5, 5.5, 5.2); P.ell("red", 21, 21.5, 5.5, 5.2);
      P.on("white", "red", (x, y) => (y > 23 && x < 16) || y > 25);
      P.outline("ink", true);
    }, 32) },
    { tier: 2, name: "bread loaf", make: () => picture(["gold", "brown", "white", "ink"], P => {
      const S = (k, ox, oy, d) => { P.rect(k, 5 + ox + d, 15 + oy, 19 + ox - d, 27 + oy - d); P.ell(k, 12 + ox, 15 + oy, 8 - d, 6 - d); };
      for (let t = 0; t <= 1.001; t += 0.05) S("gold", t * 9, -t * 5, 0);
      S("brown", 0, 0, 0); S("white", 0, 0, 1.4);
      for (const [x0, y0] of [[15, 8], [18.5, 6], [22, 4]]) P.line("white", x0, y0 + 2.5, x0 + 3, y0, 1.1);
      P.outline("ink");
    }, 32) },
    { tier: 2, name: "cupcake", make: () => picture(["mint", "lilac", "purple", "pink", "white", "red", "ink"], P => {
      P.all("mint");
      P.poly("lilac", [[8, 20], [24, 20], [22, 30], [10, 30]]);
      P.ell("pink", 16, 19.5, 9.5, 3); P.ell("white", 16, 16.3, 8, 3); P.ell("pink", 16, 13.1, 6.2, 2.8); P.ell("white", 16, 10.2, 3.8, 2.2);
      P.ell("red", 16, 6.2, 2.9, 2.9);
      inkLines(P, [["mint", () => true]]);
      P.on("purple", "lilac", x => fl(x) % 3 === 1);
      P.line("ink", 16.5, 3.5, 18.5, 0.5, 0.9);
    }, 32) },
    { tier: 2, name: "corn cob", make: () => picture(["yellow", "orange", "green", "dkgreen", "ink"], P => {
      P.ell("yellow", 18, 15, 7, 13);
      P.on("orange", "yellow", (x, y) => fl(y) % 3 === 0 || (fl(x) + (fl(y / 3) % 2) * 2) % 4 === 0);
      P.poly("dkgreen", [[18, 35], [15, 24], [18, 19], [21, 24]]);
      P.poly("green", [[18, 35], [7.5, 22], [8.5, 15], [13, 22], [17, 30]]);
      P.poly("green", [[18, 35], [28.5, 22], [27.5, 15], [23, 22], [19, 30]]);
      P.outline("ink");
      P.line("ink", 18, 34, 13, 22.5, 1); P.line("ink", 18, 34, 23, 22.5, 1);
    }, 36) },
    { tier: 2, name: "milkshake", make: () => picture(["mint", "tan", "pink", "white", "red", "grey"], P => {
      P.all("mint"); P.rect("tan", 0, 32, 36, 36);
      P.line("red", 21, 12, 27, 1, 1.8); P.on("white", "red", (x, y) => fl(y) % 4 < 2);
      P.poly("pink", [[10, 12], [26, 12], [22, 28], [14, 28]]);
      P.rect("grey", 16, 28, 20, 31); P.ell("grey", 18, 32, 5, 1.5);
      P.ell("white", 18, 11, 8.5, 3); P.ell("white", 18, 8.5, 6, 2.5); P.ell("white", 18, 6, 3.5, 2);
      P.ell("red", 18, 3.3, 2, 2);
    }, 36) },
    { tier: 2, name: "soup bowl", make: () => picture(["sky", "brown", "white", "blue", "orange", "green", "grey"], P => {
      P.all("sky"); P.rect("brown", 0, 24, 32, 32);
      for (const sx of [11, 16, 21]) P.when("white", (x, y) => y > 2 && y < 10 && Math.abs(x - (sx + Math.sin(y * 0.9) * 1)) < 0.6);
      P.line("grey", 21, 13, 28, 4, 1.6); P.ell("grey", 28.5, 3.5, 1.2, 1.2);
      P.when("white", (x, y) => y >= 14 && ((x - 16) / 13) ** 2 + ((y - 14) / 10) ** 2 <= 1);
      P.rect("white", 11, 23, 21, 26);
      P.on("blue", "white", (x, y) => y > 17.5 && y < 19.5);
      P.ell("orange", 16, 14, 12, 2.6);
      P.rell("green", 18.5, 13.5, 1.8, 0.9, -0.4); P.rell("green", 9.5, 14.3, 1.8, 0.9, 0.4); P.rell("green", 22, 15, 1.6, 0.8, 0.2);
    }, 32) },

    // ----- complex -----
    { tier: 3, name: "birthday cake", make: () => picture(["navy", "lilac", "white", "pink", "mint", "red", "yellow", "orange"], P => {
      P.all("navy"); P.rect("lilac", 0, 33, 40, 40);
      for (const [sx, sy] of [[4, 4], [34, 6], [8, 14], [31, 15], [36, 25], [3, 24]]) P.rect("white", sx, sy, sx + 1, sy + 1);
      P.ell("white", 20, 33, 18, 2.6);
      P.rect("pink", 6, 22, 34, 32); P.ell("pink", 20, 32, 14, 1.5);
      P.when("white", (x, y) => x >= 6 && x < 34 && y >= 21 && y < 23.5 + Math.max(0, Math.sin(x * 1.1)) * 2.5);
      for (let i = 0; i < 6; i++) P.ell("red", 8.5 + i * 4.6, 28.5, 1.4, 1.4);
      P.rect("mint", 11, 14, 29, 22);
      P.when("white", (x, y) => x >= 11 && x < 29 && y >= 13 && y < 15.5 + Math.max(0, Math.sin(x * 1.2 + 1)) * 2.2);
      for (const cx of [14, 19.5, 25]) { P.rect("yellow", cx - 1, 6, cx + 1, 13); P.ell("orange", cx, 3.8, 1.3, 2.1); }
    }, 40) },
    { tier: 3, name: "picnic basket", make: () => picture(["sky", "green", "dkgreen", "red", "white", "tan", "brown", "yellow"], P => {
      P.all("sky"); P.ell("yellow", 37, 6, 3.5, 3.5);
      P.ell("dkgreen", 6, 18, 9, 5); P.ell("dkgreen", 34, 17, 11, 6);
      P.rect("green", 0, 18, 44, 44);
      P.poly("red", [[2, 42], [42, 42], [35, 25], [9, 25]]);
      P.on("white", "red", (x, y) => (fl(x / 3) + fl(y / 3)) % 2 === 0);
      P.when("brown", (x, y) => { const d = Math.hypot(x - 22, y - 26); return y < 26 && d > 7 && d < 8.8; });
      P.poly("dkgreen", [[26, 20], [29, 20], [29, 25], [26, 25]]); P.rect("dkgreen", 26.8, 16, 28.2, 20);
      P.poly("tan", [[12.5, 27], [31.5, 27], [29.5, 38], [14.5, 38]]);
      P.on("brown", "tan", (x, y) => fl(y) % 3 === 0 || (fl(x) + (fl(y / 3) % 2) * 2) % 4 === 0);
      P.rect("brown", 11.5, 25, 32.5, 27.5);
    }, 44) },
    { tier: 3, name: "market stall", make: () => picture(["sky", "red", "white", "brown", "tan", "orange", "green", "yellow", "purple"], P => {
      P.all("sky"); P.rect("tan", 0, 44, 48, 48);
      P.rect("brown", 3, 14, 6, 45); P.rect("brown", 42, 14, 45, 45);
      const stripe = x => (fl(x / 4) % 2 ? "white" : "red");
      P.poly("red", [[2, 8], [46, 8], [42, 2], [6, 2]]);
      P.on("white", "red", x => fl(x / 4) % 2 === 1);
      P.rect("red", 2, 8, 46, 14); P.on("white", "red", (x, y) => y >= 8 && fl(x / 4) % 2 === 1);
      for (let sx = 2; sx < 46; sx += 4) P.when(stripe(sx), (x, y) => y >= 14 && Math.hypot(x - (sx + 2), y - 14) < 2);
      P.rect("brown", 3, 30, 45, 33);
      P.rect("tan", 5, 33, 43, 44); P.on("brown", "tan", x => fl(x) % 6 === 4);
      const heap = (k, x0) => {
        for (const [dx, dy] of [[1.8, 26.5], [5.3, 26.5], [8.8, 26.5], [3.5, 23.5], [7, 23.5], [5.3, 20.7]]) P.ell(k, x0 + dx, dy, 2, 2);
      };
      heap("orange", 6); heap("green", 15.5); heap("purple", 25); heap("yellow", 34.5);
      for (const x0 of [6, 15.5, 25, 34.5]) { P.rect("tan", x0, 26, x0 + 10.5, 30); P.rect("brown", x0, 28, x0 + 10.5, 29); }
    }, 48) },
    { tier: 3, name: "kitchen table", make: () => picture(["peach", "sky", "white", "brown", "grey", "blue", "gold", "red", "green"], P => {
      P.all("peach"); P.rect("grey", 0, 42, 48, 48);
      P.rect("white", 26, 4, 44, 21); P.rect("sky", 27.5, 5.5, 42.5, 19.5); P.rect("white", 34.5, 5, 36, 20); P.rect("white", 27, 12, 43, 13);
      P.rect("red", 30, 15, 34, 20); P.ell("green", 32, 13, 3.6, 2.6); P.ell("green", 30, 11, 1.8, 2.2); P.ell("green", 34, 10.5, 1.8, 2.4);
      P.rect("brown", 2, 13, 22, 15);
      P.rect("blue", 4, 7, 9, 13); P.rect("white", 11, 8, 15, 13); P.rect("red", 17, 9, 21, 13);
      P.rect("brown", 2, 32, 46, 35); P.rect("brown", 4, 35, 44, 37); P.rect("brown", 5, 37, 8, 48); P.rect("brown", 40, 37, 43, 48);
      P.poly("white", [[7, 32], [14, 32], [15, 24], [13, 20], [8, 20], [6, 24]]);
      P.poly("white", [[12, 21], [16.5, 19], [14, 23]]);
      P.when("white", (x, y) => { const d = Math.hypot(x - 6, y - 25.5); return x < 6.5 && d > 1.5 && d < 3; });
      P.rect("blue", 6, 26, 15, 27.5);
      P.ell("gold", 23, 30, 6.5, 4.5); P.rect("gold", 16.5, 30, 29.5, 32);
      for (const sx of [19.5, 23, 26.5]) P.line("white", sx - 1, 29, sx + 1, 27, 1);
      P.ell("red", 34, 25.5, 2.6, 2.6); P.ell("red", 38.5, 24.5, 2.8, 2.8); P.ell("red", 42.5, 26, 2.5, 2.5);
      P.rell("green", 40, 21, 1.7, 0.9, -0.5);
      P.when("blue", (x, y) => y >= 27 && ((x - 38.5) / 7.5) ** 2 + ((y - 27) / 5) ** 2 <= 1);
    }, 48) },
    { tier: 3, name: "fruit bowl", make: () => picture(["sky", "brown", "white", "blue", "yellow", "orange", "red", "purple", "green"], P => {
      P.all("sky"); P.rect("brown", 0, 36, 44, 44);
      P.when("yellow", (x, y) => { const d = Math.hypot(x - 22, y - 30); return d > 14 && d < 17.5 && y < 22 && Math.abs(x - 22) < 12; });
      P.rell("green", 11, 15, 3, 1.4, -0.6);
      for (const [gx, gy] of [[8, 19], [12, 18.5], [6, 22.5], [10, 22.5], [14, 22], [8, 26], [12, 26]]) P.ell("purple", gx, gy, 2, 2);
      P.ell("orange", 20, 22, 5, 5); P.ell("orange", 28.5, 23, 4.8, 4.8);
      P.ell("red", 36, 23, 4.4, 4.4); P.rect("brown", 35.5, 16, 37, 19.5); P.rell("green", 39, 17.5, 2.4, 1.2, -0.3);
      P.when("white", (x, y) => y >= 26 && ((x - 22) / 17) ** 2 + ((y - 26) / 11) ** 2 <= 1);
      P.rect("white", 16, 36, 28, 39);
      P.on("blue", "white", (x, y) => y > 29.5 && y < 32);
    }, 44) },
    { tier: 3, name: "breakfast plate", make: () => picture(["blue", "sky", "white", "yellow", "pink", "red", "tan", "brown", "ink"], P => {
      P.ell("blue", 22, 22, 20.5, 20.5); P.ell("sky", 22, 22, 16.5, 16.5);
      P.ell("white", 15, 15, 6.5, 5.5); P.ell("white", 11, 12, 4, 3.5); P.ell("white", 18, 18.5, 4, 3); P.ell("yellow", 15, 14.5, 3, 3);
      for (const by of [11, 17]) {
        const V = (x, y) => y - by - Math.sin(x * 0.75) * 1.1;
        P.when("pink", (x, y) => x > 23 && x < 37 && Math.abs(V(x, y)) < 2);
        P.on("red", "pink", (x, y) => Math.abs(V(x, y)) < 0.6);
      }
      P.rect("brown", 8, 24, 20, 35); P.ell("brown", 11, 24.5, 3, 2); P.ell("brown", 17, 24.5, 3, 2);
      P.rect("tan", 9.5, 25.5, 18.5, 33.5); P.ell("tan", 11, 25.5, 1.8, 1); P.ell("tan", 17, 25.5, 1.8, 1);
      P.rell("brown", 28, 28, 6, 2.3, 0.5); P.rell("brown", 33, 24.5, 5.5, 2.2, 0.5);
      P.ell("red", 25, 35, 3.2, 2.8);
      P.outline("ink");
      P.on("ink", ["blue", "sky"], (x, y) => { const d = Math.hypot(x - 22, y - 22); return d > 16 && d < 17; });
    }, 44) },
    { tier: 3, name: "sushi platter", make: () => picture(["navy", "tan", "brown", "dkgreen", "white", "orange", "red", "lime"], P => {
      P.all("navy");
      P.line("brown", 22, 10, 42, 4, 1.5); P.line("brown", 23, 12.5, 43, 7.5, 1.5);
      P.rect("brown", 6, 34, 12, 38); P.rect("brown", 32, 34, 38, 38);
      P.rect("tan", 3, 15, 41, 35); P.rect("brown", 3, 33, 41, 35);
      for (const cx of [9, 18, 27]) { P.ell("dkgreen", cx, 21, 4.2, 3.8); P.ell("white", cx, 20.5, 3.1, 2.6); P.ell("orange", cx, 20.5, 1.4, 1.2); }
      P.ell("lime", 35.5, 22, 3, 2.2);
      for (const [cx, k] of [[12, "orange"], [26, "red"]]) {
        P.rell("white", cx, 29.5, 5.5, 2.4, 0); P.rell(k, cx, 27.8, 6, 2.2, 0);
        if (k === "orange") P.on("white", "orange", (x, y) => Math.abs(x - cx) < 5 && y < 30 && (fl(x) - fl(y) * 0.6 + 40) % 3 < 0.8);
        P.rect("dkgreen", cx - 1, 25.6, cx + 1, 31);
      }
    }, 44) },
    { tier: 3, name: "cheese board", make: () => picture(["teal", "brown", "yellow", "orange", "white", "tan", "purple", "grey"], P => {
      P.all("teal");
      P.rect("brown", 3, 12, 37, 38); P.ell("brown", 3, 25, 0.1, 0.1); P.rect("brown", 37, 22, 43, 28); P.ell("teal", 40.5, 25, 1.2, 1.2);
      P.poly("yellow", [[6, 31], [22, 31], [22, 16]]); P.poly("orange", [[22, 16], [22, 31], [24.5, 30], [24.5, 15.5]]);
      for (const [hx, hy, r] of [[15, 27.5, 1.6], [19.5, 24, 1.4], [11, 29.3, 1], [20, 28.5, 1.2]]) P.ell("orange", hx, hy, r, r);
      P.ell("white", 30, 19, 5.5, 4.5);
      P.poly("brown", [[30, 19], [36, 15.5], [36, 22]]);
      for (const [cx, cy] of [[9, 16], [15, 15]]) { P.ell("tan", cx, cy, 2.8, 2.8); P.rect("brown", cx - 0.5, cy - 0.5, cx + 0.5, cy + 0.5); }
      for (const [gx, gy] of [[28, 28], [31.5, 28], [35, 28.5], [29.5, 31.5], [33, 32], [31, 35]]) P.ell("purple", gx, gy, 1.9, 1.9);
      P.rect("grey", 6, 34, 20, 36); P.rect("white", 20, 34, 26, 36);
    }, 44) },
    { tier: 3, name: "bento box", make: () => picture(["red", "white", "pink", "yellow", "green", "orange", "ink"], P => {
      P.rect("red", 3, 7, 41, 37);
      P.rect("white", 6, 10, 21, 34); P.ell("pink", 13.5, 22, 3, 3);
      P.rect("yellow", 24, 10, 38, 20);
      P.rect("green", 24, 23, 38, 34);
      P.on("orange", "green", x => x > 31);
      P.outline("ink", true);
      for (const [sx, sy] of [[9, 13], [15, 12], [18, 16], [8, 18], [17, 27], [10, 29], [14, 31], [19, 21], [8, 24]]) P.rect("ink", sx, sy, sx + 1, sy + 1);
      P.on("white", "orange", (x, y) => (fl(x) + fl(y)) % 4 === 0);
      P.rect("ink", 28.5, 11, 29.5, 19); P.rect("ink", 33, 11, 34, 19);
      P.on("ink", "green", (x, y) => Math.sin(x * 1.5) * Math.sin(y * 1.5) > 0.7);
    }, 44) },
    { tier: 3, name: "gingerbread house", make: () => picture(["brown", "white", "pink", "green", "yellow", "red", "ink"], P => {
      P.rect("brown", 27, 8, 32, 17); P.rect("white", 26.5, 7, 32.5, 9);
      P.rect("brown", 9, 22, 35, 40);
      P.poly("white", [[4, 24], [22, 6], [40, 24]]);
      for (let sx = 6; sx <= 38; sx += 4) P.ell("white", sx, 24.5, 1.8, 1.8);
      P.rect("yellow", 12, 27, 17, 32); P.rect("yellow", 27, 27, 32, 32);
      P.rect("red", 19.5, 31, 24.5, 40); P.ell("red", 22, 31, 2.5, 2.5);
      P.outline("ink", true);
      P.rect("white", 14, 27, 15, 32); P.rect("white", 12, 29, 17, 30); P.rect("white", 29, 27, 30, 32); P.rect("white", 27, 29, 32, 30);
      for (const [cx, cy, k] of [[22, 11, "pink"], [18, 16, "green"], [26, 16, "pink"], [13, 20.5, "pink"], [22, 19, "green"], [31, 20.5, "green"], [9, 23, "green"], [35, 23, "pink"]]) P.ell(k, cx, cy, 1.5, 1.5);
      for (let i = 0; i < 6; i++) P.ell(i % 2 ? "pink" : "green", 11 + i * 4.4, 39, 1.5, 1.2);
    }, 44) },
    { tier: 3, name: "fruit tart", make: () => picture(["tan", "brown", "white", "red", "green", "lime", "blue", "ink"], P => {
      P.ell("tan", 20, 23, 17, 10); P.rect("tan", 3, 18, 37, 23); P.ell("tan", 20, 18, 17, 10);
      P.on("brown", "tan", (x, y) => fl(x) % 3 === 0 && ((x - 20) / 17) ** 2 + ((y - 18) / 10) ** 2 > 1);
      P.ell("white", 20, 17.5, 14.5, 8.2);
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; P.rell("red", 20 + Math.cos(a) * 11.3, 17.5 + Math.sin(a) * 6.2, 2.4, 1.7, a); }
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + 0.5, kx = 20 + Math.cos(a) * 6.3, ky = 17.5 + Math.sin(a) * 3.5; P.ell("green", kx, ky, 2.6, 1.8); P.ell("lime", kx, ky, 1.3, 0.8); }
      for (const [bx, by] of [[18.5, 17], [21.5, 17], [20, 18.8], [20, 15.5]]) P.ell("blue", bx, by, 1.3, 1);
      P.outline("ink");
    }, 40) },
    { tier: 3, name: "pantry shelf", make: () => picture(["mint", "brown", "white", "red", "gold", "green", "orange", "purple"], P => {
      P.all("mint");
      P.rect("brown", 2, 19, 42, 21.5); P.rect("brown", 2, 38, 42, 40.5);
      P.rect("brown", 5, 21.5, 7, 25); P.rect("brown", 37, 21.5, 39, 25); P.rect("brown", 5, 40.5, 7, 44); P.rect("brown", 37, 40.5, 39, 44);
      const jar = (k, x0, x1, top, bot) => {
        P.rect(k, x0, top + 2, x1, bot); P.rect(k, x0 + 1, top + 1, x1 - 1, top + 2);
        P.poly("white", [[x0 - 1, top + 1.5], [x1 + 1, top + 1.5], [x1, top - 1.5], [x0, top - 1.5]]);
        P.rect(k, x0 + 1.5, top + 0.5, x1 - 1.5, top + 1.2);
        P.rect("white", x0 + 1, top + 4, x0 + 2, bot - 2);
      };
      jar("red", 4, 11, 9, 19); jar("gold", 13, 20, 7, 19); jar("green", 22, 29, 10, 19); jar("orange", 31, 39, 8, 19);
      jar("purple", 4, 12, 27, 38); jar("red", 15, 21, 29, 38); jar("gold", 24, 30, 28, 38); jar("green", 33, 40, 26, 38);
    }, 44) },
  );
}
