const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const { validate }= require('jamba-utils')


/**
 * Return all architects by specialty, city.
 * 
 * @throws {TypeError} - if any parameter is not a string.
 * @throws {Error} - if any parameter is empty/undefined.
 */


export default function (id) { 
    //validate.string(id, 'id')

    return (async () => {  
        const response = await fetch(`${REACT_APP_API_URL}/architects/${id}`, {
            method: 'GET',
            headers: {'authorization' : `bearer ${this.__token__}`}
        })

        if (response.status !== 200) { 
            const { error } = await response.json()

            throw Error(error)
        }

        const { architect } = await response.json()

        return architect
     })()
}