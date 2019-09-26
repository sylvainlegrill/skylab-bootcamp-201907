const REACT_APP_API_URL = process.env.REACT_APP_API_URL
//const { validate }= require('jamba-utils')


/**
 * Return all architects by specialty, city.
 * 
 * 
 */


export default function () {
    // validate.string(id, 'id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'GET',
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