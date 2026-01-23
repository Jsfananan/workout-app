// Load workouts for programs on demand
import { 
  buildShredLevel1, 
  buildShredLevel2, 
  buildShredLevel3,
  buildBeginnerWorkout,
  buildRunningStrengthWorkout
} from './workoutBuilders.js'

// Cache for loaded workouts
const workoutCache = {}

// Get workout by ID (for program workouts)
export function getProgramWorkout(workoutId) {
  // Check cache first
  if (workoutCache[workoutId]) {
    return workoutCache[workoutId]
  }

  // Build workout based on ID pattern
  let workout = null

  // Exact match first
  if (workoutId === 'shred-level-1') {
    workout = buildShredLevel1()
  } else if (workoutId === 'shred-level-2') {
    workout = buildShredLevel2()
  } else if (workoutId === 'shred-level-3') {
    workout = buildShredLevel3()
  } else if (workoutId.startsWith('beginner-workout-')) {
    // Extract number from workout ID
    const match = workoutId.match(/beginner-workout-(\d+)/)
    const number = match ? parseInt(match[1]) : 1
    workout = buildBeginnerWorkout(number)
  } else if (workoutId.match(/5k-week\d+-strength/)) {
    // Extract week number from 5k strength workouts
    const match = workoutId.match(/5k-week(\d+)-strength/)
    const week = match ? parseInt(match[1]) : 1
    workout = buildRunningStrengthWorkout(week, '5k')
  } else if (workoutId.match(/hm-week\d+-strength/)) {
    // Extract week number from half marathon strength workouts
    const match = workoutId.match(/hm-week(\d+)-strength/)
    const week = match ? parseInt(match[1]) : 1
    workout = buildRunningStrengthWorkout(week, 'hm')
  } else {
    // Fallback: try pattern matching
    if (workoutId.includes('shred-level-1') || workoutId.includes('30 Day Shred - Level 1')) {
      workout = buildShredLevel1()
    } else if (workoutId.includes('shred-level-2') || workoutId.includes('30 Day Shred - Level 2')) {
      workout = buildShredLevel2()
    } else if (workoutId.includes('shred-level-3') || workoutId.includes('30 Day Shred - Level 3')) {
      workout = buildShredLevel3()
    } else if (workoutId.includes('beginner-workout') || workoutId.includes('Beginner Workout')) {
      const match = workoutId.match(/(\d+)/)
      const number = match ? parseInt(match[1]) : 1
      workout = buildBeginnerWorkout(number)
    }
  }

  // Cache it
  if (workout) {
    workoutCache[workoutId] = workout
  }

  return workout
}

// Get all workouts for a program (pre-build them)
export async function getProgramWorkouts(programId) {
  const { programs } = await import('./programs.js')
  const program = programs.find(p => p.program_id === programId)
  if (!program) return {}

  const workouts = {}
  
  program.calendar.forEach(day => {
    if (day.workout_id && day.workout_type !== 'rest' && day.workout_type !== 'running') {
      if (!workouts[day.workout_id]) {
        workouts[day.workout_id] = getProgramWorkout(day.workout_id)
      }
    }
  })

  return workouts
}
