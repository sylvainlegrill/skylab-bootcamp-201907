import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'



function Search ({ history, onSearch}){

    const [user, setUser] = useState()



    
    return  <>

    <form className = "searchlist" 
        onSubmit={event => {
            event.preventDefault()

            const { target: { specialty: { value: specialty }, city: { value: city } } } = event
            
            onSearch( city, specialty)
        }}>
        <div className="searchlist__background-clip">
        <h3 className = "searchlist__title"> Tell us more about your project </h3>
        </div>
         <select required className ="searchlist__selector" name="specialty">
            <option defaultValue="" >Select professional ></option>
            <option className="searchlist__input"value="residential architect">residential architect</option>
            <option className="searchlist__input" value="technical architect">technical architect</option>
            <option className="searchlist__input" value="interior architect">interior architect</option>
            <option className="searchlist__input" value="landscaper">landscaper</option>
        </select>
        {/* <select required className ="searchlist--housing" name="housing">
            <option defaultValue="">Select type of housing</option>
            <option value="0">individual house</option>
            <option value="1">appartment</option>
            <option value="2">business shop</option>
            <option value="3">office</option>
        </select> */}

        <select required className ="searchlist__selector" name="city">
            <option className="searchlist__input" defaultValue="">Select a city ></option>
            <option className="searchlist__input" value="Barcelona">Barcelona</option>
            <option className="searchlist__input" value="Madrid">Madrid</option>
            <option className="searchlist__input" value="Valencia">Valencia</option>
            <option className="searchlist__input" value="Paris">Paris</option>
        </select>

        <button className = "searchlist__button"href="#">SEARCH</button>

    </form>
    </>
  
}
export default withRouter(Search)