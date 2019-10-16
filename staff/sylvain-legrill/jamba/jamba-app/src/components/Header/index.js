import React from 'react'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'



 function Header({history}) {

    function handleGoToHome(event) {
        event.preventDefault()

        history.push('/home')
    }
    function handleGoToDashboard(event) {
        event.preventDefault()

        history.push('/dashboard')
    }

    function handleLogout() {
        logic.logUserOut()
        history.push('/')
    }

    return <>

        {logic.isUserLoggedIn() &&
        <nav className="mobile-menu">
            
            <div className="mobile-menu__logo-container">
            <img src={require('../../images/logo.svg')} alt="jamba project logo" className="mobile-menu__logo" onClick={handleGoToHome}/>
            </div>  
            <div className="mobile-menu__button-container">
            <ul className="mobile-menu__list">
                <li className="mobile-menu__item">
                    <button className="mobile-menu__dashboard-button" title="dashboard" onClick={handleGoToDashboard}>Dashboard</button>
                </li>
                <li className="mobile-menu__item">
                    <button className="mobile-menu__logout-button" title="sign out" onClick={handleLogout}>Sign out</button>
                </li>
            </ul>
            </div> 
        </nav>          
        }

    </>
}

export default withRouter(Header)