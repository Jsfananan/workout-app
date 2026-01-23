export const workouts = [
  {
    id: 1,
    name: "Quick Cardio Blast",
    duration: 15,
    difficulty: "Beginner",
    description: "A quick 15-minute cardio workout to get your heart pumping",
    icon: "⚡",
    exercises: [
      {
        name: "Jumping Jacks",
        duration: 30,
        icon: "•",
        instructions: "Jump your feet apart while raising your arms overhead, then return to start"
      },
      {
        name: "High Knees",
        duration: 30,
        icon: "•",
        instructions: "Run in place, bringing your knees up toward your chest"
      },
      {
        name: "Rest",
        duration: 15,
        icon: "•",
        instructions: "Take a quick breather"
      },
      {
        name: "Burpees",
        duration: 30,
        icon: "•",
        instructions: "Squat down, jump back into plank, do a push-up, jump forward, and jump up"
      },
      {
        name: "Mountain Climbers",
        duration: 30,
        icon: "•",
        instructions: "In plank position, alternate bringing your knees to your chest"
      },
      {
        name: "Rest",
        duration: 15,
        icon: "•",
        instructions: "Take a quick breather"
      }
    ]
  },
  {
    id: 2,
    name: "Full Body Strength",
    duration: 25,
    difficulty: "Intermediate",
    description: "Build strength with this full-body workout",
    icon: "⚡",
    exercises: [
      {
        name: "Push-ups",
        duration: 45,
        icon: "•",
        instructions: "Lower your body until your chest nearly touches the floor, then push back up"
      },
      {
        name: "Squats",
        duration: 45,
        icon: "•",
        instructions: "Lower your body as if sitting in a chair, keeping your knees behind your toes"
      },
      {
        name: "Plank",
        duration: 45,
        icon: "•",
        instructions: "Hold your body in a straight line, engaging your core"
      },
      {
        name: "Lunges",
        duration: 45,
        icon: "•",
        instructions: "Step forward into a lunge, alternating legs"
      },
      {
        name: "Rest",
        duration: 30,
        icon: "•",
        instructions: "Take a breather"
      }
    ]
  },
  {
    id: 3,
    name: "Core Crusher",
    duration: 20,
    difficulty: "Advanced",
    description: "Intense core workout to strengthen your abs",
    icon: "⚡",
    exercises: [
      {
        name: "Crunches",
        duration: 45,
        icon: "•",
        instructions: "Lift your shoulders off the ground, engaging your abs"
      },
      {
        name: "Plank Hold",
        duration: 60,
        icon: "•",
        instructions: "Hold plank position, keeping your body straight"
      },
      {
        name: "Bicycle Crunches",
        duration: 45,
        icon: "•",
        instructions: "Alternate bringing opposite elbow to knee in a cycling motion"
      },
      {
        name: "Russian Twists",
        duration: 45,
        icon: "•",
        instructions: "Sit and rotate your torso side to side"
      },
      {
        name: "Rest",
        duration: 20,
        icon: "•",
        instructions: "Quick rest"
      }
    ]
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
