// Helper functions to build specific workouts for programs
import { exercises, getExerciseById } from './exercises.js'

// Helper to find exercise by name pattern
function findExerciseByName(pattern) {
  return exercises.find(ex => 
    ex.name.toLowerCase().includes(pattern.toLowerCase()) ||
    pattern.toLowerCase().includes(ex.name.toLowerCase())
  )
}

// Helper to find multiple exercises by patterns
function findExercisesByPatterns(patterns) {
  return patterns.map(pattern => findExerciseByName(pattern)).filter(Boolean)
}

// Build a 3-2-1 circuit workout
export function build321Workout(name, strengthExercises, cardioExercises, absExercises, duration = 20, customWorkoutId = null) {
  const warmupExercises = findExercisesByPatterns([
    'Butt Kicks', 'March in Place', 'Jumping Jacks', 'High Knees'
  ])
  
  const cooldownExercises = findExercisesByPatterns([
    'Cobra Pose', 'Downward Dog', 'Sun Salutations'
  ])

  // If we don't have enough, use any low-impact exercises
  while (warmupExercises.length < 4) {
    const lowImpact = exercises.find(ex => 
      ex.is_low_impact && ex.category.includes('cardio') && 
      !warmupExercises.includes(ex)
    )
    if (lowImpact) warmupExercises.push(lowImpact)
    else break
  }

  while (cooldownExercises.length < 4) {
    const yoga = exercises.find(ex => 
      (ex.category === 'yoga' || ex.subcategory === 'yoga_core') && 
      !cooldownExercises.includes(ex)
    )
    if (yoga) cooldownExercises.push(yoga)
    else break
  }

  const strengthIds = findExercisesByPatterns(strengthExercises).map(ex => ex.exercise_id)
  const cardioIds = findExercisesByPatterns(cardioExercises).map(ex => ex.exercise_id)
  const absIds = findExercisesByPatterns(absExercises).map(ex => ex.exercise_id)

  // Build circuits based on duration
  const circuitCount = duration === 10 ? 1 : duration === 20 ? 2 : duration === 30 ? 3 : 5
  
  const circuits = []
  for (let i = 0; i < circuitCount; i++) {
    const circuit = {
      circuit_number: i + 1,
      rounds: 1,
      sections: []
    }

    // Strength section (3 minutes) - 3 exercises at 60s each
    if (strengthIds.length >= 3) {
      const strengthSection = {
        type: 'strength',
        duration: 180,
        exercises: strengthIds.slice(i * 3, (i * 3) + 3).map(id => ({
          exercise_id: id,
          duration: 60
        }))
      }
      // If we run out, cycle back
      if (strengthSection.exercises.length < 3) {
        const needed = 3 - strengthSection.exercises.length
        strengthSection.exercises.push(
          ...strengthIds.slice(0, needed).map(id => ({ exercise_id: id, duration: 60 }))
        )
      }
      circuit.sections.push(strengthSection)
    }

    // Cardio section (2 minutes) - 2 exercises at 60s each
    if (cardioIds.length >= 2) {
      const cardioSection = {
        type: 'cardio',
        duration: 120,
        exercises: cardioIds.slice(i * 2, (i * 2) + 2).map(id => ({
          exercise_id: id,
          duration: 60
        }))
      }
      if (cardioSection.exercises.length < 2) {
        const needed = 2 - cardioSection.exercises.length
        cardioSection.exercises.push(
          ...cardioIds.slice(0, needed).map(id => ({ exercise_id: id, duration: 60 }))
        )
      }
      circuit.sections.push(cardioSection)
    }

    // Abs section (1 minute) - 1 exercise at 60s
    if (absIds.length >= 1) {
      const absSection = {
        type: 'abs',
        duration: 60,
        exercises: [{
          exercise_id: absIds[i % absIds.length],
          duration: 60
        }]
      }
      circuit.sections.push(absSection)
    }

    circuits.push(circuit)
  }

  return {
    workout_id: customWorkoutId || `workout-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    name: name,
    duration: duration,
    structure: '3-2-1',
    warmup: {
      duration: 120,
      exercises: warmupExercises.slice(0, 4).map(ex => ({
        exercise_id: ex.exercise_id,
        duration: 30
      }))
    },
    circuits: circuits,
    cooldown: {
      duration: 120,
      exercises: cooldownExercises.slice(0, 4).map(ex => ({
        exercise_id: ex.exercise_id,
        duration: 30
      }))
    },
    estimated_calories: 0 // Will be calculated
  }
}

// Build 30 Day Shred Level 1 workout
export function buildShredLevel1() {
  return build321Workout(
    '30 Day Shred - Level 1',
    [
      'Standard Push-ups', 'Squats with Overhead Press', 'Tricep Kickbacks',
      'Rows', 'Lunges', 'Shoulder Press',
      'Bicep Curls', 'Glute Bridges', 'Front Shoulder Raise'
    ],
    [
      'Fast Feet', 'Skaters', 'Butt Kicks', 'Jumping Jacks',
      'High Knees', 'Mountain Climbers'
    ],
    [
      'Standard Plank', 'Basic Crunches', 'Bicycle Crunches'
    ],
    20,
    'shred-level-1'
  )
}

// Build 30 Day Shred Level 2 workout (harder)
export function buildShredLevel2() {
  return build321Workout(
    '30 Day Shred - Level 2',
    [
      'Wide Push-ups', 'Jump Squats', 'Tricep Extensions',
      'Bent-Over Rows', 'Jump Lunges', 'Arnold Press',
      'Hammer Curls', 'Single-Leg Glute Bridges', 'Lateral Shoulder Raise'
    ],
    [
      'Jump Squats', 'Jump Lunges', 'Burpees', 'Mountain Climbers',
      'Plank Jacks', 'High Knees with Rotation'
    ],
    [
      'Side Plank', 'Double Crunches', 'Russian Twists'
    ],
    20,
    'shred-level-2'
  )
}

// Build 30 Day Shred Level 3 workout (advanced)
export function buildShredLevel3() {
  return build321Workout(
    '30 Day Shred - Level 3',
    [
      'Narrow Push-ups', 'Single-Leg Squats', 'Tricep Kickbacks in Plank',
      'Renegade Rows', 'Static Jumping Lunges', 'Pike Push-ups',
      'Reverse Bicep Curls', 'Glute Bridges with Chest Press', 'Reverse Dumbbell Flys'
    ],
    [
      'Burpees', 'Jump Lunges', 'Skaters', 'Plank Moguls',
      'Cannonballs', 'Twisting Mountain Climbers'
    ],
    [
      'Plank with Alternating Reverse Fly', 'V-Sit Crunches', 'Hollow Man Hold'
    ],
    20,
    'shred-level-3'
  )
}

// Build beginner workout
export function buildBeginnerWorkout(number) {
  return build321Workout(
    `Beginner Workout ${number}`,
    [
      'Knee Push-ups', 'Chair Squats', 'Front Shoulder Raise',
      'Standard Bicep Curls', 'Forward Lunges', 'Lateral Shoulder Raise',
      'Glute Bridges', 'Air Squats', 'Good Mornings with Weights'
    ],
    [
      'March in Place', 'Jog in Place', 'Standing Mountain Climbers',
      'Butt Kicks', 'High Knees'
    ],
    [
      'Basic Crunches', 'Standard Plank', 'Superman Hold'
    ],
    20,
    `beginner-workout-${number}`
  )
}

// Build running strength workout (focus on legs, core, and injury prevention)
export function buildRunningStrengthWorkout(week, programType = '5k') {
  const workoutName = `${programType.toUpperCase()} Week ${week} - Strength Training`
  
  // Focus on: squats, lunges, glutes, core, and upper body for balance
  return build321Workout(
    workoutName,
    [
      'Air Squats', 'Forward Lunges', 'Glute Bridges',
      'Single-Leg Glute Bridges', 'Step-ups', 'Donkey Kicks',
      'Good Mornings with Weights', 'Weighted Squats', 'Surrenders'
    ],
    [
      'March in Place', 'High Knees', 'Butt Kicks',
      'Standing Mountain Climbers', 'Fast Feet'
    ],
    [
      'Standard Plank', 'Side Plank', 'Bicycle Crunches',
      'Russian Twists', 'Leg Raises', 'Hollow Man Hold'
    ],
    25,
    `${programType}-week${week}-strength`
  )
}
