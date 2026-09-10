import { Link } from 'react-router-dom'
import { useState } from 'react'
import { workouts, SETS_OPTIONS, INTENSITY_OPTIONS, DEFAULT_SETS, resolveWorkout } from '../data/workouts'
import { getLastConfig } from '../utils/storage'
import './WorkoutList.css'

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

function WorkoutList() {
  // Per-workout sets/intensity, seeded from whatever was used last time.
  const [config, setConfig] = useState(() =>
    Object.fromEntries(
      workouts.filter(w => w.configurable).map(w => {
        const last = getLastConfig(w.id)
        return [w.id, {
          sets: last?.sets || DEFAULT_SETS,
          intensity: last?.intensity || w.difficulty.toLowerCase()
        }]
      })
    )
  )

  const update = (id, patch) => setConfig(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>Workouts</h1>
        </div>

        <div className="workouts-grid">
          {workouts.map((workout, index) => {
            if (workout.configurable) {
              const opts = config[workout.id]
              const resolved = resolveWorkout(workout, opts)
              return (
                <div key={workout.id} className="workout-card workout-card--configurable" style={{ animationDelay: `${index * 0.06}s` }}>
                  <div className="workout-card-image" aria-hidden="true" />
                  <div className="workout-card-content">
                    <h3>{workout.name}</h3>
                    <p className="workout-duration">
                      {resolved.exercises.length} exercises · {opts.sets} sets · ~{resolved.minutes} min
                    </p>
                    <p className="workout-description">{workout.description}</p>
                    <div className="workout-card-options">
                      <label>
                        <span>Sets</span>
                        <select value={opts.sets} onChange={e => update(workout.id, { sets: +e.target.value })}>
                          {SETS_OPTIONS.map(n => <option key={n} value={n}>{n} sets</option>)}
                        </select>
                      </label>
                      <label>
                        <span>Intensity</span>
                        <select value={opts.intensity} onChange={e => update(workout.id, { intensity: e.target.value })}>
                          {INTENSITY_OPTIONS.map(i => <option key={i} value={i}>{cap(i)}</option>)}
                        </select>
                      </label>
                    </div>
                    <Link
                      to={`/workout/${workout.id}?sets=${opts.sets}&intensity=${opts.intensity}`}
                      className="btn btn-primary workout-card-start"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              )
            }
            return (
              <Link key={workout.id} to={`/workout/${workout.id}`} className="workout-card" style={{ animationDelay: `${index * 0.06}s` }}>
                <div className="workout-card-image" aria-hidden="true" />
                <div className="workout-card-content">
                  <h3>{workout.name}</h3>
                  <p className="workout-duration">{workout.duration} minutes · {workout.exercises.length} steps</p>
                  <p className="workout-difficulty">
                    Difficulty: <span className={`difficulty-${workout.difficulty.toLowerCase()}`}>{workout.difficulty}</span>
                  </p>
                  {workout.type && <p className="workout-type">Type: {workout.type}</p>}
                  <p className="workout-description">{workout.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkoutList
