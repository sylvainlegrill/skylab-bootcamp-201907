const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')
const bcrypt = require('bcryptjs')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email user's email
 * @param {string} password user's password
 * 
 * @throws {TypeError} - if any parameter is not a string.
 * @throws {Error} - if any parameter is empty/undefined, if email is not found or password does not match.
 * 
 * @returns {String} user id string.
 */

module.exports = function (email, password) {
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new Error(`user with e-mail ${email} does not exist`)

        // if (user.password !== password) throw new Error('wrong credentials')

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw Error('wrong credentials')

        return user.id
    })()
}