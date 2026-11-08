// Sleep on it / Ants: objects on a transparent background, with ink outlines, at varied sizes.
"use strict";
PICTURES.push(
  { tier: 1, name: "snail", make: () => picture(["tan", "yellow", "orange", "ink"], P => {
    P.poly("tan", [[2, 22], [24, 22], [26, 19], [23, 17], [6, 18]]);
    P.ell("tan", 23.5, 15.5, 2.4, 3); P.line("tan", 22.5, 13, 21, 8, 1); P.line("tan", 24.5, 13, 25.5, 8, 1);
    P.ell("yellow", 12, 13, 8, 8);
    P.when("orange", (x, y) => { const d = Math.hypot(x - 12, y - 13), a = Math.atan2(y - 13, x - 12); return d < 8 && Math.abs(((d - a * 1.1) % 3.4 + 3.4) % 3.4 - 1.7) < 0.6; });
    P.outline("ink");
    P.rect("ink", 23, 15, 24, 16);
  }, 28) },
  { tier: 1, name: "hedgehog", make: () => picture(["brown", "tan", "pink", "ink"], P => {
    const spikes = [[3, 22]];
    for (let i = 0; i <= 10; i++) spikes.push([4 + i * 1.9, i % 2 ? 6 + Math.abs(5 - i) * 0.9 : 9 + Math.abs(5 - i) * 0.9]);
    spikes.push([25, 15], [25, 23], [3, 23]);
    P.poly("brown", spikes);
    P.poly("tan", [[22, 13], [30, 19], [29.5, 21.5], [23, 24], [20, 22]]);
    P.rect("tan", 7, 23, 9, 26); P.rect("tan", 17, 23, 19, 26);
    P.outline("ink");
    P.rect("ink", 29, 19, 31, 21); P.rect("ink", 24, 17, 25, 18); P.rect("pink", 23, 19, 25, 20);
    P.on("ink", "brown", (x, y) => (fl(x) + fl(y)) % 5 === 0 && y < 20);
  }, 32) },
  { tier: 2, name: "fox", make: () => picture(["orange", "white", "dkgrey", "ink"], P => {
    P.poly("orange", [[6, 6], [12, 13], [24, 13], [30, 6], [29, 18], [18, 31], [7, 18]]);
    P.poly("dkgrey", [[8, 9], [11.5, 13], [8.5, 14]]); P.poly("dkgrey", [[28, 9], [24.5, 13], [27.5, 14]]);
    P.poly("white", [[7.5, 19], [14, 21], [18, 30.5]]); P.poly("white", [[28.5, 19], [22, 21], [18, 30.5]]);
    P.outline("ink", true);
    P.ell("ink", 13, 17, 1.4, 1.1); P.ell("ink", 23, 17, 1.4, 1.1); P.ell("ink", 18, 29, 1.8, 1.3);
  }, 36) },
  { tier: 2, name: "teapot", make: () => picture(["teal", "white", "yellow", "ink"], P => {
    P.when("teal", (x, y) => { const d = Math.hypot(x - 18, y - 21); return d > 9.5 && d < 12.5 && x > 27; });   // handle
    P.poly("teal", [[9, 22], [2, 11], [4.5, 10], [12, 18]]);                                                     // spout
    P.ell("teal", 18, 24, 11.5, 9.5); P.rect("teal", 6, 24, 30, 33);
    P.ell("teal", 18, 13.5, 6.5, 2.2); P.ell("yellow", 18, 9.5, 2, 2);
    P.on("yellow", "teal", (x, y) => y > 22 && y < 24.5);
    P.rell("white", 11, 20, 1.2, 3, 0.6);
    P.rect("teal", 9, 33, 27, 35);
    P.outline("ink", true);
  }, 40) },
  { tier: 2, name: "whale", make: () => picture(["blue", "sky", "white", "ink"], P => {
    P.poly("blue", [[2, 22], [6, 13], [16, 10], [27, 13], [33, 18], [37, 10], [39, 11], [37.5, 19], [39, 26], [37, 27], [33, 21], [26, 28], [10, 29]]);
    P.poly("sky", [[3, 23], [10, 28.6], [26, 27.6], [31, 23], [18, 25]]);
    P.on("blue", "sky", (x, y) => fl(y) % 2 === 0 && x > 8 && x < 28);
    P.line("white", 12, 9, 12, 5, 1.2); P.line("white", 12, 6, 9, 2.5, 1); P.line("white", 12, 6, 15, 2.5, 1);
    P.poly("blue", [[15, 25], [20, 26], [17, 31]]);
    P.outline("ink");
    P.rect("ink", 8, 18, 10, 20);
  }, 40) },
  { tier: 2, name: "paper lantern", make: () => picture(["red", "yellow", "brown", "ink"], P => {
    P.line("ink", 18, 0, 18, 5, 1);
    P.rect("brown", 12, 5, 24, 8); P.rect("brown", 12, 27, 24, 30);
    P.ell("red", 18, 17.5, 12, 10.5);
    P.on("yellow", "red", (x, y) => Math.abs(x - 18) < 4 && y > 11 && y < 24);
    P.outline("ink", true);
    P.on("ink", ["red", "yellow"], (x, y) => fl(y) % 4 === 1);
    P.line("yellow", 18, 30, 18, 35, 1.2); P.ell("yellow", 18, 35, 1.4, 1);
  }, 36) },
  { tier: 3, name: "bicycle", make: () => picture(["grey", "red", "tan", "ink"], P => {
    for (const cx of [11, 33]) {
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 6; P.line("grey", cx - Math.cos(a) * 7.5, 30 - Math.sin(a) * 7.5, cx + Math.cos(a) * 7.5, 30 + Math.sin(a) * 7.5, 0.8); }
      P.when("ink", (x, y) => { const d = Math.hypot(x - cx, y - 30); return d > 7.6 && d < 10; });
      P.ell("ink", cx, 30, 1.3, 1.3);
    }
    P.line("red", 11, 30, 20, 30, 1.6); P.line("red", 20, 30, 16, 18, 1.6); P.line("red", 16, 18, 29, 18, 1.6);
    P.line("red", 29, 18, 20, 30, 1.6); P.line("red", 11, 30, 16, 18, 1.6); P.line("red", 29, 18, 33, 30, 1.6);
    P.line("ink", 15.5, 18, 15, 14, 1.2); P.ell("tan", 15, 13, 3.5, 1.4);
    P.line("ink", 29, 18, 28, 12, 1.2); P.line("ink", 28, 12, 32, 11, 1.4);
    P.ell("grey", 20, 30, 2.2, 2.2);
  }, 44) },
  { tier: 3, name: "fishbowl", make: () => picture(["sky", "blue", "orange", "green", "tan", "white", "ink"], P => {
    P.ell("sky", 24, 26, 19, 17); P.rect("none", 0, 0, 48, 13);
    P.when("blue", (x, y) => ((x - 24) / 19) ** 2 + ((y - 26) / 17) ** 2 <= 1 && y > 16);
    P.when("tan", (x, y) => ((x - 24) / 19) ** 2 + ((y - 26) / 17) ** 2 <= 1 && y > 37 + Math.sin(x * 0.7) * 0.8);
    P.line("green", 12, 38, 11, 26, 1.4); P.line("green", 11.5, 32, 8, 28, 1.2); P.line("green", 34, 38, 36, 28, 1.4);
    P.ell("orange", 25, 26, 6, 3.6); P.poly("orange", [[30, 26], [35.5, 22], [35.5, 30]]); P.poly("orange", [[23, 23], [26, 19.5], [27, 23]]);
    P.rect("ink", 21, 25, 22, 26);
    for (const [bx, by] of [[19, 20], [18, 17], [20, 14.5]]) P.ell("white", bx, by, 0.9, 0.9);
    P.rell("white", 11, 20, 1, 4, 0.5);
    P.outline("ink");
    P.rect("ink", 10, 12, 38, 14);
  }, 48) },
);
