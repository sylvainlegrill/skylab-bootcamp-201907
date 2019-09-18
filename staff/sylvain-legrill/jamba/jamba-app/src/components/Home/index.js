import React, { useState, useEffect } from "react"
import "./index.sass"
import logic from "../../logic"
import Search from "../Search"
import Presentation from "../Presentation"
import PresentationArchitects from "../PresentationArchitects"
import Result from "../Result"


import { Link, withRouter } from "react-router-dom"

//COMPONENTS in HOME

// import SearchArchitects from '../SearchArchitects'
// import Presentation from '../Presentation'
// import Projects from '../Projects'
//import ListAllArchitects from '../ListAllArchitects'
// import Header from '../Header'
// import Footer from '../Footer'

function Home({ history, onLogout }) {
  const [user, setUser] = useState()

  const [result, setResult] = useState()

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

  return (
    <main className="home">
      Hola, {user && user.name}!<button onClick={onLogout}>Logout</button>
      {/* <section className="home__search">
        <h3 className="home__title-search"> Tell us more about your project</h3>

        <form className="home__searchlists">
          <select required className="home__searchlist--professional">
            <option defaultValue="">Select type of professional</option>
            <option value="0">architect</option>
            <option value="1">technical architect</option>
            <option value="2">interior architect</option>
            <option value="2">landscaper</option>
          </select>
          <select required className="home__searchlist--housing">
            <option defaultValue="">Select type of housing</option>
            <option value="0">individual house</option>
            <option value="1">appartment</option>
            <option value="2">business shop</option>
            <option value="2">office</option>
          </select>
          <input
            type="text"
            name="query"
            className="home__searchlist--city"
            placeholder="city"
          ></input>
            Replace with <Search />
          <button type="search" className="home__searchlist--button"
            title="more architects"
            href="#"
            onSubmit={handleSearchArchitects} >
         
          </button>
        </form>
      </section> */}
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
}

export default withRouter(Home) // Permet d exporter avec router la route Home : aller dans app 