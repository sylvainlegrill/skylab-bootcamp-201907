const { Card } = require('../../data')

/**
 * Registers a card.
 * 
 * @param {number} number 
 * @param {date} expiry 
 * 
 * @returns {Promise}
 */
module.exports = function (number, date) {
    // TODO validate fields

    return Card.findOne({ number })
        .then(card => {
            if (card) throw new Error(`card already registered`)

            return Card.create({ number, date })
        })
        .then(() => { })
}