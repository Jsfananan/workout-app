// Exercise Database
// This file contains the complete exercise database with all exercises, their properties, and relationships

// Helper function to get exercise by ID
export const getExerciseById = (id) => {
  return exercises.find(ex => ex.exercise_id === id)
}

// Helper function to get exercises by category
export const getExercisesByCategory = (category) => {
  return exercises.filter(ex => ex.category === category)
}

// Helper function to get exercises by subcategory
export const getExercisesBySubcategory = (subcategory) => {
  return exercises.filter(ex => ex.subcategory === subcategory)
}

// Helper function to get exercises by difficulty
export const getExercisesByDifficulty = (difficulty) => {
  return exercises.filter(ex => ex.difficulty_level === difficulty)
}

// Helper function to get alternatives for an exercise
export const getAlternatives = (exerciseId) => {
  const exercise = getExerciseById(exerciseId)
  if (!exercise || !exercise.alternatives) return []
  return exercise.alternatives.map(id => getExerciseById(id)).filter(Boolean)
}

// Helper function to get easier modification
export const getEasierModification = (exerciseId) => {
  const exercise = getExerciseById(exerciseId)
  if (!exercise || !exercise.modification_easier) return null
  return getExerciseById(exercise.modification_easier)
}

// Helper function to get harder modification
export const getHarderModification = (exerciseId) => {
  const exercise = getExerciseById(exerciseId)
  if (!exercise || !exercise.modification_harder) return null
  return getExerciseById(exercise.modification_harder)
}

// Exercise ID counter - starts at 1
let exerciseIdCounter = 1

// Helper to create exercise with auto-incrementing ID
const createExercise = (data) => {
  return {
    exercise_id: exerciseIdCounter++,
    ...data
  }
}

// Helper to find exercise IDs by name pattern (for alternatives)
const findExerciseIds = (namePatterns) => {
  return exercises
    .filter(ex => namePatterns.some(pattern => ex.name.toLowerCase().includes(pattern.toLowerCase())))
    .map(ex => ex.exercise_id)
    .slice(0, 10)
}

// Main exercises array
export const exercises = [
  // ============================================
  // STRENGTH - UPPER BODY
  // ============================================
  
  // CHEST/SHOULDERS/TRICEPS
  // Push-up variations
  createExercise({
    name: "Knee Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Start in plank position with knees on the ground. Lower your chest toward the floor, keeping your back straight, then push back up.",
    duration_default: 30,
    muscles_targeted: ["chest", "shoulders", "triceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null, // Will be set after standard push-ups
    alternatives: [] // Will be populated after all exercises are added
  }),
  
  createExercise({
    name: "Standard Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Start in plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, keeping your body in a straight line, then push back up.",
    duration_default: 30,
    muscles_targeted: ["chest", "shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null, // Will be set to knee push-ups
    modification_harder: null, // Will be set to wide push-ups
    alternatives: []
  }),
  
  createExercise({
    name: "Wide Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform push-ups with hands wider than shoulder-width apart to target outer chest muscles.",
    duration_default: 30,
    muscles_targeted: ["chest", "shoulders", "triceps"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Narrow Push-ups",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform push-ups with hands close together, forming a diamond shape. This targets triceps more intensely.",
    duration_default: 30,
    muscles_targeted: ["triceps", "chest", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Pike Push-ups",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Start in downward dog position with hips high. Lower your head toward the floor, then push back up. Great for shoulders.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crow Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Advanced push-up variation with feet elevated and body in a pike position, targeting upper chest and shoulders.",
    duration_default: 30,
    muscles_targeted: ["chest", "shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Dive Bomber Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Start in downward dog, swoop down and forward into upward dog position, then reverse the movement.",
    duration_default: 30,
    muscles_targeted: ["chest", "shoulders", "triceps", "back", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "One-Arm Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Extremely advanced push-up performed with one arm. Requires exceptional strength and stability.",
    duration_default: 20,
    muscles_targeted: ["chest", "shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Hero Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Push-up variation with hands positioned behind the body, creating extreme difficulty.",
    duration_default: 20,
    muscles_targeted: ["chest", "shoulders", "triceps"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Plank Push-ups",
    category: "strength_upper",
    subcategory: "chest",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Perform push-ups while rotating into side plank position, alternating sides with each rep.",
    duration_default: 30,
    muscles_targeted: ["chest", "shoulders", "triceps", "core", "obliques"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Dips
  createExercise({
    name: "Chair Dips",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "beginner",
    equipment_required: ["bench"],
    description: "Sit on edge of chair, place hands beside hips, slide forward and lower body by bending arms, then push back up.",
    duration_default: 30,
    muscles_targeted: ["triceps", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Bench Dips",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "intermediate",
    equipment_required: ["bench"],
    description: "Similar to chair dips but using a bench. Place hands on bench behind you, lower body by bending arms, push back up.",
    duration_default: 30,
    muscles_targeted: ["triceps", "shoulders", "chest"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Shoulder exercises
  createExercise({
    name: "Military Press",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Stand with feet hip-width apart, hold weights at shoulder height, press straight overhead with palms facing forward.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "triceps", "core"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Overhead Press",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Press weights from shoulder level to overhead, keeping core engaged and back straight.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "triceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Arnold Press",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Start with weights at chest level, palms facing you. Rotate wrists outward as you press overhead, then reverse the motion.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "triceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Front Shoulder Raise",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "beginner",
    equipment_required: ["dumbbells"],
    description: "Stand holding weights at your sides, raise arms straight in front of you to shoulder height, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lateral Shoulder Raise",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "beginner",
    equipment_required: ["dumbbells"],
    description: "Stand holding weights at your sides, raise arms out to the sides until parallel to floor, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Reverse Dumbbell Flys",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Bend forward slightly, raise arms out to sides with slight bend in elbows, targeting rear deltoids.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "back"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Tricep exercises
  createExercise({
    name: "Tricep Extensions",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold weight overhead with both hands, lower behind head by bending elbows, then extend back up.",
    duration_default: 30,
    muscles_targeted: ["triceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Tricep Kickbacks",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Bend forward, hold weight with arm bent at 90 degrees, extend arm straight back, then return.",
    duration_default: 30,
    muscles_targeted: ["triceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Tricep Kickbacks in Plank",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "In plank position, hold weight in one hand, perform tricep kickback while maintaining plank position.",
    duration_default: 30,
    muscles_targeted: ["triceps", "core", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side-Lying Tricep Presses",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Lie on your side, hold weight with top arm, extend arm straight up, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["triceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Tabletop Tricep Dips",
    category: "strength_upper",
    subcategory: "triceps",
    difficulty_level: "intermediate",
    equipment_required: ["bench"],
    description: "Sit on floor with hands on bench behind you, lift hips to tabletop position, lower and raise body by bending arms.",
    duration_default: 30,
    muscles_targeted: ["triceps", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Downward Dog Pose",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Start on hands and knees, lift hips up and back, forming an inverted V shape. Hold and breathe.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "hamstrings", "core"],
    is_low_impact: true,
    calories_per_minute: 5,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // BACK/BICEPS
  createExercise({
    name: "Double-Arm Rows",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Bend forward with slight knee bend, pull weights toward lower chest, squeezing shoulder blades together.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Single-Arm Rows",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Place one hand and knee on bench, hold weight in other hand, pull weight to side of chest, then lower.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Bent-Over Wide Rows",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Bend forward, pull weights wide to sides, targeting upper back and rear deltoids.",
    duration_default: 30,
    muscles_targeted: ["back", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Bent-Over Medium Rows",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Bend forward, pull weights to mid-chest level, hands at medium width.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Renegade Rows",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "In plank position with weights, alternate rowing one weight to side while maintaining plank position.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps", "core", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Upright Rows",
    category: "strength_upper",
    subcategory: "shoulders",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Stand holding weights, pull straight up to chest level, keeping weights close to body.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Rows in Squat Position",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold squat position while performing rowing motion, engaging legs and back simultaneously.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps", "legs", "glutes"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Back Row with Dumbbells",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Bend forward, pull weights toward lower chest, focusing on squeezing shoulder blades together.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lat Pulls",
    category: "strength_upper",
    subcategory: "back",
    difficulty_level: "intermediate",
    equipment_required: ["bands"],
    description: "Using resistance band, pull from overhead down to chest level, engaging latissimus dorsi muscles.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Standard Bicep Curls",
    category: "strength_upper",
    subcategory: "biceps",
    difficulty_level: "beginner",
    equipment_required: ["dumbbells"],
    description: "Stand holding weights at sides, curl weights up by bending elbows, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Hammer Curls",
    category: "strength_upper",
    subcategory: "biceps",
    difficulty_level: "beginner",
    equipment_required: ["dumbbells"],
    description: "Curl weights with palms facing each other (neutral grip), targeting biceps and forearms.",
    duration_default: 30,
    muscles_targeted: ["biceps", "forearms"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Reverse Bicep Curls",
    category: "strength_upper",
    subcategory: "biceps",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Curl weights with palms facing down, targeting forearms and brachialis muscle.",
    duration_default: 30,
    muscles_targeted: ["forearms", "biceps"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Serving Biceps",
    category: "strength_upper",
    subcategory: "biceps",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "In pendulum lunge position, perform bicep curls while maintaining lunge stance.",
    duration_default: 30,
    muscles_targeted: ["biceps", "legs", "glutes"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // ============================================
  // STRENGTH - LOWER BODY
  // ============================================
  
  // Squat variations
  createExercise({
    name: "Air Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Stand with feet shoulder-width apart, lower down as if sitting in a chair, keeping knees behind toes, then stand back up.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Weighted Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform squats while holding weights at shoulder level or at sides.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Chair Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["bench"],
    description: "Squat down until you touch the chair, then stand back up. Great for beginners learning proper form.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jump Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform a squat, then explosively jump up, landing softly and immediately going into next squat.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Sumo Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Stand with feet wider than shoulder-width, toes turned out, squat down keeping knees in line with toes.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "inner thighs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plie Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Similar to sumo squats but with more emphasis on inner thighs and glutes.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "inner thighs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Half Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Perform squats going only halfway down, reducing range of motion for easier execution.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Speed Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform squats at a faster pace, focusing on quick up and down movement.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Reverse Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Step backward into a lunge position, then return to start. Alternate legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Single-Leg Squats",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Perform squats on one leg, extending other leg forward. Extremely challenging.",
    duration_default: 20,
    muscles_targeted: ["legs", "glutes", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Squat with Overhead Press",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform a squat, then press weights overhead as you stand up.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "triceps"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Squat with Row",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold squat position while performing rowing motion with weights.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "back", "biceps"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Thrusters",
    category: "compound",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Squat down, then explosively stand up while pressing weights overhead in one fluid motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Lunge variations
  createExercise({
    name: "Forward Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Step forward into a lunge, front knee at 90 degrees, back knee nearly touching ground, then return to start.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Backward Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Step backward into a lunge position, then return to start. Easier on knees than forward lunges.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Step to the side into a lunge, keeping other leg straight, then return to center.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "inner thighs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Stationary Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Hold lunge position, lower and raise body without stepping, then switch legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Pendulum Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Alternate between forward and backward lunges in a swinging motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jump Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "In lunge position, explosively jump up and switch legs mid-air, landing in opposite lunge.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Alternating Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Alternate stepping forward with each leg into lunge position.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crossover Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Step across body into a lunge, targeting inner and outer thighs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "inner thighs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Clockwork Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform lunges in all directions (forward, side, back, diagonal) like clock positions.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Static Jumping Lunges",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Hold lunge position and perform small explosive jumps without switching legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lunges with Bicep Curl",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform lunge while simultaneously curling weights with both arms.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "biceps"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lunges with Shoulder Press",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform lunge while pressing weights overhead.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "triceps"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lunges with Front Row",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold lunge position while performing front rowing motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "back", "biceps"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // More lower body exercises
  createExercise({
    name: "Single-Leg Deadlifts with Upright Rows",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "Balance on one leg, hinge forward while lifting other leg back, perform upright row at bottom.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "hamstrings", "shoulders", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Good Mornings with Weights",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold weights at shoulders, hinge at hips keeping back straight, then return to standing.",
    duration_default: 30,
    muscles_targeted: ["hamstrings", "glutes", "back"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Weighted Step-ups",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells", "bench"],
    description: "Step up onto bench while holding weights, then step back down. Alternate legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Step-ups with Jump",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["bench"],
    description: "Step up onto bench, then explosively jump up, landing back on ground.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lying Leg Lifts",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lie on side, lift top leg straight up, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "outer thighs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Leg Abduction",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lift leg out to the side, targeting outer thigh muscles.",
    duration_default: 30,
    muscles_targeted: ["outer thighs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Leg Adduction",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lift leg across body or squeeze legs together, targeting inner thighs.",
    duration_default: 30,
    muscles_targeted: ["inner thighs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Outer Thigh Lifts",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lift leg to the side while lying down, targeting outer thigh and glutes.",
    duration_default: 30,
    muscles_targeted: ["outer thighs", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Donkey Kicks",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "On hands and knees, lift one leg up and back, squeezing glutes at the top.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Bear Kicks",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In bear crawl position, kick leg up and back, alternating sides.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Alternating Donkey Kicks",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Alternate lifting legs in donkey kick position.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Glute Bridges",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lie on back, knees bent, lift hips up squeezing glutes, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings", "core"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Single-Leg Glute Bridges",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform glute bridge with one leg extended, increasing difficulty.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings", "core"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Glute Bridges with Chest Press",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold glute bridge position while performing chest press with weights.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings", "chest", "triceps"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Glute Bridges with Lat Pull",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "intermediate",
    equipment_required: ["bands"],
    description: "Hold glute bridge position while performing lat pull with resistance band.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings", "back"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Pelvic Thrusts",
    category: "strength_lower",
    subcategory: "glutes",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Similar to glute bridge but with more emphasis on pelvic movement.",
    duration_default: 30,
    muscles_targeted: ["glutes", "hamstrings"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Surrenders",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Start standing, drop to one knee, then the other, stand back up. Alternate leading leg.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Deadlift with Hammer Curl",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform deadlift motion while simultaneously performing hammer curls.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "hamstrings", "biceps"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Kettlebell Swings",
    category: "strength_lower",
    subcategory: "legs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold weight with both hands, hinge at hips, swing weight up to chest level using hip drive.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "hamstrings", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // ============================================
  // STRENGTH - CORE
  // ============================================
  
  // Plank variations
  createExercise({
    name: "Standard Plank",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Hold body in straight line, supported on forearms and toes. Engage core and breathe steadily.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Plank",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Hold body in straight line on one side, supported on forearm and side of foot.",
    duration_default: 30,
    muscles_targeted: ["core", "obliques", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Plank with Lifts",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Hold side plank, lift top leg up and down while maintaining position.",
    duration_default: 30,
    muscles_targeted: ["core", "obliques", "glutes"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Plank with Hip Raises",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In side plank, lower hip toward ground, then lift back up.",
    duration_default: 30,
    muscles_targeted: ["core", "obliques"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Plank with Traveling Feet",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "In side plank, move feet forward and back while maintaining position.",
    duration_default: 30,
    muscles_targeted: ["core", "obliques", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Reverse Plank",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Sit with legs extended, place hands behind you, lift hips up creating straight line from head to heels.",
    duration_default: 30,
    muscles_targeted: ["core", "glutes", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Walking Planks",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Start in plank, walk hands forward one at a time, then walk back.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plank Walks",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank position, walk feet side to side while maintaining plank.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plank with Alternating Reverse Fly",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "In plank with weights, alternate lifting arms out to sides in reverse fly motion.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "back"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plank Moguls",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "In plank, jump feet side to side quickly, like skiing moguls.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Running Plank Moguls",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "In plank, rapidly alternate bringing knees to chest while moving side to side.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Traveling Plank Moguls",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "In plank, jump feet side to side while moving forward and back.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plank Punches",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank position, alternate punching forward with each arm.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plank In-Outs",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank, jump feet in toward hands, then jump back to plank position.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plank Jacks",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank, jump feet apart and together, like jumping jacks.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Twisting Plank",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank, rotate hips side to side, engaging obliques.",
    duration_default: 30,
    muscles_targeted: ["core", "obliques"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Alternating Leg Lifts in Plank",
    category: "strength_core",
    subcategory: "plank",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank, alternate lifting legs straight up behind you.",
    duration_default: 30,
    muscles_targeted: ["core", "glutes", "hamstrings"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Crunches
  createExercise({
    name: "Basic Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lie on back, knees bent, lift shoulders off ground, then lower with control.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Double Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Simultaneously lift shoulders and knees toward each other, crunching in the middle.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Oblique Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Crunch while bringing opposite elbow to opposite knee, targeting obliques.",
    duration_default: 30,
    muscles_targeted: ["abs", "obliques"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Bicycle Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Alternate bringing opposite elbow to opposite knee in a cycling motion.",
    duration_default: 30,
    muscles_targeted: ["abs", "obliques"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "V-Sit Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Sit in V position, crunch bringing knees and chest together.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Pike Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on back, lift legs and torso simultaneously, reaching toward toes.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side Crunches",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on side, crunch bringing elbow toward hip.",
    duration_default: 30,
    muscles_targeted: ["obliques"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Dynamic Core
  createExercise({
    name: "Leg Raises",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on back, lift legs straight up, then lower with control without touching ground.",
    duration_default: 30,
    muscles_targeted: ["abs", "hip flexors"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lower Ab Crunch",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on back, lift hips off ground by bringing knees toward chest.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Standard Sit-ups",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lie on back, knees bent, sit all the way up, then lower back down.",
    duration_default: 30,
    muscles_targeted: ["abs", "hip flexors"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Sit-ups with Leg Extension",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform sit-up while extending legs straight out.",
    duration_default: 30,
    muscles_targeted: ["abs", "hip flexors"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Roll Over to Superman Combo",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Roll over from lying position to superman position, then reverse.",
    duration_default: 30,
    muscles_targeted: ["abs", "back"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Hollow Man Hold",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on back, lift shoulders and legs off ground, hold position creating hollow body shape.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Superman Hold",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lie face down, lift arms and legs off ground, hold position.",
    duration_default: 30,
    muscles_targeted: ["back", "glutes"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Superman with Dumbbell Shoulder Press",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "In superman position, perform shoulder presses with weights.",
    duration_default: 30,
    muscles_targeted: ["back", "glutes", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Russian Twists",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Sit with knees bent, lean back slightly, rotate torso side to side.",
    duration_default: 30,
    muscles_targeted: ["abs", "obliques"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Windshield Wiper Legs",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on back, lift legs straight up, swing side to side like windshield wipers.",
    duration_default: 30,
    muscles_targeted: ["abs", "obliques"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "V-Sit into Hollow Man",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Transition from V-sit position to hollow man hold and back.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Ab Hold to Tabletop",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Hold hollow man position, then bring knees to tabletop position, alternating.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Climb",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank or hanging position, alternate bringing knees up in climbing motion.",
    duration_default: 30,
    muscles_targeted: ["abs", "hip flexors"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Squirms",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Lie on back, lift shoulders and legs, perform small wiggling movements.",
    duration_default: 30,
    muscles_targeted: ["abs"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Tornado",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Lie on back, lift legs and rotate them in circular motion.",
    duration_default: 30,
    muscles_targeted: ["abs", "obliques"],
    is_low_impact: true,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Firewalkers",
    category: "strength_core",
    subcategory: "abs",
    difficulty_level: "intermediate",
    equipment_required: ["bands"],
    description: "With resistance band around legs, step side to side in squat position.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "outer thighs"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Yoga-Inspired Core
  createExercise({
    name: "Downward Dog with Knee to Chin",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In downward dog, bring knee to chin, then extend leg back.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "hamstrings"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Downward Dog with Leg Raises",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In downward dog, lift one leg straight up, then lower and switch.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "glutes", "hamstrings"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Cobra Pose",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Lie face down, press up lifting chest and head, keeping hips on ground.",
    duration_default: 30,
    muscles_targeted: ["back", "glutes"],
    is_low_impact: true,
    calories_per_minute: 5,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crescent Pose",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Step into deep lunge, raise arms overhead, hold position.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crescent Pose with Tricep Press",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold crescent pose while performing tricep presses overhead.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "triceps", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crescent Pose with Reverse Fly",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold crescent pose while performing reverse flys with weights.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "back"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crescent Pose with Kickbacks",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold crescent pose while performing tricep kickbacks.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "triceps"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Warrior 3 with Reverse Flys",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "Balance on one leg, extend other leg back, perform reverse flys with weights.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core", "shoulders", "back"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crow to Chaturanga",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Transition from crow pose to chaturanga (low plank) and back.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "arms"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Chair Pose with Rear Delt Flies",
    category: "strength_core",
    subcategory: "yoga_core",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold chair pose (squat position) while performing rear delt flies.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Sun Salutations",
    category: "yoga",
    subcategory: "yoga_core",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Flow through series of yoga poses: mountain, forward fold, plank, cobra, downward dog.",
    duration_default: 60,
    muscles_targeted: ["full body"],
    is_low_impact: true,
    calories_per_minute: 5,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // ============================================
  // CARDIO - HIGH INTENSITY
  // ============================================
  
  // Plyometric
  createExercise({
    name: "Jump Squats",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform squat, then explosively jump up, landing softly and immediately going into next squat.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Plie Hops",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In wide squat position, jump up and down.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "inner thighs", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Sumo Jump Squats",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform jump squats in wide sumo stance.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "inner thighs", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jump Lunges",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "In lunge position, explosively jump up and switch legs mid-air, landing in opposite lunge.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Single-Leg Hops",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Hop on one leg, then switch to other leg.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Skaters",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump side to side, landing on one foot, like ice skating motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Single-Leg Cross Hops",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Hop on one leg while crossing other leg in front and behind.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Side-to-Side Hops",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump side to side, landing with both feet together.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Rock Star Jumps",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump up bringing knees up and arms overhead in dramatic motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Squat Jacks",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump feet apart into squat, then jump feet together, like jumping jacks in squat position.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Long Jump with 2 Hops Back",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump forward as far as possible, then hop back twice to return.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Cannonballs",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump up bringing knees to chest, wrapping arms around legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Zig-Zag Jumps",
    category: "cardio_high",
    subcategory: "plyo",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump diagonally forward and back in zig-zag pattern.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // High Cardio
  createExercise({
    name: "Jumping Jacks",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Jump feet apart while raising arms overhead, then jump feet together and lower arms.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jumping Jacks Behind Back",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform jumping jacks but clap hands behind back instead of overhead.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Cross Jacks",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Jump feet apart while crossing arms in front, then jump feet together and open arms.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "High Knees",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Run in place, bringing knees up toward chest, pumping arms.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "High Knees with Rotation",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform high knees while rotating torso side to side.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "core", "obliques"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Running High Knees",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform high knees at faster running pace.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Butt Kicks",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Run in place, kicking heels up toward glutes.",
    duration_default: 30,
    muscles_targeted: ["legs", "hamstrings", "calves"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Mountain Climbers",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "In plank position, rapidly alternate bringing knees to chest.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "One-Arm Mountain Climbers",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Perform mountain climbers while lifting one arm off ground.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Standing Mountain Climbers",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Stand and alternate bringing knees up, simulating mountain climber motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "core"],
    is_low_impact: true,
    calories_per_minute: 8,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Twisting Mountain Climbers",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform mountain climbers while bringing knee to opposite elbow.",
    duration_default: 30,
    muscles_targeted: ["core", "obliques", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Single-Leg Mountain Climbers",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Perform mountain climbers using only one leg, keeping other leg extended.",
    duration_default: 30,
    muscles_targeted: ["core", "shoulders", "legs"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Standard Burpees",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Squat down, jump back to plank, do push-up, jump forward, jump up with arms overhead.",
    duration_default: 30,
    muscles_targeted: ["full body"],
    is_low_impact: false,
    calories_per_minute: 15,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Weighted Burpees",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "Perform burpees while holding weights.",
    duration_default: 30,
    muscles_targeted: ["full body"],
    is_low_impact: false,
    calories_per_minute: 15,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Burpees with Rows",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "In plank position of burpee, perform row with each arm before jumping forward.",
    duration_default: 30,
    muscles_targeted: ["full body"],
    is_low_impact: false,
    calories_per_minute: 15,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Burpees with Jump",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Perform burpee with extra high jump at the end.",
    duration_default: 30,
    muscles_targeted: ["full body"],
    is_low_impact: false,
    calories_per_minute: 15,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jump Rope",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Simulate or perform jump rope, jumping on balls of feet.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jump Rope with Kick Out",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform jump rope while alternating kicking legs out to sides.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Fast Feet",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Rapidly tap feet in place, staying on balls of feet.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Hot Feet",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Similar to fast feet but with more intensity and variation.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "March in Place",
    category: "cardio_low",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "March in place, lifting knees up, low impact cardio.",
    duration_default: 30,
    muscles_targeted: ["legs"],
    is_low_impact: true,
    calories_per_minute: 5,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jog in Place",
    category: "cardio_low",
    subcategory: "cardio",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Jog gently in place, low impact movement.",
    duration_default: 30,
    muscles_targeted: ["legs", "calves"],
    is_low_impact: true,
    calories_per_minute: 6,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Running Man",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Alternate bringing knees up high while pumping arms, like running in place.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Speed Bag",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Rapidly punch up and down in front of face, like hitting speed bag.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Suicides",
    category: "cardio_high",
    subcategory: "cardio",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Run forward, touch ground, run back, touch ground, repeat shuttle run pattern.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves"],
    is_low_impact: false,
    calories_per_minute: 15,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // ============================================
  // CARDIO - KICKBOXING
  // ============================================
  
  // Punches
  createExercise({
    name: "Jabs",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Rapidly punch straight forward with alternating arms.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crosses",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Punch straight across body with opposite arm, rotating hips.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core", "obliques"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Hooks",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Punch in circular motion from side, keeping elbow bent.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core", "obliques"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Uppercuts",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Punch upward from below, like hitting under chin.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jab-Cross Combinations",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Alternate jabs and crosses in combination.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core", "obliques"],
    is_low_impact: true,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Twist Punches",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Punch while rotating torso, engaging core.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core", "obliques"],
    is_low_impact: true,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Shadow Boxing",
    category: "kickboxing",
    subcategory: "punches",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Combination of various punches in fluid motion, like boxing an imaginary opponent.",
    duration_default: 30,
    muscles_targeted: ["shoulders", "arms", "core", "legs"],
    is_low_impact: true,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // Kicks
  createExercise({
    name: "Front Kicks",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Kick straight forward, alternating legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "High Front Kicks",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Kick forward aiming higher, requiring more flexibility.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core", "hamstrings"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Jumping Front Kicks",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "advanced",
    equipment_required: ["none"],
    description: "Jump up while performing front kick.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "calves", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Alternating Knee Thrusts",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "beginner",
    equipment_required: ["none"],
    description: "Bring knees up toward chest in kicking motion, alternating legs.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core"],
    is_low_impact: false,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Kick Outs with Arm Circles",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Kick leg out to side while performing large arm circles.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Diagonal Toe Taps",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Kick diagonally across body, tapping toes, alternating sides.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core", "obliques"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Twisting Front Kicks",
    category: "kickboxing",
    subcategory: "kicks",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Perform front kick while rotating torso, engaging obliques.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core", "obliques"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  // ============================================
  // COMPOUND MOVEMENTS
  // ============================================
  
  createExercise({
    name: "Burpees (All Variations)",
    category: "compound",
    subcategory: "full_body",
    difficulty_level: "intermediate",
    equipment_required: ["none"],
    description: "Full body exercise combining squat, plank, push-up, and jump.",
    duration_default: 30,
    muscles_targeted: ["full body"],
    is_low_impact: false,
    calories_per_minute: 15,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Thrusters",
    category: "compound",
    subcategory: "full_body",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Squat down, then explosively stand up while pressing weights overhead in one fluid motion.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Renegade Rows",
    category: "compound",
    subcategory: "full_body",
    difficulty_level: "advanced",
    equipment_required: ["dumbbells"],
    description: "In plank position with weights, alternate rowing one weight to side while maintaining plank position.",
    duration_default: 30,
    muscles_targeted: ["back", "biceps", "core", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Lunge with Dumbbell Chop",
    category: "compound",
    subcategory: "full_body",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform lunge while chopping weight diagonally across body.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "core", "obliques", "shoulders"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Crescent Pose with Reverse Fly",
    category: "compound",
    subcategory: "full_body",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Hold crescent pose while performing reverse flys with weights.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "back"],
    is_low_impact: true,
    calories_per_minute: 10,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  }),
  
  createExercise({
    name: "Squat Thrusters",
    category: "compound",
    subcategory: "full_body",
    difficulty_level: "intermediate",
    equipment_required: ["dumbbells"],
    description: "Perform thrusters (squat to overhead press) in rapid succession.",
    duration_default: 30,
    muscles_targeted: ["legs", "glutes", "shoulders", "triceps", "core"],
    is_low_impact: false,
    calories_per_minute: 12,
    modification_easier: null,
    modification_harder: null,
    alternatives: []
  })
]

// Initialize relationships after all exercises are created
// This function sets up modification chains and alternatives
const initializeRelationships = () => {
  // Push-up progression chain
  const kneePushups = exercises.find(e => e.name === "Knee Push-ups")
  const standardPushups = exercises.find(e => e.name === "Standard Push-ups")
  const widePushups = exercises.find(e => e.name === "Wide Push-ups")
  const narrowPushups = exercises.find(e => e.name === "Narrow Push-ups")
  const oneArmPushups = exercises.find(e => e.name === "One-Arm Push-ups")
  
  if (kneePushups && standardPushups) {
    kneePushups.modification_harder = standardPushups.exercise_id
    standardPushups.modification_easier = kneePushups.exercise_id
  }
  if (standardPushups && widePushups) {
    standardPushups.modification_harder = widePushups.exercise_id
  }
  if (standardPushups && oneArmPushups) {
    // One-arm is harder than standard
  }
  
  // Set alternatives for each exercise (10 alternatives in same category)
  exercises.forEach(exercise => {
    if (exercise.alternatives.length === 0) {
      const sameCategory = exercises.filter(
        e => e.category === exercise.category && 
        e.exercise_id !== exercise.exercise_id &&
        e.subcategory === exercise.subcategory
      )
      exercise.alternatives = sameCategory
        .slice(0, 10)
        .map(e => e.exercise_id)
    }
  })
}

// Call initialization
initializeRelationships()

// Now set up relationships (modifications and alternatives)
// This will be done after all exercises are added
// For now, we'll add a function to initialize relationships
