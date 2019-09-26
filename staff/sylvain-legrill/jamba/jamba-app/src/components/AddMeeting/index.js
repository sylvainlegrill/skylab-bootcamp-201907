import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Context from '../Context'
// import Feedback from '../Feedback'
import logic from '../../logic'
import moment from 'moment'


function AddMeeting({ history, match }) {

    const [view, setView] = useState(false)
    const { params: { id }} = match //architectId
    const { thisDay, thisHour, setUserMeeting } = useContext(Context)
    const  [error, setError]  = useState()
    const userId = logic.getUserId()
    const architectId = id

    function handleSubmit(event) { debugger
            event.preventDefault()

            const { target: { date: { value: date}, time: { value: time }, address: { value: address} } } = event

            const _date = new Date(`${date}, ${time}`)
           
            handleAddMeeting(_date, address, userId , architectId)//, userId, architectId)

           
    }

    async function handleAddMeeting(date, address, userId, architectId ) { //, userId, architectId
            
        try { debugger
            const userMeeting = await logic.addMeeting(date, address, userId, architectId) //, userId, architectId

            setUserMeeting(userMeeting)
            // console.log("hello Carol")

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
                              
                        <li className="meeting-register__form-item">
                            <label htmlFor="dateInput"><input className="meeting-register__form-input" id="dateInput" type="date" name="date" defaultValue={`${moment(thisDay).format('YYYY-MM-DD')}`}/></label>
                        </li>
                        <li className="meeting-register__form-item">
                            <label htmlFor="dateInput"><input className="meeting-register__form-input" id="dateInput" type="time" name="time" 
                            // defaultValue={`${moment(thisHour).format('HH:mm')}`} 
                            />
                            </label>
                        </li>
                        <li className="meeting-register__form-item">
                            <label htmlFor="addressInput"><textarea className="meeting-register__form-input" id="addressInput" name="address" rows="4" placeholder="address of the meeting"/></label>
                        </li>
                        {/* {error &&
                        <li className="meeting-register__form-item">
                            <Feedback message={error}/>
                        </li> } */}
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