import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WorkoutList from './pages/WorkoutList'
import WorkoutDetail from './pages/WorkoutDetail'
import WorkoutGenerator from './pages/WorkoutGenerator'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/generate" element={<WorkoutGenerator />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
