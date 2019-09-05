const { models: { User } } = require('jamba-data')
/* const { validate }= require('../../jamba-utils/') */

/**
 * Registers an architect.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {number} number
 * @param {license} string
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, phone, license, password) {

    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return User.create({ name, surname, email, phone, license, password })
        })
        .then(() => { })
}