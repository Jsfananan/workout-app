// Program Database
// Contains structured workout programs with calendars and phases

import { getExerciseById } from './exercises.js'
import { 
  buildShredLevel1, 
  buildShredLevel2, 
  buildShredLevel3,
  buildBeginnerWorkout
} from './workoutBuilders.js'
import { fiveKProgram, halfMarathonProgram } from './runningPrograms.js'


// Workouts will be loaded on demand via workoutLoader.js

// Programs array
export const programs = [
  // 30 Day Shred Program
  {
    program_id: '30-day-shred',
    name: '30 Day Shred',
    description: 'A 30-day program with 3 progressive levels. Each level is 10 days of intense workouts designed to shred fat and build strength.',
    duration_days: 30,
    difficulty: 'beginner',
    goal: 'weight_loss',
    workouts_per_week: 6,
    phases: [
      { phase_number: 1, phase_name: 'Level 1', duration_days: 10, description: 'Foundation level - building strength and endurance' },
      { phase_number: 2, phase_name: 'Level 2', duration_days: 10, description: 'Progression level - increased intensity' },
      { phase_number: 3, phase_name: 'Level 3', duration_days: 10, description: 'Advanced level - maximum intensity' }
    ],
    calendar: (() => {
      const calendar = []
      const level1Workout = buildShredLevel1()
      const level2Workout = buildShredLevel2()
      const level3Workout = buildShredLevel3()
      
      // Days 1-10: Level 1
      for (let day = 1; day <= 10; day++) {
        if (day === 7) {
          calendar.push({ day, workout_type: 'rest', workout_id: null, phase: 1 })
        } else {
          calendar.push({ day, workout_type: 'strength', workout_id: level1Workout.workout_id, phase: 1 })
        }
      }
      
      // Days 11-20: Level 2
      for (let day = 11; day <= 20; day++) {
        if (day === 14 || day === 21) {
          calendar.push({ day, workout_type: 'rest', workout_id: null, phase: 2 })
        } else {
          calendar.push({ day, workout_type: 'strength', workout_id: level2Workout.workout_id, phase: 2 })
        }
      }
      
      // Days 21-30: Level 3
      for (let day = 21; day <= 30; day++) {
        if (day === 28) {
          calendar.push({ day, workout_type: 'rest', workout_id: null, phase: 3 })
        } else {
          calendar.push({ day, workout_type: 'strength', workout_id: level3Workout.workout_id, phase: 3 })
        }
      }
      
      return calendar
    })()
  },
  
  // Fitness for Beginners Program
  {
    program_id: 'fitness-beginners',
    name: 'Fitness for Beginners',
    description: 'A gentle 30-day introduction to fitness with 4 workouts per week. Perfect for those just starting their fitness journey.',
    duration_days: 30,
    difficulty: 'beginner',
    goal: 'foundation',
    workouts_per_week: 4,
    phases: [
      { phase_number: 1, phase_name: 'Getting Started', duration_days: 30, description: 'Learn the basics and build a foundation' }
    ],
    calendar: (() => {
      const calendar = []
      const beginnerWorkouts = []
      
      // Create 10 unique beginner workouts
      for (let i = 1; i <= 10; i++) {
        beginnerWorkouts.push(buildBeginnerWorkout(i))
      }
      
      let workoutIndex = 0
      for (let day = 1; day <= 30; day++) {
        // Rest days: 2, 4, 6, 7 (every other day + Sunday)
        if (day % 2 === 0 || day === 7 || day === 14 || day === 21 || day === 28) {
          calendar.push({ day, workout_type: 'rest', workout_id: null, phase: 1 })
        } else {
          calendar.push({ 
            day, 
            workout_type: 'strength', 
            workout_id: beginnerWorkouts[workoutIndex % beginnerWorkouts.length].workout_id, 
            phase: 1 
          })
          workoutIndex++
        }
      }
      
      return calendar
    })()
  },
  
  // 5K Training Program
  fiveKProgram,
  
  // Half Marathon Training Program
  halfMarathonProgram
]


// Helper function to get program by ID
export const getProgramById = (id) => {
  return programs.find(p => p.program_id === id)
}

// Helper function to get current workout for a program
export function getCurrentWorkout(programId, startDate) {
  const program = getProgramById(programId)
  if (!program) {
    return { status: 'error', message: 'Program not found' }
  }

  const today = new Date()
  const start = new Date(startDate)
  const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1

  if (daysSinceStart > program.duration_days) {
    return { status: 'completed', message: 'Program completed! Great job!' }
  }

  if (daysSinceStart < 1) {
    return { status: 'not_started', message: 'Program starts soon!' }
  }

  const todaySchedule = program.calendar.find(day => day.day === daysSinceStart)

  if (!todaySchedule) {
    return { status: 'rest', message: 'Rest day - recovery is important!' }
  }

  if (todaySchedule.workout_type === 'rest') {
    return { 
      status: 'rest', 
      message: 'Rest day - recovery is important!',
      day: daysSinceStart,
      totalDays: program.duration_days,
      phase: todaySchedule.phase
    }
  }

  return {
    status: 'active',
    workout_id: todaySchedule.workout_id,
    day: daysSinceStart,
    phase: todaySchedule.phase,
    totalDays: program.duration_days,
    programName: program.name,
    workout_type: todaySchedule.workout_type,
    details: todaySchedule.details || null
  }
}

// Helper to get program progress
export function getProgramProgress(programId, startDate) {
  const program = getProgramById(programId)
  if (!program) return null

  const today = new Date()
  const start = new Date(startDate)
  const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1

  const progress = Math.min((daysSinceStart / program.duration_days) * 100, 100)
  const currentPhase = program.phases.find(p => {
    const phaseStart = program.calendar.find(d => d.phase === p.phase_number)?.day || 1
    const phaseEnd = phaseStart + p.duration_days - 1
    return daysSinceStart >= phaseStart && daysSinceStart <= phaseEnd
  })

  return {
    daysCompleted: Math.min(daysSinceStart, program.duration_days),
    totalDays: program.duration_days,
    progress: Math.round(progress),
    currentPhase: currentPhase,
    isCompleted: daysSinceStart > program.duration_days
  }
}
