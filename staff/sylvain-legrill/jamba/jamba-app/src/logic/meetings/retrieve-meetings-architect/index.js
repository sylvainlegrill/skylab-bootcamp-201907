const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const { validate }= require('jamba-utils')


/**
 * Return all meeting from a user.
 * 
 * @returns {Array} meetings array.
 * 
 * @throws {TypeError} - if meeting id or user id is not a string.
 * @throws {Error} - if meeting id or user id is empty or undefined, if meeting is not found.
 * 
 */


export default function (architectId) {
     validate.string(architectId, 'architect id')
    
    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/users/${architectId}/meetings`, {
            method: 'GET',
            headers: {
                'authorization' : `bearer ${this.__token__}`
            }
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { meetings } = await response.json()

        return meetings
     })()
}