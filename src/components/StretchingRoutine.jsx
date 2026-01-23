import './StretchingRoutine.css'

function StretchingRoutine({ program }) {
  if (!program.stretchingRoutine) return null

  const routine = program.stretchingRoutine

  return (
    <div className="stretching-routine">
      <h2>Stretching Routines</h2>
      
      {routine.preRun && (
        <div className="stretch-section">
          <h3>Pre-Run Warm-up</h3>
          <p className="section-description">Do these before every run to prepare your body</p>
          <div className="stretch-list">
            {routine.preRun.map((stretch, idx) => (
              <div key={idx} className="stretch-item">
                <div className="stretch-header">
                  <span className="stretch-name">{stretch.name}</span>
                  <span className="stretch-duration">{stretch.duration}s</span>
                </div>
                <p className="stretch-description">{stretch.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {routine.postRun && (
        <div className="stretch-section">
          <h3>Post-Run Stretching</h3>
          <p className="section-description">Essential stretches after every run for recovery</p>
          
          {routine.postRun.immediate && (
            <div className="immediate-stretches">
              <h4>Immediate (Right After Run)</h4>
              <div className="stretch-list">
                {routine.postRun.immediate.map((stretch, idx) => (
                  <div key={idx} className="stretch-item">
                    <div className="stretch-header">
                      <span className="stretch-name">{stretch.name}</span>
                      <span className="stretch-duration">{stretch.duration}s</span>
                    </div>
                    <p className="stretch-description">{stretch.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {routine.postRun.full && (
            <div className="full-stretches">
              <h4>Full Routine (Within 30 Minutes)</h4>
              <div className="stretch-list">
                {routine.postRun.full.map((stretch, idx) => (
                  <div key={idx} className="stretch-item">
                    <div className="stretch-header">
                      <span className="stretch-name">{stretch.name}</span>
                      <span className="stretch-duration">{stretch.duration}s</span>
                    </div>
                    <p className="stretch-description">{stretch.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {Array.isArray(routine.postRun) && (
            <div className="stretch-list">
              {routine.postRun.map((stretch, idx) => (
                <div key={idx} className="stretch-item">
                  <div className="stretch-header">
                    <span className="stretch-name">{stretch.name}</span>
                    <span className="stretch-duration">{stretch.duration}s</span>
                  </div>
                  <p className="stretch-description">{stretch.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StretchingRoutine
