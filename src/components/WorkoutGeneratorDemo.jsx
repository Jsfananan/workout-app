import { useState } from 'react'
import { generateWorkout, getWorkoutSummary } from '../utils/workoutGenerator.js'
import { getExerciseById } from '../data/exercises.js'
import './WorkoutGeneratorDemo.css'

function WorkoutGeneratorDemo() {
  const [userInputs, setUserInputs] = useState({
    duration: 20,
    fitness_level: 'intermediate',
    target_area: 'total_body',
    workout_type: 'mixed',
    equipment_available: ['none'],
    banned_exercises: []
  })
  
  const [generatedWorkout, setGeneratedWorkout] = useState(null)
  const [error, setError] = useState(null)
  const [userWeight, setUserWeight] = useState(150)

  const handleGenerate = () => {
    try {
      setError(null)
      const workout = generateWorkout(userInputs, userWeight)
      setGeneratedWorkout(workout)
    } catch (err) {
      setError(err.message)
      setGeneratedWorkout(null)
    }
  }

  const handleInputChange = (field, value) => {
    setUserInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEquipmentToggle = (equipment) => {
    setUserInputs(prev => {
      const current = prev.equipment_available || []
      const updated = current.includes(equipment)
        ? current.filter(eq => eq !== equipment)
        : [...current, equipment]
      return { ...prev, equipment_available: updated }
    })
  }

  return (
    <div className="workout-generator-demo">
      <div className="generator-form">
        <h2>Generate Custom Workout</h2>
        
        <div className="form-group">
          <label>Duration (minutes)</label>
          <select 
            value={userInputs.duration} 
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
          >
            <option value={10}>10 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fitness Level</label>
          <select 
            value={userInputs.fitness_level} 
            onChange={(e) => handleInputChange('fitness_level', e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>Target Area</label>
          <select 
            value={userInputs.target_area} 
            onChange={(e) => handleInputChange('target_area', e.target.value)}
          >
            <option value="total_body">Total Body</option>
            <option value="upper_body">Upper Body</option>
            <option value="lower_body">Lower Body</option>
            <option value="abs">Abs</option>
            <option value="booty">Booty</option>
            <option value="arms">Arms</option>
            <option value="legs">Legs</option>
          </select>
        </div>

        <div className="form-group">
          <label>Workout Type</label>
          <select 
            value={userInputs.workout_type} 
            onChange={(e) => handleInputChange('workout_type', e.target.value)}
          >
            <option value="mixed">Mixed</option>
            <option value="hiit">HIIT</option>
            <option value="strength">Strength</option>
            <option value="kickboxing">Kickboxing</option>
            <option value="yoga">Yoga</option>
            <option value="low_impact">Low Impact</option>
          </select>
        </div>

        <div className="form-group">
          <label>Equipment Available</label>
          <div className="checkbox-group">
            {['none', 'dumbbells', 'bands', 'bench', 'ball'].map(eq => (
              <label key={eq} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={userInputs.equipment_available.includes(eq)}
                  onChange={() => handleEquipmentToggle(eq)}
                />
                {eq.charAt(0).toUpperCase() + eq.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Your Weight (lbs) - for calorie calculation</label>
          <input
            type="number"
            value={userWeight}
            onChange={(e) => setUserWeight(parseInt(e.target.value) || 150)}
            min="100"
            max="300"
          />
        </div>

        <button onClick={handleGenerate} className="generate-btn">
          Generate Workout
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {generatedWorkout && (
        <div className="generated-workout">
          <div className="workout-header">
            <h2>Your Generated Workout</h2>
            <div className="workout-stats">
              <div className="stat">
                <span className="stat-label">Duration:</span>
                <span className="stat-value">{generatedWorkout.total_duration} min</span>
              </div>
              <div className="stat">
                <span className="stat-label">Circuits:</span>
                <span className="stat-value">{generatedWorkout.circuits.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Calories:</span>
                <span className="stat-value">{generatedWorkout.estimated_calories}</span>
              </div>
            </div>
          </div>

          <div className="workout-sections">
            <div className="section">
              <h3>Warmup ({generatedWorkout.warmup.duration}s)</h3>
              <ul>
                {generatedWorkout.warmup.exercises.map((ex, idx) => {
                  const exercise = getExerciseById(ex.exercise_id)
                  return (
                    <li key={idx}>
                      {exercise.name} ({ex.duration}s)
                    </li>
                  )
                })}
              </ul>
            </div>

            {generatedWorkout.circuits.map((circuit, circuitIdx) => (
              <div key={circuitIdx} className="section">
                <h3>Circuit {circuit.circuit_number}</h3>
                {circuit.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="circuit-section">
                    <h4>{section.type.toUpperCase()} ({section.duration}s)</h4>
                    <ul>
                      {section.exercises.map((ex, exIdx) => {
                        const exercise = getExerciseById(ex.exercise_id)
                        return (
                          <li key={exIdx}>
                            {exercise.name} ({ex.duration}s)
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            <div className="section">
              <h3>Cooldown ({generatedWorkout.cooldown.duration}s)</h3>
              <ul>
                {generatedWorkout.cooldown.exercises.map((ex, idx) => {
                  const exercise = getExerciseById(ex.exercise_id)
                  return (
                    <li key={idx}>
                      {exercise.name} ({ex.duration}s)
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutGeneratorDemo
