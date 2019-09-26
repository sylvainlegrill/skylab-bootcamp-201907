import React from 'react'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'


 function Header({history}) {

    function handleGoToHome(event) {
        event.preventDefault()

        history.push('/home')
    }

    function handleLogout() {
        logic.logUserOut()
        history.push('/')
    }

    return <>

        {logic.isUserLoggedIn() &&
        <nav className="mobile-menu">
            <ul className="mobile-menu__list">
                <li className="mobile-menu__item">
                    <img src={require('../../images/logo.svg')} alt="jamba project logo" className="mobile-menu__logo" onClick={handleGoToHome}/>
                </li>
                <li className="mobile-menu__item">
                    <button className="mobile-menu__logout-button" title="sign out" onClick={handleLogout}>Sign out</button>
                </li>
            </ul>
        </nav>          
        }

    </>
}

export default withRouter(Header)