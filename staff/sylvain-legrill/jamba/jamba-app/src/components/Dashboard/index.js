import React, { useState, useEffect } from "react"
import logic from "../../logic"
import { withRouter } from 'react-router-dom'


// 

export default withRouter (function ({match,history}) {
    const [meetings, setMeetings] = useState([])
    const [ meeting, setMeeting ] = useState(false)
    const [user, setUser] = useState([])
    

    function convertDate(date){
        
        const _date = new Date(date)
        const day = _date.getDate()
        const month = _date.getMonth()
        const year = _date.getFullYear()
        return `${day}/${month}/${year}`
    }
    
    function convertHour(date){
        
        const _date = new Date(date)
        const hour = _date.getHours()
        const minutes = _date.getMinutes()
        return `${hour}:${minutes}`
    }

    

  

    useEffect(() => { 
        (async () => {
        const searchMeetings = await logic.retrieveMeetings()
        
        setMeetings(searchMeetings)
        
        })()
    }, [meetings , setMeetings])
    

  

    async function handleDeleteMeeting(meetingId) { debugger
        try {
            await logic.deleteMeeting(meetingId)

            setMeeting(true)
        } catch(error) {
            console.log(error.message)
        }
    }


  

    return <> 
        <h2> Dashboard</h2>
            <h3> Meetings</h3>
            <section className="meetings">
                <ul className="architect__ul"></ul>
                    {meetings.length ? (
                    meetings.map(meeting =>  
                        <ul className="meetings__ul">
                        <li key={meeting.id} className="meetings__container--text">

                            
                            {/* onClick={() => {handleCancelMeeting(meeting._id)}} */}
                        </li>
                        <li className="meetings__date">{convertDate(meeting.date)}</li>
                        <li className="meetings__date">{convertHour(meeting.date)}</li>
                        <li className="meetings__address">{meeting.address}</li>
                        
                        <button className="meetings__button" title="" href="#" onClick={() => handleDeleteMeeting(meeting.id)} > Cancel meeting</button> 
                        </ul>
                )   
                    ) : (
                    <p className="meetings__none">No meetings found </p>
                    )}
                    
                
            </section>
            <button className="architect__back" href="#" onClick={event => {
                        event.preventDefault()
            
                        history.push("/home") 
                    }}>Go home</button>
            <section className="profile">

            </section>

            {/* <section className="dashboard__specialty" > Specialty:
                <select required className ="dashboard__selector" name="specialty">
                    <option defaultValue="" >Select type of professional</option>
                    <option value="residential meeting">residential meeting</option>
                    <option value="technical meeting">technical meeting</option>
                    <option value="interior meeting">interior meeting</option>
                    <option value="landscaper">landscaper</option>
                </select>
                <button className="dashboard__button">Edit</button>
            </section>


            <section className="dashboard__description" > Tell us more about you:
                <p>Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className="dashboard__button">Edit</button>
            </section>
            

            <section className="dashboard__url" > Add the url of your portfolio:
            <input type="email" name="email" placeholder ="email" />
                <button className="dashboard__button">Edit</button>
                <button className="dashboard__button">Save</button>
            </section>

            <section className="dashboard__url" > Upload image of a project of yours:
        
                <button className="dashboard__button">Upload</button>
            </section>
            <section className="dashboard__url" > Upload profile picture:
        
                <button className="dashboard__button">Upload</button>
            </section> */}
    </>



})