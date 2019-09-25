import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Context from '../Context'
// import Feedback from '../Feedback'
import logic from '../../logic'


function AddMeetingConfirmation({ history, match }) {

    const [view, setView] = useState(true)


    return (
        <> 
        {view &&

            <section className="meeting-confirmation"> meeting confirmed</section>
        }
            </>

    )
    

}
export default withRouter(AddMeetingConfirmation)