// Sleep on it / Ants: transport and machines. Objects with ink outlines on a transparent
// background, and full scenes with a background, at varied sizes.
"use strict";
PICTURES.push(
  // ----- simple -----
  { tier: 1, name: "taxi", make: () => picture(["yellow", "sky", "white", "grey", "ink"], P => {
    P.rect("white", 10, 4, 18, 8);
    P.poly("yellow", [[6.5, 13], [9.5, 7.5], [19, 7.5], [22.5, 13]]);
    P.rect("yellow", 2, 12.5, 26, 21); P.rect("none", 2, 12, 3, 14);
    P.poly("sky", [[8.6, 12.5], [10.6, 9], [13.6, 9], [13.6, 12.5]]); P.poly("sky", [[15, 12.5], [15, 9], [18.4, 9], [20.6, 12.5]]);
    P.rect("white", 2, 15, 26, 17); P.on("ink", "white", (x, y) => y > 15 && y < 17 && (fl(x) + fl(y)) % 2 === 0);
    P.rect("grey", 1, 17, 3, 20); P.rect("grey", 25, 17, 27, 20);
    P.ell("ink", 8, 20.5, 3.4, 3.4); P.ell("ink", 20, 20.5, 3.4, 3.4);
    P.ell("grey", 8, 20.5, 1.5, 1.5); P.ell("grey", 20, 20.5, 1.5, 1.5);
    P.outline("ink");
  }, 28) },
  { tier: 1, name: "scooter", make: () => picture(["mint", "tan", "yellow", "grey", "ink"], P => {
    P.when("mint", (x, y) => ((x - 21.5) / 7.5) ** 2 + ((y - 19.5) / 5.5) ** 2 <= 1 && y < 24);
    P.rect("mint", 10, 20, 17, 24);
    P.poly("mint", [[6.5, 24], [10, 24], [13, 9], [10.5, 9]]);
    P.when("mint", (x, y) => ((x - 8) / 4) ** 2 + ((y - 23) / 2.5) ** 2 <= 1 && y < 23.5);
    P.line("grey", 12, 9, 11, 5, 2); P.line("grey", 7.5, 4.5, 14, 4, 2);
    P.rell("tan", 21.5, 13.2, 6.2, 2.5, 0);
    P.ell("ink", 8.5, 26, 3.4, 3.4); P.ell("ink", 23, 26, 3.4, 3.4);
    P.ell("grey", 8.5, 26, 1.5, 1.5); P.ell("grey", 23, 26, 1.5, 1.5);
    P.outline("ink");
    P.ell("yellow", 13.8, 9.5, 1.7, 1.7);
  }, 32) },
  { tier: 1, name: "rowing boat", make: () => picture(["sky", "white", "blue", "brown", "tan"], P => {
    P.all("sky"); P.ell("white", 23, 5, 5, 1.8); P.ell("white", 7, 8, 3.6, 1.4);
    P.rect("blue", 0, 19, 32, 32);
    P.when("white", (x, y) => y > 21 && fl(y) % 3 === 1 && (fl(x) * 3 + fl(y) * 5) % 11 < 3);
    P.line("tan", 9, 13.5, 2.5, 25, 1.5); P.line("tan", 23, 13.5, 29.5, 25, 1.5);
    P.rell("tan", 3, 24.5, 1.4, 2.9, 0.5); P.rell("tan", 29, 24.5, 1.4, 2.9, -0.5);
    P.poly("brown", [[3.5, 16], [28.5, 16], [25, 23.5], [7, 23.5]]);
    P.rect("tan", 3.5, 16, 28.5, 17.8);
  }, 32) },
  { tier: 1, name: "submarine", make: () => picture(["blue", "tan", "green", "sky", "yellow", "orange"], P => {
    P.all("blue"); P.when("tan", (x, y) => y > 28 + Math.sin(x * 0.5) * 0.8);
    for (const b of [4, 28]) P.when("green", (x, y) => y > 20 && y < 29.5 && Math.abs(x - (b + Math.sin(y * 0.7) * 1.1)) < 1);
    for (const [bx, by, r] of [[24, 9, 1], [26, 6, 1.2], [25, 2.5, 1.4]]) P.ell("sky", bx, by, r, r);
    P.rect("yellow", 11, 9, 18, 14); P.line("yellow", 16, 9, 16, 4.5, 1.6); P.line("yellow", 16, 5, 19.5, 5, 1.6);
    P.rect("orange", 26, 12, 29, 25);
    P.ell("yellow", 14, 18, 11, 5.4); P.poly("yellow", [[20, 13.4], [27, 16.5], [27, 19.5], [20, 22.6]]);
    for (const cx of [8, 14, 20]) P.ell("sky", cx, 18, 1.8, 1.8);
  }, 32) },
  { tier: 1, name: "tractor", make: () => picture(["sky", "white", "green", "red", "dkgrey", "yellow"], P => {
    P.all("sky"); P.ell("white", 25, 5, 4.5, 1.7); P.ell("white", 29, 7, 3, 1.2); P.rect("green", 0, 26, 32, 32);
    P.rect("red", 4, 5, 17, 7.5); P.rect("red", 5, 7, 7, 16); P.rect("red", 15, 7, 17, 16);
    P.rect("red", 4, 15, 17, 21); P.rect("red", 16, 13, 29, 21);
    P.rect("dkgrey", 23, 8, 25, 13);
    P.ell("dkgrey", 10, 22, 6.2, 6.2); P.ell("yellow", 10, 22, 2.7, 2.7);
    P.ell("dkgrey", 24.5, 24.5, 3.8, 3.8); P.ell("yellow", 24.5, 24.5, 1.6, 1.6);
  }, 32) },
  { tier: 1, name: "delivery van", make: () => picture(["white", "sky", "orange", "grey", "ink"], P => {
    P.rect("white", 2, 6, 22, 24);
    P.poly("white", [[21, 11], [25.5, 11], [30, 17], [30, 24], [21, 24]]);
    P.poly("sky", [[22, 12], [25.4, 12], [29.2, 18], [22, 18]]);
    P.rect("orange", 2, 19, 30, 21.5);
    P.rect("grey", 1, 22, 31, 24.5);
    P.ell("ink", 8, 24, 3.5, 3.5); P.ell("ink", 24, 24, 3.5, 3.5);
    P.ell("grey", 8, 24, 1.6, 1.6); P.ell("grey", 24, 24, 1.6, 1.6);
    P.outline("ink", true);
  }, 32) },
  { tier: 1, name: "windmill", make: () => picture(["sky", "green", "tan", "brown", "white"], P => {
    P.all("sky"); P.ell("green", 16, 42, 30, 16);
    P.poly("tan", [[10, 29], [22, 29], [19.5, 12], [12.5, 12]]);
    P.poly("brown", [[11, 12.8], [16, 7], [21, 12.8]]);
    P.rect("brown", 14, 23, 18, 29); P.ell("brown", 16, 23, 2, 1.6); P.rect("brown", 15, 16, 17, 19);
    for (let i = 0; i < 4; i++) {
      const a = Math.PI / 4 + i * Math.PI / 2, dx = Math.cos(a), dy = Math.sin(a), qx = -dy, qy = dx;
      const p = (s, t) => [16 + dx * s + qx * t, 11 + dy * s + qy * t];
      P.poly("white", [p(3, 0.4), p(13.5, 0.4), p(13.5, 4.2), p(3, 4.2)]);
      P.line("brown", 16, 11, 16 + dx * 14, 11 + dy * 14, 1.1);
    }
    P.ell("brown", 16, 11, 1.5, 1.5);
  }, 32) },
  { tier: 1, name: "cable car", make: () => picture(["sky", "purple", "white", "green", "dkgrey", "red"], P => {
    P.all("sky");
    P.poly("purple", [[0, 32], [0, 20], [7, 11], [13, 18], [21, 8], [32, 19], [32, 32]]);
    P.poly("white", [[7, 11], [4.2, 14.6], [6.5, 13.8], [8.5, 15], [10.6, 14.4]]);
    P.poly("white", [[21, 8], [17.8, 12], [20, 11.2], [22, 12.6], [24.6, 11.6]]);
    P.when("green", (x, y) => y > 26 + Math.sin(x * 0.45) * 1.5);
    P.line("dkgrey", 0, 3, 32, 11, 1.1);
    P.line("dkgrey", 16, 7, 16, 13, 1.4); P.rect("dkgrey", 12, 12, 20, 14);
    P.rect("red", 10, 14, 22, 26); P.rect("none", 10, 25, 11, 26); P.rect("none", 21, 25, 22, 26);
    P.rect("sky", 11.5, 16, 15.5, 21); P.rect("sky", 16.5, 16, 20.5, 21);
  }, 32) },
  { tier: 1, name: "canoe", make: () => picture(["sky", "dkgreen", "teal", "white", "orange", "red", "peach", "brown"], P => {
    P.all("sky");
    P.when("dkgreen", (x, y) => y > 10 + 1.5 * Math.sin(x * 0.8) + Math.sin(x * 0.33) * 1.8 && y < 17);
    P.rect("teal", 0, 17, 32, 32);
    P.when("white", (x, y) => y > 25 && fl(y) % 3 === 1 && (fl(x) * 5 + fl(y) * 3) % 11 < 3);
    P.ell("red", 15, 16.5, 3, 4.5); P.ell("peach", 15, 10.3, 2.3, 2.3);
    P.poly("orange", [[2, 17], [6.5, 20], [25.5, 20], [30, 17], [26, 24], [6, 24]]);
    P.line("brown", 18.5, 10, 23, 26, 1.3); P.rell("brown", 23, 26.5, 1.4, 2.7, -0.25);
  }, 32) },
  { tier: 1, name: "traffic light", make: () => picture(["grey", "red", "yellow", "green", "ink"], P => {
    P.rect("grey", 6, 1, 18, 21); P.rect("grey", 10, 21, 14, 24);
    P.ell("red", 12, 5.5, 2.8, 2.8); P.ell("yellow", 12, 11, 2.8, 2.8); P.ell("green", 12, 16.5, 2.8, 2.8);
    P.outline("ink", true);
  }, 24) },
  { tier: 1, name: "skateboard", make: () => picture(["orange", "teal", "yellow", "ink"], P => {
    P.line("orange", 6, 11, 22, 11, 5.8); P.line("orange", 3, 7.5, 6.5, 11, 5); P.line("orange", 25, 7.5, 21.5, 11, 5);
    P.on("teal", "orange", x => x > 10 && x < 18);
    P.ell("yellow", 8.5, 18, 3.2, 3.2); P.ell("yellow", 19.5, 18, 3.2, 3.2);
    P.outline("ink", true);
    P.rect("ink", 7, 14, 11, 15.5); P.rect("ink", 18, 14, 22, 15.5);
  }, 28) },
  { tier: 1, name: "wheelbarrow", make: () => picture(["green", "brown", "tan", "grey", "ink"], P => {
    P.line("tan", 1.5, 13, 13, 18, 3); P.line("tan", 11, 17, 9.5, 25, 3);
    P.ell("brown", 14.5, 8.5, 9, 4.8);
    P.poly("green", [[4, 8.5], [25, 8.5], [21, 18], [9, 18]]);
    P.ell("ink", 22, 22, 4.2, 4.2); P.ell("grey", 22, 22, 2.1, 2.1);
    P.outline("ink");
  }, 28) },
  { tier: 1, name: "glider", make: () => picture(["sky", "white", "red", "green", "dkgreen"], P => {
    P.all("sky"); P.ell("white", 6, 25, 5, 1.8); P.ell("white", 26, 4, 4, 1.5);
    P.ell("green", 8, 36, 16, 8); P.ell("dkgreen", 26, 37, 14, 8);
    P.line("white", 1.5, 12.5, 30.5, 10.5, 2.4);
    P.poly("white", [[14.5, 6], [17.5, 6], [17, 24], [15.5, 24]]); P.ell("white", 16, 6.5, 1.6, 2.2);
    P.line("white", 11.5, 23, 20.5, 22.5, 2);
    P.on("red", "white", (x, y) => y < 15 && (x < 5 || x > 27));
    P.on("red", "white", (x, y) => y > 21 && x > 14 && x < 18);
  }, 32) },
  { tier: 1, name: "airship", make: () => picture(["sky", "yellow", "white", "grey", "orange"], P => {
    P.all("sky"); P.ell("yellow", 5, 5, 3, 3);
    P.ell("white", 24, 25, 5, 1.8); P.ell("white", 5, 22, 3.5, 1.4); P.ell("white", 27, 4, 3.5, 1.4);
    P.poly("orange", [[23, 10.5], [29.5, 5.5], [30.5, 5.5], [29, 12]]); P.poly("orange", [[23, 16.5], [29.5, 21.5], [30.5, 21.5], [29, 15]]);
    P.ell("grey", 15, 13.5, 12, 5.6);
    P.on("white", "grey", (x, y) => y < 10.5 && x > 7 && x < 21);
    P.rect("orange", 11, 19, 18, 22); P.rect("grey", 12, 18.5, 17, 19.5);
  }, 32) },
  { tier: 1, name: "sledge", make: () => picture(["red", "brown", "grey", "ink"], P => {
    P.rect("red", 4, 10, 26, 15);
    P.rect("brown", 7, 15, 11, 20); P.rect("brown", 19, 15, 23, 20);
    P.rect("grey", 3, 20, 26, 23);
    P.when("grey", (x, y) => { const d = Math.hypot(x - 25, y - 17.5); return x > 25 && d > 2 && d < 5.5; });
    P.outline("ink");
    P.line("brown", 29, 13, 31.5, 7, 1.2);
  }, 32) },
  { tier: 1, name: "wind turbine", make: () => picture(["sky", "yellow", "white", "green", "dkgreen"], P => {
    P.all("sky"); P.ell("yellow", 26, 6, 3.4, 3.4);
    P.ell("dkgreen", 6, 32, 16, 8); P.ell("green", 26, 34, 16, 8);
    P.poly("white", [[14.6, 32], [17.4, 32], [16.7, 11], [15.3, 11]]);
    for (const a of [-Math.PI / 2, Math.PI / 6, 5 * Math.PI / 6]) P.line("white", 16, 11, 16 + Math.cos(a) * 10.5, 11 + Math.sin(a) * 10.5, 1.8);
    P.ell("white", 16, 11, 1.7, 1.7);
  }, 32) },
  { tier: 1, name: "roller skate", make: () => picture(["pink", "white", "grey", "yellow", "ink"], P => {
    P.poly("pink", [[6, 2], [15, 2], [15, 12], [22, 13], [25.5, 16], [25.5, 20], [5, 20]]);
    P.on("white", "pink", (x, y) => x > 18 && y > 12);
    P.rect("grey", 5, 20, 26, 22);
    P.ell("yellow", 9, 24, 2.7, 2.7); P.ell("yellow", 21, 24, 2.7, 2.7);
    P.outline("ink", true);
    for (const ly of [5, 8, 11]) P.line("ink", 12.5, ly, 15, ly + 1.5, 1);
  }, 28) },
  { tier: 1, name: "caravan", make: () => picture(["white", "mint", "sky", "grey", "ink"], P => {
    P.when("white", (x, y) => {
      const cx = Math.max(7, Math.min(22, x)), cy = Math.max(12, Math.min(19, y));
      return Math.hypot(x - cx, y - cy) <= 5;
    });
    P.on("mint", "white", (x, y) => y > 18);
    P.rect("sky", 5, 11, 12, 16); P.rect("white", 15, 10, 20, 23);
    P.rect("sky", 16, 12, 19, 15);
    P.ell("ink", 12, 24, 3.4, 3.4); P.ell("grey", 12, 24, 1.6, 1.6);
    P.outline("ink", true);
    P.line("ink", 27, 21, 31, 22, 1.4); P.rect("ink", 29, 22, 30, 25);
  }, 32) },

  // ----- medium -----
  { tier: 2, name: "tram", make: () => picture(["sky", "tan", "grey", "dkgrey", "red", "white", "yellow"], P => {
    P.all("sky");
    for (const [a, b, c] of [[0, 7, 10], [7, 14, 6], [14, 22, 12], [22, 29, 7], [29, 36, 10]]) P.rect("tan", a, c, b, 31);
    P.rect("grey", 0, 30, 36, 36); P.rect("dkgrey", 0, 31, 36, 32.5);
    P.rect("dkgrey", 0, 2, 36, 3.2);
    P.line("dkgrey", 13, 10.5, 18, 6.5, 1.1); P.line("dkgrey", 18, 6.5, 14, 2.5, 1.1);
    P.when("red", (x, y) => x > 2 && x < 34 && y > 10 && y < 30 && !(y < 12 && (x < 4 || x > 32)));
    P.rect("white", 3, 12, 33, 20);
    for (const wx of [4, 10, 22]) P.rect("sky", wx, 13, wx + 5, 19);
    P.rect("sky", 28, 13, 32.5, 19);
    P.rect("white", 15.5, 12, 20.5, 28); P.rect("sky", 16.5, 13, 19.5, 27); P.rect("white", 17.5, 13, 18.5, 27);
    P.rect("dkgrey", 3, 27, 33, 30.5);
    P.rect("yellow", 30.5, 22, 33, 25);
  }, 36) },
  { tier: 2, name: "bulldozer", make: () => picture(["yellow", "sky", "grey", "orange", "ink"], P => {
    P.line("ink", 10, 31, 26, 31, 9);
    P.ell("grey", 10, 31, 3, 3); P.ell("grey", 26, 31, 3, 3); P.ell("grey", 16, 32, 1.9, 1.9); P.ell("grey", 20.5, 32, 1.9, 1.9);
    P.rect("yellow", 6, 17, 21, 27); P.rect("yellow", 20, 15, 31, 27);
    P.rect("yellow", 8, 6, 20, 18); P.rect("sky", 10, 8, 18, 15);
    P.line("yellow", 29, 23, 34, 27, 2.6);
    P.poly("grey", [[32, 15], [36, 15], [38.5, 25], [37, 36], [32, 36]]);
    P.outline("ink", true);
    P.rect("ink", 26, 9, 27.6, 15);
    P.rect("ink", 11, 2, 17, 6); P.rect("orange", 12, 3, 16, 6);
  }, 40) },
  { tier: 2, name: "motorbike", make: () => picture(["red", "tan", "grey", "yellow", "ink"], P => {
    for (const cx of [9, 31]) { P.ell("ink", cx, 29, 6.6, 6.6); P.ell("grey", cx, 29, 4.3, 4.3); P.ell("ink", cx, 29, 1.6, 1.6); }
    P.when("red", (x, y) => { const d = Math.hypot(x - 9, y - 29); return d > 6.7 && d < 9 && y < 25 && x > 2 && x < 15; });
    P.when("red", (x, y) => { const d = Math.hypot(x - 31, y - 29); return d > 6.7 && d < 9 && y < 25 && x > 25 && x < 37; });
    P.rect("grey", 16, 21, 25, 27.5);
    P.poly("red", [[8, 19], [17, 19], [17, 24], [12, 24]]);
    P.poly("tan", [[4.5, 15.5], [17.5, 15], [17.5, 20], [6.5, 20]]);
    P.poly("red", [[17, 15], [24.5, 13], [29, 16], [27, 21.5], [17, 21.5]]);
    P.outline("ink", true);
    P.line("ink", 9, 29, 17, 25.5, 2.2);
    P.line("ink", 31, 29, 27.5, 13, 2.2); P.line("ink", 28, 13, 24, 10, 1.5);
    P.ell("yellow", 30.4, 16.8, 1.9, 1.9);
  }, 40) },
  { tier: 2, name: "camper van", make: () => picture(["sky", "yellow", "green", "teal", "white", "orange", "dkgrey", "grey"], P => {
    P.all("sky"); P.ell("yellow", 5, 5, 3, 3); P.ell("green", 8, 40, 22, 12); P.ell("green", 30, 40, 18, 11);
    P.rect("green", 0, 30, 36, 36);
    P.poly("orange", [[8, 10.5], [24, 10.5], [22, 6], [10, 6]]);
    P.when("white", (x, y) => {
      const cx = Math.max(8, Math.min(28, x)), cy = Math.max(14, Math.min(24, y));
      return Math.hypot(x - cx, y - cy) <= 4;
    });
    P.on("teal", "white", (x, y) => y > 20);
    for (const wx of [6, 13, 20]) P.rect("sky", wx, 13, wx + 5, 18);
    P.when("sky", (x, y) => x > 27 && y > 13 && y < 18 && Math.hypot(x - Math.min(x, 28.5), y - Math.max(y, 15)) < 2.8);
    P.ell("white", 30.5, 23, 1.6, 1.6);
    P.ell("dkgrey", 10, 28, 3.6, 3.6); P.ell("dkgrey", 26, 28, 3.6, 3.6);
    P.ell("grey", 10, 28, 1.6, 1.6); P.ell("grey", 26, 28, 1.6, 1.6);
  }, 36) },
  { tier: 2, name: "ferry", make: () => picture(["sky", "white", "blue", "teal", "navy", "red", "grey"], P => {
    P.all("sky"); P.ell("white", 6, 4, 4, 1.5); P.ell("white", 30, 7, 4, 1.5);
    P.ell("grey", 21, 4, 2.6, 1.6); P.ell("grey", 24.5, 2, 2.2, 1.3);
    P.rect("blue", 0, 25, 36, 36);
    P.when("teal", (x, y) => y > 27 && fl(y) % 3 === 0 && (fl(x) * 2 + fl(y) * 3) % 9 < 3);
    P.rect("red", 16, 6, 21, 11);
    P.rect("white", 6, 15, 30, 22); P.rect("white", 9, 10.5, 27, 15);
    P.on("navy", "white", (x, y) => (fl(y) === 17 || fl(y) === 12) && fl(x) % 2 === 0 && x > 7 && x < 29);
    P.poly("navy", [[2, 21.5], [34, 21.5], [31, 28], [5, 28]]);
    P.rect("white", 3, 23, 33.5, 24);
  }, 36) },
  { tier: 2, name: "tugboat", make: () => picture(["sky", "blue", "teal", "red", "white", "yellow", "dkgrey"], P => {
    P.all("sky"); P.ell("white", 25, 4, 4, 1.5);
    P.ell("white", 7, 4, 2.4, 1.6); P.ell("white", 9.5, 1.5, 2, 1.2);
    P.rect("blue", 0, 23, 32, 32);
    P.when("teal", (x, y) => y > 25 && fl(y) % 3 === 1 && (fl(x) * 2 + fl(y) * 5) % 9 < 3);
    P.rect("yellow", 6, 7, 11, 18); P.rect("dkgrey", 6, 7, 11, 9);
    P.rect("dkgrey", 21, 5, 22, 11);
    P.rect("white", 14, 11, 25, 19); P.rect("sky", 15, 13, 19, 16); P.rect("sky", 20, 13, 24, 16);
    P.poly("red", [[2, 18], [24, 18], [30.5, 15], [27.5, 25], [5, 25]]);
    for (const fx of [8, 13, 18, 23]) P.ell("dkgrey", fx, 21.5, 1.6, 1.6);
  }, 32) },
  { tier: 2, name: "biplane", make: () => picture(["sky", "white", "green", "red", "yellow", "dkgrey"], P => {
    P.all("sky"); P.ell("white", 7, 5, 5, 1.8); P.ell("white", 29, 28, 5, 1.8); P.ell("white", 4, 30, 3.5, 1.2);
    P.ell("green", 18, 42, 24, 8);
    P.line("dkgrey", 12, 11, 12, 21, 1.1); P.line("dkgrey", 24, 11, 24, 21, 1.1);
    P.line("dkgrey", 18, 20, 19, 25, 1.1); P.ell("dkgrey", 19.5, 25.5, 2, 2);
    P.poly("red", [[5, 17], [27, 14.5], [31, 16.5], [31, 19.5], [27, 21.5], [8, 20]]);
    P.poly("red", [[3, 10], [7, 10], [10, 17.5], [4.5, 19]]);
    P.rell("yellow", 18, 10.5, 10, 1.9, -0.05); P.rell("yellow", 17.5, 21.5, 9.5, 1.9, -0.05);
    P.rect("yellow", 3, 17, 10, 18.5);
    P.ell("dkgrey", 32.5, 18, 1, 5.2); P.ell("dkgrey", 18.5, 14.5, 1.6, 1.4);
  }, 36) },
  { tier: 2, name: "airliner", make: () => picture(["sky", "white", "blue", "navy", "grey", "yellow"], P => {
    P.all("sky"); P.ell("yellow", 30, 5, 3.2, 3.2);
    P.ell("white", 8, 31, 6, 2); P.ell("white", 13, 33, 6, 2); P.ell("white", 28, 32, 5, 1.7);
    P.poly("blue", [[2.5, 16.5], [3.5, 7], [6.5, 7], [10, 16.5]]);
    P.line("white", 6, 18, 29, 18, 5); P.ell("white", 29.5, 18.5, 4, 2.5);
    P.poly("white", [[1.5, 15.5], [8, 15.5], [8, 20.5], [4, 18.5]]);
    P.poly("blue", [[2, 18], [8.5, 18], [6.5, 20.5], [1.5, 20]]);
    P.rect("blue", 7, 19.5, 31, 20.6);
    P.on("navy", "white", (x, y) => fl(y) === 17 && x > 9 && x < 27 && fl(x) % 2 === 0);
    P.rect("navy", 29, 16, 31.5, 17);
    P.poly("blue", [[13, 20], [21, 20], [14, 28.5], [10.5, 28.5]]);
    P.rell("grey", 16.5, 23.5, 2.8, 1.6, 0);
  }, 36) },
  { tier: 2, name: "helicopter", make: () => picture(["blue", "sky", "white", "grey", "ink"], P => {
    P.line("blue", 20, 18.5, 33, 13.5, 3.2);
    P.poly("blue", [[30.5, 15], [33, 8.5], [35, 8.5], [34, 16]]);
    P.ell("grey", 31.5, 9.5, 3.8, 3.8);
    P.rect("blue", 11, 10, 18, 14);
    P.ell("blue", 14, 20, 10, 7);
    P.when("sky", (x, y) => ((x - 14) / 10) ** 2 + ((y - 20) / 7) ** 2 <= 1 && x < 13 && y < 20.5);
    P.on("white", "blue", (x, y) => y > 21.5 && y < 25 && x < 24);
    P.outline("ink", true);
    P.rect("ink", 14, 7, 15.6, 10); P.line("ink", 1, 7, 29, 7, 1.5);
    P.line("ink", 9, 26.5, 8.5, 31, 1.3); P.line("ink", 19, 26.5, 19.5, 31, 1.3);
    P.line("ink", 4, 31.5, 25, 31.5, 1.5); P.line("ink", 4, 31.5, 2, 29.5, 1.3);
  }, 36) },
  { tier: 2, name: "cement mixer", make: () => picture(["grey", "yellow", "orange", "sky", "ink"], P => {
    const drum = (x, y) => { const a = -0.22, u = (x - 15) * Math.cos(a) + (y - 16.5) * Math.sin(a), v = -(x - 15) * Math.sin(a) + (y - 16.5) * Math.cos(a); return (u / 12.5) ** 2 + (v / 7.5) ** 2 <= 1; };
    P.rect("grey", 2, 25, 37, 28.5);
    P.poly("orange", [[21, 19], [25, 19], [26, 25.5], [19, 25.5]]);
    P.when("grey", drum);
    P.when("yellow", (x, y) => drum(x, y) && ((x + y * 0.7) % 7 + 7) % 7 < 2.4);
    P.poly("orange", [[27, 12], [33.5, 12], [37.5, 19], [37.5, 28], [27, 28]]);
    P.poly("sky", [[28.5, 13.5], [33, 13.5], [36, 19], [28.5, 19]]);
    for (const cx of [9, 17, 32]) { P.ell("ink", cx, 29.5, 3.8, 3.8); P.ell("grey", cx, 29.5, 1.7, 1.7); }
    P.outline("ink", true);
  }, 40) },
  { tier: 2, name: "dump truck", make: () => picture(["yellow", "tan", "red", "sky", "grey", "ink"], P => {
    P.ell("tan", 14, 14.5, 10.5, 5); P.rect("none", 0, 15, 40, 40);
    P.poly("yellow", [[2, 14], [26, 14], [25, 25], [4, 25]]);
    P.poly("red", [[27, 11], [33, 11], [37.5, 18], [37.5, 26], [27, 26]]);
    P.poly("sky", [[28.5, 12.5], [32.4, 12.5], [35.6, 18], [28.5, 18]]);
    P.rect("grey", 3, 25, 38, 27.5);
    for (const cx of [9, 17, 32]) { P.ell("ink", cx, 29, 3.8, 3.8); P.ell("grey", cx, 29, 1.7, 1.7); }
    P.outline("ink", true);
  }, 40) },
  { tier: 2, name: "forklift", make: () => picture(["orange", "grey", "tan", "brown", "ink"], P => {
    P.poly("orange", [[6, 17], [22, 17], [22, 29], [3, 29], [3, 21]]);
    P.rect("grey", 22.5, 4, 25.5, 31);
    P.rect("brown", 26, 25, 35, 28.5);
    P.rect("tan", 27, 13, 34, 25);
    P.ell("ink", 9, 29.5, 3.8, 3.8); P.ell("ink", 19, 29.5, 3.8, 3.8);
    P.ell("grey", 9, 29.5, 1.7, 1.7); P.ell("grey", 19, 29.5, 1.7, 1.7);
    P.outline("ink", true);
    P.line("ink", 8, 17, 9, 7, 1.4); P.line("ink", 20.5, 17, 20, 7, 1.4); P.line("ink", 7.5, 7, 21, 7, 1.6);
    P.rect("ink", 25, 28.5, 35, 30);
    P.rect("brown", 27, 18.5, 34, 19.5);
  }, 36) },
  { tier: 2, name: "ice cream van", make: () => picture(["white", "pink", "sky", "tan", "grey", "ink"], P => {
    P.poly("tan", [[11, 5], [21, 5], [16, 13]]);
    P.ell("pink", 16, 3.8, 4.6, 3.3);
    P.rect("white", 3, 12, 29, 30);
    P.poly("white", [[28, 15], [32, 15], [37, 22], [37, 30], [28, 30]]);
    P.poly("sky", [[29.5, 16.5], [31.4, 16.5], [35, 22], [29.5, 22]]);
    P.rect("sky", 8, 15, 23, 22);
    P.rect("pink", 7, 13, 24, 15.5); P.on("white", "pink", (x, y) => y > 13 && y < 15.5 && fl(x / 2) % 2 === 0);
    P.rect("pink", 3, 24, 37, 26.5);
    P.rect("grey", 2, 28, 38, 30.5);
    P.ell("ink", 10, 30.5, 3.8, 3.8); P.ell("ink", 30, 30.5, 3.8, 3.8);
    P.ell("grey", 10, 30.5, 1.7, 1.7); P.ell("grey", 30, 30.5, 1.7, 1.7);
    P.outline("ink", true);
  }, 40) },
  { tier: 2, name: "steamroller", make: () => picture(["green", "red", "grey", "gold", "ink"], P => {
    P.rect("green", 1, 3, 22, 6.5);
    P.rect("green", 2, 13, 14, 23);
    P.rect("green", 13, 14, 33, 22); P.rect("green", 32, 13, 35, 23);
    P.rect("green", 28.5, 6, 32.5, 14);
    P.poly("green", [[27, 22], [36, 22], [34, 25], [29, 25]]);
    P.ell("grey", 31.5, 31, 6.5, 6.5);
    P.ell("red", 10, 28, 8.5, 8.5);
    P.outline("ink", true);
    P.ell("ink", 31.5, 31, 1.6, 1.6);
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; P.line("ink", 10 + Math.cos(a) * 2, 28 + Math.sin(a) * 2, 10 + Math.cos(a) * 7, 28 + Math.sin(a) * 7, 1); }
    P.ell("gold", 10, 28, 2, 2);
    P.line("ink", 4, 6, 4, 13, 1.5); P.line("ink", 19.5, 6, 19.5, 14, 1.5);
    P.rect("gold", 18, 15, 20, 21); P.rect("gold", 25, 15, 27, 21);
    P.rect("ink", 27.5, 3, 33.5, 6); P.rect("gold", 28.5, 4, 32.5, 6);
  }, 40) },
  { tier: 2, name: "gondola", make: () => picture(["sky", "orange", "white", "dkgrey", "teal", "blue", "peach", "yellow"], P => {
    P.all("sky");
    P.rect("orange", 0, 5, 14, 23); P.rect("white", 14, 9, 25, 23); P.rect("orange", 25, 3, 36, 23);
    P.on("dkgrey", ["orange", "white"], (x, y) => y > 7 && y < 21 && fl(x) % 4 === 1 && fl(y) % 6 > 1 && fl(y) % 6 < 5 || (fl(x) % 4 === 2 && fl(y) % 6 > 1 && fl(y) % 6 < 5 && y > 7 && y < 21));
    P.rect("teal", 0, 23, 36, 36);
    P.when("white", (x, y) => y > 33 && fl(y) % 2 === 0 && (fl(x) * 3) % 8 < 3);
    P.rect("white", 31, 13, 33.5, 33); P.on("blue", "white", (x, y) => x > 30 && fl(y) % 4 < 2 && y > 13 && y < 33);
    P.rect("dkgrey", 8, 23, 11, 27);
    P.rect("white", 7.5, 16, 11.5, 23); P.on("blue", "white", (x, y) => x > 7 && x < 12 && y > 16 && y < 23 && fl(y) % 2 === 1);
    P.ell("peach", 9.5, 14, 2.3, 2.1); P.rect("yellow", 6.5, 11.5, 12.5, 12.8); P.rect("yellow", 8, 10, 11, 12);
    P.poly("dkgrey", [[1.5, 25], [5, 28], [27, 28], [31, 25], [33, 19.5], [33.5, 21], [32, 26.5], [27.5, 31], [6.5, 31]]);
    P.line("dkgrey", 12, 18, 21, 33, 1.1);
  }, 36) },
  { tier: 2, name: "high-speed train", make: () => picture(["sky", "white", "green", "dkgreen", "blue", "navy", "grey", "dkgrey"], P => {
    P.all("sky"); P.ell("white", 9, 6, 6, 2); P.ell("white", 31, 9, 5, 1.6);
    P.ell("dkgreen", 30, 30, 16, 12); P.ell("green", 6, 32, 16, 14);
    P.rect("green", 0, 26, 40, 40);
    P.rect("grey", 0, 32, 40, 36); P.rect("dkgrey", 0, 30.5, 40, 32);
    P.poly("white", [[0, 16], [21, 16], [29, 17.5], [35, 21], [39, 25.5], [39, 29.5], [0, 29.5]]);
    P.on("blue", "white", (x, y) => y >= 25 && y < 27);
    P.on("navy", "white", (x, y) => y >= 18.5 && y < 21.5 && x < 19 && fl(x) % 4 !== 3);
    P.poly("navy", [[23, 18], [29, 18.8], [34, 22.5], [23, 22.5]]);
    P.on("dkgrey", ["white", "blue"], x => fl(x) === 20);
    P.rect("dkgrey", 2, 29.5, 9, 31); P.rect("dkgrey", 26, 29.5, 33, 31);
  }, 40) },
  { tier: 2, name: "hovercraft", make: () => picture(["sky", "white", "blue", "dkgrey", "red", "navy", "grey"], P => {
    P.all("sky"); P.ell("white", 27, 4, 5, 1.7);
    P.rect("blue", 0, 26, 36, 36);
    P.ell("white", 3, 28.5, 4.5, 2.4); P.ell("white", 33, 28.5, 4.5, 2.4); P.ell("white", 18, 30, 15, 1.6);
    P.when("white", (x, y) => y > 32 && fl(y) % 2 === 1 && (fl(x) * 5 + fl(y)) % 9 < 2);
    P.line("dkgrey", 6, 24.5, 31, 24.5, 7);
    P.rect("grey", 7, 13, 9, 17);
    P.when("grey", (x, y) => { const d = Math.hypot(x - 8, y - 8.5); return d > 2.9 && d < 5.2; });
    P.line("dkgrey", 8, 5, 8, 12, 1.2);
    P.rect("red", 4, 16, 32, 21.5); P.ell("red", 31, 18.8, 2.6, 2.75);
    P.rect("white", 12, 10, 28, 16); P.ell("white", 27.5, 13, 3, 3); P.rect("red", 24, 16, 31, 17);
    for (const wx of [13, 17, 21, 25]) P.rect("navy", wx, 11.5, wx + 2.6, 14);
  }, 36) },
  { tier: 2, name: "ocean liner", make: () => picture(["sky", "white", "blue", "navy", "red", "orange", "grey"], P => {
    P.all("sky");
    for (const [cx, cy] of [[11, 4], [14, 2.5], [19, 6], [22, 4]]) P.ell("grey", cx, cy, 2.5, 1.6);
    P.rect("blue", 0, 28, 40, 40);
    P.when("white", (x, y) => y > 31 && fl(y) % 3 === 0 && (fl(x) * 5 + fl(y)) % 13 < 3);
    for (const fx of [10, 16, 22]) { P.rect("orange", fx, 7, fx + 4, 16); P.rect("navy", fx, 7, fx + 4, 9); }
    P.rect("white", 6, 15, 33, 21); P.rect("white", 9, 13, 29, 15);
    P.on("navy", "white", (x, y) => fl(y) === 17 && fl(x) % 2 === 1 && x > 7 && x < 32);
    P.poly("navy", [[1, 20.5], [37, 20.5], [34, 31], [5, 31]]);
    P.on("red", "navy", (x, y) => y > 28);
    P.on("white", "navy", (x, y) => fl(y) === 23 && fl(x) % 3 === 1 && x > 4 && x < 34);
  }, 40) },
  { tier: 2, name: "sewing machine 2", make: () => picture(["teal", "white", "red", "grey", "tan", "ink"], P => {
    P.rect("tan", 1, 27, 35, 32);
    P.rect("teal", 4, 22, 30, 27);
    P.rect("teal", 22, 9, 30, 22);
    P.rect("teal", 5, 9, 30, 15);
    P.rect("teal", 4, 9, 11, 20);
    P.ell("grey", 31, 13, 4.4, 4.4);
    P.outline("ink", true);
    P.rect("white", 6, 22, 17, 23.5);
    P.line("ink", 8, 19, 8, 22.5, 1);
    P.rect("ink", 16.5, 8, 17.5, 9);
    P.rect("red", 15, 3, 19, 7.5); P.rect("white", 14, 1.5, 20, 3); P.rect("white", 14, 7, 20, 8.5);
    P.line("red", 14.5, 5, 9, 9.2, 0.8);
  }, 36) },
  { tier: 2, name: "auto rickshaw", make: () => picture(["yellow", "green", "tan", "sky", "grey", "ink"], P => {
    P.poly("yellow", [[4, 14], [5, 8], [9, 4], [25, 4], [29.5, 8], [30.5, 14]]);
    P.rect("none", 9, 9, 26, 14);
    P.rect("yellow", 4, 13, 9, 20);
    P.poly("sky", [[26, 9], [28.8, 9], [30, 14], [30, 19], [26, 19]]);
    P.rect("tan", 9, 15, 19, 20);
    P.poly("green", [[3, 20], [30.5, 19], [34, 25], [34, 28], [3, 28]]);
    P.ell("ink", 10, 28.5, 3.8, 3.8); P.ell("ink", 30, 28.5, 3.2, 3.2);
    P.ell("grey", 10, 28.5, 1.7, 1.7); P.ell("grey", 30, 28.5, 1.4, 1.4);
    P.outline("ink", true);
  }, 36) },

  // ----- complex -----
  { tier: 3, name: "digger", make: () => picture(["yellow", "sky", "grey", "orange", "brown", "ink"], P => {
    P.line("ink", 8, 37, 25, 37, 8);
    for (const wx of [8, 13, 19, 25]) P.ell("grey", wx, 37, 2.2, 2.2);
    P.rect("yellow", 3, 25, 28, 33); P.ell("yellow", 4, 29, 2.5, 4);
    P.rect("yellow", 14, 11, 26, 25); P.rect("sky", 16, 13, 24, 21);
    P.line("yellow", 25, 27, 33.5, 8, 4.2);
    P.line("yellow", 33.5, 8, 40, 25, 3.4);
    P.line("grey", 23, 21, 30.5, 12, 1.6);
    P.poly("brown", [[35, 24.5], [44.5, 24.5], [44, 19], [40.5, 17], [36, 19.5]]);
    P.poly("grey", [[35, 24], [44, 24], [43, 32], [40, 33.5], [36, 31]]);
    P.outline("ink", true);
    P.rect("ink", 9, 19, 10.6, 25);
    for (const tx of [37, 39.5, 42]) P.rect("ink", tx, 33.5, tx + 1, 35);
    P.rect("ink", 16, 7, 22, 11); P.rect("orange", 17, 8, 21, 11);
  }, 44) },
  { tier: 3, name: "crane", make: () => picture(["sky", "white", "yellow", "grey", "dkgrey", "red", "tan", "brown"], P => {
    P.all("sky"); P.ell("white", 32, 18, 5, 1.7); P.ell("white", 6, 22, 4.5, 1.5);
    P.rect("brown", 0, 41, 44, 44);
    P.rect("tan", 22, 30, 42, 41); P.on("dkgrey", "tan", (x, y) => fl(y) % 4 === 2 && y < 40 && fl(x) % 4 > 0 && fl(x) % 4 < 3 || false);
    P.rect("tan", 22, 30, 42, 31);
    P.line("dkgrey", 14.5, 2, 43, 8, 0.8); P.line("dkgrey", 14.5, 2, 2, 8, 0.8);
    P.poly("yellow", [[12, 8], [17, 8], [14.5, 1.5]]);
    P.rect("yellow", 2, 8, 44, 11);
    P.on("sky", "yellow", (x, y) => fl(y) === 9 && fl(x) % 2 === 1 && (x > 18 || x < 11));
    P.rect("yellow", 12, 11, 17, 41);
    P.on("sky", "yellow", (x, y) => y > 11 && x > 13 && x < 16 && ![0, 1].includes(((fl(y) - fl(x)) % 6 + 6) % 6) && ![2, 3].includes(((fl(y) + fl(x)) % 6 + 6) % 6));
    P.rect("grey", 3, 11, 9, 16);
    P.rect("red", 17, 11, 22, 15);
    P.rect("dkgrey", 32, 11, 35, 12.5); P.line("dkgrey", 33.5, 12, 33.5, 23, 0.9);
    P.line("dkgrey", 33.5, 23, 28, 27, 0.9); P.line("dkgrey", 33.5, 23, 39, 27, 0.9);
    P.rect("red", 25, 27, 42, 29.5);
  }, 44) },
  { tier: 3, name: "fire engine", make: () => picture(["red", "white", "grey", "sky", "blue", "yellow", "ink"], P => {
    P.rect("red", 3, 19, 37, 37);
    P.poly("red", [[35, 14], [41, 14], [45.5, 22], [45.5, 37], [35, 37]]);
    P.poly("sky", [[36.5, 16], [40.5, 16], [44, 22.5], [36.5, 22.5]]);
    for (const [a, b] of [[5, 14], [16, 25], [27, 34]]) P.rect("grey", a, 22, b, 31);
    P.rect("white", 3, 32.5, 46, 34.5);
    P.rect("grey", 2, 35, 47, 37);
    for (const cx of [11, 22, 38]) { P.ell("ink", cx, 37.5, 4.6, 4.6); P.ell("grey", cx, 37.5, 2, 2); }
    P.outline("ink", true);
    P.rect("ink", 1, 13, 36, 19); P.rect("white", 1, 14, 36, 15); P.rect("white", 1, 17, 36, 18);
    P.on("white", "ink", (x, y) => y > 15 && y < 17 && x < 36 && fl(x) % 3 === 1);
    P.rect("ink", 30, 19, 32, 20);
    P.rect("ink", 36, 10, 44, 14); P.rect("blue", 37, 11, 43, 14);
    P.rect("yellow", 42, 27, 45, 30);
    for (const [a, b] of [[5, 14], [16, 25], [27, 34]]) P.on("ink", "grey", (x, y) => x > a + 1 && x < b - 1 && fl(y) % 3 === 0);
  }, 48) },
  { tier: 3, name: "canal barge", make: () => picture(["sky", "white", "dkgreen", "green", "teal", "dkgrey", "red", "yellow", "tan"], P => {
    P.all("sky"); P.ell("white", 9, 5, 5, 1.8); P.ell("white", 34, 7, 5, 1.6);
    P.when("dkgreen", (x, y) => y > 11 + 2 * Math.sin(x * 0.5) + 1.3 * Math.sin(x * 1.3) && y < 21);
    P.rect("green", 0, 20, 44, 23);
    P.rect("teal", 0, 23, 44, 38);
    P.when("white", (x, y) => y > 34 && y < 38 && fl(y) % 2 === 1 && (fl(x) * 7 + fl(y)) % 12 < 3);
    P.rect("tan", 0, 38, 44, 44); P.rect("green", 0, 37, 44, 38.5);
    P.when("white", (x, y) => Math.hypot(x - 33 - (16 - y) * 0.6, y - 12) < 1.6 || Math.hypot(x - 36 - (16 - y) * 0.6, y - 8) < 2);
    P.rect("dkgrey", 31, 15, 33, 22); P.rect("yellow", 31, 17, 33, 18);
    P.rect("red", 6, 21, 37, 28.5); P.rect("dkgrey", 5, 20, 38, 21.5);
    for (const px of [11, 17, 23, 29]) P.ell("yellow", px, 24.5, 1.5, 1.5);
    P.poly("dkgrey", [[2, 28], [38, 28], [42.5, 25], [41, 32.5], [4, 32.5]]);
    P.rect("yellow", 3, 28.5, 40, 29.5);
    P.line("dkgrey", 4, 28, 1.5, 23, 1.1);
  }, 44) },
  { tier: 3, name: "seaplane", make: () => picture(["sky", "white", "lilac", "dkgreen", "blue", "yellow", "red", "dkgrey"], P => {
    P.all("sky"); P.ell("white", 9, 5, 6, 2); P.ell("white", 33, 9, 5, 1.6);
    P.poly("lilac", [[0, 26], [0, 18], [8, 11], [15, 17], [26, 8], [36, 16], [44, 12], [44, 26]]);
    P.when("dkgreen", (x, y) => y > 21 + ((fl(x) % 4) - 1.5) ** 2 * -0.8 + 1 && y < 27);
    P.rect("blue", 0, 26, 44, 44);
    P.when("white", (x, y) => y > 38 && fl(y) % 3 === 0 && (fl(x) * 5 + fl(y)) % 11 < 3);
    P.line("dkgrey", 16, 26, 14, 33, 1.1); P.line("dkgrey", 30, 26, 31, 33, 1.1);
    P.poly("white", [[9, 33], [36, 33], [40, 31], [38.5, 35.5], [10, 35.5]]);
    P.poly("yellow", [[4, 13], [8, 13], [12, 20], [7, 22]]);
    P.poly("yellow", [[6, 21], [14, 19], [33, 19], [37.5, 22], [37.5, 27], [14, 27], [7, 23.5]]);
    P.rell("red", 22, 17.8, 12, 1.8, 0);
    P.rect("sky", 25, 21, 28.5, 24); P.rect("sky", 29.5, 21, 33, 24);
    P.rect("red", 7, 23.5, 37, 24.6);
    P.ell("dkgrey", 39, 24.5, 1, 5);
  }, 44) },
  { tier: 3, name: "water wheel", make: () => picture(["sky", "white", "grey", "red", "brown", "tan", "blue", "green"], P => {
    P.all("sky"); P.ell("white", 8, 5, 5, 1.8);
    P.rect("green", 0, 34, 44, 38);
    P.rect("grey", 24, 14, 44, 36); P.poly("red", [[21, 15], [33, 4], [44, 4], [44, 15]]);
    P.on("white", "grey", (x, y) => (fl(y) % 4 === 0 && y > 15) || (fl(y) % 4 > 0 && (fl(x) + (fl(y / 4) % 2) * 3) % 6 === 0 && y > 15));
    P.rect("brown", 35, 25, 41, 36); P.ell("brown", 38, 25, 3, 2.5);
    P.rect("brown", 30, 18, 34, 22);
    P.when("brown", (x, y) => { const d = Math.hypot(x - 16, y - 26); return d > 9.5 && d < 11.8; });
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 6; P.line("brown", 16 - Math.cos(a) * 10, 26 - Math.sin(a) * 10, 16 + Math.cos(a) * 10, 26 + Math.sin(a) * 10, 1.2); }
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + 0.26; P.line("tan", 16 + Math.cos(a) * 10.5, 26 + Math.sin(a) * 10.5, 16 + Math.cos(a) * 13.5, 26 + Math.sin(a) * 13.5, 1.8); }
    P.ell("tan", 16, 26, 2.4, 2.4);
    P.rect("tan", 0, 9.5, 15, 12); P.rect("blue", 0, 8, 15, 9.6);
    P.when("blue", (x, y) => y > 8 && y < 14 && x > 14 && x < 17.5 - (14 - y) * 0.1);
    P.rect("blue", 0, 37, 44, 44);
    P.when("white", (x, y) => y > 37 && y < 41 && Math.abs(x - 16) < 11 && (fl(x) + fl(y)) % 3 === 0);
  }, 44) },
  { tier: 3, name: "harbour", make: () => picture(["sky", "green", "white", "yellow", "red", "grey", "blue", "teal", "brown"], P => {
    P.all("sky"); P.ell("white", 36, 5, 6, 2);
    P.ell("green", 10, 22, 18, 10); P.ell("green", 38, 22, 16, 9);
    const houses = [[1, 8, "white", 14], [8, 15, "yellow", 12], [15, 22, "white", 15], [22, 30, "yellow", 11], [30, 37, "white", 14], [37, 47, "yellow", 13]];
    for (const [a, b, k, top] of houses) {
      P.rect(k, a, top, b, 30); P.poly("red", [[a - 0.5, top + 0.5], [(a + b) / 2, top - 4], [b + 0.5, top + 0.5]]);
      P.on("blue", k, (x, y) => x > a && x < b && y > top + 2 && y < 28 && fl(x) % 3 === 1 && fl(y) % 4 < 2);
    }
    P.rect("grey", 0, 29, 48, 34);
    P.on("white", "grey", (x, y) => fl(y) === 31 || (fl(x) + (fl(y) > 31 ? 3 : 0)) % 6 === 0);
    P.rect("brown", 30, 26, 35, 29); P.rect("brown", 36, 27, 40, 29);
    P.rect("blue", 0, 34, 48, 48);
    P.when("teal", (x, y) => y > 35 && fl(y) % 3 === 0 && (fl(x) * 3 + fl(y)) % 10 < 3);
    P.line("brown", 12, 25, 12, 39, 1.2);
    P.rect("white", 13, 34, 19, 39);
    P.poly("yellow", [[3, 38.5], [24, 38.5], [21, 44], [6, 44]]);
    P.rect("white", 30, 36, 37, 41); P.rect("blue", 31, 37, 33, 39); P.rect("blue", 34, 37, 36, 39);
    P.poly("red", [[26, 40.5], [46, 40.5], [43, 46], [29, 46]]);
  }, 48) },
  { tier: 3, name: "railway station", make: () => picture(["sky", "green", "maroon", "white", "dkgrey", "blue", "grey", "tan", "yellow"], P => {
    P.all("sky"); P.ell("white", 10, 2, 6, 1.6);
    P.rect("maroon", 0, 10, 48, 20);
    P.on("white", "maroon", (x, y) => y > 12 && fl(x) % 8 > 4 && y < 19 && Math.hypot(fl(x) % 8 - 6, y - 14) < 1.8 || (y >= 14 && y < 19 && fl(x) % 8 > 4 && fl(x) % 8 < 7));
    P.poly("green", [[0, 4], [48, 4], [48, 9], [0, 9]]);
    P.when("green", (x, y) => y >= 9 && y < 11 && fl(x) % 4 < 2 + (y < 10 ? 1 : 0) - (y >= 10 ? 1 : 0));
    P.rect("dkgrey", 0, 3, 48, 4.4);
    P.ell("white", 27, 15, 3.2, 3.2); P.line("dkgrey", 27, 15, 27, 12.8, 0.9); P.line("dkgrey", 27, 15, 28.8, 15.8, 0.9);
    P.rect("dkgrey", 26.5, 10, 27.5, 12);
    P.rect("blue", 0, 19, 40, 33); P.ell("blue", 40, 26, 6, 7); P.rect("blue", 40, 26, 46, 33);
    P.rect("grey", 0, 18, 40, 20); P.ell("grey", 40, 20, 5, 2);
    for (const wx of [2, 9, 16, 26, 33]) P.rect("white", wx, 22, wx + 5, 26);
    P.rect("yellow", 22, 21, 24.5, 32);
    P.rect("white", 39.5, 21.5, 45, 25.5); P.ell("yellow", 44.5, 29, 1.4, 1.4);
    P.rect("dkgrey", 0, 33, 48, 35.5);
    P.rect("tan", 0, 35.5, 48, 48); P.rect("yellow", 0, 36, 48, 37.5);
    P.rect("dkgrey", 6, 9, 8.5, 46); P.rect("dkgrey", 40, 9, 42.5, 46);
    P.rect("dkgrey", 4.5, 9, 10, 10.5); P.rect("dkgrey", 38.5, 9, 44, 10.5);
  }, 48) },
  { tier: 3, name: "combine harvester", make: () => picture(["sky", "white", "green", "red", "gold", "yellow", "dkgrey", "grey"], P => {
    P.all("sky"); P.ell("white", 8, 6, 5, 1.8); P.ell("white", 34, 4, 4, 1.4);
    P.rect("gold", 0, 25, 44, 44);
    P.on("yellow", "gold", (x, y) => (fl(x) * 3 + fl(y)) % 5 === 0);
    P.when("yellow", (x, y) => y > 22 && y < 25 && x > 34 && fl(x) % 2 === 0);
    P.line("green", 13, 13, 3, 8, 2.4);
    P.rect("green", 9, 13, 34, 31);
    P.rect("green", 25, 5, 34, 13); P.rect("sky", 26.5, 6.5, 33, 12);
    P.rect("grey", 32, 26, 44, 32);
    P.ell("red", 38.5, 24, 5, 5); P.ell("sky", 38.5, 24, 3.2, 3.2);
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4; P.line("red", 38.5 - Math.cos(a) * 4.5, 24 - Math.sin(a) * 4.5, 38.5 + Math.cos(a) * 4.5, 24 + Math.sin(a) * 4.5, 1); }
    P.on("yellow", "green", (x, y) => y > 18 && y < 20);
    P.ell("dkgrey", 26, 33.5, 6.5, 6.5); P.ell("grey", 26, 33.5, 2.6, 2.6);
    P.ell("dkgrey", 12, 35, 4.5, 4.5); P.ell("grey", 12, 35, 1.8, 1.8);
  }, 44) },
  { tier: 3, name: "paddle steamer", make: () => picture(["sky", "white", "dkgreen", "blue", "red", "dkgrey", "yellow", "grey"], P => {
    P.all("sky");
    for (const [cx, cy, r] of [[16, 3, 2.5], [21, 2, 2], [19, 6, 2]]) P.ell("grey", cx, cy, r * 1.4, r);
    P.when("dkgreen", (x, y) => y > 22 + Math.sin(x * 0.6) * 1.5 + Math.sin(x * 1.7) && y < 29);
    P.rect("blue", 0, 28, 44, 44);
    P.when("white", (x, y) => y > 37 && fl(y) % 3 === 0 && (fl(x) * 5 + fl(y)) % 11 < 3);
    P.rect("dkgrey", 15, 6, 18, 20); P.rect("dkgrey", 21, 6, 24, 20);
    P.rect("yellow", 14.5, 5, 18.5, 7); P.rect("yellow", 20.5, 5, 24.5, 7);
    P.rect("white", 10, 18, 32, 23); P.rect("white", 26, 13, 32, 18);
    P.rect("white", 7, 23, 38, 29);
    P.on("yellow", "white", (x, y) => (fl(y) === 25 || fl(y) === 20) && fl(x) % 3 === 0 && x > 8);
    P.on("sky", "white", (x, y) => fl(y) === 15 && x > 27 && x < 31);
    P.poly("red", [[6, 29], [36, 29], [42, 26.5], [38, 34], [8, 34]]);
    P.ell("red", 6, 29, 6, 6); P.ell("dkgrey", 6, 29, 4.2, 4.2);
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4; P.line("red", 6 - Math.cos(a) * 4.2, 29 - Math.sin(a) * 4.2, 6 + Math.cos(a) * 4.2, 29 + Math.sin(a) * 4.2, 1); }
  }, 44) },
  { tier: 3, name: "double-decker bus", make: () => picture(["red", "sky", "white", "grey", "yellow", "ink"], P => {
    P.when("red", (x, y) => {
      const cx = Math.max(6, Math.min(38, x)), cy = Math.max(7, Math.min(34, y));
      return Math.hypot(x - cx, y - cy) <= 3.2;
    });
    for (const wx of [5, 13, 21, 29]) P.rect("sky", wx, 7, wx + 6, 14);
    P.rect("sky", 36, 7, 40.5, 14);
    P.rect("white", 3, 16, 42, 18);
    for (const wx of [5, 13, 21]) P.rect("sky", wx, 20, wx + 6, 27);
    P.rect("sky", 29, 20, 34, 33); P.rect("sky", 36, 20, 40.5, 27);
    P.rect("grey", 2, 34, 43, 36);
    P.ell("ink", 11, 36, 4.6, 4.6); P.ell("ink", 34, 36, 4.6, 4.6);
    P.ell("grey", 11, 36, 2, 2); P.ell("grey", 34, 36, 2, 2);
    P.outline("ink", true);
    P.rect("yellow", 37, 29, 40, 32);
  }, 44) },
  { tier: 3, name: "bin lorry", make: () => picture(["green", "white", "sky", "orange", "grey", "ink"], P => {
    P.when("green", (x, y) => x > 3 && x < 29 && y > 9 && y < 31 && !(x < 9 && Math.hypot(x - 9, y - 15) > 6 && y < 15));
    P.rect("grey", 1, 22, 6, 31);
    P.poly("white", [[28, 13], [35, 13], [41, 21], [41, 31], [28, 31]]);
    P.poly("sky", [[29.5, 14.5], [34.3, 14.5], [38.6, 21], [29.5, 21]]);
    P.rect("orange", 30, 11, 34, 13);
    P.on("orange", "green", (x, y) => y > 24.5 && y < 27.5);
    P.on("white", "green", (x, y) => x > 11 && x < 26 && y > 13 && y < 21 && fl(x) % 4 === 0);
    P.rect("orange", 28, 24.5, 41, 27.5);
    P.rect("grey", 2, 30, 42, 33);
    P.rect("grey", -1, 13, 3, 22);
    for (const cx of [10, 19, 35]) { P.ell("ink", cx, 33.5, 4.2, 4.2); P.ell("grey", cx, 33.5, 1.8, 1.8); }
    P.outline("ink", true);
  }, 44) },
);
