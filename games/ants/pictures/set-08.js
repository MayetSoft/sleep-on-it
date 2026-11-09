// Sleep on it / Ants: places, buildings and landscapes. Full scenes, plus buildings as objects
// on a transparent background with ink outlines.
"use strict";
{
  // a layered pine tree: three stacked triangles, base at yb, about h tall and w wide
  const pine = (P, k, cx, yb, h, w) => {
    for (let i = 0; i < 3; i++) {
      const t = yb - i * h / 3.2, ww = w * (1 - i * 0.25);
      P.poly(k, [[cx - ww / 2, t], [cx, t - h * 0.45], [cx + ww / 2, t]]);
    }
  };
  // a star: one pixel, or a small plus when big
  const star = (P, k, x, y, big) => {
    P.rect(k, x, y, x + 1, y + 1);
    if (big) { P.rect(k, x - 1, y, x + 2, y + 1); P.rect(k, x, y - 1, x + 1, y + 2); }
  };
  // stone or brick mortar lines
  const mortar = (x, y, h = 3, w = 4) => fl(y) % h === 0 || (fl(x) + (fl(y / h) % 2) * (w / 2)) % w === 0;

  PICTURES.push(
    // ----- simple -----
    { tier: 1, name: "rainbow over fields", make: () => picture(["sky", "white", "red", "yellow", "blue", "green", "dkgreen"], P => {
      P.all("sky");
      const arc = (k, r0, r1) => P.when(k, (x, y) => { const d = Math.hypot(x - 16, y - 25); return d >= r0 && d < r1; });
      arc("red", 13, 16); arc("yellow", 10, 13); arc("blue", 7, 10);
      P.ell("white", 5, 6, 4.5, 2); P.ell("white", 8.5, 4.6, 3.2, 1.9); P.ell("white", 27, 4.5, 4, 1.7);
      P.when("green", (x, y) => y > 21 + 1.6 * Math.sin(x * 0.26));
      P.when("dkgreen", (x, y) => y > 25.5 + 1.6 * Math.sin(x * 0.22 + 2));
      P.on("green", "dkgreen", (x, y) => fl(y) % 3 === 0 && y > 27);
    }, 32) },
    { tier: 1, name: "starry hill", make: () => picture(["navy", "white", "yellow", "teal", "dkgreen"], P => {
      P.all("navy");
      P.ell("yellow", 22.5, 8, 4.6, 4.6); P.ell("navy", 24.7, 6.4, 4, 4);
      for (const [x, y, b] of [[5, 5, 1], [13, 3, 0], [14, 11, 1], [4, 15, 0], [28, 16, 1], [9, 19, 0], [29, 2, 0], [19, 16, 0]]) star(P, "white", x, y, b);
      P.ell("teal", 4, 32, 14, 9.5); P.ell("teal", 29, 33, 12, 9.5);
      P.ell("dkgreen", 17, 39, 20, 13.5);
      P.ell("dkgreen", 17, 19.5, 3.4, 3.4); P.rect("dkgreen", 16, 20, 18, 27);
    }, 32) },
    { tier: 1, name: "desert dunes", make: () => picture(["sky", "yellow", "peach", "tan", "orange", "green"], P => {
      P.all("sky"); P.ell("yellow", 24, 6.5, 4, 4);
      P.when("peach", (x, y) => y > 15 + 1.8 * Math.sin(x * 0.35 + 0.5));
      P.when("tan", (x, y) => y > 20 + 2 * Math.sin(x * 0.28 + 2.5));
      P.when("orange", (x, y) => y > 25 + 2 * Math.sin(x * 0.2 + 4));
      P.rect("green", 6.5, 13, 9.5, 24.5); P.ell("green", 8, 13, 1.5, 1.5);
      P.rect("green", 3.5, 15.5, 5, 20.5); P.rect("green", 3.5, 19, 7, 20.5);
      P.rect("green", 11, 14.5, 12.5, 18.5); P.rect("green", 9, 17, 12.5, 18.5);
    }, 32) },
    { tier: 1, name: "moonlit sea", make: () => picture(["navy", "white", "lilac", "blue", "sky"], P => {
      P.all("navy");
      P.ell("white", 16, 9, 4.8, 4.8);
      P.ell("lilac", 6.5, 14.5, 5.3, 1.6); P.ell("lilac", 25, 12.5, 6, 1.6); P.ell("lilac", 28, 5, 4, 1.3);
      for (const [x, y, b] of [[4, 4, 1], [24, 3, 0], [9, 2, 0], [29, 16, 0], [3, 10, 0], [21, 17, 0]]) star(P, "white", x, y, b);
      P.rect("blue", 0, 19, 32, 32);
      P.when("sky", (x, y) => y > 19 && fl(y) % 2 === 1 && (fl(x) * 3 + fl(y) * 5) % 7 < 2 && Math.abs(x - 16) > 5);
      P.when("white", (x, y) => y > 19 && fl(y) % 2 === 0 && Math.abs(x - 16) < 4 - (fl(y) % 4 === 0 ? 1.3 : 0) - (y - 19) * 0.1);
    }, 32) },
    { tier: 1, name: "iceberg", make: () => picture(["sky", "white", "grey", "blue", "teal"], P => {
      P.all("sky"); P.ell("white", 6, 5.5, 4, 1.6); P.ell("white", 27, 4, 3.3, 1.3);
      P.rect("blue", 0, 17, 32, 32);
      P.poly("teal", [[5.3, 17], [26.7, 17], [24, 25.3], [16, 29.3], [8, 26.7], [4, 21.3]]);
      P.poly("white", [[6.7, 17], [10.7, 9.3], [13.3, 11.3], [17.3, 4], [21.3, 10.7], [23.3, 9.3], [26.7, 17]]);
      P.on("grey", "white", (x, y) => y > 5.3 && x > 17.3 + (y - 4) * 0.2);
      P.when("white", (x, y) => y > 18.5 && fl(y) % 3 === 2 && (x < 5 || x > 27) && (fl(x) + fl(y)) % 5 < 2);
    }, 32) },
    { tier: 1, name: "wheat field", make: () => picture(["sky", "white", "dkgreen", "yellow", "orange", "red"], P => {
      P.all("sky"); P.ell("white", 8, 5.7, 5, 2); P.ell("white", 11.5, 4.3, 3.4, 1.8); P.ell("white", 25, 8, 4, 1.5);
      for (const [tx, r] of [[2, 2.5], [5.7, 3.2], [9, 2.3], [23, 2.7], [26.3, 3.4], [30.3, 2.6]]) P.ell("dkgreen", tx, 15.5, r, r);
      P.when("yellow", (x, y) => y > 16 + 0.9 * Math.sin(x * 0.175));
      P.on("orange", "yellow", (x, y) => y < 21.5 && fl(y) % 2 === 0 && (fl(x) + fl(y)) % 4 === 0);
      P.on("orange", "yellow", (x, y) => y > 21.5 + ((fl(x) * 7) % 5) && fl(x) % 2 === 0);
      for (const [px, py] of [[4, 25], [15, 28], [24, 24], [28, 28], [10, 20], [20, 30]]) P.rect("red", px, py, px + 2, py + 2);
    }, 32) },
    { tier: 1, name: "lavender field", make: () => picture(["peach", "yellow", "white", "dkgreen", "green", "purple"], P => {
      P.all("peach"); P.ell("yellow", 21.7, 9, 4.5, 4.5); P.ell("white", 8, 4.5, 4.5, 1.5); P.ell("white", 10.3, 6.3, 3.4, 1.1);
      P.when("dkgreen", (x, y) => y > 14.3 + 1.4 * Math.sin(x * 0.35));
      P.ell("dkgreen", 7, 11, 2.8, 2.8); P.rect("dkgreen", 6.5, 11, 7.6, 15);
      P.when("green", (x, y) => y > 16);
      P.on("purple", "green", (x, y) => { const u = (x - 16) / (y - 12.5); return ((u * 1.5 + 100) % 1) < 0.6; });
    }, 32) },
    { tier: 1, name: "country road", make: () => picture(["sky", "white", "green", "lime", "dkgreen", "tan"], P => {
      P.all("sky"); P.ell("white", 7, 5.7, 4.5, 1.8); P.ell("white", 24, 4, 5, 1.8); P.ell("white", 27.5, 5.5, 3.4, 1.4);
      P.rect("green", 0, 15, 32, 32);
      P.on("lime", "green", (x, y) => (y < 18 && x < 14) || (y > 19 && y < 24 && x > 16) || (y > 25 && x < 9));
      P.rect("dkgreen", 0, 18, 32, 19); P.rect("dkgreen", 0, 24, 32, 25);
      P.ell("dkgreen", 24, 13, 2.6, 3.2); P.ell("dkgreen", 28, 13.7, 2, 2.6);
      P.when("tan", (x, y) => y > 15 && Math.abs(x - (15 + 3.4 * Math.sin((y - 15) * 0.19))) < (y - 14) * 0.5);
      P.ell("dkgreen", 4.5, 20.5, 4, 4.5); P.rect("dkgreen", 4, 24, 5.5, 27.5);
    }, 32) },
    { tier: 1, name: "snowy pines", make: () => picture(["sky", "white", "green", "dkgreen", "brown"], P => {
      P.all("sky");
      P.when("white", (x, y) => y > 24 + 1.7 * Math.sin(x * 0.22));
      pine(P, "green", 4, 21.7, 10.3, 6.9); pine(P, "green", 16, 19.4, 10.3, 6.9); pine(P, "green", 28.6, 20.6, 11.4, 7.4);
      P.rect("brown", 9, 27.4, 11.5, 30.8); P.rect("brown", 20.5, 28.6, 23, 32);
      pine(P, "dkgreen", 10.3, 28, 19.4, 11.4); pine(P, "dkgreen", 21.7, 29.1, 20.6, 12.6);
      P.on("white", ["dkgreen", "green"], (x, y) => fl(y) % 3 === 0 && (fl(x) + fl(y)) % 4 === 0);
      for (const [x, y] of [[2, 3], [7, 9], [14, 4], [25, 2], [30, 9], [18, 11], [4, 15], [27, 15], [11, 1]]) P.rect("white", x, y, x + 1, y + 1);
    }, 32) },
    { tier: 1, name: "igloo", make: () => picture(["sky", "yellow", "white", "grey", "dkgrey"], P => {
      P.all("sky"); P.ell("yellow", 26, 6, 3.4, 3.4);
      const dome = (x, y) => y < 23 && ((x - 18) / 11.5) ** 2 + ((y - 23) / 11) ** 2 <= 1;
      P.when("white", dome);
      P.when("grey", (x, y) => dome(x, y) && (fl(y) % 3 === 1 || (fl(x) + (fl(y / 3) % 2) * 2) % 5 === 0));
      P.when("grey", (x, y) => dome(x, y) && ((x - 18) / 11.5) ** 2 + ((y - 23) / 11) ** 2 > 0.84);
      const hut = (x, y) => y < 23 && ((x - 8) / 5.5) ** 2 + ((y - 23) / 6) ** 2 <= 1;
      P.when("white", hut);
      P.when("grey", (x, y) => hut(x, y) && ((x - 8) / 5.5) ** 2 + ((y - 23) / 6) ** 2 > 0.62);
      P.when("dkgrey", (x, y) => y < 23 && ((x - 8) / 2.6) ** 2 + ((y - 23) / 3.6) ** 2 <= 1);
      P.rect("white", 0, 23, 32, 32);
      P.ell("grey", 23, 24.5, 9, 1.2);
    }, 32) },
    // ----- medium scenes -----
    { tier: 2, name: "aurora", make: () => picture(["navy", "purple", "green", "mint", "white", "dkgreen"], P => {
      P.all("navy");
      for (const [x, y, b] of [[3, 3, 1], [12, 2, 0], [19, 4, 1], [28, 2, 0], [8, 21, 0], [26, 22, 1], [16, 20, 0]]) star(P, "white", x, y, b);
      const c = x => 11 + 3 * Math.sin(x * 0.22 + 0.5);
      P.when("purple", (x, y) => y > c(x) - 6 && y < c(x) - 2.5 && fl(x) % 3 !== 0);
      P.when("green", (x, y) => y >= c(x) - 2.5 && y < c(x) + 5 - ((fl(x) * 7) % 3));
      P.when("mint", (x, y) => y >= c(x) - 1 && y < c(x) + 2.5 && fl(x) % 2 === 0);
      P.when("white", (x, y) => y > 27 + Math.sin(x * 0.3));
      for (const [px, h] of [[3, 10], [8.5, 7], [14, 12], [21, 9], [27, 13], [32, 8]]) pine(P, "dkgreen", px, 28.5, h, h * 0.8);
    }, 32) },
    { tier: 2, name: "waterfall", make: () => picture(["sky", "green", "grey", "dkgrey", "white", "blue"], P => {
      P.all("sky"); P.ell("white", 16, 3.5, 4.5, 1.5);
      P.poly("grey", [[0, 7], [13, 9], [13, 28], [0, 28]]); P.poly("grey", [[19, 9], [32, 6], [32, 28], [19, 28]]);
      P.on("dkgrey", "grey", (x, y) => y > 10 && (fl(y) + fl(x / 5) * 2) % 6 === 0 && fl(x) % 5 !== 0);
      P.on("dkgrey", "grey", (x, y) => (x > 11 && x < 13) || (x > 19 && x < 21));
      for (const [gx, gy] of [[2.5, 7.5], [8.5, 8.5], [23.5, 8.5], [29.5, 7]]) P.ell("green", gx, gy, 4, 2.3);
      P.rect("white", 13, 8, 19, 28); P.ell("white", 16, 8.5, 3.6, 1.5);
      P.on("sky", "white", (x, y) => y > 9 && y < 27 && fl(x) % 3 === 1 && (fl(y) + fl(x)) % 6 < 4);
      P.when("blue", (x, y) => y > 26 + 0.6 * Math.sin(x * 0.5));
      P.on("sky", "blue", (x, y) => fl(y) % 2 === 1 && (fl(x) + fl(y)) % 7 < 3 && Math.abs(x - 16) > 6);
      P.ell("white", 16, 27, 6, 1.8); P.ell("white", 11, 28, 2, 0.8); P.ell("white", 21, 28, 2, 0.8);
      P.ell("green", 2, 31, 5, 3); P.ell("green", 30, 31, 5, 3);
    }, 32) },
    { tier: 2, name: "mountain lake", make: () => picture(["sky", "white", "grey", "dkgreen", "teal", "green"], P => {
      P.all("sky"); P.ell("white", 6, 4, 4, 1.3); P.ell("white", 30, 3, 3.5, 1.1);
      const m = x => Math.min(6 + Math.abs(x - 9) * 1.0, 4 + Math.abs(x - 22) * 1.05, 9 + Math.abs(x - 32) * 0.9);
      const mount = (x, y) => y >= m(x) && y < 20;
      P.when("grey", mount);
      P.when("white", (x, y) => mount(x, y) && y < 10.5 - 0.7 * Math.sin(x * 1.3));
      const forest = (x, y) => y >= 17.5 - Math.abs(Math.sin(x * 0.8)) * 2 && y < 20;
      P.when("dkgreen", forest);
      P.rect("teal", 0, 20, 36, 31);
      P.when("dkgreen", (x, y) => y >= 20 && y < 31 && fl(y) % 2 === 0 && forest(x, 40 - y));
      P.when("grey", (x, y) => y >= 20 && y < 31 && fl(y) % 2 === 0 && mount(x, 40 - y) && !forest(x, 40 - y));
      P.when("green", (x, y) => y > 30 + Math.sin(x * 0.3));
      for (const [fx, fy] of [[4, 33], [12, 34], [20, 33], [29, 34], [33, 32]]) P.rect("white", fx, fy, fx + 2, fy + 1);
    }, 36) },
    { tier: 2, name: "canyon", make: () => picture(["sky", "white", "tan", "orange", "red", "maroon", "blue"], P => {
      P.all("sky"); P.ell("white", 22, 4, 4, 1.4); P.ell("white", 25, 5.2, 3, 1);
      P.poly("red", [[10, 15], [12, 11], [16, 11], [17.5, 15]]); P.poly("red", [[16, 15], [17.5, 12.5], [21, 12.5], [23, 15]]);
      P.rect("tan", 0, 15, 32, 32);
      P.when("blue", (x, y) => y > 15 && Math.abs(x - (16 + 2.5 * Math.sin(y * 0.4))) < 0.6 + (y - 15) * 0.25);
      const L = y => 13 - (y - 5) * 0.33 + 1.2 * Math.sin(y * 0.6), R = y => 19 + (y - 7) * 0.33 + 1.2 * Math.sin(y * 0.5 + 1);
      P.when("orange", (x, y) => (y > 5 && x < L(y)) || (y > 7 && x > R(y)));
      P.on("red", "orange", (x, y) => fl(y - x * 0.06) % 4 === 0);
      P.when("maroon", (x, y) => y > 6.5 && x < L(y) && x >= L(y) - 3);
      P.when("tan", (x, y) => (y > 5 && y < 6.5 && x < L(y)) || (y > 7 && y < 8.5 && x > R(y)));
    }, 32) },
    { tier: 2, name: "autumn forest", make: () => picture(["sky", "red", "orange", "yellow", "brown", "green", "tan"], P => {
      P.all("sky");
      P.rect("green", 0, 24, 36, 36);
      for (const [tx, ty] of [[5, 16], [16, 14], [29, 15], [10, 22], [25, 22]]) P.rect("brown", tx - 1, ty, tx + 1, ty + 12 - (ty > 20 ? 2 : 0));
      for (const [cx, cy, rx, ry, k] of [[5, 11, 5.5, 6.5, "yellow"], [16, 8, 6.5, 7, "orange"], [29, 10, 6, 6.5, "red"], [10, 17, 5.5, 5.5, "red"], [25, 17, 5.5, 5.5, "yellow"], [35, 18, 3.5, 5, "orange"], [0, 20, 3.5, 5, "orange"]]) P.ell(k, cx, cy, rx, ry);
      P.when("tan", (x, y) => y > 25 && Math.abs(x - (18 + 4 * Math.sin(y * 0.25))) < (y - 24) * 0.45 + 0.5);
      P.on("orange", "green", (x, y) => (fl(x) * 5 + fl(y) * 3) % 11 === 0);
      P.on("red", "green", (x, y) => (fl(x) * 7 + fl(y) * 2) % 13 === 0);
      for (const [lx, ly, k] of [[21, 22, "orange"], [32, 26, "red"], [3, 28, "yellow"], [13, 27, "yellow"]]) P.rect(k, lx, ly, lx + 2, ly + 1);
    }, 36) },
    { tier: 2, name: "windmill field", make: () => picture(["sky", "white", "brown", "dkgrey", "red", "yellow", "green"], P => {
      P.all("sky"); P.ell("white", 5, 5, 4, 1.6); P.ell("white", 30, 9, 4, 1.5); P.ell("white", 32, 7.8, 2.5, 1.2);
      P.rect("green", 0, 24, 36, 36);
      P.on("red", "green", (x, y) => { const b = ((x - 18) / (y - 20) * 2.2 + 100) % 3; return b < 1; });
      P.on("yellow", "green", (x, y) => { const b = ((x - 18) / (y - 20) * 2.2 + 100) % 3; return b >= 1.5 && b < 2.5; });
      P.poly("brown", [[13, 27], [23, 27], [21, 13], [15, 13]]);
      P.when("dkgrey", (x, y) => y < 13.5 && ((x - 18) / 3.8) ** 2 + ((y - 13.5) / 3) ** 2 <= 1);
      P.rect("dkgrey", 16.5, 22, 19.5, 27); P.rect("dkgrey", 17, 16, 19, 18);
      for (let i = 0; i < 4; i++) {
        const a = Math.PI / 4 + i * Math.PI / 2, ex = 18 + Math.cos(a) * 11.5, ey = 12 + Math.sin(a) * 11.5;
        P.line("white", 18 + Math.cos(a) * 2.5, 12 + Math.sin(a) * 2.5, ex, ey, 3.2);
        P.line("brown", 18, 12, ex, ey, 1);
      }
      P.ell("dkgrey", 18, 12, 1.5, 1.5);
    }, 36) },
    { tier: 2, name: "vineyard", make: () => picture(["sky", "yellow", "lime", "green", "dkgreen", "purple"], P => {
      P.all("sky"); P.ell("yellow", 28, 6, 3.5, 3.5);
      P.when("lime", (x, y) => y > 13 + 3 * Math.sin(x * 0.15 + 0.5));
      P.on("dkgreen", "lime", (x, y) => fl(y + x * 0.3) % 3 === 0);
      P.when("green", (x, y) => y > 21 + 3 * Math.sin(x * 0.12 + 2.5));
      P.on("dkgreen", "green", (x, y) => fl(y - x * 0.35 + 50) % 3 === 0);
      P.rell("dkgreen", 5, 11.5, 1.7, 5, 0); P.rell("dkgreen", 9, 12.5, 1.5, 4, 0);
      P.poly("dkgreen", [[22, 22], [30, 19], [36, 21], [36, 28], [30, 36], [26, 36], [22, 28]]);
      for (let r = 0; r < 4; r++) for (let i = 0; i < 4 - r; i++) { const gx = 23 + r * 1.5 + i * 3, gy = 23 + r * 3; P.rect("purple", fl(gx), gy, fl(gx) + 2, gy + 2); }
    }, 36) },
    { tier: 2, name: "rice terraces", make: () => picture(["sky", "white", "dkgreen", "lime", "green", "teal", "brown"], P => {
      P.all("sky"); P.ell("white", 24, 3.5, 5, 1.4); P.ell("white", 7, 6, 4, 1.2);
      P.when("dkgreen", (x, y) => y > 7 + 2 * Math.sin(x * 0.3) + Math.abs(x - 16) * 0.12);
      const band = (x, y) => (y - 11 + 2.5 * Math.sin(x * 0.2 + 0.5) - Math.abs(x - 16) * 0.12) / 3.4;
      const zone = (x, y) => band(x, y) > 0;
      P.when("lime", (x, y) => zone(x, y) && fl(band(x, y)) % 3 === 0);
      P.when("green", (x, y) => zone(x, y) && fl(band(x, y)) % 3 === 1);
      P.when("teal", (x, y) => zone(x, y) && fl(band(x, y)) % 3 === 2);
      P.when("dkgreen", (x, y) => zone(x, y) && band(x, y) % 1 < 0.28);
      P.rect("brown", 23, 12, 28, 15.5); P.poly("brown", [[21.5, 12.5], [25.5, 9], [29.5, 12.5]]);
      P.rect("dkgreen", 25, 13.5, 26, 15.5);
    }, 32) },
    { tier: 2, name: "temple gate", make: () => picture(["peach", "yellow", "purple", "red", "dkgrey", "grey", "green", "pink"], P => {
      P.all("peach"); P.ell("yellow", 16, 15, 7, 7);
      P.when("purple", (x, y) => y > 18 + 2 * Math.sin(x * 0.35));
      P.rect("green", 0, 24, 32, 32);
      P.poly("grey", [[12, 24], [20, 24], [23, 32], [9, 32]]);
      P.on("dkgrey", "grey", (x, y) => fl(y) % 2 === 1);
      P.rect("red", 8, 8, 10.5, 25); P.rect("red", 21.5, 8, 24, 25);
      P.rect("red", 5, 12, 27, 14); P.rect("red", 15, 8, 17, 12);
      P.poly("red", [[3, 6.5], [29, 6.5], [28, 9], [4, 9]]);
      P.poly("dkgrey", [[1, 3.5], [5, 5], [27, 5], [31, 3.5], [30, 6.5], [2, 6.5]]);
      P.rect("dkgrey", 7.5, 22.5, 11, 25); P.rect("dkgrey", 21, 22.5, 24.5, 25);
      for (const [bx, by, r] of [[1, 18, 2.5], [3, 16, 2.2], [0, 15, 2], [30.5, 19, 2.6], [28.5, 17, 2], [31, 15.5, 2]]) P.ell("pink", bx, by, r, r);
      P.rect("dkgrey", 1, 20, 2, 24); P.rect("dkgrey", 30, 21, 31, 24);
    }, 32) },
    { tier: 2, name: "tent camp at night", make: () => picture(["navy", "white", "teal", "dkgreen", "orange", "yellow", "red", "brown"], P => {
      P.all("navy");
      P.ell("white", 28, 6, 3.5, 3.5); P.ell("navy", 29.6, 4.8, 3, 3);
      for (const [x, y, b] of [[4, 4, 1], [11, 2, 0], [17, 6, 1], [22, 3, 0], [8, 10, 0], [21, 11, 0], [33, 13, 0]]) star(P, "white", x, y, b);
      pine(P, "teal", 4, 24, 15, 8); pine(P, "teal", 12, 22, 10, 6); pine(P, "teal", 23, 22, 9, 5.5); pine(P, "teal", 32, 24, 14, 8);
      P.when("dkgreen", (x, y) => y > 23 + Math.sin(x * 0.3));
      P.poly("orange", [[3, 36], [14.5, 17], [26, 36]]);
      P.poly("yellow", [[11, 36], [14.5, 26], [18, 36]]);
      P.line("red", 14.5, 17, 14.5, 25.5, 1);
      P.poly("red", [[26.5, 34], [27, 28.5], [29, 30.5], [30.3, 25.5], [31.7, 30.5], [33.5, 28.5], [34, 34]]);
      P.ell("yellow", 30.3, 32, 1.8, 2.5);
      P.line("brown", 26, 36, 35, 33.5, 1.8); P.line("brown", 26, 33.5, 35, 36, 1.8);
    }, 36) },
    { tier: 2, name: "river bridge", make: () => picture(["sky", "white", "green", "dkgreen", "grey", "dkgrey", "blue"], P => {
      P.all("sky"); P.ell("white", 7, 4, 4.5, 1.6); P.ell("white", 27, 6, 4, 1.4);
      for (const [tx, r] of [[3, 3.5], [8, 3], [14, 2.5], [22, 2.5], [28, 3.2], [33, 3.8]]) P.ell("dkgreen", tx, 13.5, r, r + 0.5);
      P.rect("green", 0, 14, 36, 36);
      const river = (x, y) => y > 14 && Math.abs(x - 18) < 4 + (y - 14) * 0.55;
      P.when("blue", river);
      P.on("white", "blue", (x, y) => fl(y) % 3 === 1 && (fl(x) + fl(y) * 2) % 7 < 2);
      const arch = (x, y) => ((x - 18) / 9.5) ** 2 + ((y - 27) / 11) ** 2 <= 1;
      const top = x => 11 + Math.max(0, Math.abs(x - 18) - 8) * 0.55;
      const body = (x, y) => y >= top(x) && y < 27 && !arch(x, y) && Math.abs(x - 18) < 17;
      P.when("grey", body);
      P.on("dkgrey", "grey", (x, y) => y >= top(x) + 2 && mortar(x, y - 1, 3, 6));
      P.on("dkgrey", "grey", (x, y) => y < top(x) + 1 || ((x - 18) / 10.8) ** 2 + ((y - 27) / 12.3) ** 2 <= 1);
      P.when("grey", (x, y) => y >= 27 && river(x, y) && fl(y) % 2 === 1 && body(x, 54 - y));
    }, 36) },
    { tier: 2, name: "palm oasis", make: () => picture(["sky", "yellow", "orange", "tan", "teal", "green", "brown"], P => {
      P.all("sky"); P.ell("yellow", 6, 6, 3.5, 3.5);
      P.when("orange", (x, y) => y > 18 + 1.5 * Math.sin(x * 0.3 + 1));
      P.when("tan", (x, y) => y > 22 + 1.5 * Math.sin(x * 0.3 + 3));
      P.ell("teal", 16, 26.5, 9, 2.6);
      P.line("brown", 21, 26, 22.5, 18, 1.8); P.line("brown", 22.5, 18, 25, 11, 1.6);
      P.line("brown", 10, 25, 9.5, 19, 1.6); P.line("brown", 9.5, 19, 8, 14, 1.5);
      for (const [cx, cy, s] of [[25, 11, 1], [8, 14, 0.8]]) {
        for (const a of [-2.8, -2.1, -1.2, -0.4, 0.3]) P.rell("green", cx + Math.cos(a) * 3.6 * s, cy + Math.sin(a) * 2.6 * s + 1, 4 * s, 1.3, a);
      }
      for (const [gx, gy] of [[6, 26], [25, 25], [27, 27.5], [5, 28.5]]) P.poly("green", [[gx - 1.5, gy + 1], [gx - 1, gy - 1.5], [gx, gy], [gx + 1, gy - 1.5], [gx + 1.5, gy + 1]]);
    }, 32) },
    { tier: 2, name: "sea cliffs", make: () => picture(["sky", "white", "green", "tan", "brown", "blue", "teal"], P => {
      P.all("sky"); P.ell("white", 24, 4, 4.5, 1.5); P.ell("white", 28, 5.3, 3, 1.1);
      P.rect("blue", 0, 17, 32, 32);
      P.on("teal", "blue", (x, y) => fl(y) % 3 === 0 && (fl(x) + fl(y)) % 7 < 3);
      P.poly("tan", [[0, 10], [14, 9], [17, 12], [19.5, 32], [0, 32]]);
      P.poly("tan", [[23, 17.5], [24, 12], [27.5, 11.5], [28.5, 17.5]]);
      P.on("brown", "tan", (x, y) => fl(y - x * 0.08) % 4 === 0 && y > 11);
      P.poly("green", [[0, 8], [14, 7.5], [17.5, 10.5], [17, 12], [14, 10], [0, 11]]);
      P.poly("green", [[23.5, 12.8], [24, 11], [27.5, 10.5], [28, 12.5]]);
      P.ell("white", 19.5, 18, 2.6, 1); P.ell("white", 25.8, 18, 3.8, 1); P.ell("white", 19, 24, 2, 0.8);
      for (const [gx, gy] of [[8, 4], [13, 2.5]]) { P.rect("white", gx, gy, gx + 1, gy + 1); P.rect("white", gx - 2, gy - 1, gx, gy); P.rect("white", gx + 1, gy - 1, gx + 3, gy); }
    }, 32) },
    { tier: 2, name: "city park", make: () => picture(["sky", "yellow", "green", "dkgreen", "blue", "brown", "white", "tan"], P => {
      P.all("sky"); P.ell("yellow", 30, 5, 3, 3); P.ell("white", 17, 5, 4, 1.4);
      for (const [tx, r] of [[15, 3], [20, 3.5], [26, 3], [32, 3.6]]) P.ell("dkgreen", tx, 19, r, r);
      P.rect("green", 0, 20, 36, 36);
      P.ell("blue", 25, 28.5, 9.5, 3.8);
      P.when("tan", (x, y) => y > 20 && Math.abs(y - (36 - x * 0.55 + Math.sin(x * 0.3) * 1.5)) < 1.6 && x < 18);
      P.rect("brown", 5.5, 11, 8.5, 26);
      P.ell("dkgreen", 7, 9, 6.5, 6.5); P.ell("dkgreen", 3, 12, 3.5, 3); P.ell("dkgreen", 11, 12, 3.5, 3);
      P.ell("green", 5, 7, 2, 1.6); P.ell("green", 9.5, 10, 1.8, 1.4);
      P.rect("brown", 11, 21, 20, 22.5); P.rect("brown", 11, 18.5, 20, 19.8);
      P.rect("brown", 11.5, 22, 12.5, 24.5); P.rect("brown", 18.5, 22, 19.5, 24.5);
      for (const [dx, dy] of [[22, 28], [28, 29.5]]) { P.ell("white", dx, dy, 2, 1.2); P.ell("white", dx + 1.6, dy - 1.5, 1, 1); P.rect("yellow", dx + 2.4, dy - 1.8, dx + 3.4, dy - 0.8); }
    }, 36) },
    // ----- complex scenes -----
    { tier: 3, name: "snowy village", make: () => picture(["navy", "white", "yellow", "red", "tan", "brown", "dkgreen", "grey"], P => {
      P.all("navy");
      P.ell("yellow", 37, 6, 3, 3);
      for (const [x, y] of [[3, 4], [9, 9], [15, 3], [24, 6], [29, 11], [6, 15], [42, 13], [20, 12], [33, 2], [1, 10], [12, 14]]) P.rect("white", x, y, x + 1, y + 1);
      P.ell("grey", 11, 14, 1.8, 1.5); P.ell("grey", 12.5, 11.5, 2.2, 1.6); P.ell("grey", 14, 8.5, 2.6, 1.8);
      P.rect("red", 9.5, 16, 11.5, 21);
      const house = (x0, x1, wt, rt, wall, door) => {
        P.rect(wall, x0, wt, x1, 37);
        P.poly("white", [[x0 - 1.5, wt + 0.6], [(x0 + x1) / 2, rt], [x1 + 1.5, wt + 0.6]]);
        const dx = (x0 + x1) / 2;
        P.rect(door, dx - 1.5, 32, dx + 1.5, 37);
        for (const wx of [x0 + 1.5, x1 - 4.5]) P.rect("yellow", wx, wt + 2.5, wx + 3, wt + 5.5);
      };
      house(2, 14, 25, 17, "red", "brown"); house(30, 41, 27, 20, "tan", "red"); house(17, 27, 22, 14, "brown", "tan");
      P.rect("yellow", 20.5, 16.5, 23.5, 19.5);
      for (const [px, h] of [[15.5, 9], [28.5, 8], [43, 12], [0.5, 11]]) pine(P, "dkgreen", px, 36, h, h * 0.6);
      P.on("white", "dkgreen", (x, y) => fl(y) % 3 === 0 && (fl(x) + fl(y)) % 4 === 0);
      P.when("white", (x, y) => y > 36 + Math.sin(x * 0.25) * 0.8);
      P.when("grey", (x, y) => y > 37.5 && Math.abs(x - 22) < 1.5 + (y - 37.5) * 0.5);
    }, 44) },
    { tier: 3, name: "rainy street", make: () => picture(["grey", "purple", "teal", "blue", "yellow", "dkgrey", "red", "sky"], P => {
      P.all("grey");
      P.rect("purple", 0, 6, 13, 31); P.poly("purple", [[0, 6], [6.5, 2], [13, 6]]);
      P.rect("teal", 13, 11, 25, 31); P.rect("blue", 25, 4, 40, 31);
      for (const [x0, x1, y0] of [[1, 13, 8], [13, 25, 13], [25, 40, 6]]) {
        P.on("yellow", ["purple", "teal", "blue"], (x, y) => x > x0 + 1 && x < x1 - 1 && y > y0 && y < 27 && fl(x - x0) % 4 > 1 && fl(y - y0) % 5 > 1 && ((fl(x / 4) * 3 + fl(y / 5) * 5) % 4) !== 0);
      }
      P.rect("grey", 0, 31, 40, 33.5);
      P.rect("dkgrey", 0, 33.5, 40, 40);
      P.on("yellow", "dkgrey", (x, y) => fl(y) % 2 === 0 && (Math.abs(x - 34) < 1.5 || Math.abs(x - 6) < 1));
      P.ell("sky", 20, 37, 5, 1.2);
      P.rect("dkgrey", 33, 13, 35, 33.5); P.ell("yellow", 34, 12, 2.2, 2.2); P.rect("dkgrey", 32, 9, 36, 10);
      P.rect("dkgrey", 13.5, 28, 14.5, 32); P.rect("dkgrey", 16.5, 28, 17.5, 32);
      P.poly("yellow", [[12.5, 28.5], [13.5, 21.5], [17.5, 21.5], [18.5, 28.5]]); P.ell("yellow", 15.5, 20.5, 1.8, 1.8);
      P.rect("dkgrey", 15, 14, 16, 22);
      P.when("red", (x, y) => y < 15.5 && ((x - 15.5) / 6) ** 2 + ((y - 15.5) / 4.5) ** 2 <= 1);
      P.on("sky", ["grey", "purple", "teal", "blue", "dkgrey"], (x, y) => (fl(x) + fl(y)) % 8 === 0 && (fl(y) + fl(x / 8) * 3) % 6 < 3);
    }, 40) },
    { tier: 3, name: "harbour 2", make: () => picture(["sky", "white", "red", "yellow", "teal", "brown", "grey", "blue"], P => {
      P.all("sky"); P.ell("white", 8, 4, 5, 1.6); P.ell("white", 33, 6, 4.5, 1.4);
      const walls = ["red", "yellow", "teal", "white", "yellow", "red", "teal"];
      let x0 = 0;
      for (let i = 0; i < 7; i++) {
        const w = [7, 6, 6, 7, 6, 6, 6][i], wt = [16, 13, 15, 12, 15, 13, 16][i], x1 = x0 + w, k = walls[i];
        P.rect(k, x0, wt, x1, 28);
        P.poly("brown", [[x0 - 0.3, wt + 0.5], [x0 + w / 2, wt - 4], [x1 + 0.3, wt + 0.5]]);
        P.on("blue", k, (x, y) => y > wt + 1 && y < 26 && fl(x - x0) % 3 === 1 && fl(y - wt) % 4 > 1);
        x0 = x1;
      }
      P.rect("grey", 0, 28, 44, 31);
      P.rect("blue", 0, 31, 44, 44);
      P.on("white", "blue", (x, y) => fl(y) % 3 === 2 && (fl(x) + fl(y) * 3) % 9 < 3 && y > 34);
      P.rect("brown", 12, 22, 13, 35); P.poly("white", [[13.5, 22], [13.5, 34], [20, 34]]); P.poly("white", [[11.5, 24], [11.5, 34], [7, 34]]);
      P.poly("red", [[5, 34.5], [22, 34.5], [19.5, 38.5], [7.5, 38.5]]);
      P.rect("teal", 29, 36, 34, 39); P.rect("blue", 30, 37, 31, 38); P.rect("blue", 32, 37, 33, 38);
      P.poly("yellow", [[25, 38.5], [40, 38.5], [37.5, 42], [27.5, 42]]);
      P.ell("brown", 3, 29.5, 1.2, 1.2); P.ell("brown", 41, 29.5, 1.2, 1.2);
    }, 44) },
    { tier: 3, name: "pagoda", make: () => picture(["sky", "white", "pink", "teal", "red", "gold", "green", "brown"], P => {
      P.all("sky"); P.ell("white", 8, 5, 5, 1.6); P.ell("white", 33, 9, 4.5, 1.4);
      P.when("green", (x, y) => y > 34 + Math.sin(x * 0.2));
      const cx = 20;
      for (let i = 0; i < 5; i++) {
        const yb = 35 - i * 5.5, w = 6 - i * 0.9;
        P.rect("red", cx - w, yb - 3.5, cx + w, yb);
        P.poly("teal", [[cx - w - 4.5, yb - 2.6], [cx - w - 1, yb - 5], [cx + w + 1, yb - 5], [cx + w + 4.5, yb - 2.6], [cx + w + 3, yb - 3.6], [cx - w - 3, yb - 3.6]]);
        if (i === 0) P.rect("gold", cx - 1.5, yb - 3, cx + 1.5, yb);
      }
      P.rect("brown", 10, 35, 30, 36.5);
      P.line("gold", cx, 1, cx, 9, 1.2); for (const ry of [3, 5, 7]) P.rect("gold", cx - 1, ry, cx + 2, ry + 1);
      P.line("brown", 4, 36, 5, 26, 1.6); P.line("brown", 5, 28, 8, 24, 1); P.line("brown", 36, 36, 35, 27, 1.6); P.line("brown", 35, 29, 32, 25, 1);
      for (const [bx, by, r] of [[3, 24, 3], [7, 22, 2.8], [5, 20, 2.5], [1, 21, 2.2], [9, 25, 2], [37, 25, 3], [33, 23, 2.8], [35, 21, 2.5], [39, 22, 2.2], [31, 26, 2]]) P.ell("pink", bx, by, r, r);
    }, 40) },
    { tier: 3, name: "cabin by a lake", make: () => picture(["sky", "white", "dkgreen", "green", "brown", "tan", "grey", "blue"], P => {
      P.all("sky"); P.ell("white", 28, 4, 5, 1.6); P.ell("white", 33, 5.5, 3.5, 1.2);
      for (const [px, h] of [[18, 9], [22, 12], [26, 8], [30, 11], [34, 9], [38, 12], [3, 13], [8, 11], [13, 14]]) pine(P, "dkgreen", px, 19, h, h * 0.6);
      P.rect("blue", 0, 19, 40, 40);
      P.when("dkgreen", (x, y) => y > 19 && y < 26 && x > 16 && fl(y) % 2 === 0 && y - 19 < 6 - Math.abs(((x - 16) % 4) - 2) * 1.5);
      P.on("white", "blue", (x, y) => fl(y) % 3 === 1 && (fl(x) + fl(y) * 2) % 9 < 2 && y > 27);
      P.poly("green", [[0, 18], [16, 19], [20, 24], [17, 31], [8, 36], [0, 38]]);
      P.rect("brown", 3, 17, 15, 25);
      P.on("tan", "brown", (x, y) => fl(y) % 2 === 0);
      P.poly("grey", [[1, 18], [9, 11], [17, 18]]); P.rect("grey", 12, 10, 14, 15);
      P.ell("white", 13, 7.5, 1.6, 1.3); P.ell("white", 14.5, 5, 2, 1.5);
      P.rect("dkgreen", 8, 20, 10.5, 25); P.rect("white", 4.5, 19, 7, 21.5); P.rect("white", 11.5, 19, 14, 21.5);
      P.rect("tan", 14, 26, 27, 28); P.rect("brown", 16, 28, 17, 30); P.rect("brown", 25, 28, 26, 30);
    }, 40) },
    { tier: 3, name: "village street", make: () => picture(["sky", "tan", "pink", "white", "red", "brown", "blue", "grey", "dkgrey"], P => {
      P.all("sky"); P.ell("white", 22, 2.5, 4, 1.2);
      const houses = [[0, 10, 14, 7, "tan"], [10, 21, 11, 4, "pink"], [21, 31, 15, 8, "white"], [31, 44, 12, 4, "tan"]];
      for (const [x0, x1, wt, rt, k] of houses) {
        P.rect(k, x0, wt, x1, 33);
        P.poly("red", [[x0 - 0.8, wt + 0.5], [(x0 + x1) / 2, rt], [x1 + 0.8, wt + 0.5]]);
      }
      P.on("brown", "white", (x, y) => fl(x) === 21 || fl(x) === 30 || fl(y) === 23 || fl(x) === 25 && y > 15);
      for (const [x0, x1, wt] of houses) {
        const n = x1 - x0 > 11 ? 3 : 2, step = (x1 - x0) / n;
        for (let i = 0; i < n; i++) {
          const wx = x0 + step * i + step / 2 - 1.5;
          P.rect("blue", wx, wt + 2, wx + 3, wt + 6);
          P.rect("red", wx - 0.5, wt + 6, wx + 3.5, wt + 7);
        }
        P.rect("brown", (x0 + x1) / 2 - 2, 26, (x0 + x1) / 2 + 2, 33);
      }
      P.rect("grey", 0, 33, 44, 44);
      P.on("dkgrey", "grey", (x, y) => y > 34 && mortar(x, y, 3, 4));
      P.rect("dkgrey", 0, 33, 44, 34);
      P.rect("dkgrey", 8, 20, 9, 37); P.rect("dkgrey", 7, 18, 10, 20); P.ell("white", 8.5, 18, 1.5, 1.2);
    }, 44) },
    { tier: 3, name: "cottage in the woods", make: () => picture(["sky", "dkgreen", "green", "brown", "white", "red", "yellow", "tan"], P => {
      P.all("sky");
      P.rect("green", 0, 30, 40, 40);
      for (const [tx, w] of [[4, 3], [35, 3], [12, 2], [29, 2]]) P.rect("brown", tx - w / 2, 8, tx + w / 2, 33);
      for (const [cx, cy, r, k] of [[4, 6, 7, "dkgreen"], [36, 7, 7, "dkgreen"], [12, 3, 6, "green"], [28, 3, 6, "green"], [20, 0, 6, "dkgreen"], [0, 16, 5, "green"], [40, 17, 5, "green"]]) P.ell(k, cx, cy, r, r);
      P.ell("white", 18, 10, 1.6, 1.3); P.ell("white", 19.5, 7.5, 2, 1.5);
      P.rect("red", 23, 9, 26, 18);
      P.rect("white", 11, 20, 29, 32);
      P.poly("red", [[8.5, 21], [20, 11], [31.5, 21]]);
      P.rect("brown", 18, 25, 22, 32);
      P.rect("yellow", 13, 23, 16.5, 27); P.rect("yellow", 23.5, 23, 27, 27); P.rect("yellow", 18.5, 15.5, 21.5, 18.5);
      P.when("tan", (x, y) => y > 32 && Math.abs(x - (20 + Math.sin(y * 0.5) * 2)) < 1.5 + (y - 32) * 0.4);
      for (const [mx, my] of [[6, 35], [33, 36], [35.5, 34.5]]) { P.rect("white", mx - 0.5, my, mx + 1, my + 2); P.ell("red", mx + 0.25, my, 1.8, 1.2); }
      P.ell("dkgreen", 8, 31, 3.5, 2.5); P.ell("dkgreen", 32, 31, 3.5, 2.5);
    }, 40) },
    { tier: 3, name: "canal houses", make: () => picture(["sky", "maroon", "brown", "tan", "white", "grey", "blue", "dkgreen"], P => {
      P.all("sky"); P.ell("white", 6, 3, 4, 1.2); P.ell("white", 36, 2.5, 3.5, 1.1);
      const hs = [[0, 7, 9, "brown", 0], [7, 15, 6, "tan", 1], [15, 22, 10, "maroon", 2], [22, 30, 5, "brown", 1], [30, 37, 8, "tan", 0], [37, 44, 7, "maroon", 2]];
      const shape = (x, y) => {
        for (const [x0, x1, top, k, g] of hs) {
          if (x < x0 || x >= x1) continue;
          const c = (x0 + x1) / 2, d = Math.abs(x - c), hw = (x1 - x0) / 2;
          let t = top;
          if (g === 0) t = top + d * 1.1;
          else if (g === 1) t = top + (d > hw * 0.35 ? 2 : 0) + (d > hw * 0.7 ? 2 : 0);
          else t = top + (d > hw * 0.45 ? 2.5 : 0) - (d < 1.2 ? 1 : 0);
          return y >= t && y < 28 ? k : null;
        }
        return null;
      };
      for (const k of ["brown", "tan", "maroon"]) P.when(k, (x, y) => shape(x, y) === k);
      for (const [x0, x1, top] of hs) {
        const w = x1 - x0;
        P.on("white", ["brown", "tan", "maroon"], (x, y) => x >= x0 + 1 && x < x1 - 1 && y > top + 4 && y < 26 && fl(x - x0 - 1) % 3 < 2 && (w === 7 ? fl(x - x0) !== 3 : true) && fl(y - top) % 5 < 3);
      }
      P.rect("grey", 0, 28, 44, 30);
      P.ell("dkgreen", 3, 26, 4, 5); P.rect("brown", 2.5, 29, 3.5, 30); P.ell("dkgreen", 41, 25, 3.5, 5);
      P.rect("blue", 0, 30, 44, 44);
      for (const k of ["brown", "tan", "maroon"]) P.when(k, (x, y) => y >= 30 && fl(y) % 2 === 0 && shape(x, 59 - y) === k);
      P.poly("white", [[14, 37], [28, 37], [26, 40], [16, 40]]); P.rect("dkgreen", 18, 35, 23, 37);
    }, 44) },
    { tier: 3, name: "water mill", make: () => picture(["sky", "white", "dkgreen", "green", "grey", "red", "brown", "blue"], P => {
      P.all("sky"); P.ell("white", 30, 4, 5, 1.5);
      P.ell("dkgreen", 3, 12, 5, 6); P.ell("dkgreen", 36, 14, 5, 5.5); P.ell("dkgreen", 31, 16, 4, 4);
      P.rect("green", 0, 22, 40, 40);
      P.rect("grey", 4, 15, 22, 31);
      P.on("white", "grey", (x, y) => mortar(x, y, 4, 8) && y > 16);
      P.poly("red", [[2, 16], [13, 7], [24, 16]]);
      P.rect("brown", 11, 24, 15, 31); P.rect("brown", 7, 18, 10, 21); P.rect("brown", 16, 18, 19, 21);
      P.when("blue", (x, y) => y > 31 + Math.sin(x * 0.2) * 0.8 && y < 38 + Math.sin(x * 0.3));
      P.on("white", "blue", (x, y) => fl(y) % 2 === 0 && (fl(x) * 3 + fl(y)) % 8 < 2);
      const wx = 29, wy = 26;
      P.when("brown", (x, y) => { const d = Math.hypot(x - wx, y - wy); return d > 7 && d < 9; });
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4; P.line("brown", wx - Math.cos(a) * 7.5, wy - Math.sin(a) * 7.5, wx + Math.cos(a) * 7.5, wy + Math.sin(a) * 7.5, 1.2); }
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; P.line("brown", wx + Math.cos(a) * 8.5, wy + Math.sin(a) * 8.5, wx + Math.cos(a) * 10.5, wy + Math.sin(a) * 10.5, 1.4); }
      P.ell("grey", wx, wy, 1.6, 1.6);
      P.ell("white", 29, 35, 5, 1.3); P.ell("white", 22, 34, 2, 1);
    }, 40) },
    // ----- buildings as objects -----
    { tier: 1, name: "stone well", make: () => picture(["grey", "red", "brown", "blue", "ink"], P => {
      P.rect("brown", 6, 6, 8.5, 18); P.rect("brown", 19.5, 6, 22, 18);
      P.poly("red", [[3, 9], [14, 2], [25, 9], [25, 10.5], [14, 4], [3, 10.5]]); P.poly("red", [[6, 8], [14, 3.5], [22, 8]]);
      P.ell("grey", 14, 26, 9, 2); P.rect("grey", 5, 17, 23, 26); P.ell("grey", 14, 17, 9, 2.2);
      P.ell("blue", 14, 17, 7, 1.3);
      P.poly("brown", [[11.5, 12], [16.5, 12], [16, 15.5], [12, 15.5]]);
      P.outline("ink");
      P.on("ink", "grey", (x, y) => y > 19.5 && y < 26 && mortar(x, y, 3, 4));
      P.line("ink", 8, 9.5, 20, 9.5, 1); P.rect("ink", 13.5, 10, 14.5, 12);
    }, 28) },
    { tier: 1, name: "beach hut", make: () => picture(["white", "blue", "red", "tan", "ink"], P => {
      P.rect("white", 5, 9, 19, 19);
      P.on("blue", "white", x => fl(x / 2) % 2 === 0);
      P.poly("red", [[3, 10], [12, 3], [21, 10]]);
      P.rect("red", 10, 12, 14, 19);
      P.rect("tan", 3, 19, 21, 21); P.rect("tan", 5, 21, 8, 23.5); P.rect("tan", 16, 21, 19, 23.5);
      P.outline("ink");
      P.rect("ink", 12.5, 15, 13.5, 16);
    }, 24) },
    { tier: 1, name: "garden shed", make: () => picture(["green", "dkgreen", "brown", "white", "ink"], P => {
      P.rect("green", 5, 12, 23, 25);
      P.on("dkgreen", "green", x => fl(x) % 3 === 0);
      P.poly("brown", [[3, 13], [14, 5], [25, 13]]);
      P.rect("brown", 7.5, 15, 12.5, 25);
      P.rect("white", 15, 15, 21, 20);
      P.outline("ink");
      P.rect("ink", 17.5, 15, 18.5, 20); P.rect("ink", 15, 17, 21, 18); P.rect("ink", 11, 20, 12, 21);
    }, 28) },
    { tier: 1, name: "water tower", make: () => picture(["tan", "brown", "grey", "ink"], P => {
      P.rect("tan", 7, 7, 21, 17);
      P.rect("brown", 7, 9.5, 21, 11); P.rect("brown", 7, 13.5, 21, 15);
      P.poly("brown", [[5.5, 7.5], [14, 1.5], [22.5, 7.5]]);
      P.rect("grey", 5, 17, 23, 19.5);
      P.outline("ink");
      P.on("ink", "tan", x => fl(x) % 3 === 0);
      P.line("grey", 8.5, 19.5, 6, 27.5, 1.7); P.line("grey", 19.5, 19.5, 22, 27.5, 1.7);
      P.line("grey", 12, 19.5, 11.5, 27.5, 1.5); P.line("grey", 16, 19.5, 16.5, 27.5, 1.5);
      P.line("grey", 7.5, 21, 16.5, 26, 1); P.line("grey", 20.5, 21, 11.5, 26, 1);
    }, 28) },
    { tier: 1, name: "yurt", make: () => picture(["white", "red", "tan", "brown", "ink"], P => {
      P.rect("white", 3, 14, 25, 24); P.ell("white", 14, 24, 11, 1.5);
      P.when("tan", (x, y) => y < 15 && y > 5 + Math.abs(x - 14) * 0.85 - (Math.abs(x - 14) > 6 ? (Math.abs(x - 14) - 6) * 0.3 : 0));
      P.on("brown", "tan", (x, y) => { const a = Math.atan2(y - 3, x - 14); return fl(a * 9 + 50) % 2 === 0 && y > 7; });
      P.rect("red", 3, 15, 25, 17);
      P.on("white", "red", x => fl(x) % 4 === 1);
      P.rect("red", 11, 17, 17, 24);
      P.ell("brown", 14, 5, 2.5, 1.2);
      P.outline("ink");
      P.rect("ink", 14, 17, 15, 24);
    }, 28) },
    { tier: 2, name: "village church", make: () => picture(["tan", "grey", "brown", "yellow", "ink"], P => {
      P.rect("tan", 14, 19, 33, 34); P.poly("grey", [[12.5, 20], [23, 11], [34.5, 20]]);
      P.rect("tan", 4, 12, 14, 34); P.poly("grey", [[3, 12.5], [9, 0.5], [15, 12.5]]);
      P.rect("ink", 7.5, 15, 10.5, 19); P.ell("ink", 9, 15, 1.5, 1.6);
      P.rect("brown", 6.5, 27, 11.5, 34); P.ell("brown", 9, 27, 2.5, 2.2);
      for (const wx of [18, 23, 28]) { P.rect("yellow", wx - 1.2, 24, wx + 1.3, 30); P.ell("yellow", wx, 24, 1.3, 1.5); }
      P.outline("ink", true);
    }, 36) },
    { tier: 2, name: "chalet", make: () => picture(["brown", "tan", "grey", "red", "sky", "ink"], P => {
      P.rect("grey", 6, 26, 30, 33);
      P.rect("tan", 7, 14, 29, 26); P.poly("tan", [[7, 14.5], [18, 8], [29, 14.5]]);
      P.poly("brown", [[1, 17], [18, 5], [35, 17], [35, 19.5], [18, 8], [1, 19.5]]);
      P.rect("sky", 10, 16, 14.5, 20); P.rect("sky", 21.5, 16, 26, 20); P.rect("sky", 16, 10.5, 20, 14);
      P.rect("red", 9, 20, 15.5, 23); P.rect("red", 20.5, 20, 27, 23);
      P.rect("brown", 5, 23, 31, 26);
      P.rect("brown", 15, 27, 21, 33);
      P.outline("ink", true);
      P.on("ink", "brown", (x, y) => y > 23 && y < 26 && fl(x) % 2 === 0);
    }, 36) },
    { tier: 2, name: "treehouse", make: () => picture(["dkgreen", "green", "brown", "tan", "red", "ink"], P => {
      P.ell("dkgreen", 20, 15, 17, 12); P.ell("dkgreen", 7, 21, 6, 5); P.ell("dkgreen", 33, 21, 6, 5);
      P.ell("green", 12, 9, 6, 4); P.ell("green", 29, 8, 5, 3.5); P.ell("green", 5, 19, 3, 2.5); P.ell("green", 35, 19, 3, 2.5);
      P.poly("brown", [[15, 39], [17, 22], [23, 22], [25, 39]]); P.poly("brown", [[12, 39], [17, 35], [23, 35], [28, 39]]);
      P.rect("tan", 12, 14, 28, 22);
      P.poly("red", [[9.5, 15], [20, 6.5], [30.5, 15]]);
      P.rect("brown", 21, 16, 25, 22); P.rect("dkgreen", 14, 16, 18, 19.5);
      P.rect("tan", 9, 22, 31, 24.5);
      P.outline("ink");
      P.on("ink", "tan", (x, y) => y > 22 && fl(x) % 3 === 0);
      for (const lx of [27, 30]) P.rect("ink", lx, 24, lx + 1, 38);
      for (let ly = 26; ly < 38; ly += 3) P.rect("ink", 27, ly, 31, ly + 1);
    }, 40) },
    { tier: 2, name: "greenhouse", make: () => picture(["cyan", "white", "green", "red", "maroon", "ink"], P => {
      const glass = (x, y) => (x >= 5 && x < 31 && y >= 14 && y < 28) || (y < 14.5 && y > 5 + Math.abs(x - 18) * 0.7);
      P.when("cyan", glass);
      for (const [px, py, r] of [[8.5, 24, 3], [14, 23, 3.5], [20.5, 24, 3], [26.5, 23, 3.5]]) P.ell("green", px, py, r * 0.8, r + 1);
      for (const [tx, ty] of [[13, 21], [15, 24], [26, 21], [27.5, 24.5], [8, 23]]) P.ell("red", tx, ty, 1, 1);
      P.on("white", ["cyan", "green", "red"], (x, y) => [11, 18, 24].includes(fl(x)) || fl(y) === 19 || fl(y) === 14);
      P.rect("maroon", 4, 28, 32, 32);
      P.outline("ink");
      P.on("ink", "maroon", (x, y) => mortar(x, y - 0.5, 2, 4));
    }, 36) },
    { tier: 2, name: "garden gazebo", make: () => picture(["teal", "white", "tan", "grey", "ink"], P => {
      P.when("teal", (x, y) => y < 16 && y > 4 + (Math.abs(x - 18) / 14) ** 1.6 * 11);
      P.rect("teal", 16.5, 1, 19.5, 5); P.ell("teal", 18, 1.5, 2, 1.5);
      P.rect("white", 5, 15.5, 31, 18);
      for (const px of [6, 13, 20, 27]) P.rect("white", px, 18, px + 3, 30);
      P.rect("tan", 3, 29, 33, 32);
      P.rect("grey", 12, 32, 24, 35);
      P.outline("ink");
      P.on("ink", "teal", (x, y) => y > 6 && (fl(x) - 18) % 4 === 0);
      P.rect("white", 9, 23, 13, 24); P.rect("white", 23, 23, 27, 24);
      P.rect("white", 9, 26, 13, 27); P.rect("white", 23, 26, 27, 27);
      P.on("ink", "grey", (x, y) => fl(y) === 33);
    }, 36) },
    { tier: 2, name: "thatched cottage", make: () => picture(["gold", "white", "brown", "sky", "green", "pink", "ink"], P => {
      P.rect("white", 6, 17, 30, 30);
      P.when("gold", (x, y) => y < 20 && ((x - 18) / 15) ** 2 + ((y - 20) / 13) ** 2 <= 1);
      P.on("brown", "gold", (x, y) => fl(y) % 3 === 0 && (fl(x) + fl(y)) % 4 < 2);
      P.rect("brown", 22, 3, 25, 9);
      P.rect("sky", 9, 21, 13.5, 25); P.rect("sky", 22.5, 21, 27, 25);
      P.rect("brown", 16, 22, 20, 30);
      P.ell("green", 5, 29, 4.5, 3); P.ell("green", 31, 29, 4.5, 3);
      P.outline("ink");
      P.rect("ink", 11, 21, 12, 25); P.rect("ink", 9, 23, 13.5, 24); P.rect("ink", 24.5, 21, 25.5, 25); P.rect("ink", 22.5, 23, 27, 24);
      for (const [fx, fy] of [[3, 28], [6, 27], [5, 30], [29, 28], [32, 27], [31, 30]]) P.rect("pink", fx, fy, fx + 2, fy + 2);
    }, 36) },
    { tier: 3, name: "clock tower", make: () => picture(["tan", "teal", "white", "gold", "brown", "ink"], P => {
      P.rect("tan", 14, 12, 26, 39); P.rect("tan", 12, 33, 28, 39); P.rect("tan", 12.5, 9.5, 27.5, 13);
      P.poly("teal", [[11.5, 10.5], [20, 1], [28.5, 10.5]]);
      P.ell("gold", 20, 19.5, 5.6, 5.6); P.ell("white", 20, 19.5, 4.3, 4.3);
      P.rect("brown", 18.5, 27.5, 21.5, 31); P.ell("brown", 20, 27.5, 1.5, 1.5);
      P.rect("brown", 17, 35, 23, 39); P.ell("brown", 20, 35, 3, 2.5);
      P.outline("ink");
      P.rect("ink", 13, 12, 27, 13); P.rect("ink", 13, 33, 27, 34);
      P.line("ink", 20, 19.5, 20, 16, 1); P.line("ink", 20, 19.5, 23, 21, 1);
      for (const [tx, ty] of [[19.5, 15.5], [19.5, 23], [16, 19], [23.5, 19]]) P.rect("ink", tx, ty, tx + 1, ty + 1);
    }, 40) },
    { tier: 3, name: "timbered inn", make: () => picture(["white", "brown", "red", "yellow", "pink", "green", "ink"], P => {
      P.rect("white", 7, 26, 37, 41); P.rect("white", 5, 15, 39, 26);
      P.poly("red", [[2, 16], [11, 4], [33, 4], [42, 16]]);
      for (const bx of [5.5, 14, 22, 30, 38.5]) P.rect("brown", bx - 0.7, 15, bx + 0.7, 26);
      P.rect("brown", 5, 24.5, 39, 26); P.rect("brown", 5, 15, 39, 16.3);
      for (const [a, b] of [[6, 14], [22, 30]]) { P.line("brown", a, 24.5, b - 1, 16.5, 1.2); }
      for (const [a, b] of [[14, 22], [30, 38]]) { P.line("brown", a + 1, 16.5, b, 24.5, 1.2); }
      for (const wx of [8, 16.5, 24.5, 32]) P.rect("yellow", wx, 18, wx + 3.5, 22.5);
      P.rect("yellow", 9, 29, 15, 34); P.rect("yellow", 29, 29, 35, 34);
      P.rect("green", 8.5, 34, 15.5, 35.5); P.rect("green", 28.5, 34, 35.5, 35.5);
      P.rect("brown", 19, 30, 25, 41); P.ell("brown", 22, 30, 3, 2);
      P.outline("ink");
      for (const [wx, wy, w, h] of [[8, 18, 3.5, 4.5], [16.5, 18, 3.5, 4.5], [24.5, 18, 3.5, 4.5], [32, 18, 3.5, 4.5], [9, 29, 6, 5], [29, 29, 6, 5]]) {
        P.rect("ink", wx + w / 2 - 0.5, wy, wx + w / 2 + 0.5, wy + h); P.rect("ink", wx, wy + h / 2 - 0.5, wx + w, wy + h / 2 + 0.5);
      }
      for (const fx of [9, 13, 29, 33]) P.rect("pink", fx, 32, fx + 2, 34);
    }, 44) },
    { tier: 3, name: "adobe houses", make: () => picture(["tan", "orange", "peach", "brown", "green", "ink"], P => {
      P.rect("tan", 3, 25, 23, 41); P.rect("orange", 20, 19, 41, 41); P.rect("peach", 9, 13, 27, 25); P.rect("tan", 27, 9, 37, 19);
      P.ell("green", 4, 38, 2.5, 3.5);
      P.outline("ink", true);
      for (const [a, b, c, d] of [[6, 31, 9, 36], [14, 34, 18, 41], [12, 17, 15, 21], [20, 17, 23, 21], [25, 25, 28, 30], [31, 24, 34, 29], [28, 34, 32, 41], [30, 12, 33, 16]]) P.rect("ink", a, b, c, d);
      for (const [vx, vy] of [[5, 25], [10, 25], [15, 25], [11, 13], [16, 13], [21, 13], [23, 19], [29, 19], [35, 19], [29, 9], [34, 9]]) P.rect("brown", vx, vy - 1, vx + 2, vy + 0.5);
      P.rect("ink", 36, 16, 37, 41); P.rect("ink", 39, 16, 40, 41);
      for (let ry = 18; ry < 41; ry += 3) P.rect("ink", 36, ry, 40, ry + 1);
      P.ell("green", 4, 38, 1.5, 2.5);
    }, 44) },
    { tier: 3, name: "stilt house", make: () => picture(["gold", "brown", "tan", "blue", "white", "ink"], P => {
      P.ell("blue", 20, 36, 19, 4);
      for (const sx of [9, 16, 23, 30]) P.rect("brown", sx, 24, sx + 2.5, 37);
      P.rect("tan", 5, 22, 35, 25);
      P.rect("tan", 9, 13, 31, 22);
      P.on("brown", "tan", (x, y) => y < 22 && fl(x) % 3 === 0);
      P.rect("brown", 17, 15, 22, 22); P.rect("brown", 25, 15, 29, 19);
      P.poly("gold", [[4, 15], [20, 2], [36, 15]]);
      P.on("brown", "gold", (x, y) => fl(y) % 3 === 0 && (fl(x) + fl(y)) % 4 < 2);
      P.outline("ink");
      P.on("white", "blue", (x, y) => fl(y) % 2 === 1 && (fl(x) + fl(y)) % 6 < 3 && y > 34);
      for (const lx of [4, 7]) P.rect("ink", lx, 25, lx + 1, 36);
      for (let ly = 27; ly < 36; ly += 3) P.rect("ink", 4, ly, 8, ly + 1);
    }, 40) },
    { tier: 3, name: "observatory", make: () => picture(["white", "grey", "tan", "blue", "ink"], P => {
      const dome = (x, y) => y < 26.5 && Math.hypot(x - 22, y - 26.5) <= 13;
      P.rect("tan", 8, 26, 36, 41); P.rect("grey", 5, 40, 39, 43);
      P.when("white", dome);
      P.on("grey", "white", (x, y) => Math.hypot(x - 25, y - 23.5) > 13);
      P.when("blue", (x, y) => dome(x, y) && Math.abs(x - 24 - (26.5 - y) * 0.2) < 1.8);
      P.line("grey", 25, 18, 35, 4, 3.6); P.ell("grey", 35, 4, 2.3, 2.3);
      P.rect("blue", 12, 30, 15, 35); P.rect("blue", 29, 30, 32, 35);
      P.rect("blue", 19, 32, 25, 40); P.ell("blue", 22, 32, 3, 2.5);
      P.outline("ink");
      P.on("ink", "tan", (x, y) => fl(y) === 27 || fl(y) === 28);
    }, 44) },
    { tier: 3, name: "bakery", make: () => picture(["pink", "brown", "red", "white", "sky", "tan", "ink"], P => {
      P.rect("pink", 4, 4, 40, 42); P.rect("brown", 3, 2, 41, 6);
      P.rect("sky", 9, 9, 17, 16); P.rect("sky", 27, 9, 35, 16);
      P.rect("brown", 8, 16, 18, 17.5); P.rect("brown", 26, 16, 36, 17.5);
      P.when("red", (x, y) => x >= 3 && x < 41 && y >= 19 && y < 24 + (Math.abs(((x - 3) % 4) - 2) < 1.5 ? 1 : 0));
      P.on("white", "red", x => fl((x - 3) / 4) % 2 === 1);
      P.rect("sky", 7, 27, 26, 40);
      P.rect("brown", 7, 33, 26, 34);
      for (const lx of [10, 15.5, 21]) P.ell("tan", lx, 31, 2.4, 1.6);
      for (const lx of [10.5, 19]) P.rell("tan", lx, 37.5, 4, 1.3, 0);
      P.rect("brown", 29, 27, 37, 42);
      P.rect("sky", 31, 29, 35, 34);
      P.outline("ink");
      P.on("ink", "tan", (x, y) => (fl(y) === 31 && fl(x) % 5 === 0) || (fl(y) === 37 && fl(x) % 3 === 0));
      P.rect("ink", 12.5, 9, 13.5, 16); P.rect("ink", 30.5, 9, 31.5, 16);
      P.rect("ink", 35, 36, 36, 37.5);
      for (const [fx] of [[9], [12], [15], [27], [30], [33]]) P.rect("red", fx, 14.5, fx + 2, 16);
    }, 44) },
  );
}
