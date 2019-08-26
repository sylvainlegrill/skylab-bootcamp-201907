const { Vehicle } = require('../../data')

/**
 * Authenticates a vehicle by its credentials.
 * 
 * @param {string} plate 
 * 
 * @returns {Promise}
 */
module.exports = function (plate) {
    // TODO validate fields

    return Vehicle.findOne({ plate })
        .then(vehicle => {
            if (!vehicle) throw new Error(`vehicle with plate ${plate} does not exist`)

            return vehicle.id
        })
}