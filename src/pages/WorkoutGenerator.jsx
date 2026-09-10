import { Link } from 'react-router-dom'
import WorkoutGeneratorDemo from '../components/WorkoutGeneratorDemo'

function WorkoutGenerator() {
  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>Generate a Workout</h1>
          <p className="page-subtitle">Warmup, a 3-2-1 main block done in sets, and a cooldown. No timers.</p>
        </div>
        <WorkoutGeneratorDemo />
      </div>
    </div>
  )
}

export default WorkoutGenerator
