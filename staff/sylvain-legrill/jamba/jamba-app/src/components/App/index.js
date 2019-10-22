import React, { useState, useEffect } from 'react'
import './index.sass'
import moment from "moment"
import Header from '../Header'
import Context from '../Context'
import Register from '../Register'
import RegisterArchitect from '../RegisterArchitect'
import Architects from '../Architects'
import ArchitectDetail from '../ArchitectDetail'
import Dashboard from '../Dashboard'
import CalendarMeeting from '../CalendarMeeting'
import AddMeeting from '../AddMeeting'
import ConfirmMeeting from '../AddMeetingConfirmation'
import Login from '../Login'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import Home from '../Home'
import homeMainPicture from './../../images/homemainpicture.png'
// import ListAllArchitects from '../ListAllArchitects'




export default withRouter(function ({ history }) { 
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)
  const [error, setError] = useState()
  
  useEffect(() => {
    setError()
  }, [history.location])

  const handleBack = () => {
    setView(undefined)

    history.push('/')
  }

  const handleRegister = async (name, surname, email, phone, password, role) => { 
    try { 
      
      await logic.registerUser(name, surname, email, phone, password, role)

      history.push('/login')
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleRegisterArchitect = async (name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role) => {
    try {
      
      await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role)

      history.push('/login')
    } catch ({ message }) {
      setError(message)
    }
  }


  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)

      setView('home')
      history.push('/home')
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleGoToRegister = event => {
    event.preventDefault()

    setView('register')

    history.push('/register')
  }
  
  

  const handleGoToLogin = event => {
    event.preventDefault()

    setView('login')

    history.push('/login')
  }

  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  }, [history.location])

  const handleLogout = () => {
    logic.logUserOut()

    setView(undefined)
    history.push('/')
  }

  const [userMeeting, setUserMeeting] = useState()
  const [meetings, setMeetings] = useState()
  const [ currentDate, setCurrentDate ] = useState(moment())
  const [ thisDay, setThisDay ] = useState()
  const [ thisHour, setThisHour ] = useState()

  return (<>
    
    <Context.Provider value = {{ 
      userMeeting, setUserMeeting,
      meetings, setMeetings, 
      currentDate, setCurrentDate, 
      thisDay, setThisDay, 
      thisHour, setThisHour, 
    }}>

    <Header/>
    
    <main className="main">
    {view !== 'home' && <nav> 
    <div className="logo">
        <img src={require('../../images/logo.svg')} alt="jamba project logo" className="logo__image" />
    </div>
    <img className="home__picture"src={homeMainPicture} alt="MainPicture" />  
        <ul>  
          {view !== 'register' && <li><button className="register__button"href="" onClick={handleGoToRegister}>Sign up</button></li>}
          {view !== 'login' && <li><button className="login__button" href="" onClick={handleGoToLogin}>Sign in</button></li>}
        </ul>
      </nav>}
    <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} error={error} />} />
    <Route path="/register-architect" render={() => <RegisterArchitect onBack={handleBack} onRegister={handleRegisterArchitect} error={error} />} />
    <Route path="/login" render={() => <Login onBack={handleBack} onLogin={handleLogin} error={error} />} />
    
    <Route path="/dashboard" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Dashboard/> } />
    <Route exact path="/architects/:id/calendar" render={() => !logic.isUserLoggedIn() ? history.push('/') : <CalendarMeeting/> } />
    <Route exact path="/architects/:id/calendar/submit" render={() => !logic.isUserLoggedIn() ? history.push('/') : <AddMeeting error={error} /> } />
    <Route exact path="/architects/:id/calendar/submit/confirmation" render={() => !logic.isUserLoggedIn() ? history.push('/') : <ConfirmMeeting error={error} /> } />
    
    {logic.isUserLoggedIn() && <Route path="/home" render={() => <Home onLogout={handleLogout}/>} />}
    <Route exact path="/architects" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Architects />} />
    <Route exact path="/architects/:id" render={() => !logic.isUserLoggedIn() ? history.push('/') : <ArchitectDetail /> }/>
    </main>

    </Context.Provider>

  </>)

  
})