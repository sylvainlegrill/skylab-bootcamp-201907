const {validate} = require('jamba-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


/**
 * Deletes a task.
 * 
 * @param {string} meetingId space id
 * 
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