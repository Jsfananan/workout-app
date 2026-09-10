import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getHistory, RATING_LABELS } from '../utils/storage'
import './History.css'

const formatDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

function History() {
  const history = useMemo(getHistory, [])

  const byDate = useMemo(() => {
    const groups = new Map()
    history.forEach(entry => {
      if (!groups.has(entry.date)) groups.set(entry.date, [])
      groups.get(entry.date).push(entry)
    })
    return [...groups.entries()]
  }, [history])

  return (
    <div className="page">
      <div className="page-container page-container--narrow">
        <div className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>History</h1>
          <p className="page-subtitle">{history.length} {history.length === 1 ? 'workout' : 'workouts'} logged</p>
        </div>

        {history.length === 0 && (
          <div className="history-empty">
            <p>Nothing logged yet. Finish a workout and it shows up here.</p>
            <Link to="/schedule" className="btn btn-primary">Go to My Week</Link>
          </div>
        )}

        {byDate.map(([date, entries]) => (
          <section key={date} className="history-day">
            <h2>{formatDate(date)}</h2>
            {entries.map((entry, i) => (
              <details key={i} className="history-entry">
                <summary>
                  <span className="history-name">{entry.name}</span>
                  <span className="history-meta">
                    {entry.exercises.filter(e => !e.skipped).length} done
                    {entry.sets ? ` · ${entry.sets} sets` : ''}
                    {typeof entry.averageRating === 'number' ? ` · effort ${entry.averageRating}/5` : ''}
                  </span>
                </summary>
                <ul>
                  {entry.exercises.map((e, j) => (
                    <li key={j} className={e.skipped ? 'skipped' : ''}>
                      <span>{e.name}</span>
                      <span className="history-rating">
                        {e.skipped ? 'skipped' : typeof e.rating === 'number' ? `${e.rating} · ${RATING_LABELS[e.rating]}` : '—'}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

export default History
