const REACT_APP_API_URL = process.env.REACT_APP_API_URL
//const { validate }= require('jamba-utils')


/**
 * Return all users by role.
 * 
 * 
 */


export default function (role) {
    // validate.string(id, 'id')

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