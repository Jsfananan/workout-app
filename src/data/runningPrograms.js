// Running Programs with detailed schedules, tips, and supplemental workouts

// Generate 5K calendar (12 weeks) - moved before use
function generate5KCalendar() {
  const calendar = []
  let day = 1

  // Week 1-2: Walk-Run Intervals
  for (let week = 1; week <= 2; week++) {
    // Monday: Walk-Run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-walkrun`,
      phase: 1,
      details: {
        type: 'interval',
        totalTime: 1800,
        intervals: [
          { type: 'warmup_walk', duration: 300, instruction: 'Easy 5-minute warmup walk' },
          { type: 'run', duration: 60, instruction: 'Run at easy pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Run at easy pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Run at easy pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Run at easy pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Run at easy pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'cooldown_walk', duration: 300, instruction: 'Easy 5-minute cooldown walk' }
        ]
      }
    })

    // Tuesday: Strength
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `5k-week${week}-strength`,
      phase: 1
    })

    // Wednesday: Walk-Run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-walkrun`,
      phase: 1,
      details: { type: 'interval', intervals: 'same as Monday' }
    })

    // Thursday: Rest
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })

    // Friday: Walk-Run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-walkrun`,
      phase: 1,
      details: { type: 'interval', intervals: 'same as Monday' }
    })

    // Saturday: Rest
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })

    // Sunday: Rest
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })
  }

  // Week 3-4: Increase running time
  for (let week = 3; week <= 4; week++) {
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-walkrun`,
      phase: 1,
      details: {
        type: 'interval',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 90 },
          { type: 'walk', duration: 60 },
          { type: 'run', duration: 90 },
          { type: 'walk', duration: 60 },
          { type: 'run', duration: 90 },
          { type: 'walk', duration: 60 },
          { type: 'run', duration: 90 },
          { type: 'walk', duration: 60 },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `5k-week${week}-strength`,
      phase: 1
    })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-walkrun`,
      phase: 1,
      details: { type: 'interval', intervals: 'same as Monday' }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-walkrun`,
      phase: 1,
      details: { type: 'interval', intervals: 'same as Monday' }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })
  }

  // Week 5-6: Continuous running
  for (let week = 5; week <= 6; week++) {
    const runDuration = week === 5 ? 1200 : 1500
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-continuous`,
      phase: 2,
      details: {
        type: 'continuous',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: runDuration, instruction: 'Run continuously at easy pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `5k-week${week}-strength`,
      phase: 2
    })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-easy`,
      phase: 2,
      details: {
        type: 'continuous',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: runDuration - 300 },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-easy`,
      phase: 2,
      details: { type: 'continuous', intervals: 'same as Wednesday' }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
  }

  // Week 7-9: Build distance and add speed
  for (let week = 7; week <= 9; week++) {
    const longRunDuration = week === 7 ? 1800 : week === 8 ? 2100 : 2400
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-speed`,
      phase: 2,
      details: {
        type: 'interval',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 600, instruction: 'Easy pace warmup run' },
          { type: 'run', duration: 60, instruction: 'Faster pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Faster pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Faster pace' },
          { type: 'walk', duration: 90, instruction: 'Recovery walk' },
          { type: 'run', duration: 60, instruction: 'Faster pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `5k-week${week}-strength`,
      phase: 2
    })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-easy`,
      phase: 2,
      details: {
        type: 'continuous',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 1500, instruction: 'Easy pace run' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-long`,
      phase: 2,
      details: {
        type: 'continuous',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: longRunDuration, instruction: 'Long easy run' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
  }

  // Week 10-11: Peak training
  for (let week = 10; week <= 11; week++) {
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-speed`,
      phase: 3,
      details: {
        type: 'interval',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 600, instruction: 'Easy warmup' },
          { type: 'run', duration: 90, instruction: 'Fast pace' },
          { type: 'walk', duration: 120, instruction: 'Recovery' },
          { type: 'run', duration: 90, instruction: 'Fast pace' },
          { type: 'walk', duration: 120, instruction: 'Recovery' },
          { type: 'run', duration: 90, instruction: 'Fast pace' },
          { type: 'walk', duration: 120, instruction: 'Recovery' },
          { type: 'run', duration: 90, instruction: 'Fast pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `5k-week${week}-strength`,
      phase: 3
    })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-easy`,
      phase: 3,
      details: {
        type: 'continuous',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 1800, instruction: 'Easy pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `5k-week${week}-long`,
      phase: 3,
      details: {
        type: 'continuous',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 2700, instruction: 'Long run' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  }

  // Week 12: Taper week
  calendar.push({
    day: day++,
    workout_type: 'running',
    workout_id: '5k-week12-easy',
    phase: 3,
    details: {
      type: 'continuous',
      intervals: [
        { type: 'warmup_walk', duration: 300 },
        { type: 'run', duration: 1200, instruction: 'Easy 20-minute run' },
        { type: 'cooldown_walk', duration: 300 }
      ]
    }
  })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  calendar.push({
    day: day++,
    workout_type: 'running',
    workout_id: '5k-week12-easy',
    phase: 3,
    details: {
      type: 'continuous',
      intervals: [
        { type: 'warmup_walk', duration: 300 },
        { type: 'run', duration: 900, instruction: 'Easy 15-minute run' },
        { type: 'cooldown_walk', duration: 300 }
      ]
    }
  })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  calendar.push({
    day: day++,
    workout_type: 'running',
    workout_id: '5k-week12-race',
    phase: 3,
    details: {
      type: 'race',
      note: 'RACE DAY! You\'ve got this!'
    }
  })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })

  return calendar
}

// Helper functions for Half Marathon calendar
function getDurationForDistance(distance) {
  // Estimate: 10 min/mile pace for easy runs
  const miles = parseFloat(distance)
  return Math.round(miles * 600) // seconds
}

function getTempoDuration(distance) {
  // Tempo pace: ~8:30 min/mile
  const miles = parseFloat(distance)
  return Math.round(miles * 510) // seconds
}

function generateSpeedIntervals(workout) {
  // Parse workout like "5x800m" or "6x1km"
  const match = workout.match(/(\d+)x(\d+)(m|km)/)
  if (!match) return []
  
  const reps = parseInt(match[1])
  const distance = parseInt(match[2])
  const unit = match[3]
  
  const intervals = []
  // 800m ≈ 3:30, 1km ≈ 4:20 at 5K pace
  const intervalDuration = unit === 'km' ? 260 : 210 // seconds
  
  for (let i = 0; i < reps; i++) {
    intervals.push({
      type: 'run',
      duration: intervalDuration,
      instruction: `Fast pace (5K effort) - ${distance}${unit}`
    })
    if (i < reps - 1) {
      intervals.push({
        type: 'walk',
        duration: intervalDuration, // Equal recovery
        instruction: 'Recovery walk/jog'
      })
    }
  }
  
  return intervals
}

// Generate Half Marathon calendar (14 weeks)
function generateHalfMarathonCalendar() {
  const calendar = []
  let day = 1

  // Week 1-2: Base building (assumes can run 3 miles)
  for (let week = 1; week <= 2; week++) {
    const baseRun = week === 1 ? 1800 : 2100 // 30 min then 35 min
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-easy`,
      phase: 1,
      details: {
        type: 'continuous',
        distance: week === 1 ? '3 miles' : '3.5 miles',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: baseRun, instruction: 'Easy conversational pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `hm-week${week}-strength`,
      phase: 1,
      details: { focus: 'Full body strength, emphasis on legs and core' }
    })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-easy`,
      phase: 1,
      details: {
        type: 'continuous',
        distance: week === 1 ? '3 miles' : '3.5 miles',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: baseRun, instruction: 'Easy pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-long`,
      phase: 1,
      details: {
        type: 'continuous',
        distance: week === 1 ? '4 miles' : '5 miles',
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: week === 1 ? 2400 : 3000, instruction: 'Long run - easy pace, build endurance' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })
    calendar.push({
      day: day++,
      workout_type: 'cross_training',
      workout_id: `hm-week${week}-cross`,
      phase: 1,
      details: { type: 'cycling, swimming, or elliptical - 30-45 minutes easy' }
    })
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 1 })
  }

  // Week 3-6: Build phase - add tempo runs
  for (let week = 3; week <= 6; week++) {
    const distances = {
      3: { easy: '4 miles', tempo: '3 miles', long: '6 miles' },
      4: { easy: '4 miles', tempo: '3.5 miles', long: '7 miles' },
      5: { easy: '4.5 miles', tempo: '4 miles', long: '8 miles' },
      6: { easy: '4.5 miles', tempo: '4 miles', long: '9 miles' }
    }
    const dist = distances[week]

    // Monday: Easy run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-easy`,
      phase: 2,
      details: {
        type: 'continuous',
        distance: dist.easy,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: getDurationForDistance(dist.easy), instruction: 'Easy conversational pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Tuesday: Strength
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `hm-week${week}-strength`,
      phase: 2
    })

    // Wednesday: Tempo run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-tempo`,
      phase: 2,
      details: {
        type: 'tempo',
        distance: dist.tempo,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 600, instruction: 'Easy warmup run' },
          { type: 'run', duration: getTempoDuration(dist.tempo), instruction: 'Tempo pace - comfortably hard, can say a few words' },
          { type: 'run', duration: 600, instruction: 'Easy cooldown run' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Thursday: Rest
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })

    // Friday: Easy run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-easy`,
      phase: 2,
      details: {
        type: 'continuous',
        distance: dist.easy,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: getDurationForDistance(dist.easy), instruction: 'Easy pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Saturday: Long run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-long`,
      phase: 2,
      details: {
        type: 'continuous',
        distance: dist.long,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: getDurationForDistance(dist.long), instruction: 'Long run - easy pace, practice fueling if over 90 minutes' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Sunday: Cross-training or rest
    calendar.push({
      day: day++,
      workout_type: week % 2 === 0 ? 'cross_training' : 'rest',
      workout_id: week % 2 === 0 ? `hm-week${week}-cross` : null,
      phase: 2,
      details: week % 2 === 0 ? { type: 'Easy cross-training - 30-45 minutes' } : null
    })
  }

  // Week 7-10: Peak phase - add speed work
  for (let week = 7; week <= 10; week++) {
    const distances = {
      7: { easy: '5 miles', tempo: '4 miles', speed: '5x800m', long: '10 miles' },
      8: { easy: '5 miles', tempo: '4.5 miles', speed: '6x800m', long: '11 miles' },
      9: { easy: '5 miles', tempo: '5 miles', speed: '5x1km', long: '12 miles' },
      10: { easy: '5 miles', tempo: '5 miles', speed: '6x1km', long: '13 miles' }
    }
    const dist = distances[week]

    // Monday: Easy
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-easy`,
      phase: 2,
      details: {
        type: 'continuous',
        distance: dist.easy,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: getDurationForDistance(dist.easy), instruction: 'Easy pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Tuesday: Strength
    calendar.push({
      day: day++,
      workout_type: 'strength',
      workout_id: `hm-week${week}-strength`,
      phase: 2
    })

    // Wednesday: Speed work
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-speed`,
      phase: 2,
      details: {
        type: 'interval',
        workout: dist.speed,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: 1200, instruction: 'Easy warmup run' },
          ...generateSpeedIntervals(dist.speed),
          { type: 'run', duration: 600, instruction: 'Easy cooldown run' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Thursday: Rest
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })

    // Friday: Easy
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-easy`,
      phase: 2,
      details: {
        type: 'continuous',
        distance: dist.easy,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: getDurationForDistance(dist.easy), instruction: 'Easy pace' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Saturday: Long run
    calendar.push({
      day: day++,
      workout_type: 'running',
      workout_id: `hm-week${week}-long`,
      phase: 2,
      details: {
        type: 'continuous',
        distance: dist.long,
        intervals: [
          { type: 'warmup_walk', duration: 300 },
          { type: 'run', duration: getDurationForDistance(dist.long), instruction: 'Long run - practice race pace for last 2-3 miles' },
          { type: 'cooldown_walk', duration: 300 }
        ]
      }
    })

    // Sunday: Rest
    calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 2 })
  }

  // Week 11-13: Peak long runs then taper
  for (let week = 11; week <= 13; week++) {
    if (week === 11) {
      // Peak week
      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: 'hm-week11-easy',
        phase: 3,
        details: {
          type: 'continuous',
          distance: '4 miles',
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: getDurationForDistance('4 miles'), instruction: 'Easy pace' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({
        day: day++,
        workout_type: 'strength',
        workout_id: 'hm-week11-strength',
        phase: 3
      })
      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: 'hm-week11-tempo',
        phase: 3,
        details: {
          type: 'tempo',
          distance: '4 miles',
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: 600, instruction: 'Easy warmup' },
            { type: 'run', duration: getTempoDuration('4 miles'), instruction: 'Tempo pace' },
            { type: 'run', duration: 600, instruction: 'Easy cooldown' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: 'hm-week11-easy',
        phase: 3,
        details: {
          type: 'continuous',
          distance: '4 miles',
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: getDurationForDistance('4 miles'), instruction: 'Easy pace' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: 'hm-week11-long',
        phase: 3,
        details: {
          type: 'continuous',
          distance: '13.1 miles',
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: getDurationForDistance('13.1 miles'), instruction: 'Peak long run - full half marathon distance at easy pace' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
    } else {
      // Taper weeks
      const taperDistances = {
        12: { easy: '3 miles', tempo: '3 miles', long: '8 miles' },
        13: { easy: '3 miles', easy2: '2 miles', long: '6 miles' }
      }
      const dist = taperDistances[week]

      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: `hm-week${week}-easy`,
        phase: 3,
        details: {
          type: 'continuous',
          distance: dist.easy,
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: getDurationForDistance(dist.easy), instruction: 'Easy pace' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
      if (week === 12) {
        calendar.push({
          day: day++,
          workout_type: 'running',
          workout_id: 'hm-week12-tempo',
          phase: 3,
          details: {
            type: 'tempo',
            distance: dist.tempo,
            intervals: [
              { type: 'warmup_walk', duration: 300 },
              { type: 'run', duration: 600, instruction: 'Easy warmup' },
              { type: 'run', duration: getTempoDuration(dist.tempo), instruction: 'Short tempo' },
              { type: 'run', duration: 600, instruction: 'Easy cooldown' },
              { type: 'cooldown_walk', duration: 300 }
            ]
          }
        })
      } else {
        calendar.push({
          day: day++,
          workout_type: 'running',
          workout_id: 'hm-week13-easy',
          phase: 3,
          details: {
            type: 'continuous',
            distance: dist.easy2,
            intervals: [
              { type: 'warmup_walk', duration: 300 },
              { type: 'run', duration: getDurationForDistance(dist.easy2), instruction: 'Easy pace' },
              { type: 'cooldown_walk', duration: 300 }
            ]
          }
        })
      }
      calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: `hm-week${week}-easy`,
        phase: 3,
        details: {
          type: 'continuous',
          distance: week === 12 ? dist.easy : dist.easy2,
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: getDurationForDistance(week === 12 ? dist.easy : dist.easy2), instruction: 'Easy pace' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({
        day: day++,
        workout_type: 'running',
        workout_id: `hm-week${week}-long`,
        phase: 3,
        details: {
          type: 'continuous',
          distance: dist.long,
          intervals: [
            { type: 'warmup_walk', duration: 300 },
            { type: 'run', duration: getDurationForDistance(dist.long), instruction: 'Easy pace long run' },
            { type: 'cooldown_walk', duration: 300 }
          ]
        }
      })
      calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
    }
  }

  // Week 14: Race week
  calendar.push({
    day: day++,
    workout_type: 'running',
    workout_id: 'hm-week14-easy',
    phase: 3,
    details: {
      type: 'continuous',
      distance: '2 miles',
      intervals: [
        { type: 'warmup_walk', duration: 300 },
        { type: 'run', duration: getDurationForDistance('2 miles'), instruction: 'Easy shakeout run' },
        { type: 'cooldown_walk', duration: 300 }
      ]
    }
  })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  calendar.push({
    day: day++,
    workout_type: 'running',
    workout_id: 'hm-week14-easy',
    phase: 3,
    details: {
      type: 'continuous',
      distance: '2 miles',
      intervals: [
        { type: 'warmup_walk', duration: 300 },
        { type: 'run', duration: getDurationForDistance('2 miles'), instruction: 'Easy pace' },
        { type: 'cooldown_walk', duration: 300 }
      ]
    }
  })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })
  calendar.push({
    day: day++,
    workout_type: 'running',
    workout_id: 'hm-week14-race',
    phase: 3,
    details: {
      type: 'race',
      distance: '13.1 miles',
      note: 'RACE DAY! Trust your training. Start easy, negative split if possible. You\'ve got this!'
    }
  })
  calendar.push({ day: day++, workout_type: 'rest', workout_id: null, phase: 3 })

  return calendar
}

export const fiveKProgram = {
  program_id: '5k-training',
  name: '5K Training Program',
  description: 'A complete 12-week program to prepare for your first 5K race. Includes running workouts, strength training, stretching, and running tips.',
  duration_days: 84, // 12 weeks
  difficulty: 'beginner',
  goal: 'running',
  workouts_per_week: 5,
  target_race: '5K',
  weeks: 12,
  phases: [
    { phase_number: 1, phase_name: 'Base Building', duration_days: 28, description: 'Build running foundation with walk-run intervals' },
    { phase_number: 2, phase_name: 'Endurance Building', duration_days: 28, description: 'Increase running time and distance' },
    { phase_number: 3, phase_name: 'Speed & Taper', duration_days: 28, description: 'Add speed work and taper for race day' }
  ],
  calendar: (() => {
    try {
      return generate5KCalendar()
    } catch (error) {
      console.error('Error generating 5K calendar:', error)
      return []
    }
  })(),
  runningTips: {
    stride: 'Keep your stride natural and comfortable. Aim for 170-180 steps per minute. Avoid overstriding - your foot should land under your body, not in front.',
    breathing: 'Breathe in through your nose and out through your mouth. Try a 2:2 pattern (2 steps inhale, 2 steps exhale) for easy runs, 2:1 for faster paces.',
    posture: 'Keep your head up, shoulders relaxed, and core engaged. Lean slightly forward from your ankles, not your waist.',
    pacing: 'Start slower than you think. You should be able to hold a conversation during easy runs. Save your energy for the finish.',
    hydration: 'Drink water throughout the day, not just during runs. For runs over 30 minutes, consider bringing water.',
    rest: 'Rest days are crucial for recovery. Your body adapts and gets stronger during rest, not during the run.'
  },
  stretchingRoutine: {
    preRun: [
      { name: 'Leg Swings', duration: 30, description: 'Swing each leg forward/back 10 times, then side to side 10 times' },
      { name: 'Walking Lunges', duration: 30, description: 'Take 5-10 walking lunges to warm up hips and legs' },
      { name: 'High Knees', duration: 30, description: 'March in place bringing knees up, 20 reps' },
      { name: 'Butt Kicks', duration: 30, description: 'Light jogging motion kicking heels to glutes, 20 reps' }
    ],
    postRun: [
      { name: 'Quad Stretch', duration: 30, description: 'Stand on one leg, pull other foot to glute, hold each side' },
      { name: 'Hamstring Stretch', duration: 30, description: 'Sit with one leg extended, reach toward toes, hold each side' },
      { name: 'Calf Stretch', duration: 30, description: 'Step one foot back, press heel down, hold each side' },
      { name: 'Hip Flexor Stretch', duration: 30, description: 'Lunge position, push hips forward, hold each side' },
      { name: 'IT Band Stretch', duration: 30, description: 'Cross one leg over, lean to side, hold each side' },
      { name: 'Pigeon Pose', duration: 45, description: 'Yoga pose to stretch glutes and hips, hold each side' }
    ]
  }
}

// Half Marathon Training Program (14 weeks)
export const halfMarathonProgram = {
  program_id: 'half-marathon-training',
  name: 'Half Marathon Training',
  description: 'A comprehensive 14-week program to prepare for your first half marathon. Progressive training with strength, cross-training, and recovery.',
  duration_days: 98, // 14 weeks
  difficulty: 'intermediate',
  goal: 'running',
  workouts_per_week: 5,
  target_race: 'Half Marathon (13.1 miles)',
  weeks: 14,
  phases: [
    { phase_number: 1, phase_name: 'Base Building', duration_days: 28, description: 'Build aerobic base with easy runs' },
    { phase_number: 2, phase_name: 'Build Phase', duration_days: 42, description: 'Increase mileage and add tempo runs' },
    { phase_number: 3, phase_name: 'Peak & Taper', duration_days: 28, description: 'Long runs peak, then taper for race' }
  ],
  calendar: (() => {
    try {
      return generateHalfMarathonCalendar()
    } catch (error) {
      console.error('Error generating Half Marathon calendar:', error)
      return []
    }
  })(),
  runningTips: {
    stride: 'Maintain a cadence of 170-180 steps per minute. Focus on quick, light steps rather than long strides. Your foot should land midfoot, not heel-first.',
    breathing: 'Use rhythmic breathing: 3:2 pattern (3 steps inhale, 2 steps exhale) for easy runs. For tempo runs, switch to 2:1. This helps prevent side stitches.',
    posture: 'Keep your torso tall, shoulders down and relaxed. Engage your core. Your arms should swing naturally at 90-degree angles, not across your body.',
    pacing: 'Most runs should be at "conversation pace" - you can speak in full sentences. Only 20% of your weekly mileage should be at faster paces.',
    hydration: 'Drink 16-20oz of water 2-3 hours before long runs. During runs over 60 minutes, drink 4-6oz every 20 minutes. Practice your race day hydration strategy.',
    nutrition: 'Eat a light meal 2-3 hours before long runs. For runs over 90 minutes, consider gels or sports drinks. Refuel within 30 minutes after long runs.',
    rest: 'Recovery is when adaptation happens. Take easy days easy, hard days hard. Sleep 7-9 hours nightly for optimal recovery.'
  },
  stretchingRoutine: {
    preRun: [
      { name: 'Dynamic Warm-up', duration: 60, description: '5 minutes of light jogging, leg swings, high knees, butt kicks, and walking lunges' },
      { name: 'Hip Circles', duration: 30, description: 'Stand on one leg, circle other leg 10 times each direction' },
      { name: 'Ankle Rolls', duration: 30, description: 'Rotate ankles in circles, 10 each direction' }
    ],
    postRun: {
      immediate: [
        { name: 'Walking Cool-down', duration: 300, description: 'Walk 5 minutes to gradually lower heart rate' },
        { name: 'Light Stretching', duration: 300, description: 'Gentle stretches for major muscle groups' }
      ],
      full: [
        { name: 'Quad Stretch', duration: 45, description: 'Stand on one leg, pull foot to glute, hold each side' },
        { name: 'Hamstring Stretch', duration: 45, description: 'Sit with leg extended, reach toward toes, hold each side' },
        { name: 'Calf Stretch', duration: 45, description: 'Step back, press heel down, hold each side' },
        { name: 'Hip Flexor Stretch', duration: 45, description: 'Lunge position, push hips forward, hold each side' },
        { name: 'Pigeon Pose', duration: 60, description: 'Yoga pose for glutes and hips, hold each side' },
        { name: 'IT Band Stretch', duration: 45, description: 'Cross leg over, lean to side, hold each side' },
        { name: 'Seated Spinal Twist', duration: 45, description: 'Rotate torso to stretch back and core, each side' },
        { name: 'Figure-4 Stretch', duration: 45, description: 'Lie on back, cross ankle over opposite knee, pull leg in' }
      ]
    }
  }
}
