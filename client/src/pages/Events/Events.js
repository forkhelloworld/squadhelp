import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import EventForm from '../../components/EventForm/EventForm'
import EventsList from '../../components/EventsList/EventsList'
import './Events.css'

const TimerApp = () => {
  const [timers, setTimers] = useState(() => {
    const storedTimers = localStorage.getItem('timers')
    return storedTimers ? JSON.parse(storedTimers) : []
  })
  const [expiredCount, setExpiredCount] = useState(0)

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers))
  }, [timers])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        let count = 0
        let newlyExpired = 0
        const updatedTimers = prevTimers.map(timer => {
          const now = moment().valueOf()
          if (timer.eventTime <= now && !timer.notified) {
            newlyExpired++
            return { ...timer, notified: true }
          }
          if (timer.eventTime <= now) count++
          return timer
        })
        if (newlyExpired > 0) {
          toast.error(`${newlyExpired} подія завершена!`)
        }
        setExpiredCount(count)
        return updatedTimers
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const addTimer = (name, eventTime) => {
    setTimers([
      ...timers,
      {
        id: Date.now(),
        name,
        eventTime,
        notified: false
      }
    ])
  }

  const removeTimer = id => {
    setTimers(timers.filter(timer => timer.id !== id))
  }

  return (
    <div className='timer-app'>
      <h2 className='header'>
        Актуальні події
        {expiredCount > 0 && <span className='badge'>({expiredCount})</span>}
      </h2>

      <EventForm addTimer={addTimer} />
      <EventsList timers={timers} removeTimer={removeTimer} />
    </div>
  )
}

export default TimerApp
