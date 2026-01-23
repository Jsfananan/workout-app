import { Link } from 'react-router-dom'
import WorkoutGeneratorDemo from '../components/WorkoutGeneratorDemo'
import './WorkoutGenerator.css'

function WorkoutGenerator() {
  return (
    <div className="workout-generator-page">
      <div className="workout-generator-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Custom Workout Generator</h1>
        <p className="page-subtitle">Create a personalized workout tailored to your fitness goals</p>
      </div>
      <WorkoutGeneratorDemo />
    </div>
  )
}

export default WorkoutGenerator
