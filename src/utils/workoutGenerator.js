import { exercises, getExerciseById } from '../data/exercises.js'

// Generate unique workout ID
function generateWorkoutId() {
  return 'workout_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Filter exercises based on user inputs
export function filterExercises(userInputs) {
  let pool = [...exercises]
  
  // Filter by equipment
  pool = pool.filter(ex => {
    // Exercise requires equipment that user has, OR exercise requires no equipment
    return ex.equipment_required.some(eq => userInputs.equipment_available.includes(eq)) ||
           ex.equipment_required.includes('none') ||
           ex.equipment_required.length === 0
  })
  
  // Filter by fitness level
  pool = pool.filter(ex => ex.difficulty_level === userInputs.fitness_level)
  
  // Filter by target area
  if (userInputs.target_area !== 'total_body') {
    const targetMap = {
      'upper_body': ['chest', 'shoulders', 'triceps', 'back', 'biceps'],
      'lower_body': ['legs', 'glutes'],
      'abs': ['abs', 'plank', 'yoga_core'],
      'booty': ['glutes'],
      'arms': ['biceps', 'triceps', 'shoulders'],
      'legs': ['legs', 'glutes']
    }
    
    const targetSubcategories = targetMap[userInputs.target_area] || []
    pool = pool.filter(ex => 
      targetSubcategories.some(sub => ex.subcategory.includes(sub))
    )
  }
  
  // Remove banned exercises
  if (userInputs.banned_exercises && userInputs.banned_exercises.length > 0) {
    pool = pool.filter(ex => !userInputs.banned_exercises.includes(ex.exercise_id))
  }
  
  // Filter by workout type
  if (userInputs.workout_type === 'low_impact') {
    pool = pool.filter(ex => ex.is_low_impact === true)
  } else if (userInputs.workout_type === 'hiit') {
    pool = pool.filter(ex => 
      ex.category.includes('cardio') || 
      ex.category === 'kickboxing' ||
      ex.category === 'compound'
    )
  } else if (userInputs.workout_type === 'strength') {
    pool = pool.filter(ex => ex.category.includes('strength'))
  } else if (userInputs.workout_type === 'kickboxing') {
    pool = pool.filter(ex => ex.category === 'kickboxing')
  } else if (userInputs.workout_type === 'yoga') {
    pool = pool.filter(ex => 
      ex.category === 'yoga' || 
      ex.subcategory === 'yoga_core' ||
      ex.name.toLowerCase().includes('pose')
    )
  }
  
  return pool
}

// Select exercises from pool ensuring variety
function selectExercises(pool, count, duration, usedExerciseIds = []) {
  let selected = []
  let available = pool.filter(ex => !usedExerciseIds.includes(ex.exercise_id))
  
  // If we don't have enough exercises, allow some reuse but try to avoid it
  if (available.length < count) {
    available = [...pool] // Allow reuse if necessary
  }
  
  // Shuffle array for randomness
  available = shuffleArray([...available])
  
  for (let i = 0; i < count && available.length > 0; i++) {
    // Find an exercise we haven't used yet
    let exercise = available.find(ex => !usedExerciseIds.includes(ex.exercise_id))
    
    // If all exercises are used, just pick any
    if (!exercise) {
      exercise = available[0]
    }
    
    selected.push({
      exercise_id: exercise.exercise_id,
      duration: duration
    })
    
    usedExerciseIds.push(exercise.exercise_id)
    
    // Remove from available pool
    available = available.filter(ex => ex.exercise_id !== exercise.exercise_id)
  }
  
  return { selected, usedExerciseIds }
}

// Shuffle array for randomness
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Determine circuit count based on duration
function getCircuitCount(duration) {
  const circuitMap = {
    10: 1,
    20: 2,
    30: 3,
    45: 5
  }
  return circuitMap[duration] || 1
}

// Build a single circuit using 3-2-1 system
function buildCircuit(circuitNumber, exercisePool, usedExerciseIds, targetArea, workoutType) {
  let circuit = {
    circuit_number: circuitNumber,
    rounds: 1,
    sections: []
  }
  
  let currentUsedIds = [...usedExerciseIds]
  
  // STRENGTH SECTION (3 minutes)
  let strengthPool = exercisePool.filter(ex => 
    ex.category.includes('strength') && 
    ex.category !== 'strength_core'
  )
  
  // For total_body workouts, rotate muscle groups across circuits
  if (targetArea === 'total_body') {
    const muscleGroups = ['upper', 'lower', 'core']
    const groupIndex = (circuitNumber - 1) % 3
    
    if (groupIndex === 0) {
      // Upper body focus
      strengthPool = strengthPool.filter(ex => ex.category === 'strength_upper')
    } else if (groupIndex === 1) {
      // Lower body focus
      strengthPool = strengthPool.filter(ex => ex.category === 'strength_lower')
    } else {
      // Core focus (but we'll do this in abs section, so do upper again)
      strengthPool = strengthPool.filter(ex => ex.category === 'strength_upper')
    }
  }
  
  if (strengthPool.length > 0) {
    const { selected, usedExerciseIds: newUsedIds } = selectExercises(
      strengthPool,
      3, // 3 exercises at 60 seconds each = 3 minutes
      60,
      currentUsedIds
    )
    currentUsedIds = newUsedIds
    
    circuit.sections.push({
      type: 'strength',
      duration: 180,
      exercises: selected
    })
  }
  
  // CARDIO SECTION (2 minutes)
  let cardioPool = exercisePool.filter(ex => 
    ex.category.includes('cardio') || 
    ex.category === 'kickboxing' ||
    (ex.category === 'compound' && workoutType === 'hiit')
  )
  
  if (cardioPool.length > 0) {
    // 2 exercises at 60 seconds each, or 4 exercises at 30 seconds each
    const exerciseCount = cardioPool.length >= 4 ? 4 : 2
    const exerciseDuration = exerciseCount === 4 ? 30 : 60
    
    const { selected, usedExerciseIds: newUsedIds } = selectExercises(
      cardioPool,
      exerciseCount,
      exerciseDuration,
      currentUsedIds
    )
    currentUsedIds = newUsedIds
    
    circuit.sections.push({
      type: 'cardio',
      duration: 120,
      exercises: selected
    })
  }
  
  // ABS SECTION (1 minute)
  let absPool = exercisePool.filter(ex => 
    ex.category === 'strength_core' ||
    ex.subcategory === 'abs' ||
    ex.subcategory === 'plank'
  )
  
  if (absPool.length > 0) {
    // 1 exercise at 60 seconds, or 2 exercises at 30 seconds each
    const exerciseCount = absPool.length >= 2 ? 2 : 1
    const exerciseDuration = exerciseCount === 2 ? 30 : 60
    
    const { selected, usedExerciseIds: newUsedIds } = selectExercises(
      absPool,
      exerciseCount,
      exerciseDuration,
      currentUsedIds
    )
    currentUsedIds = newUsedIds
    
    circuit.sections.push({
      type: 'abs',
      duration: 60,
      exercises: selected
    })
  }
  
  return { circuit, usedExerciseIds: currentUsedIds }
}

// Get warmup exercises
function getWarmupExercises(exercisePool) {
  const warmupNames = [
    'Butt Kicks',
    'March in Place',
    'Jog in Place',
    'Jumping Jacks',
    'High Knees'
  ]
  
  let warmupPool = exercisePool.filter(ex => 
    warmupNames.some(name => ex.name.toLowerCase().includes(name.toLowerCase())) ||
    ex.is_low_impact === true && ex.category.includes('cardio')
  )
  
  // Select 3-4 warmup exercises, 30 seconds each
  const { selected } = selectExercises(warmupPool, 4, 30, [])
  
  return selected
}

// Get cooldown exercises
function getCooldownExercises(exercisePool) {
  const cooldownNames = [
    'Cobra Pose',
    'Downward Dog',
    'Sun Salutations'
  ]
  
  let cooldownPool = exercisePool.filter(ex => 
    cooldownNames.some(name => ex.name.toLowerCase().includes(name.toLowerCase())) ||
    (ex.is_low_impact === true && ex.category === 'yoga')
  )
  
  // If no yoga exercises, use low-impact stretching movements
  if (cooldownPool.length === 0) {
    cooldownPool = exercisePool.filter(ex => 
      ex.is_low_impact === true && 
      (ex.category === 'strength_core' || ex.category === 'yoga')
    )
  }
  
  // Select 3-4 cooldown exercises, 30 seconds each
  const { selected } = selectExercises(cooldownPool, 4, 30, [])
  
  return selected
}

// Calculate estimated calories burned
export function calculateCalories(workout, userWeight = 150) {
  let totalCalories = 0
  
  // Warmup calories
  if (workout.warmup && workout.warmup.exercises) {
    workout.warmup.exercises.forEach(exercise => {
      const exerciseData = getExerciseById(exercise.exercise_id)
      if (exerciseData) {
        const minutes = exercise.duration / 60
        totalCalories += exerciseData.calories_per_minute * minutes * (userWeight / 150)
      }
    })
  }
  
  // Circuit calories
  if (workout.circuits) {
    workout.circuits.forEach(circuit => {
      circuit.sections.forEach(section => {
        section.exercises.forEach(exercise => {
          const exerciseData = getExerciseById(exercise.exercise_id)
          if (exerciseData) {
            const minutes = exercise.duration / 60
            totalCalories += exerciseData.calories_per_minute * minutes * (userWeight / 150)
          }
        })
      })
    })
  }
  
  // Cooldown calories
  if (workout.cooldown && workout.cooldown.exercises) {
    workout.cooldown.exercises.forEach(exercise => {
      const exerciseData = getExerciseById(exercise.exercise_id)
      if (exerciseData) {
        const minutes = exercise.duration / 60
        totalCalories += exerciseData.calories_per_minute * minutes * (userWeight / 150)
      }
    })
  }
  
  return Math.round(totalCalories)
}

// Track recent workouts to avoid exercise repetition
let recentWorkoutExercises = []

// Get exercises used in recent workouts
function getRecentExerciseIds(count = 5) {
  return recentWorkoutExercises.slice(-count).flat()
}

// Main workout generator function
export function generateWorkout(userInputs, userWeight = 150) {
  // Validate inputs
  const defaultInputs = {
    duration: 20,
    fitness_level: 'intermediate',
    target_area: 'total_body',
    workout_type: 'mixed',
    equipment_available: ['none'],
    banned_exercises: []
  }
  
  const inputs = { ...defaultInputs, ...userInputs }
  
  // Filter exercise pool
  let exercisePool = filterExercises(inputs)
  
  if (exercisePool.length === 0) {
    throw new Error('No exercises match your criteria. Please adjust your filters.')
  }
  
  // Get recent exercise IDs to avoid repetition
  const recentExerciseIds = getRecentExerciseIds(5)
  
  // Remove recent exercises from pool (but keep some available if pool is too small)
  let availablePool = exercisePool.filter(ex => 
    !recentExerciseIds.includes(ex.exercise_id)
  )
  
  // If filtering out recent exercises leaves us with too few, use full pool
  if (availablePool.length < 20) {
    availablePool = exercisePool
  }
  
  // Determine circuit count
  const circuitCount = getCircuitCount(inputs.duration)
  
  // Generate workout structure
  const workout = {
    workout_id: generateWorkoutId(),
    total_duration: inputs.duration,
    structure: '3-2-1',
    warmup: {
      duration: 120,
      exercises: []
    },
    circuits: [],
    cooldown: {
      duration: 120,
      exercises: []
    },
    estimated_calories: 0
  }
  
  // Build warmup
  const warmupExercises = getWarmupExercises(availablePool)
  workout.warmup.exercises = warmupExercises
  
  // Track all exercises used in this workout
  let allUsedExerciseIds = warmupExercises.map(ex => ex.exercise_id)
  
  // Build circuits
  for (let i = 1; i <= circuitCount; i++) {
    const { circuit, usedExerciseIds } = buildCircuit(
      i,
      availablePool,
      allUsedExerciseIds,
      inputs.target_area,
      inputs.workout_type
    )
    
    workout.circuits.push(circuit)
    allUsedExerciseIds = [...allUsedExerciseIds, ...usedExerciseIds]
    
    // Remove used exercises from available pool to ensure variety
    availablePool = availablePool.filter(ex => 
      !allUsedExerciseIds.includes(ex.exercise_id)
    )
    
    // If pool is getting too small, reset it (but still avoid duplicates within workout)
    if (availablePool.length < 10) {
      availablePool = exercisePool.filter(ex => 
        !allUsedExerciseIds.includes(ex.exercise_id)
      )
    }
  }
  
  // Build cooldown
  const cooldownExercises = getCooldownExercises(availablePool)
  workout.cooldown.exercises = cooldownExercises
  
  // Calculate calories
  workout.estimated_calories = calculateCalories(workout, userWeight)
  
  // Track this workout's exercises for future variety
  recentWorkoutExercises.push(allUsedExerciseIds)
  
  // Keep only last 5 workouts in memory
  if (recentWorkoutExercises.length > 5) {
    recentWorkoutExercises.shift()
  }
  
  return workout
}

// Clear recent workout history (useful for testing or reset)
export function clearRecentWorkouts() {
  recentWorkoutExercises = []
}

// Get workout summary (for display)
export function getWorkoutSummary(workout) {
  const totalExercises = 
    workout.warmup.exercises.length +
    workout.circuits.reduce((sum, circuit) => 
      sum + circuit.sections.reduce((s, section) => s + section.exercises.length, 0), 0
    ) +
    workout.cooldown.exercises.length
  
  return {
    workout_id: workout.workout_id,
    total_duration: workout.total_duration,
    total_circuits: workout.circuits.length,
    total_exercises: totalExercises,
    estimated_calories: workout.estimated_calories,
    structure: workout.structure
  }
}
