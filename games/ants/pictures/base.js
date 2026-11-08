// Sleep on it / Ants: picture helpers and the first set of pictures.
// A picture is a list of colour names and a set of shapes painted on a square grid,
// sampled at pixel centres. Pixels left unpainted ("none") are transparent: they start
// out eaten, so ants walk straight through them.
"use strict";
const COL = {
  sky: [124, 184, 232], blue: [46, 100, 204], navy: [34, 46, 110], teal: [36, 166, 152],
  green: [96, 178, 64], dkgreen: [38, 108, 52], yellow: [248, 208, 62], orange: [242, 132, 40],
  red: [218, 52, 46], pink: [238, 136, 176], purple: [132, 84, 186], brown: [136, 82, 40],
  tan: [218, 174, 112], white: [246, 242, 228], grey: [150, 152, 162], dkgrey: [64, 66, 78],
  maroon: [128, 34, 48], lilac: [196, 164, 226], mint: [156, 222, 186], ink: [26, 22, 28],
};
const fl = Math.floor;

// names: colours used by the picture. draw: paints shapes with the helpers below.
// size: the grid is size x size pixels (24 to 48 work well).
function picture(names, draw, size = 32) {
  const S = size, px = new Int8Array(S * S).fill(-1);
  const K = n => (n === "none" ? -1 : names.indexOf(n));
  const paint = (k, f) => { const v = K(k); for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (f(x + 0.5, y + 0.5)) px[y * S + x] = v; };
  const inPoly = (pts, x, y) => {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  const P = {
    size: S,
    all: k => paint(k, () => true),
    when: paint,                                                     // when(colour, (x, y) => true/false)
    rect: (k, x0, y0, x1, y1) => paint(k, (x, y) => x >= x0 && x < x1 && y >= y0 && y < y1),
    ell: (k, cx, cy, rx, ry) => paint(k, (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1),
    rell: (k, cx, cy, rx, ry, a) => paint(k, (x, y) => {           // rotated ellipse, angle in radians
      const u = (x - cx) * Math.cos(a) + (y - cy) * Math.sin(a), v = -(x - cx) * Math.sin(a) + (y - cy) * Math.cos(a);
      return (u / rx) ** 2 + (v / ry) ** 2 <= 1;
    }),
    poly: (k, pts) => paint(k, (x, y) => inPoly(pts, x, y)),
    line: (k, x0, y0, x1, y1, w) => paint(k, (x, y) => {           // thick line segment of width w
      const dx = x1 - x0, dy = y1 - y0, t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy)));
      return Math.hypot(x - x0 - t * dx, y - y0 - t * dy) <= w / 2;
    }),
    on: (k, olds, f) => {                                            // repaint only pixels that have one of these colours
      const set = [].concat(olds).map(K), v = K(k);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++)
        if (set.includes(px[y * S + x]) && f(x + 0.5, y + 0.5)) px[y * S + x] = v;
    },
    // outline(colour): a one-pixel line around everything that touches transparency or the frame.
    // outline(colour, true): also a one-pixel line between neighbouring colour areas.
    outline: (k, inner = false) => {
      const ink = K(k), src = px.slice();
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        const v = src[y * S + x]; if (v < 0 || v === ink) continue;
        let edge = false;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy, w = nx < 0 || ny < 0 || nx >= S || ny >= S ? -1 : src[ny * S + nx];
          if (w < 0) edge = true;
          else if (inner && w !== v && w !== ink && (dx > 0 || dy > 0)) edge = true;
        }
        if (edge) px[y * S + x] = ink;
      }
    },
  };
  draw(P);
  return { pal: names.map(n => COL[n]), px, size: S };
}

// Every picture: { tier: 1 simple | 2 medium | 3 complex, name, make: () => picture(...) }
const PICTURES = [
  // ----- simple -----
  { tier: 1, name: "apple", make: () => picture(["sky", "tan", "red", "white", "brown", "green"], P => {
    P.all("sky"); P.rect("tan", 0, 25, 32, 32);
    P.ell("red", 12, 17, 7.5, 9.5); P.ell("red", 20, 17, 7.5, 9.5);
    P.ell("white", 11, 13, 1.8, 2.8); P.rect("brown", 15, 3, 17, 9); P.rell("green", 20.5, 5.5, 4.2, 2, -0.5);
  }) },
  { tier: 1, name: "mushroom", make: () => picture(["sky", "green", "dkgreen", "red", "white", "tan"], P => {
    P.all("sky"); P.rect("green", 0, 25, 32, 32);
    for (const gx of [3, 8, 24, 28]) P.poly("dkgreen", [[gx - 1.5, 26], [gx, 22], [gx + 1.5, 26]]);
    P.rect("tan", 12, 15, 20, 27); P.ell("tan", 16, 26, 5.5, 1.8);
    P.when("red", (x, y) => ((x - 16) / 12.5) ** 2 + ((y - 16) / 10.5) ** 2 <= 1 && y < 16.5);
    for (const [dx, dy, r] of [[10, 12, 1.9], [16, 8.5, 2.1], [22, 12, 1.9], [13, 14.6, 1.2], [19, 14.6, 1.2], [6.5, 14.5, 1.1], [25.5, 14.5, 1.1]]) P.ell("white", dx, dy, r, r * 0.9);
  }) },
  { tier: 1, name: "apple tree", make: () => picture(["sky", "yellow", "green", "dkgreen", "brown", "red"], P => {
    P.all("sky"); P.ell("yellow", 5.5, 5.5, 3, 3); P.rect("green", 0, 26, 32, 32);
    P.rect("brown", 14, 16, 18, 27); P.poly("brown", [[12, 27], [14, 24], [18, 24], [20, 27]]);
    P.ell("dkgreen", 16, 11, 9.5, 8); P.ell("dkgreen", 9.5, 15, 5.5, 4.5); P.ell("dkgreen", 22.5, 15, 5.5, 4.5);
    for (const [ax, ay] of [[12, 9], [19, 7], [22, 14], [14, 15], [8.5, 14], [17, 12]]) P.ell("red", ax, ay, 1.15, 1.15);
  }) },
  { tier: 1, name: "cup of tea", make: () => picture(["pink", "brown", "teal", "white", "tan"], P => {
    P.all("pink"); P.rect("brown", 0, 25, 32, 32); P.ell("white", 16, 25, 11, 2);
    P.poly("teal", [[8.5, 12.5], [22.5, 12.5], [21, 23.5], [10, 23.5]]);
    P.when("teal", (x, y) => { const d = Math.hypot(x - 23, y - 17); return d > 1.7 && d < 3.4 && x > 21.5; });
    P.ell("tan", 15.5, 12.8, 6.6, 1.2);
    for (const sx of [13, 18]) P.when("white", (x, y) => y > 3 && y < 10.5 && Math.abs(x - (sx + Math.sin(y * 0.9) * 1.1)) < 0.55);
  }) },
  { tier: 1, name: "flower pot", make: () => picture(["sky", "orange", "green", "pink", "yellow", "tan"], P => {
    P.all("sky"); P.rect("tan", 0, 27, 32, 32); P.rect("green", 15, 9, 17, 19);
    P.rell("green", 12, 14.5, 3.6, 1.6, 0.6); P.rell("green", 20, 15.5, 3.6, 1.6, -0.6);
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; P.ell("pink", 16 + Math.cos(a) * 3.3, 8 + Math.sin(a) * 3.3, 2.6, 2.6); }
    P.ell("yellow", 16, 8, 2.1, 2.1);
    P.poly("orange", [[10, 19.5], [22, 19.5], [20.2, 28], [11.8, 28]]); P.rect("orange", 9, 18, 23, 20.5);
  }) },
  { tier: 1, name: "heart balloon", make: () => picture(["sky", "red", "white", "grey", "green"], P => {
    P.all("sky"); P.rect("green", 0, 28, 32, 32);
    P.when("grey", (x, y) => y > 20 && y < 28 && Math.abs(x - (16 + Math.sin(y * 0.8) * 0.8)) < 0.55);
    P.ell("red", 12, 10, 5.2, 5.2); P.ell("red", 20, 10, 5.2, 5.2); P.poly("red", [[7, 11.5], [25, 11.5], [16, 21.5]]);
    P.ell("white", 10.5, 8, 1.5, 1.5);
  }) },
  { tier: 1, name: "cherries", make: () => picture(["pink", "red", "green", "white", "brown"], P => {
    P.all("pink");
    P.line("green", 11, 18, 17, 6, 1.3); P.line("green", 21, 17, 17, 6, 1.3); P.rell("green", 21, 5.5, 4, 1.8, -0.4);
    P.ell("brown", 17, 6, 1.1, 1.1);
    P.ell("red", 11, 22, 5, 5); P.ell("red", 21, 21, 5, 5);
    P.ell("white", 9.3, 20, 1.3, 1.3); P.ell("white", 19.3, 19, 1.3, 1.3);
  }) },
  { tier: 1, name: "watermelon", make: () => picture(["teal", "green", "white", "red", "dkgrey"], P => {
    P.all("teal");
    P.when("green", (x, y) => y >= 10 && Math.hypot(x - 16, y - 10) <= 13.5);
    P.when("white", (x, y) => y >= 10 && Math.hypot(x - 16, y - 10) <= 12);
    P.when("red", (x, y) => y >= 10 && Math.hypot(x - 16, y - 10) <= 10.8);
    for (const [sx, sy] of [[10, 14], [16, 16], [22, 14], [13, 19], [19, 19], [16, 12], [7, 12], [25, 12]]) P.rect("dkgrey", sx, sy, sx + 1, sy + 2);
  }) },
  { tier: 1, name: "moon and stars", make: () => picture(["navy", "yellow", "white", "purple"], P => {
    P.all("navy"); P.ell("yellow", 13, 14, 8.5, 8.5); P.ell("navy", 17.5, 11, 7.5, 7.5);
    for (const [sx, sy, big] of [[24, 6, 1], [27, 15, 0], [7, 27, 1], [21, 26, 0], [5, 5, 0], [15, 3, 0]]) {
      P.rect("white", sx, sy, sx + 1, sy + 1);
      if (big) { P.rect("white", sx - 1, sy, sx + 2, sy + 1); P.rect("white", sx, sy - 1, sx + 1, sy + 2); }
    }
    P.ell("purple", 22, 24, 7, 2.6); P.ell("purple", 26, 22, 4, 2.4);
  }) },
  { tier: 1, name: "snowman", make: () => picture(["sky", "white", "dkgrey", "orange", "red", "brown"], P => {
    P.all("sky"); P.ell("white", 16, 33, 24, 6);
    P.line("brown", 10, 19, 4, 13, 1); P.line("brown", 22, 19, 28, 13, 1);
    P.ell("white", 16, 22, 7, 6); P.ell("white", 16, 12.5, 5, 4.5);
    P.rect("dkgrey", 10, 7, 22, 8.6); P.rect("dkgrey", 12, 1.5, 20, 7);
    P.rect("dkgrey", 14, 11, 15, 12); P.rect("dkgrey", 17, 11, 18, 12);
    for (const by of [19, 22, 25]) P.rect("dkgrey", 15.5, by, 16.5, by + 1);
    P.poly("orange", [[16, 12.8], [16, 14.6], [20.5, 13.7]]);
    P.rect("red", 11, 16, 21, 17.6); P.rect("red", 18, 16, 20, 21);
  }) },
  { tier: 1, name: "ice cream", make: () => picture(["mint", "tan", "brown", "pink", "white", "red"], P => {
    P.all("mint");
    const cone = [[10, 15], [22, 15], [16, 30.5]];
    P.poly("tan", cone);
    P.on("brown", "tan", (x, y) => (fl(x) + fl(y)) % 4 === 0 || (fl(x) - fl(y) + 64) % 4 === 0);
    P.ell("pink", 16, 14, 7.5, 4.8); P.ell("pink", 11, 17.5, 1.3, 1.8); P.ell("pink", 20, 17.8, 1.1, 1.5);
    P.ell("white", 16, 8.5, 6, 4.5); P.ell("red", 16, 3.5, 2, 2);
  }) },
  { tier: 1, name: "sun and cloud", make: () => picture(["sky", "yellow", "orange", "white"], P => {
    P.all("sky");
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; P.line("orange", 13 + Math.cos(a) * 8, 12 + Math.sin(a) * 8, 13 + Math.cos(a) * 11.5, 12 + Math.sin(a) * 11.5, 1.8); }
    P.ell("yellow", 13, 12, 6.5, 6.5);
    P.ell("white", 19, 21, 6, 4.2); P.ell("white", 13, 22.5, 4.5, 3.2); P.ell("white", 25, 22.5, 4.5, 3); P.rect("white", 9, 22, 29, 25.5);
  }) },
  { tier: 1, name: "strawberry", make: () => picture(["lilac", "red", "yellow", "green", "dkgreen"], P => {
    P.all("lilac");
    P.ell("red", 16, 15, 9, 6.5); P.poly("red", [[7.2, 15.5], [24.8, 15.5], [16, 29]]); P.ell("red", 16, 21, 6.5, 6.5);
    P.on("yellow", "red", (x, y) => (fl(x) % 4 === 1 && fl(y) % 4 === 2) || (fl(x) % 4 === 3 && fl(y) % 4 === 0));
    P.rell("green", 12, 9, 4, 1.5, 0.4); P.rell("green", 20, 9, 4, 1.5, -0.4); P.rell("green", 16, 9, 1.6, 2.6, 0);
    P.rect("dkgreen", 15, 3, 17, 8);
  }) },
  { tier: 1, name: "cactus", make: () => picture(["sky", "green", "dkgreen", "pink", "orange", "tan"], P => {
    P.all("sky"); P.rect("tan", 0, 26, 32, 32);
    P.rect("green", 13, 8, 19, 24); P.ell("green", 16, 8, 3, 2.5);
    P.rect("green", 7, 13, 10, 19); P.ell("green", 8.5, 13, 1.5, 1.5); P.rect("green", 7, 17, 13, 20);
    P.rect("green", 22, 10, 25, 17); P.ell("green", 23.5, 10, 1.5, 1.5); P.rect("green", 19, 15, 25, 18);
    P.on("dkgreen", "green", x => fl(x) === 14 || fl(x) === 17);
    P.ell("pink", 16, 5.8, 2.2, 1.6);
    P.poly("orange", [[10, 22], [22, 22], [20.5, 30], [11.5, 30]]);
  }) },
  { tier: 1, name: "pear", make: () => picture(["pink", "green", "brown", "dkgreen", "white"], P => {
    P.all("pink"); P.ell("green", 16, 21, 8, 7.5); P.ell("green", 16, 12, 5, 6);
    P.line("brown", 16, 6.5, 17.5, 2.5, 1.3); P.rell("dkgreen", 20.5, 5, 3.5, 1.5, -0.5);
    P.rell("white", 12.5, 18, 1.2, 2.6, 0.3);
  }) },
  // ----- medium -----
  { tier: 2, name: "house", make: () => picture(["sky", "yellow", "green", "tan", "red", "brown", "blue"], P => {
    P.all("sky"); P.ell("yellow", 26, 6, 3.6, 3.6); P.ell("green", 16, 44, 30, 18);
    P.rect("red", 20, 6, 23, 12); P.rect("tan", 7, 15, 25, 28); P.poly("red", [[5, 15.6], [16, 6], [27, 15.6]]);
    P.rect("brown", 14, 20, 18, 28); P.rect("blue", 9, 18, 13, 22); P.rect("blue", 19, 18, 23, 22);
  }) },
  { tier: 2, name: "sailboat", make: () => picture(["sky", "blue", "teal", "orange", "brown", "white", "red"], P => {
    P.all("sky"); P.rect("blue", 0, 21, 32, 32);
    P.when("teal", (x, y) => y > 22 && fl(y) % 3 === 0 && (fl(x) + fl(y)) % 7 < 3);
    P.ell("orange", 6, 6, 3.6, 3.6);
    P.poly("brown", [[6, 19.5], [26, 19.5], [22.5, 24], [9.5, 24]]); P.rect("brown", 15, 4, 16, 20);
    P.poly("white", [[16.5, 5], [16.5, 18.5], [25.5, 18.5]]); P.poly("white", [[14.5, 7], [14.5, 18.5], [7.5, 18.5]]);
    P.poly("red", [[16, 2.5], [16, 5.5], [20, 4]]);
  }) },
  { tier: 2, name: "goldfish", make: () => picture(["blue", "green", "tan", "orange", "white", "navy"], P => {
    P.all("blue"); P.when("tan", (x, y) => y > 27 + Math.sin(x * 0.5));
    for (const b of [4, 27]) P.when("green", (x, y) => y > 14 && y < 28.5 && Math.abs(x - (b + Math.sin(y * 0.6) * 1.2)) < 1);
    P.ell("orange", 15, 15, 8.5, 5.5); P.poly("orange", [[21, 15], [28, 9.5], [28, 20.5]]); P.poly("orange", [[12, 10], [17, 7], [18, 10.5]]);
    P.on("white", "orange", (x, y) => x > 15 && x < 17 && y > 9 && y < 21);
    P.ell("white", 10.5, 13.5, 1.7, 1.7); P.rect("navy", 10, 13, 11, 14);
    for (const [bx, by] of [[6, 9], [5, 6], [7, 3]]) P.rect("white", bx, by, bx + 1, by + 1);
  }) },
  { tier: 2, name: "lighthouse", make: () => picture(["sky", "blue", "grey", "white", "red", "yellow"], P => {
    P.all("sky"); P.rect("blue", 0, 24, 32, 32);
    P.poly("yellow", [[19, 6], [32, 2.5], [32, 10]]); P.poly("yellow", [[13, 6], [0, 2.5], [0, 10]]);
    P.ell("grey", 16, 27.5, 10, 4); P.ell("grey", 7, 29, 5, 3);
    P.poly("white", [[12, 25], [20, 25], [18.5, 9], [13.5, 9]]);
    P.on("red", "white", (x, y) => (y > 12 && y < 15) || (y > 18 && y < 21));
    P.rect("yellow", 13, 5, 19, 9); P.poly("red", [[12, 5.6], [16, 1.5], [20, 5.6]]);
  }) },
  { tier: 2, name: "mountains", make: () => picture(["orange", "yellow", "purple", "white", "navy", "blue"], P => {
    P.all("orange"); P.rect("yellow", 0, 11, 32, 32); P.ell("yellow", 22, 10, 4.2, 4.2);
    P.poly("purple", [[0, 22], [9, 9], [15, 17], [23, 7], [32, 19], [32, 27], [0, 27]]);
    P.poly("white", [[9, 9], [6.6, 12.5], [11.6, 12.5]]); P.poly("white", [[23, 7], [20.3, 10.5], [25.5, 10.5]]);
    P.when("navy", (x, y) => y > 22 + 2 * Math.sin(x * 0.3 + 1)); P.rect("blue", 0, 28, 32, 32);
  }) },
  { tier: 2, name: "hot air balloon", make: () => picture(["sky", "white", "red", "yellow", "blue", "brown", "dkgrey"], P => {
    P.all("sky"); P.ell("white", 6, 24, 5, 2.5); P.ell("white", 26, 6, 5, 2.2); P.ell("white", 28, 27, 4, 2);
    P.ell("red", 16, 11, 9, 9.5); P.poly("red", [[8.2, 14], [23.8, 14], [18, 21.5], [14, 21.5]]);
    P.on("yellow", "red", x => ((fl((x - 16) / 3) % 3) + 3) % 3 === 1);
    P.on("blue", "red", x => ((fl((x - 16) / 3) % 3) + 3) % 3 === 2);
    P.line("dkgrey", 14, 21.5, 14.5, 25, 0.8); P.line("dkgrey", 18, 21.5, 17.5, 25, 0.8);
    P.rect("brown", 13, 25, 19, 29);
  }) },
  { tier: 2, name: "rocket", make: () => picture(["navy", "white", "red", "blue", "orange", "yellow", "grey"], P => {
    P.all("navy");
    for (const [sx, sy] of [[4, 4], [27, 7], [6, 15], [26, 20], [3, 27], [28, 29], [20, 2]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.ell("orange", 16, 26, 3, 4.5); P.ell("yellow", 16, 25, 1.6, 2.8);
    P.poly("red", [[11.5, 16], [11.5, 23], [7.5, 25], [8.5, 19]]); P.poly("red", [[20.5, 16], [20.5, 23], [24.5, 25], [23.5, 19]]);
    P.when("white", (x, y) => ((x - 16) / 4.6) ** 2 + ((y - 13) / 10) ** 2 <= 1 && y < 23);
    P.on("red", "white", (x, y) => y < 7); P.on("grey", "white", (x, y) => y > 19.5 && y < 21.5);
    P.ell("grey", 16, 12, 2.6, 2.6); P.ell("blue", 16, 12, 1.7, 1.7);
  }) },
  { tier: 2, name: "owl", make: () => picture(["navy", "yellow", "brown", "tan", "white", "dkgrey", "orange", "green"], P => {
    P.all("navy"); P.ell("yellow", 26, 5, 3.5, 3.5); P.rect("green", 0, 26, 32, 28.5);
    P.ell("brown", 16, 18, 8, 9); P.poly("brown", [[8.5, 11], [10.5, 5.5], [13.5, 11]]); P.poly("brown", [[23.5, 11], [21.5, 5.5], [18.5, 11]]);
    P.ell("tan", 16, 21, 5, 5.5); P.on("brown", "tan", (x, y) => fl(y) % 3 === 0 && fl(x) % 3 === 1);
    P.ell("white", 12.5, 14, 3, 3); P.ell("white", 19.5, 14, 3, 3);
    P.ell("dkgrey", 12.5, 14, 1.3, 1.3); P.ell("dkgrey", 19.5, 14, 1.3, 1.3);
    P.poly("orange", [[15, 16], [17, 16], [16, 18.6]]); P.rect("orange", 13, 26, 15, 27); P.rect("orange", 17, 26, 19, 27);
  }) },
  { tier: 2, name: "butterfly", make: () => picture(["mint", "purple", "pink", "yellow", "dkgrey", "white"], P => {
    P.all("mint");
    P.ell("purple", 10, 11, 7, 6.5); P.ell("purple", 22, 11, 7, 6.5); P.ell("pink", 11, 21, 5.5, 5); P.ell("pink", 21, 21, 5.5, 5);
    P.ell("yellow", 9, 10, 2.3, 2.3); P.ell("yellow", 23, 10, 2.3, 2.3); P.ell("white", 11, 21.5, 1.6, 1.6); P.ell("white", 21, 21.5, 1.6, 1.6);
    P.ell("dkgrey", 16, 16, 1.5, 8.5); P.line("dkgrey", 16, 8, 12, 3, 0.9); P.line("dkgrey", 16, 8, 20, 3, 0.9);
  }) },
  { tier: 2, name: "turtle", make: () => picture(["blue", "tan", "green", "dkgreen", "yellow", "dkgrey"], P => {
    P.all("blue"); P.when("tan", (x, y) => y > 27 + Math.sin(x * 0.4));
    P.ell("green", 25, 15.5, 3.6, 3); for (const [lx, ly] of [[10, 10], [10, 21], [21, 10], [21, 21]]) P.ell("green", lx, ly, 2.6, 2);
    P.poly("green", [[8, 14.5], [4, 15.5], [8, 17]]);
    P.ell("yellow", 15.5, 15.5, 8.2, 6.7); P.ell("dkgreen", 15.5, 15.5, 7.2, 5.7);
    for (const [px, py, r] of [[15.5, 15.5, 2.4], [11.5, 13.5, 1.6], [19.5, 13.5, 1.6], [11.5, 17.6, 1.6], [19.5, 17.6, 1.6]]) P.ell("green", px, py, r, r * 0.85);
    P.rect("dkgrey", 26, 14, 27, 15);
  }) },
  { tier: 2, name: "ladybug", make: () => picture(["sky", "green", "dkgreen", "red", "dkgrey", "white"], P => {
    P.all("sky"); P.rell("green", 16, 17, 15, 8, -0.5); P.line("dkgreen", 4, 25, 28, 9, 1);
    P.ell("red", 16.5, 16.5, 6.2, 5.7); P.ell("dkgrey", 22, 12, 3, 2.6);
    P.line("dkgrey", 21, 12.8, 12, 20.5, 0.9);
    for (const [sx, sy, r] of [[14, 14.5, 1.3], [18.5, 19, 1.3], [13, 18.8, 1], [19.5, 14.5, 1]]) P.ell("dkgrey", sx, sy, r, r);
    P.rect("white", 21, 11, 22, 12); P.rect("white", 23, 12, 24, 13);
  }) },
  { tier: 2, name: "pumpkin", make: () => picture(["purple", "orange", "maroon", "green", "yellow", "white"], P => {
    P.all("purple"); for (const [sx, sy] of [[4, 4], [27, 5], [24, 2], [8, 9]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.ell("orange", 16, 20, 11, 8); P.ell("orange", 10.5, 20, 6, 7.5); P.ell("orange", 21.5, 20, 6, 7.5);
    P.on("maroon", "orange", x => fl(x) === 12 || fl(x) === 19);
    P.rect("green", 15, 9, 18, 13);
    P.poly("yellow", [[9.5, 18], [14, 18], [11.8, 14.5]]); P.poly("yellow", [[18, 18], [22.5, 18], [20.2, 14.5]]);
    P.poly("yellow", [[9, 21], [23, 21], [20, 25.5], [12, 25.5]]);
    P.on("orange", "yellow", (x, y) => y > 21 && y < 22.5 && fl(x) % 4 === 1);
  }) },
  { tier: 2, name: "cat", make: () => picture(["lilac", "orange", "pink", "white", "green", "dkgrey"], P => {
    P.all("lilac");
    P.poly("orange", [[5.5, 14], [8, 3], [14.5, 10]]); P.poly("orange", [[26.5, 14], [24, 3], [17.5, 10]]);
    P.poly("pink", [[8, 11.5], [9, 6], [12.5, 10]]); P.poly("pink", [[24, 11.5], [23, 6], [19.5, 10]]);
    P.ell("orange", 16, 18, 11, 9.5);
    P.on("dkgrey", "orange", (x, y) => y > 9 && y < 13 && [13, 16, 19].includes(fl(x)));
    P.ell("white", 13.5, 22.5, 3.6, 2.8); P.ell("white", 18.5, 22.5, 3.6, 2.8);
    P.ell("green", 11.5, 16, 2.2, 2.5); P.ell("green", 20.5, 16, 2.2, 2.5);
    P.rect("dkgrey", 11, 15, 12, 18); P.rect("dkgrey", 20, 15, 21, 18);
    P.poly("pink", [[14.3, 19.3], [17.7, 19.3], [16, 21.2]]);
    for (const [a, b, cc, d] of [[9, 22, 3, 21], [9, 23.5, 3, 25.5], [23, 22, 29, 21], [23, 23.5, 29, 25.5]]) P.line("dkgrey", a, b, cc, d, 0.7);
  }) },
  { tier: 2, name: "penguin", make: () => picture(["sky", "white", "dkgrey", "orange", "blue", "yellow"], P => {
    P.all("sky"); P.ell("yellow", 27, 5, 3, 3); P.rect("blue", 0, 22, 32, 32);
    P.poly("white", [[0, 25], [20, 23], [32, 26], [32, 32], [0, 32]]);
    P.ell("dkgrey", 16, 16.5, 7, 10); P.ell("white", 16, 19, 4.6, 7.5);
    P.ell("white", 14.2, 9.5, 1.8, 1.8); P.ell("white", 17.8, 9.5, 1.8, 1.8);
    P.rect("dkgrey", 14, 9, 15, 10); P.rect("dkgrey", 17, 9, 18, 10);
    P.poly("orange", [[15, 11], [17, 11], [16, 13.2]]); P.ell("orange", 13.5, 26.8, 2, 1); P.ell("orange", 18.5, 26.8, 2, 1);
  }) },
  { tier: 2, name: "car", make: () => picture(["sky", "green", "dkgrey", "yellow", "red", "blue", "grey"], P => {
    P.all("sky"); P.rect("green", 0, 20, 32, 23); P.rect("dkgrey", 0, 23, 32, 32);
    P.when("yellow", (x, y) => y >= 27 && y < 28 && fl(x) % 6 < 3);
    P.poly("red", [[9, 15.5], [12, 9.5], [21, 9.5], [24, 15.5]]); P.rect("red", 5, 15, 27, 21);
    P.poly("blue", [[10.8, 14.5], [12.8, 10.8], [16, 10.8], [16, 14.5]]); P.poly("blue", [[17, 14.5], [17, 10.8], [20.5, 10.8], [22.7, 14.5]]);
    P.ell("dkgrey", 10, 21.5, 3, 3); P.ell("dkgrey", 22, 21.5, 3, 3); P.ell("grey", 10, 21.5, 1.3, 1.3); P.ell("grey", 22, 21.5, 1.3, 1.3);
    P.rect("yellow", 26, 16, 27, 18);
  }) },
  { tier: 2, name: "umbrella", make: () => picture(["sky", "blue", "red", "yellow", "brown", "green"], P => {
    P.all("sky"); P.rect("green", 0, 29, 32, 32);
    P.when("blue", (x, y) => y < 29 && fl(x) % 5 === 2 && (fl(y) + fl(x)) % 6 === 0);
    P.ell("blue", 22, 30, 6, 1.3);
    P.rect("brown", 15, 13, 17, 26);
    P.when("brown", (x, y) => { const d = Math.hypot(x - 13.5, y - 26); return y > 26 && d > 1.4 && d < 2.6; });
    P.when("red", (x, y) => ((x - 16) / 12.5) ** 2 + ((y - 14) / 9.5) ** 2 <= 1 && y < 14.5);
    P.on("yellow", "red", (x, y) => fl((Math.atan2(y - 14, x - 16) + Math.PI) / (Math.PI / 6)) % 2 === 1);
  }) },
  { tier: 2, name: "volcano", make: () => picture(["sky", "grey", "brown", "red", "orange", "green", "white"], P => {
    P.all("sky"); P.ell("white", 27, 14, 4, 1.6); P.ell("white", 5, 16, 3.5, 1.4);
    P.ell("grey", 16, 5, 5, 3); P.ell("grey", 21.5, 3.5, 4, 2.4); P.ell("grey", 10.5, 3.5, 3.5, 2.2);
    P.poly("brown", [[1, 28], [12, 11], [20, 11], [31, 28]]);
    P.poly("orange", [[13.5, 11.5], [18.5, 11.5], [20.5, 7.5], [16, 9.5], [11.5, 7.5]]);
    P.poly("red", [[12, 11], [20, 11], [18, 13.5], [14, 13.5]]);
    P.line("red", 14, 12, 10, 22, 1.7); P.line("red", 18, 12, 21.5, 20, 1.7); P.line("red", 16, 12, 16.5, 17, 1.4);
    P.rect("green", 0, 27, 32, 32); P.ell("green", 3, 28, 6, 3); P.ell("green", 29, 28, 6, 3);
  }) },
  { tier: 2, name: "robin", make: () => picture(["sky", "brown", "orange", "white", "yellow", "maroon", "green"], P => {
    P.all("sky"); P.line("maroon", 0, 25, 32, 21, 2.4);
    P.rell("green", 4, 21.5, 3, 1.3, -0.6); P.rell("green", 27.5, 18.5, 3, 1.3, 0.5); P.rell("green", 24.5, 24.5, 2.5, 1.2, 0.4);
    P.line("yellow", 14, 20, 14, 23.5, 0.9); P.line("yellow", 17, 20, 17, 23, 0.9);
    P.poly("brown", [[9, 15.5], [3, 19], [4, 21], [10.5, 18.5]]);
    P.ell("brown", 15, 15, 7, 6); P.ell("brown", 20, 9.5, 4, 3.8);
    P.ell("orange", 18.5, 14.5, 4, 4.5); P.ell("orange", 21, 12, 2.5, 2);
    P.ell("white", 15, 19.3, 4, 1.8);
    P.poly("yellow", [[23.5, 8.8], [27.2, 10], [23.5, 11.2]]); P.rect("maroon", 21, 8, 22, 9);
  }) },
  // ----- complex -----
  { tier: 3, name: "castle", make: () => picture(["sky", "white", "grey", "dkgrey", "red", "brown", "blue", "green", "yellow"], P => {
    P.all("sky"); P.ell("yellow", 27.5, 5, 2.8, 2.8); P.ell("white", 6, 5, 4, 1.8); P.ell("white", 10, 6.5, 3, 1.4);
    P.rect("green", 0, 26, 32, 32); P.rect("blue", 0, 28, 32, 30.5);
    P.rect("grey", 6, 14, 26, 28); P.rect("grey", 3, 9, 9, 28); P.rect("grey", 23, 9, 29, 28); P.rect("grey", 12, 6, 20, 28);
    P.when("grey", (x, y) => y >= 13 && y < 14 && x > 9 && x < 12 && fl(x) % 2 === 0);
    P.when("grey", (x, y) => y >= 13 && y < 14 && x > 20 && x < 23 && fl(x) % 2 === 0);
    P.poly("red", [[2.5, 9.5], [6, 3], [9.5, 9.5]]); P.poly("red", [[22.5, 9.5], [26, 3], [29.5, 9.5]]); P.poly("red", [[11.5, 6.5], [16, 0.5], [20.5, 6.5]]);
    for (const [a, b, cc, d] of [[5, 13, 7, 16], [25, 13, 27, 16], [15, 9, 17, 12], [13, 16, 14, 18], [18, 16, 19, 18], [5, 19, 7, 21], [25, 19, 27, 21]]) P.rect("dkgrey", a, b, cc, d);
    P.ell("brown", 16, 24, 2.6, 3); P.rect("brown", 13.4, 24, 18.6, 28);
  }) },
  { tier: 3, name: "coral reef", make: () => picture(["blue", "tan", "pink", "orange", "purple", "yellow", "green", "white"], P => {
    P.all("blue"); P.when("tan", (x, y) => y > 26.5 + Math.sin(x * 0.4));
    for (const b of [11, 20]) P.when("green", (x, y) => y > 14 && y < 28 && Math.abs(x - (b + Math.sin(y * 0.55) * 1.3)) < 0.9);
    P.line("pink", 6, 27, 5, 18, 1.6); P.line("pink", 5, 22, 2, 17, 1.4); P.line("pink", 5.5, 21, 8.5, 16.5, 1.4);
    P.ell("orange", 26, 24, 4, 3.6); P.ell("orange", 23, 26, 3, 2);
    P.ell("purple", 15.5, 22, 4.5, 5); P.on("blue", "purple", (x, y) => (fl(x) + fl(y)) % 3 === 0);
    P.ell("yellow", 21, 10, 4, 2.5); P.poly("yellow", [[17.5, 10], [14, 7.5], [14, 12.5]]);
    P.ell("yellow", 8, 6.5, 2.6, 1.6); P.poly("yellow", [[5.8, 6.5], [3.5, 5], [3.5, 8]]);
    for (const [a, b] of [[23, 9], [9, 6], [25, 5], [26, 3], [27, 1]]) P.rect("white", a, b, a + 1, b + 1);
  }) },
  { tier: 3, name: "city at night", make: () => picture(["navy", "yellow", "white", "dkgrey", "purple", "blue", "grey"], P => {
    P.all("navy"); P.ell("yellow", 25, 5.5, 3, 3);
    for (const [a, b] of [[3, 3], [9, 6], [14, 2], [19, 5], [29, 11], [5, 9]]) P.rect("white", a, b, a + 1, b + 1);
    P.rect("dkgrey", 0, 14, 6, 32); P.rect("purple", 6, 10, 12, 32); P.rect("blue", 12, 17, 17, 32); P.rect("dkgrey", 17, 8, 22, 32);
    P.rect("grey", 22, 15, 26, 32); P.rect("purple", 26, 12, 31, 32); P.rect("blue", 31, 19, 32, 32); P.rect("grey", 19, 4, 20, 8);
    P.on("yellow", ["dkgrey", "purple", "blue", "grey"], (x, y) => y > 11 && fl(x) % 2 === 1 && fl(y) % 3 === 1 && ((fl(x) * 7 + fl(y) * 13) % 5) < 3);
  }) },
  { tier: 3, name: "parrot", make: () => picture(["sky", "green", "dkgreen", "red", "yellow", "blue", "white", "dkgrey", "brown"], P => {
    P.all("sky");
    P.rell("green", 4, 6, 5, 2, 0.6); P.rell("dkgreen", 28, 8, 5, 2, -0.6); P.rell("dkgreen", 3, 14, 4, 1.6, 0.3); P.rell("green", 29, 16, 4, 1.6, -0.4);
    P.poly("blue", [[13, 22], [19, 22], [17.5, 31], [14.5, 31]]);
    P.ell("red", 16, 16, 6, 8.5); P.ell("red", 17, 8, 5, 4.5);
    P.ell("blue", 13.5, 18, 3.5, 6.5); P.on("yellow", "blue", (x, y) => y < 15);
    P.line("brown", 1, 27, 31, 25, 2.4);
    P.rect("dkgrey", 14, 24, 16, 26.5); P.rect("dkgrey", 17, 24, 19, 26.5);
    P.ell("white", 19, 8, 2.6, 2.2); P.rect("dkgrey", 19, 7, 20, 8);
    P.poly("dkgrey", [[21, 7.5], [24.5, 9.5], [23, 12.5], [21, 11]]);
  }) },
  { tier: 3, name: "barn", make: () => picture(["sky", "yellow", "white", "red", "maroon", "green", "tan", "brown"], P => {
    P.all("sky"); P.ell("yellow", 5, 5, 3, 3); P.ell("white", 24, 5, 4, 1.7);
    P.rect("green", 0, 24, 32, 32); P.poly("tan", [[13.5, 32], [18.5, 32], [17.4, 25], [14.6, 25]]);
    P.when("white", (x, y) => (x < 7 || x > 25) && ((y >= 20.5 && y < 21.5) || (y >= 20 && y < 24 && fl(x) % 3 === 0)));
    P.ell("yellow", 3.5, 25.5, 2.5, 2); P.ell("yellow", 28.5, 25.5, 2.5, 2);
    P.rect("red", 7, 13, 25, 25); P.poly("maroon", [[5, 13.6], [9, 7], [23, 7], [27, 13.6]]);
    P.rect("white", 15, 9.5, 17, 12);
    P.rect("white", 12.5, 16.5, 19.5, 25); P.rect("brown", 13.3, 17.3, 18.7, 25);
    P.line("white", 13.4, 17.4, 18.6, 24.8, 0.9); P.line("white", 18.6, 17.4, 13.4, 24.8, 0.9);
  }) },
  { tier: 3, name: "garden", make: () => picture(["sky", "green", "dkgreen", "pink", "yellow", "purple", "red", "white", "orange"], P => {
    P.all("sky"); P.rect("green", 0, 24, 32, 32);
    for (const gx of [2, 9, 17, 23, 30]) P.poly("dkgreen", [[gx - 1.2, 25], [gx, 21.5], [gx + 1.2, 25]]);
    const flowers = [[5, 11, "pink", "yellow"], [12, 6.5, "purple", "yellow"], [19, 10, "red", "yellow"], [26.5, 7, "white", "orange"]];
    for (const [fx, fy] of flowers) { P.line("dkgreen", fx, fy, fx, 26, 1.2); P.rell("dkgreen", fx + 2, fy + 8, 2.4, 1, -0.6); }
    for (const [fx, fy, pc, cc] of flowers) {
      for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5 - Math.PI / 2; P.ell(pc, fx + Math.cos(a) * 2.3, fy + Math.sin(a) * 2.3, 1.8, 1.8); }
      P.ell(cc, fx, fy, 1.3, 1.3);
    }
  }) },
  { tier: 3, name: "island", make: () => picture(["sky", "blue", "teal", "tan", "brown", "green", "yellow", "white"], P => {
    P.all("sky"); P.ell("yellow", 5, 5, 3, 3); P.ell("white", 25, 4, 4, 1.6);
    P.rect("blue", 0, 18, 32, 32); P.when("teal", (x, y) => y > 19 && fl(y) % 3 === 0 && (fl(x) + fl(y)) % 8 < 3);
    P.ell("tan", 14, 22.5, 11.5, 4);
    P.line("brown", 10, 21.5, 18.5, 7.5, 1.9);
    P.rell("green", 14, 7.5, 5.5, 1.5, 0.35); P.rell("green", 23.5, 7.5, 5.5, 1.5, -0.35);
    P.rell("green", 16, 10.5, 4.5, 1.3, -0.9); P.rell("green", 21.5, 10.5, 4.5, 1.3, 0.9); P.rell("green", 18.5, 4.8, 1.4, 3.2, 0.2);
    P.rect("brown", 18, 8, 20, 9);
    P.rect("brown", 19, 18, 24, 21.5); P.rect("yellow", 19, 19, 24, 19.8); P.rect("yellow", 21, 19, 22, 20.5);
  }) },
  { tier: 3, name: "robot", make: () => picture(["lilac", "grey", "dkgrey", "blue", "red", "yellow", "white", "teal"], P => {
    P.all("lilac"); P.rect("teal", 0, 29, 32, 32);
    P.rect("dkgrey", 15, 2.5, 17, 5); P.ell("red", 16, 2, 1.6, 1.6);
    P.rect("grey", 10, 5, 22, 14); P.ell("blue", 13, 9, 1.8, 1.8); P.ell("blue", 19, 9, 1.8, 1.8);
    P.rect("white", 13, 11.5, 19, 12.6); P.on("dkgrey", "white", x => fl(x) % 2 === 0);
    P.rect("dkgrey", 14, 14, 18, 15.6); P.rect("grey", 8, 15.5, 24, 26);
    P.rect("dkgrey", 11, 18, 21, 23); P.ell("yellow", 13.5, 20.5, 1.2, 1.2); P.ell("red", 16, 20.5, 1.2, 1.2); P.ell("blue", 18.5, 20.5, 1.2, 1.2);
    P.rect("dkgrey", 4, 16, 8, 18); P.rect("dkgrey", 4, 16, 6, 23); P.rect("dkgrey", 24, 16, 28, 18); P.rect("dkgrey", 26, 16, 28, 23);
    P.ell("grey", 5, 24, 1.7, 1.4); P.ell("grey", 27, 24, 1.7, 1.4);
    P.rect("dkgrey", 10, 26, 14, 29); P.rect("dkgrey", 18, 26, 22, 29);
  }) },
  { tier: 3, name: "steam train", make: () => picture(["sky", "green", "dkgrey", "brown", "red", "blue", "yellow", "white"], P => {
    P.all("sky"); P.ell("green", 8, 27, 14, 8); P.ell("green", 26, 28, 12, 7); P.rect("green", 0, 27, 32, 32);
    P.when("brown", (x, y) => y >= 28 && y < 30 && fl(x) % 3 === 0); P.rect("dkgrey", 0, 28, 32, 29);
    P.ell("white", 8.5, 8, 2.6, 2); P.ell("white", 11.5, 5, 3, 2); P.ell("white", 16, 2.8, 3.4, 1.8);
    P.rect("dkgrey", 7, 11, 10, 17); P.rect("red", 4, 17, 19, 24); P.rect("blue", 19, 12, 27, 24); P.rect("dkgrey", 18, 11, 28, 12.6);
    P.rect("yellow", 21, 14, 25, 17); P.poly("yellow", [[4, 20], [4, 26], [1, 26]]);
    for (const [wx, r] of [[8, 2.6], [14, 2.6], [23, 3.2]]) { P.ell("dkgrey", wx, 25, r, r); P.rect("yellow", wx - 0.5, 24.5, wx + 0.5, 25.5); }
  }) },
  { tier: 3, name: "koi pond", make: () => picture(["teal", "green", "dkgreen", "orange", "white", "pink", "yellow"], P => {
    P.all("teal");
    P.ell("green", 7, 7, 5, 4); P.poly("teal", [[7, 7], [12.5, 5], [12.5, 9]]); P.ell("dkgreen", 4.5, 26, 3.5, 3); P.ell("green", 25, 25, 5.5, 4.5);
    P.when("dkgreen", (x, y) => { const d = Math.hypot(x - 15, y - 28); return d > 3 && d < 3.8 && y < 28; });
    P.ell("pink", 25, 22, 1.6, 2.6); P.ell("pink", 22.8, 24, 2.4, 1.5); P.ell("pink", 27.2, 24, 2.4, 1.5); P.ell("yellow", 25, 24, 1, 1);
    const fish = (k, cx, cy, len, wid, ang) => {
      const dx = Math.cos(ang), dy = Math.sin(ang), bx = cx - dx * len, by = cy - dy * len;
      P.poly(k, [[bx + dx * 0.8, by + dy * 0.8], [bx - dx * 3 - dy * 2.4, by - dy * 3 + dx * 2.4], [bx - dx * 3 + dy * 2.4, by - dy * 3 - dx * 2.4]]);
      P.rell(k, cx, cy, len, wid, ang);
      return [cx + dx * len * 0.6, cy + dy * len * 0.6, dx, dy];
    };
    const [hx, hy] = fish("orange", 12, 17.5, 6.5, 2.7, 0.35);
    P.ell("white", 10, 16.6, 1.6, 1.3); P.rect("dkgreen", fl(hx), fl(hy) - 1, fl(hx) + 1, fl(hy));
    const [gx, gy] = fish("white", 20.5, 9.5, 5, 2.2, 2.75);
    P.ell("orange", 21.5, 9.2, 1.5, 1.1); P.ell("orange", 18, 10.6, 1, 0.8); P.rect("dkgreen", fl(gx), fl(gy) - 1, fl(gx) + 1, fl(gy));
  }) },
  { tier: 3, name: "sunset beach", make: () => picture(["purple", "pink", "orange", "yellow", "blue", "maroon", "tan"], P => {
    P.all("purple"); P.rect("pink", 0, 5, 32, 10); P.rect("orange", 0, 10, 32, 17);
    P.when("yellow", (x, y) => Math.hypot(x - 14, y - 16) <= 6 && y < 17);
    P.rect("blue", 0, 17, 32, 32);
    P.when("yellow", (x, y) => y > 17 && fl(y) % 2 === 0 && Math.abs(x - 14) < 6 - (y - 17) * 0.45);
    P.poly("tan", [[8, 32], [32, 23], [32, 32]]);
    P.line("maroon", 28, 27, 24, 9, 1.7);
    P.rell("maroon", 19.5, 8.5, 5, 1.2, 0.3); P.rell("maroon", 28.5, 8.5, 5, 1.2, -0.3);
    P.rell("maroon", 21.5, 12, 4.5, 1.1, -1.0); P.rell("maroon", 26.5, 12, 4.5, 1.1, 1.0); P.rell("maroon", 24, 6, 1.1, 3.2, 0);
    for (const [bx, by] of [[5, 6], [9, 4]]) { P.rect("maroon", bx, by, bx + 1, by + 1); P.rect("maroon", bx - 1, by - 1, bx, by); P.rect("maroon", bx + 1, by - 1, bx + 2, by); }
  }) },
];
