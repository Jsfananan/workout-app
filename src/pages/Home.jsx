import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <h1 className="home-title">Workout App</h1>
        <p className="home-subtitle">Transform your body, one workout at a time</p>
        
        <div className="home-actions">
          <Link to="/generate" className="btn btn-primary">
            Generate Custom Workout
          </Link>
          <Link to="/workouts" className="btn btn-secondary">
            Browse Workouts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
