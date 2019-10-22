import React, {useState, useEffect} from 'react'
import Feedback from '../Feedback'
import { withRouter } from "react-router-dom"
import logic from "../../logic"
import portfolioUrl from '../../images/portfolio.png'
import CalendarMeeting from "../CalendarMeeting"




export default withRouter (function ({match,  history, onBack }) {
  
  const [view, setView] = useState(false)
  const [architect, setArchitect] = useState([])
  const [error, setError] = useState() 
  useEffect(() => {
    
    (async () => { 
        try {
          
        const { params: { id }} = match
        
        const architect = await logic.retrieveArchitect(id)

        setArchitect(architect)
        
    } catch({message}) {
        setError('failed retrieving architect detail', message)
      }
    })()
  }, [])

  function handleGoToCalendar(id) {
    setView(true)
    history.push(`/architects/${id}/calendar`)
  }

  return (
    <>  
         <section className="result">
         <ul className="architect__ul">
        {architect && 
        <li className="architect__li" key={architect.id}>
        <div className="architect__container--image">
        <img className="architect__profileImg" src={architect.profileImg}></img>
        </div>
        <div className="architect__container--text">
          <p className="architect__name">{architect.name}</p>
          <p className="architect__specialty">{architect.specialty}</p>
          <p className="architect__city">{architect.city}</p>
          <p className="architect__description">{architect.description}</p>
          <a href={architect.portfolioUrl}><img className="architect__portfolioUrl" src={portfolioUrl}></img></a>
        </div>
        </li>
        
        }
        <button className="architect__meeting"  title="meeting" href="#" onClick={() => {handleGoToCalendar(architect.id)}} >arrange meeting      <i className="fas fa-calendar-check"></i></button>
        </ul>
        {error && <Feedback message={error} />}
        </section>
         {architect && 
         <button className="architect__back" href="#" onClick={event => {
            event.preventDefault()

            history.push("/home") 
        }}><i className="fas fa-arrow-left"></i>Go back</button> }
        
    </>
  )
})  

