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

        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Custom Workouts</h3>
            <p>Tailored exercise routines for your fitness goals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱</div>
            <h3>Timer & Tracking</h3>
            <p>Track your progress and stay on schedule</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your fitness journey</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
