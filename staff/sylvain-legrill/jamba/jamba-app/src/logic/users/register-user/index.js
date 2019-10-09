const {validate} = require('jamba-utils')



/**
 * Registers a user.
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} phone
 * @param {string} password
 * @param {string} role
 *
 * 
 * @returns {Promise}
 *
 * 
 */

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, phone, password,role) { 


    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail@gmail.com')
    validate.string(phone, 'phone')
    validate.string(password, 'password')

    validate.string(role)



    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({name, surname, email, phone, password, role }) 
        })
 
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
        const { id } = await response.json()
        return id
    })()
}
