const { Property } = require('../../data')
const mongoose = require('mongoose')

/**
 * Retrieves a property by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    return Property.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(property => {
            if (!property) throw new Error(`property with id ${id} not found`)

            property.id = id

            return property
        })
}