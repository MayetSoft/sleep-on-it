// Sleep on it / Ants: farm and woodland animals, as objects with ink outlines or in little scenes.
"use strict";
PICTURES.push(
  // ----- simple -----
  { tier: 1, name: "chick", make: () => picture(["yellow", "gold", "orange", "ink"], P => {
    P.ell("yellow", 11, 15, 7.5, 6.5); P.ell("yellow", 14, 8.5, 5, 4.6);
    P.poly("orange", [[17, 6.5], [23, 8.5], [17, 10.5]]);
    P.rell("gold", 9, 15.5, 4, 2.6, 0.3);
    P.outline("ink", true);
    P.rect("ink", 15, 7, 16, 8);
    P.rect("orange", 8, 21, 9, 23); P.rect("orange", 13, 21, 14, 23); P.rect("orange", 6, 23, 10, 24); P.rect("orange", 12, 23, 16, 24);
  }, 24) },
  { tier: 1, name: "pig face", make: () => picture(["pink", "peach", "maroon", "ink"], P => {
    P.poly("pink", [[4, 3.5], [12.5, 7.5], [7.5, 14]]); P.poly("pink", [[24, 3.5], [15.5, 7.5], [20.5, 14]]);
    P.ell("pink", 14, 16, 10.5, 9.5);
    P.ell("peach", 14, 19, 5.5, 3.8);
    P.outline("ink", true);
    P.rect("maroon", 11, 18, 13, 20); P.rect("maroon", 15, 18, 17, 20);
    P.poly("maroon", [[5, 5.5], [9.5, 7.8], [7, 11]]); P.poly("maroon", [[23, 5.5], [18.5, 7.8], [21, 11]]);
    P.rect("ink", 9, 12, 10, 14); P.rect("ink", 18, 12, 19, 14);
  }, 28) },
  { tier: 1, name: "eggs in nest", make: () => picture(["white", "sky", "tan", "brown", "ink"], P => {
    P.ell("white", 6.5, 12, 3.8, 5); P.ell("sky", 14, 10, 3.8, 5); P.ell("white", 21.5, 12, 3.8, 5);
    P.when("tan", (x, y) => y > 15 && ((x - 14) / 13.5) ** 2 + ((y - 15) / 9.5) ** 2 <= 1);
    P.ell("tan", 14, 16, 13.5, 2.8);
    P.outline("ink", true);
    P.on("brown", "tan", (x, y) => Math.abs(((y + Math.sin(x * 0.8) * 1.2) % 3.2) - 1.6) < 0.5 && y > 17);
  }, 28) },
  { tier: 1, name: "frog face", make: () => picture(["green", "lime", "white", "pink", "ink"], P => {
    P.ell("green", 8, 9, 5, 5); P.ell("green", 20, 9, 5, 5);
    P.ell("green", 14, 16.5, 12.5, 8.5);
    P.ell("white", 8, 8.5, 3.4, 3.4); P.ell("white", 20, 8.5, 3.4, 3.4);
    P.on("lime", "green", (x, y) => y > 17 && Math.hypot(x - 14, y - 10) > 9);
    P.ell("pink", 5.5, 17, 2.6, 1.8); P.ell("pink", 22.5, 17, 2.6, 1.8);
    P.outline("ink", true);
    P.rect("ink", 7, 8, 9, 10); P.rect("ink", 19, 8, 21, 10);
    P.when("ink", (x, y) => Math.abs(Math.hypot(x - 14, y - 10) - 8.5) < 0.6 && y > 16);
  }, 28) },
  { tier: 1, name: "mouse", make: () => picture(["grey", "white", "pink", "ink"], P => {
    P.ell("grey", 12, 18, 8.5, 6); P.ell("grey", 20, 15.5, 5, 4.2); P.poly("grey", [[21, 12.5], [27.5, 17], [21, 19.5]]);
    P.ell("grey", 17.5, 10, 3.8, 3.8); P.ell("pink", 17.5, 10, 2.2, 2.2);
    P.ell("white", 12, 20, 6, 2.6);
    P.outline("ink", true);
    P.rect("ink", 21, 14, 22, 15); P.rect("pink", 26, 16, 28, 18);
    P.when("pink", (x, y) => x > 1 && x < 5 && Math.abs(y - (19 + Math.sin(x * 0.9) * 2.2)) < 0.6);
    P.when("pink", (x, y) => x > 1 && x < 4 && Math.abs(y - (19 + Math.sin(x * 0.9) * 2.2)) < 1);
    P.rect("pink", 9, 24, 11, 25); P.rect("pink", 15, 24, 17, 25);
  }, 28) },
  { tier: 1, name: "bunny face", make: () => picture(["grey", "white", "pink", "ink"], P => {
    P.ell("grey", 9, 7.5, 3.2, 7.5); P.ell("grey", 19, 7.5, 3.2, 7.5);
    P.ell("pink", 9, 8, 1.6, 5.5); P.ell("pink", 19, 8, 1.6, 5.5);
    P.ell("grey", 14, 18.5, 10, 8);
    P.ell("white", 11.5, 21.5, 3.5, 3); P.ell("white", 16.5, 21.5, 3.5, 3);
    P.outline("ink", true);
    P.rect("ink", 8, 15, 10, 17); P.rect("ink", 18, 15, 20, 17);
    P.poly("pink", [[12, 18.5], [16, 18.5], [14, 21]]);
  }, 28) },
  { tier: 1, name: "cow face", make: () => picture(["white", "brown", "pink", "tan", "ink"], P => {
    P.rell("tan", 6, 6.5, 4.5, 1.8, -0.6); P.rell("tan", 26, 6.5, 4.5, 1.8, 0.6);
    P.rell("brown", 5, 13, 4.5, 2.4, 0.3); P.rell("brown", 27, 13, 4.5, 2.4, -0.3);
    P.ell("white", 16, 15, 8.5, 9.5);
    P.on("brown", "white", (x, y) => ((x - 11) / 4.5) ** 2 + ((y - 12) / 5) ** 2 <= 1 || ((x - 16) / 4) ** 2 + ((y - 5) / 2.5) ** 2 <= 1);
    P.ell("pink", 16, 23.5, 7.5, 5);
    P.outline("ink", true);
    P.rect("ink", 11, 12, 13, 14); P.rect("ink", 19, 12, 21, 14);
    P.rect("ink", 12, 23, 14, 25); P.rect("ink", 18, 23, 20, 25);
  }, 32) },
  { tier: 1, name: "lamb", make: () => picture(["white", "tan", "green", "ink"], P => {
    P.ell("green", 14, 26, 13, 2.6);
    for (const lx of [7, 11, 16, 20]) P.rect("tan", lx, 18, lx + 3, 26);
    for (const [cx, cy, r] of [[9, 15, 4], [14, 13, 4.5], [19, 15, 4], [11.5, 18, 4.2], [17, 18, 4.2], [5.5, 14.5, 2]]) P.ell("white", cx, cy, r, r * 0.9);
    P.rell("tan", 19.5, 9.5, 3, 1.4, 0.4);
    P.ell("tan", 23.5, 11.5, 4, 3.6); P.ell("white", 22.5, 8.2, 2.8, 1.8);
    P.outline("ink", true);
    P.rect("ink", 24, 11, 25, 12);
  }, 28) },
  { tier: 1, name: "blue tit", make: () => picture(["yellow", "blue", "white", "ink"], P => {
    P.poly("blue", [[19, 17], [27, 21], [26, 24], [18, 20]]);
    P.ell("yellow", 14, 17, 7.5, 6);
    P.rell("blue", 17, 15.5, 5.5, 3.4, 0.35);
    P.ell("white", 9, 10, 5, 4.5); P.on("blue", "white", (x, y) => y < 8.5);
    P.poly("white", [[4.5, 9], [1.5, 10.5], [4.5, 11.5]]);
    P.outline("ink", true);
    P.line("ink", 4.5, 10, 12, 10, 1); P.rect("ink", 2, 10, 4, 11);
    P.rect("ink", 12, 23, 13, 26); P.rect("ink", 15, 23, 16, 26);
  }, 28) },
  { tier: 1, name: "goose", make: () => picture(["white", "grey", "orange", "ink"], P => {
    P.poly("white", [[26, 17], [31, 14], [30, 22]]);
    P.ell("white", 19, 20, 9.5, 6);
    P.line("white", 12, 18, 9, 7, 4.6); P.ell("white", 9, 7, 3.8, 3.2);
    P.poly("orange", [[6, 5.5], [1, 8.5], [6, 10]]);
    P.rell("grey", 21, 18.5, 6.5, 3.2, 0.15);
    P.outline("ink", true);
    P.rect("ink", 8, 6, 9, 7);
    P.rect("orange", 17, 26, 18, 29); P.rect("orange", 22, 26, 23, 29); P.rect("orange", 15, 29, 19, 30); P.rect("orange", 20, 29, 24, 30);
  }, 32) },
  { tier: 1, name: "brown hen", make: () => picture(["brown", "tan", "red", "gold", "ink"], P => {
    P.poly("brown", [[23, 15], [29, 6], [31.5, 17], [26, 23]]);
    P.ell("brown", 17, 19.5, 10, 7.5);
    P.line("brown", 9.5, 12, 13, 17, 6); P.ell("brown", 9, 10.5, 4.6, 4.6);
    P.ell("red", 7.5, 5.5, 2.4, 2.2); P.ell("red", 10.5, 5, 2.4, 2.2); P.ell("red", 6, 15.5, 1.8, 2.4);
    P.poly("gold", [[5, 9], [1, 11], [5, 13]]);
    P.rell("tan", 18.5, 18.5, 6.5, 3.8, 0.2);
    P.outline("ink", true);
    P.rect("ink", 8, 9, 9, 10);
    P.rect("gold", 14, 27, 15, 30); P.rect("gold", 19, 27, 20, 30); P.rect("gold", 12, 30, 16, 31); P.rect("gold", 17, 30, 21, 31);
  }, 32) },
  { tier: 1, name: "sheep in field", make: () => picture(["sky", "green", "white", "dkgrey"], P => {
    P.all("sky"); P.rect("green", 0, 23, 32, 32);
    P.ell("white", 7, 5.5, 4.5, 2); P.ell("white", 11, 4.5, 3.5, 1.8);
    for (const lx of [9, 12.5, 18, 21.5]) P.rect("dkgrey", lx, 19.5, lx + 2.3, 27.5);
    for (const [cx, cy, r] of [[10.3, 16, 4.6], [16, 14.3, 5.1], [21.1, 16, 4.6], [14.9, 18.9, 6.3]]) P.ell("white", cx, cy, r, r * 0.85);
    P.rell("dkgrey", 22.9, 10.9, 2.7, 1.3, 0.4); P.ell("dkgrey", 25.7, 13.7, 3.4, 4.1);
    P.rect("white", 26, 13, 27, 14);
  }, 32) },
  { tier: 1, name: "duckling", make: () => picture(["sky", "blue", "yellow", "orange"], P => {
    P.all("sky"); P.ell("orange", 5.3, 5.3, 3.5, 3.5);
    P.rect("blue", 0, 20, 32, 32);
    P.on("sky", "blue", (x, y) => (fl(y) === 24 || fl(y) === 28) && (fl(x) + fl(y) * 2) % 9 < 4);
    P.when("yellow", (x, y) => ((x - 14.7) / 8) ** 2 + ((y - 18.7) / 4.8) ** 2 <= 1 && y < 21.3);
    P.poly("yellow", [[8, 18.7], [4.7, 14], [10.7, 16.7]]);
    P.ell("yellow", 20, 12.7, 4.4, 4.4);
    P.poly("orange", [[23.3, 12], [28.7, 13.3], [23.3, 15.3]]);
    P.rect("blue", 20, 11, 21, 12);
  }, 32) },
  { tier: 1, name: "piglet in mud", make: () => picture(["sky", "green", "brown", "pink", "maroon"], P => {
    P.all("sky"); P.rect("green", 0, 19.5, 32, 32);
    P.when("maroon", (x, y) => { const d = Math.hypot(x - 5.1, y - 14.9); return d > 1.1 && d < 2.5 && !(x > 5.1 && y > 14.9); });
    P.ell("pink", 13.7, 19.4, 8.6, 6.3); P.ell("pink", 22.9, 16, 5.7, 5.1);
    P.poly("pink", [[19.4, 12.6], [20, 6.9], [24, 11.4]]); P.poly("pink", [[24, 12], [26.9, 7.4], [27.4, 13.7]]);
    P.ell("pink", 28, 17.7, 2.7, 3);
    P.rect("maroon", 23, 14, 24, 16); P.rect("maroon", 27, 16, 28, 18); P.rect("maroon", 28, 16, 29, 17);
    P.line("maroon", 24.6, 21.1, 26.9, 21.1, 1);
    P.when("brown", (x, y) => y > 22.3 + Math.sin(x * 0.79) * 0.9 && ((x - 16) / 15.4) ** 2 + ((y - 26.3) / 6.3) ** 2 <= 1);
    P.ell("brown", 9.1, 21.7, 1.8, 1.4); P.ell("brown", 2.9, 21.1, 1.1, 1.1); P.ell("brown", 30.3, 21.7, 1.4, 1.1);
  }, 32) },
  { tier: 1, name: "frog on lily pad", make: () => picture(["blue", "dkgreen", "green", "white", "pink"], P => {
    P.all("blue");
    P.ell("dkgreen", 14.9, 22.9, 12.6, 5.7); P.poly("blue", [[14.9, 22.9], [29.7, 20], [29.7, 25.7]]);
    P.ell("dkgreen", 26.9, 10.9, 4.6, 1.8);
    P.ell("pink", 26.9, 8, 3, 2.3); P.ell("pink", 24.6, 7.4, 1.6, 2.5); P.ell("pink", 29.1, 7.4, 1.6, 2.5); P.ell("white", 26.9, 7.4, 1, 1.4);
    P.ell("green", 6.9, 21.1, 3.4, 2.3); P.ell("green", 19.4, 21.1, 3.4, 2.3);
    P.ell("green", 13.1, 17.7, 6.9, 5.1);
    P.ell("green", 9.7, 12, 3.1, 3.1); P.ell("green", 16.6, 12, 3.1, 3.1);
    P.ell("white", 9.7, 12, 1.8, 1.8); P.ell("white", 16.6, 12, 1.8, 1.8);
    P.rect("dkgreen", 9, 11, 10, 13); P.rect("dkgreen", 16, 11, 17, 13);
    P.rect("dkgreen", 10, 17, 16, 18);
  }, 32) },
  { tier: 1, name: "bat", make: () => picture(["navy", "yellow", "white", "dkgreen", "dkgrey"], P => {
    P.all("navy"); P.ell("yellow", 16, 14.9, 10.9, 10.9);
    for (const [sx, sy] of [[3, 5], [28, 4], [3, 18], [28, 17]]) { P.rect("white", sx - 1, sy, sx + 2, sy + 1); P.rect("white", sx, sy - 1, sx + 1, sy + 2); }
    for (const [sx, sy] of [[10, 1], [22, 1], [1, 11], [30, 10]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.when("dkgreen", (x, y) => y > 26.3 + Math.sin(x * 0.61) * 1.7 + Math.sin(x * 1.66) * 1.1);
    for (const s of [1, -1]) P.poly("dkgrey", [[16 + s * 1.1, 12.6], [16 + s * 6.9, 9.1], [16 + s * 12.6, 10.9], [16 + s * 10.9, 13.7], [16 + s * 9.1, 16.6], [16 + s * 6.9, 15.4], [16 + s * 4.6, 17.7], [16 + s * 1.1, 16]]);
    P.ell("dkgrey", 16, 14.9, 2.3, 4); P.ell("dkgrey", 16, 10.9, 2.3, 2.3);
    P.poly("dkgrey", [[14.3, 10.3], [14.3, 6.9], [16, 9.1]]); P.poly("dkgrey", [[17.7, 10.3], [17.7, 6.9], [16, 9.1]]);
  }, 32) },
  { tier: 1, name: "mole", make: () => picture(["sky", "green", "brown", "dkgrey", "pink"], P => {
    P.all("sky"); P.rect("green", 0, 24, 32, 32);
    for (const gx of [2.3, 6.9, 25.1, 29.7]) P.poly("green", [[gx - 1.4, 24.6], [gx, 21.1], [gx + 1.4, 24.6]]);
    P.ell("dkgrey", 16, 16.6, 6.3, 5.7);
    P.ell("brown", 16, 30.9, 13.7, 10.9);
    P.ell("pink", 9.7, 20, 3, 1.8); P.ell("pink", 22.3, 20, 3, 1.8);
    P.ell("pink", 16, 18.9, 2.1, 1.7);
    P.on("dkgrey", "brown", (x, y) => (fl(x) * 3 + fl(y) * 5) % 11 === 0 && y > 22.9);
  }, 32) },
  { tier: 1, name: "swallow", make: () => picture(["sky", "white", "navy", "red"], P => {
    P.all("sky"); P.ell("white", 6.9, 26.3, 5.7, 2.3); P.ell("white", 11.4, 25.1, 4, 2.3); P.ell("white", 26.3, 5.7, 4.6, 1.8);
    P.poly("navy", [[21.7, 14.3], [30.9, 10.3], [25.7, 15.4], [30.9, 20.6], [21.7, 17.1]]);
    P.poly("navy", [[12.6, 13.7], [20.6, 4], [24.6, 4.6], [18.3, 14.3]]);
    P.poly("navy", [[13.7, 16], [17.1, 25.1], [20, 24.6], [18.3, 16]]);
    P.rell("navy", 16, 15.2, 6.9, 3, 0.1); P.ell("navy", 9.1, 14.3, 3.4, 3);
    P.poly("navy", [[6.3, 13.1], [2.9, 14.3], [6.3, 15.4]]);
    P.rell("white", 16.6, 16.7, 5.1, 1.4, 0.1);
    P.ell("red", 7.2, 16, 2.3, 1.7); P.ell("red", 7, 12.6, 1.3, 1);
    P.rect("white", 8, 13, 9, 14);
  }, 32) },
  // ----- medium -----
  { tier: 2, name: "horse head", make: () => picture(["brown", "white", "tan", "ink"], P => {
    P.poly("ink", [[22, 5], [27, 6], [33, 13], [36, 30], [36, 36], [31, 36], [29, 17]]);
    P.poly("brown", [[17, 8], [19.5, 1.5], [23, 7], [26, 9], [31, 16], [34, 36], [17, 36], [18, 28], [13, 30], [7, 30], [3.5, 26], [4.5, 21], [12.5, 11]]);
    P.poly("white", [[16.5, 9], [19.5, 10.5], [11, 24], [8.5, 23.5]]);
    P.ell("tan", 7.5, 26, 4.5, 4);
    P.outline("ink", true);
    P.rect("ink", 15, 13, 17, 15); P.rect("ink", 5, 24, 7, 26); P.line("ink", 5, 28.5, 10, 28.5, 1);
    P.when("ink", (x, y) => Math.abs(Math.hypot(x - 22, y - 26) - 5) < 0.6 && x < 22 && y < 29);
  }, 36) },
  { tier: 2, name: "goat", make: () => picture(["white", "tan", "pink", "grey", "ink"], P => {
    P.line("tan", 14, 10, 9.5, 2, 3.6); P.line("tan", 22, 10, 26.5, 2, 3.6);
    P.rell("white", 6, 13.5, 5.5, 2.4, 0.3); P.rell("white", 30, 13.5, 5.5, 2.4, -0.3);
    P.rell("pink", 6, 13.5, 3.5, 1, 0.3); P.rell("pink", 30, 13.5, 3.5, 1, -0.3);
    P.poly("grey", [[12.5, 27], [23.5, 27], [18, 36]]);
    P.poly("white", [[11, 9], [25, 9], [27.5, 16], [23, 30], [13, 30], [8.5, 16]]); P.ell("white", 18, 11, 7, 4);
    P.ell("pink", 18, 27, 4.5, 3.2);
    P.outline("ink", true);
    P.rect("ink", 12, 16, 15, 18); P.rect("ink", 21, 16, 24, 18);
    P.rect("ink", 16, 27, 17, 28); P.rect("ink", 19, 27, 20, 28);
  }, 36) },
  { tier: 2, name: "donkey", make: () => picture(["grey", "white", "pink", "ink"], P => {
    P.rell("grey", 10, 8.5, 3.6, 8.5, -0.3); P.rell("grey", 26, 8.5, 3.6, 8.5, 0.3);
    P.rell("pink", 10.3, 9.5, 1.6, 5.5, -0.3); P.rell("pink", 25.7, 9.5, 1.6, 5.5, 0.3);
    P.ell("grey", 18, 16, 8.5, 7.5); P.ell("grey", 18, 25, 6.8, 8);
    P.ell("white", 18, 29.5, 6.2, 4.5);
    P.ell("white", 13, 16, 2.6, 2.4); P.ell("white", 23, 16, 2.6, 2.4);
    P.outline("ink", true);
    P.poly("ink", [[15, 9.5], [16.5, 6], [18, 9], [19.5, 6], [21, 9.5]]);
    P.on("ink", "grey", (x, y) => y < 3.5);
    P.rect("ink", 12, 15, 14, 17); P.rect("ink", 22, 15, 24, 17);
    P.rect("ink", 15, 29, 16, 31); P.rect("ink", 20, 29, 21, 31);
  }, 36) },
  { tier: 2, name: "squirrel", make: () => picture(["orange", "white", "brown", "tan", "ink"], P => {
    P.rell("orange", 26, 17, 7, 12.5, 0.15); P.ell("orange", 22.5, 6, 5.5, 4.5);
    P.ell("orange", 16, 24, 7, 8); P.ell("orange", 18, 32, 5, 2.4);
    P.ell("orange", 11.5, 13.5, 5.5, 5); P.poly("orange", [[10, 10], [12.5, 2.5], [15.5, 9]]);
    P.poly("orange", [[7, 12], [3, 15.5], [7.5, 17]]);
    P.ell("white", 12.5, 24, 3.6, 6);
    P.ell("tan", 8, 24, 3.2, 3.6); P.ell("brown", 8, 20.5, 4, 2.2);
    P.outline("ink", true);
    P.rect("ink", 10, 12, 12, 14); P.rect("ink", 3, 15, 5, 16);
    P.when("ink", (x, y) => Math.abs(Math.hypot(x - 25, y - 18) - 7) < 0.55 && x > 25 && y < 22);
    P.rect("brown", 7, 17, 9, 18);
  }, 36) },
  { tier: 2, name: "bear with honey", make: () => picture(["brown", "tan", "gold", "yellow", "ink"], P => {
    P.ell("brown", 10.5, 6.5, 4, 4); P.ell("brown", 29.5, 6.5, 4, 4);
    P.ell("tan", 10.5, 6.5, 2, 2); P.ell("tan", 29.5, 6.5, 2, 2);
    P.ell("brown", 10.5, 37, 6, 3); P.ell("brown", 29.5, 37, 6, 3);
    P.ell("brown", 20, 28, 11.5, 10.5);
    P.ell("brown", 20, 13, 10, 8.5);
    P.ell("tan", 20, 16.5, 5, 3.8);
    P.ell("tan", 10.5, 37.5, 3.6, 1.8); P.ell("tan", 29.5, 37.5, 3.6, 1.8);
    P.poly("gold", [[13, 26], [27, 26], [28.5, 32], [26, 37], [14, 37], [11.5, 32]]); P.rect("gold", 13, 23, 27, 26.5);
    P.ell("yellow", 20, 23.5, 5.5, 1.6); P.rect("yellow", 16, 23, 18, 28.5); P.rect("yellow", 22, 23, 24, 27);
    P.ell("brown", 10, 29, 3.2, 3.6); P.ell("brown", 30, 29, 3.2, 3.6);
    P.outline("ink", true);
    P.rect("ink", 15, 11, 17, 13); P.rect("ink", 23, 11, 25, 13);
    P.ell("ink", 20, 15, 1.8, 1.2); P.rect("ink", 19.5, 16, 20.5, 18);
    P.on("yellow", "gold", (x, y) => y > 30 && y < 33 && x > 14 && x < 26);
  }, 40) },
  { tier: 2, name: "badger", make: () => picture(["white", "grey", "brown", "ink"], P => {
    P.ell("brown", 18, 37, 19, 9);
    P.ell("ink", 18, 33, 10, 4.5);
    P.ell("grey", 18, 28, 11, 6);
    P.ell("white", 7.5, 12, 3, 2.6); P.ell("white", 28.5, 12, 3, 2.6);
    P.ell("white", 18, 15, 10.5, 9); P.poly("white", [[9, 18], [27, 18], [21, 29], [15, 29]]);
    P.outline("ink", true);
    P.on("ink", "white", (x, y) => { const l = Math.abs((x - 15.8) - (y - 27) * (-5.5 / -21)), r = Math.abs((x - 20.2) - (y - 27) * (5.5 / -21)); return y < 28 && (l < 2.2 || r < 2.2); });
    P.rect("white", 12, 14, 13, 15); P.rect("white", 23, 14, 24, 15);
    P.ell("ink", 18, 28, 2.2, 1.6);
  }, 36) },
  { tier: 2, name: "fawn", make: () => picture(["tan", "brown", "white", "ink"], P => {
    for (const lx of [12, 16, 26, 30]) P.rect("tan", lx - 1.5, 22, lx + 1.5, 37);
    P.poly("tan", [[32, 16], [36, 12], [35, 18]]);
    P.ell("tan", 22, 20, 11, 6.5);
    P.poly("tan", [[11, 20], [14, 9], [18.5, 10], [19, 21]]);
    P.ell("tan", 13, 9, 5, 4); P.poly("tan", [[10, 7], [4, 11], [5, 13], [11, 12.5]]);
    P.rell("tan", 17, 4, 4, 1.8, -0.7); P.rell("tan", 13.5, 3.5, 3.6, 1.6, -1.2);
    P.on("brown", "tan", (x, y) => y < 17.5 && x > 15 && x < 33);
    P.outline("ink", true);
    for (const [sx, sy] of [[19, 15.5], [23, 14.5], [27, 15.5], [21, 18.5], [25, 18.5], [29, 18.5], [17, 18]]) P.ell("white", sx, sy, 1.2, 1.2);
    P.rect("ink", 12, 8, 14, 10); P.rect("ink", 4, 11, 6, 12);
    for (const lx of [12, 16, 26, 30]) P.rect("brown", lx - 1, 36, lx + 1, 37);
  }, 40) },
  { tier: 2, name: "rooster", make: () => picture(["orange", "gold", "red", "dkgreen", "yellow", "ink"], P => {
    P.poly("dkgreen", [[25, 20], [27, 6], [33, 2], [38.5, 8], [39.5, 20], [36, 29], [29, 28]]);
    for (const lx of [17, 23]) P.rect("yellow", lx - 1.5, 29, lx + 1.5, 36);
    P.ell("orange", 21, 24, 10.5, 7.5);
    P.poly("gold", [[9, 12], [15, 8], [19, 13], [21, 21], [12, 24]]);
    P.ell("orange", 12, 10, 4.8, 4.8);
    P.ell("red", 9.5, 4.5, 2.4, 2.2); P.ell("red", 12.5, 3.8, 2.4, 2.2); P.ell("red", 15.5, 4.8, 2.2, 2);
    P.ell("red", 9, 16.5, 2.2, 2.8); P.ell("red", 10.5, 10.5, 2.4, 2.4);
    P.poly("yellow", [[8, 8.5], [3, 10.5], [8, 12.5]]);
    P.rell("gold", 22, 23.5, 7, 4, 0.25);
    P.outline("ink", true);
    P.rect("ink", 10, 10, 11, 11);
    P.when("ink", (x, y) => { const d = Math.hypot(x - 26, y - 22); return x > 28 && y < 26 && (Math.abs(d - 8.5) < 0.55 || Math.abs(d - 12) < 0.55); });
    P.rect("yellow", 13, 36, 18, 37); P.rect("yellow", 19, 36, 24, 37);
  }, 40) },
  { tier: 2, name: "stag head", make: () => picture(["brown", "tan", "white", "ink"], P => {
    for (const s of [-1, 1]) {
      const X = v => 20 + s * v;
      P.line("tan", X(4), 13, X(10), 7, 3.4); P.line("tan", X(10), 7, X(16), 4, 3.2); P.line("tan", X(16), 4, X(19), 0, 3);
      P.line("tan", X(10), 7, X(9), 0.5, 3); P.line("tan", X(14), 5, X(14.5), 0, 2.8);
      P.rell("brown", X(11), 15, 5, 2.4, s * 0.35);
      P.rell("white", X(11), 15, 3, 1, s * 0.35);
    }
    P.ell("brown", 20, 17, 7.5, 6.5);
    P.poly("brown", [[12.8, 18], [27.2, 18], [24, 35], [16, 35]]);
    P.ell("white", 20, 32, 4, 3);
    P.outline("ink", true);
    P.rect("ink", 15, 18, 17, 20); P.rect("ink", 23, 18, 25, 20);
    P.ell("ink", 20, 34, 3, 1.8);
  }, 40) },
  { tier: 2, name: "turkey", make: () => picture(["maroon", "orange", "tan", "brown", "red", "gold", "ink"], P => {
    P.when("tan", (x, y) => y < 27 && Math.hypot(x - 20, y - 25) < 19);
    P.when("orange", (x, y) => y < 27 && Math.hypot(x - 20, y - 25) < 15);
    P.when("maroon", (x, y) => y < 27 && Math.hypot(x - 20, y - 25) < 11.5);
    for (const lx of [17, 23]) P.rect("gold", lx - 1.5, 31, lx + 1.5, 38);
    P.ell("brown", 20, 26, 7.5, 8.5);
    P.ell("red", 20, 13, 3.2, 3.4); P.rect("red", 18.5, 13, 21.5, 19);
    P.ell("red", 18, 18, 1.8, 2.8);
    P.poly("gold", [[21, 12], [25.5, 13.5], [21, 15]]);
    P.outline("ink", true);
    P.when("ink", (x, y) => { const r = Math.hypot(x - 20, y - 25); if (y > 22 || r < 8 || r > 18) return false; const a = Math.atan2(y - 25, x - 20) + Math.PI; return Math.abs(((a / (Math.PI / 7)) % 1) - 0.5) > 0.42; });
    P.rect("ink", 19, 12, 20, 13);
    P.rect("gold", 14, 38, 19, 39); P.rect("gold", 21, 38, 26, 39);
  }, 40) },
  { tier: 2, name: "wild boar", make: () => picture(["brown", "tan", "white", "ink"], P => {
    for (const lx of [10, 15, 27, 32]) P.rect("brown", lx - 1.5, 26, lx + 1.5, 36);
    const back = [[37, 26], [37, 18]];
    for (let i = 0; i <= 12; i++) back.push([36 - i * 2, (i % 2 ? 10 : 12) + Math.abs(i - 7) * 0.25]);
    back.push([10, 13], [3, 23], [2.5, 27], [8, 29], [14, 31], [24, 31], [32, 30]);
    P.poly("brown", back);
    P.poly("brown", [[11, 13], [12.5, 6.5], [16, 12]]);
    P.ell("tan", 4, 25, 3.2, 4);
    P.poly("white", [[7, 27.5], [8, 19.5], [10.5, 20.5], [10, 28]]);
    P.outline("ink", true);
    P.rect("ink", 10, 17, 12, 19); P.rect("ink", 3, 24, 4, 26);
    P.on("ink", "brown", (x, y) => y < 17 && x > 13 && (fl(x) + fl(y)) % 4 === 0);
    P.when("ink", (x, y) => x > 37 && x < 40 && Math.abs(y - (20 + Math.sin(x * 2) * 1)) < 0.6);
  }, 40) },
  { tier: 2, name: "cow in field", make: () => picture(["sky", "green", "white", "dkgrey", "pink", "yellow"], P => {
    P.all("sky"); P.ell("yellow", 27, 5, 3, 3); P.rect("green", 0, 21, 32, 32);
    P.ell("white", 6, 5, 4, 1.6); P.ell("white", 9, 4, 3, 1.5);
    for (const [fx, fy] of [[3, 27], [8, 30], [14, 28], [21, 30], [27, 27], [29, 30]]) { P.rect("yellow", fx, fy, fx + 2, fy + 1); P.rect("yellow", fx + 0.5, fy - 1, fx + 1.5, fy + 2); }
    for (const lx of [7, 10, 18, 21]) P.rect("white", lx, 18, lx + 2, 25);
    for (const lx of [7, 10, 18, 21]) P.rect("dkgrey", lx, 24, lx + 2, 25);
    P.rect("white", 5, 11, 23, 20); P.ell("white", 5.5, 15.5, 2, 4.5); P.ell("white", 22.5, 15.5, 2, 4.5);
    P.line("dkgrey", 4, 12, 2.5, 19, 1); P.rect("dkgrey", 2, 18, 3.5, 20);
    P.ell("pink", 15, 20.5, 2.6, 1.5);
    P.ell("dkgrey", 10, 14, 3, 2.5); P.ell("dkgrey", 17.5, 17, 2.6, 2); P.ell("dkgrey", 19, 12.5, 2, 1.5);
    P.ell("white", 25, 12, 3.6, 3.6); P.rect("dkgrey", 21, 9, 24, 10.5); P.rect("dkgrey", 27, 9, 30, 10.5);
    P.ell("pink", 26.5, 15, 3, 2.2); P.rect("dkgrey", 25, 11, 26, 12); P.rect("dkgrey", 27, 15, 28, 16);
  }, 32) },
  { tier: 2, name: "rabbit in meadow", make: () => picture(["sky", "green", "dkgreen", "brown", "white", "pink"], P => {
    P.all("sky"); P.rect("green", 0, 19, 32, 32);
    P.ell("white", 24, 4, 4, 1.6); P.ell("white", 27, 3, 3, 1.4);
    for (const gx of [3, 9, 26, 30]) P.poly("dkgreen", [[gx - 1.5, 20], [gx, 15.5], [gx + 1.5, 20]]);
    P.when("dkgreen", (x, y) => y > 25 && fl(y) % 3 === 1 && (fl(x) * 2 + fl(y)) % 7 < 2);
    P.rell("brown", 16.5, 6.5, 1.8, 5, -0.35); P.rell("brown", 20, 6, 1.8, 5, 0.15);
    P.rell("pink", 16.6, 6.5, 0.8, 3.5, -0.35); P.rell("pink", 20, 6, 0.8, 3.5, 0.15);
    P.ell("brown", 13.5, 19, 7, 6); P.ell("brown", 20, 13, 4.5, 3.8); P.ell("brown", 17, 24.5, 4, 1.6);
    P.ell("white", 6.5, 18, 2.4, 2.4); P.ell("white", 14.5, 21, 3.5, 3);
    P.rect("dkgreen", 20, 12, 22, 13); P.rect("pink", 24, 13, 25, 15);
    for (const [fx, fy] of [[5, 28], [11, 26], [24, 27], [29, 25]]) P.ell("pink", fx, fy, 1.4, 1.2);
  }, 32) },
  { tier: 2, name: "woodpecker", make: () => picture(["mint", "brown", "tan", "ink", "white", "red"], P => {
    P.all("mint"); P.rect("brown", 19, 0, 30, 32);
    P.on("tan", "brown", (x, y) => fl(x) % 3 === 0 && (fl(y) * 2 + fl(x)) % 9 < 5);
    P.ell("ink", 26, 7, 2, 3);
    P.poly("ink", [[12, 22], [15, 22], [14.5, 31], [12.5, 30]]);
    P.rell("ink", 15.5, 16, 3.8, 7, -0.15);
    P.ell("ink", 16, 8.5, 3.3, 3.3);
    P.poly("ink", [[18.5, 7.5], [21.5, 8.5], [18.5, 9.5]]);
    P.ell("white", 16, 9.5, 2.2, 1.5); P.ell("red", 13.8, 7.3, 1.6, 1.4);
    P.rell("white", 14.5, 14.5, 1.6, 3.2, -0.15);
    P.on("white", "ink", (x, y) => y > 18 && y < 22 && x < 14.5 && fl(y) % 2 === 0);
    P.ell("red", 16, 22.5, 2, 1.6);
    P.rect("ink", 18, 19, 20, 20); P.rect("ink", 18, 22, 20, 23);
  }, 32) },
  { tier: 2, name: "howling wolf", make: () => picture(["navy", "yellow", "white", "purple", "grey"], P => {
    P.all("navy"); P.ell("yellow", 17, 12, 9, 9);
    for (const [sx, sy] of [[3, 4], [29, 3], [28, 18]]) { P.rect("white", sx - 1, sy, sx + 2, sy + 1); P.rect("white", sx, sy - 1, sx + 1, sy + 2); }
    for (const [sx, sy] of [[7, 13], [24, 25], [3, 21], [30, 10]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.when("purple", (x, y) => y > 25 - x * 0.12 + Math.sin(x * 0.4) * 0.8);
    P.poly("grey", [[9, 28], [10, 20], [11, 15], [10, 11], [8.5, 8], [6, 5], [5, 3.5], [7.5, 4], [9.5, 5], [11, 3], [12.5, 2], [13, 5], [14, 8.5], [16, 13], [19, 17], [21.5, 22], [22, 28]]);
    P.poly("grey", [[21, 24], [27, 22.5], [29.5, 24.5], [23, 28]]);
    P.rect("navy", 11, 6, 12, 7);
  }, 32) },
  { tier: 2, name: "duck family", make: () => picture(["blue", "sky", "green", "dkgreen", "white", "brown", "grey", "yellow", "orange"], P => {
    P.all("blue"); P.when("green", (x, y) => y < 6 + Math.sin(x * 1.3) * 1.5);
    P.when("sky", (x, y) => y > 8 && fl(y) % 4 === 0 && (fl(x) + fl(y) * 3) % 9 < 4);
    P.poly("white", [[21, 16], [27, 12.5], [26, 19]]);
    P.when("grey", (x, y) => ((x - 14) / 9) ** 2 + ((y - 17) / 4.5) ** 2 <= 1 && y < 19.5);
    P.ell("brown", 8, 16, 3.8, 3.4);
    P.rect("dkgreen", 6, 9, 9.5, 14); P.ell("dkgreen", 7, 9.5, 3.6, 3.2);
    P.rect("white", 5.5, 13, 10, 15);
    P.poly("yellow", [[4.5, 8.5], [0, 10.5], [4.5, 12]]);
    P.on("sky", "blue", (x, y) => fl(y) === 20 && x > 4 && x < 24);
    for (const [dx, dy] of [[24, 25], [30, 28], [18, 30]]) {
      P.when("yellow", (x, y) => ((x - dx) / 3.2) ** 2 + ((y - dy) / 2.2) ** 2 <= 1 && y < dy + 0.8);
      P.ell("yellow", dx - 2, dy - 2.8, 2, 2); P.poly("orange", [[dx - 3.5, dy - 4], [dx - 6.5, dy - 2.8], [dx - 3.5, dy - 1.5]]);
      P.on("sky", "blue", (x, y) => fl(y) === dy + 1 && Math.abs(x - dx) < 3.5);
    }
  }, 36) },
  { tier: 2, name: "barn owl", make: () => picture(["purple", "yellow", "brown", "ink", "tan", "white"], P => {
    P.all("purple"); P.ell("yellow", 4.5, 5, 3, 3);
    P.rect("brown", 8, 0, 27, 32);
    P.on("ink", "brown", (x, y) => (fl(x) === 10 || fl(x) === 24) && fl(y) % 7 < 4);
    P.ell("ink", 17.5, 18, 6.5, 8.5);
    P.ell("tan", 17.5, 21.5, 5, 5); P.ell("tan", 17.5, 15, 5.5, 4.6);
    P.ell("white", 15.8, 14.8, 2.6, 3); P.ell("white", 19.2, 14.8, 2.6, 3); P.poly("white", [[13.5, 16], [21.5, 16], [17.5, 20.5]]);
    P.rect("ink", 15, 14, 17, 16); P.rect("ink", 18, 14, 20, 16); P.rect("tan", 17, 16, 18, 18.5);
    for (const [sx, sy] of [[15, 22], [18, 23.5], [20, 21.5], [16.5, 25]]) P.rect("white", sx, sy, sx + 1, sy + 1);
    P.rect("brown", 10, 26, 25, 32);
  }, 32) },
  { tier: 2, name: "harvest mouse", make: () => picture(["sky", "gold", "yellow", "orange", "white", "pink", "brown"], P => {
    P.all("sky");
    for (const [x0, x1, top] of [[3, 3.5, 12], [29, 28.5, 14]]) {
      P.line("gold", x0, 32, x1, top + 5, 1.2);
      for (let k = 0; k < 4; k++) { P.rell("yellow", x1 - 1.3, top + k * 1.6, 1.6, 0.9, -0.6); P.rell("yellow", x1 + 1.3, top + k * 1.6, 1.6, 0.9, 0.6); }
      P.ell("yellow", x1, top - 1.5, 1, 1.5);
    }
    P.line("gold", 10, 32, 23, 7, 1.5);
    for (let k = 0; k < 4; k++) { P.rell("yellow", 23.5 - k * 0.9, 2.5 + k * 1.7, 1.8, 1, -0.2); P.rell("yellow", 26.5 - k * 0.9, 3.5 + k * 1.7, 1.8, 1, 0.9); }
    P.ell("yellow", 26.5, 1.2, 1.1, 1.5);
    P.when("pink", (x, y) => { const d = Math.hypot(x - 22.5, y - 25); return d > 1.6 && d < 2.6 && !(x < 22.5 && y < 25); });
    P.line("pink", 21, 18.5, 24.5, 23, 1.1);
    P.ell("orange", 16, 17, 6, 4.6);
    P.ell("orange", 9.5, 14.5, 4.2, 3.7); P.poly("orange", [[7, 12.5], [2.5, 15.5], [7, 17.5]]);
    P.ell("orange", 12, 9.8, 2.9, 2.9); P.ell("pink", 12, 9.8, 1.6, 1.6);
    P.ell("white", 15.5, 20, 4.6, 1.7); P.ell("white", 8.5, 17, 2.5, 1.1);
    P.rect("brown", 8, 13, 10, 15); P.rect("pink", 2, 14.5, 4, 16);
    P.rect("pink", 12, 20, 14, 21.5); P.rect("pink", 17, 21, 19, 22.5);
    P.when("brown", (x, y) => y > 29.5 + Math.sin(x * 0.7) * 0.8);
  }, 32) },
  { tier: 2, name: "otter", make: () => picture(["blue", "sky", "brown", "tan", "white", "ink"], P => {
    P.all("blue");
    P.when("sky", (x, y) => fl(y) % 5 === 1 && (fl(x) + fl(y) * 2) % 11 < 5);
    P.when("sky", (x, y) => { const d = ((x - 18) / 15) ** 2 + ((y - 20) / 7) ** 2; return d > 1 && d < 1.35; });
    P.rell("brown", 19, 19, 11.5, 4.8, -0.08);
    P.rell("brown", 29, 15, 3, 1.6, -0.9); P.rell("brown", 32, 17, 3, 1.6, -0.6);
    P.poly("brown", [[30, 19], [35, 21], [35, 23], [29, 22]]);
    P.ell("brown", 7, 16, 5.2, 4.8);
    P.ell("brown", 3.5, 11.8, 1.6, 1.5); P.ell("brown", 10.5, 11.8, 1.6, 1.5);
    P.ell("tan", 7, 17.6, 3.8, 3); P.ell("tan", 18, 17.5, 6, 2.4);
    P.ell("white", 17, 15.5, 3, 2.2); P.on("tan", "white", (x, y) => fl(x + y) % 3 === 0);
    P.ell("brown", 13.5, 15.5, 1.8, 1.5); P.ell("brown", 20.5, 15.5, 1.8, 1.5);
    P.rect("ink", 4, 14, 6, 15); P.rect("ink", 8, 14, 10, 15); P.rect("ink", 6, 16, 8, 18);
  }, 36) },
  { tier: 2, name: "beaver", make: () => picture(["sky", "dkgreen", "blue", "tan", "brown", "orange", "dkgrey"], P => {
    P.all("sky"); P.ell("orange", 30, 5, 3, 3);
    P.when("dkgreen", (x, y) => y > 13 + Math.sin(x * 0.5) * 1.5 + Math.sin(x * 1.4) * 0.8);
    P.rect("blue", 0, 24, 36, 36);
    P.when("sky", (x, y) => y > 26 && fl(y) % 3 === 0 && (fl(x) + fl(y)) % 8 < 3);
    P.rect("tan", 4, 23, 34, 28); P.ell("tan", 34, 25.5, 2.2, 2.5);
    P.ell("brown", 34, 25.5, 1.6, 1.9); P.ell("tan", 34, 25.5, 0.8, 1);
    P.on("brown", "tan", (x, y) => fl(y) === 25 && fl(x) % 5 < 3 && x < 31);
    P.rell("dkgrey", 28, 21.5, 5, 2, -0.3);
    P.on("brown", "dkgrey", (x, y) => (fl(x) + fl(y)) % 3 === 0);
    P.ell("brown", 19, 17, 7, 7);
    P.ell("brown", 12, 10.5, 5, 4.5); P.ell("brown", 8.5, 12.5, 3, 2.5);
    P.ell("brown", 14, 6.5, 1.5, 1.5); P.ell("brown", 16, 22.5, 3.5, 1.6); P.ell("brown", 11, 17, 2, 1.5);
    P.rect("orange", 7, 14, 9, 16.5);
    P.rect("dkgrey", 11, 9, 12, 10); P.rect("dkgrey", 5.5, 11, 7, 12.5);
  }, 36) },
  // ----- complex -----
  { tier: 3, name: "farmyard", make: () => picture(["sky", "white", "yellow", "green", "tan", "red", "maroon", "brown", "pink"], P => {
    P.all("sky"); P.ell("yellow", 42, 6, 3.6, 3.6);
    P.ell("white", 8, 6, 5, 2); P.ell("white", 13, 5, 4, 1.8); P.ell("white", 30, 9, 4, 1.6);
    P.rect("green", 0, 27, 48, 48);
    P.poly("tan", [[10, 30], [16, 30], [25, 48], [13, 48]]);
    P.rect("brown", 22, 22, 48, 23.5); P.rect("brown", 22, 26, 48, 27.5);
    for (let fx = 23; fx < 48; fx += 6) P.rect("brown", fx, 20, fx + 2, 31);
    P.rect("red", 3, 15, 23, 31); P.poly("maroon", [[1, 16], [6, 7], [20, 7], [25, 16]]);
    P.rect("white", 11, 10, 15, 13.5);
    P.rect("white", 8, 20, 18, 31); P.rect("red", 9, 21, 17, 31);
    P.line("white", 9.5, 21.5, 16.5, 30.5, 1.1); P.line("white", 16.5, 21.5, 9.5, 30.5, 1.1);
    for (const lx of [31, 34, 38, 41]) P.rect("pink", lx, 38, lx + 2, 43);
    P.ell("pink", 36, 37, 7.5, 4.5); P.ell("pink", 43.5, 35, 3.8, 3.4); P.ell("pink", 46.5, 36, 1.6, 1.8);
    P.poly("pink", [[41, 32.5], [41.5, 29], [44, 32]]);
    P.rect("maroon", 43, 34, 44, 35); P.rect("maroon", 46, 35, 47, 37);
    P.when("maroon", (x, y) => { const d = Math.hypot(x - 28, y - 35); return d > 0.8 && d < 1.9 && !(x > 28 && y > 35); });
    P.rect("maroon", 28.5, 35, 30, 36);
    P.poly("white", [[12, 38], [10, 32.5], [14.5, 36]]);
    P.ell("white", 7.5, 40, 5, 3.4); P.ell("white", 3.5, 36, 2.6, 2.6);
    P.ell("red", 3, 33, 1.6, 1.3); P.ell("red", 2, 38.5, 1, 1.4);
    P.poly("yellow", [[1.2, 35.2], [-1, 36.2], [1.2, 37.2]]); P.rect("brown", 3, 35, 4, 36);
    P.rect("yellow", 6, 43, 7, 46); P.rect("yellow", 9, 43, 10, 46);
    for (const [cx, cy] of [[28, 45], [32, 46]]) { P.ell("yellow", cx, cy, 1.8, 1.5); P.ell("yellow", cx - 1.5, cy - 1.5, 1.2, 1.2); }
  }, 48) },
  { tier: 3, name: "horse in paddock", make: () => picture(["sky", "white", "dkgreen", "green", "brown", "maroon", "tan"], P => {
    P.all("sky"); P.ell("white", 9, 6, 5, 2); P.ell("white", 13, 4.8, 3.5, 1.8); P.ell("white", 34, 8, 4.5, 1.7);
    P.when("dkgreen", (x, y) => y > 17 + Math.sin(x * 0.18) * 2.5);
    P.when("green", (x, y) => y > 24 + Math.sin(x * 0.12 + 2) * 1.5);
    P.rect("white", 0, 21, 44, 22.5); P.rect("white", 0, 25, 44, 26.5);
    for (let fx = 2; fx < 44; fx += 7) P.rect("white", fx, 19, fx + 1.5, 29);
    P.poly("maroon", [[35, 22], [39, 24], [40.5, 35], [37.5, 34.5]]);
    for (const lx of [17, 21, 29, 33]) { P.rect("brown", lx, 28, lx + 2.5, 39); P.rect("tan", lx, 38, lx + 2.5, 40); }
    P.ell("brown", 26, 25, 10, 5.8);
    P.poly("brown", [[14, 25], [11, 13], [16, 10.5], [22, 21]]);
    P.rell("brown", 10, 15.5, 5.8, 2.9, 2.2);
    P.poly("brown", [[12.5, 10.5], [13.5, 6.5], [15.5, 10.5]]);
    P.poly("maroon", [[13.5, 10], [17, 10], [23, 19], [20.5, 21.5]]);
    P.line("white", 12, 12, 8.5, 18.5, 1.1);
    P.rect("maroon", 13, 13, 14.5, 14); P.rect("maroon", 6.5, 19, 8, 20);
  }, 44) },
  { tier: 3, name: "stag in forest", make: () => picture(["lilac", "pink", "yellow", "dkgreen", "green", "brown", "tan"], P => {
    P.all("lilac"); P.rect("pink", 0, 16, 48, 32); P.ell("yellow", 31, 27, 7.5, 7.5);
    for (const [tx, ty] of [[3, 14], [9, 18], [15, 12], [24, 19], [39, 13], [45, 17], [33, 21]]) P.poly("dkgreen", [[tx - 5.5, 33], [tx, ty], [tx + 5.5, 33]]);
    P.when("green", (x, y) => y > 32 + Math.sin(x * 0.2) * 1.2);
    for (const lx of [20, 24, 32, 36]) P.rect("brown", lx, 36, lx + 2.4, 46);
    P.ell("brown", 29, 34, 10, 5.5);
    P.poly("brown", [[19, 35], [16, 23], [21, 22], [25, 32]]);
    P.ell("brown", 16.5, 21.5, 3.8, 3); P.poly("brown", [[14, 20], [8.5, 23], [9, 25], [15, 24.5]]);
    P.rell("brown", 21, 19, 2.8, 1.2, -0.5);
    P.line("tan", 17, 19, 15, 11, 1.6); P.line("tan", 15, 11, 11, 5, 1.4); P.line("tan", 15, 11, 17, 4, 1.4); P.line("tan", 16, 15, 11, 12.5, 1.4);
    P.line("tan", 19, 19, 23, 11, 1.6); P.line("tan", 23, 11, 22, 4, 1.4); P.line("tan", 23, 11, 28, 6, 1.4); P.line("tan", 21, 15, 26, 13.5, 1.4);
    P.ell("tan", 38.5, 31.5, 1.6, 2.2);
    P.rect("dkgreen", 15, 21, 16, 22); P.rect("dkgreen", 8, 23, 9.5, 24);
  }, 48) },
  { tier: 3, name: "bear fishing", make: () => picture(["sky", "dkgreen", "grey", "blue", "white", "brown", "tan", "pink", "ink"], P => {
    P.all("sky");
    for (const [tx, ty] of [[3, 4], [9, 8], [15, 3], [21, 7], [29, 4], [35, 9], [41, 5]]) P.poly("dkgreen", [[tx - 4.5, 19], [tx, ty], [tx + 4.5, 19]]);
    P.rect("blue", 0, 18, 44, 44);
    P.when("white", (x, y) => y > 18 && fl(y) % 4 === 2 && (fl(x) * 2 + fl(y)) % 13 < 5);
    P.ell("grey", 15, 38, 13, 6); P.ell("grey", 38, 37, 6, 3.5);
    P.when("white", (x, y) => { const d = ((x - 15) / 14.5) ** 2 + ((y - 38) / 7) ** 2; return d > 1 && d < 1.3 && y > 34; });
    P.ell("brown", 10, 33, 3.5, 2.6); P.ell("brown", 21, 33, 3.5, 2.6);
    P.ell("brown", 15, 25, 8.5, 8);
    P.rell("brown", 23, 21, 5, 2.6, -0.8);
    P.ell("brown", 26, 16.5, 5.5, 5);
    P.ell("brown", 23, 11.8, 2, 2); P.ell("brown", 28.8, 12.2, 2, 2);
    P.ell("tan", 30.5, 18.5, 3.2, 2.6);
    P.ell("tan", 15, 27, 4.5, 4.5);
    P.rell("pink", 36, 13, 5, 2, -0.7); P.poly("pink", [[39, 9], [43, 5], [43.5, 9.5]]);
    P.rect("ink", 26, 15, 28, 17); P.rect("ink", 32, 17, 34, 19); P.rect("ink", 34, 14, 35, 15);
    P.when("white", (x, y) => y > 6 && y < 10 && ((x > 30 && x < 31) || (x > 34 && x < 35)) && fl(y) % 2 === 0);
  }, 44) },
  { tier: 3, name: "squirrel in oak", make: () => picture(["sky", "green", "dkgreen", "brown", "tan", "orange", "white"], P => {
    P.all("sky");
    P.rect("brown", 28, 14, 37, 44); P.rell("brown", 37, 44, 6, 3, 0); P.rell("brown", 28, 44, 6, 3, 0);
    P.line("brown", 2, 25.5, 30, 22, 3.6); P.line("brown", 30, 18, 40, 12, 2.6);
    for (const [cx, cy, rx, ry, k] of [[10, 9, 9, 7, "dkgreen"], [25, 7, 10, 7, "green"], [38, 9, 8, 7, "dkgreen"], [18, 14, 7, 5, "green"], [42, 17, 5, 4, "green"], [4, 17, 5, 4.5, "green"]]) P.ell(k, cx, cy, rx, ry);
    P.on("dkgreen", "green", (x, y) => (fl(x) * 3 + fl(y) * 5) % 7 === 0);
    P.on("green", "dkgreen", (x, y) => (fl(x) * 3 + fl(y) * 5) % 7 === 0);
    P.on("tan", "brown", (x, y) => x > 28 && x < 37 && y > 26 && fl(x) % 3 === 1 && (fl(y) + fl(x)) % 6 < 3);
    for (const [ax, ay] of [[6, 30], [24, 27.5]]) { P.line("brown", ax, ay - 4, ax, ay - 2, 1); P.ell("tan", ax, ay, 1.8, 2.2); P.ell("brown", ax, ay - 1.8, 2.2, 1.2); }
    P.rell("orange", 10, 17, 3.4, 5.5, -0.3); P.ell("orange", 11.5, 11.5, 3.2, 2.4); P.ell("sky", 13, 13.6, 1.4, 1.2);
    P.ell("orange", 15, 20.5, 4, 3.2); P.ell("orange", 19.5, 17.5, 2.8, 2.5);
    P.poly("orange", [[18.5, 15.5], [19.5, 12.5], [21, 15.5]]); P.poly("orange", [[21.5, 17], [24, 18.5], [21, 19.5]]);
    P.ell("white", 17.5, 21, 1.6, 2);
    P.rect("brown", 20, 16, 21, 17); P.rect("brown", 23, 18, 24, 19);
    P.ell("orange", 14, 23, 2.4, 1.2); P.ell("orange", 19, 23, 1.8, 1.2);
    P.rect("green", 0, 41, 44, 44);
  }, 44) },
  { tier: 3, name: "hen and chicks", make: () => picture(["sky", "green", "brown", "white", "tan", "red", "yellow", "orange"], P => {
    P.all("sky"); P.rect("green", 0, 26, 40, 40);
    P.rect("brown", 0, 16, 40, 17.5); P.rect("brown", 0, 21, 40, 22.5);
    for (let fx = 3; fx < 40; fx += 8) P.rect("brown", fx, 14, fx + 2, 27);
    P.rect("orange", 15, 30, 16, 35); P.rect("orange", 19, 30, 20, 35); P.rect("orange", 13, 35, 17, 36); P.rect("orange", 18, 35, 22, 36);
    P.poly("white", [[10, 24], [4, 13], [9, 15], [14, 21]]);
    P.ell("white", 17, 25, 9, 6.5);
    P.line("white", 23, 22, 25, 16, 4.5); P.ell("white", 25.5, 14.5, 4, 3.8);
    P.ell("red", 24, 10.2, 1.6, 1.4); P.ell("red", 26.2, 9.8, 1.6, 1.4); P.ell("red", 28, 10.8, 1.4, 1.3);
    P.ell("red", 28.5, 18.5, 1.3, 1.8);
    P.poly("orange", [[29, 13.5], [32.5, 14.8], [29, 16]]);
    P.rell("tan", 16, 24, 5.5, 3.2, 0.2); P.on("white", "tan", (x, y) => fl(y) === 24 && fl(x) % 3 === 0);
    P.rect("brown", 26, 13, 27, 14);
    for (const [cx, cy, d] of [[31, 32, 1], [36, 29, 1], [26, 36, -1]]) {
      P.rect("orange", cx - 1, cy + 1.5, cx, cy + 3.2); P.rect("orange", cx + 1, cy + 1.5, cx + 2, cy + 3.2);
      P.ell("yellow", cx, cy, 2.8, 2.2); P.ell("yellow", cx + d * 2, cy - 2.4, 1.8, 1.8);
      P.rect("orange", d > 0 ? cx + 3.5 : cx - 5, cy - 3, d > 0 ? cx + 5 : cx - 3.5, cy - 2); P.rect("brown", cx + d * 2, cy - 3, cx + d * 2 + 1, cy - 2);
    }
  }, 40) },
  { tier: 3, name: "rabbit burrow", make: () => picture(["sky", "green", "brown", "tan", "grey", "white", "pink", "orange"], P => {
    P.all("sky"); P.rect("green", 0, 11, 44, 14); for (const gx of [2, 7, 13, 38, 42]) P.poly("green", [[gx - 1.2, 11.5], [gx, 8.5], [gx + 1.2, 11.5]]);
    P.rect("brown", 0, 14, 44, 44);
    P.line("tan", 8, 11, 12, 22, 5); P.line("tan", 12, 22, 28, 28, 4.5); P.line("tan", 28, 28, 32, 34, 4.5);
    P.ell("tan", 13, 24, 8, 5); P.ell("tan", 32, 36, 9.5, 5);
    for (const [gx, gy] of [[38, 18], [4, 34], [22, 39], [40, 26], [24, 17]]) P.ell("grey", gx, gy, 1.5, 1.1);
    P.ell("grey", 13, 25.5, 4.5, 3); P.ell("grey", 17.5, 24.5, 2.6, 2.3); P.rell("grey", 15, 21.5, 3, 1.1, 0.25);
    P.ell("white", 8.5, 25, 1.5, 1.5); P.rect("pink", 19, 24, 20, 26);
    P.rect("white", 16.5, 24, 18.5, 25);
    P.ell("grey", 28, 37, 4.5, 3); P.ell("grey", 32.5, 36, 2.6, 2.3); P.rell("grey", 30, 33, 3, 1.1, 0.25);
    P.ell("white", 23.5, 36.5, 1.5, 1.5); P.rect("pink", 34, 35.5, 35, 37.5);
    P.rect("white", 31.5, 35.5, 33.5, 36.5);
    P.poly("orange", [[34, 39.5], [41, 37], [41, 41]]); P.rell("green", 42.5, 37.5, 1.8, 0.9, -0.6); P.rell("green", 42.5, 40.5, 1.8, 0.9, 0.6);
    P.ell("grey", 28, 9, 3.5, 3); P.ell("grey", 31.5, 6.5, 2.4, 2.2);
    P.rell("grey", 30.5, 2.5, 0.9, 2.5, -0.2); P.rell("grey", 32.5, 2.5, 0.9, 2.5, 0.2);
    P.rell("pink", 30.5, 2.8, 0.4, 1.6, -0.2); P.rell("pink", 32.5, 2.8, 0.4, 1.6, 0.2);
    P.ell("white", 24.5, 9.5, 1.4, 1.4); P.rect("brown", 32, 6, 33, 7); P.rect("pink", 33, 7, 34, 8);
    P.ell("grey", 30, 11.5, 2.4, 1);
  }, 44) },
  { tier: 3, name: "wolf in snow", make: () => picture(["sky", "white", "dkgreen", "grey", "dkgrey", "blue"], P => {
    P.all("sky");
    for (const [tx, ty] of [[4, 8], [11, 12], [33, 9], [40, 13]]) {
      P.poly("dkgreen", [[tx - 6, 32], [tx, ty], [tx + 6, 32]]);
      P.poly("white", [[tx - 2, ty + 5], [tx, ty], [tx + 2, ty + 5]]);
      P.on("white", "dkgreen", (x, y) => Math.abs(y - (ty + 12)) < 0.8 && Math.abs(x - tx) < 4.5 && fl(x) % 2 === 0);
    }
    P.when("white", (x, y) => y > 31 + Math.sin(x * 0.25) * 1.5);
    P.ell("blue", 25, 41, 14, 2);
    for (const [sx, sy] of [[19, 4], [25, 9], [29, 3], [17, 13], [44, 3], [23, 17]]) { P.rect("white", sx - 1, sy, sx + 2, sy + 1); P.rect("white", sx, sy - 1, sx + 1, sy + 2); }
    for (const lx of [16, 20, 30, 34]) P.rect("grey", lx, 30, lx + 2.4, 41);
    P.poly("grey", [[34, 25], [39, 27], [42.5, 33], [41, 36], [38, 32], [34, 29]]);
    P.ell("grey", 26, 27.5, 10, 5);
    P.poly("grey", [[16, 30], [14, 20], [19, 17.5], [23, 26]]);
    P.ell("grey", 13.5, 19.5, 4.2, 3.6); P.poly("grey", [[11, 18], [4.5, 21], [5, 23], [11.5, 23.5]]);
    P.poly("grey", [[12, 17], [13, 11.5], [15.5, 16.5]]); P.poly("grey", [[15, 17], [17.5, 12], [18.5, 17.5]]);
    P.on("dkgrey", "grey", (x, y) => y < 25 + Math.sin(x * 0.6) * 0.8 && x > 18 && x < 38);
    P.on("dkgrey", "grey", (x, y) => x > 38 && y > 32);
    P.on("white", "grey", (x, y) => (y > 29.5 && x > 19 && x < 33) || (x < 18 && y > 23 && y < 29 && x > 14));
    P.rect("dkgrey", 4, 20.5, 6, 22.5); P.rect("dkgrey", 12, 18, 14, 19);
  }, 44) },
  { tier: 3, name: "dairy cow", make: () => picture(["white", "pink", "tan", "grey", "green", "ink"], P => {
    P.ell("green", 24, 45, 23, 3);
    for (const lx of [9, 15, 30, 36]) { P.rect("white", lx, 28, lx + 4, 44); P.rect("grey", lx, 41, lx + 4, 45); }
    P.line("white", 6.5, 16, 3.5, 32, 2.6); P.ell("white", 3.5, 33, 2.2, 2.6);
    P.rect("white", 6, 13, 40, 31); P.ell("white", 7, 22, 3, 9); P.ell("white", 39, 22, 3, 9);
    P.ell("pink", 30, 31.5, 4, 3);
    P.rell("white", 36.5, 10, 3.5, 1.8, 0.4);
    P.line("tan", 40.5, 8.5, 37, 4.5, 3.2); P.line("tan", 44.5, 8.5, 47.5, 4.5, 3.2);
    P.ell("white", 42.5, 13, 5, 6); P.ell("pink", 43, 19.5, 4.6, 3.4);
    P.on("ink", "white", (x, y) => (((x - 14) / 5.5) ** 2 + ((y - 19) / 4.5) ** 2 <= 1) || (((x - 26) / 4.5) ** 2 + ((y - 25) / 4) ** 2 <= 1) || (((x - 33) / 3.5) ** 2 + ((y - 16) / 3) ** 2 <= 1) || (((x - 17) / 3) ** 2 + ((y - 34) / 3) ** 2 <= 1) || (((x - 43) / 3) ** 2 + ((y - 9) / 2.6) ** 2 <= 1));
    P.outline("ink", true);
    P.rect("ink", 40, 12, 42, 14); P.rect("ink", 41, 19, 42, 21); P.rect("ink", 44, 19, 45, 21);
    P.rect("ink", 2, 33, 5, 36);
  }, 48) },
  { tier: 3, name: "mallard", make: () => picture(["dkgreen", "white", "brown", "grey", "blue", "yellow", "orange", "ink"], P => {
    P.rect("orange", 21, 30, 24, 39); P.rect("orange", 27, 30, 30, 39);
    P.poly("ink", [[34, 20], [41, 15], [43, 18], [39, 26], [35, 27]]);
    P.poly("white", [[36, 24], [43, 21], [42.5, 28], [37, 28]]);
    P.ell("grey", 24, 24, 12.5, 7.5);
    P.ell("brown", 14, 23.5, 6.5, 6.5);
    P.rell("grey", 27, 21.5, 8, 3.6, 0.1);
    P.rell("blue", 30, 22.5, 4.8, 2.1, 0.1);
    P.rect("dkgreen", 9.5, 11, 15.5, 19); P.ell("dkgreen", 12, 10.5, 5.5, 5);
    P.rect("white", 9, 17, 16, 19.5);
    P.poly("yellow", [[8, 8.5], [0.5, 11], [1, 15], [8.5, 14]]);
    P.outline("ink", true);
    P.rect("ink", 11, 9, 13, 11);
    P.rect("orange", 18, 39, 24, 40); P.rect("orange", 25, 39, 31, 40);
  }, 44) },
  { tier: 3, name: "pheasant", make: () => picture(["teal", "red", "white", "orange", "brown", "tan", "ink"], P => {
    P.poly("tan", [[28, 21], [47, 8], [47.5, 13], [31, 28]]);
    P.on("brown", "tan", (x, y) => ((x * 0.55 + y) % 3.4) < 1.3);
    for (const lx of [19, 25]) P.rect("tan", lx - 1.5, 32, lx + 1.5, 41);
    P.ell("orange", 22, 27, 10.5, 7.5);
    P.rell("brown", 25, 24.5, 6.5, 3.8, 0.25);
    P.poly("teal", [[9, 15], [15, 12], [19, 23], [13, 24]]);
    P.ell("teal", 11, 12, 4.6, 4.2); P.poly("teal", [[12, 8.5], [15, 6], [15, 9.5]]);
    P.ell("red", 10, 12.5, 2.8, 2.8);
    P.poly("tan", [[7, 11], [3, 13], [7.5, 14.5]]);
    P.poly("white", [[12, 20.5], [18, 19.5], [19, 22.5], [13, 23.5]]);
    P.outline("ink", true);
    P.rect("ink", 10, 11, 11, 12);
    P.on("ink", "orange", (x, y) => (fl(x) % 3 === 0 && fl(y) % 3 === 1) && y > 25);
    P.rect("tan", 15, 41, 20, 42); P.rect("tan", 21, 41, 26, 42);
  }, 48) },
  { tier: 3, name: "frog pond", make: () => picture(["sky", "dkgreen", "blue", "green", "lime", "brown", "pink", "cyan"], P => {
    P.all("sky"); P.when("dkgreen", (x, y) => y > 9 + Math.sin(x * 0.4) * 1.5);
    P.rect("blue", 0, 14, 44, 44);
    P.when("sky", (x, y) => y > 15 && fl(y) % 4 === 3 && (fl(x) + fl(y) * 3) % 11 < 4);
    for (const [x0, x1, top] of [[3, 2, 6], [6, 7, 9], [39, 40, 4], [42, 41.5, 10]]) { P.line("dkgreen", x0, 44, x1, top, 1.2); }
    P.rell("brown", 2, 9, 1.2, 3, 0.1); P.rell("brown", 40, 7, 1.2, 3, -0.1);
    P.rell("dkgreen", 9, 30, 4.5, 1.3, -0.8); P.rell("dkgreen", 36, 28, 4.5, 1.3, 0.8);
    P.ell("green", 21, 34, 13, 5); P.poly("blue", [[21, 34], [34.5, 31], [34.5, 36]]);
    P.ell("green", 37, 41, 6, 2.4); P.ell("green", 6, 40, 5, 2);
    P.ell("pink", 37, 38.5, 2.6, 1.8); P.ell("pink", 35, 38, 1.2, 1.8); P.ell("pink", 39, 38, 1.2, 1.8);
    P.ell("lime", 13.5, 32.5, 3.5, 2.2); P.ell("lime", 27.5, 32.5, 3.5, 2.2);
    P.ell("lime", 20.5, 28.5, 7, 5.5);
    P.ell("lime", 16.5, 22.5, 2.8, 2.8); P.ell("lime", 24.5, 22.5, 2.8, 2.8);
    P.rect("dkgreen", 16, 22, 18, 24); P.rect("dkgreen", 24, 22, 26, 24);
    P.line("dkgreen", 17, 28, 24, 28, 1);
    P.rect("lime", 17, 32, 19, 34.5); P.rect("lime", 22, 32, 24, 34.5);
    P.line("cyan", 28, 18.5, 40, 18.5, 1.3); P.ell("cyan", 28, 18.5, 1.5, 1.5);
    P.rell("cyan", 30.5, 15, 1, 3.2, 0.3); P.rell("cyan", 30.5, 22, 1, 3.2, -0.3); P.rell("cyan", 34, 15, 1, 3.2, -0.3); P.rell("cyan", 34, 22, 1, 3.2, 0.3);
  }, 44) },
);
