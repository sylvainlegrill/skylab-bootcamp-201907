const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email
 * @param {string} password   
 * @param {string} phone
 * @param {string} city
 * @param {string} license
 * @param {string} specialty
 * @param {string} role
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, password, phone, role, city, license, specialty) {

    validate.string(name)
    validate.string(surname)
    validate.string(email)
    validate.email(email, 'e-mail')
    validate.string(password)
    validate.string(phone)
    validate.string(role)
    return ( async () => {
        const user = await User.findOne({ email })
        if (user) throw Error('User already exists.')

        const hash = await bcrypt.hash(password, 10)

        if(role === "architect"){
            if(!city) throw Error ("City cannot be empty for architect role")
            if(!license) throw Error ("License cannot be empty for architect role")
            if(!specialty) throw Error ("Speciality cannot be empty for architect role")
            await User.create({name, surname, email, phone, role, city, license, specialty, password: hash})
        }
        if(role === "customer"){
            await User.create({name, surname, email, phone, password: hash, role})
        }

    })()
}