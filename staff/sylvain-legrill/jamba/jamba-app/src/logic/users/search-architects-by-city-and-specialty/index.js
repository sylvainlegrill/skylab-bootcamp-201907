const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const { validate }= require('jamba-utils')


/**
 * Returns all architects by city and specialty
 *
 * @param {string} role user's role: architect or customer ( customer by default)
 * @param {string} city user's city. Parameter only for architects
 * @param {string} specialty user's architect specialty ( residential , technical, interior design, landscaper). Only for architects
 * 
 * @throws {TypeError} - if role is not a string.
 * @throws {Error} - if users with specified role/city/specialty is empty or undefined or users not found.
 * 
 * @returns {Object}  objects architects' data.
 *
 */


export default function (city, specialty) {
    validate.string(city, 'city searched')
    validate.string(specialty, 'specialty searched')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/architects/${city}/${specialty}`, {
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