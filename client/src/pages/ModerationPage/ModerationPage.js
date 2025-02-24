import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { getOffers, setOfferStatus } from '../../actions/actionCreator'
import Offer from '../../components/Offer/Offer'
import styles from './ModerationPage.module.scss'

const ModerationPage = props => {
  useEffect(() => {
    props.getOffers({})
  }, [])

  const acceptOffer = offer => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus({ offerId: offer.id, command: 'pending' })
        },
        {
          label: 'No'
        }
      ]
    })
  }

  const rejectOffer = offer => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus({ offerId: offer.id, command: 'denied' })
        },
        {
          label: 'No'
        }
      ]
    })
  }

  const offers = props.offers.map(offer => (
    <Offer
      key={offer.id}
      offer={offer}
      acceptOffer={acceptOffer}
      rejectOffer={rejectOffer}
    />
  ))
  return <ul className={styles['offer-list']}>{offers}</ul>
}

const mapStateToProps = state => state.offersStore
const mapDispatchToProps = {
  getOffers,
  setOfferStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ModerationPage)
