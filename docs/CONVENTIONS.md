# House rules for Sleep on it games

Sleep on it is a suite of small, slow puzzle games for the last minutes of the day, played in bed on a phone. Every game follows these rules so the suite feels like one app.

## What a game is

- A light puzzle with a clear goal and a calm pace. Each level ends in a "done" state, then the player sees one plain button: **next** (or **again** after a lost level). Nothing else: no score, no stars, no streaks, no badges, no rewards, no ads, no encouraging messages.
- Levels are numbered and shown as `12 / 300` in a quiet corner. The total is the real number of distinct levels the game offers. Level `n` always builds the same puzzle (seeded random from `n`).
- Progress is saved in `localStorage` under `<slug>.level` (wrap reads and writes in try/catch; the game must work without storage). Progress is saved the moment a level is won.
- Every level the game offers can be finished. Generated puzzles are built from a known solution or checked by a solver before they are shown. Logic puzzles with a single intended answer check that the answer is unique.
- Difficulty rises gently with the level number, with an occasional harder level every few levels.
- A level takes roughly 1 to 5 minutes.
- Mistakes are shown calmly (a highlight, a soft colour) and can be undone. Nothing flashes, shakes or buzzes.
- Where waiting is part of the game, a speed button cycling `1× → 2× → 3× → 5×` sits in a quiet corner.

## Look and feel

- Readable in a dark bedroom without being dim: clear, distinct colours, good contrast, no automatic dimming over time.
- Each game has its own palette and character, rooted in its subject. Pixel or flat shapes drawn on a canvas suit the suite.
- Text uses system fonts only. Any short text (button labels, the level counter) is lowercase and plain.
- Slow, smooth motion. About 30 frames a second is plenty.
- Respect `prefers-reduced-motion` where motion is decorative.
- Portrait phone first (about 360 to 430 px wide), and it must also work on a desktop window. Touch and mouse both work; tap targets are at least 44 px.
- Copy describes what things are and what happens, in plain words (describe what something is, rather than what it is not).

## Files

```
games/<slug>/index.html   the whole game: HTML, CSS and JavaScript in one file
games/<slug>/icon.png     a 128 x 128 pixel-art picture of the game for the landing page
```

Each `index.html`:

- links `../../manifest.webmanifest` and `../../icon-192.png` in `<head>`, with `theme-color` set to the game's background colour;
- shows a small `‹ all games` link to `../../` in the top-left corner, in the game's muted text colour, with a visible focus outline;
- registers the shared service worker: `try { if ("serviceWorker" in navigator) navigator.serviceWorker.register("../../sw.js").catch(() => {}); } catch (e) {}`;
- loads nothing from the network: no CDNs, no web fonts, no analytics, no external images. Images are drawn in code or embedded as data URIs.

A game only touches files in its own folder. The landing page, `sw.js` and the manifest are updated by the maintainer.

## Testing

Serve the repository root with `python3 -m http.server <port>` and open `http://localhost:<port>/games/<slug>/`. Headless Chrome is at `/usr/bin/google-chrome` and Python Playwright is installed. Before calling a game done:

- play several levels automatically (drive the game's own functions) to check they can be finished and take a sensible time;
- check there are no console errors;
- take screenshots at 390 x 844 and 1280 x 800 and look at them.
