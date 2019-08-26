const { expect } = require('chai')
const logic = require('..')
const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - update card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, id, body

    beforeEach(() => {
        number = `${Math.pow(Math.floor(Math.random()),12)}`
        expiry = `${Math.floor(Math.random()*2000)}`

        body = {
            number = `${Math.pow(Math.floor(Math.random()),12)}`,
            expiry = `${Math.floor(Math.random()*2000)}`,
            extra: `extra-${Math.random()}`
        }

        return Card.deleteMany()
            .then(() => Card.create({ number, expiry, password }))
            .then(card => id = card.id)
    })

    it('should succeed on correct data', () =>
        logic.updatecard(id, body)
            .then(result => {
                expect(result).not.to.exist

                return Card.findById(id)
            })
            .then(card => {
                expect(card).to.exist
                expect(card.number).to.equal(body.number)
                expect(card.expiry).to.equal(body.expiry)
                expect(card.extra).not.to.exist
            })
    )

    it('should fail on non-existing card', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.updatecard(id, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`card with id ${id} does not exist`))
    })

    after(() => mongoose.disconnect())
})