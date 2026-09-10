// Workout library.
//
// Two kinds of workout:
//  - configurable (ids 1-3): exercises are done for a chosen number of sets;
//    `seconds` is a per-set guide, not a timer.
//  - steps (running / treadmill): a sequence of timed steps done off-phone,
//    shown as a checklist with the duration as text.

export const workouts = [
  {
    id: 1,
    name: "Quick Cardio Blast",
    difficulty: "Beginner",
    description: "A quick cardio workout to get your heart pumping. Choose your sets and intensity.",
    configurable: true,
    exercisesByIntensity: {
      beginner: [
        { name: "March in Place", seconds: 30, instructions: "March steadily, lifting knees to a comfortable height" },
        { name: "Step Touch", seconds: 30, instructions: "Step side to side, touching feet together as you go" },
        { name: "Modified Burpees", seconds: 30, instructions: "Step back to plank (no jump), step forward, and stand. Add a small hop optional." },
        { name: "Standing Mountain Climbers", seconds: 30, instructions: "Stand and drive knees up toward chest one at a time, at a steady pace" }
      ],
      intermediate: [
        { name: "Jumping Jacks", seconds: 30, instructions: "Jump your feet apart while raising your arms overhead, then return to start" },
        { name: "High Knees", seconds: 30, instructions: "Run in place, bringing your knees up toward your chest" },
        { name: "Burpees", seconds: 30, instructions: "Squat down, jump back into plank, do a push-up, jump forward, and jump up" },
        { name: "Mountain Climbers", seconds: 30, instructions: "In plank position, alternate bringing your knees to your chest" }
      ],
      advanced: [
        { name: "Jumping Jacks", seconds: 30, instructions: "Explosive jumping jacks; land softly" },
        { name: "High Knees", seconds: 30, instructions: "Drive knees up quickly; aim for speed" },
        { name: "Burpees with Push-up", seconds: 30, instructions: "Full burpee with a strict push-up at the bottom, then jump up" },
        { name: "Mountain Climbers", seconds: 30, instructions: "Fast pace; keep hips low and core tight" }
      ]
    }
  },
  {
    id: 2,
    name: "Full Body Strength",
    difficulty: "Intermediate",
    description: "Build strength with this full-body workout. Choose your sets and intensity.",
    configurable: true,
    exercisesByIntensity: {
      beginner: [
        { name: "Knee Push-ups", seconds: 45, instructions: "Push-ups with knees on the floor; keep your back straight" },
        { name: "Chair Squats", seconds: 45, instructions: "Lower toward a chair, tap and stand; or bodyweight squats to 90 degrees" },
        { name: "Plank (Knees Down)", seconds: 45, instructions: "Forearm or high plank with knees on the ground; engage core" },
        { name: "Standing Lunges", seconds: 45, instructions: "Step forward into a lunge, or do stationary lunges; alternate legs" }
      ],
      intermediate: [
        { name: "Push-ups", seconds: 45, instructions: "Lower your body until your chest nearly touches the floor, then push back up" },
        { name: "Squats", seconds: 45, instructions: "Lower your body as if sitting in a chair, keeping your knees behind your toes" },
        { name: "Plank", seconds: 45, instructions: "Hold your body in a straight line, engaging your core" },
        { name: "Lunges", seconds: 45, instructions: "Step forward into a lunge, alternating legs" }
      ],
      advanced: [
        { name: "Push-ups", seconds: 45, instructions: "Hands close (diamond) or deficit push-ups for extra range" },
        { name: "Jump Squats", seconds: 45, instructions: "Squat down then explode up into a jump; land softly" },
        { name: "Plank with Shoulder Tap", seconds: 45, instructions: "High plank; tap opposite shoulder while keeping hips steady" },
        { name: "Jump Lunges", seconds: 45, instructions: "Alternating jump lunges; stay low and switch legs in the air" }
      ]
    }
  },
  {
    id: 3,
    name: "Core Crusher",
    difficulty: "Advanced",
    description: "Intense core workout to strengthen your abs. Choose your sets and intensity.",
    configurable: true,
    exercisesByIntensity: {
      beginner: [
        { name: "Crunches", seconds: 45, instructions: "Lift your shoulders off the ground; support your head lightly with your hands" },
        { name: "Plank (Knees Down)", seconds: 60, instructions: "Forearm or high plank with knees on the ground; keep your back flat" },
        { name: "Bicycle Crunches (Slow)", seconds: 45, instructions: "Alternate elbow to knee in a slow, controlled cycling motion" },
        { name: "Seated Russian Twist", seconds: 45, instructions: "Sit with knees bent, feet on floor; rotate your torso side to side" }
      ],
      intermediate: [
        { name: "Crunches", seconds: 45, instructions: "Lift your shoulders off the ground, engaging your abs" },
        { name: "Plank Hold", seconds: 60, instructions: "Hold plank position, keeping your body straight" },
        { name: "Bicycle Crunches", seconds: 45, instructions: "Alternate bringing opposite elbow to knee in a cycling motion" },
        { name: "Russian Twists", seconds: 45, instructions: "Sit and rotate your torso side to side" }
      ],
      advanced: [
        { name: "Leg Raises", seconds: 45, instructions: "Lie on your back; raise and lower straight legs without letting them touch the floor" },
        { name: "Plank with Reach", seconds: 60, instructions: "High plank; reach one arm forward, then the other; keep hips still" },
        { name: "Bicycle Crunches", seconds: 45, instructions: "Fast, controlled cycling; extend the non-working leg fully" },
        { name: "Russian Twists (Feet Up)", seconds: 45, instructions: "Feet off the floor; rotate torso and touch floor side to side" }
      ]
    }
  },
  {
    id: 4,
    name: "5K Training Run",
    duration: 30,
    difficulty: "Beginner",
    description: "Interval training for 5K preparation. Walk-run intervals to build endurance.",
    type: "running",
    mode: "steps",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        instructions: "Easy 5-minute warmup walk to prepare your body"
      },
      {
        name: "Run",
        duration: 60,
        instructions: "Run at easy pace - you should be able to hold a conversation"
      },
      {
        name: "Walk",
        duration: 90,
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        instructions: "Run at easy pace"
      },
      {
        name: "Walk",
        duration: 90,
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        instructions: "Run at easy pace"
      },
      {
        name: "Walk",
        duration: 90,
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        instructions: "Run at easy pace"
      },
      {
        name: "Walk",
        duration: 90,
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        instructions: "Run at easy pace"
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        instructions: "Easy 5-minute cooldown walk"
      }
    ]
  },
  {
    id: 5,
    name: "5K Continuous Run",
    duration: 30,
    difficulty: "Intermediate",
    description: "Continuous 30-minute run for 5K training. Maintain steady, conversational pace.",
    type: "running",
    mode: "steps",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        instructions: "Easy 5-minute warmup walk"
      },
      {
        name: "Continuous Run",
        duration: 1500,
        instructions: "Run continuously at easy pace. You should be able to speak in full sentences."
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        instructions: "Easy 5-minute cooldown walk"
      }
    ]
  },
  {
    id: 6,
    name: "Half Marathon Long Run",
    duration: 90,
    difficulty: "Advanced",
    description: "Long distance run for half marathon training. Build endurance with steady pace.",
    type: "running",
    mode: "steps",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        instructions: "Easy 5-minute warmup walk"
      },
      {
        name: "Long Run",
        duration: 4800,
        instructions: "Run at easy, conversational pace. Focus on maintaining steady rhythm. If running over 90 minutes, consider hydration and fuel."
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        instructions: "Easy 5-minute cooldown walk"
      }
    ]
  },
  {
    id: 7,
    name: "Treadmill Interval",
    duration: 25,
    difficulty: "Intermediate",
    description: "Interval training on treadmill. Alternating between fast and recovery paces.",
    type: "treadmill",
    mode: "steps",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        instructions: "Walk at 3.0-3.5 mph for 5 minutes"
      },
      {
        name: "Fast Run",
        duration: 60,
        instructions: "Run at 6.5-7.5 mph (comfortably hard pace)"
      },
      {
        name: "Recovery Walk",
        duration: 90,
        instructions: "Walk at 3.0-3.5 mph to recover"
      },
      {
        name: "Fast Run",
        duration: 60,
        instructions: "Run at 6.5-7.5 mph"
      },
      {
        name: "Recovery Walk",
        duration: 90,
        instructions: "Walk at 3.0-3.5 mph to recover"
      },
      {
        name: "Fast Run",
        duration: 60,
        instructions: "Run at 6.5-7.5 mph"
      },
      {
        name: "Recovery Walk",
        duration: 90,
        instructions: "Walk at 3.0-3.5 mph to recover"
      },
      {
        name: "Fast Run",
        duration: 60,
        instructions: "Run at 6.5-7.5 mph"
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        instructions: "Walk at 3.0-3.5 mph for 5 minutes"
      }
    ]
  },
  {
    id: 8,
    name: "Treadmill Steady State",
    duration: 30,
    difficulty: "Beginner",
    description: "Steady pace treadmill run. Perfect for building base fitness.",
    type: "treadmill",
    mode: "steps",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        instructions: "Walk at 3.0-3.5 mph for 5 minutes"
      },
      {
        name: "Steady Run",
        duration: 1500,
        instructions: "Run at 5.0-6.0 mph. Maintain steady, comfortable pace."
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        instructions: "Walk at 3.0-3.5 mph for 5 minutes"
      }
    ]
  },
  {
    id: 9,
    name: "Half Marathon Tempo Run",
    duration: 45,
    difficulty: "Advanced",
    description: "Tempo run for half marathon training. Build speed and endurance.",
    type: "running",
    mode: "steps",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        instructions: "Easy 5-minute warmup walk"
      },
      {
        name: "Easy Run",
        duration: 600,
        instructions: "Run at easy pace for 10 minutes"
      },
      {
        name: "Tempo Run",
        duration: 1800,
        instructions: "Run at tempo pace (comfortably hard - can say a few words) for 30 minutes"
      },
      {
        name: "Easy Run",
        duration: 600,
        instructions: "Run at easy pace for 10 minutes"
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        instructions: "Easy 5-minute cooldown walk"
      }
    ]
  }
]

export const SETS_OPTIONS = [2, 3, 4, 5, 6]
export const DEFAULT_SETS = 4
export const INTENSITY_OPTIONS = ['beginner', 'intermediate', 'advanced']

// Rough time per set including the breather between sets.
const TRANSITION_SECONDS = 20

export const getWorkoutById = (id) => workouts.find(w => w.id === id)

/**
 * Build the exercise list for a configurable workout (ids 1-3).
 * Every exercise is done once for `sets` sets; nothing is timed in-app.
 */
export function buildConfigurableExercises(workout, sets = DEFAULT_SETS, intensity) {
  if (!workout.configurable || !workout.exercisesByIntensity) return null
  const key = (intensity || 'intermediate').toLowerCase()
  const round = workout.exercisesByIntensity[key] || workout.exercisesByIntensity.intermediate
  if (!round || !round.length) return null
  const setCount = Math.max(1, Math.min(10, parseInt(sets, 10) || DEFAULT_SETS))
  return round.map(ex => ({ ...ex, sets: setCount }))
}

/** Estimated minutes for a list of exercises (sets x seconds, or step durations). */
export function estimateMinutes(exercises) {
  const seconds = exercises.reduce((total, ex) => {
    if (ex.duration) return total + ex.duration
    return total + (ex.sets || 1) * ((ex.seconds || 45) + TRANSITION_SECONDS)
  }, 0)
  return Math.max(1, Math.round(seconds / 60))
}

/**
 * Resolve any workout into the shape the session screen uses:
 * { id, name, type, mode: 'sets' | 'steps', exercises, minutes, intensity, sets }
 */
export function resolveWorkout(workout, { sets = DEFAULT_SETS, intensity } = {}) {
  if (!workout) return null
  if (workout.configurable) {
    const level = INTENSITY_OPTIONS.includes(intensity) ? intensity : workout.difficulty.toLowerCase()
    const exercises = buildConfigurableExercises(workout, sets, level)
    return {
      id: workout.id,
      name: workout.name,
      type: workout.type || 'strength',
      mode: 'sets',
      intensity: level,
      sets: exercises[0]?.sets ?? DEFAULT_SETS,
      exercises,
      minutes: estimateMinutes(exercises)
    }
  }
  return {
    id: workout.id,
    name: workout.name,
    type: workout.type,
    mode: workout.mode || 'steps',
    intensity: workout.difficulty.toLowerCase(),
    exercises: workout.exercises,
    minutes: workout.duration || estimateMinutes(workout.exercises)
  }
}
