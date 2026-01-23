import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { workouts } from '../data/workouts'
import Timer from '../components/Timer'
import JillianTimer from '../components/JillianTimer'
import './WorkoutDetail.css'

function WorkoutDetail() {
  const { id } = useParams()
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [useJillianTimer, setUseJillianTimer] = useState(() => {
    const saved = localStorage.getItem('useJillianTimer')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('useJillianTimer', JSON.stringify(useJillianTimer))
  }, [useJillianTimer])

  useEffect(() => {
    const foundWorkout = workouts.find(w => w.id === parseInt(id))
    setWorkout(foundWorkout)
    setLoading(false)
  }, [id])

  useEffect(() => {
    if (workout && workout.exercises && workout.exercises.length > 0) {
      setTimeRemaining(workout.exercises[0].duration)
    }
  }, [workout])

  if (loading) {
    return (
      <div className="workout-detail">
        <div className="workout-detail-container">
          <p>Loading workout...</p>
        </div>
      </div>
    )
  }

  if (!workout || !workout.exercises || workout.exercises.length === 0) {
    return (
      <div className="workout-detail">
        <div className="workout-detail-container">
          <p>Workout not found</p>
          <Link to="/workouts">← Back to Workouts</Link>
        </div>
      </div>
    )
  }

  const currentExercise = workout.exercises[currentExerciseIndex]
  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100

  const handleNext = () => {
    setIsActive(false)
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setTimeRemaining(workout.exercises[currentExerciseIndex + 1].duration)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setTimeRemaining(workout.exercises[currentExerciseIndex - 1].duration)
      setIsActive(false)
    }
  }

  const handleComplete = () => {
    alert('Workout completed! Great job!')
  }

  return (
    <div className="workout-detail">
      <div className="workout-detail-container">
        <div className="workout-detail-header">
          <Link to="/workouts" className="back-link">← Back to Workouts</Link>
          <h1>{workout.name}</h1>
          <div className="workout-meta">
            <span className="workout-duration-badge">{workout.duration} min</span>
            <span className={`difficulty-badge difficulty-${workout.difficulty.toLowerCase()}`}>
              {workout.difficulty}
            </span>
            {workout.type && (
              <span className="workout-type-badge">{workout.type}</span>
            )}
          </div>
          <div className="timer-toggle">
            <label className="timer-toggle-label">
              <input
                type="checkbox"
                checked={useJillianTimer}
                onChange={(e) => setUseJillianTimer(e.target.checked)}
              />
              <span>Use Jillian's Timer Style</span>
            </label>
          </div>
        </div>

        <div className="workout-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
          </p>
        </div>

        <div className="exercise-display">
          <div className="exercise-card">
            <div className="exercise-icon">{currentExercise.icon || '•'}</div>
            <h2>{currentExercise.name}</h2>
            <p className="exercise-instructions">{currentExercise.instructions}</p>
            
            {useJillianTimer ? (
              <JillianTimer
                duration={currentExercise.duration}
                isActive={isActive}
                onComplete={handleNext}
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
              />
            ) : (
              <Timer
                duration={currentExercise.duration}
                isActive={isActive}
                onComplete={handleNext}
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
              />
            )}

            <div className="exercise-controls">
              <button 
                onClick={() => setIsActive(!isActive)}
                className="btn btn-primary"
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              {currentExerciseIndex > 0 && (
                <button 
                  onClick={handlePrevious}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
              )}
              {currentExerciseIndex < workout.exercises.length - 1 ? (
                <button 
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  Next Exercise
                </button>
              ) : (
                <button 
                  onClick={handleComplete}
                  className="btn btn-success"
                >
                  Complete Workout
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="exercise-list">
          <h3>Exercise List</h3>
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li 
                key={index}
                className={index === currentExerciseIndex ? 'active' : ''}
                onClick={() => {
                  setCurrentExerciseIndex(index)
                  setTimeRemaining(exercise.duration)
                  setIsActive(false)
                }}
              >
                <span className="exercise-list-icon">{exercise.icon || '•'}</span>
                <span className="exercise-list-name">{exercise.name}</span>
                <span className="exercise-list-duration">{exercise.duration}s</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WorkoutDetail
