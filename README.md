# PITWALL

A Formula 1 dashboard built with React and TypeScript: season calendar, standings, race results, tyre strategies and lap-by-lap positions, all from public F1 data.

Built as a portfolio project to practice working with external APIs, data-heavy charts and caching.

> Fan project, not affiliated with Formula 1.

## Data sources

- [Jolpica-F1](https://github.com/jolpica/jolpica-f1) (successor of the Ergast API): calendar, results, standings, laps and pit stops, from 1950.
- [OpenF1](https://openf1.org): tyre stints, positions, weather and telemetry, from 2023.

Both are free and need no API key, but they have rate limits (Jolpica: 4 requests/s and 500/hour; OpenF1: 3 requests/s and 30/minute), so past sessions are cached instead of being fetched again.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [React Router](https://reactrouter.com)
- [Recharts](https://recharts.org) and hand-written SVG for charts
- [Vitest](https://vitest.dev) for unit tests

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run test       # watch mode
npm run test:run   # single run
npm run lint
```

## Roadmap

- [ ] Phase 0 · Setup and first deploy
- [ ] Phase 1 · Calendar, countdown and next Grand Prix
- [ ] Phase 2 · Driver and constructor standings
- [ ] Phase 3 · Race page: results and podium
- [ ] Phase 4 · Tyre strategy and lap-by-lap positions
- [ ] Phase 5 · Lap time comparison and weather
- [ ] Phase 6 · Mobile, accessibility, performance
