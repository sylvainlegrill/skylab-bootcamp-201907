const { Card } = require('../../data')

/**
 * Updates a card.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    return Card.findByIdAndUpdate(id, { $set: data })
        .then(card => {
            if (!card) throw new Error(`card with id ${id} does not exist`)
        })
}