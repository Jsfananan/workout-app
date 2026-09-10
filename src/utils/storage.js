// localStorage-backed state: workout history, exercise ratings, in-progress
// session, generated workout. Everything is wrapped so a blocked or full
// storage never breaks the page.

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable: state stays in memory for this page only
  }
}

const remove = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

export const toISODate = (date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ---- Rating scale --------------------------------------------------------

export const RATING_LABELS = ['Too easy', 'Easy', 'Moderate', 'Hard', 'Very hard', 'Max effort']

// ---- Workout history -----------------------------------------------------

const HISTORY_KEY = 'workoutHistory'
const HISTORY_LIMIT = 200

export const getHistory = () => read(HISTORY_KEY, [])

export function addHistoryEntry(entry) {
  const history = [entry, ...getHistory()].slice(0, HISTORY_LIMIT)
  write(HISTORY_KEY, history)
  return history
}

export const getHistoryForDate = (isoDate) =>
  getHistory().filter(h => h.date === isoDate)

// ---- Exercise ratings ----------------------------------------------------

const RATINGS_KEY = 'exerciseRatings'
const RATINGS_PER_EXERCISE = 10

export const getAllRatings = () => read(RATINGS_KEY, {})

export const getLastRating = (exerciseName) => {
  const list = getAllRatings()[exerciseName]
  return list && list.length ? list[list.length - 1] : null
}

export function recordRating(exerciseName, rating, date = toISODate()) {
  const all = getAllRatings()
  const list = [...(all[exerciseName] || []), { rating, date }].slice(-RATINGS_PER_EXERCISE)
  write(RATINGS_KEY, { ...all, [exerciseName]: list })
}

// ---- In-progress session -------------------------------------------------

const SESSION_KEY = 'activeSession'

export const getActiveSession = () => read(SESSION_KEY, null)
export const saveActiveSession = (session) => write(SESSION_KEY, session)
export const clearActiveSession = () => remove(SESSION_KEY)

// ---- Generated workout ---------------------------------------------------

const GENERATED_KEY = 'generatedWorkout'

export const getGeneratedWorkout = () => read(GENERATED_KEY, null)
export const saveGeneratedWorkout = (workout) => write(GENERATED_KEY, workout)

// Exercise ids used by recent generated workouts, so the next one is different.
const RECENT_KEY = 'recentGeneratedExercises'
const RECENT_LIMIT = 5

export const getRecentExerciseIds = () => read(RECENT_KEY, []).flat()

export function pushRecentExerciseIds(ids) {
  const recent = [...read(RECENT_KEY, []), ids].slice(-RECENT_LIMIT)
  write(RECENT_KEY, recent)
}

export const clearRecentExerciseIds = () => remove(RECENT_KEY)

// ---- Last-used config per workout (sets / intensity) ----------------------

const CONFIG_KEY = 'workoutConfigs'

export const getLastConfig = (workoutId) => read(CONFIG_KEY, {})[workoutId] || null

export function saveLastConfig(workoutId, config) {
  write(CONFIG_KEY, { ...read(CONFIG_KEY, {}), [workoutId]: config })
}

/** Link into a workout using its last-used sets/intensity, or its defaults. */
export function workoutPath(workout) {
  if (!workout) return '/workouts'
  if (workout.id === 'generated') return '/workout/generated'
  if (!workout.configurable) return `/workout/${workout.id}`
  const last = getLastConfig(workout.id)
  const sets = last?.sets || 4
  const intensity = last?.intensity || (workout.difficulty || 'Intermediate').toLowerCase()
  return `/workout/${workout.id}?sets=${sets}&intensity=${intensity}`
}
