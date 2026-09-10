import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  generateWorkout, label, mainExerciseIds,
  DEFAULT_INPUTS, DURATION_OPTIONS, FITNESS_LEVELS, TARGET_AREAS, WORKOUT_TYPES, EQUIPMENT
} from '../utils/workoutGenerator.js'
import { SETS_OPTIONS } from '../data/workouts.js'
import { saveGeneratedWorkout, getRecentExerciseIds, pushRecentExerciseIds } from '../utils/storage.js'
import './WorkoutGeneratorDemo.css'

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

function WorkoutGeneratorDemo() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [workout, setWorkout] = useState(null)
  const [error, setError] = useState(null)

  const set = (field, value) => setInputs(prev => ({ ...prev, [field]: value }))

  const toggleEquipment = (eq) => setInputs(prev => {
    const has = prev.equipment_available.includes(eq)
    const next = has ? prev.equipment_available.filter(e => e !== eq) : [...prev.equipment_available, eq]
    return { ...prev, equipment_available: next.length ? next : ['none'] }
  })

  const generate = () => {
    try {
      setError(null)
      setWorkout(generateWorkout(inputs, { recentExerciseIds: getRecentExerciseIds() }))
    } catch (err) {
      setError(err.message)
      setWorkout(null)
    }
  }

  const start = () => {
    saveGeneratedWorkout(workout)
    pushRecentExerciseIds(mainExerciseIds(workout))
    navigate('/workout/generated')
  }

  return (
    <div className="workout-generator-demo">
      <div className="generator-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gen-duration">Length</label>
            <select id="gen-duration" value={inputs.duration} onChange={e => set('duration', +e.target.value)}>
              {DURATION_OPTIONS.map(m => <option key={m} value={m}>{m} minutes</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gen-sets">Sets per exercise</label>
            <select id="gen-sets" value={inputs.sets} onChange={e => set('sets', +e.target.value)}>
              {SETS_OPTIONS.map(n => <option key={n} value={n}>{n} sets</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gen-level">Fitness level</label>
            <select id="gen-level" value={inputs.fitness_level} onChange={e => set('fitness_level', e.target.value)}>
              {FITNESS_LEVELS.map(l => <option key={l} value={l}>{cap(l)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gen-type">Type</label>
            <select id="gen-type" value={inputs.workout_type} onChange={e => set('workout_type', e.target.value)}>
              {WORKOUT_TYPES.map(t => <option key={t} value={t}>{label(t)}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="gen-target">Target area</label>
          <select id="gen-target" value={inputs.target_area} onChange={e => set('target_area', e.target.value)}>
            {TARGET_AREAS.map(a => <option key={a} value={a}>{label(a)}</option>)}
          </select>
        </div>

        <div className="form-group">
          <span className="form-label">Equipment</span>
          <div className="checkbox-group">
            {EQUIPMENT.map(eq => (
              <label key={eq} className="checkbox-label">
                <input type="checkbox" checked={inputs.equipment_available.includes(eq)} onChange={() => toggleEquipment(eq)} />
                {cap(eq)}
              </label>
            ))}
          </div>
        </div>

        <button onClick={generate} className="btn btn-primary generate-btn">
          {workout ? 'Shuffle' : 'Generate workout'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {workout && (
        <div className="generated-workout">
          <div className="workout-header">
            <h2>{workout.name}</h2>
            <p className="workout-stats">
              {workout.exercises.length} exercises · {workout.sets} sets each · ~{workout.minutes} min
            </p>
          </div>

          <ol className="generated-list">
            {workout.exercises.map((ex, i) => (
              <li key={i} className={`generated-item generated-item--${ex.slot}`}>
                <span className="generated-slot">{ex.slot}</span>
                <span className="generated-name">{ex.name}</span>
                <span className="generated-sets">{ex.sets > 1 ? `${ex.sets} sets` : '1 round'}</span>
              </li>
            ))}
          </ol>

          <button onClick={start} className="btn btn-primary generate-start">Start this workout</button>
        </div>
      )}
    </div>
  )
}

export default WorkoutGeneratorDemo
