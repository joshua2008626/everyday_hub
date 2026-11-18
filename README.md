# EVERYDAY HUB

Offline-first PWA with 83 mini apps. React + TypeScript + Vite + Tailwind + Dexie (IndexedDB).

## Run
```
npm install
npm run dev        # development
npm run build      # production build (generates the service worker)
npm run preview    # test offline behaviour: open once, then go offline
```
The service worker and installability only work on a production build served over HTTPS or localhost.

## Notes
- Apps live in `src/apps/`; every app is listed once in `src/registry.ts` and mapped to its file in `FILES` inside `src/App.tsx`.
- User data: IndexedDB tables `notes`, `calcHistory`, `kv`, `audio`, `media` (add new tables with a new `this.version(n)` in `src/db.ts`; never edit old versions).
- JSON backup covers notes, calculator history, `kv` records and preferences. It does NOT include voice recordings, music, podcasts, photos, e-books or imported files.
- Replace the placeholder icons in `public/icons/` (192.png, 512.png) with real artwork.
- Starter datasets (dictionary, atlas, language phrases, science reference) are small; swap in larger ones as needed.
- Reminders (calendar events with a time) only fire while the app is open in a tab; they cannot wake a closed app.
- Known gaps: chess castling/en passant, a user-customisable quick-actions bar, ingredient-level recipe search.
