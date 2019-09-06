const { models: { User } } = require('jamba-data')
/* const { validate }= require('../../jamba-utils/') */

/**
 * Registers an architect.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} phone
 * @param {string} city
 * @param {string} license
 * @param {string} specialty
 * @param {string} password
 * @param {string} role
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, phone, city, license, specialty, password) {

    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return User.create({ name, surname, email, phone, city, license, specialty, password })
        })
        .then(() => { })
}