import React, { useState, useEffect } from "react"
import logic from "../../logic"
import { withRouter } from 'react-router-dom'


// 

export default withRouter (function ({match,history}) {
    const [meetings, setMeetings] = useState([])
    const [ meeting, setMeeting ] = useState(false)
    //const [user, setUser] = useState([])
    

    function convertDate(date){
        
        const _date = new Date(date)
        const day = _date.getDate()
        const month = _date.getMonth()
        const year = _date.getFullYear()
        return `${day}.${month}.${year}`
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
    }, [meeting])

    async function handleDeleteMeeting( meetingId) {
        try {
            await logic.deleteMeeting(meetingId)
            setMeeting(!meeting)
        } catch(error) {
            console.log(error.message)
        }
    }


  

    return <> 
        <h2 className="dashboard__title"> Dashboard</h2>
            <h3 className="meeting__title"> Meetings</h3>
            <section className="meeting__container">
                    {meetings.length ? (
                    meetings.map(meeting =>  
                        <ul className="meeting__list">
                            <li className="meeting__item">
                        <div key={meeting.id} className="meeting__item--left"> 
                        <p className="meeting__address">{meeting.address}</p>
                        <p className="meeting__contact">{meeting.architect.name}{meeting.user.name}'contacts: {meeting.architect.email}{meeting.user.email} </p>
                        <p className="meeting__contact-phone"> phone number: {meeting.architect.phone}{meeting.user.phone}</p>
            
                        </div> 
                        <span className="meeting__tag">{convertDate(meeting.date)}</span>
                        <span className="meeting__tag">{convertHour(meeting.date)}</span>

                        </li>
                        <button className="meeting__cancel-button" title="" href="#" onClick={() => handleDeleteMeeting(meeting._id)} > Cancel meeting</button> 
                        </ul>
                )   
                    ) : (
                    <p className="meeting__none">No meetings found </p>
                    )}
                    
                
            </section>
            <button className="meeting__back-button" href="#" onClick={event => {
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