import React, { useState, useEffect } from "react"
import "./index.sass"
import logic from "../../logic"
import Search from "../Search"
import Presentation from "../Presentation"
import PresentationArchitects from "../PresentationArchitects"
import Result from "../Result"
import Dashboard from "../Dashboard" 

import { Route, Link, withRouter } from "react-router-dom"

//COMPONENTS in HOME

// import SearchArchitects from '../SearchArchitects'
// import Presentation from '../Presentation'
// import Projects from '../Projects'
//import ListAllArchitects from '../ListAllArchitects'
// import Header from '../Header'
// import Footer from '../Footer'

export default withRouter(function ({ history, onLogout }) {
  const [user, setUser] = useState()

  const [result, setResult] = useState()

  const [view, setView] = useState(false)

    function onHandleSearch (city, specialty){

        (async () => {
            
        const searchResult = await logic.searchArchitectsByCityAndSpecialty(city, specialty)
            
        setResult(searchResult)
        })()

    }
    const handleBack = () => {
       setResult(undefined)
    }
   

//   const handleListArchitects = event => {
//     event.preventDefault()

//     history.push("/architects") 
//     // Pas Besoin du meme url que API url : le useEffect permet de lier / a l API url ( qui se trouve dans la logique) 
//   }
  
// TO DO : Put user and setUser in Context.
  useEffect(() => {
    (async () => {
      const user = await logic.retrieveUser()

      setUser(user)
    })()
  }, [history.location])

  // useEffect change la location (via history)
  const handleToDashboard = () => {
    setView(true)
    history.push("/dashboard")
  }

  //4) copy paste route and add the view status.
  //5) add onClick on button and define the handleTo . Define the setView
  return (
    <main className="home">
      
        {/* Hola,{user && user.name}! */}
      {view === true && <Route path="/dashboard" render={() =>  <Dashboard/>} />}
      
      {/* <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a> */}
      <button onClick={onLogout}>Logout</button>
      <div className="dropdown-content">
      <button className="" onClick={handleToDashboard}> Dashboard </button>
      {/* <Lin className="nav__a dropdown__button" href="#" to="/dashboard">Dashboard</Link> */}
      {/* <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a> */}
      </div>
     
      <Search onSearch={onHandleSearch} />

      {!result && <Presentation />} 
      {!result && <PresentationArchitects />} 
      {result && <Result architects ={result} />}
      {result && <a href="#" onClick={event => {
            event.preventDefault()

            handleBack()
        }}>Go back</a> }

          
      
      
    </main>
  )
})