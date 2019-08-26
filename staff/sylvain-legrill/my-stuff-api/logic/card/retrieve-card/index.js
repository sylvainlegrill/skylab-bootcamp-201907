const { Card } = require('../../../data')
const mongoose = require('mongoose')

/**
 * Retrieves a card by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    return Card.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(card => {
            if (!card) throw new Error(`card with id ${id} not found`)

            card.id = id

            return card
        })
}