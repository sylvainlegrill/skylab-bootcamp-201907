const { Property } = require('../../data')

/**
 * Authenticates a property by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */
module.exports = function (email, password) {
    // TODO validate fields

    return Property.findOne({ email })
        .then(property => {
            if (!property) throw new Error(`property with e-mail ${email} does not exist`)

            if (property.password !== password) throw new Error('wrong credentials')

            return property.id
        })
}