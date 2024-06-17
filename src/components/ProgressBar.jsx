import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ timeLeft, totalTime }) => {
  const progress = (timeLeft / totalTime) * 100

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  )
}

export default ProgressBar
