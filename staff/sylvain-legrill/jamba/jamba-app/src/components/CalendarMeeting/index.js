import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import logic from '../../logic/'


function Month({ history, match }) {

    const { params: { id } } = match //architectId
    const { setThisDay, currentDate, setCurrentDate }  = useContext(Context)

    const [ monthMeetings, setMonthMeetings ] = useState([])
    const architectId = id

    function convertHour(date){
        
        const _date = new Date(date)
        const hour = _date.getHours()
        return `${hour}H`
    }

    function startMeeting(date){
        const endTime = moment(date).subtract(1,'hours').format('HH')
        return `${endTime}H`
    }

    function endMeeting(date){
        const endTime = moment(date).add(1,'hours').format('HH')
        return `${endTime}H`
    }

    useEffect(() => {  
        (async () =>{
          try {
            const meetings = await logic.retrieveMeetingsArchitect(architectId)
            
            const monthMeetings = meetings.filter(meeting => moment(currentDate).isSame(meeting.date, 'month'))
            setMonthMeetings(monthMeetings)

          } catch(error) {
            console.log(error.message)
          }
        })()
    },[architectId,currentDate])


    function handleGoToAddMeeting(day) {
        
      setThisDay(moment(day))
      history.push(`/architects/${architectId}/calendar/submit`)
    }

    function handleGoToNextMonth(event) {
        event.preventDefault()

        setCurrentDate(moment(currentDate).add(1, 'months'))
    }

    function handleGoToPreviousMonth(event) {
        event.preventDefault()
          
        setCurrentDate(moment(currentDate).subtract(1, 'months')) 
    }

    function handleDayMeetings(dataDate){
        return monthMeetings.map(meeting => {
            let meetingDay = moment(meeting.date).format('YYYY MMMM D')
            let currentDay = moment(dataDate).format('YYYY MMMM D')
            if (meetingDay === currentDay) {
                return <i className="fas fa-circle">Busy from{startMeeting(meeting.date)} to {endMeeting(meeting.date)} </i>   //for personnal dashboard meeting.address  ?
            }
        })
    }
    
    const header = () => {

        return (
        <>
            <div className="month__header">
                <i className="fas fa-caret-left" onClick={handleGoToPreviousMonth}></i><h1 className="month__title"> {moment(currentDate).format("MMMM")} </h1><i className="fas fa-caret-right" onClick={handleGoToNextMonth}></i>
         </div>
            <p className="month__year">{moment(currentDate).format("YYYY")}</p> 
        </>
        )
    }

    const week = () => {

        const days = []
        const startDate = moment(currentDate).startOf('week')
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <div>
                    {startDate.add(1, 'days').format('ddd')}
                </div>      
            )       
        }
        return <div className="calendar__header">{days}</div>
    }

    const days = () => {

        const monthStart = moment(currentDate).startOf('month'),
        monthEnd = moment(currentDate).endOf('month'),
        endDate = moment(monthEnd).endOf('week'),
        rows = []

        let days = []

        let first = monthStart
        switch (first.day()) {
            case 2:
                first.add(6, 'days')
                break
            case 3:
                first.add(5, 'days')
                break
            case 4:
                first.add(4, 'days')
                break
            case 5:
                first.add(3, 'days')
                break
            case 6:
                first.add(2, 'days')
                break
            case 0:
                first.add(1, 'days')
                break
            default:
                first.add(7, 'days')
        }

        if (monthStart.day() !== '1') {
            first = moment(first).subtract(1, 'week')
            while (first <= moment(first).endOf('week').day()) {
                for (let i = 0; i < 7; i++) {
                    const formattedDate = first.format('D')
                    const dataDate = first.format()
                    days.push(
                        <div onClick={() => {handleGoToAddMeeting(dataDate)}} className={`${!moment(currentDate).isSame(dataDate, 'month')
                            ? "calendar__disabled"
                            : moment().isSame(dataDate, 'day')
                            ? "calendar__selected"
                            : "calendar__day day"}`} >
                            {formattedDate}
                            {monthMeetings && <div className="calendar__meetings">{handleDayMeetings(dataDate)}</div>}
                        </div>
                    )
                    first = first.add(1, 'days')
                }
            }
        }

        while (first <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = first.format('D')
                const dataDate = first.format()
                days.push(
                    <div onClick={() => {handleGoToAddMeeting(dataDate)}} className={`${!moment(currentDate).isSame(dataDate, 'month')
                            ? "calendar__disabled"
                            : moment().isSame(dataDate, 'day')
                            ? "calendar__selected"
                            : "calendar__day day"}`} >
                       {formattedDate}
                       {monthMeetings && <div className="calendar__meetings">{handleDayMeetings(dataDate)}</div>}
                    </div>
                )
                first = first.add(1, 'days')
            }
            rows.push( <div className="calendar__week"> {days} </div>)
            days = []
        }

        return <div>{rows}</div>
    }

    return <>
    
        <div className="month">

            <div>{header()}</div>

            <div className="month__act">
                
                <div className="calendar">
                    <div>{week()}</div>
                    <div>{days()}</div>
                </div>                 

            </div>

        </div> 

    </>
}

export default withRouter(Month)
