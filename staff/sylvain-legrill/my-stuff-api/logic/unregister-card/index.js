const { Card } = require('../../data')
/**
 * Unregisters a card.
 * 
 * @param {string} id
 * @param {string} password //Need password ?
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    // TODO validate fields

    return Card.deleteOne({ _id: id, password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}