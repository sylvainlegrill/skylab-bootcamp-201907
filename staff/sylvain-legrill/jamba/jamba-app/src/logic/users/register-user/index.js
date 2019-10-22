const {validate} = require('jamba-utils')


/**
 * Registers a user (customer).
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} email user's email
 * @param {string} phone user's phone
 * @param {string} password  user's password
 * @param {string} role user's role: architect or customer ( customer by default)
 *
 * 
 * @throws {TypeError} - if any parameter is not a string
 * @throws {Error} - if any parameter is empty/undefined. if there is already a user registered under the same email or username.
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
