const { Vehicle } = require('../../../data')
const mongoose = require('mongoose')

/**
 * Retrieves a vehicle by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    return Vehicle.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(vehicle => {
            if (!vehicle) throw new Error(`vehicle with id ${id} not found`)

            vehicle.id = id

            return vehicle
        })
}

