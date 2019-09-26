import React from 'react'

export default function ({ onBack, onLogin }) {
    return <>
    <section>
       
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <ul>
            <li className="login__form-item">
                <label htmlFor="email"></label>
                <input className="login__form-input" type="email" name="email" id="email"  placeholder="email"/>
            </li>
            <li className="login__form-item">
                <label htmlFor="password"></label>
                <input className="login__form-input" type="password" name="password" id="password" placeholder="password"/>
            </li >
            <li className="login__form-item">
                <button className="login__form-button" type="submit">Sign in</button>
            </li>
            </ul>
        </form>
        <button href="#" className="login__back-button" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</button>
        </section>
    </>
}