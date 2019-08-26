const { Vehicle } = require('../../data')
/**
 * Unregisters a Vehicle.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    // TODO validate fields

    return Vehicle.deleteOne({ _id: id, password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}