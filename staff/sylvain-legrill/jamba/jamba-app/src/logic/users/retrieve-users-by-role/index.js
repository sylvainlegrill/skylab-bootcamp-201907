const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const { validate }= require('jamba-utils')


/**
 * List all architects according to their city and specialty
 *
 * @param {string} role user's role: architect or customer ( customer by default)
 * 
 * @throws {TypeError} - if role is not a string.
 * @throws {Error} - if users with specified role is empty or undefined or users not found.
 * 
 * @returns {Object}  
 *
 */



export default function (role) {
    validate.string(role, 'role')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users-all/${role}`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { user } = await response.json()

        return user
     })()
}