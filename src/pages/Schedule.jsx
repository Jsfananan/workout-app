import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { getWorkoutById } from '../data/workouts'
import { getHistoryForDate, workoutPath } from '../utils/storage'
import {
  weeklySchedule,
  CARDIO_OPTIONS,
  DEFAULT_CARDIO_OPTION,
  MAKEUP_OPTIONS,
  getCardioOption,
  getWeekDates,
  pruneMakeups,
  toISODate
} from '../data/weeklySchedule'
import './Schedule.css'

const STORAGE_KEY = 'weeklyCardioChoices'
const MAKEUP_STORAGE_KEY = 'weeklyMakeupWorkouts'

const readStored = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || {}
  } catch {
    return {}
  }
}

const dayLabel = (date) =>
  date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

function Schedule() {
  const [cardioChoices, setCardioChoices] = useState(() => readStored(STORAGE_KEY))

  const weekDates = useMemo(() => getWeekDates(), [])

  // Make-ups are keyed by date, so last week's leftovers are dropped on load.
  const [makeups, setMakeups] = useState(() => pruneMakeups(readStored(MAKEUP_STORAGE_KEY), weekDates))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardioChoices))
  }, [cardioChoices])

  useEffect(() => {
    localStorage.setItem(MAKEUP_STORAGE_KEY, JSON.stringify(makeups))
  }, [makeups])

  const today = new Date().getDay()

  const setChoice = (dayIndex, optionId) =>
    setCardioChoices(prev => ({ ...prev, [dayIndex]: optionId }))

  // Clicking the selected make-up again clears it.
  const toggleMakeup = (date, workoutId) =>
    setMakeups(prev => {
      const next = { ...prev }
      if (next[date] === workoutId) {
        delete next[date]
      } else {
        next[date] = workoutId
      }
      return next
    })

  return (
    <div className="page schedule">
      <div className="page-container">
        <div className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>My Week</h1>
          <p className="page-subtitle">
            Cardio Wednesday and Friday · Strength Tuesday, Thursday and Saturday
          </p>
        </div>

        <div className="schedule-days">
          {weeklySchedule.map((day, index) => {
            const isToday = day.dayIndex === today
            const date = toISODate(weekDates[day.dayIndex])
            const choiceId = cardioChoices[day.dayIndex] ?? DEFAULT_CARDIO_OPTION
            const cardioChoice = day.type === 'cardio' ? getCardioOption(choiceId) : null
            const workout = getWorkoutById(
              day.type === 'cardio' ? cardioChoice.workoutId : day.workoutId
            )
            const makeupWorkout = day.type === 'cardio' ? getWorkoutById(makeups[date]) : null
            const done = getHistoryForDate(date)

            return (
              <div
                key={day.dayIndex}
                className={`schedule-day schedule-day--${day.type}${isToday ? ' schedule-day--today' : ''}${done.length ? ' schedule-day--done' : ''}`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="schedule-day-header">
                  <h2>{day.day}</h2>
                  {isToday
                    ? <span className="schedule-today-badge">Today</span>
                    : <span className="schedule-date">{dayLabel(weekDates[day.dayIndex])}</span>}
                </div>

                {done.length > 0 && (
                  <p className="schedule-done">
                    {done.map((h, i) => (
                      <span key={i} className="badge badge-done">✓ {h.name}{typeof h.averageRating === 'number' ? ` · ${h.averageRating}/5` : ''}</span>
                    ))}
                  </p>
                )}

                <p className="schedule-day-title">
                  {day.type === 'cardio' ? cardioChoice.label : day.title}
                </p>
                <p className="schedule-day-description">
                  {day.type === 'cardio' ? cardioChoice.description : day.description}
                </p>

                {day.type === 'cardio' && (
                  <div className="schedule-toggle" role="group" aria-label={`${day.day} cardio option`}>
                    {CARDIO_OPTIONS.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        className={`schedule-toggle-btn${option.id === cardioChoice.id ? ' schedule-toggle-btn--active' : ''}`}
                        aria-pressed={option.id === cardioChoice.id}
                        onClick={() => setChoice(day.dayIndex, option.id)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {workout && (
                  <Link to={workoutPath(workout)} className="btn btn-primary schedule-start">
                    Start {workout.name}
                  </Link>
                )}

                {!workout && day.type === 'cardio' && (
                  <p className="schedule-no-workout">No timer needed — just go run.</p>
                )}

                {day.type === 'cardio' && (
                  <div className="schedule-makeup">
                    <p className="schedule-makeup-label">Missed a day? Add a workout:</p>
                    <div className="schedule-toggle" role="group" aria-label={`${day.day} make-up workout`}>
                      {MAKEUP_OPTIONS.map(option => (
                        <button
                          key={option.workoutId}
                          type="button"
                          className={`schedule-toggle-btn schedule-toggle-btn--small${makeups[date] === option.workoutId ? ' schedule-toggle-btn--active' : ''}`}
                          aria-pressed={makeups[date] === option.workoutId}
                          onClick={() => toggleMakeup(date, option.workoutId)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {makeupWorkout && (
                      <Link to={workoutPath(makeupWorkout)} className="btn btn-secondary schedule-start">
                        Start {makeupWorkout.name}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Schedule
