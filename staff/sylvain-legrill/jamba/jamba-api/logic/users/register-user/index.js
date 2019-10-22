const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} email user's email
 * @param {string} phone user's phone
 * @param {string} password  user's password
 * @param {string} city user's city. Only for architects
 * @param {string} license user's architect license .Only for architects
 * @param {string} specialty user's architect specialty ( residential , technical, interior design, landscaper). Only for architects
 * @param {string} role user's role: architect or customer ( customer by default)
 * 
 * @throws {TypeError} - if any parameter is not a string
 * @throws {Error} - if name, surname, email, phone, password, role  parameters are empty/undefined. if city, license, specialty, portfolioUrl, projectImg, description parameters are empty/undefined for architect's role.  if there is already a user registered under the same email or username.
 * @returns {Promise}
 */
module.exports = function (name, surname, email, phone, password, role, city, license, specialty, portfolioUrl, projectImg, description) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(phone, 'phone')
    validate.string(password, 'password')
    validate.string(role, 'role')
 



    return ( async () => {
        let user = await User.findOne({ email })
        if (user) throw Error(`user with e-mail ${email} already exists.`)

        const hash = await bcrypt.hash(password, 10)

        if(role === "architect"){
            if(!city) throw Error ("City cannot be empty for architect role")
            if(!license) throw Error ("License cannot be empty for architect role")
            if(!specialty) throw Error ("Speciality cannot be empty for architect role")
            if(!portfolioUrl) throw Error ("Portfolio url cannot be empty for architect role")
            if(!projectImg) throw Error ("Project Image cannot be empty for architect role")
            if(!description) throw Error ("Description cannot be empty for architect role")
            user = await User.create({name, surname, email,  phone, password: hash, role, city, license, specialty, portfolioUrl, projectImg, description})
        }
        if(role === "customer"){
            user = await User.create({name, surname, email, phone, password: hash, role })
        }
        const { id } = user
        return id
    })()
}