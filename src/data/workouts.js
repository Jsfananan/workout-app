export const workouts = [
  {
    id: 1,
    name: "Quick Cardio Blast",
    duration: 15,
    difficulty: "Beginner",
    description: "A quick cardio workout to get your heart pumping. Choose your duration and intensity.",
    icon: "•",
    configurable: true,
    baseDuration: 15,
    exercisesByIntensity: {
      beginner: [
        { name: "March in Place", duration: 30, icon: "•", instructions: "March steadily, lifting knees to a comfortable height" },
        { name: "Step Touch", duration: 30, icon: "•", instructions: "Step side to side, touching feet together as you go" },
        { name: "Rest", duration: 15, icon: "•", instructions: "Take a quick breather" },
        { name: "Modified Burpees", duration: 30, icon: "•", instructions: "Step back to plank (no jump), step forward, and stand. Add a small hop optional." },
        { name: "Standing Mountain Climbers", duration: 30, icon: "•", instructions: "Stand and drive knees up toward chest one at a time, at a steady pace" },
        { name: "Rest", duration: 15, icon: "•", instructions: "Take a quick breather" }
      ],
      intermediate: [
        { name: "Jumping Jacks", duration: 30, icon: "•", instructions: "Jump your feet apart while raising your arms overhead, then return to start" },
        { name: "High Knees", duration: 30, icon: "•", instructions: "Run in place, bringing your knees up toward your chest" },
        { name: "Rest", duration: 15, icon: "•", instructions: "Take a quick breather" },
        { name: "Burpees", duration: 30, icon: "•", instructions: "Squat down, jump back into plank, do a push-up, jump forward, and jump up" },
        { name: "Mountain Climbers", duration: 30, icon: "•", instructions: "In plank position, alternate bringing your knees to your chest" },
        { name: "Rest", duration: 15, icon: "•", instructions: "Take a quick breather" }
      ],
      advanced: [
        { name: "Jumping Jacks", duration: 30, icon: "•", instructions: "Explosive jumping jacks; land softly" },
        { name: "High Knees", duration: 30, icon: "•", instructions: "Drive knees up quickly; aim for speed" },
        { name: "Rest", duration: 10, icon: "•", instructions: "Brief rest" },
        { name: "Burpees with Push-up", duration: 30, icon: "•", instructions: "Full burpee with a strict push-up at the bottom, then jump up" },
        { name: "Mountain Climbers", duration: 30, icon: "•", instructions: "Fast pace; keep hips low and core tight" },
        { name: "Rest", duration: 10, icon: "•", instructions: "Brief rest" }
      ]
    }
  },
  {
    id: 2,
    name: "Full Body Strength",
    duration: 25,
    difficulty: "Intermediate",
    description: "Build strength with this full-body workout. Choose your duration and intensity.",
    icon: "•",
    configurable: true,
    baseDuration: 25,
    exercisesByIntensity: {
      beginner: [
        { name: "Knee Push-ups", duration: 45, icon: "•", instructions: "Push-ups with knees on the floor; keep your back straight" },
        { name: "Chair Squats", duration: 45, icon: "•", instructions: "Lower toward a chair, tap and stand; or bodyweight squats to 90 degrees" },
        { name: "Plank (Knees Down)", duration: 45, icon: "•", instructions: "Forearm or high plank with knees on the ground; engage core" },
        { name: "Standing Lunges", duration: 45, icon: "•", instructions: "Step forward into a lunge, or do stationary lunges; alternate legs" },
        { name: "Rest", duration: 30, icon: "•", instructions: "Take a breather" }
      ],
      intermediate: [
        { name: "Push-ups", duration: 45, icon: "•", instructions: "Lower your body until your chest nearly touches the floor, then push back up" },
        { name: "Squats", duration: 45, icon: "•", instructions: "Lower your body as if sitting in a chair, keeping your knees behind your toes" },
        { name: "Plank", duration: 45, icon: "•", instructions: "Hold your body in a straight line, engaging your core" },
        { name: "Lunges", duration: 45, icon: "•", instructions: "Step forward into a lunge, alternating legs" },
        { name: "Rest", duration: 30, icon: "•", instructions: "Take a breather" }
      ],
      advanced: [
        { name: "Push-ups", duration: 45, icon: "•", instructions: "Hands close (diamond) or deficit push-ups for extra range" },
        { name: "Jump Squats", duration: 45, icon: "•", instructions: "Squat down then explode up into a jump; land softly" },
        { name: "Plank with Shoulder Tap", duration: 45, icon: "•", instructions: "High plank; tap opposite shoulder while keeping hips steady" },
        { name: "Jump Lunges", duration: 45, icon: "•", instructions: "Alternating jump lunges; stay low and switch legs in the air" },
        { name: "Rest", duration: 30, icon: "•", instructions: "Take a breather" }
      ]
    }
  },
  {
    id: 3,
    name: "Core Crusher",
    duration: 20,
    difficulty: "Advanced",
    description: "Intense core workout to strengthen your abs. Choose your duration and intensity.",
    icon: "•",
    configurable: true,
    baseDuration: 20,
    exercisesByIntensity: {
      beginner: [
        { name: "Crunches", duration: 45, icon: "•", instructions: "Lift your shoulders off the ground; support your head lightly with your hands" },
        { name: "Plank (Knees Down)", duration: 60, icon: "•", instructions: "Forearm or high plank with knees on the ground; keep your back flat" },
        { name: "Bicycle Crunches (Slow)", duration: 45, icon: "•", instructions: "Alternate elbow to knee in a slow, controlled cycling motion" },
        { name: "Seated Russian Twist", duration: 45, icon: "•", instructions: "Sit with knees bent, feet on floor; rotate your torso side to side" },
        { name: "Rest", duration: 20, icon: "•", instructions: "Quick rest" }
      ],
      intermediate: [
        { name: "Crunches", duration: 45, icon: "•", instructions: "Lift your shoulders off the ground, engaging your abs" },
        { name: "Plank Hold", duration: 60, icon: "•", instructions: "Hold plank position, keeping your body straight" },
        { name: "Bicycle Crunches", duration: 45, icon: "•", instructions: "Alternate bringing opposite elbow to knee in a cycling motion" },
        { name: "Russian Twists", duration: 45, icon: "•", instructions: "Sit and rotate your torso side to side" },
        { name: "Rest", duration: 20, icon: "•", instructions: "Quick rest" }
      ],
      advanced: [
        { name: "Leg Raises", duration: 45, icon: "•", instructions: "Lie on your back; raise and lower straight legs without letting them touch the floor" },
        { name: "Plank with Reach", duration: 60, icon: "•", instructions: "High plank; reach one arm forward, then the other; keep hips still" },
        { name: "Bicycle Crunches", duration: 45, icon: "•", instructions: "Fast, controlled cycling; extend the non-working leg fully" },
        { name: "Russian Twists (Feet Up)", duration: 45, icon: "•", instructions: "Feet off the floor; rotate torso and touch floor side to side" },
        { name: "Rest", duration: 20, icon: "•", instructions: "Quick rest" }
      ]
    }
  },
  {
    id: 4,
    name: "5K Training Run",
    duration: 30,
    difficulty: "Beginner",
    description: "Interval training for 5K preparation. Walk-run intervals to build endurance.",
    icon: "🏃",
    type: "running",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        icon: "•",
        instructions: "Easy 5-minute warmup walk to prepare your body"
      },
      {
        name: "Run",
        duration: 60,
        icon: "•",
        instructions: "Run at easy pace - you should be able to hold a conversation"
      },
      {
        name: "Walk",
        duration: 90,
        icon: "•",
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        icon: "•",
        instructions: "Run at easy pace"
      },
      {
        name: "Walk",
        duration: 90,
        icon: "•",
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        icon: "•",
        instructions: "Run at easy pace"
      },
      {
        name: "Walk",
        duration: 90,
        icon: "•",
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        icon: "•",
        instructions: "Run at easy pace"
      },
      {
        name: "Walk",
        duration: 90,
        icon: "•",
        instructions: "Recovery walk"
      },
      {
        name: "Run",
        duration: 60,
        icon: "•",
        instructions: "Run at easy pace"
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        icon: "•",
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
    icon: "🏃",
    type: "running",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        icon: "•",
        instructions: "Easy 5-minute warmup walk"
      },
      {
        name: "Continuous Run",
        duration: 1500,
        icon: "•",
        instructions: "Run continuously at easy pace. You should be able to speak in full sentences."
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        icon: "•",
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
    icon: "🏃",
    type: "running",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        icon: "•",
        instructions: "Easy 5-minute warmup walk"
      },
      {
        name: "Long Run",
        duration: 4800,
        icon: "•",
        instructions: "Run at easy, conversational pace. Focus on maintaining steady rhythm. If running over 90 minutes, consider hydration and fuel."
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        icon: "•",
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
    icon: "🏃",
    type: "treadmill",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        icon: "•",
        instructions: "Walk at 3.0-3.5 mph for 5 minutes"
      },
      {
        name: "Fast Run",
        duration: 60,
        icon: "•",
        instructions: "Run at 6.5-7.5 mph (comfortably hard pace)"
      },
      {
        name: "Recovery Walk",
        duration: 90,
        icon: "•",
        instructions: "Walk at 3.0-3.5 mph to recover"
      },
      {
        name: "Fast Run",
        duration: 60,
        icon: "•",
        instructions: "Run at 6.5-7.5 mph"
      },
      {
        name: "Recovery Walk",
        duration: 90,
        icon: "•",
        instructions: "Walk at 3.0-3.5 mph to recover"
      },
      {
        name: "Fast Run",
        duration: 60,
        icon: "•",
        instructions: "Run at 6.5-7.5 mph"
      },
      {
        name: "Recovery Walk",
        duration: 90,
        icon: "•",
        instructions: "Walk at 3.0-3.5 mph to recover"
      },
      {
        name: "Fast Run",
        duration: 60,
        icon: "•",
        instructions: "Run at 6.5-7.5 mph"
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        icon: "•",
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
    icon: "🏃",
    type: "treadmill",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        icon: "•",
        instructions: "Walk at 3.0-3.5 mph for 5 minutes"
      },
      {
        name: "Steady Run",
        duration: 1500,
        icon: "•",
        instructions: "Run at 5.0-6.0 mph. Maintain steady, comfortable pace."
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        icon: "•",
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
    icon: "🏃",
    type: "running",
    exercises: [
      {
        name: "Warm-up Walk",
        duration: 300,
        icon: "•",
        instructions: "Easy 5-minute warmup walk"
      },
      {
        name: "Easy Run",
        duration: 600,
        icon: "•",
        instructions: "Run at easy pace for 10 minutes"
      },
      {
        name: "Tempo Run",
        duration: 1800,
        icon: "•",
        instructions: "Run at tempo pace (comfortably hard - can say a few words) for 30 minutes"
      },
      {
        name: "Easy Run",
        duration: 600,
        icon: "•",
        instructions: "Run at easy pace for 10 minutes"
      },
      {
        name: "Cooldown Walk",
        duration: 300,
        icon: "•",
        instructions: "Easy 5-minute cooldown walk"
      }
    ]
  }
]

const DURATION_OPTIONS = [10, 15, 20, 25, 30]
const INTENSITY_OPTIONS = ['beginner', 'intermediate', 'advanced']

/**
 * Build the exercises array for a configurable workout (ids 1–3) given selected duration and intensity.
 * Repeats the intensity-specific circuit until total time ≈ selectedDuration minutes.
 */
export function buildConfigurableExercises(workout, selectedDuration, intensity) {
  if (!workout.configurable || !workout.exercisesByIntensity) return null
  const key = (intensity || 'intermediate').toLowerCase()
  const round = workout.exercisesByIntensity[key] || workout.exercisesByIntensity.intermediate
  if (!round || !round.length) return null
  const roundDuration = round.reduce((s, ex) => s + ex.duration, 0)
  const minutes = Math.max(5, Math.min(60, parseInt(selectedDuration, 10) || workout.baseDuration))
  const targetSeconds = minutes * 60
  const rounds = Math.max(1, Math.round(targetSeconds / roundDuration))
  const exercises = []
  for (let r = 0; r < rounds; r++) {
    for (const ex of round) {
      exercises.push({ ...ex })
    }
  }
  return exercises
}

export { DURATION_OPTIONS, INTENSITY_OPTIONS }
