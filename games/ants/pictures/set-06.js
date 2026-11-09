// Sleep on it / Ants: home and everyday objects, as objects on a transparent background with ink
// outlines and as small room scenes, at varied sizes.
"use strict";
(() => {
  // seg(x0, y0, x1, y1)(x, y) gives [distance along the segment, signed distance across it, length].
  const seg = (x0, y0, x1, y1) => {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    return (x, y) => [(x - x0) * ux + (y - y0) * uy, -(x - x0) * uy + (y - y0) * ux, L];
  };
  // scaled(P, k): the same drawing helpers with every coordinate multiplied by k
  const scaled = (P, k) => ({
    all: P.all, outline: P.outline,
    rect: (c, x0, y0, x1, y1) => P.rect(c, x0 * k, y0 * k, x1 * k, y1 * k),
    ell: (c, x, y, rx, ry) => P.ell(c, x * k, y * k, rx * k, ry * k),
    rell: (c, x, y, rx, ry, a) => P.rell(c, x * k, y * k, rx * k, ry * k, a),
    poly: (c, pts) => P.poly(c, pts.map(([x, y]) => [x * k, y * k])),
    line: (c, x0, y0, x1, y1, w) => P.line(c, x0 * k, y0 * k, x1 * k, y1 * k, w * k),
    when: (c, f) => P.when(c, (x, y) => f(x / k, y / k)),
    on: (c, o, f) => P.on(c, o, (x, y) => f(x / k, y / k)),
  });
  // a clock face: twelve marks and two hands, in ink
  const clockFace = (P, cx, cy, r, long) => {
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, r0 = i % 3 === 0 ? r - long : r - 1;
      P.line("ink", cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1);
    }
  };

  PICTURES.push(
    // ----- simple -----
    { tier: 1, name: "rubber duck", make: () => picture(["sky", "yellow", "orange", "ink"], P => {
      P.ell("sky", 14, 23.5, 13, 3.5);
      P.poly("yellow", [[3, 18], [2, 10.5], [9, 15]]);
      P.ell("yellow", 13.5, 18.5, 10, 5.5);
      P.ell("yellow", 17.5, 9.5, 5.2, 5);
      P.ell("orange", 23.5, 11, 3.4, 2);
      P.outline("ink");
      P.rect("ink", 18, 7, 20, 9);
      P.line("ink", 8.5, 17.5, 12.5, 20.5, 1); P.line("ink", 12.5, 20.5, 17, 18, 1);
    }, 28) },
    { tier: 1, name: "door key", make: () => picture(["gold", "yellow", "red", "ink"], P => {
      P.rect("red", 3, 23, 12, 30.5);
      P.ell("gold", 9, 12.5, 6.5, 6.5); P.ell("none", 9, 12.5, 2.5, 2.5);
      P.rect("gold", 14, 10, 30, 15);
      P.rect("gold", 20, 15, 24, 20); P.rect("gold", 25.5, 15, 29.5, 18.5);
      P.outline("ink");
      P.on("yellow", "gold", (x, y) => (y < 12 && x > 14) || (x < 9 && y < 12.5 && Math.hypot(x - 9, y - 12.5) > 3.6));
      P.line("ink", 7.5, 18.5, 7.5, 23, 1); P.rect("ink", 6.5, 25, 8.5, 27);
    }, 32) },
    { tier: 1, name: "pencil", make: () => picture(["yellow", "gold", "peach", "grey", "pink", "ink"], P => {
      const g = seg(3, 29, 29, 3), w = 3.6;
      P.when("peach", (x, y) => { const [u, v] = g(x, y); return u > 0 && u < 8 && Math.abs(v) < w * u / 8; });
      P.when("yellow", (x, y) => { const [u, v] = g(x, y); return u >= 8 && u < 25 && Math.abs(v) < w; });
      P.when("grey", (x, y) => { const [u, v] = g(x, y); return u >= 25 && u < 29 && Math.abs(v) < w + 0.3; });
      P.when("pink", (x, y) => { const [u, v, L] = g(x, y); return u >= 29 && Math.abs(v) < w && (u < L - 3 || Math.hypot(u - (L - 3), v) < w); });
      P.outline("ink");
      P.on("gold", "yellow", (x, y) => g(x, y)[1] > 0.8);
      P.on("ink", "peach", (x, y) => g(x, y)[0] < 3);
      P.on("ink", "grey", (x, y) => { const u = g(x, y)[0]; return u > 26.5 && u < 27.5; });
    }, 32) },
    { tier: 1, name: "envelope", make: () => picture(["tan", "white", "red", "ink"], P => {
      P.rect("tan", 2, 7, 30, 26);
      P.poly("white", [[2, 7], [30, 7], [16, 19.5]]);
      P.outline("ink", true);
      P.line("ink", 2.5, 25.5, 13, 17.5, 1); P.line("ink", 29.5, 25.5, 19, 17.5, 1);
      P.ell("red", 14.3, 18.5, 2.3, 2.3); P.ell("red", 17.7, 18.5, 2.3, 2.3); P.poly("red", [[11.8, 19.2], [20.2, 19.2], [16, 23.5]]);
    }, 32) },
    { tier: 1, name: "light bulb", make: () => picture(["yellow", "white", "orange", "grey", "ink"], P => {
      P.ell("yellow", 16, 13, 8.5, 8.5);
      P.poly("yellow", [[11, 18], [21, 18], [19.5, 22], [12.5, 22]]);
      P.rect("grey", 12, 21.5, 20, 27); P.ell("grey", 16, 27, 2.6, 1.8);
      P.outline("ink");
      P.on("ink", "grey", (x, y) => fl(y) === 23 || fl(y) === 25);
      const zig = [[12.5, 15], [14, 11], [16, 15], [18, 11], [19.5, 15]];
      for (let i = 0; i < zig.length - 1; i++) P.line("orange", ...zig[i], ...zig[i + 1], 1);
      P.line("orange", 12.5, 15, 13.5, 20.5, 1); P.line("orange", 19.5, 15, 18.5, 20.5, 1);
      P.rell("white", 11.5, 10, 1.3, 2.8, 0.5);
      for (const a of [-90, -50, -130, -15, -165]) { const r = a * Math.PI / 180; P.line("orange", 16 + Math.cos(r) * 10.5, 13 + Math.sin(r) * 10.5, 16 + Math.cos(r) * 13.5, 13 + Math.sin(r) * 13.5, 1.4); }
    }, 32) },
    { tier: 1, name: "spool of thread", make: () => picture(["tan", "red", "maroon", "grey", "ink"], P => {
      P.rect("red", 6, 7, 18, 21);
      P.rect("tan", 4, 4.5, 20, 8); P.ell("tan", 12, 4.5, 8, 2);
      P.rect("tan", 4, 20.5, 20, 24);
      P.outline("ink", true);
      P.on("maroon", "red", (x, y) => (fl(x) + fl(y)) % 3 === 0);
      P.ell("ink", 12, 4.3, 1.6, 0.8);
      P.line("grey", 22, 26, 25.5, 5, 1.6); P.rect("ink", 25, 6, 26, 8);
      P.line("red", 19, 13, 22, 12, 1); P.line("red", 22, 12, 25.5, 7, 1);
    }, 28) },
    { tier: 1, name: "glasses", make: () => picture(["red", "sky", "white", "ink"], P => {
      P.rect("red", 0, 13, 2.5, 16); P.rect("red", 29.5, 13, 32, 16);
      P.rect("red", 14, 13.5, 18, 16.5);
      for (const cx of [8.6, 23.4]) P.ell("red", cx, 17, 7.4, 6.5);
      for (const cx of [8.6, 23.4]) P.ell("sky", cx, 17, 4.7, 3.9);
      P.outline("ink");
      for (const cx of [8.6, 23.4]) P.rell("white", cx - 1.8, 15.8, 0.9, 2.1, 0.6);
    }, 32) },
    { tier: 1, name: "straw hat", make: () => picture(["tan", "gold", "red", "ink"], P => {
      P.ell("tan", 16, 22, 15, 5);
      P.rect("tan", 8.5, 10, 23.5, 21); P.ell("tan", 16, 10, 7.5, 3.5);
      P.rect("red", 8.5, 16, 23.5, 21.5);
      P.outline("ink", true);
      P.on("gold", "tan", (x, y) => (fl(x) + fl(y)) % 4 === 0 || (fl(x) - fl(y) + 64) % 4 === 0);
    }, 32) },
    { tier: 1, name: "padlock", make: () => picture(["grey", "gold", "yellow", "ink"], P => {
      P.when("grey", (x, y) => { const d = Math.hypot(x - 14, y - 11); return d > 3.5 && d < 7.5 && y < 11.5; });
      P.rect("grey", 6.5, 11, 10.5, 15); P.rect("grey", 17.5, 11, 21.5, 15);
      P.rect("gold", 4, 14, 24, 26);
      P.outline("ink");
      P.on("yellow", "gold", (x, y) => x < 7.5 && y > 15);
      P.ell("ink", 14, 19, 1.6, 1.6); P.poly("ink", [[13, 19], [15, 19], [15.5, 23], [12.5, 23]]);
    }, 28) },
    { tier: 1, name: "scissors", make: () => picture(["grey", "white", "red", "ink"], P => {
      P.poly("grey", [[12.5, 17.5], [17.5, 15], [8, 2], [5.5, 3]]);
      P.poly("grey", [[19.5, 17.5], [14.5, 15], [24, 2], [26.5, 3]]);
      P.line("red", 15, 17, 11, 22, 3.6); P.line("red", 17, 17, 21, 22, 3.6);
      for (const cx of [9.5, 22.5]) { P.ell("red", cx, 25.5, 5.2, 4.6); P.ell("none", cx, 25.5, 2.4, 2); }
      P.ell("grey", 16, 16, 2, 2);
      P.outline("ink");
      P.ell("ink", 16, 16, 0.8, 0.8);
      const gA = seg(15, 15, 7, 2.6), gB = seg(17, 15, 25, 2.6);
      P.on("white", "grey", (x, y) => { const [ua, va] = gA(x, y), [ub, vb] = gB(x, y); return (ua > 2.5 && ua < 12 && Math.abs(va) < 0.7) || (ub > 2.5 && ub < 12 && Math.abs(vb) < 0.7); });
    }, 32) },
    { tier: 1, name: "paint brush", make: () => picture(["brown", "tan", "grey", "blue", "ink"], P => {
      P.when("blue", (x, y) => x > 3 && x < 30 && Math.abs(y - (27.5 + Math.sin(x * 0.45) * 1.3)) < 2 * Math.min(1, (30 - x) / 6));
      const g = seg(5, 23, 29, 3);
      P.when("blue", (x, y) => { const [u, v] = g(x, y); return u > 0 && u < 9 && Math.abs(v) < 0.8 + 2.4 * Math.min(1, u / 5); });
      P.when("grey", (x, y) => { const [u, v] = g(x, y); return u >= 9 && u < 13 && Math.abs(v) < 3.1; });
      P.when("brown", (x, y) => { const [u, v, L] = g(x, y); const w = 2.8 - (u - 13) * 0.04; return u >= 13 && Math.abs(v) < w && (u < L - 2 || Math.hypot(u - (L - 2), v) < w); });
      P.outline("ink");
      P.on("tan", "brown", (x, y) => g(x, y)[1] < -0.2);
      P.on("ink", "grey", (x, y) => { const u = g(x, y)[0]; return u > 10.6 && u < 11.6; });
    }, 32) },
    { tier: 1, name: "hammer", make: () => picture(["grey", "white", "tan", "brown", "ink"], P => {
      const pt = (a, b) => [20 + 0.832 * a + 0.555 * b, 10 + 0.555 * a - 0.832 * b];
      const h = seg(7, 29, 20, 10);
      P.line("tan", 7, 29, 20, 10, 4.6);
      P.when("brown", (x, y) => { const [u, v] = h(x, y); return u < 9.5 && Math.abs(v) < 2.7 && Math.hypot(x - 7, y - 29) < 9.5 + 2.7; });
      P.poly("grey", [pt(-10, -3), pt(5, -3.2), pt(7.5, -2.2), pt(7.5, 2.2), pt(5, 3.2), pt(-10, 3)]);
      P.poly("none", [pt(-10.6, -1), pt(-5.5, 0), pt(-10.6, 1)]);
      P.outline("ink");
      P.on("white", "grey", (x, y) => 0.555 * (x - 20) - 0.832 * (y - 10) > 0.8);
    }, 32) },
    { tier: 1, name: "frying pan", make: () => picture(["red", "grey", "white", "yellow", "brown", "ink"], P => {
      P.line("brown", 21, 16, 31, 16, 4.4);
      P.ell("red", 12, 16, 10.5, 10.5);
      P.ell("grey", 12, 16, 8, 8);
      P.ell("white", 11, 17, 4.6, 4); P.ell("white", 14, 14.2, 3.6, 3); P.ell("white", 8.8, 13.8, 2.6, 2.2);
      P.ell("yellow", 12, 15.5, 3, 3);
      P.outline("ink", true);
    }, 32) },
    { tier: 1, name: "mug of cocoa", make: () => picture(["lilac", "tan", "blue", "brown", "white"], Q => { const P = scaled(Q, 32 / 28);
      P.all("lilac"); P.rect("tan", 0, 23, 28, 28);
      P.when("blue", (x, y) => { const d = Math.hypot(x - 19.5, y - 16.5); return d > 1.8 && d < 4.3 && x > 19; });
      P.rect("blue", 6, 11, 20, 24); P.ell("blue", 13, 24, 7, 1);
      P.ell("brown", 13, 11.5, 6, 1.5);
      P.on("white", "blue", (x, y) => y >= 17 && y < 19.5 && x < 20);
      for (const sx of [10.5, 15.5]) P.when("white", (x, y) => y > 2 && y < 9.5 && Math.abs(x - (sx + Math.sin(y * 0.9) * 1.1)) < 0.6);
    }, 32) },
    { tier: 1, name: "candle", make: () => picture(["navy", "purple", "yellow", "orange", "white", "gold"], Q => { const P = scaled(Q, 32 / 28);
      P.all("navy"); P.ell("purple", 14, 8, 7.5, 7.5);
      for (const [sx, sy] of [[3, 4], [24, 3], [25, 13], [3, 15]]) P.rect("white", sx, sy, sx + 1, sy + 1);
      P.rect("white", 10, 11, 18, 24); P.ell("white", 11, 13, 1.3, 2.6);
      P.rect("navy", 13.5, 9.5, 14.5, 11);
      P.ell("yellow", 14, 6, 2.6, 3.6); P.poly("yellow", [[11.6, 6], [16.4, 6], [14, 0.5]]);
      P.ell("orange", 14, 7, 1.3, 2);
      P.ell("gold", 14, 24.5, 9, 2.2);
      P.when("gold", (x, y) => { const d = Math.hypot(x - 23.5, y - 21.5); return d > 1.2 && d < 2.7 && x > 23; });
    }, 32) },
    { tier: 1, name: "hourglass", make: () => picture(["purple", "maroon", "brown", "sky", "tan", "white"], Q => { const P = scaled(Q, 32 / 28);
      P.all("purple"); P.rect("maroon", 0, 25, 28, 28);
      const hw = y => 1 + 5.2 * Math.pow(Math.abs(y - 14) / 8, 0.8);
      P.when("sky", (x, y) => y > 6 && y < 22 && Math.abs(x - 14) < hw(y));
      P.when("tan", (x, y) => Math.abs(x - 14) < hw(y) && ((y > 9.5 && y < 14) || (y > 17 && y < 22 && y > 22 - 4.5 * (1 - Math.abs(x - 14) / 6))));
      P.rect("tan", 13.5, 14, 14.5, 19);
      P.rect("brown", 4, 3, 24, 6.5); P.rect("brown", 4, 21.5, 24, 25);
      P.rect("brown", 5, 6, 7, 22); P.rect("brown", 21, 6, 23, 22);
      P.on("white", "sky", (x, y) => (x > 8.5 && x < 11 && y > 6 && y < 9.5) || (x > 9.2 && x < 11.2 && y > 16.5 && y < 20.5));
    }, 32) },
    { tier: 1, name: "toothbrush", make: () => picture(["lilac", "grey", "blue", "white", "sky", "mint"], Q => { const P = scaled(Q, 32 / 28);
      P.all("lilac"); P.rect("grey", 0, 23, 28, 28);
      P.line("blue", 3, 20, 17, 20, 2.8); P.line("blue", 15, 19.5, 18, 18.5, 2.2);
      P.rect("blue", 16, 16, 26, 19);
      P.rect("white", 17, 11, 25.5, 16);
      P.on("sky", "white", x => fl(x) % 2 === 0);
      P.ell("mint", 21, 9.8, 5, 2); P.ell("mint", 24.5, 7.8, 2.2, 1.7);
      P.on("white", "mint", (x, y) => fl(y) === 9 && x < 24);
    }, 32) },
    { tier: 1, name: "piggy bank", make: () => picture(["mint", "tan", "pink", "maroon", "gold", "yellow"], Q => { const P = scaled(Q, 32 / 28);
      P.all("mint"); P.rect("tan", 0, 24, 28, 28);
      P.rect("pink", 7, 19, 10.5, 24.5); P.rect("pink", 17.5, 19, 21, 24.5);
      P.ell("pink", 13.5, 16, 10, 6.5);
      P.ell("pink", 24, 16, 2.6, 2.8);
      P.poly("pink", [[15, 11], [18, 6], [20.5, 11.5]]);
      P.on("maroon", "pink", (x, y) => { const d = Math.hypot(x - 24.2, y - 16); return d > 2 && d < 2.9 && x > 22.4; });
      P.rect("maroon", 23, 15, 24, 17); P.rect("maroon", 25, 15, 26, 17);
      P.rect("maroon", 19, 12, 20, 14);
      P.rect("maroon", 10, 10, 16, 11);
      P.when("maroon", (x, y) => { const d = Math.hypot(x - 2.5, y - 13); return d > 1 && d < 2.2 && !(x > 2.5 && y > 13); });
      P.ell("gold", 13, 5, 3.3, 3.3); P.ell("yellow", 12.7, 4.7, 2, 2);
    }, 32) },

    // ----- medium -----
    { tier: 2, name: "watering can", make: () => picture(["green", "dkgreen", "sky", "white", "ink"], P => {
      P.when("green", (x, y) => { const d = Math.hypot(x - 14, y - 14); return d > 6 && d < 9 && y < 14.5; });
      P.line("green", 22, 27, 32, 13.5, 3.2);
      P.rell("green", 32.5, 12.5, 3.4, 1.9, 0.606);
      P.rect("green", 7, 14, 24, 31); P.ell("green", 15.5, 14, 8.5, 2);
      P.on("dkgreen", "green", (x, y) => x > 20.5 && x < 24 && y > 14);
      P.outline("ink");
      P.rell("white", 10.5, 22, 1.3, 5, 0);
      for (const [dx, dy] of [[34, 18], [31, 20.5], [35.2, 23], [32.4, 25.5], [34.8, 28.8]]) P.rell("sky", dx, dy, 1.1, 1.8, 0);
    }, 36) },
    { tier: 2, name: "alarm clock", make: () => picture(["red", "white", "gold", "grey", "ink"], P => {
      P.line("grey", 11, 27, 7, 33.5, 2.6); P.line("grey", 25, 27, 29, 33.5, 2.6);
      P.rell("gold", 8.5, 8.5, 5.2, 3.4, -0.785); P.rell("gold", 27.5, 8.5, 5.2, 3.4, 0.785);
      P.rect("grey", 14, 2.5, 22, 5); P.rect("grey", 16.5, 4, 19.5, 8);
      P.ell("red", 18, 19, 12, 12);
      P.ell("white", 18, 19, 9, 9);
      P.outline("ink", true);
      clockFace(P, 18, 19, 8, 2);
      P.line("ink", 18, 19, 18, 13, 1.3); P.line("ink", 18, 19, 22.5, 21, 1.2);
    }, 36) },
    { tier: 2, name: "kettle", make: () => picture(["red", "brown", "grey", "white", "ink"], P => {
      P.when("brown", (x, y) => { const d = Math.hypot(x - 18, y - 17); return d > 6 && d < 8.8 && y < 16; });
      P.poly("red", [[8, 25], [2, 13], [4.5, 12], [11, 19]]);
      P.when("red", (x, y) => ((x - 18) / 12.5) ** 2 + ((y - 27) / 13) ** 2 <= 1 && y > 15 && y < 32);
      P.ell("grey", 18, 15.5, 6.5, 2); P.ell("grey", 18, 13, 2.2, 1.7);
      P.rect("grey", 6, 31, 30, 33.5);
      P.outline("ink", true);
      P.rell("white", 11.5, 23, 1.2, 3.6, 0.4);
      P.ell("white", 3.5, 8.5, 2.2, 1.7); P.ell("white", 6, 5.2, 2.5, 1.9); P.ell("white", 3.8, 2.2, 2, 1.5);
    }, 36) },
    { tier: 2, name: "wellington boots", make: () => picture(["yellow", "gold", "sky", "white", "ink"], P => {
      P.ell("sky", 20, 35, 19, 4);
      const boot = (ox, oy) => {
        P.rect("yellow", ox + 1, oy + 4, ox + 10, oy + 25);
        P.rect("yellow", ox + 1, oy + 20, ox + 12, oy + 30);
        P.ell("yellow", ox + 12, oy + 26, 6, 4.5);
        P.rect("gold", ox + 0.5, oy + 3, ox + 10.5, oy + 6.5);
        P.rect("gold", ox + 1, oy + 29, ox + 18.5, oy + 32);
      };
      boot(3, 0); boot(19, 2);
      P.outline("ink", true);
      P.on("white", "yellow", (x, y) => (x >= 5.5 && x < 6.5 && y > 8 && y < 22) || (x >= 21.5 && x < 22.5 && y > 10 && y < 24));
    }, 40) },
    { tier: 2, name: "camera", make: () => picture(["grey", "brown", "blue", "white", "red", "ink"], Q => { const P = scaled(Q, 40 / 36);
      P.rect("grey", 10, 6, 20, 11);
      P.rect("red", 23, 5, 30, 11);
      P.rect("grey", 3, 10, 33, 29);
      P.rect("brown", 3, 15, 33, 25);
      P.ell("grey", 18, 20, 8.5, 8.5);
      P.ell("ink", 18, 20, 6.2, 6.2);
      P.ell("blue", 18, 20, 4.8, 4.8);
      P.rect("white", 5, 11.5, 10, 14);
      P.outline("ink", true);
      P.ell("white", 16.3, 18.3, 1.5, 1.5);
    }, 40) },
    { tier: 2, name: "radio", make: () => picture(["brown", "tan", "yellow", "grey", "ink"], P => {
      P.line("ink", 26, 12, 33, 2, 1);
      P.rect("brown", 3, 12, 33, 31);
      for (const [cx, cy] of [[3, 12], [32, 12], [3, 30], [32, 30]]) P.rect("none", cx, cy, cx + 1, cy + 1);
      P.rect("tan", 6, 15, 20, 28);
      P.rect("yellow", 22, 15, 31, 21);
      P.ell("grey", 24.5, 25, 2.3, 2.3); P.ell("grey", 29, 25, 2.3, 2.3);
      P.outline("ink", true);
      P.on("brown", "tan", (x, y) => fl(y) % 2 === 1);
      P.on("ink", "yellow", (x, y) => fl(y) === 16 && fl(x) % 2 === 0);
      P.rect("ink", 26, 16, 27, 20);
      P.rect("ink", 5, 31, 8, 33); P.rect("ink", 28, 31, 31, 33);
    }, 36) },
    { tier: 2, name: "telephone", make: () => picture(["red", "maroon", "white", "grey", "ink"], P => {
            P.poly("red", [[6, 31], [30, 31], [26, 15], [10, 15]]);
      P.rect("red", 13, 12, 23, 15);
      P.rect("red", 7, 7, 29, 11); P.ell("red", 6.5, 10, 4, 3.6); P.ell("red", 29.5, 10, 4, 3.6);
      P.ell("white", 18, 23, 6.3, 6.3);
      P.ell("grey", 18, 23, 2.8, 2.8);
      P.rect("maroon", 4, 30.5, 32, 34);
      P.outline("ink", true);
      for (let i = 0; i < 10; i++) { const a = -Math.PI * 0.35 + i * Math.PI * 0.16; P.ell("ink", 18 + Math.cos(a) * 4.3, 23 + Math.sin(a) * 4.3, 0.9, 0.9); }
      P.when("ink", (x, y) => x > 30 && x < 35.5 && Math.abs(y - (24 + Math.sin(x * 1.8) * 1.5)) < 0.6);
    }, 36) },
    { tier: 2, name: "book stack", make: () => picture(["red", "blue", "green", "purple", "yellow", "white", "ink"], P => {
      P.rect("red", 3, 27, 33, 33);
      P.rect("blue", 5, 20.5, 31, 27); P.rect("white", 5, 22, 30, 25.5);
      P.rect("green", 2, 14, 30, 20.5);
      P.rect("purple", 7, 7.5, 29, 14); P.rect("white", 7, 9, 28, 12.5);
      P.outline("ink", true);
      P.on("yellow", "red", x => (x >= 6 && x < 8) || (x >= 28 && x < 30));
      P.on("yellow", "green", x => (x >= 5 && x < 7) || (x >= 25 && x < 27));
      P.on("ink", "white", (x, y) => fl(y) === 23 || fl(y) === 10);
      P.rect("red", 20, 12, 22, 18);
    }, 36) },
    { tier: 2, name: "toaster", make: () => picture(["red", "grey", "white", "tan", "brown", "ink"], P => {
      for (const sx of [9, 19]) {
        P.rect("brown", sx, 6.5, sx + 8, 17); P.ell("brown", sx + 2.2, 6.5, 2.2, 2); P.ell("brown", sx + 5.8, 6.5, 2.2, 2);
        P.rect("tan", sx + 2, 7.5, sx + 6, 17); P.ell("tan", sx + 2.4, 7.5, 0.9, 0.9); P.ell("tan", sx + 5.6, 7.5, 0.9, 0.9);
      }
      P.rect("red", 5, 13, 31, 32); P.rect("red", 4, 14, 32, 31);
      P.rect("grey", 3, 30, 33, 33);
      P.rect("grey", 32, 18, 35.5, 22);
      P.ell("grey", 26, 24, 2.3, 2.3);
      P.outline("ink");
      P.rect("ink", 8, 13, 28, 14);
      P.on("white", "red", (x, y) => x >= 7 && x < 8.5 && y > 16 && y < 28);
    }, 36) },
    { tier: 2, name: "teddy bear", make: () => picture(["brown", "tan", "red", "ink"], P => {
      P.ell("brown", 10.5, 6.5, 4, 4); P.ell("brown", 25.5, 6.5, 4, 4);
      P.ell("tan", 10.5, 6.5, 2, 2); P.ell("tan", 25.5, 6.5, 2, 2);
      P.rell("brown", 8, 23, 3.2, 5, 0.5); P.rell("brown", 28, 23, 3.2, 5, -0.5);
      P.ell("brown", 11.5, 31, 4.5, 3.8); P.ell("brown", 24.5, 31, 4.5, 3.8);
      P.ell("brown", 18, 25, 8, 7.5);
      P.ell("tan", 18, 26.5, 4.5, 4.5);
      P.ell("brown", 18, 12.5, 8.5, 7.5);
      P.ell("tan", 18, 15.5, 4, 3);
      P.ell("tan", 11.5, 31.5, 2.3, 2.3); P.ell("tan", 24.5, 31.5, 2.3, 2.3);
      P.poly("red", [[18, 20.5], [13, 17.8], [13, 23.2]]); P.poly("red", [[18, 20.5], [23, 17.8], [23, 23.2]]);
      P.outline("ink", true);
      P.rect("red", 17, 19.5, 19, 21.5);
      P.rect("ink", 14, 10, 16, 12); P.rect("ink", 20, 10, 22, 12);
      P.ell("ink", 18, 14.5, 1.6, 1); P.line("ink", 18, 15, 18, 17, 0.8);
    }, 36) },
    { tier: 2, name: "cookie jar", make: () => picture(["sky", "tan", "brown", "red", "white", "ink"], P => {
      P.rect("sky", 7, 11, 29, 30); P.ell("sky", 18, 30, 11, 3.5);
      P.rect("sky", 10, 8, 26, 11);
      for (const [cx, cy, r] of [[12.5, 28.5, 4.3], [22.8, 29, 4.6], [17.5, 21.5, 4.3], [25.5, 20.5, 3.3], [10.5, 19.5, 3.3], [18, 14.2, 3]]) P.ell("tan", cx, cy, r, r * 0.9);
      P.rect("red", 8, 4, 28, 8.5); P.ell("red", 18, 3, 3, 2.2);
      P.outline("ink", true);
      P.on("brown", "tan", (x, y) => (fl(x) * 3 + fl(y) * 5) % 7 === 0);
      P.on("white", "sky", (x, y) => x >= 8.5 && x < 10 && y > 12 && y < 26);
    }, 36) },
    { tier: 2, name: "table lamp", make: () => picture(["navy", "purple", "yellow", "orange", "gold", "brown", "red", "white"], Q => { const P = scaled(Q, 40 / 36);
      P.all("navy"); P.ell("purple", 18, 13, 14, 12);
      for (const [sx, sy] of [[2, 3], [33, 5], [3, 22], [32, 24], [30, 1]]) P.rect("yellow", sx, sy, sx + 1, sy + 1);
      P.poly("yellow", [[11, 5], [25, 5], [29, 17], [7, 17]]);
      P.rect("orange", 7, 17, 29, 19); P.rect("orange", 11, 4, 25, 5.5);
      P.rect("gold", 16.5, 19, 19.5, 27); P.ell("gold", 18, 28, 6, 2.5); P.rect("gold", 12, 28, 24, 30);
      P.rect("brown", 0, 30, 36, 36);
      P.rect("red", 2, 26.5, 11, 30); P.rect("white", 2, 27.5, 10, 29);
    }, 40) },
    { tier: 2, name: "armchair", make: () => picture(["lilac", "tan", "brown", "teal", "dkgreen", "mint", "yellow"], Q => { const P = scaled(Q, 40 / 36);
      P.all("lilac"); P.rect("tan", 0, 28, 36, 36);
      P.rect("brown", 0, 28, 36, 29); P.on("brown", "tan", (x, y) => fl(y) === 32 || (y > 32 && fl(x + (fl(y) > 32 ? 5 : 0)) % 11 === 0));
      P.rect("teal", 9, 7, 27, 24); P.ell("teal", 18, 8, 9, 4);
      P.rect("teal", 4, 15, 11, 30); P.ell("teal", 7.5, 15, 3.5, 3);
      P.rect("teal", 25, 15, 32, 30); P.ell("teal", 28.5, 15, 3.5, 3);
      P.rect("mint", 11, 21, 25, 25);
      P.rect("teal", 4, 25, 32, 30);
      P.rect("dkgreen", 10, 17, 11, 25); P.rect("dkgreen", 25, 17, 26, 25); P.rect("dkgreen", 11, 25, 25, 26);
      P.rect("brown", 6, 30, 8, 33); P.rect("brown", 28, 30, 30, 33);
      P.rell("yellow", 18, 16, 4.5, 3.5, -0.15);
    }, 40) },
    { tier: 2, name: "umbrella stand", make: () => picture(["peach", "maroon", "teal", "gold", "red", "blue", "ink"], Q => { const P = scaled(Q, 40 / 36);
      P.all("peach"); P.rect("maroon", 0, 31, 36, 36);
      const brolly = (k, bx, tx, ty) => {              // closed umbrella: folded canopy from the stand up to a tip
        P.poly(k, [[bx - 2.5, 23], [bx + 2.5, 23], [(bx + tx) / 2 + 4.5, 14], [tx + 1, ty + 1], [tx - 1, ty + 1], [(bx + tx) / 2 - 4.5, 14]]);
        P.on("ink", k, (x, y) => { const t = (y - ty) / (23 - ty); return Math.abs(x - (tx + (bx - tx) * t)) < 0.5; });
      };
      brolly("red", 13.5, 11, 6);
      P.line("ink", 11, 7, 11, 3.5, 1.5);
      P.when("ink", (x, y) => { const d = Math.hypot(x - 8.8, y - 3.6); return d > 1.5 && d < 2.9 && (y < 3.6 || x < 7.6); });
      brolly("blue", 22.5, 25, 7.5);
      P.line("ink", 25, 8.5, 25, 5, 1.5);
      P.when("ink", (x, y) => { const d = Math.hypot(x - 27.2, y - 5.1); return d > 1.5 && d < 2.9 && (y < 5.1 || x > 28.4); });
      P.rect("teal", 9, 20, 27, 31.5);
      P.ell("ink", 18, 20, 9, 1.5);
      P.on("gold", "teal", (x, y) => (y >= 22.5 && y < 24.5) || (y >= 27.5 && y < 29.5));
    }, 40) },
    { tier: 2, name: "window with curtains", make: () => picture(["peach", "white", "navy", "yellow", "red", "maroon", "brown"], P => {
      P.all("peach");
      P.rect("white", 9, 6, 31, 30);
      for (const [x0, y0] of [[11, 8], [21, 8], [11, 19], [21, 19]]) P.rect("navy", x0, y0, x0 + 8, y0 + 9);
      P.ell("yellow", 26, 12.5, 2.8, 2.8); P.ell("navy", 27.4, 11.4, 2.3, 2.3);
      for (const [sx, sy] of [[13, 10], [16, 14], [23, 22], [14, 24], [27, 25], [22, 9]]) P.rect("white", sx, sy, sx + 1, sy + 1);
      const left = [[3, 5], [14, 5], [12, 13], [8.5, 19], [10, 25], [12, 35], [3, 35]];
      P.poly("red", left); P.poly("red", left.map(([x, y]) => [40 - x, y]));
      P.on("maroon", "red", x => fl(x) % 3 === 0);
      P.rect("yellow", 3, 18.5, 9.5, 20.5); P.rect("yellow", 30.5, 18.5, 37, 20.5);
      P.rect("brown", 1, 3, 39, 5);
      P.rect("brown", 7, 30, 33, 32.5);
    }, 40) },
    { tier: 2, name: "chest of drawers", make: () => picture(["mint", "teal", "brown", "tan", "gold", "sky", "green"], Q => { const P = scaled(Q, 40 / 36);
      P.all("mint"); P.rect("teal", 0, 33, 36, 36);
      P.rect("gold", 12, 2, 24, 11); P.rect("sky", 13.5, 3.5, 22.5, 9.5);
      P.on("green", "sky", (x, y) => y > 7.2 + Math.sin(x * 0.6) * 0.9);
      P.rect("brown", 6, 13, 30, 15); P.rect("brown", 7, 15, 29, 32);
      P.rect("brown", 8, 32, 10, 34); P.rect("brown", 26, 32, 28, 34);
      for (const y0 of [16.5, 21.5, 26.5]) {
        P.rect("tan", 9, y0, 27, y0 + 4);
        P.ell("gold", 14, y0 + 2, 1.2, 1.2); P.ell("gold", 22, y0 + 2, 1.2, 1.2);
      }
    }, 40) },
    { tier: 2, name: "rocking chair", make: () => picture(["peach", "tan", "brown", "red", "green"], Q => { const P = scaled(Q, 40 / 36);
      P.all("peach"); P.rect("tan", 0, 31, 36, 36);
      P.when("brown", (x, y) => { const yc = 30 - 4 * ((x - 17) / 14) ** 2; return x > 3 && x < 31 && y > yc - 1 && y < yc + 1; });
      P.line("brown", 10, 29, 11, 20, 1.8); P.line("brown", 24, 29, 23, 20, 1.8);
      P.line("brown", 9, 20, 25, 20, 2);
      P.line("brown", 10, 20, 6, 4, 2);
      P.line("brown", 7.5, 12, 24, 13, 1.8); P.line("brown", 23, 13, 23, 20, 1.6);
      P.poly("green", [[4.5, 4], [9, 3], [10, 13], [6, 14]]);
      P.on("tan", "green", (x, y) => fl(y) % 3 === 0);
      P.rell("red", 17, 18.2, 7, 1.9, 0); P.rell("red", 9.2, 14.5, 1.8, 4.5, -0.25);
    }, 40) },
    { tier: 2, name: "front door", make: () => picture(["red", "tan", "white", "teal", "gold", "grey", "yellow", "green"], Q => { const P = scaled(Q, 40 / 36);
      P.all("red");
      P.on("tan", "red", (x, y) => { const r = fl(y / 3); return fl(y) % 3 === 0 || (fl(x) + (r % 2) * 3) % 6 === 0; });
      P.rect("white", 9, 9, 27, 32); P.ell("white", 18, 10, 9, 7);
      P.when("yellow", (x, y) => y < 10 && Math.hypot(x - 18, y - 10) < 6.5);
      P.rect("teal", 11.5, 11, 24.5, 32);
      P.ell("gold", 22, 22, 1.3, 1.3); P.rect("gold", 15, 25, 21, 26.5);
      P.when("gold", (x, y) => { const d = Math.hypot(x - 18, y - 16); return d > 1 && d < 2.3; });
      P.rect("grey", 7, 32, 29, 34.5); P.rect("grey", 5, 34.5, 31, 36);
      P.rect("grey", 0.5, 31, 7, 36); P.rect("grey", 29, 31, 35.5, 36);
      P.ell("green", 4, 27, 4, 5); P.ell("green", 32, 27, 4, 5);
    }, 40) },
    { tier: 2, name: "washing line", make: () => picture(["sky", "green", "brown", "red", "blue", "yellow", "white"], P => {
      P.all("sky"); P.rect("green", 0, 33, 40, 40);
      P.ell("white", 30, 4.5, 5, 2); P.ell("white", 34, 3.2, 3.5, 1.8);
      P.ell("yellow", 9, 3.5, 2.6, 2.6);
      P.rect("brown", 1, 6, 3, 34); P.rect("brown", 37, 6, 39, 34);
      const ly = x => 8 + 3.2 * Math.sin(Math.PI * (x - 2) / 36);
      P.when("brown", (x, y) => x > 2 && x < 38 && Math.abs(y - ly(x)) < 0.6);
      P.poly("red", [[6, 10.5], [14, 10.5], [17, 13], [15.5, 15.5], [14, 14.5], [14, 23], [6, 23], [6, 14.5], [4.5, 15.5], [3, 13]]);
      P.ell("sky", 10, 10.5, 1.8, 1.2);
      P.poly("blue", [[17, 11.5], [25, 11.5], [25.5, 27], [22, 27], [21, 16], [20, 27], [16.5, 27]]);
      P.rect("yellow", 28, 10, 35, 22); P.on("white", "yellow", (x, y) => fl(y) === 18 || fl(y) === 20);
      for (const px of [7, 13, 18, 24, 29, 34]) P.rect("brown", px, ly(px) - 1, px + 1, ly(px) + 2);
    }, 40) },
    { tier: 2, name: "washing machine", make: () => picture(["lilac", "tan", "white", "grey", "blue", "sky", "red"], Q => { const P = scaled(Q, 40 / 36);
      P.all("lilac"); P.rect("tan", 0, 32, 36, 36);
      P.rect("white", 7, 4, 29, 33);
      P.rect("grey", 7, 10, 29, 11);
      P.rect("grey", 9, 5.5, 16, 8.5); P.ell("grey", 24.5, 7, 1.8, 1.8);
      P.ell("grey", 18, 21.5, 8.5, 8.5); P.ell("sky", 18, 21.5, 6.5, 6.5);
      P.on("blue", "sky", (x, y) => y > 21 + Math.sin(x * 0.8) * 0.9);
      P.rell("red", 15.5, 24.5, 2.6, 1.4, 0.3); P.ell("red", 18.2, 25.8, 1.8, 1.4);
      for (const [bx, by, r] of [[14, 18, 1.3], [20, 17.5, 1.5], [22.5, 20.2, 1.1], [16.8, 20.3, 0.9]]) P.ell("white", bx, by, r, r);
    }, 40) },

    // ----- complex -----
    { tier: 3, name: "sewing machine", make: () => picture(["teal", "gold", "grey", "brown", "red", "pink", "white", "ink"], P => {
      P.rect("brown", 1, 35, 43, 41);
      P.ell("grey", 38.5, 15, 3.4, 6);
      P.rect("teal", 4, 29, 40, 35);
      P.rect("teal", 28, 9, 37, 29);
      P.rect("teal", 9, 9, 37, 17); P.rect("teal", 6, 10, 14, 25); P.ell("teal", 9, 10.5, 3, 1.5);
      P.rect("brown", 19, 3, 26, 4.5); P.rect("red", 20, 4, 25, 9);
      P.rect("grey", 9, 25, 11.5, 29); P.rect("grey", 7, 27, 13, 29);
      P.poly("pink", [[1, 30], [20, 29], [22, 33.5], [2, 35]]);
      P.outline("ink", true);
      P.on("gold", "teal", (x, y) => fl(y) === 12 && x > 15 && x < 33);
      P.on("gold", "teal", (x, y) => fl(y) === 31 && x > 25 && x < 37);
      P.on("white", "pink", (x, y) => (fl(x) + fl(y)) % 3 === 0);
      P.line("red", 22.5, 9, 12, 10.8, 0.9);
    }, 44) },
    { tier: 3, name: "knitting basket", make: () => picture(["tan", "brown", "red", "pink", "blue", "sky", "grey", "ink"], P => {
      P.line("grey", 27, 18, 37, 2.5, 2.4); P.line("grey", 25, 18, 30, 2, 2.4);
      P.ell("blue", 29, 19, 7, 7); P.ell("red", 15, 19.5, 7.5, 7.5);
      P.poly("tan", [[4, 24], [40, 24], [36, 42], [8, 42]]); P.ell("tan", 22, 24.5, 18.5, 3);
      P.outline("ink", true);
      P.on("brown", "tan", (x, y) => y > 27 && (fl(x / 3) + fl(y / 3)) % 2 === 0);
      P.on("brown", "tan", (x, y) => y < 26.5);
      P.on("pink", "red", (x, y) => fl(Math.hypot(x - 21, y - 13.5)) % 3 === 0);
      P.on("sky", "blue", (x, y) => fl(Math.hypot(x - 23, y - 13)) % 3 === 0);
      P.ell("ink", 37, 2.5, 1.5, 1.5); P.ell("ink", 30, 2, 1.5, 1.5);
      P.line("red", 8.5, 24, 3.5, 30, 1); P.line("red", 3.5, 30, 5, 37, 1); P.line("red", 5, 37, 2, 42, 1);
    }, 44) },
    { tier: 3, name: "cuckoo clock", make: () => picture(["brown", "maroon", "tan", "white", "green", "yellow", "gold", "ink"], P => {
      P.line("ink", 17, 30, 17, 36, 1); P.line("ink", 27, 30, 27, 34, 1); P.line("ink", 22, 30, 22, 38, 1);
      P.ell("gold", 17, 38.5, 2.2, 3.8); P.ell("gold", 27, 36.5, 2.2, 3.8);
      P.ell("green", 22, 39.5, 2.6, 2.6);
      P.rect("brown", 11, 15, 33, 31);
      P.poly("maroon", [[6, 18], [22, 4.5], [38, 18]]);
      P.rell("green", 18, 4.5, 4, 1.8, -0.5); P.rell("green", 26, 4.5, 4, 1.8, 0.5);
      P.rect("tan", 18.5, 9.5, 25.5, 15.5);
      P.ell("yellow", 22, 12.6, 3, 2.3); P.poly("yellow", [[24.5, 11.2], [28, 12.4], [24.5, 13.8]]);
      P.ell("tan", 22, 23, 7.5, 7);
      P.ell("white", 22, 23, 5.8, 5.4);
      P.outline("ink", true);
      clockFace(P, 22, 23, 5, 1.5);
      P.line("ink", 22, 23, 22, 19.5, 1.1); P.line("ink", 22, 23, 24.5, 24, 1.1);
      P.rect("ink", 22, 11, 23, 12);
      P.on("ink", "gold", (x, y) => (fl(x) + fl(y)) % 2 === 0 && fl(y) % 2 === 0);
    }, 44) },
    { tier: 3, name: "reading corner", make: () => picture(["peach", "brown", "maroon", "teal", "yellow", "blue", "green", "red", "ink"], P => {
      P.all("peach"); P.rect("brown", 0, 37, 48, 48);
      P.rect("maroon", 0, 37, 48, 38); P.on("maroon", "brown", (x, y) => fl(y) === 42 || fl(y) === 46);
      P.ell("red", 27, 43.5, 17, 3.6); P.on("yellow", "red", (x, y) => Math.abs(((x - 27) / 17) ** 2 + ((y - 43.5) / 3.6) ** 2 - 0.55) < 0.12);
      P.rect("maroon", 2, 8, 15, 38);
      const cols = ["blue", "green", "yellow", "teal", "red"];
      [10, 19, 28].forEach((y0, r) => {
        let x = 3.5, i = 0;
        while (x < 13.5) {
          const w = [2, 2, 1, 2, 3][(i + r) % 5], h = [0, 1, 0, 2, 1][(i * 3 + r) % 5];
          P.rect(cols[(i * 2 + r) % 5], x, y0 + h, Math.min(x + w, 13.5), y0 + 7);
          x += w; i++;
        }
      });
      P.ell("green", 8.5, 6.5, 4, 2.5); P.rell("green", 4, 9.5, 1.2, 2.5, 0.3); P.rell("green", 13, 9.5, 1.2, 2.5, -0.3);
      P.rect("maroon", 23, 5, 34, 13); P.rect("blue", 24.5, 6.5, 32.5, 11.5);
      P.on("green", "blue", (x, y) => y > 9.5 + Math.sin(x * 0.7) * 0.8);
      P.rect("teal", 20, 17, 36, 33); P.ell("teal", 28, 18, 8, 4);
      P.rect("teal", 16, 26, 22, 40); P.ell("teal", 19, 26, 3, 2.5);
      P.rect("teal", 34, 26, 40, 40); P.ell("teal", 37, 26, 3, 2.5);
      P.rect("teal", 16, 33, 40, 40);
      P.rect("ink", 21.5, 28, 22.5, 33); P.rect("ink", 33.5, 28, 34.5, 33); P.rect("ink", 22, 33, 34, 34);
      P.rect("maroon", 17, 40, 19, 42); P.rect("maroon", 37, 40, 39, 42);
      P.rell("red", 28, 25, 4.5, 3.5, 0.2);
      P.line("ink", 44, 12, 44, 40, 1.2); P.ell("ink", 44, 40.5, 3.5, 1.2);
      P.poly("yellow", [[40, 4], [47, 4], [48, 12], [39, 12]]);
      P.rect("blue", 4, 39, 13, 41); P.rect("green", 5, 41, 12, 43);
    }, 48) },
    { tier: 3, name: "bed", make: () => picture(["lilac", "tan", "brown", "white", "blue", "yellow", "navy", "pink"], P => {
      P.all("lilac"); P.rect("tan", 0, 37, 44, 44);
      P.rect("white", 23, 4, 39, 17); P.rect("navy", 24.5, 5.5, 30.5, 15.5); P.rect("navy", 31.5, 5.5, 37.5, 15.5);
      P.ell("yellow", 34.5, 9, 2, 2); P.ell("navy", 35.5, 8.3, 1.6, 1.6);
      P.rect("yellow", 27, 8, 28, 9); P.rect("yellow", 29, 13, 30, 14);
      P.rect("brown", 3, 14, 8, 38); P.ell("brown", 5.5, 14, 2.5, 2.5);
      P.rect("brown", 37, 22, 41, 38); P.ell("brown", 39, 22, 2, 2);
      P.rect("brown", 8, 29, 37, 32);
      P.rect("white", 8, 24, 37, 29);
      P.ell("white", 13, 21.5, 5, 3);
      P.poly("blue", [[16, 20.5], [35, 21], [37, 22.5], [37, 32], [16, 32]]);
      P.rect("white", 16, 20.5, 19, 32);
      P.on("yellow", "blue", (x, y) => fl(x) % 5 === 2 && fl(y) % 4 === 0);
      P.ell("pink", 22, 40.5, 15, 2.5);
    }, 44) },
    { tier: 3, name: "bath tub", make: () => picture(["sky", "white", "pink", "gold", "yellow", "orange", "blue"], P => {
      P.all("sky");
      P.on("white", "sky", (x, y) => y < 36 && (fl(x) % 6 === 0 || fl(y) % 6 === 0));
      P.rect("blue", 0, 36, 44, 44); P.on("white", "blue", (x, y) => (fl(x / 4) + fl(y / 4)) % 2 === 0);
      P.rect("gold", 37, 7, 39.5, 20); P.rect("gold", 32.5, 7, 39.5, 9.5); P.rect("gold", 32.5, 9.5, 34.5, 11.5);
      P.ell("gold", 10, 34.5, 2.6, 2.2); P.ell("gold", 34, 34.5, 2.6, 2.2);
      P.when("pink", (x, y) => y >= 20 && ((x - 22) / 17) ** 2 + ((y - 21) / 12.5) ** 2 <= 1);
      P.rect("pink", 3, 18.5, 41, 22);
      for (const [bx, by, r] of [[8, 17, 3], [13, 15, 3.5], [19, 16, 3], [24, 14.5, 3.5], [35, 16.5, 3], [16, 11.5, 2.2], [38.5, 15.5, 2]]) P.ell("white", bx, by, r, r * 0.9);
      P.ell("yellow", 28, 16.5, 4, 2.6); P.ell("yellow", 30.5, 12.3, 2.5, 2.4);
      P.poly("orange", [[32, 10.6], [36.6, 12.4], [32, 14.6]]);
      P.rect("blue", 30, 11, 31, 12);
    }, 44) },
    { tier: 3, name: "bookshelf", make: () => picture(["lilac", "brown", "tan", "red", "blue", "yellow", "green", "teal", "white"], P => {
      P.all("lilac");
      P.rect("brown", 4, 6, 40, 43); P.rect("tan", 6, 8, 38, 41);
      P.rect("brown", 6, 18, 38, 20); P.rect("brown", 6, 30, 38, 32);
      const cols = ["red", "blue", "yellow", "green", "teal"];
      [[8, 18, 30], [20, 30, 34], [32, 41, 26]].forEach(([y0, y1, xEnd], r) => {
        let x = 6.5, i = 0;
        while (x < xEnd) {
          const w = [3, 2, 4, 2, 3, 3][(i + r) % 6], h = [1, 0, 3, 2, 0, 1][(i * 2 + r) % 6];
          const k = cols[(i * 2 + r) % 5];
          P.rect(k, x, y0 + h, Math.min(x + w, xEnd), y1);
          if (w >= 3) P.rect("white", x + 0.5, y0 + h + 2, Math.min(x + w, xEnd) - 0.5, y0 + h + 3);
          x += w; i++;
        }
      });
      P.poly("red", [[30.5, 30], [33, 30], [37.5, 22], [35, 21]]);
      P.rect("white", 30, 37, 36, 41); P.ell("white", 33, 37, 3, 1.2);
      P.rect("red", 7, 3.5, 17, 6); P.rect("yellow", 8, 1.5, 16, 3.5);
      P.rect("teal", 30, 2, 36, 6);
      P.ell("green", 33, 1.5, 3.5, 1.6);
      for (let t = 0; t < 8; t++) P.rell("green", 37 + Math.sin(t * 0.9) * 1.2 + t * 0.3, 4 + t * 2.1, 1.6, 1.1, t % 2 ? 0.6 : -0.6);
    }, 44) },
    { tier: 3, name: "plant shelf", make: () => picture(["peach", "brown", "orange", "white", "teal", "green", "dkgreen", "pink"], P => {
      P.all("peach");
      // top shelf: snake plant, round cactus, trailing pothos
      for (const [x, h, lean] of [[6, 10, -1.5], [8.5, 12, 0], [11, 9, 1.5], [7.5, 7, -2.5], [10, 8, 2]]) P.poly("dkgreen", [[x - 1.3, 14], [x + 1.3, 14], [x + lean, 14 - h]]);
      P.on("green", "dkgreen", (x, y) => fl(y) % 3 === 0);
      P.poly("orange", [[4, 14], [13, 14], [12, 19], [5, 19]]); P.rect("orange", 3.5, 13, 13.5, 14.5);
      P.ell("green", 22, 10.5, 4, 4.5); P.on("dkgreen", "green", x => fl(x) === 20 || fl(x) === 23);
      P.ell("pink", 22, 5.8, 1.9, 1.4);
      P.rect("teal", 18, 14, 26, 19);
      for (const [x0, len] of [[32.5, 14], [35.5, 10], [37.5, 6]]) {
        for (let t = 0; t <= len; t += 2) P.rell("green", x0 + Math.sin(t * 0.5) * 1.2, 15 + t, 1.6, 1.1, t % 4 ? 0.6 : -0.6);
      }
      P.poly("white", [[31, 12], [39, 12], [38, 19], [32, 19]]);
      P.ell("green", 33, 11, 2, 1.3); P.ell("green", 37, 11, 2, 1.3);
      // bottom shelf: fern, succulent, flowering plant
      for (const [a, len] of [[-2.6, 6], [-2.1, 7], [-1.57, 7], [-1.05, 7], [-0.55, 6]]) P.rell("green", 11.5 + Math.cos(a) * len * 0.55, 32 + Math.sin(a) * len * 0.55, len * 0.55, 1.2, a);
      P.poly("orange", [[5, 32], [18, 32], [16.5, 38], [6.5, 38]]);
      for (let i = 0; i < 5; i++) { const a = -Math.PI + i * Math.PI / 4; P.rell("teal", 26 + Math.cos(a) * 2.2, 33 + Math.sin(a) * 2.2, 2, 1, a); }
      P.rect("white", 23, 33.5, 29, 38);
      P.ell("dkgreen", 36, 30.5, 3.8, 2.5);
      for (const [fx, fy] of [[34, 26.5], [37.5, 25.5], [36, 28]]) P.ell("pink", fx, fy, 1.4, 1.4);
      P.rect("teal", 33, 32, 39, 38);
      P.rect("brown", 2, 19, 42, 21); P.rect("brown", 2, 38, 42, 40);
      for (const bx of [5, 39]) { P.poly("brown", [[bx - 1.5, 21], [bx + 1.5, 21], [bx, 24]]); P.poly("brown", [[bx - 1.5, 40], [bx + 1.5, 40], [bx, 43]]); }
    }, 44) },
    { tier: 3, name: "fireplace", make: () => picture(["purple", "white", "ink", "red", "orange", "yellow", "brown", "grey", "tan"], P => {
      P.all("purple"); P.rect("tan", 0, 40, 44, 44);
      P.rect("white", 6, 14, 38, 40); P.rect("white", 3, 11.5, 41, 15);
      P.rect("ink", 12, 21, 32, 40); P.ell("ink", 22, 21, 10, 4.5);
      P.poly("red", [[14, 36], [15, 27], [18, 30], [20, 21], [23, 28], [26, 23], [28, 29], [30, 36]]);
      P.poly("orange", [[16, 36], [18, 30], [20, 26], [22, 31], [25, 27], [28, 36]]);
      P.poly("yellow", [[19, 36], [21, 30], [22.5, 32], [24, 30], [25.5, 36]]);
      P.rell("brown", 18, 36.5, 6.5, 2, 0.15); P.rell("brown", 26, 36.5, 6.5, 2, -0.15);
      P.rect("grey", 4, 39, 40, 42);
      for (const cx of [9, 35]) { P.rect("white", cx - 1.2, 5.5, cx + 1.2, 11.5); P.ell("yellow", cx, 3.8, 1.2, 1.8); P.rect("brown", cx - 2.5, 10, cx + 2.5, 11.5); }
      P.ell("brown", 22, 7.5, 4.2, 4); P.rect("brown", 17.5, 8, 26.5, 11.5);
      P.ell("white", 22, 7.5, 2.6, 2.6);
    }, 44) },
    { tier: 3, name: "kitchen dresser", make: () => picture(["mint", "brown", "tan", "blue", "white", "red", "yellow", "grey"], P => {
      P.all("mint"); P.rect("grey", 0, 41, 44, 44);
      P.rect("brown", 3, 1.5, 41, 4); P.rect("brown", 5, 4, 39, 24);
      P.rect("tan", 7, 5, 37, 22.5); P.rect("brown", 7, 12.5, 37, 14);
      for (const cx of [11, 18.5, 26, 33.5]) { P.ell("white", cx, 8.7, 3.4, 3.4); P.ell("blue", cx, 8.7, 2.3, 2.3); P.ell("white", cx, 8.7, 1, 1); }
      for (const mx of [8.5, 14.5]) { P.rect("red", mx, 17.5, mx + 4, 22.5); P.when("red", (x, y) => { const d = Math.hypot(x - mx - 4.3, y - 20); return d > 0.8 && d < 1.9 && x > mx + 4; }); }
      P.poly("yellow", [[21.5, 22.5], [28.5, 22.5], [28, 17], [29.5, 15.5], [22, 15.5], [22, 17]]);
      P.ell("blue", 33.5, 21, 3.5, 1.5); P.ell("blue", 33.5, 19, 3, 1.3); P.ell("white", 33.5, 17.5, 2.6, 1);
      P.rect("brown", 3, 24, 41, 26.5);
      P.rect("brown", 5, 26.5, 39, 41);
      P.rect("tan", 7, 28, 21, 31.5); P.rect("tan", 23, 28, 37, 31.5);
      P.rect("tan", 7, 33, 21, 40); P.rect("tan", 23, 33, 37, 40);
      for (const [kx, ky] of [[14, 29.8], [30, 29.8], [19, 36.5], [25, 36.5]]) P.ell("brown", kx, ky, 1.1, 1.1);
    }, 44) },
    { tier: 3, name: "grandfather clock", make: () => picture(["lilac", "purple", "tan", "brown", "gold", "white", "ink", "sky"], P => {
      P.all("lilac"); P.on("purple", "lilac", x => fl(x) % 6 === 0);
      P.rect("tan", 0, 39, 44, 44);
      P.rect("brown", 13, 5, 31, 17); P.ell("brown", 22, 5.5, 9, 3.5);
      P.ell("gold", 14, 2.5, 1.4, 1.8); P.ell("gold", 30, 2.5, 1.4, 1.8); P.ell("gold", 22, 1.5, 1.8, 1.4);
      P.ell("white", 22, 10.8, 6, 5.6);
      P.rect("brown", 15, 17, 29, 35);
      P.rect("sky", 18, 19.5, 26, 32.5);
      P.line("gold", 22, 19.5, 22, 28, 1); P.ell("gold", 22, 29, 2.3, 2.3);
      P.rect("brown", 13, 35, 31, 40);
      P.rect("tan", 13, 16.5, 31, 18); P.rect("tan", 13, 34, 31, 35.5);
      clockFace(P, 22, 10.8, 5, 1.5);
      P.line("ink", 22, 10.8, 22, 7.2, 1.1); P.line("ink", 22, 10.8, 24.8, 12, 1.1);
      P.rect("ink", 13, 39, 15, 40); P.rect("ink", 29, 39, 31, 40);
    }, 44) },
    { tier: 3, name: "sofa", make: () => picture(["mint", "brown", "red", "maroon", "yellow", "blue", "orange", "white"], P => {
      P.all("mint"); P.rect("brown", 0, 37, 44, 44);
      P.rect("brown", 16, 4, 28, 12); P.rect("blue", 17.5, 5.5, 26.5, 10.5); P.ell("yellow", 24, 7.5, 1.4, 1.4);
      P.rect("red", 6, 16, 38, 30); P.ell("red", 22, 17, 16, 3);
      P.rect("red", 2, 22, 9, 37); P.ell("red", 5.5, 22, 3.5, 3);
      P.rect("red", 35, 22, 42, 37); P.ell("red", 38.5, 22, 3.5, 3);
      P.rect("red", 9, 28, 35, 37);
      P.rect("maroon", 9, 28, 35, 29); P.rect("maroon", 21.5, 29, 22.5, 34);
      P.rect("maroon", 8.5, 24, 9.5, 37); P.rect("maroon", 34.5, 24, 35.5, 37);
      P.rect("maroon", 2, 37, 42, 38.5); P.rect("maroon", 4, 38.5, 6, 40.5); P.rect("maroon", 38, 38.5, 40, 40.5);
      P.rell("yellow", 12.5, 24, 4.2, 3.4, -0.2); P.rell("blue", 33, 24, 3.6, 3.2, 0.2);
      P.when("orange", (x, y) => { const d = Math.hypot((x - 21) / 1.5, y - 28); return d > 2.6 && d < 4 && y > 28; });
      P.ell("orange", 21, 26, 6, 3.2);
      P.ell("orange", 27, 25, 3, 2.8);
      P.poly("orange", [[24.6, 24], [25.2, 20.6], [27.2, 23]]); P.poly("orange", [[27.4, 23], [29.6, 20.6], [29.8, 24.2]]);
      P.ell("white", 14.6, 29.4, 2.2, 1.3);
      P.line("maroon", 25.5, 24.5, 26.6, 24.5, 0.8); P.line("maroon", 28, 24.5, 29.1, 24.5, 0.8);
    }, 44) },
  );
})();
