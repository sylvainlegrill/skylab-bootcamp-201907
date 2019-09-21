import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"
import logic from "../../logic"



export default withRouter (function ({match,  history, onBack }) {
  
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

  return (
    <>    
        {/* {user && <Result architects ={user} />}  */}
        {architect && <li className="architect" key={architect.id}>
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

