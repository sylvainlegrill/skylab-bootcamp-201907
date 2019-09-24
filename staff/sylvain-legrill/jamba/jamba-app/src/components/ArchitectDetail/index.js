import React, { Route,useState, useEffect } from "react"

import { withRouter } from "react-router-dom"
import logic from "../../logic"
import CalendarMeeting from "../CalendarMeeting"




export default withRouter (function ({match,  history, onBack }) {
  
  const [view, setView] = useState(false)
  const [architect, setArchitect] = useState([])
    
  useEffect(() => {
    
    (async () => {
        try {
          
        const { params: { id }} = match
        
        const architect = await logic.retrieveArchitect(id)

        setArchitect(architect)
        
    } catch({message}) {
        console.error('failed retrieving architect detail', message)
      }
    })()
  }, [])

  function handleGoToCalendar(id) {
    setView(true)
    history.push(`/architects/${id}/calendar`)
  }

  return (
    <>    
        {view === true && <Route path="/calendar" render={() =>  <CalendarMeeting/>} />}
        {/* {user && <Result architects ={user} />}  */}
        {architect && <li className="architect" key={architect.id}>
        {/* <img className="user__img" src={architect.profileImg}></img> */}
        <div className="user__container">
          <p className="user__name">{architect.name}</p>
          <p className="user__specialty">{architect.specialty}</p>
          <p className="user__city">{architect.city}</p>
        </div>
        </li>}
        <button className="architect__meeting" 
                  title="meeting"
                  href="#"
                  onClick={() => {handleGoToCalendar(architect.id)}}>arrange meeting</button>
        {/* {architect && <a href="#" onClick={event => {
            event.preventDefault()

            history.push("/home") 
        }}>Go back</a> } */}
    </>
  )
})  

