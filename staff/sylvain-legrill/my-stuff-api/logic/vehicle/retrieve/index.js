const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'Vehicle ID')

    return Vehicle.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
        .then(vehicle => {
            if (!vehicle) throw Error(`Vehicle with id ${id} does not exist.`)
            vehicle.id = id 
            return vehicle
        })
}

// const { Vehicle } = require('../../../models')
// const mongoose = require('mongoose')

// /**
//  * Retrieves a vehicle by its id.
//  * 
//  * @param {string} id 
//  * 
//  * @returns {Promise}
//  */
// module.exports = function (id) {
//     return Vehicle.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
//         .then(vehicle => {
//             if (!vehicle) throw new Error(`vehicle with id ${id} not found`)

//             vehicle.id = id

//             return vehicle
//         })
// }
