# SAP Spellbook Academy

An unofficial, installable study web app with two certification streams:

- **Stream 1 Certification - Integration Developer**: The Apprentice Grimoire.
- **Stream 2 Certification - Database Administrator - SAP HANA**: The Cloud Mage Grimoire.

The site turns certification preparation into a practical academy: Spell Desk, Practice Grimoire, Quest Map, Arcane Library, Potion Labs, Debugging Charms, Spell Simulator, Final Boss Trial, and Moonstone Checklist.

## What changed

- Rebranded from a single SAP Spellbook into SAP Spellbook Academy.
- Added a stream chooser and stream-specific content model.
- Preserved the Integration Developer path as Stream 1.
- Built Stream 2 from the uploaded HANA Cloud, self-service migration, and installation/administration materials.
- Added system-based practice exams for both streams with embedded code blocks and an original publish-safe virtual Academy Console.
- Added a Student Portal with browser-local account creation, login, hashed passcodes, and stream preference storage.
- Added a new original logo and icon that are intentionally not based on the SAP logo.
- Added Stream 2 source scrolls to `assets/` for live GitHub Pages access.
- Updated offline caching, manifest metadata, and README copy.

## Run locally

Open `index.html`, or run:

```powershell
node server.mjs
```

Then visit `http://127.0.0.1:4173`.

## Data and privacy

Progress, stream choice, checklist ticks, lab mastery, simulator answers, student accounts, and boss trial state are stored in browser `localStorage`. Student passcodes are hashed before storage, but this is still a device-local browser database, not a server-side identity system.

## Disclaimer

This is an independent study aid. It is not affiliated with, sponsored by, or endorsed by SAP. It does not reproduce SAP's proprietary exam environment or confidential exam items. Certification scope can change; verify details on official SAP Learning and SAP Help pages.
