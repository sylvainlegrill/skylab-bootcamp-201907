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









// import React, { useState, useEffect } from 'react'
// import * as dateFns from 'date-fns'
// import './index.sass'
// import logic from '../../logic'
// import { withRouter, Link } from 'react-router-dom'


// export default withRouter(function Calendar ({ onEvent, history }) {
//     // STATES

//     const [user, setUser] = useState(null)
//     // const  [calendar, setCalendar] = useState([])

//     const [currentDate, setCurrentDate] = useState(new Date())
//     const [selectedDate, setSelectedDate] = useState(new Date())

//     useEffect(() => {
//         (async () => {
//         const user = await logic.retrieveUser()
//         setUser(user)
//         })()
//     }, [history.location])

//     const handleGoToAddMeetings = () => {
//       history.push('/meeting/register')
//   }


//     const header = () => {
//         const dateFormat = "MMMM yyyy";
//         return (
//            <div className="header row flex-middle">
//               <div className="column col-start">
//                  <div className="icon" onClick={prevMonth}>
//                     chevron_left
//                  </div>
//               </div>
//               <div className="column col-center">
//                  <span>{dateFns.format(currentDate, dateFormat)}</span>
//               </div>
//               <div className="column col-end">
//                  <div className="icon" onClick={nextMonth}>
//                     chevron_right
//                  </div>
//               </div>
//            </div>
//         );
//     };

//     const nextMonth = () => {
//         setCurrentDate(dateFns.addMonths(currentDate, 1))
//      }
//      const prevMonth = () => {
//         setCurrentDate(dateFns.subMonths(currentDate, 1))
//      }

//      const daysOfWeek = () => {
//         const dateFormat = 'EEEEEE'
//         const days = [];
//         let startDate = dateFns.startOfWeek(currentDate);
//         for (let i = 0; i < 7; i++) {
//               days.push(
//                  <div className="column col-center" key={i}>
//                  {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
//                  </div>
//               );
//            }
//            return <div className="days row">{days}</div>;
//         };
//         const cells = () => {
//             const monthStart = dateFns.startOfMonth(currentDate);
//             const monthEnd = dateFns.endOfMonth(monthStart);
//             const startDate = dateFns.startOfWeek(monthStart);
//             const endDate = dateFns.endOfWeek(monthEnd);
//             const dateFormat = "d";
//             const rows = [];
//             let days = [];
//             let day = startDate;
//             let formattedDate = "";
//             while (day <= endDate) {
//                for (let i = 0; i < 7; i++) {
//                formattedDate = dateFns.format(day, dateFormat);
//                const cloneDay = day;
//             days.push(
//                   <div 
//                    className={`column cell ${!dateFns.isSameMonth(day, monthStart)
//                    ? "disabled" : dateFns.isSameDay(day, selectedDate) 
//                    ? "selected" : "" }`} 
//                    key={day} 
//                    onClick={() => onDateClick(dateFns.toDate(cloneDay))}
//                    > 
//                    <span className="number">{formattedDate}</span>
//                    <span className="bg">{formattedDate}</span>
//                  </div>
//                  );
//                day = dateFns.addDays(day, 1);
//               }
//             rows.push(
//                   <div className="row" key={day}> {days} </div>
//                 );
//                days = [];
//              }
//              return <div className="body">{rows}</div>;
//             }

//             const onDateClick = day => { 
               
//             setSelectedDate(day);


//             }


//     return (<> 
//          <h2>calendar</h2>
//          <div className="calendar">
//             <div>{header()}</div>        
//             <div>{daysOfWeek()}</div>        
//             <div>{cells()}</div>
//         </div>
//         {
//            onDateClick  &&
//            <div>Holaaaa</div>
//         }
//     </> 
//     );
// })
