// const { env: { REACT_APP_API_URL } } = process
const {validate} = require('jamba-utils')



/**
 * Registers a user.
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} phone
 * @param {string} password
 * @param {string} role
 *
 * 
 * @returns {Promise}
 *
 * 
 */

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, phone, password,role) { 


    validate.string(name)
    validate.string(surname)
    validate.string(email)
    validate.email(email, 'e-mail')
    validate.string(phone)
    validate.string(password)

    validate.string(role)



    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({name, surname, email, phone, password, role }) 
        })
 
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}

// // const { env: { REACT_APP_API_URL } } = process
// const {validate} = require('jamba-utils')



// /**
//  * Registers a user.
//  * 
//  * @param {string} role
//  * @param {string} name
//  * @param {string} surname
//  * @param {string} email
//  * @param {string} phone
//  * @param {string} password
//  * @param {string} city
//  * @param {string} license
//  * @param {string} specialty
//  * @param {string} profileImg
//  * @param {string} portfolioUrl
//  * @param {string} projectImg
//  * @param {string} description
//  *
//  * 
//  * @returns {Promise}
//  *
//  * 
//  */

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL


// export default function (role, name1, surname, email, phone, password, city, license, specialty, profileImg , portfolioUrl, projectImg, description) {

//     let image
// if (profileImg){
//      image = profileImg[0].name
// }
    
//     debugger
//     // validate fields
// if (role==='architect'){
//     validate.string(role)
//     validate.string(name1)
//     validate.string(surname)
//     validate.string(email)
//     validate.email(email, 'e-mail')
//     validate.string(phone)
//     validate.string(password)
//     validate.string(city)
//     validate.string(license)
//     validate.string(image)
//     // validate.string(portfolioUrl)
//     // validate.string(projectImg)
//     validate.string(description)
//     debugger
// }else{
//     debugger
//     validate.string(role)
//     validate.string(name1)
//     validate.string(surname)
//     validate.string(email)
//     validate.email(email, 'e-mail')
//     validate.string(phone)
//     validate.string(password)
    
// }


//     return (async () => { 
//         const response = await fetch(`${REACT_APP_API_URL}/users`, {
//             method: 'post',
//             headers: { 'content-type': 'application/json' },
//             body: JSON.stringify({role, name1, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description})
//         })

//         if (response.status !== 201) {
//             const { error } = await response.json()

//             throw Error(error)
        
//     }else{
//         console.log('200')
//     }
//     })()
// }