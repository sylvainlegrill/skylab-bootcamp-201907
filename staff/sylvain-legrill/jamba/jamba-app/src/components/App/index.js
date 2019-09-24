import React, { useState, useEffect } from 'react'
import './index.sass'
import moment from "moment"
import Context from '../Context'
import Register from '../Register'
import RegisterArchitect from '../RegisterArchitect'
import Architects from '../Architects'
import ArchitectDetail from '../ArchitectDetail'
import Dashboard from '../Dashboard'
import CalendarMeeting from '../CalendarMeeting'
import AddMeeting from '../AddMeeting'
import Login from '../Login'
import logic from '../../logic'
import { Route, Link, withRouter } from 'react-router-dom'
import Home from '../Home'
// import ListAllArchitects from '../ListAllArchitects'




export default withRouter(function ({ history }) { 
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)

  const handleBack = () => {
    setView(undefined)

    history.push('/')
  }

  const handleRegister = async (name, surname, email, phone, password, role) => { 
    try { 
      
      await logic.registerUser(name, surname, email, phone, password, role)

      history.push('/login')
    } catch ({ message }) {
      console.error('fail register', message)
    }
  }

  const handleRegisterArchitect = async (name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role) => {
    try {
      
      await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role)

      history.push('/login')
    } catch ({ message }) {
      console.error('fail register', message)
    }
  }


  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)

      setView('home')
      history.push('/home')
    } catch ({ message }) {
      console.log('fail login', message)
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
  const [ currentDate, setCurrentDate ] = useState(moment())
  const [ thisDay, setThisDay ] = useState()
  const [ thisHour, setThisHour ] = useState()

  return (<>
    
    <Context.Provider value = {{ 
      userMeeting, setUserMeeting, 
      currentDate, setCurrentDate, 
      thisDay, setThisDay, 
      thisHour, setThisHour, 
    }}>
    {/* <header>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header> */}

    <header>
      {view !== 'home' && <nav>
        <ul>
          {view !== 'register' && <li><a href="" onClick={handleGoToRegister}>Register</a></li>}
          {view !== 'login' && <li><a href="" onClick={handleGoToLogin}>Login</a></li>}
        </ul>
      </nav>}
    </header>
    <main className="main">
    <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} />} />
    <Route path="/registerarchitect" render={() => <RegisterArchitect onBack={handleBack} onRegister={handleRegisterArchitect} />} />
    <Route path="/login" render={() => <Login onBack={handleBack} onLogin={handleLogin} />} />
    <Route exact path="/architects/:id/calendar" render={() =>  <CalendarMeeting/> } />
    <Route exact path="/architects/:id/calendar/submit" render={() =>  <AddMeeting/> } />
    <Route path="/dashboard" render={() =>  <Dashboard onLogOut={handleLogout} />} />
    {logic.isUserLoggedIn() && <Route path="/home" render={() => <Home onLogout={handleLogout}/>} />}
    <Route exact path="/architects" render={() => <Architects />} />

    <Route exact path="/architects/:id" render={() => <ArchitectDetail /> }/>
    </main>

    </Context.Provider>

  </>)

  
})

