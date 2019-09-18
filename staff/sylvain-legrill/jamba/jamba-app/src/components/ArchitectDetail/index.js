import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"
import logic from "../../logic"
// import Result from "../Result"


export default withRouter(function ({ match, history }) {


   const [architect, setArchitect] = useState()
   
   useEffect(() => {
    async function _retrieveArchitect(){
       debugger 
      try {
        const { params: { architectId } } = match
        
        const res = await logic.retrieveArchitect(architectId)

        const { _id, role, specialty, name, city } = res

        setArchitect({_id, role, specialty, name, city})
        
      } catch ({ message }) {
        console.log('failed retrieving architect detail', message)
      }
    }
    _retrieveArchitect()
  },[match])


  return (
    <>     
        {architect && <li className="architect" key={architect._id}>
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
    </>
  )
  
})

