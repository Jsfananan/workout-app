import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import Home from './pages/Home'
import WorkoutList from './pages/WorkoutList'
import WorkoutDetail from './pages/WorkoutDetail'
import WorkoutGenerator from './pages/WorkoutGenerator'
import Schedule from './pages/Schedule'
import History from './pages/History'
import './App.css'

// HashRouter so deep links work on any static host (GitHub Pages included)
// without server-side rewrites.
function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<WorkoutList />} />
            <Route path="/workout/:id" element={<WorkoutDetail />} />
            <Route path="/generate" element={<WorkoutGenerator />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </SettingsProvider>
  )
}

export default App
