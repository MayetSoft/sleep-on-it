// Sleep on it / Ants: wild animals of the world (savanna, jungle, desert, mountains, polar regions).
"use strict";
PICTURES.push(
  // ----- simple -----
  { tier: 1, name: "panda", make: () => picture(["white", "ink", "grey", "pink"], P => {
    P.ell("ink", 6.5, 6.5, 4, 4); P.ell("ink", 21.5, 6.5, 4, 4);
    P.ell("grey", 6.5, 6.5, 2, 2); P.ell("grey", 21.5, 6.5, 2, 2);
    P.ell("white", 14, 15, 11, 9.5);
    P.rell("ink", 9.5, 13.5, 3.2, 2.3, 0.7); P.rell("ink", 18.5, 13.5, 3.2, 2.3, -0.7);
    P.rect("white", 9, 13, 10, 14); P.rect("white", 18, 13, 19, 14);
    P.ell("pink", 6.8, 18.5, 1.9, 1.4); P.ell("pink", 21.2, 18.5, 1.9, 1.4);
    P.ell("ink", 14, 18, 1.9, 1.2); P.line("ink", 14, 18.5, 14, 20.5, 0.8);
    P.line("ink", 11.8, 21, 14, 20.6, 0.8); P.line("ink", 16.2, 21, 14, 20.6, 0.8);
    P.outline("ink");
  }, 28) },
  { tier: 1, name: "koala", make: () => picture(["grey", "white", "ink", "green"], P => {
    P.ell("grey", 5.5, 9, 5, 5); P.ell("grey", 22.5, 9, 5, 5);
    P.ell("white", 5.8, 9.5, 3, 3); P.ell("white", 22.2, 9.5, 3, 3);
    P.ell("grey", 14, 15.5, 9, 8.5);
    P.rell("green", 21.5, 24.5, 4.5, 2, -0.5);
    P.outline("ink", true);
    P.ell("ink", 14, 17, 2.4, 3.4);
    P.ell("ink", 9.5, 13.5, 1.2, 1.3); P.ell("ink", 18.5, 13.5, 1.2, 1.3);
  }, 28) },
  { tier: 1, name: "monkey", make: () => picture(["brown", "peach", "pink", "ink"], P => {
    P.ell("brown", 4, 14, 3.5, 3.5); P.ell("brown", 24, 14, 3.5, 3.5);
    P.ell("pink", 4, 14, 2, 2); P.ell("pink", 24, 14, 2, 2);
    P.ell("brown", 14, 13.5, 9.5, 9.5);
    P.poly("brown", [[11, 5], [12.5, 1.5], [14.5, 4.5], [16.5, 2], [17, 5.5]]);
    P.ell("peach", 10.8, 12, 3.6, 3.8); P.ell("peach", 17.2, 12, 3.6, 3.8); P.ell("peach", 14, 18.5, 6.5, 4.6);
    P.ell("ink", 10.8, 12.5, 1.2, 1.6); P.ell("ink", 17.2, 12.5, 1.2, 1.6);
    P.rect("ink", 12, 16, 13, 17); P.rect("ink", 15, 16, 16, 17);
    P.when("ink", (x, y) => Math.abs(x - 14) < 3.5 && Math.abs(y - (20.8 - 0.1 * (x - 14) ** 2)) < 0.5);
    P.outline("ink");
  }, 28) },
  { tier: 1, name: "polar bear", make: () => picture(["white", "grey", "sky", "ink"], P => {
    P.ell("sky", 14, 24, 13.5, 3.6);
    P.ell("white", 7, 6.5, 3, 3); P.ell("white", 21, 6.5, 3, 3);
    P.ell("grey", 7, 6.8, 1.6, 1.6); P.ell("grey", 21, 6.8, 1.6, 1.6);
    P.ell("white", 14, 13.5, 9.5, 8);
    P.ell("white", 7, 21, 3.5, 2.2); P.ell("white", 21, 21, 3.5, 2.2);
    P.on("grey", "white", (x, y) => y > 21.5 && [6, 8, 20, 22].includes(fl(x)));
    P.line("white", 17, 25.5, 24, 24.2, 0.9); P.line("white", 4, 24.5, 8, 25.5, 0.9);
    P.outline("ink");
    P.ell("ink", 14, 15.8, 2, 1.4); P.ell("ink", 10, 12, 0.9, 1.1); P.ell("ink", 18, 12, 0.9, 1.1);
    P.line("ink", 14, 17, 14, 18.6, 0.8);
    P.when("ink", (x, y) => Math.abs(x - 14) < 3.2 && Math.abs(y - (18.3 + 0.12 * (x - 14) ** 2)) < 0.5 && Math.abs(x - 14) > 0.6);
  }, 28) },
  { tier: 1, name: "poison dart frog", make: () => picture(["green", "blue", "sky", "ink"], P => {
    P.ell("green", 12, 21.2, 11.5, 2);
    P.ell("blue", 5, 17.5, 3.6, 3.2); P.ell("blue", 19, 17.5, 3.6, 3.2);
    P.ell("blue", 3, 21, 2.6, 1.3); P.ell("blue", 21, 21, 2.6, 1.3);
    P.ell("blue", 12, 15.5, 6, 5.5);
    P.ell("blue", 12, 10, 7.5, 4.5); P.ell("blue", 7.5, 6.5, 2.6, 2.6); P.ell("blue", 16.5, 6.5, 2.6, 2.6);
    P.line("blue", 9, 14, 8, 20, 2); P.line("blue", 15, 14, 16, 20, 2);
    P.ell("blue", 7.5, 20.8, 1.8, 1.1); P.ell("blue", 16.5, 20.8, 1.8, 1.1);
    P.ell("sky", 12, 16.5, 2.6, 3.4);
    P.outline("ink");
    P.ell("ink", 7.5, 6.5, 1.2, 1.2); P.ell("ink", 16.5, 6.5, 1.2, 1.2);
    P.line("ink", 8, 11.5, 16, 11.5, 0.9);
    for (const [a, b] of [[11, 8], [13, 9], [5, 10], [19, 10], [4, 17], [19, 16], [6, 19], [17, 19]]) P.rect("ink", a, b, a + 1, b + 1);
  }, 24) },
  { tier: 1, name: "kiwi bird", make: () => picture(["brown", "tan", "ink", "green"], P => {
    P.rect("green", 0, 20, 24, 23);
    for (const gx of [2, 5, 15, 19, 22]) P.poly("green", [[gx - 1.5, 20.5], [gx, 16.5], [gx + 1.5, 20.5]]);
    P.line("tan", 8.5, 16, 8, 21, 2); P.line("tan", 13, 16, 13.5, 21, 2);
    P.ell("brown", 10, 11.5, 8, 6.3); P.ell("brown", 15.5, 8.5, 3.8, 3.5);
    P.line("tan", 18, 9.5, 23, 17.5, 2);
    P.on("tan", "brown", (x, y) => (fl(x) + fl(y) * 2) % 5 === 0 && fl(y) % 2 === 0 && y > 7 && x < 15);
    P.outline("ink");
    P.rect("ink", 16, 7, 17, 8);
  }, 24) },
  { tier: 1, name: "puffin", make: () => picture(["ink", "white", "orange", "red", "grey"], P => {
    P.ell("grey", 14, 26, 11.5, 3.5);
    P.ell("orange", 11, 22.5, 2.6, 1.3); P.ell("orange", 16.5, 22.5, 2.6, 1.3);
    P.ell("ink", 12.5, 15, 6.5, 8); P.ell("white", 14.5, 16.5, 4, 6);
    P.ell("ink", 14, 7, 5, 4.8); P.ell("white", 15, 7.5, 3.6, 3.2);
    P.poly("orange", [[18, 3.5], [21, 4.5], [25, 7.5], [24, 11], [18, 11]]);
    P.on("red", "orange", x => x > 20.8);
    P.outline("ink");
    P.rect("ink", 15, 6, 17, 7); P.line("ink", 18.5, 6, 18.5, 9, 0.9);
  }, 28) },
  { tier: 1, name: "toucan", make: () => picture(["ink", "white", "orange", "yellow", "blue", "brown"], P => {
    P.line("brown", 1, 26.5, 31, 25, 3);
    P.poly("ink", [[9, 21], [13, 22], [11, 31], [7.5, 30.5]]);
    P.ell("ink", 11.5, 18.5, 5, 7); P.ell("ink", 11.5, 9, 5, 4.8);
    P.ell("white", 13, 14, 3.5, 3.5);
    P.ell("blue", 12.5, 8.5, 2.2, 2.2);
    P.poly("orange", [[15, 5], [21, 4.5], [27, 6], [30.5, 9], [31, 12], [26, 12.5], [15, 13.5]]);
    P.on("yellow", "orange", (x, y) => y > 9.5 && x < 28.5);
    P.rect("ink", 9, 24, 15, 25.5);
    P.outline("ink", true);
    P.rect("ink", 12, 8, 13, 9);
  }, 32) },
  { tier: 1, name: "python", make: () => picture(["green", "dkgreen", "lime", "ink"], P => {
    P.ell("green", 14, 23, 12, 3.8);
    P.ell("ink", 14, 18.5, 9.2, 3.6); P.ell("green", 14, 18.5, 8.2, 2.8);
    P.line("green", 18, 17, 17, 11, 3.4); P.line("green", 17, 11, 15, 7, 3.4);
    P.rell("green", 17, 5, 4.6, 2.9, 0.15);
    P.on("lime", "green", (x, y) => y < 17 && y > 7.5 && x < 17.6 - (y < 11 ? (11 - y) * 0.5 : 0) && x > 13);
    P.on("dkgreen", "green", (x, y) => (fl(x) + fl(y)) % 4 === 0 && fl(x) % 2 === 0 && y > 14);
    P.on("dkgreen", "green", (x, y) => y > 8 && y < 16 && x > 17 && fl(y) % 3 === 0);
    P.outline("ink");
    P.rect("ink", 18, 4, 19, 5); P.line("ink", 21.5, 6, 25, 7, 0.9);
  }, 28) },
  { tier: 1, name: "giraffe head", make: () => picture(["gold", "brown", "tan", "ink"], P => {
    P.poly("gold", [[9, 12], [15, 13], [19, 32], [7, 32]]);
    P.line("brown", 9, 12, 6.5, 31, 1.6);
    P.rell("gold", 17, 9.5, 7, 4.2, 0.35);
    P.ell("tan", 23, 12.5, 3.2, 2.8);
    P.line("gold", 13, 6, 12, 2, 1.4); P.line("gold", 16, 5.5, 16, 1.8, 1.4);
    P.ell("brown", 12, 1.8, 1.3, 1.3); P.ell("brown", 16, 1.6, 1.3, 1.3);
    P.rell("gold", 9, 6, 3, 1.3, -0.5);
    P.on("brown", "gold", (x, y) => {
      if (y < 13) return false;
      const r = fl(y / 4), u = ((x + (r % 2) * 2) % 4 + 4) % 4, v = y % 4;
      return u > 0.9 && u < 3.3 && v > 0.9 && v < 3.3;
    });
    P.outline("ink");
    P.ell("ink", 17, 8, 0.9, 0.9); P.rect("ink", 24, 11, 25, 12);
  }, 32) },
  { tier: 1, name: "hippo", make: () => picture(["sky", "blue", "purple", "pink", "white", "green", "ink"], P => {
    P.all("sky");
    for (const [gx, top] of [[2, 12], [4, 9], [6, 13], [26, 11], [28, 8], [30, 12]]) P.line("green", gx, 22, gx + 0.5, top, 1.2);
    P.ell("purple", 16, 19.5, 10, 5.5); P.ell("purple", 16, 15, 7, 4);
    P.ell("purple", 11, 13, 2.8, 2.6); P.ell("purple", 21, 13, 2.8, 2.6);
    P.ell("purple", 8.5, 11, 1.4, 1.8); P.ell("purple", 23.5, 11, 1.4, 1.8);
    P.ell("white", 11, 12.8, 1.7, 1.7); P.ell("white", 21, 12.8, 1.7, 1.7);
    P.rect("ink", 11, 12, 12, 14); P.rect("ink", 20, 12, 21, 14);
    P.ell("pink", 10.5, 19, 2.2, 1.4); P.ell("pink", 21.5, 19, 2.2, 1.4);
    P.rect("ink", 13, 16, 14, 17); P.rect("ink", 18, 16, 19, 17);
    P.rect("blue", 0, 21, 32, 32);
    P.when("white", (x, y) => (y >= 21 && y < 22 && Math.abs(x - 16) >= 9 && Math.abs(x - 16) < 13) || (y >= 24 && y < 25 && Math.abs(x - 16) < 9 && fl(x) % 4 < 2) || (y >= 28 && y < 29 && fl(x + 2) % 7 < 3));
  }) },
  { tier: 1, name: "flamingo", make: () => picture(["sky", "yellow", "blue", "pink", "white", "ink"], P => {
    P.all("sky"); P.ell("yellow", 26, 6, 3.5, 3.5); P.rect("blue", 0, 23, 32, 32);
    P.when("white", (x, y) => (y >= 26 && y < 27 && fl(x) % 6 < 3) || (y >= 29 && y < 30 && fl(x + 3) % 6 < 3));
    P.line("pink", 14, 17, 14, 27, 1); P.line("pink", 15, 17, 17.5, 21, 1); P.line("pink", 17.5, 21, 14, 22, 1);
    P.ell("pink", 13, 15, 6.5, 3.8); P.poly("pink", [[7.5, 13.5], [3.5, 16], [8, 17]]);
    P.line("pink", 17, 13, 19.5, 10, 1.6); P.line("pink", 19.5, 10, 19, 6, 1.6); P.line("pink", 19, 6, 16.5, 3.5, 1.6);
    P.ell("pink", 15.8, 3.5, 2, 1.7);
    P.line("white", 14, 3.8, 12.2, 5.8, 1.4); P.line("ink", 12.2, 5.8, 11.8, 8, 1.4);
    P.rect("ink", 15, 3, 16, 4);
  }) },
  { tier: 1, name: "camel", make: () => picture(["sky", "yellow", "orange", "tan", "brown"], P => {
    P.all("sky"); P.ell("yellow", 6, 6, 3.5, 3.5);
    P.when("orange", (x, y) => y > 19 + 3 * Math.cos((x - 24) * 0.2));
    P.when("tan", (x, y) => y > 25 + 2 * Math.sin(x * 0.25));
    P.ell("brown", 14, 15, 7, 3.8); P.ell("brown", 13, 11.8, 4, 3.6);
    P.line("brown", 19.5, 15, 23.5, 10, 2.6); P.rell("brown", 25, 9, 2.8, 1.6, 0.25); P.rect("brown", 23, 6.5, 24, 8);
    P.line("brown", 9.5, 17, 9, 26, 1.3); P.line("brown", 11.5, 17, 12, 26, 1.3); P.line("brown", 17, 17, 17.5, 26, 1.3); P.line("brown", 19, 17, 19.5, 26, 1.3);
    P.line("brown", 7.5, 14, 6.5, 18, 0.9);
  }) },
  { tier: 1, name: "ostrich", make: () => picture(["sky", "tan", "ink", "white", "peach", "dkgreen"], P => {
    P.all("sky"); P.rect("tan", 0, 26, 32, 32);
    P.line("dkgreen", 26, 10, 26, 26, 1.2); P.ell("dkgreen", 26, 9.5, 6, 2.2);
    P.line("peach", 13, 18, 12, 26.5, 1.3); P.line("peach", 17, 18, 19, 26.5, 1.3);
    P.ell("ink", 15, 15, 7, 4.5);
    P.ell("white", 8.5, 13, 3, 2.6); P.ell("white", 13, 15, 2.6, 1.6);
    P.line("peach", 20, 13, 21, 4, 1.4); P.ell("peach", 21.5, 3.5, 1.6, 1.4); P.poly("peach", [[22.5, 3], [25, 4], [22.5, 4.6]]);
  }) },
  { tier: 1, name: "kangaroo", make: () => picture(["orange", "yellow", "red", "brown", "tan"], P => {
    P.all("orange"); P.ell("yellow", 7.5, 13, 5, 5);
    P.when("red", (x, y) => y > 25 + Math.sin(x * 0.3) * 0.6);
    P.poly("brown", [[19, 19], [30.5, 26], [29.5, 27.3], [17.5, 24]]);
    P.poly("brown", [[13, 25.2], [22, 23.5], [22.5, 26], [12.5, 26.5]]);
    P.ell("brown", 19, 20.5, 4.2, 4.5);
    P.rell("brown", 17, 15, 3.8, 6.5, 0.3);
    P.line("brown", 16, 10, 15, 8, 2.2);
    P.ell("brown", 14.5, 7.5, 2.6, 2.3); P.poly("brown", [[13, 6.5], [9.5, 8.2], [10, 9.3], [14, 9.5]]);
    P.rell("brown", 15.5, 4, 0.9, 2.3, 0.25); P.rell("brown", 17, 4.3, 0.9, 2.3, 0.5);
    P.line("brown", 14.5, 12, 12, 15, 1.2); P.line("brown", 12, 15, 11.5, 16.3, 1);
    P.on("tan", "brown", (x, y) => { const u = (x - 15.6) * Math.cos(0.3) + (y - 16) * Math.sin(0.3), v = -(x - 15.6) * Math.sin(0.3) + (y - 16) * Math.cos(0.3); return (u / 1.9) ** 2 + (v / 4.6) ** 2 <= 1; });
  }) },
  { tier: 1, name: "seal on ice", make: () => picture(["sky", "blue", "white", "grey", "ink"], P => {
    P.all("sky"); P.rect("blue", 0, 22, 32, 32);
    P.when("white", (x, y) => (y >= 26 && y < 27 && fl(x) % 7 < 3) || (y >= 29 && y < 30 && fl(x + 3) % 7 < 3));
    P.poly("white", [[2, 22], [6, 18.5], [27, 18], [31, 21], [29, 24], [4, 24.5]]);
    P.poly("grey", [[7, 16], [1.5, 13], [2.5, 19]]);
    P.rell("grey", 15, 15.5, 9.5, 3.6, -0.15); P.ell("grey", 24.5, 11.5, 3.6, 3.4);
    P.rell("grey", 18, 18.5, 2.8, 1.2, 0.5);
    P.ell("ink", 23.2, 10.6, 1, 1.1); P.ell("ink", 26.2, 10.6, 1, 1.1); P.ell("ink", 27.3, 12.8, 1, 0.8);
  }) },
  { tier: 1, name: "meerkat", make: () => picture(["sky", "tan", "brown", "orange", "yellow", "white"], P => {
    P.all("sky"); P.ell("yellow", 26, 6, 3.5, 3.5);
    const m = (cx, top) => {
      P.line("tan", cx + 3, top + 15, cx + 6.5, top + 18, 1.3);
      P.ell("tan", cx, top + 14, 4.5, 4); P.ell("tan", cx, top + 10.5, 3.8, 7);
      P.ell("white", cx, top + 11.5, 2, 4.5);
      P.ell("tan", cx, top, 3.2, 3); P.ell("tan", cx, top + 2.2, 1.7, 1.7);
      P.rect("brown", cx - 4, top - 1, cx - 3, top + 1); P.rect("brown", cx + 3, top - 1, cx + 4, top + 1);
      P.rect("brown", cx - 2, top - 1, cx - 1, top + 1); P.rect("brown", cx + 1, top - 1, cx + 2, top + 1);
      P.rect("brown", cx - 0.5, top + 2.6, cx + 0.5, top + 3.6);
      P.line("brown", cx - 3.3, top + 5.5, cx - 1.6, top + 9, 1); P.line("brown", cx + 3.3, top + 5.5, cx + 1.6, top + 9, 1);
    };
    m(10.5, 7); m(21.5, 9.5);
    P.ell("orange", 16, 34, 17, 8);
  }) },
  { tier: 1, name: "rhino", make: () => picture(["sky", "gold", "green", "grey", "white", "dkgrey"], P => {
    P.all("sky"); P.rect("gold", 0, 24, 32, 32); P.ell("green", 4, 24, 4, 2.5); P.ell("green", 29, 24, 4, 3);
    P.ell("dkgrey", 14, 25, 10, 1.3);
    P.rect("grey", 7, 19, 10, 25); P.rect("grey", 16, 19, 19, 25);
    P.ell("grey", 13, 17, 8, 5);
    P.poly("grey", [[19, 13], [24, 15], [28, 19], [27, 21], [21, 21], [18, 19]]);
    P.poly("grey", [[19, 13], [19.5, 10], [21, 13]]);
    P.poly("white", [[25, 17.5], [27.5, 10], [29, 18]]); P.poly("white", [[22.5, 15.5], [23.5, 11.5], [25, 15.5]]);
    P.ell("dkgrey", 22.5, 16.5, 0.9, 0.9); P.line("dkgrey", 5.5, 15, 4.5, 19, 0.9);
    P.rect("dkgrey", 10, 21, 11, 25); P.rect("dkgrey", 19, 21, 20, 25);
  }) },
  // ----- medium -----
  { tier: 2, name: "elephant head", make: () => picture(["grey", "pink", "white", "ink"], P => {
    P.ell("grey", 7, 15, 7, 9.5); P.ell("grey", 29, 15, 7, 9.5);
    P.ell("pink", 7.3, 15.5, 4.5, 6.8); P.ell("pink", 28.7, 15.5, 4.5, 6.8);
    P.ell("ink", 18, 14, 8.6, 9.6); P.ell("grey", 18, 14, 7.6, 8.6);
    P.line("grey", 18, 18, 18, 27, 5.2); P.line("grey", 18, 27, 19, 30, 4.2); P.line("grey", 19, 30, 22, 32, 3.2); P.line("grey", 22, 32, 24, 30.5, 2.6);
    P.poly("white", [[13, 19.5], [16, 20], [14.5, 25.5], [11.5, 25.5]]); P.poly("white", [[23, 19.5], [20, 20], [21.5, 25.5], [24.5, 25.5]]);
    P.outline("ink");
    P.ell("ink", 14.5, 12.5, 1.1, 1.5); P.ell("ink", 21.5, 12.5, 1.1, 1.5);
  }, 36) },
  { tier: 2, name: "tiger", make: () => picture(["orange", "white", "ink", "pink", "lime"], P => {
    P.ell("orange", 8, 8, 4.5, 4.5); P.ell("orange", 28, 8, 4.5, 4.5);
    P.ell("white", 8.3, 8.5, 2.3, 2.3); P.ell("white", 27.7, 8.5, 2.3, 2.3);
    P.ell("orange", 18, 19, 13, 11);
    P.poly("orange", [[6, 16], [1.5, 25], [6, 24], [4, 28], [10, 27]]); P.poly("orange", [[30, 16], [34.5, 25], [30, 24], [32, 28], [26, 27]]);
    P.ell("white", 15, 24.5, 4.2, 3.5); P.ell("white", 21, 24.5, 4.2, 3.5); P.ell("white", 18, 28.5, 3.5, 2);
    P.ell("white", 12, 16, 3.6, 2.6); P.ell("white", 24, 16, 3.6, 2.6);
    P.ell("lime", 12.5, 16.5, 1.9, 1.6); P.ell("lime", 23.5, 16.5, 1.9, 1.6);
    P.line("ink", 18, 9, 18, 13, 1.3); P.line("ink", 15, 9.5, 16, 12, 1); P.line("ink", 21, 9.5, 20, 12, 1);
    for (const [a, b, c, d] of [[5, 16.5, 9.5, 18.5], [4.5, 20.5, 9.5, 21.5], [31, 16.5, 26.5, 18.5], [31.5, 20.5, 26.5, 21.5]]) P.line("ink", a, b, c, d, 1.2);
    P.outline("ink");
    P.rect("ink", 12, 15.5, 13, 17.5); P.rect("ink", 23, 15.5, 24, 17.5);
    P.poly("pink", [[14.8, 20.5], [21.2, 20.5], [18, 24.2]]);
    P.line("ink", 18, 24, 18, 25.5, 0.8);
  }, 36) },
  { tier: 2, name: "red panda", make: () => picture(["orange", "white", "maroon", "ink"], P => {
    P.ell("maroon", 18, 31, 8, 4);
    P.poly("white", [[4, 14], [6, 3], [14.5, 8]]); P.poly("white", [[32, 14], [30, 3], [21.5, 8]]);
    P.poly("maroon", [[6.5, 11.5], [7.3, 6], [11.5, 8.8]]); P.poly("maroon", [[29.5, 11.5], [28.7, 6], [24.5, 8.8]]);
    P.ell("orange", 18, 19, 12.5, 10.5);
    P.ell("white", 8, 20.5, 3, 3.5); P.ell("white", 28, 20.5, 3, 3.5);
    P.ell("white", 18, 24, 6, 4.5);
    P.ell("white", 12.5, 13, 2.2, 1.6); P.ell("white", 23.5, 13, 2.2, 1.6);
    P.line("maroon", 13, 17.5, 11.5, 26, 2.2); P.line("maroon", 23, 17.5, 24.5, 26, 2.2);
    P.outline("ink");
    P.ell("ink", 13, 16.8, 1.4, 1.6); P.ell("ink", 23, 16.8, 1.4, 1.6);
    P.ell("ink", 18, 21.5, 2, 1.3); P.line("ink", 18, 22, 18, 24, 0.8);
    P.line("ink", 15.5, 25, 18, 24, 0.8); P.line("ink", 20.5, 25, 18, 24, 0.8);
  }, 36) },
  { tier: 2, name: "armadillo", make: () => picture(["tan", "brown", "grey", "ink"], P => {
    P.poly("grey", [[24, 19], [31, 24], [30.5, 25.2], [23, 22]]);
    P.rect("grey", 8, 19, 11, 24); P.rect("grey", 19, 19, 22, 24);
    P.when("tan", (x, y) => ((x - 15) / 10) ** 2 + ((y - 17) / 7.5) ** 2 <= 1 && y < 21);
    P.on("brown", "tan", (x, y) => [11, 13, 15, 17, 19].includes(fl(x)) || y >= 20);
    P.poly("grey", [[7, 14], [1, 19.5], [2, 21], [8.5, 20]]);
    P.ell("grey", 6.5, 13, 1.3, 2);
    P.outline("ink");
    P.rect("ink", 5, 16, 6, 17);
  }, 32) },
  { tier: 2, name: "lemur", make: () => picture(["grey", "white", "ink", "orange"], P => {
    const pts = [[19, 30], [24, 29.5], [28.5, 26], [30, 20], [28.5, 14], [29, 8], [31.5, 4]];
    const seg = (x, y) => {
      let best = 1e9, s = 0, acc = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
        const t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / (len * len))), d = Math.hypot(x - x0 - t * dx, y - y0 - t * dy);
        if (d < best) { best = d; s = acc + t * len; }
        acc += len;
      }
      return [best, s];
    };
    P.when("white", (x, y) => seg(x, y)[0] <= 1.8);
    P.when("ink", (x, y) => { const [d, s] = seg(x, y); return d <= 1.8 && fl(s / 2.4) % 2 === 1; });
    P.ell("grey", 14, 23, 6.5, 8); P.ell("grey", 10, 30.5, 3, 1.6); P.ell("grey", 18, 30.5, 3, 1.6);
    P.ell("white", 14, 24.5, 3.5, 5.5);
    P.poly("grey", [[9, 8], [8, 3.5], [11.5, 6.5]]); P.poly("grey", [[19, 8], [20, 3.5], [16.5, 6.5]]);
    P.ell("grey", 14, 11, 5.5, 5);
    P.ell("white", 14, 12, 4, 3.8);
    P.outline("ink");
    P.poly("ink", [[12.5, 13.5], [15.5, 13.5], [14, 17]]);
    P.ell("ink", 12, 11.5, 2.2, 2); P.ell("ink", 16, 11.5, 2.2, 2);
    P.rect("orange", 11, 10.5, 13, 12.5); P.rect("orange", 15, 10.5, 17, 12.5);
  }, 36) },
  { tier: 2, name: "platypus", make: () => picture(["brown", "tan", "grey", "ink"], P => {
    P.ell("brown", 29.5, 21, 6, 3.2);
    P.on("tan", "brown", (x, y) => (fl(x) + fl(y)) % 3 === 0 || (fl(x) - fl(y) + 60) % 3 === 0);
    P.rect("brown", 11, 22, 14, 25); P.rect("brown", 20.5, 22, 23.5, 25);
    P.ell("grey", 12.5, 25.5, 3.2, 1.6); P.ell("grey", 22, 25.5, 3.2, 1.6);
    P.ell("brown", 18, 20, 8.5, 5);
    P.on("tan", "brown", (x, y) => y > 22.3 && x > 11 && x < 25);
    P.ell("brown", 10, 18.5, 4.2, 3.8);
    P.ell("grey", 3.5, 19, 3.2, 2.6); P.rect("grey", 3.5, 16.5, 8, 21.5);
    P.outline("ink");
    P.rect("ink", 10, 17, 11, 18);
  }, 36) },
  { tier: 2, name: "anteater", make: () => picture(["tan", "brown", "white", "ink"], P => {
    P.poly("brown", [[28, 14], [36, 14.5], [39.5, 21], [38, 29], [34, 32], [31, 26], [27.5, 20]]);
    P.rect("tan", 26, 21, 29.5, 32); P.rect("tan", 22, 22, 25, 31);
    P.ell("tan", 20.5, 19, 10, 6); P.ell("tan", 15, 16.5, 4.5, 4.5);
    P.rect("white", 13.5, 21, 16.5, 32); P.rect("white", 17, 22, 20, 31);
    P.on("ink", "white", (x, y) => y >= 27.5 && y < 29);
    P.ell("tan", 12, 17.5, 3.8, 3.6);
    P.poly("tan", [[11, 15], [1, 22.5], [1.5, 24], [12, 20.5]]);
    P.ell("tan", 12.5, 13.6, 1.3, 1.5);
    const d = (x, y) => ((x - 12) * 8 + (y - 21) * 15) / 17;
    P.on("ink", "tan", (x, y) => x > 10 && x < 29 && Math.abs(d(x, y)) < 1.5);
    P.on("white", "tan", (x, y) => x > 10 && x < 29 && d(x, y) >= 1.5 && d(x, y) < 2.7);
    P.outline("ink");
    P.rect("ink", 11, 16, 12, 17);
  }, 40) },
  { tier: 2, name: "pelican", make: () => picture(["white", "grey", "yellow", "orange", "brown", "ink"], P => {
    P.rect("brown", 13, 27, 21, 36); P.ell("brown", 17, 27, 4, 1.2);
    P.ell("orange", 14.5, 26.5, 2.8, 1.4); P.ell("orange", 19.5, 26.5, 2.8, 1.4);
    P.poly("white", [[22, 19], [29, 25], [22, 25]]);
    P.ell("white", 17, 20, 7.5, 6.5); P.rell("grey", 19.5, 20, 6, 3.8, 0.3);
    P.line("white", 13, 16, 12, 8, 3); P.ell("white", 12.5, 6.5, 3.2, 3);
    P.poly("orange", [[14, 4.5], [30, 7.5], [30.5, 10], [15, 9]]);
    P.poly("yellow", [[15, 9], [30.5, 10], [26, 13.8], [19, 14.2], [15, 11.5]]);
    P.outline("ink", true);
    P.rect("ink", 12, 5, 13, 6);
  }, 36) },
  { tier: 2, name: "capybara", make: () => picture(["brown", "ink", "orange", "green"], P => {
    P.rect("brown", 10, 24, 13.5, 29); P.rect("brown", 23, 24, 26.5, 29);
    P.ell("brown", 19, 20, 10.5, 7);
    P.poly("brown", [[3, 13], [12, 10.5], [15.5, 13], [15.5, 22.5], [4, 22.5], [2, 19.5], [2, 15]]);
    P.ell("brown", 13.5, 10.5, 1.9, 1.7);
    P.ell("orange", 8.5, 7.5, 3.8, 3.3); P.rell("green", 12.5, 3.4, 3.6, 1.9, -0.5);
    P.outline("ink", true);
    P.rect("ink", 10, 13.5, 12, 14.5); P.rect("ink", 3, 16, 4, 17.5); P.line("ink", 2.5, 20, 5.5, 20, 0.9);
  }, 32) },
  { tier: 2, name: "zebra", make: () => picture(["sky", "yellow", "dkgreen", "white", "ink", "brown"], P => {
    P.all("sky"); P.rect("yellow", 0, 27, 36, 36);
    P.when("yellow", (x, y) => y > 25 && y < 27 && fl(x) % 3 === 0);
    P.line("brown", 30, 27, 30, 15, 1.4); P.line("brown", 30, 17, 26, 13, 1);
    P.ell("dkgreen", 29, 12, 6.5, 2.2);
    for (const lx of [10.5, 13, 21, 23.5]) P.line("white", lx, 20, lx, 29.5, 1.8);
    P.ell("white", 17, 18, 7.5, 4.2);
    P.poly("white", [[9, 18], [13, 16], [9, 7.5], [5.5, 9]]);
    P.rell("white", 5, 11, 2.2, 4, 0.5);
    P.poly("white", [[8, 8], [8.5, 5], [9.5, 8]]);
    P.line("white", 24.5, 16, 26, 23, 0.9);
    P.on("ink", "white", (x, y) => {
      if (y > 21.5) return fl(y) % 2 === 0;
      if (x < 11) return fl(y - x * 0.6) % 3 === 0;
      return fl(x + Math.sin(y * 0.6) * 1.2) % 3 === 0;
    });
    P.line("ink", 12, 15.5, 8.5, 7, 1.2); P.ell("ink", 3.5, 14, 1.3, 1.3);
    for (const lx of [10.5, 13, 21, 23.5]) P.rect("ink", lx - 1, 29, lx + 1, 30);
  }, 36) },
  { tier: 2, name: "crocodile", make: () => picture(["sky", "yellow", "blue", "tan", "green", "dkgreen", "white"], P => {
    P.all("sky"); P.ell("yellow", 33, 6, 3.6, 3.6);
    P.ell("tan", 20, 31, 22, 7.5); P.when("blue", (x, y) => y > 32);
    P.when("white", (x, y) => y > 32 && ((y >= 34 && y < 35 && fl(x) % 6 < 3) || (y >= 37 && y < 38 && fl(x + 3) % 7 < 3)));
    P.poly("green", [[28, 19.5], [39, 25], [38.5, 26.5], [28, 25.5]]);
    P.poly("green", [[14, 24], [12, 28.5], [17.5, 28.5], [18, 24]]); P.poly("green", [[25, 24], [24, 28.5], [29.5, 28.5], [29, 24]]);
    P.ell("green", 21, 22, 8.5, 3.8);
    P.poly("green", [[15, 19.5], [2, 21], [1.5, 23], [15, 23.5]]);
    P.poly("green", [[15, 23.5], [2, 23.3], [2.5, 25], [15, 26]]);
    P.ell("green", 13, 18.8, 2, 1.6); P.ell("green", 2.8, 20.6, 1.3, 1);
    for (let bx = 15; bx < 37; bx += 2.5) { const by = 18.6 + (bx > 28 ? (bx - 28) * 0.5 : 0); P.poly("dkgreen", [[bx, by + 1.2], [bx + 1, by - 1], [bx + 2, by + 1.2]]); }
    P.on("dkgreen", "green", (x, y) => y < 21 && x > 14 && fl(x) % 3 === 0);
    P.on("dkgreen", "green", (x, y) => x > 28 && y < 22.5 + (x - 28) * 0.5 && fl(x) % 3 === 0);
    P.when("white", (x, y) => y >= 23 && y < 24 && x > 3 && x < 14.5 && fl(x) % 2 === 0);
    P.ell("yellow", 13, 18.6, 1.1, 0.9);
  }, 40) },
  { tier: 2, name: "sloth", make: () => picture(["green", "dkgreen", "brown", "tan", "white", "ink"], P => {
    P.all("green");
    for (const [lx, ly, a] of [[4, 2, 0.4], [16, 1.5, -0.2], [30, 2, 0.5], [33, 16, 1.2], [3, 18, -1.1], [31, 31, 0.6], [5, 32, -0.5]]) P.rell("dkgreen", lx, ly, 4, 1.8, a);
    for (const [fx, fy] of [[9, 3.5], [33, 22], [3, 26], [28, 33]]) P.ell("white", fx, fy, 1.4, 1.4);
    P.line("brown", 0, 6, 36, 8, 3);
    P.line("tan", 13.5, 18, 6.5, 7.5, 2.8); P.line("tan", 22.5, 18, 29.5, 8.5, 2.8);
    P.line("ink", 5, 7.5, 6, 4.8, 0.9); P.line("ink", 7.5, 7.5, 8.5, 5, 0.9); P.line("ink", 28.5, 8.5, 28.5, 5.8, 0.9); P.line("ink", 31, 8.5, 31.2, 6, 0.9);
    P.line("tan", 14.5, 28, 12.5, 36, 2.6); P.line("tan", 21.5, 28, 23.5, 36, 2.6);
    P.ell("tan", 18, 23.5, 7, 7.5);
    P.on("brown", "tan", (x, y) => y > 21 && (fl(x) * 2 + fl(y)) % 7 === 0);
    P.ell("tan", 18, 15, 5.8, 5);
    P.ell("white", 18, 15.8, 4.5, 3.8);
    P.rell("brown", 15.4, 15.4, 2.5, 1.1, -0.45); P.rell("brown", 20.6, 15.4, 2.5, 1.1, 0.45);
    P.rect("ink", 15, 14.5, 16, 15.5); P.rect("ink", 20, 14.5, 21, 15.5);
    P.ell("ink", 18, 17.3, 1.2, 0.8);
    P.when("ink", (x, y) => y >= 18.5 && y < 19.5 && Math.abs(x - 18) < 1.8 && Math.abs(x - 18) > 0.5);
  }, 36) },
  { tier: 2, name: "snowy owl", make: () => picture(["purple", "lilac", "white", "grey", "yellow"], P => {
    P.all("purple"); P.ell("yellow", 29, 7, 4, 4);
    for (const [sx, sy] of [[4, 4], [10, 7], [19, 2], [33, 16], [4, 16], [24, 11], [31, 24], [3, 25]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.when("lilac", (x, y) => y > 30 + Math.sin(x * 0.3));
    P.rect("grey", 12, 27, 22, 36); P.ell("white", 17, 27.5, 6.2, 1.6);
    P.on("purple", "grey", (x, y) => y > 29 && fl(x) === 16 && fl(y) % 3 !== 0);
    P.ell("white", 17, 19, 7.5, 8.5); P.ell("white", 17, 10.5, 6.2, 5.2);
    P.when("grey", (x, y) => { const d = ((x - 17) / 5.7) ** 2 + ((y - 11) / 4.5) ** 2; return d > 0.72 && d <= 1 && y > 8; });
    P.when("grey", (x, y) => { const l = ((x - 10.5) / 3) ** 2 + ((y - 19.5) / 6.5) ** 2, r = ((x - 23.5) / 3) ** 2 + ((y - 19.5) / 6.5) ** 2; return (l > 0.6 && l <= 1 && x > 10.5) || (r > 0.6 && r <= 1 && x < 23.5); });
    P.on("grey", "white", (x, y) => y > 15.5 && y < 26 && ((fl(x) + fl(y) * 2) % 5 === 0) && fl(y) % 2 === 0);
    P.ell("yellow", 14.3, 10.5, 2, 2); P.ell("yellow", 19.7, 10.5, 2, 2);
    P.rect("purple", 14, 9.5, 15, 11.5); P.rect("purple", 19, 9.5, 20, 11.5);
    P.poly("grey", [[16, 12.5], [18, 12.5], [17, 15]]);
    for (const fx of [14, 16, 18, 20]) P.rect("grey", fx, 26.5, fx + 1, 27.5);
  }, 36) },
  { tier: 2, name: "walrus", make: () => picture(["sky", "blue", "white", "brown", "tan", "ink"], P => {
    P.all("sky"); P.rect("blue", 0, 27, 36, 36);
    P.when("white", (x, y) => y >= 32 && y < 33 && fl(x) % 7 < 3);
    P.poly("white", [[1, 27], [4, 23], [32, 22.5], [35, 26], [33, 29.5], [3, 30]]);
    P.ell("brown", 18, 19, 11, 6.5); P.ell("brown", 18, 12, 6, 5);
    P.rell("brown", 8.5, 24, 4, 1.6, 0.3); P.rell("brown", 27.5, 24, 4, 1.6, -0.3);
    P.line("white", 15.5, 16.5, 15, 24, 1.6); P.line("white", 20.5, 16.5, 21, 24, 1.6);
    P.ell("tan", 15.7, 15, 2.9, 2.4); P.ell("tan", 20.3, 15, 2.9, 2.4);
    P.on("ink", "tan", (x, y) => fl(x) % 2 === 0 && fl(y) % 2 === 1 && y > 14);
    P.ell("ink", 15.5, 10.5, 1, 1); P.ell("ink", 20.5, 10.5, 1, 1);
  }, 36) },
  { tier: 2, name: "narwhal", make: () => picture(["sky", "white", "blue", "grey", "dkgrey"], P => {
    P.all("blue"); P.rect("sky", 0, 0, 36, 5);
    P.poly("white", [[0, 4], [10, 3], [11, 7], [0, 8]]); P.poly("white", [[22, 4], [36, 3.5], [36, 7.5], [25, 8]]);
    for (const [bx, by] of [[30, 13], [32, 10], [29, 9]]) P.ell("white", bx, by, 0.8, 0.8);
    P.poly("grey", [[9, 22], [2.5, 17.5], [3.5, 22], [2.5, 26.5]]);
    P.rell("grey", 17, 22, 10, 4.5, -0.1); P.rell("grey", 18, 26.5, 2.5, 1.2, 0.5);
    P.on("white", "grey", (x, y) => y > 23.8 - (x - 17) * 0.1 && x > 9);
    P.on("dkgrey", "grey", (x, y) => y < 21.5 && (fl(x) * 5 + fl(y) * 3) % 7 === 0);
    P.line("white", 26, 20.5, 35, 16, 1.4);
    P.on("dkgrey", "white", (x, y) => x > 27 && y < 21 && fl(x) % 2 === 0 && y > 15);
    P.rect("dkgrey", 23, 20, 24, 21);
  }, 36) },
  { tier: 2, name: "ibex", make: () => picture(["sky", "white", "grey", "dkgrey", "brown", "tan"], P => {
    P.all("sky");
    P.poly("white", [[0, 22], [6, 12], [12, 18], [19, 9], [27, 17], [36, 11], [36, 24], [0, 24]]);
    P.poly("grey", [[0, 36], [0, 28], [8, 25.5], [15, 25], [22, 26.5], [27, 23], [36, 24.5], [36, 36]]);
    P.line("dkgrey", 6, 36, 9, 28, 1); P.line("dkgrey", 20, 36, 22, 29, 1); P.line("dkgrey", 30, 36, 31, 27, 1); P.line("dkgrey", 13, 32, 17, 30, 1);
    P.line("brown", 12, 19, 12, 25.5, 1.4); P.line("brown", 14, 19, 14.5, 25.5, 1.4); P.line("brown", 20, 19, 20.5, 26.5, 1.4); P.line("brown", 21.8, 19, 22.8, 26, 1.4);
    P.ell("brown", 17, 18, 6.5, 3.4); P.line("brown", 21.5, 16.5, 24, 11.5, 3);
    P.rell("brown", 25.5, 11.5, 3, 1.7, 0.7);
    P.rell("brown", 22.5, 9.8, 1.7, 0.8, -0.4);
    P.line("brown", 10.5, 16.5, 9.5, 15, 1);
    P.when("tan", (x, y) => { const d = Math.hypot(x - 19.5, y - 12); return d > 4.8 && d < 7 && y < 11.5 && x > 13 && x < 25; });
    P.on("brown", "tan", (x, y) => fl(Math.atan2(y - 12, x - 19.5) * 7) % 2 === 0 && Math.hypot(x - 19.5, y - 12) > 6);
    P.on("tan", "brown", (x, y) => y > 19.4 && x > 11 && x < 23 && y < 21.6);
    P.line("dkgrey", 26.5, 13.5, 26, 15.8, 1);
    P.rect("dkgrey", 24, 10, 25, 11);
  }, 36) },
  { tier: 2, name: "hummingbird", make: () => picture(["sky", "green", "red", "white", "ink", "pink", "dkgreen"], P => {
    P.all("sky");
    P.line("dkgreen", 7, 32, 7.5, 19, 1.4); P.rell("dkgreen", 10.5, 25, 3.5, 1.4, -0.6); P.rell("dkgreen", 4, 28, 3, 1.2, 0.6);
    P.poly("pink", [[6, 19.5], [9, 19.5], [12.5, 11], [11, 9], [8.5, 11], [6, 9.5], [5.5, 12]]);
    P.rell("white", 23.5, 7.5, 6.5, 1.8, -1.15); P.rell("white", 26, 9.5, 6, 1.6, -0.75);
    P.line("dkgreen", 21, 13, 25.8, 2.5, 0.8); P.line("dkgreen", 21.5, 13, 30, 6, 0.8);
    P.poly("green", [[24, 18], [28.5, 24], [25.5, 25.5], [22, 20]]);
    P.rell("green", 21, 15.5, 5.5, 2.9, 0.75);
    P.ell("green", 17, 10.5, 2.8, 2.6);
    P.line("ink", 14.6, 10.2, 9.5, 9.2, 1);
    P.ell("red", 17.6, 13.2, 2.3, 1.6);
    P.on("white", "green", (x, y) => x + y > 37.5 && x < 24 && y < 20 && x - y < 6);
    P.rect("ink", 17, 9, 18, 10);
  }) },
  { tier: 2, name: "gorilla", make: () => picture(["green", "dkgreen", "dkgrey", "grey", "brown"], P => {
    P.all("green"); P.line("brown", 18, 0, 36, 11, 2.2); P.line("brown", 0, 9, 8, 4, 2);
    for (const [lx, ly, a] of [[4, 4, 0.6], [32, 5, -0.5], [3, 22, -0.9], [33, 20, 0.9], [10, 2, -0.2], [26, 2, 0.3]]) P.rell("dkgreen", lx, ly, 5, 2.2, a);
    P.ell("dkgrey", 18, 37, 17, 11);
    P.ell("dkgrey", 18, 16, 9, 10); P.ell("dkgrey", 18, 9, 6, 5);
    P.ell("grey", 9.2, 17.5, 1.4, 2); P.ell("grey", 26.8, 17.5, 1.4, 2);
    P.ell("grey", 18, 17.5, 6.5, 6.5); P.ell("grey", 18, 21.5, 6, 4.5);
    P.rect("dkgrey", 11, 12, 25, 14.2);
    P.rect("brown", 14, 15, 16, 16); P.rect("brown", 20, 15, 22, 16);
    P.rect("brown", 16, 19, 17, 20); P.rect("brown", 19, 19, 20, 20);
    P.ell("dkgrey", 18, 19.5, 3, 1.7);
    P.line("dkgrey", 14.5, 24, 21.5, 24, 0.9);
  }, 36) },
  { tier: 2, name: "tortoise", make: () => picture(["sky", "green", "brown", "gold", "grey", "dkgrey"], P => {
    P.all("sky"); P.rect("green", 0, 27, 36, 36);
    P.ell("dkgrey", 18, 30.2, 12, 1);
    P.rect("grey", 8, 23, 12.5, 30); P.rect("grey", 22, 23, 26.5, 30);
    P.line("grey", 27, 22, 31, 17, 3.2); P.ell("grey", 32, 16.5, 3, 2.3);
    P.when("brown", (x, y) => ((x - 17) / 11) ** 2 + ((y - 24) / 11) ** 2 <= 1 && y < 25);
    const cs = [[17, 16.5], [11.5, 19], [22.5, 19], [7.5, 22.8], [26.5, 22.8], [14.5, 22.8], [19.5, 22.8]];
    P.on("gold", "brown", (x, y) => {
      if (y > 23.8) return false;
      const ds = cs.map(([cx, cy]) => Math.hypot(x - cx, y - cy)).sort((a, b) => a - b);
      return ds[1] - ds[0] > 1.1;
    });
    P.rect("dkgrey", 32, 15.5, 33, 16.5);
    P.rect("dkgrey", 8, 29, 9, 30); P.rect("dkgrey", 10, 29, 11, 30); P.rect("dkgrey", 22, 29, 23, 30); P.rect("dkgrey", 24, 29, 25, 30);
  }, 36) },
  { tier: 2, name: "orca", make: () => picture(["sky", "white", "blue", "ink", "grey"], P => {
    P.all("sky");
    P.poly("white", [[26, 28], [29, 14], [32, 17], [35, 9], [38, 16], [40, 19], [40, 28]]);
    P.on("grey", "white", (x, y) => x > 35.5 - (y - 9) * 0.15);
    P.rect("blue", 0, 28, 40, 40);
    P.when("white", (x, y) => y > 28 && ((y >= 32 && y < 33 && fl(x) % 7 < 3) || (y >= 36 && y < 37 && fl(x + 4) % 8 < 3)));
    const a = -0.45, c = Math.cos(a), s = Math.sin(a), cx = 15, cy = 17;
    P.rell("ink", cx, cy, 11, 4.5, a);
    P.poly("ink", [[12, 14], [11, 6], [17, 12]]);
    P.poly("ink", [[6, 21], [1, 19], [3, 23], [2.5, 27], [6.5, 23.5]]);
    P.rell("ink", 17, 21, 3, 1.2, 0.6);
    P.on("white", "ink", (x, y) => { const u = (x - cx) * c + (y - cy) * s, v = -(x - cx) * s + (y - cy) * c; return v > 1.4 && u > -7; });
    P.rell("white", 21.5, 12.5, 2, 1, a);
    for (const [dx, dy] of [[4, 29], [8, 27.5], [11, 29], [2, 27], [14, 30]]) P.ell("white", dx, dy, 1.1, 1.1);
  }, 40) },
  // ----- complex -----
  { tier: 3, name: "lion", make: () => picture(["brown", "orange", "tan", "white", "pink", "ink"], P => {
    const star = (k, n, r1, r2, off) => { const pts = []; for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n + off, r = i % 2 ? r2 : r1; pts.push([22 + Math.cos(a) * r, 22.5 + Math.sin(a) * r]); } P.poly(k, pts); };
    star("brown", 18, 21, 16.5, 0);
    star("orange", 16, 17.5, 14, 0.2);
    P.ell("tan", 13.5, 12, 3.2, 3.2); P.ell("tan", 30.5, 12, 3.2, 3.2);
    P.ell("brown", 13.5, 12.3, 1.6, 1.6); P.ell("brown", 30.5, 12.3, 1.6, 1.6);
    P.ell("tan", 22, 23, 9.5, 10.5);
    P.ell("white", 19.8, 28, 3.2, 2.6); P.ell("white", 24.2, 28, 3.2, 2.6); P.ell("white", 22, 31.5, 2.6, 1.6);
    P.outline("ink");
    P.ell("ink", 18, 20, 1.4, 1.6); P.ell("ink", 26, 20, 1.4, 1.6);
    P.line("ink", 15.5, 17, 19.5, 17.5, 0.9); P.line("ink", 28.5, 17, 24.5, 17.5, 0.9);
    P.poly("pink", [[18.5, 23], [25.5, 23], [22, 27]]);
    P.line("ink", 22, 27, 22, 29.2, 0.9); P.line("ink", 22, 29, 19.5, 30, 0.8); P.line("ink", 22, 29, 24.5, 30, 0.8);
  }, 44) },
  { tier: 3, name: "peacock", make: () => picture(["teal", "green", "gold", "blue", "tan", "ink"], P => {
    P.when("teal", (x, y) => { const d = Math.hypot(x - 24, y - 32), a = Math.atan2(y - 32, x - 24); return y < 34 && d <= 21 + Math.cos(a * 18) * 1; });
    P.on("green", "teal", (x, y) => { const a = Math.atan2(y - 32, x - 24); return Math.abs(((a * 9 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.13; });
    for (const [r, n] of [[18.5, 9], [12.5, 7]]) for (let i = 0; i < n; i++) {
      const a = -Math.PI + (i + 0.5) * Math.PI / n, ex = 24 + Math.cos(a) * r, ey = 32 + Math.sin(a) * r;
      P.ell("gold", ex, ey, 2.4, 2.4); P.ell("blue", ex, ey, 1.3, 1.3);
    }
    P.line("tan", 23, 39, 22.5, 45, 1.1); P.line("tan", 25, 39, 25.5, 45, 1.1);
    P.ell("tan", 21, 33, 2.4, 4.5); P.ell("tan", 27, 33, 2.4, 4.5);
    P.ell("blue", 24, 33, 3.5, 6.5); P.line("blue", 24, 28, 24.5, 19, 2.6); P.ell("blue", 24.5, 18, 2.4, 2.2);
    for (const [tx, ty] of [[22, 12], [24.5, 11], [27, 12]]) { P.line("ink", 24.5, 16, tx, ty, 0.7); P.ell("blue", tx, ty, 1, 1); }
    P.poly("tan", [[26.5, 17.5], [29, 18.5], [26.5, 19]]);
    P.outline("ink");
    P.rect("ink", 24, 17, 25, 18);
  }, 48) },
  { tier: 3, name: "mandrill", make: () => picture(["brown", "red", "blue", "sky", "yellow", "ink"], P => {
    P.poly("brown", [[10, 8], [13, 2], [17, 6], [20, 1], [23, 6], [27, 2], [30, 8]]);
    P.ell("brown", 20, 19, 14, 15);
    P.ell("yellow", 7, 26, 2.8, 6.5); P.ell("yellow", 33, 26, 2.8, 6.5);
    P.ell("blue", 13, 24, 4.6, 8.5); P.ell("blue", 27, 24, 4.6, 8.5);
    P.on("sky", "blue", (x, y) => fl(x) % 3 === 0 && y > 17.5 && y < 31);
    P.ell("red", 20, 22, 3.2, 10); P.ell("red", 20, 31.5, 4.4, 2.6);
    P.ell("yellow", 20, 37, 8, 3);
    P.outline("ink");
    P.ell("ink", 15, 14, 1.7, 1.3); P.ell("ink", 25, 14, 1.7, 1.3);
    P.line("ink", 11.5, 11.5, 18, 12.3, 1.1); P.line("ink", 28.5, 11.5, 22, 12.3, 1.1);
    P.rect("ink", 18, 31, 19, 32); P.rect("ink", 21, 31, 22, 32);
    P.line("ink", 16, 34.6, 24, 34.6, 1);
  }, 40) },
  { tier: 3, name: "red-eyed tree frog", make: () => picture(["green", "red", "ink", "blue", "orange", "white", "brown"], P => {
    P.line("brown", 0, 33, 40, 31, 3.5);
    P.rell("green", 9, 27, 6, 3, 0.6); P.rell("green", 31, 27, 6, 3, -0.6);
    P.ell("blue", 20, 25, 10.5, 7.5);
    P.ell("green", 20, 24, 8, 7.5);
    P.rell("blue", 13, 25.5, 1.8, 4.5, 0.3); P.rell("blue", 27, 25.5, 1.8, 4.5, -0.3);
    P.ell("white", 20, 26.5, 5, 4.5);
    P.ell("green", 20, 14, 10.5, 6.5);
    P.ell("red", 11.5, 9.5, 4.5, 4.5); P.ell("red", 28.5, 9.5, 4.5, 4.5);
    P.line("green", 13, 19, 10, 29, 2.4); P.line("green", 27, 19, 30, 29, 2.4);
    for (const [tx, ty] of [[8, 30.5], [11.5, 31], [28.5, 31], [32, 30.5], [3.5, 30.5], [36.5, 30]]) P.ell("orange", tx, ty, 1.6, 1.4);
    P.outline("ink");
    P.ell("ink", 11.5, 9.5, 0.9, 2.8); P.ell("ink", 28.5, 9.5, 0.9, 2.8);
    P.when("ink", (x, y) => Math.abs(x - 20) < 7 && Math.abs(y - (16 + 0.05 * (x - 20) ** 2)) < 0.5);
  }, 40) },
  { tier: 3, name: "chameleon", make: () => picture(["green", "lime", "orange", "brown", "dkgreen", "white", "ink"], P => {
    P.line("brown", 0, 31, 44, 28, 3.2);
    P.rell("dkgreen", 39.5, 23, 4.5, 2, -0.8); P.rell("dkgreen", 42, 26, 3.5, 1.6, -0.3); P.rell("dkgreen", 35, 25.5, 3.2, 1.4, 0.5);
    const tail = [];
    for (let i = 0; i <= 30; i++) { const t = i / 30; tail.push([12.5 - t * 4.5, 23 + t * 8, 3.8 - t * 0.3]); }
    for (let i = 0; i <= 200; i++) { const th = i / 200 * 2.1 * Math.PI, r = 6 - th * 0.62; tail.push([8 + Math.cos(-Math.PI / 2 - th) * r, 37 + Math.sin(-Math.PI / 2 - th) * r, 3.4 - th * 0.12]); }
    P.when("green", (x, y) => tail.some(([px, py, w]) => Math.hypot(x - px, y - py) < w / 2));
    P.line("green", 29, 24, 31, 29.5, 2.6); P.line("green", 16, 24, 14, 30, 2.6);
    P.ell("green", 31.5, 29.5, 2.2, 1.3); P.ell("green", 13.5, 30, 2.2, 1.3);
    P.ell("green", 21, 20.5, 10, 6.5);
    for (let cx = 12.5; cx < 29; cx += 2.6) P.poly("green", [[cx, 15], [cx + 1.3, 12.3], [cx + 2.6, 15]]);
    P.poly("green", [[29, 14.5], [34, 11], [39, 13.5], [41.5, 19.5], [38, 23.5], [30, 24.5]]);
    P.on("lime", "green", (x, y) => x > 11.5 && x < 30 && y > 15 && y < 27 && fl((x - 11) / 3) % 2 === 0);
    P.on("orange", ["green", "lime"], (x, y) => x > 12 && x < 34 && Math.abs(y - 22) < 0.9);
    P.ell("green", 35, 17.5, 3.4, 3.4);
    P.outline("ink");
    P.ell("white", 35, 17.5, 2.2, 2.2); P.rect("ink", 35, 16.5, 37, 18.5);
    P.line("ink", 37, 22, 41, 20.3, 0.9);
  }, 44) },
  { tier: 3, name: "bald eagle", make: () => picture(["white", "grey", "yellow", "brown", "tan", "ink"], P => {
    P.poly("brown", [[4, 44], [8, 30], [16, 25], [28, 25], [36, 32], [40, 44]]);
    P.on("tan", "brown", (x, y) => fl(y) % 3 === 2 && (fl(x) + (fl(y / 3) % 2) * 2) % 4 < 2);
    P.when("white", (x, y) => { const zig = 29 + Math.abs(((x * 0.7) % 2) - 1) * 2.5; return ((x - 20) / 10) ** 2 + ((y - 16) / 9.5) ** 2 <= 1 || (y >= 16 && y < zig && x > 9.5 + (y - 16) * 0.1 && x < 30.5); });
    P.on("grey", "white", (x, y) => (x < 15 && y > 13 && (fl(x) + fl(y)) % 3 === 0) || (y > 24 && (fl(x) + fl(y)) % 3 === 0));
    P.poly("yellow", [[27, 12.5], [36, 14], [40, 18], [39.5, 23], [37, 19.5], [28, 20]]);
    P.poly("yellow", [[28, 20], [36, 20], [34, 22.5], [28, 22.5]]);
    P.ell("yellow", 25, 13.5, 2.2, 2);
    P.outline("ink");
    P.line("ink", 28, 20, 36.5, 20, 0.9);
    P.rect("ink", 25, 13, 26, 15); P.line("ink", 21, 10.8, 28.5, 11.4, 1.2);
  }, 44) },
  { tier: 3, name: "elephant waterhole", make: () => picture(["orange", "yellow", "gold", "grey", "dkgrey", "blue", "brown", "white"], P => {
    P.all("orange"); P.ell("yellow", 36, 12, 6, 6);
    P.rect("gold", 0, 30, 48, 48);
    P.line("brown", 40, 31, 40, 18, 1.6); P.line("brown", 40, 22, 35, 16, 1.2); P.line("brown", 40, 21, 45, 16, 1.2);
    P.ell("brown", 40, 15, 8, 2.4); P.ell("brown", 34, 14.5, 4, 1.6);
    P.ell("blue", 14, 40, 15, 4.5);
    P.when("white", (x, y) => ((y >= 38 && y < 39 && fl(x) % 6 < 3) || (y >= 41 && y < 42 && fl(x + 3) % 7 < 3)) && ((x - 14) / 13) ** 2 + ((y - 40) / 3.5) ** 2 <= 1);
    for (const [lx, lw] of [[20, 3.5], [24.5, 3.5], [30, 3.5], [33.5, 3.5]]) P.rect("grey", lx, 28, lx + lw, 37);
    P.ell("grey", 27, 25, 9, 6.5);
    P.line("grey", 36, 23, 37.5, 31, 0.9);
    P.ell("grey", 17, 22, 5.5, 6);
    P.line("grey", 13, 24, 11, 31, 2.6); P.line("grey", 11, 31, 11.5, 36, 2.2);
    P.ell("grey", 21, 21.5, 4, 5.5);
    P.when("dkgrey", (x, y) => { const d = ((x - 21) / 4) ** 2 + ((y - 21.5) / 5.5) ** 2; return d > 0.68 && d <= 1 && x < 25; });
    P.poly("white", [[14.5, 26], [16, 26], [12, 30.5], [11.5, 29.5]]);
    P.rect("dkgrey", 15, 19, 16, 20);
    for (const lx of [23.5, 33.5]) P.rect("dkgrey", lx, 28.5, lx + 0.9, 37);
  }, 48) },
  { tier: 3, name: "snow leopard", make: () => picture(["sky", "lilac", "white", "grey", "dkgrey"], P => {
    P.all("sky");
    P.poly("lilac", [[0, 24], [8, 10], [14, 16], [22, 6], [30, 14], [36, 9], [44, 18], [44, 36], [0, 36]]);
    P.on("white", "lilac", (x, y) => [[8, 10], [22, 6], [36, 9]].some(([px, py]) => y < py + 4 && Math.abs(x - px) < (y - py) * 0.9 + 0.5));
    P.poly("grey", [[0, 44], [0, 36], [12, 34.5], [26, 35], [36, 36.5], [44, 35], [44, 44]]);
    P.line("dkgrey", 6, 44, 9, 37, 1); P.line("dkgrey", 22, 44, 24, 37.5, 1); P.line("dkgrey", 35, 44, 37, 38.5, 1); P.line("dkgrey", 13, 41, 18, 38.5, 1);
    P.line("white", 12, 31, 5.5, 33, 3.2); P.line("white", 5.5, 33, 3, 28, 3); P.line("white", 3, 28, 5, 24, 2.8);
    P.ell("white", 14, 30, 4, 4.3); P.ell("white", 21, 30, 9, 4);
    P.rect("white", 27, 30, 30, 35); P.ell("white", 29.5, 35, 2.4, 1.2);
    P.ell("white", 32.5, 26, 4.2, 3.6); P.ell("white", 35.5, 27.5, 2.3, 1.9);
    P.ell("white", 30, 22.6, 1.4, 1.4); P.ell("white", 34.5, 22.6, 1.4, 1.4);
    P.on("dkgrey", "white", (x, y) => {
      if (y < 26 || x > 28.5) return false;
      const r = fl(y / 4), cx = fl(x / 5) * 5 + 2.5 + (r % 2) * 2.5, cy = r * 4 + 2, d = Math.hypot(x - cx, y - cy);
      return d > 0.7 && d < 1.45;
    });
    P.on("dkgrey", "white", (x, y) => x < 7 && y < 26);
    P.rect("dkgrey", 31, 25, 32, 26); P.rect("dkgrey", 34, 25, 35, 26); P.rect("dkgrey", 36, 27, 38, 28);
  }, 44) },
  { tier: 3, name: "leopard in a tree", make: () => picture(["sky", "white", "dkgreen", "brown", "gold", "ink", "lime"], P => {
    P.all("sky"); P.ell("white", 9, 5, 6, 2); P.ell("white", 40, 30, 6, 2);
    P.when("lime", (x, y) => y > 40 + Math.sin(x * 0.3) * 0.7);
    P.poly("brown", [[20, 48], [28, 48], [26, 30], [25.5, 20], [23, 20], [22, 30]]);
    P.line("brown", 24, 24, 46, 20, 2.6); P.line("brown", 24, 22, 4, 18, 2.4);
    P.ell("dkgreen", 24, 12, 20, 4.5); P.ell("dkgreen", 10, 14.5, 8, 2.6); P.ell("dkgreen", 39, 14, 9, 3.2);
    P.line("gold", 22, 18, 23, 26, 1.4); P.line("gold", 23, 26, 21.5, 31, 1.4);
    P.line("gold", 9, 18, 8.5, 25, 1.5); P.line("gold", 17, 19, 17, 26, 1.5);
    P.rell("gold", 14, 16.5, 8, 2.6, 0.2);
    P.ell("gold", 5.5, 14.5, 2.9, 2.6);
    P.ell("gold", 4, 12, 1, 1); P.ell("gold", 7.5, 12, 1, 1);
    P.on("ink", "gold", (x, y) => x > 8 && ((fl(x) + fl(y) * 2) % 4 === 0) && fl(y) % 2 === 0);
    P.on("ink", "gold", (x, y) => x > 20 && y > 22 && fl(y) % 2 === 0);
    P.rect("ink", 4, 14, 5, 15); P.rect("ink", 6.5, 14, 7.5, 15); P.rect("ink", 5, 16, 6.5, 17);
  }, 48) },
  { tier: 3, name: "giraffes at sunset", make: () => picture(["purple", "pink", "orange", "yellow", "maroon"], P => {
    P.all("purple"); P.rect("pink", 0, 12, 48, 22); P.rect("orange", 0, 22, 48, 48);
    P.ell("yellow", 28, 30, 10, 10);
    P.when("maroon", (x, y) => y > 37 + Math.sin(x * 0.2));
    P.line("maroon", 42, 38, 42, 25, 1.4); P.line("maroon", 42, 29, 38, 25, 1); P.ell("maroon", 42, 23.5, 6.5, 1.8);
    const giraffe = (bx, by, k) => {
      for (const [lx, lean] of [[-4, -0.6], [-2.5, 0.4], [3, 0.3], [4.5, 1]]) P.line("maroon", bx + lx * k, by, bx + (lx + lean) * k, by + 11 * k, 1.3 * k);
      P.rell("maroon", bx, by, 6 * k, 3 * k, -0.2);
      P.line("maroon", bx + 4.5 * k, by - 1.5 * k, bx + 9 * k, by - 14 * k, 2.2 * k);
      P.rell("maroon", bx + 10.5 * k, by - 14 * k, 2.8 * k, 1.3 * k, 0.4);
      P.line("maroon", bx + 9 * k, by - 15 * k, bx + 8.5 * k, by - 17.5 * k, 0.9 * k);
      P.line("maroon", bx - 5.5 * k, by - 0.5 * k, bx - 7 * k, by + 5 * k, 0.8 * k);
    };
    giraffe(9, 27, 1); giraffe(25, 31.5, 0.68);
  }, 48) },
  { tier: 3, name: "polar bear night", make: () => picture(["navy", "teal", "mint", "white", "sky", "grey"], P => {
    P.all("navy");
    P.when("teal", (x, y) => Math.abs(y - (12 + 4 * Math.sin(x * 0.18))) < 3.4);
    P.when("mint", (x, y) => Math.abs(y - (10.5 + 4 * Math.sin(x * 0.18))) < 1.2);
    for (const [sx, sy] of [[3, 3], [12, 2], [22, 4], [33, 2], [40, 6], [6, 22], [18, 21], [38, 22], [28, 20]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.when("sky", (x, y) => y > 34 + 2 * Math.sin(x * 0.15));
    P.ell("grey", 23, 39.3, 14, 1.3);
    P.rect("grey", 19, 31, 22.5, 38.5); P.rect("grey", 31, 31, 34.5, 38.5);
    P.rect("white", 14, 31, 18, 39); P.rect("white", 27, 31, 31, 39);
    P.ell("white", 24, 29, 11, 6.5); P.ell("white", 17, 26.5, 5, 4.5); P.ell("white", 31, 28, 5, 5.5);
    P.ell("white", 11, 30, 4.5, 3.6); P.ell("white", 7, 31.5, 2.8, 2); P.ell("white", 12.5, 26.5, 1.4, 1.3);
    P.rect("grey", 4, 30.5, 5.5, 32); P.rect("grey", 9, 28.5, 10, 29.5);
    P.on("grey", "white", (x, y) => y >= 38 && (fl(x) === 15 || fl(x) === 28));
  }, 44) },
  { tier: 3, name: "snow monkeys", make: () => picture(["sky", "white", "brown", "teal", "tan", "pink"], P => {
    P.all("sky");
    P.ell("brown", 4, 31, 8, 7); P.ell("brown", 40, 30, 8, 7);
    P.on("white", "brown", (x, y) => y < 27 + Math.sin(x) * 0.6);
    const monkey = (cx, cy, r) => {
      P.ell("tan", cx, cy + r * 1.8, r * 1.5, r * 1.3);
      P.ell("tan", cx, cy, r, r * 0.95); P.ell("tan", cx - r * 0.95, cy, r * 0.35, r * 0.35); P.ell("tan", cx + r * 0.95, cy, r * 0.35, r * 0.35);
      P.ell("pink", cx, cy + r * 0.25, r * 0.62, r * 0.55); P.ell("pink", cx - r * 0.3, cy - r * 0.05, r * 0.32, r * 0.3); P.ell("pink", cx + r * 0.3, cy - r * 0.05, r * 0.32, r * 0.3);
      const ey = fl(cy - r * 0.05);
      P.rect("brown", fl(cx - r * 0.35) - 0.5, ey, fl(cx - r * 0.35) + 1, ey + 1); P.rect("brown", fl(cx + r * 0.35), ey, fl(cx + r * 0.35) + 1.5, ey + 1);
      P.ell("white", cx, cy - r * 0.85, r * 0.75, r * 0.32);
    };
    monkey(15, 21, 6); monkey(29, 24.5, 4.6);
    P.when("teal", (x, y) => y > 30 + Math.sin(x * 0.5) * 0.4);
    P.when("white", (x, y) => y > 30 && ((y >= 33 && y < 34 && fl(x) % 6 < 3) || (y >= 38 && y < 39 && fl(x + 3) % 7 < 3)));
    for (const sx of [10, 22, 34]) P.when("white", (x, y) => y > 3 && y < 11 && Math.abs(x - (sx + Math.sin(y * 0.8) * 1.1)) < 0.55);
    for (const [fx, fy] of [[4, 4], [5, 15], [28, 6], [39, 13], [42, 3], [20, 13], [35, 19]]) P.rect("white", fx, fy, fx + 1, fy + 1);
  }, 44) },
);
