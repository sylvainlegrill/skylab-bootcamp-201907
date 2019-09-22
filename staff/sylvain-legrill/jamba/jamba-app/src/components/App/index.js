import React, { useState, useEffect } from 'react'
import './index.sass'
import Register from '../Register'
import Architects from '../Architects'
import ArchitectDetail from '../ArchitectDetail'
import Dashboard from '../Dashboard'
import CalendarMeeting from '../CalendarMeeting'
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

  const handleRegister = async (role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description) => {
    try {
      debugger
      await logic.registerUser(role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description)

      history.push('/login')
    } catch ({ message }) {
      console.log('fail register', message)
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

  return <div className="App">
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

    <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} />} />
    <Route path="/login" render={() => <Login onBack={handleBack} onLogin={handleLogin} />} />
    <Route path="/calendar" render={() =>  <CalendarMeeting/> } />
    <Route path="/dashboard" render={() =>  <Dashboard onLogOut={handleLogout} />} />
    {logic.isUserLoggedIn() && <Route path="/home" render={() => <Home onLogout={handleLogout}/>} />}
    <Route exact path="/architects" render={() => <Architects />} />

    <Route path="/architects/:id" render={() => <ArchitectDetail /> }/>


  </div>
})

//3) definir route where you are going