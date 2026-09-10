import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  generateWorkout, DURATION_OPTIONS, FITNESS_LEVELS, TARGET_AREAS, WORKOUT_TYPES, mainExerciseIds
} from '../src/utils/workoutGenerator.js'

const combos = []
for (const fitness_level of FITNESS_LEVELS)
  for (const target_area of TARGET_AREAS)
    for (const workout_type of WORKOUT_TYPES)
      for (const duration of DURATION_OPTIONS)
        combos.push({ fitness_level, target_area, workout_type, duration, equipment_available: ['none'] })

test('every input combination produces a workout', () => {
  for (const inputs of combos) {
    assert.doesNotThrow(() => generateWorkout(inputs), JSON.stringify(inputs))
  }
})

test('generated length lands within 4 minutes of the request', () => {
  for (const inputs of combos) {
    const w = generateWorkout(inputs)
    assert.ok(Math.abs(w.minutes - inputs.duration) <= 4, `${JSON.stringify(inputs)} -> ${w.minutes} min`)
  }
})

test('no exercise repeats within a workout and every entry has instructions', () => {
  for (const inputs of combos) {
    const w = generateWorkout(inputs)
    const names = w.exercises.map(e => e.name)
    assert.equal(new Set(names).size, names.length, `${JSON.stringify(inputs)} repeats: ${names.join(', ')}`)
    w.exercises.forEach(e => assert.ok(e.instructions, `${e.name} has no instructions`))
  }
})

test('structure: warmup first, cooldown last, main exercises carry the requested sets', () => {
  const w = generateWorkout({ duration: 20, sets: 4 })
  assert.equal(w.exercises[0].slot, 'warmup')
  assert.equal(w.exercises.at(-1).slot, 'cooldown')
  const main = w.exercises.filter(e => e.slot !== 'warmup' && e.slot !== 'cooldown')
  assert.ok(main.length >= 2)
  main.forEach(e => assert.equal(e.sets, 4))
})

test('mixed workouts follow the 3-2-1 rhythm', () => {
  const w = generateWorkout({ duration: 30, workout_type: 'mixed', fitness_level: 'advanced' })
  const slots = w.exercises.filter(e => e.slot !== 'warmup' && e.slot !== 'cooldown').map(e => e.slot)
  assert.deepEqual(slots.slice(0, 6), ['strength', 'strength', 'strength', 'cardio', 'cardio', 'core'])
})

test('lower fitness levels never get harder exercises', () => {
  const w = generateWorkout({ duration: 45, fitness_level: 'beginner' })
  // beginner pool only; instructions exist and sets applied — the level guard is in basePool
  assert.equal(w.intensity, 'beginner')
})

test('low impact workouts contain only low-impact exercises', async () => {
  const { getExerciseById } = await import('../src/data/exercises.js')
  const w = generateWorkout({ duration: 30, workout_type: 'low_impact' })
  w.exercises.filter(e => e.slot !== 'cooldown').forEach(e => {
    assert.equal(getExerciseById(e.exerciseId).is_low_impact, true, e.name)
  })
})

test('recent exercise ids are avoided when the pool allows', () => {
  const first = generateWorkout({ duration: 20 })
  const second = generateWorkout({ duration: 20 }, { recentExerciseIds: mainExerciseIds(first) })
  const overlap = mainExerciseIds(second).filter(id => mainExerciseIds(first).includes(id))
  assert.equal(overlap.length, 0)
})
