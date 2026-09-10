# Workout App

A phone-down workout app. Read the exercise, put the phone down, do your sets, pick it up, tap **Done**, say how hard it was, read the next one. No timers, nothing moving on screen.

## Features

- **My Week** — strength Tue/Thu/Sat, cardio Wed/Fri, rest Sun/Mon. Cardio days can swap to a gym session or carry a make-up workout. Days show a ✓ once logged.
- **Today on the home screen** — one tap starts today's workout with your last-used sets and intensity.
- **Set-based sessions** — one exercise fills the screen with a sets/seconds guide and instructions. Progress is saved after every tap, so closing the phone mid-workout loses nothing.
- **0–5 effort rating** after each exercise; the last rating shows next time, and the finish screen nudges you up or down an intensity.
- **History** — every completed workout with per-exercise ratings.
- **Generator** — warmup, a 3-2-1 main block sized to the minutes you ask for, cooldown. Works for every combination of level, target, type and length.
- **English / Spanish** toggle.
- Installable on a phone (Add to Home Screen).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run check      # lint + tests + production build
npm run build      # output in dist/
```

## Deploying

The app uses hash routing, so `dist/` works on any static host (Vercel, Netlify, GitHub Pages, S3) with no rewrite rules. See `DEPLOYMENT.md`.
