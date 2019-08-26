const { expect } = require('chai')
const logic = require('../../.')

const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - unregister card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, password, id

    beforeEach(() => {
        number = `number-${Math.random()}`
        expiry = `expiry-${Math.random()}`
        password = `password-${Math.random()}`

        return Card.deleteMany()
            .then(() => Card.create({ number, expiry, password }))
            .then(card => id = card.id)
    })

    it('should succeed on correct data', () =>
        logic.unregisterCard(id, password)
            .then(result => {
                expect(result).not.to.exist

                return Card.findById(id)
            })
            .then(card => {
                expect(card).not.to.exist
            })
    )

    it('should fail on unexisting card', () =>
        logic.unregisterCard('5d5d5530531d455f75da9fF9', password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on existing card, but wrong password', () =>
        logic.unregisterCard(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    after(() => mongoose.disconnect())
})