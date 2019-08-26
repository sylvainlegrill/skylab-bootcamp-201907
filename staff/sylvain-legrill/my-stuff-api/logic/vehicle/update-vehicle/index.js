const { Vehicle } = require('../../../data')

/**
 * Updates a vehicle.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    return Vehicle.findByIdAndUpdate(id, { $set: data })
        .then(vehicle => {
            if (!vehicle) throw new Error(`vehicle with id ${id} does not exist`)
        })
}