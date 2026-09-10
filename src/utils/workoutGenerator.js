import { exercises as allExercises } from '../data/exercises.js'

// Set-based workout generator.
//
// A generated workout is a short warmup, a main block of exercises, and a
// cooldown. Every main exercise is done for `sets` sets, off-phone; nothing is
// timed. The main block follows the 3-2-1 rhythm (3 strength, 2 cardio, 1 core)
// for mixed workouts, and a type-specific rhythm otherwise.

export const DURATION_OPTIONS = [10, 20, 30, 45]
export const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced']
export const TARGET_AREAS = ['total_body', 'upper_body', 'lower_body', 'abs', 'booty', 'arms', 'legs']
export const WORKOUT_TYPES = ['mixed', 'hiit', 'strength', 'kickboxing', 'yoga', 'low_impact']
export const EQUIPMENT = ['none', 'dumbbells', 'bands', 'bench']

export const DEFAULT_INPUTS = {
  duration: 20,
  sets: 4,
  fitness_level: 'intermediate',
  target_area: 'total_body',
  workout_type: 'mixed',
  equipment_available: ['none'],
  banned_exercises: []
}

// Seconds of work per set plus the breather after it, used only to size the
// workout to the requested duration.
const SET_SECONDS = 45
const TRANSITION_SECONDS = 20
const WARMUP_COUNT = 2
const COOLDOWN_COUNT = 2

// Which exercise "slots" the main block cycles through, per workout type.
const SLOT_RHYTHM = {
  mixed: ['strength', 'strength', 'strength', 'cardio', 'cardio', 'core'],
  low_impact: ['strength', 'strength', 'strength', 'cardio', 'cardio', 'core'],
  strength: ['strength', 'strength', 'strength', 'core'],
  hiit: ['cardio', 'cardio', 'cardio', 'core'],
  kickboxing: ['kickboxing', 'kickboxing', 'kickboxing', 'core'],
  yoga: ['yoga', 'yoga', 'core']
}

const TARGET_SUBCATEGORIES = {
  upper_body: ['chest', 'shoulders', 'triceps', 'back', 'biceps'],
  lower_body: ['legs', 'glutes'],
  abs: ['abs', 'plank', 'yoga_core'],
  booty: ['glutes'],
  arms: ['biceps', 'triceps', 'shoulders'],
  legs: ['legs', 'glutes']
}

const SLOT_MATCHERS = {
  strength: ex => ex.category === 'strength_upper' || ex.category === 'strength_lower' || ex.category === 'compound',
  cardio: ex => ex.category.startsWith('cardio') || ex.category === 'plyo' || ex.category === 'kickboxing',
  core: ex => ex.category === 'strength_core',
  kickboxing: ex => ex.category === 'kickboxing',
  yoga: ex => ex.category === 'yoga' || ex.subcategory === 'yoga_core' || (ex.is_low_impact && ex.category === 'strength_core')
}

const WARMUP_NAMES = ['march in place', 'jog in place', 'butt kicks', 'jumping jacks', 'high knees', 'arm circles']
const COOLDOWN_NAMES = ['cobra', 'downward dog', 'child', 'sun salutation', 'cat-cow', 'stretch']

const levelsUpTo = (level) => FITNESS_LEVELS.slice(0, FITNESS_LEVELS.indexOf(level) + 1)

const hasEquipment = (ex, available) =>
  ex.equipment_required.length === 0 ||
  ex.equipment_required.every(eq => eq === 'none' || available.includes(eq))

function shuffle(list) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// The base pool: right equipment, at or below the chosen level, not banned,
// low-impact only when asked. Target area and workout type are applied per
// slot so a "strength" workout can still get a cardio warmup, etc.
export function basePool(inputs) {
  const levels = levelsUpTo(inputs.fitness_level)
  const banned = new Set(inputs.banned_exercises || [])
  return allExercises.filter(ex =>
    levels.includes(ex.difficulty_level) &&
    hasEquipment(ex, inputs.equipment_available || []) &&
    !banned.has(ex.exercise_id) &&
    (inputs.workout_type !== 'low_impact' || ex.is_low_impact)
  )
}

// Ordered candidate pools for a slot, narrowest first. A later pool is only
// used when every exercise in the earlier ones has already been used, so a
// small category (beginner kickboxing has four moves) widens instead of
// repeating.
function slotPools(pool, slot, targetArea) {
  const pools = []
  const inSlot = pool.filter(SLOT_MATCHERS[slot])
  // Target area shapes the strength slot only; cardio/core stay whole-body so
  // an "arms" workout still has a heartbeat and a core finisher.
  if (slot === 'strength' && targetArea !== 'total_body') {
    const subs = TARGET_SUBCATEGORIES[targetArea] || []
    pools.push(inSlot.filter(ex => subs.includes(ex.subcategory)))
  }
  pools.push(inSlot)
  if (slot === 'kickboxing') pools.push(pool.filter(SLOT_MATCHERS.cardio))
  if (slot === 'yoga') pools.push(pool.filter(SLOT_MATCHERS.core))
  pools.push(pool)
  return pools
}

// Pick `count` exercises from `pool`, preferring ones not yet used, never
// repeating within the same pick, falling back to reuse only when the pool is
// genuinely too small. `used` tracks ids and names: the data has a few
// same-named moves under different ids.
function pick(pool, count, used) {
  const isUsed = ex => used.has(ex.exercise_id) || used.has(ex.name)
  const fresh = shuffle(pool.filter(ex => !isUsed(ex)))
  const stale = shuffle(pool.filter(isUsed))
  const chosen = []
  for (const ex of [...fresh, ...stale]) {
    if (chosen.length === count) break
    if (chosen.some(c => c.name === ex.name)) continue
    chosen.push(ex)
  }
  chosen.forEach(ex => { used.add(ex.exercise_id); used.add(ex.name) })
  return chosen
}

function mainExerciseCount(duration, sets) {
  const warmCool = (WARMUP_COUNT + COOLDOWN_COUNT) * (SET_SECONDS + TRANSITION_SECONDS)
  const perExercise = sets * (SET_SECONDS + TRANSITION_SECONDS)
  return Math.max(2, Math.round((duration * 60 - warmCool) / perExercise))
}

const toEntry = (ex, extra) => ({
  exerciseId: ex.exercise_id,
  name: ex.name,
  instructions: ex.description,
  seconds: SET_SECONDS,
  ...extra
})


export function generateWorkout(userInputs = {}, options = {}) {
  const inputs = { ...DEFAULT_INPUTS, ...userInputs }
  const avoid = new Set(options.recentExerciseIds || [])
  const pool = basePool(inputs)

  if (pool.length < 6) {
    throw new Error('Not enough exercises match those filters. Try a higher fitness level or more equipment.')
  }

  const rhythm = SLOT_RHYTHM[inputs.workout_type] || SLOT_RHYTHM.mixed
  const count = mainExerciseCount(inputs.duration, inputs.sets)

  // Main block: walk the rhythm, one pick per slot. If a slot has no
  // candidates (e.g. an "abs" strength target on a beginner pool) borrow from
  // the whole pool so the workout is never short.
  // One shared "used" set so nothing repeats anywhere in the workout; ids from
  // recent workouts start in it so consecutive workouts differ too.
  const used = new Set(avoid)

  // Picks in workout order so the gentle moves are still fresh for the warmup.
  const firstFresh = (pools) => pools.find(list => list.some(ex => !used.has(ex.exercise_id) && !used.has(ex.name))) || pool

  // Warmup: gentle cardio names first, then any low-impact cardio, then any cardio.
  const gentle = pool.filter(ex => WARMUP_NAMES.some(n => ex.name.toLowerCase().includes(n)))
  const easyCardio = pool.filter(ex => ex.is_low_impact && ex.category.startsWith('cardio'))
  const warmup = pick(firstFresh([gentle, easyCardio, pool.filter(SLOT_MATCHERS.cardio)]), WARMUP_COUNT, used)
    .map(ex => toEntry(ex, { sets: 1, slot: 'warmup' }))

  const main = []
  for (let i = 0; i < count; i++) {
    const slot = rhythm[i % rhythm.length]
    const [ex] = pick(firstFresh(slotPools(pool, slot, inputs.target_area)), 1, used)
    if (ex) main.push(toEntry(ex, { sets: inputs.sets, slot }))
  }

  // Cooldown: yoga / stretch names first (any level), then low-impact core holds.
  const stretches = allExercises.filter(ex =>
    hasEquipment(ex, inputs.equipment_available || []) &&
    (COOLDOWN_NAMES.some(n => ex.name.toLowerCase().includes(n)) ||
      ex.category === 'yoga' || ex.subcategory === 'yoga_core')
  )
  const holds = pool.filter(ex => ex.is_low_impact && SLOT_MATCHERS.core(ex))
  const cooldown = pick(firstFresh([stretches, holds]), COOLDOWN_COUNT, used)
    .map(ex => toEntry(ex, { sets: 1, slot: 'cooldown' }))

  const exercises = [...warmup, ...main, ...cooldown]
  const seconds = exercises.reduce((total, e) => total + e.sets * (e.seconds + TRANSITION_SECONDS), 0)

  return {
    id: 'generated',
    name: describe(inputs),
    type: inputs.workout_type,
    mode: 'sets',
    intensity: inputs.fitness_level,
    sets: inputs.sets,
    exercises,
    minutes: Math.round(seconds / 60),
    inputs,
    createdAt: new Date().toISOString()
  }
}

const TITLE = {
  total_body: 'Total Body', upper_body: 'Upper Body', lower_body: 'Lower Body',
  abs: 'Abs', booty: 'Booty', arms: 'Arms', legs: 'Legs',
  mixed: 'Mixed', hiit: 'HIIT', strength: 'Strength', kickboxing: 'Kickboxing',
  yoga: 'Yoga', low_impact: 'Low Impact'
}

export const label = (key) => TITLE[key] || key

function describe(inputs) {
  return `${inputs.duration}-min ${label(inputs.target_area)} ${label(inputs.workout_type)}`
}

export const mainExerciseIds = (workout) =>
  workout.exercises.filter(e => e.slot !== 'warmup' && e.slot !== 'cooldown').map(e => e.exerciseId)
