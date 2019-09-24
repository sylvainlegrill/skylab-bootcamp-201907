const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email
 * @param {string} phone
 * @param {string} password  
 * @param {string} city
 * @param {string} license
 * @param {string} specialty
 * @param {string} role
 * @param {string} profileImg
 * @param {string} portfolioImg
 * @param {string} description
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, phone, password, role, city, license, specialty, profileImg, portfolioUrl, projectImg, description) {

    validate.string(name)
    validate.string(surname)
    validate.string(email)
    validate.email(email, 'e-mail')
    validate.string(phone)
    validate.string(password)
    validate.string(role)
    return ( async () => {
        const user = await User.findOne({ email })
        if (user) throw Error(`user with e-mail ${email} already exists.`)

        const hash = await bcrypt.hash(password, 10)

        if(role === "architect"){
            if(!city) throw Error ("City cannot be empty for architect role")
            if(!license) throw Error ("License cannot be empty for architect role")
            if(!specialty) throw Error ("Speciality cannot be empty for architect role")
            if(!profileImg) throw Error ("Profile Image cannot be empty for architect role")
            if(!portfolioUrl) throw Error ("Portfolio url cannot be empty for architect role")
            if(!projectImg) throw Error ("Project Image cannot be empty for architect role")
            if(!description) throw Error ("Description cannot be empty for architect role")
            await User.create({name, surname, email,  phone, password: hash, role, city, license, specialty, profileImg, portfolioUrl, projectImg, description})
        }
        if(role === "customer"){
            await User.create({name, surname, email, phone, password: hash, role })
        }

    })()
}