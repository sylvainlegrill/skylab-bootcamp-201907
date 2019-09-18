import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"
import logic from "../../logic"
import Result from "../Result"

function Architects({history}) {


   const [architects, setArchitects] = useState([])

   

  useEffect(() => {
    
    (async () => {
            
        const searchArchitects = await logic.retrieveUsersByRole("architect")
            
        setArchitects(searchArchitects)
        })()    
    
  }, [])

//   useEffect(() => {
//     async function searchArchitects() {
//       const res = await logic.searchArchitectsByCityAndSpecialty()
//       setArchitects(res)
//     }
//     searchArchitects()
//   }, [])

  return (
    <>     
        {architects && <Result architects ={architects} />}
        {architects && <a href="#" onClick={event => {
            event.preventDefault()

            history.push("/home") 
        }}>Go back</a> }
    </>
  )
}

export default withRouter(Architects)