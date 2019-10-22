const REACT_APP_API_URL = process.env.REACT_APP_API_URL

//const { validate }= require('jamba-utils')


/**
 * Return all meeting from a user.
 * 
 * @returns {object} meetings object.
 * 
 * @throws {TypeError} - if any of the parameters not stringa.  
 * @throws {Error} - if any parameter is empty or undefined.
 * 
 */


export default function () {
    // validate.string(id, 'id')

    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/meetings`, {
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