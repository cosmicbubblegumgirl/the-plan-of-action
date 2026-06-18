# The SAP Spellbook

An unofficial, installable study web app for the **SAP Certified - Integration Developer** certification (`C_CPI_2601`), built by a learner for learners navigating SAP study paths.

## Features

- Light and dark themes
- IndexedDB-backed device profiles
- Separate progress, checklists, mock history, and notes for every profile
- Spell Simulator with twelve system-based practical scenarios
- HANA Potion Lab with an embedded SAP HANA SyBA runbook PDF and SQL-console checks
- The SAP Oracle searchable question and answer bank
- Guided Scrolls step-by-step task walkthroughs
- Milestone Moons for CLD900-aligned learning progress
- Built-in and custom Potion Checklist items
- Personal note creation, editing, search, deletion, and JSON export
- Final Boss Trial three-hour assessment timer
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

Publish the root of the `main` branch with GitHub Pages.

## Disclaimer

This is an independent study aid. It is not affiliated with, sponsored by, or endorsed by SAP. It does not reproduce SAP's proprietary exam environment or confidential exam items. Certification scope can change; verify details on the official SAP Learning certification page. SAP and SAP HANA are trademarks or registered trademarks of SAP SE or its affiliates; names are used only to identify the study subject.
