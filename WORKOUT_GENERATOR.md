# Workout Generator

`src/utils/workoutGenerator.js` builds a set-based workout from a handful of inputs. Nothing in the output is timed; every main exercise is done for `sets` sets.

## Inputs

```js
{
  duration: 10 | 20 | 30 | 45,        // minutes, used to size the main block
  sets: 2..6,                         // sets per main exercise (default 4)
  fitness_level: 'beginner' | 'intermediate' | 'advanced',
  target_area: 'total_body' | 'upper_body' | 'lower_body' | 'abs' | 'booty' | 'arms' | 'legs',
  workout_type: 'mixed' | 'hiit' | 'strength' | 'kickboxing' | 'yoga' | 'low_impact',
  equipment_available: ['none' | 'dumbbells' | 'bands' | 'bench'],
  banned_exercises: [exercise_id]
}
```

`generateWorkout(inputs, { recentExerciseIds })` — pass the ids from recent workouts and they are avoided when the pool allows.

## Output

```js
{
  id: 'generated',
  name: '20-min Total Body Mixed',
  mode: 'sets',
  sets: 4,
  minutes: 22,
  exercises: [
    { exerciseId, name, instructions, seconds: 45, sets: 1, slot: 'warmup' },
    { exerciseId, name, instructions, seconds: 45, sets: 4, slot: 'strength' },
    ...
    { exerciseId, name, instructions, seconds: 45, sets: 1, slot: 'cooldown' }
  ],
  inputs, createdAt
}
```

## How it picks

1. **Base pool** — right equipment, difficulty at or below the chosen level (so intermediate includes beginner moves), not banned, low-impact only when asked.
2. **Sizing** — main exercise count = (duration − warmup/cooldown time) ÷ (sets × 65 s), minimum 2.
3. **Rhythm** — the main block cycles a slot pattern:
   - mixed / low_impact: strength, strength, strength, cardio, cardio, core (the 3-2-1 rhythm)
   - strength: strength ×3, core · hiit: cardio ×3, core · kickboxing: kickboxing ×3, core · yoga: yoga ×2, core
4. **Slot pools widen before repeating** — e.g. targeted strength → all strength → whole pool; kickboxing → cardio → whole pool. An exercise never appears twice in one workout (by id *and* by name).
5. **Warmup** — two gentle cardio moves (march, jog, jumping jacks…). **Cooldown** — two yoga/stretch holds.

## Tests

`npm test` runs `tests/workoutGenerator.test.js`, which generates every combination of level × target × type × duration (504) and asserts: no throw, within 4 minutes of the request, no repeats, instructions present, warmup first / cooldown last, 3-2-1 order for mixed, low-impact honoured.
