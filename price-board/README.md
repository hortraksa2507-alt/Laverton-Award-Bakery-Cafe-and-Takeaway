# Laverton Award Bakery — Price Board

Visual price board for cashiers: search by name or match items by photo. Prices for hot food and drinks without labels can be set once in Edit mode and are remembered via browser storage.

## Run locally

```bash
cd price-board
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Storage

Uses `window.storage` when available (Cursor web app), with a `localStorage` fallback shim in `src/storageShim.js`.

- Menu: `laverton-menu-v4`
- Cashier-uploaded photos: `labphoto-{itemId}`

## Photos

Cabinet photos live in `src/photosRaw.js` as base64 webp (70 entries). Items without a direct photo show SVG illustrations from `FoodIcon.jsx`. Aliases (e.g. `d02` → `d01`) are defined in `FoodIcon.jsx`.

To regenerate `photosRaw.js` after editing the source paste:

```bash
python3 scripts/parse-photos-source.py
```
