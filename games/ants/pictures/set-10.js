// Sleep on it / Ants: music, toys, hobbies, fairy tales and space.
// Objects on a transparent background with ink outlines, and full scenes, at varied sizes.
"use strict";
const S10 = (() => {
  const inPoly = (pts, x, y) => {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  // shape tests, (x, y) => true/false, for P.when, edge and the rotated frame T
  const E = (cx, cy, rx, ry = rx) => (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
  const RE = (cx, cy, rx, ry, a) => (x, y) => {
    const u = (x - cx) * Math.cos(a) + (y - cy) * Math.sin(a), v = -(x - cx) * Math.sin(a) + (y - cy) * Math.cos(a);
    return (u / rx) ** 2 + (v / ry) ** 2 <= 1;
  };
  const R = (x0, y0, x1, y1) => (x, y) => x >= x0 && x < x1 && y >= y0 && y < y1;
  const RR = (cx, cy, hx, hy, r) => (x, y) => {                     // rounded rectangle
    const ax = Math.abs(x - cx), ay = Math.abs(y - cy), dx = Math.max(ax - (hx - r), 0), dy = Math.max(ay - (hy - r), 0);
    return ax <= hx && ay <= hy && dx * dx + dy * dy <= r * r;
  };
  const G = pts => (x, y) => inPoly(pts, x, y);
  const L = (x0, y0, x1, y1, w) => (x, y) => {
    const dx = x1 - x0, dy = y1 - y0, t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - x0 - t * dx, y - y0 - t * dy) <= w / 2;
  };
  const RING = (cx, cy, r0, r1) => (x, y) => { const d = Math.hypot(x - cx, y - cy); return d >= r0 && d <= r1; };
  const U = (...fs) => (x, y) => fs.some(f => f(x, y));
  // edge(P, colour, shape): a one-pixel line just inside the border of a shape (outlines objects inside scenes)
  const edge = (P, k, f) => P.when(k, (x, y) => f(x, y) && !(f(x + 1, y) && f(x - 1, y) && f(x, y + 1) && f(x, y - 1)));
  const star = (cx, cy, r, ri = r * 0.45, a0 = -Math.PI / 2) => G(Array.from({ length: 10 }, (_, i) => {
    const a = a0 + i * Math.PI / 5, q = i % 2 ? ri : r; return [cx + Math.cos(a) * q, cy + Math.sin(a) * q];
  }));
  const plus = (P, k, pts) => { for (const [x, y] of pts) { P.rect(k, x - 1, y, x + 2, y + 1); P.rect(k, x, y - 1, x + 1, y + 2); } };
  // T(cx, cy, a): turns a shape drawn around (0, 0) into one rotated by a and centred at (cx, cy)
  const T = (cx, cy, a) => f => (x, y) => f((x - cx) * Math.cos(a) + (y - cy) * Math.sin(a), -(x - cx) * Math.sin(a) + (y - cy) * Math.cos(a));
  return { E, RE, R, RR, G, L, RING, U, edge, star, plus, T };
})();

PICTURES.push(
  // ----- simple -----
  { tier: 1, name: "yo-yo", make: () => picture(["maroon", "red", "white", "yellow", "ink"], P => {
    P.ell("maroon", 14, 12.5, 7.5, 8.5);
    P.ell("red", 10.5, 14.5, 7.5, 8.5);
    P.ell("yellow", 10.5, 14.5, 2.4, 2.6);
    P.outline("ink", true);
    P.when("white", (x, y) => { const d = Math.hypot((x - 10.5) / 7.5, (y - 14.5) / 8.5); return d > 0.55 && d < 0.78 && x < 10 && y < 13.5; });
    P.line("ink", 13, 1, 13, 12, 1.1); P.rect("ink", 11, 0, 16, 1);
  }, 24) },
  { tier: 1, name: "spinning top", make: () => picture(["brown", "orange", "teal", "yellow", "ink"], P => {
    P.rect("brown", 11.5, 1, 16.5, 8);
    P.ell("orange", 14, 12, 11.5, 5.5);
    P.poly("orange", [[2.6, 12], [25.4, 12], [14.8, 24], [13.2, 24]]);
    P.on("teal", "orange", (x, y) => y > 10.5 && y < 14);
    P.on("yellow", "orange", (x, y) => y > 16 && y < 18.5);
    P.outline("ink", true);
    P.line("ink", 14, 23, 14, 27, 1.2);
  }, 28) },
  { tier: 1, name: "dice", make: () => picture(["green", "dkgreen", "white", "red"], P => {
    const { T, RR, E } = S10;
    P.all("green");
    const dice = [[10.5, 22, -0.25, [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]]], [23, 10, 0.35, [[-1, -1], [0, 0], [1, 1]]]];
    for (const [cx, cy, a] of dice) P.when("dkgreen", T(cx + 1.5, cy + 1.8, a)(RR(0, 0, 6.8, 6.8, 2)));
    for (const [cx, cy, a, pips] of dice) {
      const t = T(cx, cy, a);
      P.when("white", t(RR(0, 0, 6.8, 6.8, 2)));
      for (const [u, v] of pips) P.when("red", t(E(u * 3.5, v * 3.5, 1.4)));
    }
  }, 32) },
  { tier: 1, name: "puzzle pieces", make: () => picture(["red", "yellow", "blue", "green", "ink"], P => {
    P.rect("red", 3, 3, 16, 16); P.rect("yellow", 16, 3, 29, 16); P.rect("blue", 3, 16, 16, 29);
    P.ell("red", 18.4, 9.5, 2.9, 2.9);
    P.ell("blue", 9.5, 13.6, 2.9, 2.9);
    P.ell("yellow", 22.5, 18.4, 2.9, 2.9);
    P.ell("none", 13.6, 22.5, 2.9, 2.9);
    P.rect("green", 18.5, 18.5, 31.5, 31.5); P.ell("none", 25, 20.9, 2.9, 2.9);
    P.ell("green", 16.1, 25, 2.9, 2.9);
    P.outline("ink", true);
  }, 32) },
  { tier: 1, name: "drum", make: () => picture(["red", "white", "yellow", "tan", "ink"], P => {
    P.ell("yellow", 16, 26, 11.5, 3.6);
    P.rect("red", 4.5, 12, 27.5, 24); P.ell("red", 16, 23.5, 11.5, 3);
    P.on("yellow", "red", (x, y) => Math.abs(y - (15.5 + Math.abs(((x - 4.5) % 6) - 3) * 2.2)) < 0.9);
    P.ell("yellow", 16, 12.5, 11.5, 4);
    P.ell("white", 16, 11.5, 10.5, 3);
    P.line("tan", 12, 10, 4, 1.5, 2.8); P.line("tan", 20, 10, 28, 1.5, 2.8);
    P.outline("ink");
  }, 32) },
  { tier: 1, name: "wizard hat", make: () => picture(["purple", "blue", "yellow", "ink"], P => {
    P.poly("purple", [[6.5, 24], [25.5, 24], [22, 13], [28, 2.5], [14.5, 8], [10.5, 16]]);
    P.on("blue", "purple", (x, y) => y > 18.5 && y < 22.5);
    P.ell("purple", 16, 24.5, 15, 3.8);
    P.outline("ink", true);
    P.when("yellow", S10.star(15.5, 14, 3.6));
    P.when("yellow", S10.star(21.5, 8.5, 2.3));
    P.rect("yellow", 11, 11, 12, 12); P.rect("yellow", 20, 15, 21, 16);
  }, 32) },
  { tier: 1, name: "crown", make: () => picture(["yellow", "white", "red", "blue", "ink"], P => {
    P.poly("yellow", [[3, 21], [3, 9], [8.5, 15], [14, 6], [19.5, 15], [25, 9], [25, 21]]);
    P.rect("yellow", 3, 17, 25, 24);
    P.ell("white", 3.5, 8, 2.3, 2.3); P.ell("white", 14, 5, 2.3, 2.3); P.ell("white", 24.5, 8, 2.3, 2.3);
    P.outline("ink", true);
    P.on("ink", "yellow", (x, y) => fl(y) === 16);
    P.ell("red", 14, 20.5, 2.2, 2); P.ell("blue", 8, 20.5, 1.7, 1.7); P.ell("blue", 20, 20.5, 1.7, 1.7);
  }, 28) },
  { tier: 1, name: "hourglass 2", make: () => picture(["brown", "sky", "yellow", "ink"], P => {
    const w = y => 1.3 + 5.2 * Math.pow(Math.abs(y - 14) / 9, 0.6);
    P.when("sky", (x, y) => y > 4 && y < 24 && Math.abs(x - 14) < w(y));
    P.when("yellow", (x, y) => y > 8.5 && y < 14 && Math.abs(x - 14) < w(y));
    P.when("yellow", (x, y) => y > 14 && y < 24 && Math.abs(x - 14) < Math.min(w(y), (y - 17.5) * 1.3));
    P.rect("brown", 4, 1, 24, 5); P.rect("brown", 4, 23, 24, 27);
    P.outline("ink", true);
    P.rect("yellow", 13.5, 14, 14.5, 19);
    P.rect("ink", 6, 5, 7, 23); P.rect("ink", 21, 5, 22, 23);
  }, 28) },
  { tier: 1, name: "building blocks", make: () => picture(["red", "blue", "yellow", "green", "ink"], P => {
    P.rect("red", 3, 19, 16, 31); P.rect("blue", 16, 19, 29, 31);
    P.rect("yellow", 9.5, 7, 22.5, 19);
    P.poly("green", [[9.5, 7], [22.5, 7], [16, 0.5]]);
    P.outline("ink", true);
    const frame = (x0, y0, x1, y1) => P.when("ink", (x, y) => x >= x0 && x < x1 && y >= y0 && y < y1 && (x < x0 + 1 || x >= x1 - 1 || y < y0 + 1 || y >= y1 - 1));
    frame(5, 21, 14, 29); frame(18, 21, 27, 29); frame(12, 9, 21, 17);
  }, 32) },
  { tier: 1, name: "music notes", make: () => picture(["pink", "blue", "white", "ink"], P => {
    P.rell("pink", 6, 15.5, 3.6, 2.7, -0.4); P.rect("pink", 7.5, 2, 10.5, 15);
    P.poly("pink", [[10, 2], [15, 7], [14.5, 12.5], [12.5, 8.5], [10, 8]]);
    P.rell("blue", 13, 28, 3.6, 2.7, -0.4); P.rell("blue", 25, 25, 3.6, 2.7, -0.4);
    P.rect("blue", 14.5, 11, 17.5, 28); P.rect("blue", 26.5, 8, 29.5, 25);
    P.poly("blue", [[14.5, 11], [29.5, 8], [29.5, 12.5], [14.5, 15.5]]);
    P.outline("ink", true);
    P.rect("white", 4, 14, 6, 16); P.rect("white", 11, 26, 13, 28); P.rect("white", 23, 23, 25, 25);
  }, 32) },
  { tier: 1, name: "magic wand", make: () => picture(["purple", "ink", "white", "yellow", "pink"], P => {
    P.all("purple");
    S10.plus(P, "white", [[5, 5], [26, 26], [5, 17], [28, 4], [13, 3], [17, 28], [28, 19]]);
    for (const [x, y] of [[28, 13], [25, 21], [12, 10], [17, 21]]) P.rect("pink", x, y, x + 2, y + 2);
    P.line("ink", 5, 28, 18, 15, 2.6);
    P.line("white", 4.5, 28.5, 7, 26, 2.6);
    P.when("yellow", S10.star(21, 11, 7, 3, -Math.PI / 2 + 0.2));
  }, 32) },
  { tier: 1, name: "comet", make: () => picture(["navy", "orange", "yellow", "white", "purple"], P => {
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [13, 3], [29, 20], [10, 16], [18, 28], [29, 2], [4, 24]]);
    P.ell("purple", 26, 26, 4, 4);
    P.poly("orange", [[18.5, 6], [28, 14], [3, 30]]);
    P.poly("yellow", [[20.5, 8.5], [25.5, 12.5], [9, 24.5]]);
    P.ell("white", 23.5, 9.5, 3.8, 3.8);
  }, 32) },
  { tier: 1, name: "ringed planet", make: () => picture(["navy", "orange", "yellow", "lilac", "white"], P => {
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [27, 5], [5, 27], [26, 27], [15, 2], [2, 15]]);
    const a = -0.35;
    const ring = front => (x, y) => {
      const u = (x - 16) * Math.cos(a) + (y - 16) * Math.sin(a), v = -(x - 16) * Math.sin(a) + (y - 16) * Math.cos(a);
      return (u / 14.5) ** 2 + (v / 4.6) ** 2 <= 1 && (u / 10.5) ** 2 + (v / 2.6) ** 2 > 1 && (front ? v > 0 : v <= 0);
    };
    P.when("lilac", ring(false));
    P.ell("orange", 16, 16, 8, 8);
    P.on("yellow", "orange", (x, y) => { const v = -(x - 16) * Math.sin(a) + (y - 16) * Math.cos(a); return Math.abs(v - 3) < 1 || Math.abs(v + 3.5) < 0.9; });
    P.when("lilac", ring(true));
  }, 32) },
  { tier: 1, name: "little ghost", make: () => picture(["purple", "lilac", "white", "ink", "pink", "yellow"], P => {
    P.all("purple");
    S10.plus(P, "yellow", [[4, 4], [27, 5], [28, 17], [3, 15], [11, 2]]);
    P.ell("lilac", 5, 36, 13, 7); P.ell("lilac", 28, 37, 13, 7.5);
    P.ell("white", 16, 12.5, 8.5, 8.5); P.rect("white", 7.5, 12.5, 24.5, 24);
    P.when("white", (x, y) => x > 7.5 && x < 24.5 && y >= 24 && y < 25.5 + 1.8 * Math.cos((x - 7.5) * Math.PI / 2.83));
    P.rell("white", 6, 17, 2, 3.6, 0.6); P.rell("white", 26, 16, 2, 3.6, -0.6);
    P.ell("ink", 13, 12.5, 1.5, 2.1); P.ell("ink", 19, 12.5, 1.5, 2.1); P.ell("ink", 16, 18, 1.7, 1.4);
    P.ell("pink", 10.8, 16.5, 1.8, 1.1); P.ell("pink", 21.2, 16.5, 1.8, 1.1);
  }, 32) },
  { tier: 1, name: "flying saucer", make: () => picture(["navy", "white", "dkgreen", "yellow", "cyan", "grey", "red"], P => {
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [27, 3], [5, 20], [28, 22], [14, 2]]);
    P.ell("dkgreen", 16, 37, 22, 8.5);
    P.poly("yellow", [[12, 18], [20, 18], [26, 30.5], [6, 30.5]]);
    P.when("cyan", (x, y) => ((x - 16) / 5.5) ** 2 + ((y - 13) / 5.5) ** 2 <= 1 && y < 13.5);
    P.ell("grey", 16, 15.5, 12.5, 3.6);
    for (const lx of [8, 12, 16, 20, 24]) P.ell("red", lx, 15.8, 1.1, 1);
  }, 32) },
  { tier: 1, name: "paper boat", make: () => picture(["sky", "yellow", "white", "grey", "blue", "teal"], P => {
    P.all("sky"); P.ell("yellow", 25, 6, 3.4, 3.4); P.ell("white", 7, 7, 4, 1.6); P.ell("white", 10, 5.8, 2.6, 1.4);
    P.rect("blue", 0, 23, 32, 32);
    P.when("teal", (x, y) => y > 24 && fl(y) % 3 === 1 && (fl(x) + fl(y) * 2) % 7 < 3);
    P.poly("white", [[3, 19], [29, 19], [23, 25.5], [9, 25.5]]);
    P.poly("white", [[9, 19.5], [16, 5], [23, 19.5]]);
    P.poly("grey", [[16, 5], [23, 19.5], [16, 19.5]]);
    P.poly("grey", [[16, 19], [29, 19], [23, 25.5], [16, 25.5]]);
  }, 32) },
  { tier: 1, name: "kite 2", make: () => picture(["sky", "white", "green", "brown", "red", "yellow"], P => {
    P.all("sky"); P.ell("white", 7, 8, 4.5, 1.9); P.ell("white", 10, 6.6, 3, 1.8); P.ell("white", 28, 19, 3.5, 1.5);
    P.rect("green", 0, 28.5, 32, 32);
    P.line("brown", 19.5, 11.5, 4, 29, 0.9);
    const tx = y => 20 + Math.sin(y * 0.7) * 1.5 + (y - 22) * 0.3;
    P.when("brown", (x, y) => y > 22 && y < 31 && Math.abs(x - tx(y)) < 0.55);
    P.poly("red", [[19.5, 1.5], [28, 11], [19.5, 23], [11, 11]]);
    P.on("yellow", "red", (x, y) => (x < 19.5) === (y < 11));
    for (const [by, k] of [[25.5, "yellow"], [29.5, "red"]]) { const bx = tx(by); P.poly(k, [[bx - 2.6, by - 1.6], [bx + 2.6, by + 1.6], [bx + 2.6, by - 1.6], [bx - 2.6, by + 1.6]]); }
  }, 32) },
  { tier: 1, name: "beach ball", make: () => picture(["sky", "teal", "tan", "red", "yellow", "blue", "white"], P => {
    P.all("sky"); P.rect("teal", 0, 13, 32, 19); P.rect("tan", 0, 19, 32, 32);
    P.ell("white", 25, 5, 4, 1.6); P.ell("white", 6, 7.5, 3.5, 1.4);
    const t = S10.T(16, 20, 0.35), r = 9.3;
    const lune = (u, v) => fl((Math.asin(Math.max(-1, Math.min(1, u / Math.sqrt(Math.max(0.01, r * r - v * v))))) + Math.PI / 2) / (Math.PI / 4));
    P.when("red", t((u, v) => u * u + v * v <= r * r && lune(u, v) % 4 === 0));
    P.when("yellow", t((u, v) => u * u + v * v <= r * r && lune(u, v) % 4 === 1));
    P.when("blue", t((u, v) => u * u + v * v <= r * r && lune(u, v) % 4 === 2));
    P.when("white", t((u, v) => u * u + v * v <= r * r && lune(u, v) % 4 === 3));
    P.when("white", t(S10.E(0, -r + 1.5, 2.6, 2)));
  }, 32) },
  // ----- medium -----
  { tier: 2, name: "guitar", make: () => picture(["brown", "orange", "tan", "grey", "ink"], P => {
    P.rect("brown", 16, 1, 24, 7); P.rect("brown", 17, 6, 23, 16);
    P.ell("orange", 20, 19.5, 8.5, 7); P.ell("orange", 20, 30, 12, 9);
    P.when("tan", S10.RING(20, 21.5, 2.9, 4.6));
    P.rect("brown", 15, 30.5, 25, 33.5);
    P.outline("ink", true);
    P.ell("ink", 20, 21.5, 2.8, 2.8);
    P.on("ink", "brown", (x, y) => y > 7 && y < 16 && fl(y) % 3 === 0);
    P.when("grey", (x, y) => (fl(x) === 19 || fl(x) === 21) && y > 3 && y < 31);
    for (const py of [2, 4]) { P.rect("ink", 14, py, 16, py + 1); P.rect("ink", 24, py, 26, py + 1); }
  }, 40) },
  { tier: 2, name: "violin", make: () => picture(["orange", "brown", "tan", "white", "ink"], P => {
    P.ell("orange", 17, 18, 7.5, 6.5); P.ell("orange", 17, 31, 8.5, 7);
    P.rect("orange", 11, 18, 23, 31);
    P.ell("none", 8.3, 24.5, 3.3, 3.5); P.ell("none", 25.7, 24.5, 3.3, 3.5);
    P.rect("brown", 15, 4, 19, 13); P.ell("brown", 17, 3.2, 2.8, 2.8);
    P.outline("ink", true);
    P.rect("ink", 16, 7, 18, 26);
    P.line("ink", 12.5, 22.5, 13, 27.5, 0.9); P.line("ink", 21.5, 22.5, 21, 27.5, 0.9);
    P.rect("tan", 12.5, 27, 21.5, 29);
    P.poly("ink", [[15.5, 31], [18.5, 31], [18, 36], [16, 36]]);
    P.line("brown", 29, 38, 36, 3, 1.4); P.line("white", 31, 37, 37.5, 5, 1.2);
    P.rect("ink", 28, 34, 31, 38);
  }, 40) },
  { tier: 2, name: "trumpet", make: () => picture(["yellow", "orange", "white", "ink"], P => {
    P.poly("yellow", [[25, 17], [37, 9.5], [37, 30.5], [25, 23]]);
    P.ell("yellow", 37, 20, 2.5, 10.5);
    P.rect("yellow", 4, 17, 27, 22);
    P.rect("yellow", 1, 17.5, 5, 21.5);
    P.rect("yellow", 7, 24, 25, 29); P.rect("yellow", 7, 21, 10, 29); P.rect("yellow", 22, 21, 25, 29); P.rect("none", 10, 25.5, 22, 27.5);
    for (const vx of [12.5, 16.5, 20.5]) P.rect("orange", vx - 1.5, 11, vx + 1.5, 26);
    P.outline("ink", true);
    for (const vx of [12.5, 16.5, 20.5]) { P.rect("ink", vx - 2, 10, vx + 2, 11); P.rect("white", vx - 2, 7, vx + 2, 10); P.rect("ink", vx - 2, 6, vx + 2, 7); }
    P.ell("orange", 37.5, 20, 1.2, 8.5);
    P.line("white", 27, 17.5, 35, 12.5, 1);
  }, 40) },
  { tier: 2, name: "teddy bear 2", make: () => picture(["brown", "tan", "red", "ink"], P => {
    P.ell("brown", 9, 6.5, 4, 4); P.ell("brown", 27, 6.5, 4, 4);
    P.rell("brown", 7.5, 22.5, 3.5, 5.5, 0.7); P.rell("brown", 28.5, 22.5, 3.5, 5.5, -0.7);
    P.ell("brown", 11, 31.5, 5, 4); P.ell("brown", 25, 31.5, 5, 4);
    P.ell("brown", 18, 26, 9, 8.5);
    P.ell("brown", 18, 13, 9.5, 8.5);
    P.ell("tan", 9, 6.5, 2, 2); P.ell("tan", 27, 6.5, 2, 2);
    P.ell("tan", 18, 16, 4.5, 3.3); P.ell("tan", 18, 28, 5, 5);
    P.ell("tan", 11, 32, 2.8, 2.5); P.ell("tan", 25, 32, 2.8, 2.5);
    P.poly("red", [[18, 21.5], [12.5, 18.5], [12.5, 24.5]]); P.poly("red", [[18, 21.5], [23.5, 18.5], [23.5, 24.5]]);
    P.outline("ink", true);
    P.ell("red", 18, 21.5, 1.6, 1.6);
    P.rect("ink", 13.5, 11, 15.5, 13); P.rect("ink", 20.5, 11, 22.5, 13);
    P.ell("ink", 18, 15, 1.7, 1.2); P.rect("ink", 17.5, 15, 18.5, 18);
  }, 36) },
  { tier: 2, name: "rocking horse", make: () => picture(["tan", "brown", "red", "blue", "ink"], P => {
    P.when("blue", (x, y) => { const d = Math.hypot(x - 20, y + 12); return d > 43.5 && d < 47.5 && x > 1 && x < 39; });
    for (const [a, b, c, d] of [[12, 21, 8, 30.5], [16, 22, 15, 33], [25, 22, 26, 33], [29, 21, 33, 30.5]]) P.line("tan", a, b, c, d, 3);
    P.poly("brown", [[10, 17], [5, 16.5], [3, 26], [6.5, 24], [9.5, 21]]);
    P.ell("tan", 20, 19, 10.5, 4.8);
    P.poly("tan", [[24, 18], [27, 8], [32, 6.5], [31, 19]]);
    P.rell("tan", 34, 10.5, 5.8, 3, 0.7);
    P.poly("tan", [[27.5, 7], [28.5, 2], [31, 6.5]]);
    P.line("brown", 27.5, 6, 23.5, 17, 3);
    P.poly("red", [[14, 15], [23, 15], [22, 20.5], [15, 20.5]]);
    P.outline("ink", true);
    P.rect("ink", 31, 8, 33, 10);
    P.rect("ink", 36, 13, 37, 14);
  }, 40) },
  { tier: 2, name: "chess knight", make: () => picture(["lilac", "brown", "tan", "white", "grey", "ink"], P => {
    const { U, G, R, E, edge } = S10;
    P.all("lilac");
    P.when("brown", (x, y) => y >= 26 && (fl(x / 6) + fl((y - 26) / 5)) % 2 === 0);
    P.when("tan", (x, y) => y >= 26 && (fl(x / 6) + fl((y - 26) / 5)) % 2 === 1);
    const knight = U(G([[10, 24], [20, 24], [20, 19], [22, 15], [21, 10], [17, 5], [15, 3], [13.5, 6], [10, 8], [5.5, 13], [6, 17], [9, 16.5], [12, 18], [10, 21]]), R(9, 23, 21, 27), R(7.5, 26.5, 22.5, 31));
    P.when("white", knight);
    P.on("grey", "white", (x, y) => x > 17 && y < 24 && y > 8);
    P.on("grey", "white", (x, y) => y >= 26.5 && y < 28);
    edge(P, "ink", knight);
    P.rect("ink", 12, 9, 14, 11); P.rect("ink", 7, 14, 8, 15);
    const pawn = U(R(24, 27, 34, 31), G([[25.5, 27.5], [32.5, 27.5], [30, 19], [28, 19]]), R(25.5, 18, 32.5, 20), E(29, 15.5, 3, 3));
    P.when("ink", pawn);
    P.rell("grey", 27.8, 14.5, 0.8, 1.4, 0.5);
  }, 36) },
  { tier: 2, name: "treasure chest", make: () => picture(["blue", "white", "tan", "dkgreen", "grey", "yellow", "brown", "red"], P => {
    P.all("blue");
    for (const [x, y, r] of [[6, 6, 1.4], [8, 2.5, 1], [30, 9, 1.2], [31, 4, 1.6]]) P.ell("white", x, y, r, r);
    for (const b of [3, 33]) P.when("dkgreen", (x, y) => y > 14 && y < 32 && Math.abs(x - (b + Math.sin(y * 0.6) * 1.2)) < 1);
    P.when("tan", (x, y) => y > 30 + Math.sin(x * 0.35) * 1.2);
    P.poly("brown", [[8, 15], [28, 15], [29.5, 4], [6.5, 4]]);
    P.poly("grey", [[6.5, 4], [29.5, 4], [29.3, 6], [6.7, 6]]);
    P.poly("grey", [[9.5, 4], [12, 4], [12.3, 15], [10.2, 15]]); P.poly("grey", [[24, 4], [26.5, 4], [25.8, 15], [23.7, 15]]);
    for (const [x, y, rx, ry] of [[18, 17.5, 10, 3.5], [12.5, 15, 3.2, 2.6], [17.5, 13.8, 3.6, 3], [23, 14.8, 3.4, 2.6]]) P.ell("yellow", x, y, rx, ry);
    P.when("white", (x, y) => Math.abs(y - (12.5 + ((x - 18) / 6) ** 2 * 3)) < 0.6 && Math.abs(x - 18) < 6 && fl(x) % 2 === 0);
    P.rect("brown", 7, 18, 29, 31);
    P.rect("grey", 7, 18, 29, 20); P.rect("grey", 10, 18, 12.5, 31); P.rect("grey", 23.5, 18, 26, 31);
    P.rect("grey", 16, 21, 20, 26); P.rect("brown", 17.5, 22.5, 18.5, 24.5);
    P.ell("red", 21.5, 14, 1.8, 1.6); P.ell("red", 14, 15.5, 1.5, 1.3);
    for (const [x, y] of [[31.5, 31.5], [4, 33], [33, 34]]) P.ell("yellow", x, y, 1.8, 1.2);
  }, 36) },
  { tier: 2, name: "telescope", make: () => picture(["navy", "white", "yellow", "dkgreen", "brown", "red", "grey"], P => {
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [12, 8], [21, 3], [33, 15], [5, 18], [26, 20], [14, 2]]);
    P.when("yellow", S10.star(30, 6, 3.6));
    P.ell("dkgreen", 18, 46, 30, 12.5);
    for (const [a, b] of [[9, 34], [17, 35], [25, 34]]) P.line("brown", 17, 21, a, b, 1.7);
    P.line("red", 9, 26, 24, 12.5, 4.6);
    P.line("grey", 23, 13.4, 25.6, 11, 5.6);
    P.line("grey", 6.2, 28.6, 8.6, 26.4, 2.4);
    P.line("grey", 15.6, 19.9, 16.8, 18.8, 5);
    P.ell("grey", 17, 21, 1.8, 1.8);
  }, 36) },
  { tier: 2, name: "globe", make: () => picture(["gold", "blue", "green", "brown", "white", "ink"], P => {
    P.when("gold", (x, y) => { const d = Math.hypot(x - 17, y - 15); return d > 12.2 && d < 14.8 && x > 14; });
    P.ell("blue", 17, 15, 11, 11);
    const { U, E } = S10;
    const land = U(E(12, 10, 4, 3), E(10, 14, 2.5, 4), E(21.5, 9, 3.5, 2.2), E(23, 13, 2.5, 3), E(19, 21, 4, 3), E(11, 22, 2, 1.5));
    P.on("green", "blue", land);
    P.rect("brown", 15, 28, 20, 32);
    P.ell("brown", 17.5, 33, 9, 2.6);
    P.outline("ink", true);
    P.rell("white", 11.5, 7.5, 1, 2.6, 0.9);
  }, 36) },
  { tier: 2, name: "fishing rod", make: () => picture(["sky", "white", "blue", "green", "dkgreen", "brown", "red", "orange"], P => {
    P.all("sky"); P.ell("white", 8, 6, 4.5, 1.7); P.ell("white", 12, 4.8, 3, 1.5);
    P.rect("blue", 0, 17, 36, 36);
    P.when("white", (x, y) => { const d = Math.hypot((x - 29) / 2.4, y - 24.5); return Math.abs(d - 2.6) < 0.4 && y > 24; });
    P.ell("orange", 21, 30, 3.5, 1.8); P.poly("orange", [[17.5, 30], [15, 28], [15, 32]]);
    P.poly("green", [[0, 36], [0, 23], [8, 21.5], [15, 26], [19, 36]]);
    for (const [a, b, c] of [[3, 22, 2], [6, 22, 1], [13, 25, 1.8]]) P.line("dkgreen", a, b, a + c, b - 7, 1);
    P.line("brown", 4, 30, 27, 5, 1.6);
    P.ell("red", 8, 25.5, 1.5, 1.5);
    P.line("white", 27, 5, 29, 22.5, 0.8);
    P.ell("red", 29, 23, 1.8, 1.8); P.rect("white", 27, 23.5, 31, 25);
  }, 36) },
  { tier: 2, name: "easel and canvas", make: () => picture(["brown", "white", "sky", "green", "yellow", "ink"], P => {
    P.line("brown", 20, 2, 8, 38, 3); P.line("brown", 20, 2, 32, 38, 3); P.line("brown", 20, 6, 20, 38, 3);
    P.rect("white", 9, 7, 31, 27);
    P.rect("brown", 6, 27, 34, 30);
    P.rect("brown", 17.5, 4, 22.5, 8);
    P.outline("ink", true);
    P.rect("sky", 11, 9, 29, 25);
    P.when("green", (x, y) => x >= 11 && x < 29 && y < 25 && y > 19 + 2 * Math.sin((x - 11) * 0.35));
    P.ell("yellow", 24, 13.5, 2.6, 2.6);
  }, 40) },
  { tier: 2, name: "mushroom house", make: () => picture(["sky", "white", "green", "tan", "brown", "yellow", "red", "pink"], P => {
    P.all("sky"); P.ell("white", 30, 4, 4, 1.6);
    P.rect("green", 0, 30, 36, 36);
    P.poly("tan", [[11, 17], [25, 17], [27, 31], [9, 31]]);
    P.poly("tan", [[16, 31], [20, 31], [23, 36], [13, 36]]);
    P.rect("brown", 15, 24, 21, 31); P.ell("brown", 18, 24, 3, 3);
    P.rect("yellow", 19, 27, 20, 28);
    P.ell("yellow", 12.5, 21.5, 1.8, 2); P.ell("yellow", 23.5, 21.5, 1.8, 2);
    P.when("red", (x, y) => ((x - 18) / 16) ** 2 + ((y - 17) / 12) ** 2 <= 1 && y < 18.5);
    for (const [x, y, r] of [[10, 12, 2.2], [18, 8, 2.6], [26, 12, 2.2], [14, 15.5, 1.4], [22, 15.5, 1.4], [5, 15.5, 1.2], [31, 15.5, 1.2]]) P.ell("white", x, y, r, r * 0.85);
    S10.plus(P, "pink", [[4, 32], [8, 33], [29, 32], [33, 33]]);
  }, 36) },
  { tier: 2, name: "satellite", make: () => picture(["navy", "white", "blue", "green", "teal", "grey", "gold"], P => {
    const { R, E, U } = S10;
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [31, 3], [5, 27], [32, 25], [12, 2]]);
    P.ell("blue", 18, 54, 30, 21);
    P.on("green", "blue", U(E(8, 36, 6, 2.5), E(26, 34, 5, 2), E(33, 38, 3, 2)));
    P.rect("teal", 2, 13, 13, 22); P.rect("teal", 23, 13, 34, 22);
    P.on("navy", "teal", (x, y) => fl(x) % 4 === 1 || fl(y) === 17);
    P.rect("grey", 13, 16, 15, 19); P.rect("grey", 21, 16, 23, 19);
    P.rect("gold", 15, 11, 21, 24);
    P.rect("grey", 17.5, 4, 18.5, 9);
    P.when("white", (x, y) => ((x - 18) / 4.5) ** 2 + ((y - 8) / 2.2) ** 2 <= 1 && y > 7.5);
    P.ell("white", 18, 3.5, 1.3, 1.3);
    P.rect("grey", 16, 13, 20, 15);
  }, 36) },
  { tier: 2, name: "jack-in-the-box", make: () => picture(["red", "blue", "yellow", "peach", "white", "grey", "ink"], P => {
    P.rect("red", 7, 22, 29, 35);
    P.poly("blue", [[7, 22], [1.5, 9], [5.5, 7.5], [11, 21]]);
    P.ell("peach", 19, 9, 5.5, 5);
    P.poly("yellow", [[13.5, 6], [24.5, 6], [21, -2]]);
    P.ell("white", 19, 15, 5.5, 1.8);
    P.outline("ink", true);
    P.when("yellow", S10.star(18, 28.5, 5, 2.2));
    for (const [a, b, c, d] of [[16, 22, 23, 20.5], [23, 20.5, 15, 19], [15, 19, 23, 17.5], [23, 17.5, 16, 16.5]]) P.line("grey", a, b, c, d, 1.4);
    P.rect("ink", 16.5, 8, 17.5, 10); P.rect("ink", 20.5, 8, 21.5, 10);
    P.rect("ink", 17, 12, 21, 13); P.ell("red", 15.5, 11, 1.2, 1); P.ell("red", 22.5, 11, 1.2, 1);
  }, 36) },
  { tier: 2, name: "xylophone", make: () => picture(["red", "orange", "yellow", "green", "blue", "purple", "tan", "ink"], P => {
    const cols = ["red", "orange", "yellow", "green", "blue", "purple"];
    cols.forEach((k, i) => P.rect(k, 3 + i * 5, 3 + i * 2, 8 + i * 5, 29 - i * 2));
    P.line("tan", 21, 35, 34, 25, 2.6); P.line("tan", 22, 26, 35, 33, 2.6);
    P.ell("red", 21, 34.5, 2.2, 2.2); P.ell("blue", 22, 26.5, 2.2, 2.2);
    P.outline("ink", true);
    cols.forEach((k, i) => { P.rect("ink", 5 + i * 5, 5.5 + i * 2, 6 + i * 5, 6.5 + i * 2); P.rect("ink", 5 + i * 5, 25.5 - i * 2, 6 + i * 5, 26.5 - i * 2); });
  }, 36) },
  { tier: 2, name: "paint palette", make: () => picture(["tan", "red", "yellow", "blue", "green", "brown", "grey", "ink"], P => {
    P.ell("tan", 16, 16, 14.5, 11);
    P.ell("none", 26.5, 23, 4, 3.5);
    P.ell("none", 9, 20, 2.3, 2.1);
    P.ell("red", 9, 11, 3, 2.6); P.ell("yellow", 15.5, 8.5, 3, 2.6); P.ell("blue", 22.5, 9.5, 3, 2.6); P.ell("green", 26, 15.5, 2.8, 2.5);
    P.line("brown", 31, 31, 22, 23, 3);
    P.line("grey", 22.5, 23.5, 18.5, 19.7, 3.4);
    P.line("red", 18.8, 20, 16.2, 17.5, 2.4);
    P.outline("ink", true);
  }, 32) },
  { tier: 2, name: "harp", make: () => picture(["brown", "gold", "white", "ink"], P => {
    const neck = [[8, 7], [14, 10], [22, 6], [30, 4], [34, 8]];
    const neckY = x => { for (let i = 0; i < neck.length - 1; i++) { const [a, b] = neck[i], [c, d] = neck[i + 1]; if (x >= a && x <= c) return b + (d - b) * (x - a) / (c - a); } return 8; };
    const sbY = x => 37 - (x - 9) * (29 / 24);
    P.line("brown", 9, 37, 33, 8, 5);
    P.line("gold", 8, 8, 8, 36, 4);
    for (let i = 0; i < neck.length - 1; i++) P.line("gold", ...neck[i], ...neck[i + 1], 4);
    P.ell("gold", 8, 5, 2.6, 2.6);
    P.rect("brown", 4, 35, 16, 39);
    P.outline("ink", true);
    for (let sx = 12; sx <= 30; sx += 2) P.when("white", (x, y) => fl(x) === sx && y > neckY(sx + 0.5) + 2 && y < sbY(sx + 0.5) - 2.2);
  }, 40) },
  { tier: 2, name: "magic lamp", make: () => picture(["gold", "orange", "lilac", "white", "ink"], P => {
    P.when("gold", (x, y) => { const d = Math.hypot(x - 8, y - 22); return d > 2.6 && d < 5.4 && x < 10; });
    P.poly("gold", [[24, 22], [33, 15], [35, 16.5], [27, 26]]);
    P.ell("gold", 18, 24, 10, 5.5);
    P.ell("gold", 17, 18.6, 5.5, 2.4);
    P.ell("gold", 17, 15.5, 1.8, 1.8);
    P.rect("gold", 13, 28, 23, 31); P.ell("gold", 18, 31, 7, 1.6);
    P.on("orange", "gold", (x, y) => y > 22.5 && y < 25.6 && x > 8.5 && x < 28);
    P.ell("lilac", 34, 11, 2.5, 2.2); P.ell("lilac", 31, 7, 3, 2.5); P.ell("lilac", 34.5, 3, 2.6, 2.2);
    P.outline("ink", true);
    P.rell("white", 13, 20.5, 1.2, 2.6, 1.1);
  }, 36) },
  { tier: 2, name: "frog prince", make: () => picture(["blue", "teal", "dkgreen", "green", "white", "ink", "yellow", "pink"], P => {
    const { U, E, G, edge } = S10;
    P.all("blue");
    P.when("teal", (x, y) => fl(y) % 4 === 1 && (fl(x) + fl(y) * 3) % 9 < 3);
    P.ell("dkgreen", 18, 28, 15, 5); P.poly("blue", [[18, 28], [34, 25.5], [34, 31]]);
    P.poly("pink", [[3, 26], [5, 20], [7, 26]]); P.poly("pink", [[1, 27], [2, 22], [5, 26.5]]); P.poly("pink", [[9, 27], [8, 22], [5, 26.5]]);
    const frog = U(E(18, 22, 8.5, 6), E(18, 17, 7.5, 5), E(13.5, 12.5, 3.3, 3), E(22.5, 12.5, 3.3, 3), E(9.5, 25.5, 3.5, 2.2), E(26.5, 25.5, 3.5, 2.2));
    P.when("green", frog);
    edge(P, "ink", frog);
    P.ell("white", 13.5, 12.5, 2, 2); P.ell("white", 22.5, 12.5, 2, 2);
    P.rect("ink", 13, 12, 15, 14); P.rect("ink", 22, 12, 24, 14);
    P.when("ink", (x, y) => Math.abs(y - (18.5 + ((x - 18) / 5) ** 2 * 1.4)) < 0.5 && Math.abs(x - 18) < 4.5);
    P.ell("pink", 12.5, 18.5, 1.4, 1); P.ell("pink", 23.5, 18.5, 1.4, 1);
    P.poly("yellow", [[14.5, 10], [14.5, 5.5], [16.3, 7.5], [18, 4], [19.7, 7.5], [21.5, 5.5], [21.5, 10]]);
  }, 36) },
  { tier: 2, name: "knitting basket 2", make: () => picture(["tan", "brown", "pink", "teal", "grey", "ink"], P => {
    P.line("grey", 19.5, 3, 26, 19, 3.2); P.line("grey", 29.5, 3, 23, 19, 3.2);
    P.ell("pink", 12, 15, 7, 7); P.ell("teal", 24.5, 15, 6, 6);
    P.poly("tan", [[4, 20], [32, 20], [29, 34], [7, 34]]);
    P.on("brown", "tan", (x, y) => fl(y) % 5 === 2 || (fl(y) % 5 !== 2 && (fl(x) + (fl((y + 3) / 5) % 2) * 3) % 6 === 0));
    P.rect("brown", 3, 18.5, 33, 21.5);
    P.when("pink", (x, y) => x > 31 && y > 21 && y < 34 && Math.abs(x - (33 + Math.sin(y * 0.7))) < 0.9);
    P.outline("ink");
    P.on("ink", "brown", (x, y) => fl(y) === 18 || fl(y) === 21);
    for (const [cx, cy, r] of [[9, 19, 6], [9, 19, 3.2]]) P.on("ink", "pink", (x, y) => Math.abs(Math.hypot(x - cx, y - cy) - r) < 0.5);
    for (const [cx, cy, r] of [[29, 19, 5.5], [29, 19, 2.8]]) P.on("ink", "teal", (x, y) => Math.abs(Math.hypot(x - cx, y - cy) - r) < 0.5);
    P.ell("ink", 20, 2.5, 1.4, 1.4); P.ell("ink", 29, 2.5, 1.4, 1.4);
  }, 36) },
  // ----- complex -----
  { tier: 3, name: "piano", make: () => picture(["lilac", "tan", "brown", "white", "ink", "red", "yellow", "green"], P => {
    P.all("lilac"); P.rect("tan", 0, 36, 44, 44);
    P.on("brown", "tan", (x, y) => fl(y) === 40 || (y < 40 && fl(x) % 11 === 8) || (y > 40 && fl(x) % 11 === 3));
    P.ell("red", 22, 41, 17, 2.6);
    P.rect("red", 31, 3, 36, 7); P.rell("green", 30.5, 2, 2.8, 1.3, -0.5); P.rell("green", 36.5, 2, 2.8, 1.3, 0.5); P.ell("green", 33.5, 1.5, 1.4, 2);
    P.rect("white", 9, 2.5, 11, 7); P.ell("yellow", 10, 1.2, 1, 1.4); P.rect("yellow", 7.5, 6, 12.5, 7);
    P.rect("brown", 5, 8, 39, 37); P.rect("brown", 4, 7, 40, 9);
    P.rect("ink", 5, 9, 39, 10);
    P.rect("white", 15, 11, 29, 19);
    P.on("ink", "white", (x, y) => (fl(y) === 13 || fl(y) === 16) && x > 16 && x < 28);
    for (const [nx, ny] of [[18, 14], [22, 12], [25, 15], [20, 17]]) P.rect("ink", nx, ny, nx + 2, ny + 1);
    P.rect("ink", 5, 21, 39, 22);
    P.rect("white", 6, 22, 38, 27);
    for (let j = 0; j < 8; j++) {
      const sc = 6 + 4 * j + 3;
      if (j < 7) P.rect("ink", sc, 22, sc + 1, 27);
      if (j < 7 && [0, 1, 3, 4, 5].includes(j % 7)) P.rect("ink", sc - 1, 22, sc + 2, 25);
    }
    P.rect("ink", 5, 27, 39, 28);
    P.when("ink", (x, y) => x >= 8 && x < 36 && y >= 29 && y < 34 && (x < 9 || x >= 35 || y < 30 || y >= 33));
    P.rect("yellow", 19, 34, 21, 37); P.rect("yellow", 23, 34, 25, 37);
  }, 44) },
  { tier: 3, name: "accordion", make: () => picture(["red", "white", "blue", "gold", "ink"], P => {
    const top = x => 9 - 3 * Math.sin(Math.PI * (x - 12) / 20), bot = x => 35 + 3 * Math.sin(Math.PI * (x - 12) / 20);
    P.when("white", (x, y) => x >= 12 && x < 32 && y >= top(x) && y < bot(x));
    P.on("blue", "white", (x, y) => y < top(x) + 2.5 || y >= bot(x) - 2.5);
    P.rect("red", 3, 8, 13, 36); P.rect("red", 31, 8, 41, 36);
    P.rect("gold", 3, 32, 13, 36); P.rect("gold", 31, 32, 41, 36);
    P.outline("ink", true);
    P.on("ink", ["white", "blue"], (x, y) => fl(x) % 3 === 0);
    for (let by = 11; by < 30; by += 4) for (const bx of [5, 9]) P.rect("white", bx, by, bx + 2, by + 2);
    P.rect("white", 33, 10, 39, 31);
    P.on("ink", "white", (x, y) => x >= 33 && fl(y) % 3 === 0);
    for (let j = 0; j < 7; j++) if ([0, 1, 3, 4, 5].includes(j)) P.rect("ink", 33, 11 + j * 3, 36, 13 + j * 3);
  }, 44) },
  { tier: 3, name: "dragon", make: () => picture(["sky", "white", "dkgreen", "green", "yellow", "orange", "purple", "ink"], P => {
    const { E, G, L, U, edge, RING } = S10;
    P.all("sky");
    P.ell("white", 8, 7, 5, 2); P.ell("white", 12, 5.5, 3.5, 1.8); P.ell("white", 20, 10, 4, 1.5);
    P.ell("dkgreen", 24, 58, 34, 16);
    const wing = G([[16, 28], [9, 13], [14, 15.5], [17, 9], [21, 16], [26, 12.5], [25, 25]]);
    const tail = U(L(15, 38, 8, 41.5, 4.5), L(8, 41.5, 4, 37, 4), L(4, 37, 5, 31, 3.4));
    const tip = G([[2, 32], [5, 25.5], [8.5, 32]]);
    const A = [22, 28], B = [29.5, 15];
    const dl = Math.hypot(B[0] - A[0], B[1] - A[1]), d = [(B[0] - A[0]) / dl, (B[1] - A[1]) / dl], n = [d[1], -d[0]];
    const spikes = U(...[0.15, 0.45, 0.75].map(t => { const p = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]; return G([[p[0] - d[0] * 2, p[1] - d[1] * 2], [p[0] + d[0] * 2, p[1] + d[1] * 2], [p[0] - n[0] * 3.4, p[1] - n[1] * 3.4]]); }));
    const horns = U(G([[30, 11], [29, 4.5], [33, 10]]), G([[34, 10], [35.5, 5], [36.5, 10.5]]));
    const body = E(21, 33, 9, 8.5), neck = G([[21, 28], [28, 14.5], [34.5, 17], [29.5, 31]]);
    const head = U(E(33, 14, 6, 4.8), E(39, 16.5, 5, 3.4));
    const legs = U(E(15, 40.5, 4.2, 2.6), E(27, 40.5, 4.2, 2.6), E(29.5, 30.5, 2.3, 3.6));
    const fire = G([[43.5, 17], [48, 13], [46.5, 17.5], [48, 21], [43.5, 18.5]]);
    P.when("purple", wing); P.when("green", tail); P.when("orange", U(tip, spikes, horns, fire));
    P.when("green", U(body, neck, head, legs));
    P.on("yellow", "green", (x, y) => E(25.5, 34, 4.5, 6.5)(x, y) && fl(y) % 3 !== 0);
    P.on("yellow", "orange", (x, y) => x > 44.5 && Math.abs(y - 17.5) < 1.2);
    edge(P, "ink", U(wing, tail, tip, spikes, horns, body, neck, head, legs));
    P.on("ink", "purple", (x, y) => [[16, 28, 14, 15.5], [16, 28, 21, 16]].some(([a, b, c, e]) => L(a, b, c, e, 0.9)(x, y)));
    P.ell("white", 33.5, 12.5, 1.9, 1.9); P.rect("ink", 34, 12, 35, 14);
    P.rect("ink", 41, 15, 42, 16);
    P.when("ink", (x, y) => Math.abs(y - 18.2) < 0.5 && x > 36 && x < 42);
  }, 48) },
  { tier: 3, name: "unicorn", make: () => picture(["sky", "green", "white", "pink", "purple", "yellow", "grey", "ink"], P => {
    const { E, G, L, U, RE, edge } = S10;
    P.all("sky");
    P.when("green", (x, y) => y > 40 + Math.sin(x * 0.25));
    S10.plus(P, "pink", [[5, 44], [20, 45], [40, 44]]); S10.plus(P, "yellow", [[12, 45], [30, 44], [45, 46]]);
    S10.plus(P, "white", [[6, 6], [14, 3], [44, 18]]);
    const body = E(21, 27, 11.5, 6.5);
    const legs = U(L(13.5, 29, 12.5, 42, 3.4), L(18, 31, 18.5, 42.5, 3.4), L(26.5, 31, 27.5, 42.5, 3.4), L(30, 29, 33, 41.5, 3.4));
    const neck = G([[26, 26], [30, 13], [36.5, 12], [35, 27]]);
    const head = U(RE(38.5, 15.5, 6.8, 3.6, 0.6), E(42, 19, 3, 2.6));
    const ear = G([[32.5, 11], [33, 5.5], [36, 10]]);
    const horn = G([[36, 9.5], [43, 1], [39, 11]]);
    const mane = G([[33, 6], [28.5, 9], [25.5, 15], [24, 25], [28, 22.5], [30, 16], [34.5, 11]]);
    const tail = U(L(10.5, 24, 5.5, 29, 4.2), L(5.5, 29, 4.5, 37, 3.8), L(4.5, 37, 7.5, 40, 2.8));
    P.when("white", U(body, legs, neck, head, ear));
    P.on("grey", "white", (x, y) => legs(x, y) && y > 40);
    P.when("pink", U(mane, tail));
    P.on("purple", "pink", (x, y) => fl(x + y) % 5 < 2);
    P.when("yellow", horn);
    edge(P, "ink", U(body, legs, neck, head, ear, horn, mane, tail));
    P.on("ink", "yellow", (x, y) => fl(x - y) % 4 === 0);
    P.rect("ink", 37, 13, 39, 15); P.rect("ink", 43, 19, 44, 20);
    P.ell("pink", 39, 17.5, 1.4, 1);
  }, 48) },
  { tier: 3, name: "fairy-tale tower", make: () => picture(["sky", "white", "green", "dkgreen", "grey", "dkgrey", "purple", "yellow", "brown"], P => {
    P.all("sky");
    P.ell("white", 7, 8, 5, 2); P.ell("white", 10, 6.5, 3, 1.6); P.ell("white", 37, 14, 5, 1.8);
    P.ell("green", 22, 54, 34, 16); P.rect("green", 0, 41, 44, 44);
    P.rect("brown", 5, 34, 7, 40); P.ell("dkgreen", 6, 31, 4.5, 5.5);
    P.rect("brown", 37, 35, 39, 41); P.ell("dkgreen", 38, 32, 4, 5);
    P.poly("grey", [[15, 41], [29, 41], [28, 13], [16, 13]]);
    P.on("dkgrey", "grey", (x, y) => fl(y) % 4 === 0 && (fl(x) + fl(y / 4) * 3) % 6 < 3);
    P.rect("grey", 14, 10, 30, 13.5); P.rect("dkgrey", 14, 13, 30, 14);
    for (const mx of [14, 18.5, 23, 27.5]) P.rect("grey", mx, 8, mx + 2.5, 10);
    P.poly("purple", [[13, 8.5], [31, 8.5], [22, -1]]);
    P.rect("dkgrey", 19, 15, 25, 22); P.ell("dkgrey", 22, 15.5, 3, 2.5);
    P.rect("yellow", 20, 16, 24, 21); P.ell("yellow", 22, 16.3, 2, 1.8);
    P.when("yellow", (x, y) => y > 21 && y < 33 && Math.abs(x - (22 + (fl(y) % 2 ? 0.6 : -0.6))) < 1.3);
    P.poly("purple", [[22, 33], [19.5, 31.5], [19.5, 34.5]]); P.poly("purple", [[22, 33], [24.5, 31.5], [24.5, 34.5]]);
    P.rect("brown", 19.5, 36, 24.5, 41); P.ell("brown", 22, 36, 2.5, 2);
  }, 44) },
  { tier: 3, name: "astronaut", make: () => picture(["navy", "white", "grey", "orange", "blue", "green", "yellow"], P => {
    const { T, R, RR, E, L, U } = S10;
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [15, 3], [40, 22], [30, 40], [6, 20], [40, 34], [24, 41]]);
    P.ell("yellow", 37, 7, 3.6, 3.6);
    P.ell("blue", 3, 43, 14, 14); P.on("green", "blue", U(E(4, 33, 4, 2.5), E(11, 40, 3, 4)));
    P.when("grey", (x, y) => Math.abs(y - (31 + Math.sin(x * 0.5) * 1.2 + (17 - x) * 0.4)) < 0.6 && x > 9 && x < 17);
    const t = T(23, 21, 0.35);
    P.when("grey", t(R(-8, -6, 8, 6)));
    P.when("white", t(U(L(-5, -2, -11, -8, 4), L(5, -1, 11, 4, 4), L(-3, 7, -5, 14.5, 4.6), L(3, 7, 5, 14.5, 4.6))));
    P.when("white", t(RR(0, 1.5, 6, 6.5, 2)));
    P.when("grey", t(U(E(-11.5, -8.5, 2.1), E(11.5, 4.5, 2.1), E(-5.2, 15.8, 2.8, 2.1), E(5.2, 15.8, 2.8, 2.1), R(-3, 0, 3, 3.5))));
    P.when("white", t(E(0, -10, 6.5, 6)));
    P.when("orange", t(E(0.8, -10, 4.6, 3.6)));
    P.when("white", t(E(-1.2, -11.5, 1.2, 0.9)));
    P.when("orange", t(R(-1.5, 1, 1.5, 2.5)));
  }, 44) },
  { tier: 3, name: "moon base", make: () => picture(["navy", "white", "grey", "dkgrey", "cyan", "blue", "green", "red"], P => {
    const { E, U } = S10;
    P.all("navy");
    S10.plus(P, "white", [[4, 4], [14, 9], [22, 3], [29, 12], [6, 17], [44, 22], [3, 26]]);
    P.ell("blue", 38, 9, 5.5, 5.5); P.on("green", "blue", U(E(36, 7, 2.5, 2), E(40, 12, 2, 1.5)));
    P.when("grey", (x, y) => y > 31 + 2.5 * Math.sin(x * 0.13 + 0.5));
    for (const [x, y, rx, ry] of [[8, 43, 4.5, 1.6], [30, 45, 5, 1.7], [43, 39, 3, 1.2], [20, 40, 2.6, 1]]) { P.ell("dkgrey", x, y, rx, ry); P.ell("grey", x, y - 0.8, rx - 0.8, ry * 0.6); }
    P.rect("white", 22, 29, 30, 32.5);
    P.when("white", (x, y) => E(15, 33, 9.5, 9)(x, y) && y < 33);
    P.when("cyan", (x, y) => E(15, 33, 7.5, 7)(x, y) && y < 33);
    P.on("white", "cyan", (x, y) => fl(x) === 15 || fl(y) === 29);
    P.when("white", (x, y) => E(34, 33, 6.5, 6)(x, y) && y < 33);
    P.ell("cyan", 34, 30, 1.8, 1.6);
    P.rect("dkgrey", 5, 32, 25, 33.5); P.rect("dkgrey", 27, 32, 41, 33.5);
    P.rect("grey", 43.5, 20, 44.5, 33); P.when("white", (x, y) => E(44, 20, 3, 1.4)(x, y) && y < 20.5); P.ell("red", 44, 17.5, 1.3, 1.3);
    P.rect("red", 3, 37, 10, 40); P.rect("red", 6, 35, 9, 37);
    P.ell("dkgrey", 4.5, 40.5, 1.5, 1.5); P.ell("dkgrey", 8.5, 40.5, 1.5, 1.5);
  }, 48) },
  { tier: 3, name: "board game", make: () => picture(["brown", "tan", "red", "yellow", "blue", "green", "white", "ink"], P => {
    const { T, RR, E, G, R, U, edge } = S10;
    P.all("brown");
    P.on("ink", "brown", (x, y) => fl(y) % 9 === 4 && fl(x * 0.7 + y) % 13 < 7);
    P.rect("tan", 2, 2, 38, 38);
    edge(P, "ink", R(2, 2, 38, 38));
    const path = [];
    for (let c = 0; c <= 6; c++) path.push([c, 0]);
    for (let r = 1; r <= 6; r++) path.push([6, r]);
    for (let c = 5; c >= 0; c--) path.push([c, 6]);
    for (let r = 5; r >= 2; r--) path.push([0, r]);
    for (let c = 1; c <= 4; c++) path.push([c, 2]);
    for (let r = 3; r <= 4; r++) path.push([4, r]);
    path.push([3, 4]);
    const cols = ["red", "yellow", "blue", "green"];
    path.forEach(([c, r], i) => P.rect(cols[i % 4], 3 + 5 * c, 3 + 5 * r, 7 + 5 * c, 7 + 5 * r));
    P.rect("white", 13, 18, 22, 27);
    P.when("yellow", S10.star(17.5, 22.5, 3.8));
    const pawn = (k, cx, by) => { const f = U(E(cx, by - 7, 1.9), G([[cx - 2.6, by], [cx + 2.6, by], [cx, by - 6.5]])); P.when(k, f); edge(P, "ink", f); };
    pawn("red", 15, 7); pawn("blue", 35, 22); pawn("green", 25, 37);
    const t = T(37, 37, 0.3), die = RR(0, 0, 4.6, 4.6, 1.3);
    P.when("white", t(die)); edge(P, "ink", t(die));
    for (const [u, v] of [[-2, -2], [0, 0], [2, 2]]) P.when("ink", t(E(u, v, 0.8)));
  }, 44) },
  { tier: 3, name: "pumpkin carriage", make: () => picture(["navy", "white", "purple", "orange", "maroon", "yellow", "green"], P => {
    const { E, U, L, RING } = S10;
    P.all("navy");
    S10.plus(P, "white", [[5, 5], [16, 3], [30, 4], [43, 8], [4, 17], [44, 22], [38, 2]]);
    P.when("purple", (x, y) => y > 41 + Math.sin(x * 0.2) * 1.2);
    P.line("green", 24, 11.5, 25, 7, 2); P.when("green", (x, y) => { const d = Math.hypot(x - 28, y - 7); return d > 1.6 && d < 2.8 && y < 8; });
    P.rell("green", 20, 10.5, 3, 1.3, 0.3);
    const body = U(E(24, 24, 14, 11.5), E(14.5, 24.5, 7, 9.5), E(33.5, 24.5, 7, 9.5));
    P.when("orange", body);
    P.on("maroon", "orange", (x, y) => { const s = Math.sqrt(Math.max(0, 1 - ((y - 24) / 12) ** 2)); return [-15, -9, 9, 15].some(k => Math.abs(x - (24 + k * s)) < 0.6); });
    P.when("maroon", RING(24, 23, 4.8, 6.2));
    P.ell("yellow", 24, 23, 4.8, 4.8);
    P.on("maroon", "yellow", (x, y) => fl(x) === 24 || fl(y) === 23);
    P.poly("yellow", [[21, 13], [21, 10], [22.5, 11.5], [24, 9.5], [25.5, 11.5], [27, 10], [27, 13]]);
    P.rect("maroon", 10, 34, 38, 36);
    for (const [cx, cy, r] of [[12, 37, 6.5], [36, 38, 5]]) {
      P.when("yellow", RING(cx, cy, r - 1.6, r));
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4; P.line("yellow", cx - Math.cos(a) * r, cy - Math.sin(a) * r, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0.9); }
      P.ell("maroon", cx, cy, 1.3, 1.3);
    }
  }, 48) },
  { tier: 3, name: "solar system", make: () => picture(["navy", "white", "yellow", "orange", "red", "blue", "tan", "brown", "lilac"], P => {
    P.all("navy");
    P.when("lilac", (x, y) => { const d = Math.hypot(x + 6, y - 26); return [19, 25, 32, 40, 48].some(r => Math.abs(d - r) < 0.5); });
    S10.plus(P, "white", [[20, 3], [30, 44], [44, 44], [10, 44], [26, 26]]);
    P.ell("orange", -2, 26, 13, 15); P.ell("yellow", -2, 26, 10.5, 12.5);
    const at = (r, a) => [-6 + r * Math.cos(a), 26 + r * Math.sin(a)];
    let [x, y] = at(19, -0.75); P.ell("brown", x, y, 1.8, 1.8);
    [x, y] = at(25, 0.45); P.ell("blue", x, y, 2.8, 2.8); P.rect("white", fl(x) - 1, fl(y) - 2, fl(x) + 1, fl(y) - 1);
    [x, y] = at(32, -0.35); P.ell("red", x, y, 2.4, 2.4);
    [x, y] = at(40, 0.18); P.ell("tan", x, y, 5.2, 5.2); P.on("brown", "tan", (u, v) => Math.abs(v - y + 1.5) < 0.8 || Math.abs(v - y - 2) < 0.6);
    [x, y] = at(48, -0.3); const [sx, sy] = [x, y];
    P.when("lilac", (u, v) => { const a = -0.3, p = (u - sx) * Math.cos(a) + (v - sy) * Math.sin(a), q = -(u - sx) * Math.sin(a) + (v - sy) * Math.cos(a); return (p / 7.5) ** 2 + (q / 2.2) ** 2 <= 1 && (p / 5) ** 2 + (q / 1.2) ** 2 > 1 && q <= 0; });
    P.ell("orange", sx, sy, 3.6, 3.6);
    P.when("lilac", (u, v) => { const a = -0.3, p = (u - sx) * Math.cos(a) + (v - sy) * Math.sin(a), q = -(u - sx) * Math.sin(a) + (v - sy) * Math.cos(a); return (p / 7.5) ** 2 + (q / 2.2) ** 2 <= 1 && (p / 5) ** 2 + (q / 1.2) ** 2 > 1 && q > 0; });
  }, 48) },
  { tier: 3, name: "gingerbread house 2", make: () => picture(["lilac", "white", "brown", "tan", "pink", "red", "green", "yellow"], P => {
    P.all("lilac");
    S10.plus(P, "white", [[4, 4], [12, 10], [38, 5], [41, 15], [3, 18], [28, 2]]);
    P.when("white", (x, y) => y > 38 + Math.sin(x * 0.3));
    P.rect("tan", 28, 7, 32, 15); P.rect("white", 27.5, 6, 32.5, 8);
    P.rect("tan", 9, 20, 35, 39);
    P.poly("brown", [[5, 21.5], [22, 6], [39, 21.5]]);
    P.when("white", (x, y) => { const e = Math.abs(x - 22) * (15.5 / 17) + 6; return y >= e + 13.5 && y < e + 14.5 + 1.2 * Math.abs(Math.sin(x * 1.1)) && x > 5 && x < 39; });
    P.when("white", (x, y) => { const e = 6 + Math.abs(x - 22) * (15.5 / 17); return y >= e && y < e + 1.6 && x > 5 && x < 39; });
    for (const [cx, cy, k] of [[22, 12, "red"], [17, 16, "green"], [27, 16, "pink"], [12, 19, "pink"], [32, 19, "red"], [22, 17.5, "green"]]) P.ell(k, cx, cy, 1.4, 1.4);
    P.rect("white", 18, 27, 26, 39); P.rect("pink", 19, 28, 25, 39); P.ell("white", 22, 27, 4, 3); P.ell("pink", 22, 27.5, 3, 2.3);
    P.rect("yellow", 23, 33, 24, 34);
    for (const wx of [11, 28]) { P.rect("white", wx, 24, wx + 6, 30); P.rect("yellow", wx + 1, 25, wx + 5, 29); P.rect("white", wx + 2.5, 25, wx + 3.5, 29); P.rect("white", wx + 1, 26.5, wx + 5, 27.5); }
    for (const [gx, k] of [[11, "green"], [14.5, "red"], [29.5, "yellow"], [33, "green"]]) P.when(k, (x, y) => ((x - gx) / 1.8) ** 2 + ((y - 39) / 2) ** 2 <= 1 && y < 39);
    for (const cx of [6, 38]) { P.when("white", (x, y) => Math.abs(x - cx) < 1 && y > 28 && y < 40); P.on("red", "white", (x, y) => Math.abs(x - cx) < 1 && y > 28 && y < 40 && fl(y) % 3 === 0); P.when("red", (x, y) => { const d = Math.hypot(x - cx - 1.5, y - 28.5); return d > 0.7 && d < 2.2 && y < 28.5; }); }
  }, 44) },
  { tier: 3, name: "drum kit", make: () => picture(["red", "white", "gold", "grey", "ink"], P => {
    const tom = (cx, cy, hw, h) => { P.rect("red", cx - hw, cy, cx + hw, cy + h); P.ell("red", cx, cy + h, hw, 1.8); P.ell("white", cx, cy, hw, 2); };
    P.rell("gold", 7, 9, 6.5, 1.8, 0.15); P.rell("gold", 37, 8, 6.5, 1.8, -0.15);
    P.rell("gold", 6, 20, 4.5, 1.4, 0); P.rell("gold", 6, 18.5, 4.5, 1.4, 0);
    tom(6, 27, 5, 6); tom(38, 26, 5, 10);
    P.ell("red", 22, 32, 10.5, 10.5); P.ell("white", 22, 32, 8.3, 8.3);
    tom(16, 15, 5, 5); tom(28, 15, 5, 5);
    P.outline("ink", true);
    P.when("red", S10.RING(22, 32, 3, 4.6));
    for (const [x0, y0, x1] of [[7, 11, 7], [37, 10, 37], [6, 21, 6]]) P.line("grey", x0, y0, x1, x0 === 6 ? 26 : 23, 1.3);
    P.line("grey", 6, 34, 3, 42, 1.2); P.line("grey", 6, 34, 9, 42, 1.2);
    P.line("grey", 34, 37, 33, 42, 1.2); P.line("grey", 42, 37, 43, 42, 1.2);
    P.line("grey", 14, 42, 11, 43.5, 1.4); P.line("grey", 30, 42, 33, 43.5, 1.4);
  }, 44) },
);
