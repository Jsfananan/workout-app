import { Link } from 'react-router-dom'
import { workouts } from '../data/workouts'
import './WorkoutList.css'

function WorkoutList() {
  return (
    <div className="workout-list">
      <div className="workout-list-container">
        <div className="workout-list-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Available Workouts</h1>
        </div>

        <div className="workouts-grid">
          {workouts.map((workout) => (
            <Link 
              key={workout.id} 
              to={`/workout/${workout.id}`}
              className="workout-card"
            >
              <div className="workout-card-image">
                {workout.icon || '⚡'}
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkoutList
