# Wilderness First Aid (offline reference)

A tiny, fully-offline web app of my Wilderness First Aid course notes - patient
assessment, injuries/traumas with signs & symptoms, treatment, category and
notes, plus search. No accounts, no network, no App Store, no fees.

It runs as a **PWA** you can add to your iPhone home screen, or as plain local
files you open in a browser.

## Features

- **Patient assessment** - Size-up (STERI), Primary (ABCDE), History (SAMPLE),
  Pain (OPQRST), Vitals (AVPU), evacuation, bleeding.
- **Injuries / traumas** - grouped by category; tap for signs & symptoms,
  management/treatment, category and notes.
- **Search everything at once:**
  - Injuries / traumas and categories by name.
  - Signs & symptoms → lists every matching injury.
  - Assessment keywords (e.g. `STERI`, `pain`, `AVPU`, `tourniquet`).
- **Edit mode (optional)** - update signs/symptoms, treatments and notes; add
  new injuries; add new categories. Changes are saved on your device only.
- **Backup / restore** - export and import your data as a JSON file.

> This is a personal study aid, **not medical advice**. In a real emergency,
> get professional help.

## The app lives in [`app/`](app/)

```
app/
  index.html      # the app
  styles.css
  app.js          # all logic (no frameworks)
  data.js         # the course content (edit here for permanent changes)
  manifest.webmanifest
  sw.js           # service worker (offline caching when hosted)
  icons/
```

## Use it on your iPhone

### Option A - Install as a home-screen app (recommended)

This gives you an app icon and full offline use.

1. Publish the `app/` folder somewhere free, e.g. **GitHub Pages**:
   - Push this repo to GitHub.
   - Repo **Settings → Pages** → deploy from `main` branch. Set the folder to
     `/ (root)` if you move `app/` contents to the root, or use `/app` if your
     Pages setup supports a subfolder. Simplest: publish the whole repo and open
     `.../app/index.html`.
2. On your iPhone, open that URL in **Safari** (open it once while online so it
   can cache).
3. Tap the **Share** button → **Add to Home Screen**.
4. Open it from the home screen. It now works with no internet.

### Option B - Just save the files and open them (no hosting)

Everything is self-contained, so you can open it straight from local files:

1. Get the `app/` folder onto your phone (AirDrop, iCloud Drive, email, or the
   **Files** app).
2. In the **Files** app, tap `index.html` → it opens in a browser, offline.

Notes for Option B:
- Keep all files in the same folder (don't separate `index.html` from `data.js`).
- Opening via `file://` won't register the service worker, but it doesn't need
  to - nothing loads from the network anyway.

## Making permanent edits

- **Quick, on-device edits:** tap **Edit** in the app. Great for tweaks; stored
  in the browser and included in **Export JSON** backups.
- **Permanent edits to the shipped content:** edit [`app/data.js`](app/data.js)
  and commit. This keeps the source-of-truth in git.

## Development / preview on a computer

Because of `file://` restrictions with service workers, preview with any static
server:

```sh
cd app
python3 -m http.server 8000
# then open http://localhost:8000
```

## Source notes

Original handwritten notes are in [`source-images/`](source-images/) (kept for
reference; not used by the app at runtime).
