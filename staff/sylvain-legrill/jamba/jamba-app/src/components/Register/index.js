import React from 'react'

export default function ({ onBack, onRegister }) {
    return <>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email },phone: { value: phone }, password: { value: password }, role: { value: role },city: { value: city }, license: { value: license }, specialty: { value: specialty } } } = event

            onRegister(name, surname, email, phone, password, role, city, license, specialty)
        }}>
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="surname" placeholder="surname"/>
            <input type="email" name="email" placeholder="email" />
            <input type="tel" name="phone" placeholder="phone number" />
            <input type="password" name="password" placeholder="password" />
            <input type="text" name="role" placeholder="role" />
            <input type="text" name="city" placeholder="your city" />
            <input type="text" name="license" placeholder="license" />
            <input type="text" name="specialty" placeholder="specialty"/>
            <button>Proceed</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}