import React from 'react'
import EventItem from '../EventItem/EventItem'

const EventsList = ({ timers, removeTimer }) => {
  const sortedTimers = [...timers].sort((a, b) => a.eventTime - b.eventTime)
  return (
    <ul className='timer-list'>
      {sortedTimers.map(timer => (
        <EventItem
          key={timer.id}
          timer={timer}
          removeTimer={removeTimer}
        />
      ))}
    </ul>
  )
}

export default EventsList
