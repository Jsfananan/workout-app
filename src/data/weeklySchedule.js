// Weekly training schedule
// Cardio: Wednesday + Friday (outdoor run by default)
// Strength: Tuesday, Thursday, Saturday
// Rest: Sunday + Monday

// Options available on a cardio day. 'outdoor' needs no in-app workout.
export const CARDIO_OPTIONS = [
  {
    id: 'outdoor',
    label: 'Outdoor Run',
    description: 'Head outside and run — no timer needed.',
    workoutId: null
  },
  {
    id: 'cardio-blast',
    label: 'Gym Cardio Blast',
    description: 'Quick Cardio Blast circuit when you are stuck indoors.',
    workoutId: 1
  },
  {
    id: 'strength',
    label: 'Gym Strength',
    description: 'Swap the run for a Full Body Strength session.',
    workoutId: 2
  }
]

export const DEFAULT_CARDIO_OPTION = 'outdoor'

export const getCardioOption = (optionId) =>
  CARDIO_OPTIONS.find(o => o.id === optionId) ?? CARDIO_OPTIONS[0]

// Sunday = 0 ... Saturday = 6, matching Date.getDay()
export const weeklySchedule = [
  {
    dayIndex: 0,
    day: 'Sunday',
    short: 'Sun',
    type: 'rest',
    title: 'Rest',
    description: 'Full rest day — recovery is part of the plan.'
  },
  {
    dayIndex: 1,
    day: 'Monday',
    short: 'Mon',
    type: 'rest',
    title: 'Rest',
    description: 'Full rest day — get ready for the week.'
  },
  {
    dayIndex: 2,
    day: 'Tuesday',
    short: 'Tue',
    type: 'strength',
    title: 'Strength Workout',
    description: 'Full Body Strength — pick your duration and intensity.',
    workoutId: 2
  },
  {
    dayIndex: 3,
    day: 'Wednesday',
    short: 'Wed',
    type: 'cardio',
    title: 'Cardio',
    description: 'Run outside, or switch to a gym session.'
  },
  {
    dayIndex: 4,
    day: 'Thursday',
    short: 'Thu',
    type: 'strength',
    title: 'Strength Workout',
    description: 'Full Body Strength — pick your duration and intensity.',
    workoutId: 2
  },
  {
    dayIndex: 5,
    day: 'Friday',
    short: 'Fri',
    type: 'cardio',
    title: 'Cardio',
    description: 'Run outside, or switch to a gym session.'
  },
  {
    dayIndex: 6,
    day: 'Saturday',
    short: 'Sat',
    type: 'strength',
    title: 'Strength Workout',
    description: 'Full Body Strength — pick your duration and intensity.',
    workoutId: 2
  }
]

export const getDayPlan = (dayIndex) =>
  weeklySchedule.find(d => d.dayIndex === dayIndex)

export const getToday = (now = new Date()) => getDayPlan(now.getDay())
