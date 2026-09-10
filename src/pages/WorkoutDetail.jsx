import { useParams, Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { getWorkoutById, resolveWorkout, DEFAULT_SETS } from '../data/workouts'
import { exerciseTranslations, instructionTranslations, workoutNameTranslations } from '../data/translations'
import { useSettings, useStrings, RATING_LABELS_ES } from '../context/SettingsContext'
import {
  RATING_LABELS, toISODate,
  getGeneratedWorkout, getLastRating, recordRating, addHistoryEntry,
  getActiveSession, saveActiveSession, clearActiveSession, saveLastConfig
} from '../utils/storage'
import './WorkoutDetail.css'

// Phone-down workout screen.
//
// One exercise fills the screen. Read it, put the phone down, do the sets,
// pick the phone up, tap Done, tap how hard it was, read the next one. There
// is no timer and nothing moves on its own. Progress is saved after every tap
// so closing the phone mid-workout loses nothing.

const PHASE = { exercise: 'exercise', rate: 'rate', done: 'done' }

function loadWorkout(id, search) {
  if (id === 'generated') return getGeneratedWorkout()
  const base = getWorkoutById(parseInt(id, 10))
  if (!base) return null
  return resolveWorkout(base, {
    sets: parseInt(search.get('sets'), 10) || DEFAULT_SETS,
    intensity: search.get('intensity') || undefined
  })
}

function WorkoutDetail() {
  const { id } = useParams()
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { language, setLanguage } = useSettings()
  const t = useStrings()
  const isEs = language === 'es'

  const workout = useMemo(() => loadWorkout(id, search), [id, search])
  const sessionKey = workout ? `${workout.id}|${workout.sets ?? ''}|${workout.intensity}` : null

  const freshSession = () => ({
    key: sessionKey,
    workoutName: workout?.name,
    path: `${location.pathname}${location.search}`,
    index: 0,
    phase: PHASE.exercise,
    results: [],
    startedAt: new Date().toISOString()
  })

  // Restore an in-progress session for this exact workout; otherwise start fresh.
  const [session, setSession] = useState(() => {
    const active = getActiveSession()
    if (active && active.key === sessionKey) return active
    return freshSession()
  })
  const [resumed] = useState(() => getActiveSession()?.key === sessionKey && (getActiveSession()?.index > 0))
  const [otherSession, setOtherSession] = useState(() => {
    const active = getActiveSession()
    return active && active.key !== sessionKey && active.phase !== PHASE.done ? active : null
  })

  useEffect(() => {
    if (!sessionKey) return
    if (session.phase === PHASE.done) return
    if (otherSession) return
    saveActiveSession(session)
  }, [session, sessionKey, otherSession])

  useEffect(() => {
    if (workout && workout.id !== 'generated') {
      saveLastConfig(workout.id, { sets: workout.sets, intensity: workout.intensity })
    }
  }, [workout])

  const tName = useCallback((name) => isEs ? (exerciseTranslations[name] || name) : name, [isEs])
  const tInstructions = useCallback((text) => isEs ? (instructionTranslations[text] || text) : text, [isEs])
  const tWorkout = useCallback((name) => isEs ? (workoutNameTranslations[name] || name) : name, [isEs])
  const ratingLabels = isEs ? RATING_LABELS_ES : RATING_LABELS

  if (!workout || !workout.exercises?.length) {
    return (
      <div className="page">
        <div className="page-container page-container--narrow">
          <p>{t.notFound}</p>
          <Link to="/workouts" className="back-link">{t.backWorkouts}</Link>
        </div>
      </div>
    )
  }

  const exercises = workout.exercises
  const isSets = workout.mode === 'sets'
  const { index, phase, results } = session
  const current = exercises[index]
  const next = exercises[index + 1]
  const lastRating = isSets && current ? getLastRating(current.name) : null

  const advance = (result) => {
    const nextResults = [...results, result]
    const last = index >= exercises.length - 1
    if (last) {
      finish(nextResults)
    } else {
      setSession(s => ({ ...s, index: index + 1, phase: PHASE.exercise, results: nextResults }))
    }
  }

  const finish = (finalResults) => {
    const rated = finalResults.filter(r => typeof r.rating === 'number')
    const avg = rated.length ? rated.reduce((s, r) => s + r.rating, 0) / rated.length : null
    addHistoryEntry({
      date: toISODate(),
      completedAt: new Date().toISOString(),
      workoutId: workout.id,
      name: workout.name,
      type: workout.type,
      intensity: workout.intensity,
      sets: workout.sets ?? null,
      minutes: workout.minutes,
      exercises: finalResults,
      averageRating: avg === null ? null : Math.round(avg * 10) / 10
    })
    clearActiveSession()
    setSession(s => ({ ...s, phase: PHASE.done, results: finalResults, averageRating: avg }))
  }

  const handleDone = () => {
    if (isSets) {
      setSession(s => ({ ...s, phase: PHASE.rate }))
    } else {
      advance({ name: current.name, rating: null, skipped: false })
    }
  }

  const handleSkip = () => advance({ name: current.name, rating: null, skipped: true })

  const handleRate = (rating) => {
    if (typeof rating === 'number') recordRating(current.name, rating)
    advance({ name: current.name, rating: typeof rating === 'number' ? rating : null, skipped: false })
  }

  const restart = () => {
    clearActiveSession()
    setSession(freshSession())
  }

  const setsLine = isSets
    ? `${t.sets(current?.sets ?? workout.sets)} · ${t.perSet(current?.seconds ?? 45)}`
    : t.minutes(Math.max(1, Math.round((current?.duration ?? 60) / 60)))

  // ---- Unfinished-other-workout banner ------------------------------------
  const banner = otherSession && (
    <div className="session-banner">
      <p>{t.unfinished}: <strong>{tWorkout(otherSession.workoutName || '')}</strong></p>
      <div className="session-banner-actions">
        <button className="btn btn-primary" onClick={() => navigate(otherSession.path || '/')}>{t.resume}</button>
        <button className="btn btn-quiet" onClick={() => { clearActiveSession(); setOtherSession(null) }}>{t.discard}</button>
      </div>
    </div>
  )

  // ---- Done screen --------------------------------------------------------
  if (phase === PHASE.done) {
    const avg = session.averageRating
    const nudge = avg === null || avg === undefined ? null : avg <= 1.5 ? t.nudgeEasy : avg >= 4.2 ? t.nudgeHard : t.nudgeGood
    return (
      <div className="page session">
        <div className="page-container page-container--narrow">
          <div className="session-done">
            <div className="session-done-mark">✓</div>
            <h1>{t.finished}</h1>
            <p className="page-subtitle">{tWorkout(workout.name)} · {t.finishedSub(results.filter(r => !r.skipped).length, workout.minutes)}</p>
            {avg !== null && avg !== undefined && (
              <p className="session-avg">{t.avgEffort}: <strong>{avg.toFixed(1)} / 5</strong></p>
            )}
            {nudge && <p className="session-nudge">{nudge}</p>}

            <ul className="session-results">
              {results.map((r, i) => (
                <li key={i} className={r.skipped ? 'skipped' : ''}>
                  <span>{tName(r.name)}</span>
                  <span className="session-result-rating">
                    {r.skipped ? t.skipped : typeof r.rating === 'number' ? `${r.rating} · ${ratingLabels[r.rating]}` : '—'}
                  </span>
                </li>
              ))}
            </ul>

            <div className="session-done-actions">
              <Link to="/schedule" className="btn btn-primary">{t.backToWeek}</Link>
              <button className="btn btn-secondary" onClick={restart}>{t.again}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---- Rating screen ------------------------------------------------------
  if (phase === PHASE.rate) {
    return (
      <div className="page session">
        <div className="page-container page-container--narrow">
          <div className="session-rate">
            <p className="session-progress-text">{tName(current.name)}</p>
            <h1>{t.howHard}</h1>
            <div className="rating-grid">
              {ratingLabels.map((label, value) => (
                <button key={value} type="button" className={`rating-btn rating-${value}`} onClick={() => handleRate(value)}>
                  <span className="rating-value">{value}</span>
                  <span className="rating-label">{label}</span>
                </button>
              ))}
            </div>
            <button className="btn btn-quiet" onClick={() => handleRate(null)}>{t.skipRating}</button>
          </div>
        </div>
      </div>
    )
  }

  // ---- Exercise screen ----------------------------------------------------
  const progress = (index / exercises.length) * 100
  return (
    <div className="page session">
      <div className="page-container page-container--narrow">
        <div className="session-top">
          <Link to="/schedule" className="back-link">{t.backHome}</Link>
          <button className="btn-language" onClick={() => setLanguage(isEs ? 'en' : 'es')}>{t.language}</button>
        </div>

        {banner}

        <div className="session-progress">
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <p className="session-progress-text">
            {tWorkout(workout.name)} · {isSets ? t.exerciseOf(index + 1, exercises.length) : t.stepOf(index + 1, exercises.length)}
            {resumed && index > 0 && <span className="session-resumed"> · {t.resumeTitle}</span>}
          </p>
        </div>

        <div className={`exercise-card exercise-card--${current.slot || 'main'}`}>
          {current.slot && current.slot !== 'main' && (
            <span className="exercise-slot">{current.slot}</span>
          )}
          <h1 className="exercise-name">{tName(current.name)}</h1>
          <p className="exercise-sets">{setsLine}</p>
          <p className="exercise-instructions">{tInstructions(current.instructions)}</p>
          {lastRating && (
            <p className="exercise-last">
              {t.lastTime}: <strong>{lastRating.rating} · {ratingLabels[lastRating.rating]}</strong>
            </p>
          )}
        </div>

        <button className="btn btn-primary btn-done" onClick={handleDone}>
          {t.done} ✓
        </button>

        <div className="session-footer">
          {next
            ? <p className="session-next">{t.nextUp}: <strong>{tName(next.name)}</strong></p>
            : <p className="session-next">&nbsp;</p>}
          <button className="btn btn-quiet" onClick={handleSkip}>{t.skip}</button>
        </div>
      </div>
    </div>
  )
}

export default WorkoutDetail
