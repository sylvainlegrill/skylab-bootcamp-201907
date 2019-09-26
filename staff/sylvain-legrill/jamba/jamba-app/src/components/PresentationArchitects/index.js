import React from 'react'
import { withRouter } from "react-router-dom"
import homeArchitect1 from './../../images/home-architect1.png'
import homeArchitect2 from './../../images/home-architect2.png'

//import './index.sass'

function PresentationArchitects ({history}){

  const handleListArchitects = event => {
    event.preventDefault()
    
    history.push("/architects") 
  }


 return <>
<section className="architects">
<div className="architects-div">
  <h3 className="architects__title">The architects</h3>
</div>
<figure className="architects-figure">
  <img className="home__picture"src={homeArchitect1} alt="MainPicture" />
  <img className="home__picture"src={homeArchitect2} alt="MainPicture" />
</figure>
<div className="architects__div">
  <a
    className="architects__link"
    title="more architects"
    href="#"
    onClick={handleListArchitects}
  >
    more architects
  </a>
</div>
</section>
 </>
} 
export default withRouter(PresentationArchitects)