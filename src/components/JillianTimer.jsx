import { useEffect, useState } from 'react'
import './JillianTimer.css'

function JillianTimer({ duration, isActive, onComplete, timeRemaining, setTimeRemaining }) {
  const [showMotivation, setShowMotivation] = useState(false)

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

  // Show motivational messages at certain intervals
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      if (timeRemaining === 10 || timeRemaining === 5 || timeRemaining === 3) {
        setShowMotivation(true)
        setTimeout(() => setShowMotivation(false), 2000)
      }
    }
  }, [timeRemaining, isActive])

  const getMotivationalMessage = () => {
    if (timeRemaining === 10) return "You've got this!"
    if (timeRemaining === 5) return "Almost there!"
    if (timeRemaining === 3) return "Push through!"
    return ""
  }

  const formatTime = (seconds) => {
    // Jillian style: Show just seconds for short durations, MM:SS for longer
    if (seconds < 60) {
      return seconds.toString()
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (timeRemaining / duration) * 100
  const isLowTime = timeRemaining <= 10 && timeRemaining > 0

  return (
    <div className="jillian-timer">
      <div className={`jillian-timer-display ${isLowTime ? 'low-time' : ''} ${isActive ? 'active' : ''}`}>
        <div className="jillian-timer-time">
          {formatTime(timeRemaining)}
        </div>
        {timeRemaining < 60 && (
          <div className="jillian-timer-label">seconds</div>
        )}
        {showMotivation && (
          <div className="jillian-motivation">
            {getMotivationalMessage()}
          </div>
        )}
      </div>
      
      <div className="jillian-progress-bar">
        <div 
          className="jillian-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default JillianTimer
