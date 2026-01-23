import './RunningTips.css'

function RunningTips({ program }) {
  if (!program.runningTips) return null

  const tips = program.runningTips

  return (
    <div className="running-tips">
      <h2>Running Tips & Techniques</h2>
      
      <div className="tips-grid">
        <div className="tip-card">
          <h3>🏃 Stride</h3>
          <p>{tips.stride}</p>
        </div>
        
        <div className="tip-card">
          <h3>💨 Breathing</h3>
          <p>{tips.breathing}</p>
        </div>
        
        <div className="tip-card">
          <h3>📐 Posture</h3>
          <p>{tips.posture}</p>
        </div>
        
        <div className="tip-card">
          <h3>⏱️ Pacing</h3>
          <p>{tips.pacing}</p>
        </div>
        
        {tips.hydration && (
          <div className="tip-card">
            <h3>💧 Hydration</h3>
            <p>{tips.hydration}</p>
          </div>
        )}
        
        {tips.nutrition && (
          <div className="tip-card">
            <h3>🍎 Nutrition</h3>
            <p>{tips.nutrition}</p>
          </div>
        )}
        
        <div className="tip-card">
          <h3>😴 Rest & Recovery</h3>
          <p>{tips.rest}</p>
        </div>
      </div>
    </div>
  )
}

export default RunningTips
