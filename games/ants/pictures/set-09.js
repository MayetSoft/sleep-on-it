// Sleep on it / Ants: plants, flowers and seasons.
"use strict";
PICTURES.push(
  // ----- simple -----
  { tier: 1, name: "tulips", make: () => picture(["red", "pink", "yellow", "green", "ink"], P => {
    P.line("green", 14, 9, 14, 26.5, 3); P.line("green", 7.5, 13, 12.5, 26.5, 3); P.line("green", 20.5, 13, 15.5, 26.5, 3);
    P.rell("green", 7.5, 21, 1.9, 5, -0.5); P.rell("green", 20.5, 21, 1.9, 5, 0.5);
    const head = (k, cx, cy) => {
      P.ell(k, cx, cy + 1, 3.7, 3.4);
      P.poly(k, [[cx - 3.7, cy + 1], [cx - 3.5, cy - 3.6], [cx - 1.3, cy - 1.4], [cx, cy - 4.3], [cx + 1.3, cy - 1.4], [cx + 3.5, cy - 3.6], [cx + 3.7, cy + 1]]);
    };
    head("pink", 7, 12); head("yellow", 21, 12); head("red", 14, 7);
    P.outline("ink", true);
  }, 28) },
  { tier: 1, name: "daisy", make: () => picture(["white", "yellow", "green", "ink"], P => {
    P.rect("green", 12.5, 18, 15.5, 27.5); P.rell("green", 18.5, 23, 4, 1.8, -0.5); P.rell("green", 9.5, 24.5, 3.5, 1.6, 0.5);
    for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; P.rell("white", 14 + Math.cos(a) * 6, 11 + Math.sin(a) * 6, 3.7, 1.75, a); }
    P.ell("yellow", 14, 11, 3.3, 3.3);
    P.outline("ink", true);
  }, 28) },
  { tier: 1, name: "oak leaf", make: () => picture(["green", "dkgreen", "brown", "ink"], P => {
    const dx = 0.34, dy = -0.94, G = (u, v) => [16 + u * dx - v * dy, 14 + u * dy + v * dx];
    const W = u => Math.abs(u) >= 13 ? 0 : Math.pow(1 - (u / 13) ** 2, 0.45) * (2 + 5.6 * Math.abs(Math.sin(Math.PI * (u + 13) / 6.5)));
    P.line("brown", ...G(-18, 0), ...G(-12, 0), 4.2);
    P.when("green", (x, y) => { const u = (x - 16) * dx + (y - 14) * dy, v = -(x - 16) * dy + (y - 14) * dx; return Math.abs(v) < W(u); });
    P.outline("ink");
    P.line("dkgreen", ...G(-12.5, 0), ...G(11, 0), 1.2);
    for (let k = 0; k < 3; k++) { const u = -13 + 3.25 + k * 6.5; for (const sg of [-1, 1]) P.line("dkgreen", ...G(u - 1.5, 0), ...G(u + 0.5, sg * W(u) * 0.6), 1); }
  }, 32) },
  { tier: 1, name: "maple leaf", make: () => picture(["red", "orange", "brown", "ink"], P => {
    P.line("brown", 16, 20, 17.5, 30.5, 3.4);
    P.poly("red", [[16, 1.5], [18.6, 7], [21.8, 5.5], [20.8, 11.5], [26.5, 8], [25.5, 12.5], [30.5, 13], [27, 16.5], [28.5, 18.5], [22, 20], [23, 23], [17.3, 21.5],
      [14.7, 21.5], [9, 23], [10, 20], [3.5, 18.5], [5, 16.5], [1.5, 13], [6.5, 12.5], [5.5, 8], [11.2, 11.5], [10.2, 5.5], [13.4, 7]]);
    P.outline("ink");
    for (const [ex, ey] of [[16, 4], [27, 13.5], [5, 13.5], [23.5, 20.5], [8.5, 20.5]]) P.line("orange", 16, 20.5, ex, ey, 1.2);
  }, 32) },
  { tier: 1, name: "acorn", make: () => picture(["gold", "brown", "tan", "yellow", "ink"], P => {
    P.rect("brown", 10, 1.5, 14, 7);
    P.ell("gold", 12, 14.5, 6.6, 7.5); P.poly("gold", [[6.5, 17.5], [17.5, 17.5], [12, 23.5]]);
    P.when("brown", (x, y) => ((x - 12) / 9) ** 2 + ((y - 10.5) / 5) ** 2 <= 1 && y < 11);
    P.ell("brown", 12, 11, 9, 1.8);
    P.on("tan", "brown", (x, y) => y > 6 && ((fl(x) + fl(y)) % 4 === 0 || (fl(x) - fl(y) + 40) % 4 === 0));
    P.rell("yellow", 9, 16, 1.5, 3, 0.25);
    P.outline("ink");
  }, 24) },
  { tier: 1, name: "pine cone", make: () => picture(["brown", "tan", "green", "ink"], P => {
    P.line("brown", 2, 3, 15, 6.5, 2.6); P.rect("brown", 13.5, 5, 16.5, 9);
    const hw = y => { const s = (y - 7.5) / 21.5; return s <= 0 || s >= 1 ? 0 : 8 * Math.sqrt(Math.sin(Math.PI * s)) * (1.15 - 0.6 * s); };
    P.when("brown", (x, y) => Math.abs(x - 15) < hw(y));
    P.on("tan", "brown", (x, y) => y > 9 && Math.abs(x - 15) < hw(y) - 1 && (fl(x) + fl(y) + 40) % 4 < 2 && (fl(x) - fl(y) + 40) % 4 < 3);
    P.outline("ink");
    for (const [fx, fy] of [[4.5, 3.5], [9, 4.8]]) for (const a of [-2.6, -2.1, -1.6, -1.1]) P.line("green", fx, fy, fx + Math.cos(a) * 3.6, fy + Math.sin(a) * 3.6 + 0.5, 1);
  }, 30) },
  { tier: 1, name: "mittens", make: () => picture(["red", "white", "yellow", "ink"], P => {
    for (const [cx, sg] of [[9.5, -1], [22.5, 1]]) {
      P.ell("red", cx, 10, 5, 6); P.rect("red", cx - 5, 10, cx + 5, 21);
      P.rell("red", cx + sg * 5.6, 14.5, 1.9, 3.7, sg * 0.6);
      P.rect("white", cx - 5.6, 20, cx + 5.6, 26);
    }
    P.outline("ink", true);
    for (const cx of [9.5, 22.5]) { P.rect("yellow", cx - 4, 15, cx + 4, 16); P.rect("yellow", cx - 4, 17, cx + 4, 18); }
    P.when("ink", (x, y) => y > 26 && Math.abs(Math.hypot(x - 16, y - 21) - 8.2) < 0.55);
  }, 32) },
  { tier: 1, name: "gift box", make: () => picture(["red", "yellow", "white", "ink"], P => {
    P.rell("yellow", 9.5, 6, 4.2, 2.5, 0.45); P.rell("yellow", 18.5, 6, 4.2, 2.5, -0.45);
    P.rect("red", 3, 9, 25, 14); P.rect("red", 4, 14, 24, 26.5);
    P.rect("yellow", 12, 9, 16, 26.5); P.ell("yellow", 14, 7.5, 2, 1.8);
    P.outline("ink", true);
    P.rect("ink", 4, 13, 24, 14);
    P.on("white", "red", (x, y) => y > 15 && (fl(y) - 15) % 4 < 2 && (fl(x) + 2 * fl((y - 15) / 4)) % 4 < 2);
  }, 28) },
  { tier: 1, name: "clover", make: () => picture(["green", "lime", "dkgreen", "ink"], P => {
    const cx = 11.5, cy = 10.5;
    P.line("dkgreen", cx, cy + 3, cx + 4.5, 24, 4);
    for (let i = 0; i < 4; i++) {
      const a = Math.PI / 4 + i * Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
      for (const sg of [-1, 1]) P.ell("green", cx + c * 5.4 - s * sg * 2.4, cy + s * 5.4 + c * sg * 2.4, 3, 3);
      P.poly("green", [[cx + c * 0.6, cy + s * 0.6], [cx + c * 5.6 - s * 4.8, cy + s * 5.6 + c * 4.8], [cx + c * 5.6 + s * 4.8, cy + s * 5.6 - c * 4.8]]);
    }
    P.outline("ink");
    P.on("ink", "green", (x, y) => Math.abs(x - cx) < 0.5 || Math.abs(y - cy) < 0.5);
    for (let i = 0; i < 4; i++) { const a = Math.PI / 4 + i * Math.PI / 2; P.line("lime", cx + Math.cos(a) * 2, cy + Math.sin(a) * 2, cx + Math.cos(a) * 7, cy + Math.sin(a) * 7, 1.3); }
  }, 24) },
  { tier: 1, name: "sprout", make: () => picture(["lime", "green", "brown", "ink"], P => {
    P.rect("green", 10.5, 9, 13.5, 19);
    P.rell("lime", 6.5, 7.5, 5, 2.7, 0.45); P.rell("lime", 16.5, 6.5, 5, 2.7, -0.45);
    P.when("brown", (x, y) => ((x - 11.5) / 10.5) ** 2 + ((y - 21.5) / 5) ** 2 <= 1 && y < 22.5);
    P.outline("ink");
    P.line("green", 10, 9, 4.5, 6.5, 1); P.line("green", 13, 8, 18.5, 5.5, 1);
  }, 24) },
  { tier: 1, name: "watering can 2", make: () => picture(["teal", "white", "sky", "ink"], P => {
    P.when("teal", (x, y) => { const d = Math.hypot((x - 11) / 1.2, y - 13); return d > 4 && d < 7 && y < 13; });
    P.poly("teal", [[17, 25], [24.5, 12], [27, 13.5], [20, 27]]);
    P.rell("teal", 26, 11.8, 3.4, 1.9, 0.55);
    P.rect("teal", 3, 14, 19, 28); P.ell("teal", 11, 14, 8, 2.4);
    P.on("white", "teal", (x, y) => y >= 18 && y < 21 && x < 19);
    P.outline("ink", true);
    for (const [dx, dy] of [[28, 16.5], [30.5, 19], [27, 21.5], [29.5, 24.5], [26, 27]]) P.rell("sky", dx, dy, 1.1, 2, 0);
  }, 32) },
  { tier: 1, name: "sunflower", make: () => picture(["sky", "white", "green", "dkgreen", "yellow", "brown", "tan"], P => {
    P.all("sky"); P.ell("white", 26, 5, 4.5, 1.8); P.ell("white", 5, 9, 3.5, 1.4);
    P.ell("green", 16, 40, 26, 12);
    P.rect("dkgreen", 15, 16, 17, 32); P.rell("dkgreen", 21, 23, 4.5, 2, -0.5); P.rell("dkgreen", 11, 26, 4.5, 2, 0.5);
    P.when("yellow", (x, y) => { const d = Math.hypot(x - 16, y - 11), a = Math.atan2(y - 11, x - 16); return d < 6 + 3 * Math.abs(Math.cos(a * 6)); });
    P.ell("brown", 16, 11, 4.6, 4.6);
    P.on("tan", "brown", (x, y) => (fl(x) + fl(y)) % 2 === 0 && Math.hypot(x - 16, y - 11) < 3.4);
  }, 32) },
  { tier: 1, name: "snowflake", make: () => picture(["navy", "blue", "white", "cyan"], P => {
    P.all("navy"); P.ell("blue", 16, 16, 13.5, 13.5);
    for (const [sx, sy] of [[2, 3], [29, 2], [3, 28], [28, 29], [30, 15], [1, 17], [15, 0]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 - Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
      P.line("white", 16, 16, 16 + c * 12.5, 16 + s * 12.5, 1.8);
      for (const [r, l] of [[6, 3.6], [9.5, 2.8]]) for (const sg of [-1, 1]) { const b = a + sg * 0.8; P.line("white", 16 + c * r, 16 + s * r, 16 + c * r + Math.cos(b) * l, 16 + s * r + Math.sin(b) * l, 1.4); }
      P.ell("cyan", 16 + c * 12.5, 16 + s * 12.5, 1.3, 1.3);
    }
    const hex = []; for (let i = 0; i < 6; i++) hex.push([16 + Math.cos(i * Math.PI / 3) * 3.3, 16 + Math.sin(i * Math.PI / 3) * 3.3]);
    P.poly("cyan", hex);
  }, 32) },
  { tier: 1, name: "kite", make: () => picture(["sky", "white", "green", "red", "yellow", "dkgrey"], P => {
    P.all("sky"); P.ell("white", 6, 6, 4.5, 1.8); P.ell("white", 8.5, 4.5, 3, 1.6); P.ell("white", 26, 26, 4, 1.5);
    P.ell("green", 6, 37, 16, 7.5); P.ell("green", 28, 38, 13, 7.5);
    P.when("dkgrey", (x, y) => y > 21 && Math.abs(x - (18.5 - (y - 21) * 1.3 + Math.sin((y - 21) * 0.5))) < 0.6);
    const tx = y => 19 + Math.sin((y - 21) * 0.55) * 2.5 + (y - 21) * 0.3;
    P.when("dkgrey", (x, y) => y > 21 && y < 31.5 && Math.abs(x - tx(y)) < 0.55);
    for (const [by, k] of [[24.5, "yellow"], [28.5, "red"]]) { const bx = tx(by); P.poly(k, [[bx, by], [bx - 2.6, by - 1.6], [bx - 2.6, by + 1.6]]); P.poly(k, [[bx, by], [bx + 2.6, by - 1.6], [bx + 2.6, by + 1.6]]); }
    P.poly("red", [[18.5, 1.5], [26.5, 10.5], [18.5, 21.5], [10.5, 10.5]]);
    P.on("yellow", "red", (x, y) => (x < 18.5) !== (y < 10.5));
    P.line("dkgrey", 18.5, 2.5, 18.5, 20.5, 1); P.line("dkgrey", 11.5, 10.5, 25.5, 10.5, 1);
  }, 32) },
  { tier: 1, name: "beach umbrella", make: () => picture(["sky", "yellow", "blue", "tan", "red", "white"], P => {
    P.all("sky"); P.ell("yellow", 27, 5, 3, 3);
    P.rect("blue", 0, 16, 32, 22);
    P.when("white", (x, y) => y > 21 + Math.sin(x * 0.6) * 0.6 && y < 22.6 + Math.sin(x * 0.6) * 0.6);
    P.when("tan", (x, y) => y > 22.5 + Math.sin(x * 0.6) * 0.6);
    const ax = 0.153, ay = 0.988, cx = 12.6, cy = 11;
    P.line("white", cx, cy, cx + ax * 19, cy + ay * 19, 1.6);
    const UV = (x, y) => { const u = (x - cx) * ay - (y - cy) * ax, v = (x - cx) * ax + (y - cy) * ay; return [u, v, u * 7 / Math.max(0.5, v + 7)]; };
    P.when("red", (x, y) => { const [u, v, q] = UV(x, y);
      if (v < 0) return (u / 12) ** 2 + (v / 7) ** 2 <= 1;
      return Math.abs(q) < 12 && v < 1.2 * Math.sqrt(Math.max(0, 1 - (((q + 12) % 4) - 2) ** 2 / 4)); });
    P.on("white", "red", (x, y) => fl((UV(x, y)[2] + 12) / 4) % 2 === 1);
    P.ell("white", cx - ax * 7.3, cy - ay * 7.3, 0.8, 1);
  }, 32) },
  { tier: 1, name: "party balloons", make: () => picture(["lilac", "red", "yellow", "blue", "white", "dkgrey"], P => {
    P.all("lilac");
    for (const [bx, by] of [[9, 17.5], [16, 13.5], [23, 18.5]]) P.when("dkgrey", (x, y) => y > by && y < 29.5 && Math.abs(x - (bx + (16 - bx) * (y - by) / (29.5 - by) + Math.sin(y * 0.9) * 0.4)) < 0.55);
    P.poly("dkgrey", [[16, 29], [13.5, 31.5], [18.5, 31.5]]);
    const bal = (k, cx, cy) => { P.ell(k, cx, cy, 5.3, 6.2); P.poly(k, [[cx, cy + 5], [cx - 1.4, cy + 7.6], [cx + 1.4, cy + 7.6]]); };
    bal("blue", 9, 10.5); bal("yellow", 23, 11.5); bal("red", 16, 7);
    for (const [hx, hy] of [[7, 8], [21, 9], [14, 4.5]]) P.rell("white", hx, hy, 1, 1.8, 0.4);
  }, 32) },
  { tier: 1, name: "candles", make: () => picture(["navy", "white", "pink", "mint", "yellow", "orange", "gold"], P => {
    P.all("navy");
    P.ell("gold", 16, 28.5, 14.5, 2.6);
    const candle = (k, x0, x1, top) => {
      const cx = (x0 + x1) / 2;
      P.rect(k, x0, top, x1, 28.5); P.ell(k, cx, 28.5, (x1 - x0) / 2, 1); P.ell(k, x0 + 1, top + 1.5, 1, 2);
      P.ell("yellow", cx, top - 4, 2, 2.8); P.poly("yellow", [[cx - 1.6, top - 4.5], [cx + 1.6, top - 4.5], [cx, top - 8.5]]);
      P.ell("orange", cx, top - 3.4, 1, 1.6);
    };
    candle("pink", 4, 10, 17); candle("white", 13, 19, 10); candle("mint", 22, 28, 14);
  }, 32) },
  { tier: 1, name: "pile of leaves", make: () => picture(["sky", "green", "brown", "orange", "red", "yellow"], P => {
    P.all("sky"); P.rect("green", 0, 25, 32, 32);
    P.rect("brown", 25, 0, 29.5, 26); P.line("brown", 26, 8, 18, 2, 1.8); P.ell("brown", 27.2, 26, 4, 1.2);
    P.when("orange", (x, y) => ((x - 13) / 12.5) ** 2 + ((y - 29) / 10) ** 2 <= 1);
    const n = (x, y) => Math.sin(x * 1.1 + y * 0.6) + Math.sin(y * 1.3 - x * 0.5 + 2);
    P.on("red", "orange", (x, y) => n(x, y) > 0.7); P.on("yellow", "orange", (x, y) => n(x, y) < -0.8);
    for (const [lx, ly, k, a] of [[8, 6, "red", 0.6], [15, 11, "yellow", -0.5], [20, 6, "orange", 0.3], [4, 14, "orange", -0.7], [22, 15, "red", 0.9]]) P.rell(k, lx, ly, 2, 1, a);
  }, 32) },
  // ----- medium -----
  { tier: 2, name: "rose", make: () => picture(["red", "maroon", "pink", "green", "dkgreen", "ink"], P => {
    P.rect("green", 16.5, 17, 19.5, 35.5);
    P.rell("green", 11, 26, 5.2, 2.5, 0.5); P.rell("green", 25, 29.5, 5.2, 2.5, -0.5);
    P.poly("green", [[19, 22], [22, 20.5], [19, 24]]); P.poly("green", [[17, 30], [14, 28.5], [17, 32]]);
    P.poly("dkgreen", [[10, 15], [18, 21.5], [26, 15], [22, 22], [14, 22]]);
    P.ell("red", 18, 12, 8.6, 7.6); P.poly("red", [[9.5, 12], [26.5, 12], [22.5, 19.5], [13.5, 19.5]]);
    P.ell("red", 13, 6, 4.2, 3); P.ell("red", 23, 6, 4.2, 3); P.ell("red", 18, 4.5, 4, 3);
    P.on("pink", "red", (x, y) => x < 13 && y > 8 && y < 17);
    P.outline("ink");
    P.on("maroon", ["red", "pink"], (x, y) => { const dx = (x - 18) / 1.15, dy = y - 9.5, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx); return d < 6.2 && Math.abs((((d - a * 0.9) % 3.1) + 3.1) % 3.1 - 1.55) < 0.5; });
    P.on("maroon", ["red", "pink"], (x, y) => y > 12 && ((Math.abs(Math.hypot(x - 9, y - 9) - 10) < 0.5 && x > 12) || (Math.abs(Math.hypot(x - 27, y - 9) - 10) < 0.5 && x < 24)));
    P.line("dkgreen", 7.5, 24.1, 14.5, 27.9, 1); P.line("dkgreen", 28.5, 27.6, 21.5, 31.4, 1);
  }, 36) },
  { tier: 2, name: "fern", make: () => picture(["green", "lime", "dkgreen", "ink"], P => {
    const frond = (k, p0, p1, p2, L0) => {
      const B = t => [(1 - t) ** 2 * p0[0] + 2 * t * (1 - t) * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * t * (1 - t) * p1[1] + t * t * p2[1]];
      const D = t => { const a = B(Math.max(0, t - 0.01)), b = B(Math.min(1, t + 0.01)), l = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
      const veins = [];
      for (let t = 0.12; t < 0.97; t += 0.075) {
        const [x, y] = B(t), [dx, dy] = D(t), L = L0 * (1 - t * 0.75);
        for (const sg of [-1, 1]) {
          const nx = -dy * sg + dx * 0.45, ny = dx * sg + dy * 0.45, nl = Math.hypot(nx, ny), ex = x + nx / nl * L, ey = y + ny / nl * L;
          P.rell(k, (x + ex) / 2, (y + ey) / 2, L / 2 + 0.5, 1.9, Math.atan2(ny, nx)); veins.push([x, y, ex, ey]);
        }
      }
      P.ell(k, ...B(1), 1.6, 1.6);
      return () => {
        for (let t = 0; t < 0.99; t += 0.05) P.line("dkgreen", ...B(t), ...B(Math.min(1, t + 0.05)), 1.1);
        for (const v of veins) P.line("dkgreen", v[0], v[1], v[0] + (v[2] - v[0]) * 0.65, v[1] + (v[3] - v[1]) * 0.65, 1);
      };
    };
    const a = frond("lime", [16, 35], [5, 26], [3, 11], 5), b = frond("lime", [20, 35], [31, 27], [33, 13], 5), c = frond("green", [18, 35], [13, 19], [22, 3], 6.5);
    P.outline("ink", true); a(); b(); c();
  }, 36) },
  { tier: 2, name: "coconut palm", make: () => picture(["tan", "brown", "green", "dkgreen", "ink"], P => {
    P.ell("tan", 18, 37.5, 15, 3.5);
    const T = t => [16 + 8 * t - 6 * t * (1 - t), 36 - 22 * t];
    P.when("brown", (x, y) => { for (let t = 0; t <= 1; t += 0.02) { const [cx, cy] = T(t); if (Math.hypot(x - cx, y - cy) < 3.2 - t * 0.8) return true; } return false; });
    const crown = T(1);
    const frond = (k, ang, len, droop) => {
      const pts = []; for (let t = 0; t <= 1.001; t += 0.04) pts.push([crown[0] + Math.cos(ang) * len * t, crown[1] + Math.sin(ang) * len * t + droop * t * t, 3.3 * (1 - t * 0.7)]);
      P.when(k, (x, y) => pts.some(([px, py, r]) => Math.hypot(x - px, y - py) < r));
    };
    frond("dkgreen", -2.6, 13, 6); frond("dkgreen", -0.5, 13, 6); frond("dkgreen", 2.65, 11, 8); frond("dkgreen", 0.5, 11, 8);
    frond("green", 3.05, 14, 8); frond("green", 0.1, 14, 8); frond("green", -1.6, 10, 2);
    P.ell("brown", crown[0] - 1.6, crown[1] + 2, 1.9, 1.9); P.ell("brown", crown[0] + 1.6, crown[1] + 2.2, 1.9, 1.9);
    P.outline("ink", true);
    P.on("tan", "brown", (x, y) => { const t = (36 - y) / 22; if (t < 0 || t > 0.85) return false; const cx = T(t)[0]; return ((y + Math.abs(x - cx) * 0.8) % 3) < 0.9 && Math.abs(x - cx) < 1.6; });
  }, 40) },
  { tier: 2, name: "monstera", make: () => picture(["green", "dkgreen", "tan", "brown", "ink"], P => {
    const frames = [];
    const leaf = (k, cx, cy, ang, R) => {
      const c = Math.cos(ang), s = Math.sin(ang);
      P.when(k, (x, y) => { const u = (x - cx) * c + (y - cy) * s, v = -(x - cx) * s + (y - cy) * c;
        return (u / R) ** 2 + (v / (R * 0.82)) ** 2 <= 1 && !(u < -R * 0.55 && Math.abs(v) < (-u - R * 0.55) * 0.9); });
      frames.push([k, (u, v) => [cx + u * c - v * s, cy + u * s + v * c], R]);
    };
    P.line("dkgreen", 20, 28, 20, 12, 3); P.line("dkgreen", 19, 28, 12, 20, 3); P.line("dkgreen", 21, 28, 28, 20, 3);
    leaf("dkgreen", 20, 9.5, -Math.PI / 2, 8.5); leaf("green", 10.5, 16.5, -2.5, 8); leaf("green", 29.5, 16.5, -0.64, 8);
    P.poly("tan", [[11, 29], [29, 29], [27, 39], [13, 39]]); P.rect("tan", 10, 26.5, 30, 29.5);
    P.outline("ink", true);
    P.on("brown", "tan", (x, y) => y > 29.5 && (fl(y) % 3 === 0 || (fl(x) + 2 * (fl(y / 3) % 2)) % 4 === 0));
    for (const [k, G, R] of frames) {
      P.line(k === "green" ? "dkgreen" : "green", ...G(-R * 0.5, 0), ...G(R * 0.85, 0), 1);
      for (const uk of [-0.25, 0.15, 0.5]) for (const sg of [-1, 1]) P.line("ink", ...G(uk * R, sg * R * 0.32), ...G(uk * R + R * 0.12, sg * R * 0.85), 1);
    }
  }, 40) },
  { tier: 2, name: "snake plant", make: () => picture(["dkgreen", "green", "yellow", "blue", "white", "ink"], P => {
    const leaf = (bx, by, tx, ty, w) => {
      const L = Math.hypot(tx - bx, ty - by), dx = (tx - bx) / L, dy = (ty - by) / L;
      const F = (x, y) => { const t = ((x - bx) * dx + (y - by) * dy) / L, v = -(x - bx) * dy + (y - by) * dx; return [t, Math.abs(v), w * Math.pow(Math.max(0, 1 - t), 0.6) * Math.min(1, 0.55 + t * 2.5)]; };
      P.when("dkgreen", (x, y) => { const [t, v, hw] = F(x, y); return t >= 0 && t <= 1 && v < hw; });
      P.when("green", (x, y) => { const [t, v, hw] = F(x, y); return t >= 0 && t <= 1 && v < hw - 1.4 && ((t * L + v * 0.9) % 3.8) < 1.5; });
      P.when("yellow", (x, y) => { const [t, v, hw] = F(x, y); return t >= 0 && t <= 0.85 && v < hw && v >= hw - 1.5 && hw > 2; });
    };
    leaf(12.5, 30, 5, 7, 3.6); leaf(24.5, 30, 31.5, 8, 3.6); leaf(15.5, 30, 13, 1, 4); leaf(21.5, 30, 24, 2, 4); leaf(18.5, 30, 18.5, 11, 3.4);
    P.poly("blue", [[9, 29], [27, 29], [25.5, 35.5], [10.5, 35.5]]); P.rect("blue", 8, 27, 28, 30);
    P.on("white", "blue", (x, y) => y > 31 && y < 33.5);
    P.outline("ink");
    P.rect("ink", 9, 30, 27, 31);
  }, 36) },
  { tier: 2, name: "scarf", make: () => picture(["teal", "white", "yellow", "ink"], P => {
    P.when("teal", (x, y) => ((x - 18) / 10.5) ** 2 + ((y - 9) / 5.8) ** 2 <= 1 && ((x - 18) / 6.2) ** 2 + ((y - 8.2) / 2.6) ** 2 > 1);
    const tail = (x0, y0, x1, y1, w) => {
      const L = Math.hypot(x1 - x0, y1 - y0), dx = (x1 - x0) / L, dy = (y1 - y0) / L;
      P.when("teal", (x, y) => { const t = (x - x0) * dx + (y - y0) * dy, v = -(x - x0) * dy + (y - y0) * dx; return t >= 0 && t <= L && Math.abs(v) < w; });
      P.on("white", "teal", (x, y) => { const t = (x - x0) * dx + (y - y0) * dy, v = -(x - x0) * dy + (y - y0) * dx; return t > 5 && t <= L && Math.abs(v) < w && t % 6 >= 3.5; });
      return [x1, y1, dx, dy];
    };
    const b = tail(19.5, 11, 21.5, 24, 3.2), a = tail(15, 11, 13, 32, 3.4);
    P.ell("teal", 16.5, 12.5, 4, 3.2);
    P.outline("ink");
    P.line("ink", 18.3, 15, 18, 25, 1);
    for (const [ex, ey, dx, dy] of [a, b]) for (let i = -1.5; i <= 1.5; i += 1) { const fx = ex - dy * i * 2.1, fy = ey + dx * i * 2.1; P.line("yellow", fx, fy + 0.5, fx + dx * 3.5, fy + dy * 3.5, 1); }
  }, 36) },
  { tier: 2, name: "birthday cake 2", make: () => picture(["tan", "pink", "white", "red", "sky", "yellow", "ink"], P => {
    P.ell("white", 20, 35.5, 17.5, 3.2);
    P.rect("tan", 6, 20, 34, 34); P.ell("tan", 20, 34, 14, 1.8);
    P.rect("white", 6, 26, 34, 28.5);
    P.ell("pink", 20, 19.5, 14.5, 3); P.rect("pink", 5.5, 19.5, 34.5, 22);
    for (const dx of [8, 12.5, 17, 23, 27.5, 32]) P.ell("pink", dx, 22.5, 1.6, 2.4);
    for (const cx of [12, 20, 28]) { P.rect("sky", cx - 2, 9.5, cx + 2, 19); P.ell("yellow", cx, 5.5, 2.3, 3.4); }
    for (const [cx, cy] of [[16, 18], [24, 18], [8.5, 19.5], [31.5, 19.5]]) P.ell("red", cx, cy, 2.3, 2.1);
    P.outline("ink", true);
  }, 40) },
  { tier: 2, name: "wreath", make: () => picture(["dkgreen", "green", "red", "maroon", "ink"], P => {
    P.when("dkgreen", (x, y) => { const d = Math.hypot(x - 18, y - 17); return d > 7.5 && d < 14.5; });
    for (let k = 0; k < 22; k++) { const a = k * Math.PI * 2 / 22, r = k % 2 ? 12.6 : 9.6; P.rell("green", 18 + Math.cos(a) * r, 17 + Math.sin(a) * r, 3.2, 1.5, a + Math.PI / 2 + 0.7); }
    for (const a of [-1.57, -0.5, 0.55, 2.6, 3.65]) for (const [ox, oy] of [[0, 0], [1.6, 0.9], [-0.3, 1.8]]) P.ell("red", 18 + Math.cos(a) * 11 + ox, 17 + Math.sin(a) * 11 + oy, 1.1, 1.1);
    P.poly("maroon", [[18, 28], [12, 35.5], [15.5, 35.5], [18, 31]]); P.poly("maroon", [[18, 28], [24, 35.5], [20.5, 35.5], [18, 31]]);
    P.rell("red", 13.5, 27, 4.2, 2.6, -0.35); P.rell("red", 22.5, 27, 4.2, 2.6, 0.35);
    P.ell("maroon", 18, 28, 2.4, 2.2);
    P.outline("ink");
  }, 36) },
  { tier: 2, name: "bouquet", make: () => picture(["tan", "red", "pink", "yellow", "lilac", "white", "green", "ink"], P => {
    P.rell("green", 7, 15, 5.5, 2, -0.6); P.rell("green", 33, 15, 5.5, 2, 0.6); P.rell("green", 20, 3.5, 1.8, 4, 0);
    const bloom = (k, cx, cy, r, kc) => {
      P.when(k, (x, y) => { const d = Math.hypot(x - cx, y - cy), a = Math.atan2(y - cy, x - cx); return d < r * (0.82 + 0.18 * Math.abs(Math.cos(a * 2.5))); });
      P.ell(kc, cx, cy, r * 0.32, r * 0.32);
    };
    bloom("lilac", 28, 11, 5.2, "yellow"); bloom("white", 10.5, 13, 5.8, "yellow"); bloom("yellow", 20, 8, 5.4, "tan"); bloom("pink", 15, 18, 4.8, "red"); bloom("pink", 25, 19, 4.8, "red");
    P.poly("tan", [[6, 20], [34, 20], [21.5, 39], [18.5, 39]]);
    P.on("red", "tan", (x, y) => y >= 27 && y < 30);
    P.rell("red", 16, 28.5, 3.5, 2, -0.3); P.rell("red", 24, 28.5, 3.5, 2, 0.3);
    P.outline("ink", true);
    P.line("ink", 14, 20.5, 19.5, 37, 1); P.line("ink", 26, 20.5, 20.5, 37, 1);
  }, 40) },
  { tier: 2, name: "rain boots", make: () => picture(["yellow", "orange", "sky", "white", "ink"], P => {
    P.ell("sky", 16, 28.5, 15.5, 3.2);
    for (const bx of [2, 16]) {
      P.rect("yellow", bx + 1, 4, bx + 9.5, 26); P.ell("yellow", bx + 9.5, 23.5, 4.5, 3.3); P.rect("yellow", bx + 1, 23.5, bx + 13.5, 26);
      P.rect("orange", bx, 3, bx + 10.5, 6.5); P.rect("orange", bx + 1, 25.5, bx + 14, 28.5);
    }
    P.outline("ink", true);
    for (const bx of [2, 16]) P.rect("white", bx + 3, 9, bx + 4, 20);
  }, 32) },
  { tier: 2, name: "radishes 2", make: () => picture(["red", "white", "green", "dkgreen", "ink"], P => {
    for (const [lx, ly, a] of [[8, 7, -0.5], [13, 4.5, -0.15], [19, 4.5, 0.15], [24, 7, 0.5]]) P.rell("green", lx, ly, 2.6, 5, a);
    P.line("dkgreen", 9.5, 18, 12, 9, 3.2); P.line("dkgreen", 16, 20, 16, 8, 3.2); P.line("dkgreen", 22.5, 18, 20, 9, 3.2);
    for (const [cx, cy] of [[9.5, 20.5], [22.5, 20.5], [16, 23]]) {
      P.poly("white", [[cx - 2, cy + 3], [cx + 2, cy + 3], [cx, cy + 8]]);
      P.ell("red", cx, cy, 5, 4.8);
      P.on("white", "red", (x, y) => Math.hypot(x - cx, y - cy) < 5.1 && y > cy + 2);
    }
    P.outline("ink", true);
  }, 32) },
  { tier: 2, name: "ice skate", make: () => picture(["white", "red", "grey", "sky", "ink"], P => {
    P.ell("sky", 18, 33.5, 16, 2.4);
    P.rect("grey", 11, 24, 14.5, 30); P.rect("grey", 23.5, 24, 27, 30);
    P.line("grey", 5, 30, 29, 30, 3.2);
    P.when("grey", (x, y) => { const d = Math.hypot(x - 29, y - 27); return d > 1.5 && d < 4.6 && x > 29 && y < 30.5; });
    P.poly("white", [[9, 4], [20, 4], [20.5, 14], [27, 17.5], [30, 20.5], [30, 23.5], [8.5, 23.5], [8.5, 14]]);
    P.rect("red", 8.5, 22.5, 30.5, 25); P.rect("red", 8.5, 3, 20.5, 7.5);
    P.outline("ink", true);
    for (let i = 0; i < 4; i++) { const x = 18.5 + i * 1.6, y = 9 + i * 2.4; P.line("ink", x - 1, y - 1, x + 1, y + 1, 1); P.line("ink", x + 1, y - 1, x - 1, y + 1, 1); }
  }, 36) },
  { tier: 2, name: "lotus", make: () => picture(["teal", "cyan", "green", "dkgreen", "pink", "white", "yellow"], P => {
    P.all("teal");
    P.when("cyan", (x, y) => { const d = Math.hypot(x - 18, y - 17), a = Math.atan2(y - 17, x - 18); return (Math.abs(d - 13) < 0.5 && Math.sin(a * 3) > 0.2) || (Math.abs(d - 15.5) < 0.5 && Math.sin(a * 3 + 1.5) > 0.4); });
    const pad = (cx, cy, r, a0) => {
      P.when("green", (x, y) => { const d = Math.hypot(x - cx, (y - cy) * 1.2), a = Math.atan2((y - cy) * 1.2, x - cx); return d < r && Math.abs(((a - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI) > 0.3; });
      for (let k = 1; k < 6; k++) { const a = a0 + k * Math.PI / 3; P.line("dkgreen", cx, cy, cx + Math.cos(a) * r * 0.8, cy + Math.sin(a) * r * 0.8 / 1.2, 1); }
    };
    pad(6, 6, 6.5, 0.8); pad(30, 30, 6.5, -2.4); pad(4, 30.5, 4.5, -0.6); pad(32, 5, 4, 2.4);
    const petal = (k, ang, L, W) => { const c = Math.cos(ang), s = Math.sin(ang);
      P.when(k, (x, y) => { const u = (x - 18) * c + (y - 17) * s, v = -(x - 18) * s + (y - 17) * c; return u > 0 && u < L && Math.abs(v) < W * Math.sqrt(Math.sin(Math.PI * u / L)); }); };
    for (let i = 0; i < 8; i++) petal("pink", i * Math.PI / 4, 11, 3.6);
    P.on("teal", "pink", (x, y) => { const a = Math.atan2(y - 17, x - 18), d = Math.hypot(x - 18, y - 17); const b = Math.round((a - Math.PI / 8) / (Math.PI / 4)) * Math.PI / 4 + Math.PI / 8; return Math.abs(Math.sin(a - b)) * d < 0.55; });
    for (let i = 0; i < 8; i++) petal("white", i * Math.PI / 4 + Math.PI / 8, 7.5, 2.6);
    P.on("pink", "white", (x, y) => { const a = Math.atan2(y - 17, x - 18), d = Math.hypot(x - 18, y - 17); const b = Math.round(a / (Math.PI / 4)) * Math.PI / 4; return Math.abs(Math.sin(a - b)) * d < 0.5; });
    P.ell("yellow", 18, 17, 2.6, 2.6);
  }, 36) },
  { tier: 2, name: "lavender field 2", make: () => picture(["sky", "yellow", "white", "green", "dkgreen", "purple", "lilac"], P => {
    P.all("sky"); P.ell("yellow", 28, 6.5, 3.5, 3.5); P.ell("white", 9, 5, 5, 1.8); P.ell("white", 12.5, 3.6, 3, 1.4);
    P.when("green", (x, y) => y > 13.5 + Math.sin(x * 0.22 + 1) * 1.5);
    P.ell("dkgreen", 6, 11.5, 3, 3.4); P.ell("dkgreen", 31, 12.5, 2.4, 2.6);
    const U = (x, y) => (x - 18) / (y - 12) * 2.6;
    P.when("purple", (x, y) => y > 17 && U(x, y) - fl(U(x, y)) < 0.62);
    P.when("dkgreen", (x, y) => y > 17 && U(x, y) - fl(U(x, y)) >= 0.62);
    P.on("lilac", "purple", (x, y) => (fl(x) * 3 + fl(y) * 2) % 5 === 0);
  }, 36) },
  { tier: 2, name: "snowy pine", make: () => picture(["sky", "white", "lilac", "dkgreen", "green", "brown"], P => {
    P.all("sky");
    for (const [sx, sy] of [[3, 4], [8, 12], [5, 21], [30, 5], [33, 14], [28, 22], [12, 2], [25, 1], [2, 27], [34, 25]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.when("white", (x, y) => y > 29 + Math.sin(x * 0.25) * 1.2);
    P.ell("lilac", 22, 31.5, 9, 1.5);
    P.rect("brown", 16, 25, 20, 31);
    for (const [b, w, ap] of [[27, 13, 16], [21.5, 10, 10.5], [16, 7.5, 5.5], [10.5, 5, 1.5]]) {
      const inT = (x, y) => y < b && y > ap && Math.abs(x - 18) < w * (y - ap) / (b - ap);
      P.when("dkgreen", inT);
      P.when("green", (x, y) => inT(x, y) && x < 18);
      P.when("white", (x, y) => inT(x, y) && y > b - 1.8 - Math.abs(Math.sin(x * 1.1)) * 1.4);
    }
  }, 36) },
  { tier: 2, name: "bird house", make: () => picture(["sky", "white", "green", "brown", "tan", "red", "dkgrey", "blue"], P => {
    P.all("sky"); P.ell("white", 6, 4.5, 4.5, 1.7); P.ell("white", 30, 9, 4, 1.5);
    P.ell("green", 18, 46, 30, 13);
    P.rect("brown", 16.5, 24, 19.5, 36);
    P.rect("tan", 10, 13, 26, 25);
    P.poly("red", [[6.5, 15.5], [18, 4.5], [29.5, 15.5]]);
    P.ell("dkgrey", 18, 18.5, 2.6, 2.6); P.rect("dkgrey", 16.5, 22, 19.5, 23);
    P.ell("blue", 10.5, 9.4, 2.8, 2); P.ell("blue", 8.4, 7.4, 1.7, 1.7); P.poly("blue", [[12.5, 8.8], [15.5, 7.4], [13, 10.6]]);
  }, 36) },
  { tier: 2, name: "sandcastle", make: () => picture(["sky", "blue", "white", "tan", "gold", "brown", "red", "orange"], P => {
    P.all("sky"); P.ell("white", 8, 5, 5, 1.8); P.ell("white", 31, 7, 4, 1.5);
    P.rect("blue", 0, 15, 40, 22);
    P.when("white", (x, y) => y > 21 + Math.sin(x * 0.5) * 0.8 && y < 23 + Math.sin(x * 0.5) * 0.8);
    P.when("tan", (x, y) => y > 22.5 + Math.sin(x * 0.5) * 0.8);
    const tower = (x0, x1, top) => { P.rect("gold", x0, top, x1, 34); for (let x = x0; x < x1; x += 3) P.rect("gold", x, top - 2, x + 2, top); };
    tower(5, 13, 15); tower(27, 35, 15); tower(15, 25, 10); P.rect("gold", 5, 22, 35, 34);
    P.ell("gold", 20, 34, 16, 1.5);
    P.ell("brown", 20, 28, 2, 2); P.rect("brown", 18, 28, 22, 34);
    P.rect("brown", 8, 19, 10, 21.5); P.rect("brown", 30, 19, 32, 21.5); P.rect("brown", 19, 14, 21, 17);
    P.poly("red", [[33, 31], [39, 31], [38, 38.5], [34, 38.5]]); P.when("red", (x, y) => Math.abs(Math.hypot(x - 36, y - 31) - 2.6) < 0.5 && y < 31);
    const st = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 1.9 : 4.4; st.push([6 + Math.cos(a) * r, 35.5 + Math.sin(a) * r]); }
    P.poly("orange", st);
  }, 40) },
  { tier: 2, name: "sledge 2", make: () => picture(["sky", "white", "lilac", "dkgreen", "brown", "red"], P => {
    P.all("sky");
    const hill = x => 14 + Math.sin(x * 0.18 + 0.5) * 3;
    P.when("lilac", (x, y) => y > hill(x));
    for (const [px, h] of [[4, 6], [8.5, 5], [27, 7], [31.5, 5]]) { const pb = hill(px) + 1.5; P.poly("dkgreen", [[px - h * 0.45, pb], [px, pb - h], [px + h * 0.45, pb]]); }
    P.when("white", (x, y) => y > 20 + Math.sin(x * 0.15) * 1.5);
    for (const [sx, sy] of [[3, 2], [11, 5], [19, 2], [24, 7], [33, 3], [15, 9]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.ell("lilac", 17, 29.5, 13, 1.4);
    P.rect("brown", 6, 19.5, 28, 22.5);
    P.line("red", 5, 27, 27, 27, 1.8);
    P.when("red", (x, y) => Math.abs(Math.hypot(x - 27, y - 23.5) - 3.5) < 0.9 && x > 27);
    for (const sx of [9, 17, 25]) P.line("red", sx, 22.5, sx, 27, 1.4);
    P.when("red", (x, y) => x > 30 && x < 35 && Math.abs(y - (20.5 + (x - 30) ** 2 * 0.25)) < 0.6);
    P.on("sky", "brown", (x, y) => fl(x) % 5 === 0);
  }, 36) },
  { tier: 2, name: "lantern string", make: () => picture(["navy", "purple", "white", "grey", "red", "orange", "pink", "yellow"], P => {
    P.all("navy");
    for (const [sx, sy] of [[3, 2], [11, 4], [18, 1], [26, 3], [24, 9], [38, 10], [2, 16], [36, 18], [9, 22], [30, 23], [15, 20], [6, 10]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.ell("white", 35, 4.5, 2.6, 2.6); P.ell("navy", 36.3, 3.6, 2.2, 2.2);
    P.poly("purple", [[0, 40], [0, 31], [5, 27], [10, 31], [10, 29], [16, 29], [16, 25], [21, 21], [26, 25], [26, 31], [31, 28], [36, 31], [36, 27], [40, 27], [40, 40]]);
    for (const [wx, wy] of [[3, 33], [12, 32], [18, 28], [22, 33], [32, 34], [37, 30]]) P.rect("yellow", wx, wy, wx + 2, wy + 2);
    const S = x => 6 + 7 * (1 - ((x - 20) / 21) ** 2);
    P.when("grey", (x, y) => Math.abs(y - S(x)) < 0.65);
    for (const [cx, k] of [[5, "red"], [12, "orange"], [20, "pink"], [28, "red"], [35, "orange"]]) {
      const top = S(cx);
      P.ell(k, cx, top + 6, 3.2, 3.8);
      P.on("yellow", k, (x, y) => Math.abs(x - cx) < 1 && Math.abs(y - top - 6) < 2.2);
      P.rect("yellow", cx - 2, top + 1.6, cx + 2, top + 2.6); P.rect("yellow", cx - 2, top + 9.4, cx + 2, top + 10.4);
      P.line("yellow", cx - 0.5, top + 10.4, cx - 0.5, top + 13, 1);
    }
  }, 40) },
  { tier: 2, name: "cherry blossom", make: () => picture(["sky", "brown", "pink", "white", "green"], P => {
    P.all("sky");
    P.line("brown", -1, 33, 14, 23, 3.2); P.line("brown", 14, 23, 27, 15, 2.6); P.line("brown", 27, 15, 41, 9, 2);
    P.line("brown", 10, 25.5, 15, 34, 1.6); P.line("brown", 19, 20, 20, 10, 1.6); P.line("brown", 30, 13.5, 35, 20, 1.4); P.line("brown", 35, 11, 38, 4, 1.2);
    for (const [lx, ly, a] of [[18, 31, 0.8], [23.5, 9.5, -0.6], [38, 24.5, 0.5], [5, 23, -0.4], [33, 7.5, -0.3], [12, 35, 0.9]]) P.rell("green", lx, ly, 2.8, 1.4, a);
    const fl5 = (cx, cy, k, kc) => { for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5 - Math.PI / 2; P.ell(k, cx + Math.cos(a) * 2, cy + Math.sin(a) * 2, 1.7, 1.7); } P.ell(kc, cx, cy, 1.1, 1.1); };
    for (const [x, y, w] of [[6, 27, 0], [13, 19, 1], [15.5, 33, 0], [20, 8, 0], [22.5, 16, 1], [26, 21, 0], [31, 10, 0], [35, 21.5, 1], [38, 5, 0], [9, 31, 1], [28, 6, 1]]) w ? fl5(x, y, "white", "pink") : fl5(x, y, "pink", "white");
    for (const [px, py] of [[6, 8], [12, 4], [30, 30], [24, 35], [38, 33], [4, 37]]) P.rell("pink", px, py, 1.3, 0.8, 0.5);
  }, 40) },
  // ----- complex -----
  { tier: 3, name: "bonsai", make: () => picture(["lilac", "tan", "blue", "sky", "brown", "dkgreen", "green", "lime"], P => {
    P.all("lilac"); P.rect("tan", 0, 37, 44, 44);
    const path = [[21, 32], [19, 27], [22.5, 22], [27, 18], [24, 13], [19, 10.5]];
    for (let i = 0; i < path.length - 1; i++) P.line("brown", ...path[i], ...path[i + 1], 5 - i * 0.7);
    P.line("brown", 21, 23, 11, 19, 2); P.line("brown", 26, 17, 34, 14, 2); P.line("brown", 21, 11.5, 14, 8.5, 1.6); P.line("brown", 24, 21, 29, 22, 1.6);
    P.line("brown", 21, 31, 15, 33, 2.2); P.line("brown", 21, 31, 27, 33, 2.2);
    for (const [cx, cy, rx, ry] of [[10, 17, 7.5, 3.4], [34, 12.5, 7, 3.2], [17.5, 7.5, 8, 3.8], [30, 21.5, 5, 2.4]]) {
      P.ell("dkgreen", cx, cy, rx, ry); P.ell("dkgreen", cx - rx * 0.5, cy - ry * 0.5, rx * 0.5, ry * 0.8); P.ell("dkgreen", cx + rx * 0.45, cy - ry * 0.4, rx * 0.5, ry * 0.8);
      P.ell("green", cx - rx * 0.45, cy - ry * 0.6, rx * 0.35, ry * 0.45); P.ell("green", cx + rx * 0.4, cy - ry * 0.5, rx * 0.35, ry * 0.45);
    }
    P.ell("lime", 22, 31.6, 13, 2.6);
    P.poly("blue", [[8, 33], [36, 33], [33, 38.5], [11, 38.5]]); P.rect("sky", 7, 31.5, 37, 33.5);
    P.rect("blue", 12, 38.5, 15, 40); P.rect("blue", 29, 38.5, 32, 40);
  }, 44) },
  { tier: 3, name: "vegetable patch", make: () => picture(["sky", "yellow", "white", "green", "tan", "brown", "dkgreen", "orange", "red"], P => {
    P.all("sky"); P.ell("yellow", 41, 5, 3.5, 3.5); P.ell("white", 10, 6, 6, 2); P.ell("white", 14, 4.5, 4, 1.6); P.ell("white", 30, 8, 4, 1.4);
    P.rect("green", 0, 13, 48, 20);
    for (let x = 1; x < 48; x += 5) { P.rect("white", x, 11, x + 2.5, 20); P.poly("white", [[x, 11], [x + 1.25, 9.2], [x + 2.5, 11]]); }
    P.rect("white", 0, 13, 48, 14.2); P.rect("white", 0, 17, 48, 18.2);
    P.rect("tan", 0, 20, 48, 48);
    P.rect("brown", 2, 22, 46, 28); P.rect("brown", 2, 31, 46, 37.5); P.rect("brown", 2, 41, 46, 47.5);
    for (let x = 7; x < 44; x += 8.5) {
      P.rect("tan", x - 0.5, 13, x + 0.5, 25);
      P.ell("dkgreen", x, 19.5, 3.2, 5); P.ell("dkgreen", x, 24.5, 2.6, 1.8);
      for (const [ox, oy] of [[-1.5, 17], [1.5, 20], [-1, 22.5], [1.2, 15.5]]) P.ell("red", x + ox, oy, 1.2, 1.2);
    }
    for (let x = 6; x < 46; x += 6.5) { P.ell("green", x, 33.5, 3.4, 2.8); P.ell("dkgreen", x, 33.7, 1.5, 1.3); }
    for (let x = 5; x < 46; x += 4.5) {
      P.line("dkgreen", x, 42, x - 1.8, 38, 1); P.line("dkgreen", x, 42, x + 1.8, 38, 1); P.line("dkgreen", x, 42, x, 37.5, 1);
      P.ell("orange", x, 43.5, 1.6, 2);
    }
  }, 48) },
  { tier: 3, name: "autumn tree", make: () => picture(["sky", "white", "green", "tan", "brown", "orange", "red", "yellow"], P => {
    P.all("sky"); P.ell("white", 7, 6, 5, 1.8); P.ell("white", 38, 4, 4.5, 1.6);
    P.when("green", (x, y) => y > 34 + Math.sin(x * 0.18) * 1.5);
    P.poly("tan", [[19, 37], [25, 37], [31, 44], [13, 44]]);
    P.poly("brown", [[18.5, 37.5], [20.5, 22], [23.5, 22], [25.5, 37.5]]);
    P.line("brown", 22, 25, 13, 16, 2); P.line("brown", 22, 25, 31, 15, 2); P.line("brown", 22, 23, 22, 10, 2);
    for (const [cx, cy, rx, ry] of [[22, 14, 14, 8.5], [11.5, 18, 8, 6], [32.5, 18, 8, 6], [22, 7.5, 9.5, 5.5]]) P.ell("orange", cx, cy, rx, ry);
    const n = (x, y) => Math.sin(x * 0.55 + 1.3) * Math.cos(y * 0.6) + 0.6 * Math.sin((x + y) * 0.33);
    P.on("yellow", "orange", (x, y) => n(x, y) > 0.35); P.on("red", "orange", (x, y) => n(x, y) < -0.4);
    P.line("brown", 22, 23, 17, 19.5, 1.2); P.line("brown", 22, 23, 27, 19, 1.2);
    P.ell("orange", 14, 36.5, 4.5, 1.6); P.ell("red", 30, 36.5, 4, 1.4); P.ell("yellow", 34, 37.5, 2.6, 1);
    for (const [lx, ly, k, a] of [[5, 26, "red", 0.5], [38, 27, "yellow", -0.6], [9, 31, "orange", 0.8], [36, 32, "red", 0.2], [40, 13, "orange", -0.3]]) P.rell(k, lx, ly, 1.8, 1, a);
  }, 44) },
  { tier: 3, name: "greenhouse 2", make: () => picture(["sky", "white", "mint", "green", "pink", "orange", "dkgreen", "tan"], P => {
    P.all("sky"); P.ell("white", 8, 5, 5, 1.8); P.ell("white", 40, 7, 4.5, 1.6);
    P.rect("dkgreen", 0, 37, 48, 48);
    P.poly("tan", [[20, 38], [28, 38], [33, 48], [15, 48]]);
    P.rect("mint", 5, 20, 43, 38); P.poly("mint", [[3.5, 20.5], [24, 7], [44.5, 20.5]]);
    for (const [x0, x1] of [[6, 19], [29, 42]]) {
      P.rect("orange", x0, 34, x1, 37.5);
      for (let x = x0 + 2; x < x1 - 1; x += 4) { P.ell("green", x, 31, 2.3, 3); P.ell("pink", x - 0.5, 29.5, 1.4, 1.4); P.ell("pink", x + 1, 31.5, 1, 1); }
    }
    P.when("green", (x, y) => y > 21 && y < 29 && (x < 18 || x > 30) && Math.abs(((x + Math.sin(y * 0.8) * 1.2) % 6) - 3) < 0.8);
    for (const x of [5, 11.5, 18, 29.5, 36, 42.5]) { P.rect("white", x - 0.5, 20, x + 0.5, 38); P.line("white", 24, 7, x, 20.5, 1); }
    P.rect("white", 5, 19.5, 43, 20.7); P.rect("white", 5, 28.5, 43, 29.5);
    P.line("white", 3.5, 20.5, 24, 7, 1.4); P.line("white", 44.5, 20.5, 24, 7, 1.4);
    P.rect("white", 19, 23, 29, 38); P.rect("mint", 20, 24, 28, 38); P.rect("white", 23.5, 24, 24.5, 38);
    P.line("white", 8, 26.5, 10, 22.5, 1); P.line("white", 38.5, 26.5, 40.5, 22.5, 1);
  }, 48) },
  { tier: 3, name: "sunflower field", make: () => picture(["sky", "white", "blue", "green", "dkgreen", "yellow", "orange", "brown"], P => {
    P.all("sky"); P.ell("white", 9, 5, 5.5, 2); P.ell("white", 35, 8, 4.5, 1.6);
    P.when("blue", (x, y) => y > 16 + Math.sin(x * 0.15 + 1) * 2.5);
    P.when("green", (x, y) => y > 21 + Math.sin(x * 0.1) * 1);
    for (let x = 1.5; x < 48; x += 3.5) { const y = 22.5 + (fl(x) % 3) * 0.4; P.ell("yellow", x, y, 1.6, 1.4); P.rect("brown", fl(x), fl(y), fl(x) + 1, fl(y) + 1); }
    const sun = (cx, cy, R, rc) => {
      P.when("yellow", (x, y) => { const d = Math.hypot(x - cx, y - cy), a = Math.atan2(y - cy, x - cx); return d < R * (0.7 + 0.3 * Math.abs(Math.cos(a * 6))); });
      if (rc > 1.5) P.ell("orange", cx, cy, rc + 1.1, rc + 1.1);
      P.ell("brown", cx, cy, rc, rc);
    };
    for (let x = 3; x < 48; x += 6) { P.line("dkgreen", x, 28, x, 36, 1.2); sun(x, 27, 3, 1.3); }
    for (const [cx, cy, R] of [[9, 34, 7], [25, 30, 7.5], [40, 35, 6.5]]) {
      P.line("dkgreen", cx, cy, cx + 0.5, 48, 2.2); P.rell("dkgreen", cx + 4.5, cy + 9, 4.2, 1.8, -0.5); P.rell("dkgreen", cx - 4.5, cy + 11, 4.2, 1.8, 0.5);
      sun(cx, cy, R, R * 0.38);
    }
  }, 48) },
  { tier: 3, name: "flower stall", make: () => picture(["peach", "red", "white", "brown", "grey", "pink", "yellow", "purple", "green"], P => {
    P.all("peach");
    P.rect("red", 0, 0, 48, 9); P.on("white", "red", x => fl(x / 4) % 2 === 1);
    for (let i = 0; i < 12; i++) P.ell(i % 2 ? "white" : "red", i * 4 + 2, 9, 2, 2.2);
    P.rect("brown", 1, 11, 3, 48); P.rect("brown", 45, 11, 47, 48);
    P.rect("brown", 3, 33, 45, 36); P.rect("brown", 5, 36, 7, 48); P.rect("brown", 41, 36, 43, 48);
    const buckets = [[5, "pink"], [15.5, "yellow"], [26, "purple"], [36.5, "red"]];
    for (const [bx, k] of buckets) {
      const cx = bx + 3.5;
      for (const ox of [-2.5, 0, 2.5]) P.line("green", cx + ox * 0.4, 26, cx + ox, 17, 1);
      for (const [ox, oy] of [[-2.5, 16], [0, 14.5], [2.5, 16], [-1.3, 19.5], [1.3, 19.5]]) {
        if (k === "pink") { P.ell(k, cx + ox, oy + 0.5, 1.4, 1.3); P.poly(k, [[cx + ox - 1.4, oy + 0.5], [cx + ox - 1.2, oy - 1.6], [cx + ox, oy - 0.6], [cx + ox + 1.2, oy - 1.6], [cx + ox + 1.4, oy + 0.5]]); }
        else if (k === "yellow") { P.ell(k, cx + ox, oy, 1.7, 1.7); P.rect("brown", fl(cx + ox), fl(oy), fl(cx + ox) + 1, fl(oy) + 1); }
        else if (k === "purple") P.ell(k, cx + ox, oy - 0.5, 0.9, 2.4);
        else P.ell(k, cx + ox, oy, 1.6, 1.5);
      }
      P.poly("grey", [[bx, 25], [bx + 8, 25], [bx + 7, 33], [bx + 1, 33]]);
    }
    for (const [bx, k] of [[11, "white"], [27, "pink"]]) {
      for (const ox of [-3, 0, 3]) P.line("green", bx + 5, 47, bx + 5 + ox, 39, 1);
      for (const [ox, oy] of [[-3, 38.5], [0, 37.5], [3, 38.5], [-1.5, 40.5], [1.5, 40.5]]) P.ell(k, bx + 5 + ox, oy, 1.6, 1.5);
      P.poly("grey", [[bx, 41], [bx + 10, 41], [bx + 9, 48], [bx + 1, 48]]);
    }
  }, 48) },
  { tier: 3, name: "picnic", make: () => picture(["sky", "white", "yellow", "dkgreen", "green", "red", "brown", "tan"], P => {
    P.all("sky"); P.ell("yellow", 38, 6, 3.5, 3.5); P.ell("white", 24, 6, 5, 1.8); P.ell("white", 28, 4.5, 3, 1.4);
    P.rect("green", 0, 18, 44, 44);
    for (const [tx, r] of [[26, 3], [31, 3.6], [36.5, 3], [41.5, 3.4]]) P.ell("dkgreen", tx, 18, r, r * 0.9);
    P.rect("brown", 5, 8, 9, 24); P.ell("dkgreen", 7, 6, 9, 7); P.ell("dkgreen", 2, 11, 5, 4); P.ell("dkgreen", 13, 11, 5, 4);
    P.when("red", (x, y) => { if (y < 26 || y > 41) return false; const t = (y - 26) / 15, xl = 9 - 6 * t, xr = 35 + 6 * t; return x > xl && x < xr; });
    P.on("white", "red", (x, y) => { const t = (y - 26) / 15, xl = 9 - 6 * t, xr = 35 + 6 * t, s = (x - xl) / (xr - xl); return (fl(s * 7) + fl(t * 5)) % 2 === 0; });
    P.when("brown", (x, y) => { const d = Math.hypot(x - 29, y - 25); return d > 3.6 && d < 5 && y < 25; });
    P.poly("tan", [[23, 25], [35, 25], [34, 33], [24, 33]]);
    P.on("brown", "tan", (x, y) => fl(y) % 3 === 0 || (fl(x) + fl(y / 3) * 2) % 4 === 0);
    P.rect("brown", 22.5, 24.5, 35.5, 26);
    P.ell("yellow", 13, 33, 2.6, 2.6); P.ell("white", 13, 33, 1.2, 1.2);
    for (const [fx, fy] of [[3, 24], [40, 22], [42, 41], [6, 43], [20, 21]]) P.ell("yellow", fx, fy, 0.9, 0.9);
  }, 44) },
  { tier: 3, name: "fireworks", make: () => picture(["navy", "purple", "blue", "pink", "yellow", "cyan", "white"], P => {
    P.all("navy");
    for (const [sx, sy] of [[2, 3], [40, 2], [22, 2], [5, 22], [39, 20], [35, 27], [3, 14], [19, 27]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.when("purple", (x, y) => y > 30 + Math.sin(x * 0.2) * 2 + Math.sin(x * 0.5) * 0.8);
    P.rect("blue", 0, 35, 44, 44);
    const bursts = [["pink", 13, 12, 9.5, 12, 0], ["yellow", 31, 9, 8, 10, 0.3], ["cyan", 26, 22, 6, 8, 0.2]];
    for (const [k, cx, cy, R, n, rot] of bursts) {
      for (let i = 0; i < n; i++) { const a = rot + i * 2 * Math.PI / n, c = Math.cos(a), s = Math.sin(a); P.line(k, cx + c * R * 0.35, cy + s * R * 0.35, cx + c * R * 0.85, cy + s * R * 0.85, 1.2); P.ell(k, cx + c * R, cy + s * R, 0.9, 0.9); }
      P.ell("white", cx, cy, 1.2, 1.2);
      P.when(k, (x, y) => y > 36 && fl(y) % 2 === 0 && Math.abs(x - cx) < R * 0.6 - (y - 36) * 0.4 && (fl(x) + fl(y)) % 3 !== 0);
    }
    P.when("white", (x, y) => Math.abs(x - 6) < 0.5 && y > 24 && y < 30 && fl(y) % 2 === 0);
  }, 44) },
  { tier: 3, name: "window box", make: () => picture(["peach", "white", "sky", "teal", "brown", "red", "pink", "green"], P => {
    P.all("peach");
    P.rect("teal", 3, 5, 11, 31); P.rect("teal", 33, 5, 41, 31);
    P.on("peach", "teal", (x, y) => fl(y) % 3 === 0 && y > 6 && y < 30 && ((x > 4 && x < 10) || (x > 34 && x < 40)));
    P.rect("white", 11, 4, 33, 31); P.rect("sky", 13, 6, 31, 29);
    P.rect("white", 21, 6, 23, 29); P.rect("white", 13, 17, 31, 18.5);
    P.line("white", 15, 14, 18, 9, 1); P.line("white", 25, 26, 28.5, 21, 1);
    P.rect("white", 9, 31, 35, 33);
    P.rect("brown", 10, 35, 34, 42);
    P.on("peach", "brown", (x, y) => fl(y) === 38);
    for (let x = 11; x < 34; x += 3) P.ell("green", x, 34.5 + (x % 2), 2.4, 2);
    for (const [fx, fy, k] of [[12.5, 32.5, "red"], [18, 32, "pink"], [23.5, 32.5, "red"], [29, 32, "pink"], [15, 35, "pink"], [26.5, 35, "pink"], [32, 34.5, "red"], [21, 35.5, "red"]]) for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1.1], [0, 1]]) P.ell(k, fx + ox, fy + oy, 1.1, 1.1);
    for (const [vx, len] of [[12, 6], [20, 4], [31, 7]]) { P.line("green", vx, 36, vx - 0.5, 36 + len, 1); for (let j = 1; j < len; j += 2) P.ell("green", vx + (j % 4 === 1 ? 1 : -1.5), 36 + j, 0.9, 0.9); }
  }, 44) },
  { tier: 3, name: "rainbow meadow", make: () => picture(["sky", "red", "orange", "yellow", "green", "blue", "purple", "white", "dkgreen"], P => {
    P.all("sky");
    ["red", "orange", "yellow", "green", "blue", "purple"].forEach((k, i) => P.when(k, (x, y) => { const d = Math.hypot(x - 22, y - 33); return d < 20 - i * 2 && d >= 18 - i * 2; }));
    for (const [cx, cy] of [[5, 29], [39, 29]]) { P.ell("white", cx, cy, 5.5, 2.4); P.ell("white", cx - 2, cy - 2, 3, 2); P.ell("white", cx + 2, cy - 1.5, 2.6, 2); }
    P.ell("white", 33, 6, 4, 1.5);
    P.when("dkgreen", (x, y) => y > 30.5 + Math.sin(x * 0.2) * 1.2);
    for (let i = 0; i < 18; i++) { const x = (i * 17.3) % 42 + 1, y = 34 + (i * 7.7) % 9; P.line("green", x, y, x - 0.8, y - 2, 1); P.line("green", x, y, x + 0.8, y - 2, 1); }
    for (let i = 0; i < 20; i++) { const x = (i * 11.7 + 4) % 42 + 1, y = 33 + (i * 5.3) % 10; P.ell(["red", "yellow", "white", "purple"][i % 4], x, y, 0.9, 0.9); }
    for (const [fx, fy] of [[8, 40], [22, 41.5], [35, 39.5]]) { for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5; P.ell("white", fx + Math.cos(a) * 1.7, fy + Math.sin(a) * 1.7, 1.2, 1.2); } P.ell("yellow", fx, fy, 0.9, 0.9); }
  }, 44) },
  { tier: 3, name: "terrarium", make: () => picture(["cyan", "white", "tan", "grey", "brown", "green", "lime", "pink", "ink"], P => {
    P.rect("cyan", 15.5, 8, 28.5, 13);
    P.ell("cyan", 22, 27, 17.5, 15.5);
    P.rect("tan", 14, 3, 30, 9);
    P.on("grey", "cyan", (x, y) => y > 36.5 + Math.sin(x * 0.8) * 0.6);
    P.on("brown", "cyan", (x, y) => y > 32 + Math.sin(x * 0.3) * 1.2 && y <= 36.5 + Math.sin(x * 0.8) * 0.6);
    for (let i = 0; i < 7; i++) { const a = -Math.PI + i * Math.PI / 6; P.rell("green", 13.5 + Math.cos(a) * 3.8, 31 + Math.sin(a) * 3.6, 3.8, 1.9, a); }
    P.ell("green", 13.5, 31.5, 2.6, 2);
    P.line("lime", 30, 34, 30, 19, 1.6);
    for (const [ly, sg, l] of [[30.5, -1, 3.6], [27, 1, 3.4], [23.5, -1, 3], [20.5, 1, 2.6]]) P.rell("lime", 30 + sg * l, ly, l, 1.7, sg * -0.5);
    P.line("green", 22, 33, 22, 24, 1.6);
    for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5 - Math.PI / 2; P.ell("pink", 22 + Math.cos(a) * 1.9, 21.5 + Math.sin(a) * 1.9, 1.6, 1.6); }
    P.ell("white", 22, 21.5, 1.2, 1.2);
    P.ell("grey", 25, 32.5, 2.4, 1.6);
    P.rell("white", 9, 22, 1.6, 6, 0.35);
    P.outline("ink", true);
  }, 44) },
  { tier: 3, name: "harvest basket", make: () => picture(["tan", "brown", "orange", "red", "purple", "green", "yellow", "ink"], P => {
    P.when("tan", (x, y) => { const d = Math.hypot(x - 22, (y - 24) * 1.1); return d > 14 && d < 17 && y < 24; });
    P.rell("yellow", 31, 13, 3.2, 7.5, 0.45); P.rell("green", 34, 17, 1.8, 6, 0.75);
    P.rell("purple", 12.5, 14, 3.6, 7, -0.6); P.rell("green", 15.5, 8.5, 1.8, 2.4, -0.6);
    P.ell("green", 21.5, 16.5, 6, 5);
    P.poly("orange", [[29, 19], [42, 16], [30, 23.5]]); P.poly("orange", [[28, 21], [40, 21.5], [29, 24.5]]);
    P.ell("red", 15.5, 21, 3.8, 3.6); P.ell("red", 24.5, 21.5, 3.5, 3.3);
    P.poly("tan", [[4, 23], [40, 23], [35.5, 40], [8.5, 40]]); P.rect("brown", 3, 22, 41, 25.5);
    P.outline("ink", true);
    P.on("brown", "tan", (x, y) => y > 26 && (fl(y) % 4 === 0 || (fl(x) + (fl(y / 4) % 2) * 3) % 6 === 0));
    P.on("orange", "yellow", (x, y) => (fl(x) + fl(y)) % 3 === 0);
  }, 44) },
);
