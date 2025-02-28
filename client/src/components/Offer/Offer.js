import React from 'react'
import classNames from 'classnames'
import constants from '../../constants'
import styles from '../../pages/ModerationPage/ModerationPage.module.scss'

const status = {
  rejected: (
    <i className={classNames('fas fa-times-circle reject', styles.reject)} />
  ),
  won: (
    <i className={classNames('fas fa-check-circle resolve', styles.resolve)} />
  )
}

const Offer = props => {
  const { offer } = props
  const acceptOffer = () => props.acceptOffer(offer)
  const rejectOffer = () => props.rejectOffer(offer)
  
  return (
    <li className={styles['offer-item']}>
      <div className={styles['offer-header']}>
        <div className={styles['offer-info']}>
          <p>Offer ID: {offer.id}</p>

          <p>Contest ID: {offer.contestId}</p>
        </div>
      </div>
      <div className={styles['offer-content']}>
        {offer.text || (
          <div className={styles['text-image']}>
            <img
              src={`${constants.publicURL}${offer.fileName}`}
              alt='Offer Image'
            />
            {status[offer.status]}
          </div>
        )}
      </div>
      {offer.status === 'review' && (
        <div className={styles['offer-actions']}>
          <button className={styles['accept']} onClick={acceptOffer}>Accept</button>
          <button className={styles['reject']} onClick={rejectOffer}>Reject</button>
        </div>
      )}
    </li>
  )
}

export default Offer
