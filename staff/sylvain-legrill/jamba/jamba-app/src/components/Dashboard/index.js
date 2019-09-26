import React, { useState, useEffect } from "react"
import logic from "../../logic"
import { Link, withRouter } from 'react-router-dom'



export default withRouter (function ({history, onBack }) {

    const [user, setUser] = useState(null)
  
    useEffect(() => {
        (async () => {
        const user = await logic.retrieveUser()
        setUser(user)
        })()
    }, [history.location])
    // 1) use State to implement
    //2) History push 
    

    return <> 
        <h2> Welcome</h2>
                {/* ,{user && user.name}! */}
            <section>
            <li className="dashboard__meeting" > Upcoming meeting:
                <ul>date:</ul>
                <ul>address:</ul>
                <ul>you will meet:</ul>
                <button className="dashboard__button"> cancel meeting </button>
            </li>
            </section>

            <section className="dashboard__specialty" > Specialty:
                <select required className ="dashboard__selector" name="specialty">
                    <option defaultValue="" >Select type of professional</option>
                    <option value="residential architect">residential architect</option>
                    <option value="technical architect">technical architect</option>
                    <option value="interior architect">interior architect</option>
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
                <button className="dashboard__button">Save</button>>
            </section>

            <section className="dashboard__url" > Upload image of a project of yours:
        
                <button className="dashboard__button">Upload</button>
            </section>
            <section className="dashboard__url" > Upload profile picture:
        
                <button className="dashboard__button">Upload</button>
            </section>

            }   
    </>



})