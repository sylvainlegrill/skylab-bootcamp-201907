const {validate} = require('jamba-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email user's email
 * @param {string} password user's password
 * 
 * @throws {TypeError} - if any parameter is not a string.
 * @throws {Error} - if any parameter is empty/undefined, if email is not found or password does not match.
 * 
 */



export default function (email, password) {
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            const { token } = await response.json()

            //return token
            this.__token__ = token

            return
        }

        const { error } = await response.json()

        throw Error(error)
    })()
}