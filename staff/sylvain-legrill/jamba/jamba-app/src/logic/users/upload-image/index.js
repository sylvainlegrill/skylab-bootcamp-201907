// import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Upload an image
 *
 * @param {string} id user's id
 * @param {string} profileImg user's profile Image to upload.
 * 
 * @throws {TypeError} - if any param is not a string.
 * @throws {Error} - if any param is empty.
 * 
 * 
 */

export default function (id, profileImg) {
    // validate fields
    const image = profileImg

    var formData = new FormData();
    formData.append('image', image);
    //headers: { 'content-type': 'multipart/form-data', authorization: `bearer ${token}` },
    return (async () => { 
        // if(image !== undefined) 
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/uploads`, { 
            method: 'post',
            headers: {
                headers: { 'content-type': 'application/json' },
                // authorization: `bearer ${this.__token__}`
            },
            body: formData
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            
            throw Error(error)
        }
        const { message } = await response.json()
        return message
    })()
}

