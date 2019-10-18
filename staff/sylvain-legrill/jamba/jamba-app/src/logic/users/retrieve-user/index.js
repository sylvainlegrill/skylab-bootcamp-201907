const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves a user 
 * 
 * 
 * @throws {TypeError} - if any parameter is not a string.
 * @throws {Error} - if any parameter is empty/undefined.
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