import { Link } from 'react-router-dom'
import { useState } from 'react'
import { workouts, DURATION_OPTIONS, INTENSITY_OPTIONS } from '../data/workouts'
import './WorkoutList.css'

function WorkoutList() {
  const [config, setConfig] = useState({})

  return (
    <div className="workout-list">
      <div className="workout-list-container">
        <div className="workout-list-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Available Workouts</h1>
        </div>

        <div className="workouts-grid">
          {workouts.map((workout) => {
            if (workout.configurable) {
              const opts = config[workout.id] ?? { duration: workout.baseDuration ?? workout.duration, intensity: (workout.difficulty || 'Intermediate').toLowerCase() }
              return (
                <div key={workout.id} className="workout-card workout-card--configurable">
                  <div className="workout-card-image">
                    {workout.icon || '•'}
                  </div>
                  <div className="workout-card-content">
                    <h3>{workout.name}</h3>
                    <p className="workout-duration">{opts.duration} min · {opts.intensity}</p>
                    <p className="workout-description">{workout.description}</p>
                    <div className="workout-card-options" onClick={e => e.stopPropagation()}>
                      <label>
                        <span>Duration</span>
                        <select
                          value={opts.duration}
                          onChange={e => setConfig(prev => ({ ...prev, [workout.id]: { ...(prev[workout.id] ?? opts), duration: +e.target.value } }))}
                        >
                          {DURATION_OPTIONS.map(m => (
                            <option key={m} value={m}>{m} min</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Intensity</span>
                        <select
                          value={opts.intensity}
                          onChange={e => setConfig(prev => ({ ...prev, [workout.id]: { ...(prev[workout.id] ?? opts), intensity: e.target.value } }))}
                        >
                          {INTENSITY_OPTIONS.map(i => (
                            <option key={i} value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <Link
                      to={`/workout/${workout.id}?duration=${opts.duration}&intensity=${opts.intensity}`}
                      className="btn btn-primary workout-card-start"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              )
            }
            return (
              <Link
                key={workout.id}
                to={`/workout/${workout.id}`}
                className="workout-card"
              >
                <div className="workout-card-image">
                  {workout.icon || '•'}
                </div>
                <div className="workout-card-content">
                  <h3>{workout.name}</h3>
                  <p className="workout-duration">{workout.duration} minutes</p>
                  <p className="workout-difficulty">
                    Difficulty: <span className={`difficulty-${workout.difficulty.toLowerCase()}`}>
                      {workout.difficulty}
                    </span>
                  </p>
                  {workout.type && (
                    <p className="workout-type">Type: {workout.type}</p>
                  )}
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
