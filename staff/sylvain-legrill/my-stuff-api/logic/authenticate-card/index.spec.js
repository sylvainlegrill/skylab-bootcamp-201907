const { expect } = require('chai')
const logic = require('..')
const { Card } = require('../../data')
const mongoose = require('mongoose')


describe('logic - authenticate card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, id

    beforeEach(() => {
        number = `${Math.pow(Math.floor(Math.random()),12)}`
        expiry = `${Math.floor(Math.random()*2000)}`

        return Card.deleteMany()
            .then(() => Card.create({ number, expiry })
                .then(card => id = card.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateCard(number, expiry)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    after(() => mongoose.disconnect())
})