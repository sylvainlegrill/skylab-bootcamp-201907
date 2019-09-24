import React, { useState } from "react"

import { withRouter } from "react-router-dom"

//import logic from "../../logic"

export default withRouter(function ({history, architects}) {

 

  const handleArchitectDetail = ( _id) => {
    
    history.push(`/architects/${_id}`) 
  }


  return (
    <>     
      
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
