import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { getOffers, setOfferStatus } from '../../actions/actionCreator'
import Offer from '../../components/Offer/Offer'
import styles from './ModerationPage.module.scss'

const ModerationPage = props => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    const offset = page === 1 ? 0 : page * 8
    props.getOffers({ offset })
  }, [page])

  const handleOfferStatus = (offer, status) => {
    const actionText = status === 'pending' ? 'accept' : 'reject'
    confirmAlert({
      title: 'Confirmation',
      message: `Are you sure you want to ${actionText} this offer?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus({ offerId: offer.id, command: status })
        },
        { label: 'No' }
      ]
    })
  }

  const nextPage = () => setPage(prev => prev + 1)
  const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1))
  return (
    <>
      {props.offers.length ? (
        <>
          <ul className={styles['offer-list']}>
            {props.offers.map(offer => (
              <Offer
                key={offer.id}
                offer={offer}
                acceptOffer={() => handleOfferStatus(offer, 'pending')}
                rejectOffer={() => handleOfferStatus(offer, 'denied')}
              />
            ))}
          </ul>
          <div className={styles.pagination}>
            <button onClick={prevPage} disabled={page === 1} className={styles.button}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={nextPage} disabled={props.offers.length < 8}className={styles.button}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No offers available.</p>
      )}
  </>
  )
}

const mapStateToProps = state => state.offersStore
const mapDispatchToProps = { getOffers, setOfferStatus }

export default connect(mapStateToProps, mapDispatchToProps)(ModerationPage)
