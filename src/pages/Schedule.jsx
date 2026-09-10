import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { workouts } from '../data/workouts'
import {
  weeklySchedule,
  CARDIO_OPTIONS,
  DEFAULT_CARDIO_OPTION,
  getCardioOption
} from '../data/weeklySchedule'
import './Schedule.css'

const STORAGE_KEY = 'weeklyCardioChoices'

const getWorkout = (id) => workouts.find(w => w.id === id)

const workoutLink = (workout) => {
  if (!workout) return null
  if (!workout.configurable) return `/workout/${workout.id}`
  const duration = workout.baseDuration ?? workout.duration
  const intensity = (workout.difficulty || 'Intermediate').toLowerCase()
  return `/workout/${workout.id}?duration=${duration}&intensity=${intensity}`
}

function Schedule() {
  const [cardioChoices, setCardioChoices] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardioChoices))
  }, [cardioChoices])

  const today = new Date().getDay()

  const setChoice = (dayIndex, optionId) =>
    setCardioChoices(prev => ({ ...prev, [dayIndex]: optionId }))

  return (
    <div className="schedule">
      <div className="schedule-container">
        <div className="schedule-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>My Week</h1>
          <p className="schedule-subtitle">
            Cardio Wednesday and Friday · Strength Tuesday, Thursday and Saturday
          </p>
        </div>

        <div className="schedule-days">
          {weeklySchedule.map((day, index) => {
            const isToday = day.dayIndex === today
            const choiceId = cardioChoices[day.dayIndex] ?? DEFAULT_CARDIO_OPTION
            const cardioChoice = day.type === 'cardio' ? getCardioOption(choiceId) : null
            const workout = getWorkout(
              day.type === 'cardio' ? cardioChoice.workoutId : day.workoutId
            )

            return (
              <div
                key={day.dayIndex}
                className={`schedule-day schedule-day--${day.type}${isToday ? ' schedule-day--today' : ''}`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="schedule-day-header">
                  <h2>{day.day}</h2>
                  {isToday && <span className="schedule-today-badge">Today</span>}
                </div>

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
                  <Link to={workoutLink(workout)} className="btn btn-primary schedule-start">
                    Start {workout.name}
                  </Link>
                )}

                {!workout && day.type === 'cardio' && (
                  <p className="schedule-no-workout">No timer needed — just go run.</p>
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
