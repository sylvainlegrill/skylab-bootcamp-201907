import React, { useState } from "react"

import { withRouter } from "react-router-dom"

//import logic from "../../logic"

export default withRouter(function ({history, architects}) {

 

  const handleArchitectDetail = ( _id) => {
    
    history.push(`/architects/${_id}`) 
  }


  return (
    <>  
        <section className="result">
          <ul className="architect__ul">
            {architects.length ? (
              architects.map(architect => (
                <li className="architect__li" key={architect._id}>
                  <div className="architect__container--image">
                   <img className="architect__profileImg" src={architect.profileImg}></img>
                   </div>
                   <div
                   className="architect__container--text">
                    <p className="architect__description">{architect.description}</p>
                    <p className="architect__name">{architect.name}</p>
                    <p className="architect__specialty">{architect.specialty}</p>
                    <p className="architect__city">{architect.city}</p>
                    <button className="architect__button" title="" href="#" onClick={() => {handleArchitectDetail(architect._id)}}>see profile</button>
                    </div>

                  
                </li>
              ))
            ) : (
              <p className="architect__none">No architects found  :( </p>
            )}
          </ul>
        </section>
     
    </>
  )
})
