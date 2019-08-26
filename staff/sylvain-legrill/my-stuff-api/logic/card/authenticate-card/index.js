const validate = require('../utils')
const { Card } = require('../../../data')

/**
 * Authenticates a card by its credentials.
 * 
 * @param {string} number 
 * @param {string} date 
 * 
 * @returns {Promise}
 */
module.exports = function (number) {
    // TODO validate fields

    return Card.findOne({ number })
        .then(card => {
            if (!card) throw new Error(`card with e-mail ${number} does not exist`)

            if (card.number !== number) throw new Error('wrong credentials')

            return card.id
        })
}