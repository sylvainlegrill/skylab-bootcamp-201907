const { Vehicle } = require('../../data')

/**
 * Registers a vehicle.
 * 
 * @param {string} brand 
 * @param {string} model 
 * @param {date} year 
 * @param {string} color
 * @param {string} plate
 * 
 * @returns {Promise}
 */
module.exports = function (brand, model, year, color,plate) {
    // TODO validate fields

    return Vehicle.findOne({ year })
        .then(vehicle => {
            if (vehicle) throw new Error(`vehicle with  license plate ${plate} already exists`)

            return Vehicle.create({ brand, model, year, color, plate })
        })
        .then(() => { })
}