import React from 'react'
//import './index.sass'

export default function ({onSearch}){
    
    return  <>
    <form class = "home__searchlists">
        <select required class ="home__searchlist--professional">
            <option value="" disabled selected hidden>Select type of professional</option>
            <option value="0">architect</option>
            <option value="1">technical architect</option>
            <option value="2">interior architect</option>
            <option value="2">landscaper</option>
        </select>
        <select required class ="home__searchlist--housing">
            <option value="" disabled selected hidden>Select type of housing</option>
            <option value="0">individual house</option>
            <option value="1">appartment</option>
            <option value="2">business shop</option>
            <option value="2">office</option>
        </select>

        <input type="text" name="type of architect" placeholder="search"></input>
        <button>> search</button>
    </form>
    </>
    
    
    
    // <form className={`home__search`} onSubmit={event => {
    //     event.preventDefault()

    //     const { target: { query: { value: query } } } = event

    // }}>
    //     <label className={`search__label`} htmlFor="query">Search</label>
    //     <input className={`search__input`} type="text" name="query" id="query" placeholder="What makes you laugh?"/>
    //     <button className={`search__button`}><i className="fas fa-search"></i></button>
    // </form>
}