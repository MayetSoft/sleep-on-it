# Sleep on it

Small, slow puzzle games for the last minutes of the day. The site is a static Progressive Web App: plain HTML, CSS and JavaScript files that run in the browser, install to a phone's home screen, and play offline.

## The games

| Game | Folder | Levels | What it is |
|---|---|---|---|
| Ants | `games/ants/` | 1004 | Choose colour boxes and send ants to carry a pixel picture home, one cube at a time. 502 pictures, each played as drawn and mirrored. |
| Opossums | `games/opossums/` | 300 | One opossum in every row, column and coloured region, and no two touching (the rules of Meowdoku / one-star Star Battle). |
| Japanese garden | `games/garden/` | 200 | Place stones, lanterns, pines, path, pond and bridge on gravel so a few rules of harmony hold. |
| Mowing | `games/mowing/` | 250 | Draw a route for a mower; cut grass grows back, so the whole lawn has to be cut at the same moment. |
| Embers | `games/embers/` | 300 | Place sparks and let Conway's Game of Life spread them until every ringed cell has burned. |
| Ink | `games/ink/` | 200 | Drop coloured ink into a tank so the blooming clouds settle into the target picture. |
| Rain on the window | `games/rain/` | 200 | Draw wet streaks on the glass to gather raindrops into drops big enough for each ring. |
| Drifts | `games/drifts/` | 200 | Place wooden fences to steer falling snow until every marked hollow is full. |
| Watching paint dry | `games/paint/` | 200 | Paint a mural one stencil at a time, finding the order in which the coats cover each other. |

Every game follows the shared rules in `docs/CONVENTIONS.md`: numbered levels built from a seed, progress saved in the browser's local storage, every level checked to be winnable, one plain next/again button, and nothing loaded from the network.

## Files

```
index.html             landing page listing the games
manifest.webmanifest   app name, colours and icons for installing to a home screen
sw.js                  service worker that caches every file for offline play
icon-192.png           app icons
icon-512.png
.htaccess              Apache headers: content security policy limited to the site's own origin
docs/CONVENTIONS.md    shared rules for every game
tools/                 test helpers (not needed on the server)
games/<game>/
  index.html           the whole game in one file
  icon.png             picture used on the landing page
games/ants/pictures/
  base.js              picture helpers, colour palette and the first 44 pictures
  set-01.js … set-10.js  further pictures, grouped by theme
```

## Running it locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Service workers need `localhost` or HTTPS.

## Deploying to o2switch

The site is a set of static files. One way to publish it on the cPanel account, from an SSH session on the server (replace the folder with the site's document root):

```
cd ~/sleep-on-it.example.org
git clone https://github.com/MayetSoft/sleep-on-it.git .
```

To update later:

```
cd ~/sleep-on-it.example.org
git pull
```

The `.htaccess` file in the repository sets the security headers. `docs/`, `tools/` and `README.md` are harmless on the server; delete them there if you prefer.

Whenever any file changes, bump `CACHE` in `sw.js` (for example `sleep-on-it-v4`) so installed copies pick up the new version. When a file is added, add it to the `FILES` list in `sw.js` too.

## Adding an Ants picture

Pictures are lists of shapes painted on a square grid; the helpers are documented at the top of `games/ants/pictures/base.js`.

```js
PICTURES.push({ tier: 1, name: "pear", make: () => picture(["green", "brown", "dkgreen", "white", "ink"], P => {
  P.ell("green", 16, 21, 8, 7.5); P.ell("green", 16, 12, 5, 6);
  P.line("brown", 16, 6.5, 17.5, 2.5, 1.3); P.rell("dkgreen", 20.5, 5, 3.5, 1.5, -0.5);
  P.outline("ink");
}, 32) });
```

Pixels left unpainted are transparent and start out eaten. `P.outline("ink")` draws a one-pixel line around the shape; `P.outline("ink", true)` also draws lines between colour areas. Check a set with:

```
python3 tools/check_pictures.py set-02 8812
```

It renders a contact sheet to `/tmp/set-02-sheet.png` and plays each picture once. The level list builds itself: every picture appears as drawn and mirrored, with a complex picture every fourth level.
