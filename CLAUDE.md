# Workout App — Project Context

## Tech Stack
- React 18 + Vite 5 + React Router 6
- CSS (no Tailwind — custom stylesheets)
- Fully client-side — no backend, localStorage for preferences

## Repo
- Remote: https://github.com/Jsfananan/workout-app
- Branch: main

## Structure
```
src/
├── pages/                     # Route components
│   ├── Home.jsx               # Landing: Browse or Generate buttons
│   ├── WorkoutList.jsx        # Grid of all workouts + configurable options
│   ├── WorkoutDetail.jsx      # Active workout with timer, progress, exercise list
│   └── WorkoutGenerator.jsx   # AI workout generator page
├── components/
│   ├── Timer.jsx              # SVG circular progress timer
│   ├── JillianTimer.jsx       # Alternative timer style (toggle via localStorage)
│   ├── WorkoutGeneratorDemo.jsx # Generator form + output
│   ├── RunningTips.jsx        # Future: not yet integrated
│   └── StretchingRoutine.jsx  # Future: not yet integrated
├── data/
│   ├── workouts.js            # 9 pre-built workouts (3 configurable)
│   ├── exercises.js           # 100+ exercises with metadata
│   ├── runningPrograms.js     # 5K, half marathon training data
│   └── workoutLoader.js       # Data loading utilities
├── utils/
│   └── workoutGenerator.js    # Core algorithm: 3-2-1 circuit structure
├── App.jsx                    # Routes: /, /workouts, /workout/:id, /generate
└── main.jsx                   # Entry point
```

## Key Context
- 9 pre-built workouts: 3 configurable (cardio/strength/core), 4 running programs, 2 treadmill
- Workout generator uses 3-2-1 structure: 3min strength + 2min cardio + 1min abs per circuit
- Configurable workouts adapt to duration (10-30min) and intensity (beginner/intermediate/advanced)
- Two timer UI options: standard SVG circle and "Jillian's Timer"
- Jillian Michaels-inspired design

## Current State
- Functional SPA, deployed to GitHub
- Last active: Jan 28, 2026
- Future: RunningTips and StretchingRoutine components exist but not routed
