import React from 'react'
import { withRouter } from "react-router-dom"

//import './index.sass'

function PresentationArchitects ({history}){

  const handleListArchitects = event => {
    event.preventDefault()

    history.push("/architects") 
  }


 return <>
<section className="home__architects">
<div className="home__architects-div">
  <h3 className="home__architects--title">The architects</h3>
</div>
<figure className="home__architects-figure">
  <img
    className="home__architects--img"
    alt=""
    src="../../img/architects1.jpg"
  ></img>
  <img
    className="home__architects--img"
    alt=""
    src="../../img/architects2.jpg"
  ></img>
</figure>
<div className="home__architects-div">
  <a
    className="home__architects--link"
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