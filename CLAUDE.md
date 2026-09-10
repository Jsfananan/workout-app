# Workout App — Project Context

## Tech Stack
- React 18 + Vite 5 + React Router 6 (HashRouter — works on any static host)
- CSS (no Tailwind — custom stylesheets; shared pieces in `src/index.css`)
- Fully client-side — no backend, localStorage for everything
- Installable as a PWA (manifest + icons in `public/`); no service worker

## Repo
- Remote: https://github.com/Jsfananan/workout-app
- Branch: main

## Structure
```
src/
├── pages/
│   ├── Home.jsx               # Today's plan with one-tap Start, nav buttons, language toggle
│   ├── Schedule.jsx           # "My Week": Tue/Thu/Sat strength, Wed/Fri cardio, done markers
│   ├── WorkoutList.jsx        # Browse workouts; sets + intensity per configurable workout
│   ├── WorkoutDetail.jsx      # Phone-down session: exercise → Done → rate 0–5 → next
│   ├── WorkoutGenerator.jsx   # Generator page (wraps WorkoutGeneratorDemo)
│   └── History.jsx            # Completed workouts with per-exercise ratings
├── components/
│   └── WorkoutGeneratorDemo.jsx # Generator form + preview + "Start this workout"
├── context/
│   └── SettingsContext.jsx    # Language (en/es) + UI string table
├── data/
│   ├── workouts.js            # 9 workouts: 3 configurable (sets-based), 6 running/treadmill (steps)
│   ├── exercises.js           # 191 exercises with metadata
│   ├── weeklySchedule.js      # Weekly plan, cardio-day options, make-up helpers
│   └── translations.js        # Spanish names/instructions for the pre-built workouts
├── utils/
│   ├── workoutGenerator.js    # Set-based generator (3-2-1 rhythm), no empty output for any input
│   └── storage.js             # localStorage: history, ratings, active session, generated workout, last config
├── App.jsx                    # Routes: /, /workouts, /workout/:id, /generate, /schedule, /history
└── main.jsx
tests/
└── workoutGenerator.test.js   # node:test — every input combination must produce a valid workout
```

## Design principles (from the owner)
- **No timers.** The user reads the exercise, puts the phone down, does 4 sets, picks the
  phone up, taps Done. Nothing on screen moves on its own.
- Minimise time looking at the phone: one big card, one big button, big type.
- After each exercise a 0–5 "how hard was that?" rating; last rating is shown next time.
- Progress is saved after every tap (`activeSession`) so closing the phone loses nothing.

## Key Context
- Weekly plan: strength Tue/Thu/Sat, cardio (outdoor run) Wed/Fri, rest Sun/Mon.
  Cardio days can be toggled to a gym session, and can carry a dated make-up workout.
- Configurable workouts take `?sets=N&intensity=level`; last-used config is remembered.
- Generated workouts live in localStorage under `generatedWorkout` and run at `/workout/generated`.
- Generator: warmup (2) + main block sized to the requested minutes + cooldown (2).
  Fitness level is inclusive (intermediate = beginner + intermediate). Slots widen
  (kickboxing → cardio → anything) before ever repeating an exercise.
- Running/treadmill workouts are kept as step checklists; the owner runs outside without the app.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run lint` — ESLint (flat config)
- `npm test` — generator tests
- `npm run check` — lint + test + build
