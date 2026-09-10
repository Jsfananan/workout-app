/* eslint-disable react-refresh/only-export-components -- context module exports hooks and strings alongside the provider */
import { createContext, useContext, useEffect, useState } from 'react'

// App-wide preferences. Only language for now; persisted in localStorage.
const SettingsContext = createContext({ language: 'en', setLanguage: () => {} })

const LANGUAGE_KEY = 'workoutLanguage'

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_KEY, language)
    } catch {
      // ignore
    }
  }, [language])

  return (
    <SettingsContext.Provider value={{ language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)

// Tiny string table for UI chrome. Exercise content is translated separately
// in data/translations.js.
const STRINGS = {
  en: {
    backHome: '← Home',
    backWorkouts: '← Workouts',
    exerciseOf: (i, n) => `Exercise ${i} of ${n}`,
    stepOf: (i, n) => `Step ${i} of ${n}`,
    sets: (n) => `${n} sets`,
    perSet: (s) => `~${s} sec per set`,
    minutes: (m) => `${m} min`,
    nextUp: 'Next up',
    lastTime: 'Last time',
    done: 'Done',
    skip: 'Skip',
    howHard: 'How hard was that?',
    skipRating: 'Skip rating',
    finished: 'Workout complete',
    finishedSub: (n, m) => `${n} exercises · about ${m} minutes`,
    avgEffort: 'Average effort',
    nudgeEasy: 'That felt easy overall — try the next intensity up next time.',
    nudgeHard: 'That was a tough one — a lower intensity next time is fine.',
    nudgeGood: 'Effort landed in the sweet spot. Keep this level.',
    backToWeek: 'Back to My Week',
    again: 'Do it again',
    resumeTitle: 'Picking up where you left off',
    unfinished: 'You have an unfinished workout',
    resume: 'Resume',
    discard: 'Discard',
    notFound: 'Workout not found',
    language: '🇲🇽 Español',
    skipped: 'Skipped'
  },
  es: {
    backHome: '← Inicio',
    backWorkouts: '← Entrenamientos',
    exerciseOf: (i, n) => `Ejercicio ${i} de ${n}`,
    stepOf: (i, n) => `Paso ${i} de ${n}`,
    sets: (n) => `${n} series`,
    perSet: (s) => `~${s} seg por serie`,
    minutes: (m) => `${m} min`,
    nextUp: 'Siguiente',
    lastTime: 'La última vez',
    done: 'Listo',
    skip: 'Saltar',
    howHard: '¿Qué tan difícil fue?',
    skipRating: 'Sin calificar',
    finished: 'Entrenamiento completado',
    finishedSub: (n, m) => `${n} ejercicios · unos ${m} minutos`,
    avgEffort: 'Esfuerzo promedio',
    nudgeEasy: 'Se sintió fácil — prueba la siguiente intensidad la próxima vez.',
    nudgeHard: 'Estuvo duro — está bien bajar la intensidad la próxima vez.',
    nudgeGood: 'El esfuerzo fue el adecuado. Mantén este nivel.',
    backToWeek: 'Volver a Mi Semana',
    again: 'Repetir',
    resumeTitle: 'Continuando donde lo dejaste',
    unfinished: 'Tienes un entrenamiento sin terminar',
    resume: 'Continuar',
    discard: 'Descartar',
    notFound: 'Entrenamiento no encontrado',
    language: '🇺🇸 English',
    skipped: 'Saltado'
  }
}

export const RATING_LABELS_ES = ['Muy fácil', 'Fácil', 'Moderado', 'Difícil', 'Muy difícil', 'Máximo']

export const useStrings = () => {
  const { language } = useSettings()
  return STRINGS[language] || STRINGS.en
}
