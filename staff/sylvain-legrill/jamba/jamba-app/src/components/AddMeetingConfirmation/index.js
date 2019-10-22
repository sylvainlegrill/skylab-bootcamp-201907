import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import componentPicture1 from './../../images/result-background.png'

import Context from '../Context'
// import Feedback from '../Feedback'
import logic from '../../logic'


export default withRouter (function ({ history, match }) {

    const [view, setView] = useState(false)

    function handleGoToDashboard(id) {
        setView(true)
        history.push(`/dashboard`)
      }



    return (
        
        <>
            <img className="home__picture"src={componentPicture1} alt="componentPicture1" />
            <section className="meeting-confirmation"> meeting confirmed</section>
            <button className="architect__meeting"  title="meeting" href="#" onClick={() => {handleGoToDashboard()}}>Keep track of your meetings on the dashboard</button>
            <button className="architect__back" href="#" onClick={event => {
            event.preventDefault()

            history.push("/home") 
        }}>Go home</button>

        </>
        
    

    )
    

})
