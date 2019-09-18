import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'



function Search ({ history, onSearch}){

    const [user, setUser] = useState()



    
    return  <>

    <form className = "home__searchlists" 
        onSubmit={event => {
            event.preventDefault()

            const { target: { specialty: { value: specialty }, city: { value: city } } } = event
            
            onSearch( city, specialty)
        }}>
     
        <select required className ="home__searchlist--professional" name="specialty">
            <option defaultValue="" >Select type of professional</option>
            <option value="residential architect">residential architect</option>
            <option value="technical architect">technical architect</option>
            <option value="interior architect">interior architect</option>
            <option value="landscaper">landscaper</option>
        </select>
        {/* <select required className ="home__searchlist--housing" name="housing">
            <option defaultValue="">Select type of housing</option>
            <option value="0">individual house</option>
            <option value="1">appartment</option>
            <option value="2">business shop</option>
            <option value="3">office</option>
        </select> */}

        <select required className ="home__searchlist--city" name="city">
            <option defaultValue="">Select a city</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Madrid">Madrid</option>
            <option value="Valencia">Valencia</option>
            <option value="Paris">Paris</option>
        </select>

        <button className = "home__searchlist--button"href="#">search</button>

    </form>
    </>
  
}
export default withRouter(Search)