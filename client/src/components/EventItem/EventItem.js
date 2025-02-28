import React from 'react'
import moment from 'moment'

const TimerItem = ({ timer, removeTimer }) => {
  const 
  getTimeRemaining = eventTime => {
    const now = moment()
    const end = moment(eventTime)
    if (end.isBefore(now)) return '0m 0s'

    const duration = moment.duration(end.diff(now))
    return `${Math.floor(duration.asMinutes())}m ${duration.seconds()}s`
  }

  const calculateProgress = (createdTime, eventTime) => {
    const currentTime = moment().valueOf() + 1000
    const totalDuration = eventTime - createdTime
    const elapsed = currentTime - createdTime

    let progress = (elapsed / totalDuration) * 100
    return Math.min(Math.max(progress, 0), 100)
  }

  const timeRemaining = getTimeRemaining(timer.eventTime)
  const progress = calculateProgress(timer.id, timer.eventTime)

  return (
    <li className='timer-item'>
      <span className='timer-text'>
        {timer.name} - {timeRemaining}
      </span>
      <div className='progress-bar'>
        <div className='progress' style={{ width: `${progress}%` }}></div>
      </div>
      <button onClick={() => removeTimer(timer.id)} className='remove-button'>
        Видалити
      </button>
    </li>
  )
}

export default TimerItem
