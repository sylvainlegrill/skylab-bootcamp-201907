import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"
import logic from "../../logic"


export default withRouter(function ({ match }) {


   const [architect, setArchitect] = useState([])

   useEffect(() => {
    async function retrieveArchitect(){
      try {
        const { params: { userId } } = match
        
        const res = await logic.retrieveUser(userId)

        const { id, role, specialty, name, city } = res

        setArchitect({id, role, specialty, name, city})
        
      } catch ({ message }) {
        console.log('failed retrieving architect detail', message)
      }
    }
    retrieveArchitect()
  }, [])


  return <section className="architect detail">     
        {architect && 
        <li className="architects" key={architect._id}>
        {/* <img className="user__img" src={architect.profileImg}></img> */}
        <div className="user__container">
          <p className="user__name">{architect.name}</p>
          <p className="user__specialty">{architect.specialty}</p>
          <p className="user__city">{architect.city}</p>
        </div>
        </li>}

        {/* {architect && <a href="#" onClick={event => {
            event.preventDefault()

            history.push("/home") 
        }}>Go back</a> } */}
    </section>
  
})

