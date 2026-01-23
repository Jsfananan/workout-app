import { useEffect } from 'react'
import './Timer.css'

function Timer({ duration, isActive, onComplete, timeRemaining, setTimeRemaining }) {
  useEffect(() => {
    let interval = null
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            if (onComplete) {
              setTimeout(onComplete, 500)
            }
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (!isActive && timeRemaining !== duration) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, timeRemaining, duration, setTimeRemaining, onComplete])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (timeRemaining / duration) * 100

  return (
    <div className="timer">
      <div className="timer-circle">
        <svg className="timer-svg" viewBox="0 0 100 100">
          <circle
            className="timer-circle-bg"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className="timer-circle-progress"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDasharray: `${2 * Math.PI * 45}`,
              strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
            }}
          />
        </svg>
        <div className="timer-text">
          {formatTime(timeRemaining)}
        </div>
      </div>
    </div>
  )
}

export default Timer
