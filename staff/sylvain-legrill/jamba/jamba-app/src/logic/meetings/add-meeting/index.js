// const { env: { REACT_APP_API_URL } } = process
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
    //validate fields

    validate.date(date)
    validate.string(address)
    validate.string(userId)
    validate.string(architectId)
    console.log(date, address, userId, architectId)




    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/users/meetings`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' ,
                        authorization: `bearer ${this.__token__}`},
            body: JSON.stringify({date, address, userId, architectId})
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}