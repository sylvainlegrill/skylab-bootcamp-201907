const {validate} = require('jamba-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


/**
 * Delete a meeting.
 * 
 * @param {string} meetingId meeting's id
 * 
 * @throws {TypeError} - if any of the parameters not stringa.  
 * @throws {Error} - if any parameter is empty or undefined, if meeting Id is not found
 * 
 * 
*/

export default function(meetingId) { 

    validate.string(meetingId, 'meeting id')
   const token = this.__token__
   
    return (async() => { 
        
        const response = await fetch(`${REACT_APP_API_URL}/users/meetings/${meetingId}`, {
            method: 'DELETE',
            headers: {
                'authorization' : `bearer ${token}`
            }
        }) 
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}