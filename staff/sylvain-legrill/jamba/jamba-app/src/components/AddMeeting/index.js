import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Context from '../Context'
import logic from '../../logic'
import moment from 'moment'


function AddMeeting({ history, match }) {

    const [view, setView] = useState(false)
    const { params: { id }} = match //architectId
    const { thisDay, thisHour, setUserMeeting } = useContext(Context)
    const  [error, setError]  = useState()
    const userId = logic.getUserId()
    const architectId = id

    

    function handleSubmit(event) { 
            event.preventDefault()

            const { target: { date: { value: date}, time: { value: time }, address: { value: address}, zipcode: { value: zipcode}, city: { value: city}  } } = event

            const _date = new Date(`${date}, ${time}`)

            const _address = `${address}, ${zipcode}, ${city}`
            
           
            handleAddMeeting(_date, _address, userId , architectId)

           
    }

    async function handleAddMeeting(date, address, userId, architectId ) { 
            
        try { 
            const userMeeting = await logic.addMeeting(date, address, userId, architectId) 

            setUserMeeting(userMeeting)

            history.push(`/architects/${architectId}/calendar/submit/confirmation`)
        } catch({ message }) {
            setError(message)
        }
    }  

    function goBack(event) { 
        event.preventDefault()

        history.push(`/architects/${architectId}/calendar`)
    }

  
 
    return <>

            <section className="meeting-register">
                <h1 className="meeting-register__title">Confirm your meeting</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                              
                        <li className="meeting-register__form-item"> meeting date:
                        <i className="far fa-calendar-alt"></i>
                            <label htmlFor="dateInput"><input className="meeting-register__form-input" id="dateInput" type="date" name="date" defaultValue={`${moment(thisDay).format('YYYY-MM-DD')}`}/></label>
                        </li>
                        <li className="meeting-register__form-item"> meeting time:
                        <i className="far fa-clock"></i>
                            <label htmlFor="dateInput">
                                <input className="meeting-register__form-input" id="dateInput" type="time" name="time" min="9:00:00" max="20:00:00" step="1800"
                            // defaultValue={`${moment(thisHour).format('HH:mm')}`} 
                            />
                            </label>
                        </li>
                        <li className="meeting-register__form-item"> address:
                            <label htmlFor="addressInput">
                                <textarea className="meeting-register__form-input" id="addressInput" name="address" rows="4" placeholder="add address of the meeting here"
                                /></label>
                        </li>
                        <li className="meeting-register__form-item"> zip code:
                            <label htmlFor="addressInput">
                                <input className="meeting-register__form-input" id="zipcodeInput" name="zipcode" placeholder="add zipcode here"
                                /></label>
                        </li>
                        <li className="meeting-register__form-item"> city:
                            <label htmlFor="addressInput">
                                <input className="meeting-register__form-input" id="cityInput" name="city" placeholder="add city here"
                                /></label>
                        </li>
                        {/* {error &&
                        <li className="meeting-register__form-item">
                            <Feedback message={error}/>
                        </li> } */}
                        {error && <Feedback message={error} />}
                        <li className="meeting-register__form-item">
                            <button className="meeting-register__form-button">confirm meeting</button>
                        </li>
                    </ul>
                </form>
                <button href="#" className="meeting-register__back-button" onClick={goBack}><i className="fas fa-arrow-left"></i> Go back</button>
            </section>

    </>
}

export default withRouter(AddMeeting)