// const { env: { REACT_APP_API_URL } } = process
const {validate} = require('jamba-utils')



/**
 * Registers an architect   .
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} email user's email
 * @param {string} phone user's phone
 * @param {string} password  user's password
 * @param {string} city user's city. Only for architects
 * @param {string} license user's architect license .Only for architects
 * @param {string} specialty user's architect specialty ( residential , technical, interior design, landscaper). Only for architects
 * @param {string} portfolioUrl link to user's portfolio. Only for architects
 * @param {string} projectImg user's project image. Only for architects
 * @param {string} description user's description. Only for architects
 *
 * 
 * @throws {TypeError} - if any parameter is not a string
 * @throws {Error} - if any parameter is empty/undefined. if there is already a user registered under the same email or username.
 * 
 */

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description) {  
    // validate fields
// if (role==='architect'){
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(phone, 'phone')
    validate.string(password, 'password')
    validate.string(city, 'city')
    validate.string(license, 'license')
    validate.string(specialty, 'specialty')
    validate.string(portfolioUrl, 'portfolioUrl')
    validate.string(projectImg, 'projectImg')
    validate.string(description, 'description')



    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({name, surname, email, phone, password, city, license, specialty,  portfolioUrl, projectImg, description, role:"architect" }) 
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
        return await response.json()
        // const { id } = await response.json()
        // return id
    })()
} 





// // const { env: { REACT_APP_API_URL } } = process
// const {validate} = require('jamba-utils')



// /**
//  * Registers a user.
//  * 
//  * @param {string} name  
//  * @param {string} surname
//  * @param {string} email
//  * @param {string} phone
//  * @param {string} password
//  * @param {string} city
//  * @param {string} license
//  * @param {string} specialty
//  * @param {string} portfolioUrl
//  * @param {string} projectImg
//  * @param {string} description
//  * @param {string} role
//  *
//  * 
//  * @returns {Promise}
//  *
//  * 
//  */

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// export default function (name, surname, email, phone, password, role, city, license, specialty, portfolioUrl, projectImg, description) {  
//     // validate fields
// // if (role==='architect'){
//     validate.string(name, 'name')
//     validate.string(surname, 'surname')
//     validate.string(email, 'e-mail')
//     validate.email(email, 'e-mail@gmail.com')
//     validate.string(phone, 'phone')
//     validate.string(password, 'password')
//     validate.string(role, 'role')
//     validate.string(city, 'city')
//     validate.string(license, 'license')
//     validate.string(specialty, 'specialty')
//     validate.string(portfolioUrl, 'portfolioUrl')
//     validate.string(projectImg,'projectImg' )
//     validate.string(description, 'description')

    


//     return (async () => { 
//         const response = await fetch(`${REACT_APP_API_URL}/users`, {
//             method: 'POST',
//             headers: { 'content-type': 'application/json' },
//             body: JSON.stringify({name, surname, email, phone, password, role:"architect", city, license, specialty,  portfolioUrl, projectImg, description}) 
//         })
        
//         if (response.status !== 201) {
//             const { error } = await response.json()

//             throw Error(error)
//         }
//         //return await response.json()
//         const { id } = await response.json()
//         return id
//     })()
// } 