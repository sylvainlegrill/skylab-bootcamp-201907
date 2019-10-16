const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves a user by its id
 * 
 * @param {string} id user id
 * 
 * @throws {TypeError} - if any parameter is not a string.
 * @throws {Error} - if any parameter is empty/undefined, if email is not found or password does not match.
 * 
 * @returns {Promise}
 * 
 */


export default function () {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'GET',
            headers: {'authorization' : `bearer ${this.__token__}`}
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { _user } = await response.json()

        return _user
     })()
}