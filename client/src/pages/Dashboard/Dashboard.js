import React from 'react'
import { connect } from 'react-redux'
import CONSTANTS from '../../constants'
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard'
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard'
import Header from '../../components/Header/Header'
import ModerationPage from '../ModerationPage/ModerationPage'

const dashboards = (history, match) => ({
  [CONSTANTS.CREATOR]: <CreatorDashboard history={history} match={match} />,
  [CONSTANTS.CUSTOMER]: <CustomerDashboard history={history} match={match} />,
  [CONSTANTS.MODERATOR]: <ModerationPage />
})
const Dashboard = props => {
  const { role, history } = props
  if (!props.email) {
    history.replace('/login')
    return null
  }

  return (
    <div>
      <Header />
      {dashboards(history, props.match)[role] || null}
    </div>
  )
}

const mapStateToProps = state => state.userStore.data

export default connect(mapStateToProps)(Dashboard)
