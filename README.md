# The Plan of Action

An unofficial, installable study web app for the **SAP Certified - Integration Developer** certification (`C_CPI_2601`).

## Features

- Light and dark themes
- IndexedDB-backed device profiles
- Separate progress, checklists, mock history, and notes for every profile
- Twelve system-based practical scenarios with guided and timed modes
- Searchable questions and answers
- Step-by-step task walkthroughs
- CLD900-aligned learning landmarks
- Built-in and custom checklist items
- Personal note creation, editing, search, deletion, and JSON export
- Three-hour mock assessment timer
- Offline support through a service worker

## Run locally

Open `index.html`, or run:

```powershell
node server.mjs
```

Then visit `http://127.0.0.1:4173`.

## Data and privacy

This GitHub Pages app has no server-side database. Device profiles and learner content use browser IndexedDB. Data stays on the current browser/device unless the learner exports it.

## GitHub Pages

The included `.github/workflows/pages.yml` deploys the root of the `main` branch to GitHub Pages.

## Disclaimer

This is an independent study aid. It does not reproduce SAP's proprietary exam environment or confidential exam items. Certification scope can change; verify details on the official SAP Learning certification page.
