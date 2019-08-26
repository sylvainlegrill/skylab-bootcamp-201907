const { Property } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} address
 * @param {number} m2 
 * @param {number} year 
 * @param {string} cadastre
 * @param {registerId} owner
 * 
 * 
 * @returns {Promise}
 */
module.exports = function (address, m2, year, cadastre, owner) {
    // TODO validate fields

    return Property.findOne({ cadastre })
        .then(property => {
            if (property) throw new Error(`property with cadastre ${cadastre} already exists`)

            return Property.create({ address, m2, year, cadastre, owner })
        })
        .then(() => { })
}