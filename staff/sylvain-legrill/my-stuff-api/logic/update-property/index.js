const { Property } = require('../../data')

/**
 * Updates a property.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    return Property.findByIdAndUpdate(id, { $set: data })
        .then(property => {
            if (!property) throw new Error(`property with id ${id} does not exist`)
        })
}