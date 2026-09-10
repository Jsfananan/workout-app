import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getWorkoutById } from '../data/workouts'
import { getToday, getCardioOption, DEFAULT_CARDIO_OPTION, toISODate } from '../data/weeklySchedule'
import { getHistoryForDate, workoutPath } from '../utils/storage'
import { useSettings } from '../context/SettingsContext'
import './Home.css'

const readJSON = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || {}
  } catch {
    return {}
  }
}

// Today's plan, resolved the same way the Schedule page does it.
function todayPlan() {
  const day = getToday()
  const date = toISODate(new Date())
  const cardioChoice = day.type === 'cardio'
    ? getCardioOption(readJSON('weeklyCardioChoices')[day.dayIndex] ?? DEFAULT_CARDIO_OPTION)
    : null
  const makeupId = day.type === 'cardio' ? readJSON('weeklyMakeupWorkouts')[date] : null
  const workout = getWorkoutById(day.type === 'cardio' ? cardioChoice.workoutId : day.workoutId)
  const makeup = getWorkoutById(makeupId)
  return {
    day,
    title: day.type === 'cardio' ? cardioChoice.label : day.title,
    note: day.type === 'cardio' ? cardioChoice.description : day.description,
    workout,
    makeup,
    done: getHistoryForDate(date)
  }
}

function Home() {
  const { language, setLanguage } = useSettings()
  const isEs = language === 'es'
  const plan = useMemo(todayPlan, [])

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-topbar">
          <button className="btn-language" onClick={() => setLanguage(isEs ? 'en' : 'es')}>
            {isEs ? '🇺🇸 English' : '🇲🇽 Español'}
          </button>
        </div>

        <h1 className="home-title">Workout App</h1>

        <div className={`today-card today-card--${plan.day.type}`}>
          <p className="today-label">{isEs ? 'Hoy' : 'Today'} · {plan.day.day}</p>
          <h2>{plan.title}</h2>
          <p className="today-note">{plan.note}</p>

          {plan.done.length > 0 && (
            <p className="today-done">
              ✓ {isEs ? 'Hecho' : 'Done'}: {plan.done.map(h => h.name).join(', ')}
            </p>
          )}

          <div className="today-actions">
            {plan.workout && (
              <Link to={workoutPath(plan.workout)} className="btn btn-primary">
                {isEs ? 'Empezar' : 'Start'} {plan.workout.name}
              </Link>
            )}
            {plan.makeup && (
              <Link to={workoutPath(plan.makeup)} className="btn btn-secondary">
                {isEs ? 'Recuperar' : 'Make-up'}: {plan.makeup.name}
              </Link>
            )}
          </div>
        </div>

        <div className="home-actions">
          <Link to="/schedule" className="btn btn-secondary">{isEs ? 'Mi Semana' : 'My Week'}</Link>
          <Link to="/generate" className="btn btn-secondary">{isEs ? 'Generar' : 'Generate'}</Link>
          <Link to="/workouts" className="btn btn-secondary">{isEs ? 'Explorar' : 'Browse'}</Link>
          <Link to="/history" className="btn btn-secondary">{isEs ? 'Historial' : 'History'}</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
