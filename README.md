# Sleep on it

Small, slow games for the last minutes of the day. The site is a static Progressive Web App: plain HTML, CSS and JavaScript files that run in the browser, install to a phone's home screen, and play offline.

## What's here

```
index.html             landing page listing the games
manifest.webmanifest   app name, colours and icons for installing to a home screen
sw.js                  service worker that caches every file for offline play
icon-192.png           app icons
icon-512.png
.htaccess              Apache headers: content security policy limited to the site's own origin
games/
  ants/
    index.html         the Ants game, in one file
    icon.png           picture used on the landing page
```

## Games

**Ants**: choose colour boxes from five columns and send ants to carry a pixel picture home, one cube at a time. Ants dig in from the edges, so the order you choose matters. Levels are numbered and progress is saved in the browser's local storage.

**Watching paint dry**: in the works.

## Running it locally

Any static file server works, for example:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Service workers need `localhost` or HTTPS.

## Deploying

Copy the files to the web root of any static host. On Apache (o2switch, cPanel), the `.htaccess` file sets the security headers.

When any file changes, bump `CACHE` in `sw.js` (for example `sleep-on-it-v2`) so installed copies pick up the new version. When a file is added, add it to the `FILES` list in `sw.js` too.

## Adding a picture to Ants

Pictures live in the `PICTURES` list in `games/ants/index.html`. Each one has a tier (1 simple, 2 medium, 3 complex), a name, and a list of shapes painted on a 32 x 32 grid:

```js
{ tier: 1, name: "pear", make: () => picture(["pink", "green", "brown", "dkgreen", "white"], P => {
  P.all("pink"); P.ell("green", 16, 21, 8, 7.5); P.ell("green", 16, 12, 5, 6);
  P.line("brown", 16, 6.5, 17.5, 2.5, 1.3); P.rell("dkgreen", 20.5, 5, 3.5, 1.5, -0.5);
}) },
```

The level list builds itself from the pictures: every picture appears once as drawn and once mirrored, with a complex scene every fourth level.
