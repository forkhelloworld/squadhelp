import React from 'react'
import EventItem from '../EventItem/EventItem'

const EventsList = ({ timers, removeTimer }) => {
  return (
    <ul className='timer-list'>
      {timers.map(timer => (
        <EventItem key={timer.id} timer={timer} removeTimer={removeTimer} />
      ))}
    </ul>
  )
}

export default EventsList
