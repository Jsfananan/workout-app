import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { workouts, buildConfigurableExercises } from '../data/workouts'
import Timer from '../components/Timer'
import JillianTimer from '../components/JillianTimer'
import './WorkoutDetail.css'

const exerciseTranslations = {
  // Cardio - Beginner
  "March in Place": "Marcha en el Lugar",
  "Step Touch": "Paso y Toque",
  "Rest": "Descanso",
  "Modified Burpees": "Burpees Modificados",
  "Standing Mountain Climbers": "Escaladores de Pie",
  // Cardio - Intermediate/Advanced
  "Jumping Jacks": "Saltos de Tijera",
  "High Knees": "Rodillas Altas",
  "Burpees": "Burpees",
  "Mountain Climbers": "Escaladores de Montaña",
  "Burpees with Push-up": "Burpees con Lagartija",
  // Strength - Beginner
  "Knee Push-ups": "Lagartijas de Rodillas",
  "Chair Squats": "Sentadillas con Silla",
  "Plank (Knees Down)": "Plancha (Rodillas Abajo)",
  "Standing Lunges": "Desplantes de Pie",
  // Strength - Intermediate
  "Push-ups": "Lagartijas",
  "Squats": "Sentadillas",
  "Plank": "Plancha",
  "Lunges": "Desplantes",
  // Strength - Advanced
  "Jump Squats": "Sentadillas con Salto",
  "Plank with Shoulder Tap": "Plancha con Toque de Hombro",
  "Jump Lunges": "Desplantes con Salto",
  // Core
  "Crunches": "Abdominales",
  "Plank Hold": "Plancha",
  "Bicycle Crunches": "Abdominales de Bicicleta",
  "Bicycle Crunches (Slow)": "Abdominales de Bicicleta (Lento)",
  "Russian Twists": "Giros Rusos",
  "Seated Russian Twist": "Giro Ruso Sentado",
  "Russian Twists (Feet Up)": "Giros Rusos (Pies Arriba)",
  "Leg Raises": "Elevaciones de Piernas",
  "Plank with Reach": "Plancha con Extensión",
  // Running
  "Warm-up Walk": "Caminata de Calentamiento",
  "Run": "Correr",
  "Walk": "Caminar",
  "Cooldown Walk": "Caminata de Enfriamiento",
  "Continuous Run": "Carrera Continua",
  "Long Run": "Carrera Larga",
  "Fast Run": "Carrera Rápida",
  "Recovery Walk": "Caminata de Recuperación",
  "Steady Run": "Carrera Estable",
  "Easy Run": "Carrera Fácil",
  "Tempo Run": "Carrera de Tempo",
}

const instructionTranslations = {
  "March steadily, lifting knees to a comfortable height": "Marcha de forma estable, levantando las rodillas a una altura cómoda",
  "Step side to side, touching feet together as you go": "Da pasos de lado a lado, juntando los pies al moverte",
  "Take a quick breather": "Toma un respiro rápido",
  "Step back to plank (no jump), step forward, and stand. Add a small hop optional.": "Da un paso atrás a plancha (sin salto), paso adelante y de pie. Pequeño salto opcional.",
  "Stand and drive knees up toward chest one at a time, at a steady pace": "De pie, lleva las rodillas al pecho una a la vez, a un ritmo constante",
  "Jump your feet apart while raising your arms overhead, then return to start": "Salta separando los pies mientras levantas los brazos, luego regresa",
  "Run in place, bringing your knees up toward your chest": "Corre en el lugar, llevando las rodillas hacia el pecho",
  "Squat down, jump back into plank, do a push-up, jump forward, and jump up": "Agáchate, salta a plancha, haz una lagartija, salta adelante y salta arriba",
  "In plank position, alternate bringing your knees to your chest": "En posición de plancha, alterna llevando las rodillas al pecho",
  "Explosive jumping jacks; land softly": "Saltos de tijera explosivos; aterriza suavemente",
  "Drive knees up quickly; aim for speed": "Lleva las rodillas arriba rápido; busca velocidad",
  "Brief rest": "Descanso breve",
  "Full burpee with a strict push-up at the bottom, then jump up": "Burpee completo con lagartija estricta abajo, luego salta",
  "Fast pace; keep hips low and core tight": "Ritmo rápido; mantén las caderas bajas y el abdomen apretado",
  "Push-ups with knees on the floor; keep your back straight": "Lagartijas con las rodillas en el piso; mantén la espalda recta",
  "Lower toward a chair, tap and stand; or bodyweight squats to 90 degrees": "Baja hacia una silla, toca y levántate; o sentadillas a 90 grados",
  "Forearm or high plank with knees on the ground; engage core": "Plancha de antebrazos o alta con rodillas en el piso; activa el abdomen",
  "Step forward into a lunge, or do stationary lunges; alternate legs": "Da un paso adelante en desplante, o haz desplantes estacionarios; alterna piernas",
  "Take a breather": "Toma un respiro",
  "Lower your body until your chest nearly touches the floor, then push back up": "Baja el cuerpo hasta que el pecho casi toque el piso, luego sube",
  "Lower your body as if sitting in a chair, keeping your knees behind your toes": "Baja como si te sentaras en una silla, manteniendo las rodillas detrás de los dedos",
  "Hold your body in a straight line, engaging your core": "Mantén el cuerpo en línea recta, activando el abdomen",
  "Step forward into a lunge, alternating legs": "Da un paso adelante en desplante, alternando piernas",
  "Hands close (diamond) or deficit push-ups for extra range": "Manos juntas (diamante) o lagartijas con déficit para más rango",
  "Squat down then explode up into a jump; land softly": "Agáchate y explota hacia arriba en un salto; aterriza suavemente",
  "High plank; tap opposite shoulder while keeping hips steady": "Plancha alta; toca el hombro opuesto manteniendo las caderas estables",
  "Alternating jump lunges; stay low and switch legs in the air": "Desplantes con salto alternados; mantente bajo y cambia piernas en el aire",
  "Lift your shoulders off the ground; support your head lightly with your hands": "Levanta los hombros del piso; apoya la cabeza ligeramente con las manos",
  "Forearm or high plank with knees on the ground; keep your back flat": "Plancha de antebrazos o alta con rodillas en el piso; mantén la espalda plana",
  "Alternate elbow to knee in a slow, controlled cycling motion": "Alterna codo a rodilla en un movimiento de pedaleo lento y controlado",
  "Sit with knees bent, feet on floor; rotate your torso side to side": "Siéntate con rodillas dobladas, pies en el piso; gira el torso de lado a lado",
  "Lift your shoulders off the ground, engaging your abs": "Levanta los hombros del piso, activando los abdominales",
  "Hold plank position, keeping your body straight": "Mantén la posición de plancha, con el cuerpo recto",
  "Alternate bringing opposite elbow to knee in a cycling motion": "Alterna llevando el codo opuesto a la rodilla en movimiento de pedaleo",
  "Sit and rotate your torso side to side": "Siéntate y gira el torso de lado a lado",
  "Quick rest": "Descanso rápido",
  "Lie on your back; raise and lower straight legs without letting them touch the floor": "Acuéstate boca arriba; sube y baja las piernas rectas sin tocar el piso",
  "High plank; reach one arm forward, then the other; keep hips still": "Plancha alta; extiende un brazo al frente, luego el otro; mantén las caderas quietas",
  "Fast, controlled cycling; extend the non-working leg fully": "Pedaleo rápido y controlado; extiende completamente la pierna que no trabaja",
  "Feet off the floor; rotate torso and touch floor side to side": "Pies fuera del piso; gira el torso y toca el piso de lado a lado",
  "Easy 5-minute warmup walk to prepare your body": "Caminata fácil de 5 minutos para preparar tu cuerpo",
  "Run at easy pace - you should be able to hold a conversation": "Corre a paso fácil - deberías poder mantener una conversación",
  "Recovery walk": "Caminata de recuperación",
  "Run at easy pace": "Corre a paso fácil",
  "Easy 5-minute cooldown walk": "Caminata fácil de 5 minutos para enfriar",
  "Easy 5-minute warmup walk": "Caminata fácil de 5 minutos para calentar",
  "Run continuously at easy pace. You should be able to speak in full sentences.": "Corre continuamente a paso fácil. Deberías poder hablar en oraciones completas.",
  "Run at easy, conversational pace. Focus on maintaining steady rhythm. If running over 90 minutes, consider hydration and fuel.": "Corre a paso fácil y conversacional. Concéntrate en mantener un ritmo constante. Si corres más de 90 minutos, considera hidratación y combustible.",
  "Walk at 3.0-3.5 mph for 5 minutes": "Camina a 3.0-3.5 mph por 5 minutos",
  "Run at 6.5-7.5 mph (comfortably hard pace)": "Corre a 6.5-7.5 mph (ritmo cómodamente fuerte)",
  "Walk at 3.0-3.5 mph to recover": "Camina a 3.0-3.5 mph para recuperarte",
  "Run at 6.5-7.5 mph": "Corre a 6.5-7.5 mph",
  "Run at 5.0-6.0 mph. Maintain steady, comfortable pace.": "Corre a 5.0-6.0 mph. Mantén un ritmo constante y cómodo.",
  "Run at easy pace for 10 minutes": "Corre a paso fácil por 10 minutos",
  "Run at tempo pace (comfortably hard - can say a few words) for 30 minutes": "Corre a ritmo tempo (cómodamente fuerte - puedes decir pocas palabras) por 30 minutos",
}

const workoutNameTranslations = {
  "Quick Cardio Blast": "Cardio Rápido",
  "Full Body Strength": "Fuerza de Cuerpo Completo",
  "Core Crusher": "Destructor de Abdomen",
  "5K Training Run": "Entrenamiento de 5K",
  "5K Continuous Run": "Carrera Continua de 5K",
  "Half Marathon Long Run": "Carrera Larga de Medio Maratón",
  "Treadmill Interval": "Intervalos en Caminadora",
  "Treadmill Steady State": "Caminadora Ritmo Constante",
  "Half Marathon Tempo Run": "Carrera Tempo de Medio Maratón",
}

function WorkoutDetail() {
  const { id } = useParams()
  const [search] = useSearchParams()
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('workoutLanguage')
    return saved || 'en'
  })
  const [useJillianTimer, setUseJillianTimer] = useState(() => {
    const saved = localStorage.getItem('useJillianTimer')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('workoutLanguage', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('useJillianTimer', JSON.stringify(useJillianTimer))
  }, [useJillianTimer])

  const isEs = language === 'es'
  const tName = useCallback((name) => isEs ? (exerciseTranslations[name] || name) : name, [isEs])
  const tInstructions = useCallback((text) => isEs ? (instructionTranslations[text] || text) : text, [isEs])
  const tWorkout = useCallback((name) => isEs ? (workoutNameTranslations[name] || name) : name, [isEs])

  useEffect(() => {
    const foundWorkout = workouts.find(w => w.id === parseInt(id))
    setWorkout(foundWorkout)
    setLoading(false)
  }, [id])

  const resolvedWorkout = useMemo(() => {
    if (!workout) return null
    if (workout.configurable && workout.exercisesByIntensity) {
      const duration = parseInt(search.get('duration'), 10) || workout.baseDuration || workout.duration
      const intensity = search.get('intensity') || workout.difficulty?.toLowerCase() || 'intermediate'
      const exercises = buildConfigurableExercises(workout, duration, intensity)
      if (exercises && exercises.length > 0) {
        return { ...workout, exercises, duration }
      }
    }
    return workout
  }, [workout, search])

  const displayWorkout = resolvedWorkout || workout

  useEffect(() => {
    if (displayWorkout && displayWorkout.exercises && displayWorkout.exercises.length > 0) {
      setTimeRemaining(displayWorkout.exercises[0].duration)
    }
  }, [displayWorkout])

  if (loading) {
    return (
      <div className="workout-detail">
        <div className="workout-detail-container">
          <p>{isEs ? 'Cargando entrenamiento...' : 'Loading workout...'}</p>
        </div>
      </div>
    )
  }

  if (!workout || !displayWorkout || !displayWorkout.exercises || displayWorkout.exercises.length === 0) {
    return (
      <div className="workout-detail">
        <div className="workout-detail-container">
          <p>{isEs ? 'Entrenamiento no encontrado' : 'Workout not found'}</p>
          <Link to="/workouts">{isEs ? '← Volver a Entrenamientos' : '← Back to Workouts'}</Link>
        </div>
      </div>
    )
  }

  const exercises = displayWorkout.exercises
  const currentExercise = exercises[currentExerciseIndex]
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100

  const handleNext = () => {
    setIsActive(false)
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setTimeRemaining(exercises[currentExerciseIndex - 1].duration)
      setIsActive(false)
    }
  }

  const handleComplete = () => {
    alert(isEs ? '¡Entrenamiento completado! ¡Buen trabajo!' : 'Workout completed! Great job!')
  }

  return (
    <div className="workout-detail">
      <div className="workout-detail-container">
        <div className="workout-detail-header">
          <Link to="/workouts" className="back-link">{isEs ? '← Volver a Entrenamientos' : '← Back to Workouts'}</Link>
          <h1>{tWorkout(displayWorkout.name)}</h1>
          <div className="workout-meta">
            <span className="workout-duration-badge">{displayWorkout.duration} min</span>
            <span className={`difficulty-badge difficulty-${displayWorkout.configurable ? (search.get('intensity') || 'intermediate') : (displayWorkout.difficulty || 'intermediate').toLowerCase()}`}>
              {(displayWorkout.configurable ? (search.get('intensity') || 'intermediate') : (displayWorkout.difficulty || 'intermediate').toLowerCase()).replace(/^\w/, c => c.toUpperCase())}
            </span>
            {displayWorkout.type && (
              <span className="workout-type-badge">{displayWorkout.type}</span>
            )}
          </div>
          <div className="timer-toggle">
            <label className="timer-toggle-label">
              <input
                type="checkbox"
                checked={useJillianTimer}
                onChange={(e) => setUseJillianTimer(e.target.checked)}
              />
              <span>{isEs ? 'Usar Temporizador de Jillian' : "Use Jillian's Timer Style"}</span>
            </label>
          </div>
          <div className="timer-toggle">
            <button
              className={`btn-language ${isEs ? 'active' : ''}`}
              onClick={() => setLanguage(isEs ? 'en' : 'es')}
            >
              {isEs ? '🇺🇸 English' : '🇲🇽 Español'}
            </button>
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
            {isEs ? 'Ejercicio' : 'Exercise'} {currentExerciseIndex + 1} {isEs ? 'de' : 'of'} {exercises.length}
          </p>
        </div>

        <div className="exercise-display">
          <div className="exercise-card">
            <h2>{tName(currentExercise.name)}</h2>
            <p className="exercise-instructions">{tInstructions(currentExercise.instructions)}</p>
            
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
                {isActive ? (isEs ? 'Pausar' : 'Pause') : (isEs ? 'Iniciar' : 'Start')}
              </button>
              {currentExerciseIndex > 0 && (
                <button 
                  onClick={handlePrevious}
                  className="btn btn-secondary"
                >
                  {isEs ? 'Anterior' : 'Previous'}
                </button>
              )}
              {currentExerciseIndex < exercises.length - 1 ? (
                <button 
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  {isEs ? 'Siguiente Ejercicio' : 'Next Exercise'}
                </button>
              ) : (
                <button 
                  onClick={handleComplete}
                  className="btn btn-success"
                >
                  {isEs ? 'Completar Entrenamiento' : 'Complete Workout'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="exercise-list">
          <h3>{isEs ? 'Lista de Ejercicios' : 'Exercise List'}</h3>
          <ul>
            {exercises.map((exercise, index) => (
              <li 
                key={index}
                className={index === currentExerciseIndex ? 'active' : ''}
                onClick={() => {
                  setCurrentExerciseIndex(index)
                  setTimeRemaining(exercise.duration)
                  setIsActive(false)
                }}
              >
                <span className="exercise-list-name">{tName(exercise.name)}</span>
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
