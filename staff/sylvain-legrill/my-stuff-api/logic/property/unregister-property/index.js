const { Property } = require('../../../data')
/**
 * Unregisters a property.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    // TODO validate fields

    return Property.deleteOne({ _id: id, password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}