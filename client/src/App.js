import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage/LoginPage'
import Events from './pages/Events/Events'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import Payment from './pages/Payment/Payment'
import StartContestPage from './pages/StartContestPage/StartContestPage'
import Dashboard from './pages/Dashboard/Dashboard'
import PrivateHoc from './components/PrivateHoc/PrivateHoc'
import NotFound from './components/NotFound/NotFound'
import Home from './pages/Home/Home'
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc'
import ContestPage from './pages/ContestPage/ContestPage'
import UserProfile from './pages/UserProfile/UserProfile'
import 'react-toastify/dist/ReactToastify.css'
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage'
import CONSTANTS from './constants'
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer'
import HowItWorks from './pages/HowItWorks/HowItWorks'

class App extends Component {
  render () {
    return (
      <Router>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/login'
            component={OnlyNotAuthorizedUserHoc(LoginPage)}
          />
          <Route
            exact
            path='/registration'
            component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
          />
          <Route exact path='/payment' component={PrivateHoc(Payment)} />
          <Route
            exact
            path='/startContest'
            component={PrivateHoc(StartContestPage)}
          />
          <Route
            exact
            path='/startContest/nameContest'
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name'
            })}
          />
          <Route
            exact
            path='/startContest/taglineContest'
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE'
            })}
          />
          <Route
            exact
            path='/startContest/logoContest'
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO'
            })}
          />
          <Route exact path='/dashboard' component={PrivateHoc(Dashboard)} />
          <Route
            exact
            path='/contest/:id'
            component={PrivateHoc(ContestPage)}
          />
          <Route exact path='/account' component={PrivateHoc(UserProfile)} />
          <Route exact path='/events' component={Events} />
          <Route exact path='/how-it-works' component={HowItWorks} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    )
  }
}

export default App
