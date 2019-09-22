import React, { Route, useState } from "react"

import { withRouter } from "react-router-dom"
import CalendarMeeting from "../CalendarMeeting"

//import logic from "../../logic"

export default withRouter(function ({history, architects}) {

  const [view, setView] = useState(false)

  const handleArchitectDetail = ( _id) => {
    
    history.push(`/architects/${_id}`) 
  }

  function handleGoToCalendar() {
    setView(true)
    history.push(`/calendar`)
  }



  return (
    <>     
      {view === true && <Route path="/calendar" render={() =>  <CalendarMeeting/>} />}
        <ul className="architect__ul">
          {architects.length ? (
            architects.map(architect => (
              <li className="architects" key={architect._id}>
                {/* <img className="user__img" src={architect.profileImg}></img> */}
                <div className="architect__container">
                  <p className="architect__name">{architect.name}</p>
                  <p className="architect__specialty">{architect.specialty}</p>
                  <p className="architect__city">{architect.city}</p>
                  <button className="architect__detail" 
                  title=""
                  href="#"
                  onClick={() => {handleArchitectDetail(architect._id)}}>see profile</button>
                  <button className="architect__meeting" 
                  title="meeting"
                  href="#"
                  onClick={() => {handleGoToCalendar()}}>arrange meeting</button>

                </div>
              </li>
            ))
          ) : (
            <p className="user__none">No architects found</p>
          )}
        </ul>
     
    </>
  )
})
