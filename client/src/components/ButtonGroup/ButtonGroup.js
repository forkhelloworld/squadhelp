import React, { useState } from 'react'
import styles from './ButtonGroup.module.scss'

const options = [
  {
    title: 'Yes',
    description: 'But minor variations are allowed',
    recommended: true
  },
  {
    title: 'Yes',
    description: 'The Domain should exactly match the name',
    recommended: false
  },
  {
    title: 'No',
    description: 'I am only looking for a name, not a Domain',
    recommended: false
  }
]

const ButtonGroup = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const buttons = options.map((option, index) => (
    <label
      key={index}
      className={`${styles.option} ${
        selectedIndex === index ? styles.selected : ''
      }`}
    >
      <input
        type='radio'
        name='option'
        checked={selectedIndex === index}
        onChange={() => setSelectedIndex(index)}
        className={styles.radio}
      />
      <div className={styles.card}>
        {option.recommended && (
          <span className={styles.recommended}>Recommended</span>
        )}
        <h3>{option.title}</h3>
        <p>{option.description}</p>
      </div>
    </label>
  ))

  return <div className={styles.container}>{buttons}</div>
}

export default ButtonGroup
