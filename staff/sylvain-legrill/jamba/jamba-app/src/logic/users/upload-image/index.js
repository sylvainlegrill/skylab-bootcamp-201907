// import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (id, profileImg) {
    // validate fields
    const image = profileImg[0]

    var formData = new FormData();
    formData.append('image', image);
    //headers: { 'content-type': 'multipart/form-data', authorization: `bearer ${token}` },
    return (async () => {
        // if(image !== undefined)
        const response = await fetch(`${REACT_APP_API_URL}/users/upload`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${this.__token__}`
            },
            body: formData
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
}else{
    console.log('200')
}
    })()
}

