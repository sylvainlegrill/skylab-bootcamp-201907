import logic from '../../index'

const {validate} = require('jamba-utils')



/**
 * Register a meeting.
 * 
 * @param {date} date
 * @param {string} address 
 * @param {string} userId
 * @param {string} architectId
 *
 * 
 * @returns {Promise}
 *
 * 
 */

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (date, address, userId, architectId) { 
 

    // validate.date(date, 'date')
    // validate.string(address, 'address')
    // validate.string(userId, 'userId')
    // validate.string(architectId, 'architectId')
    

    


    return (async () => { 
         
        const token = this.__token__
        const response = await fetch(`${REACT_APP_API_URL}/users/meetings`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' ,
                        'authorization': `bearer ${token}`},
            body: JSON.stringify({date, address, userId, architectId})
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        } else{
            const { id } = await response.json()
            return id
            
        }
    })()
}