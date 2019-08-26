const { expect } = require('chai')
const logic = require('..')
const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - retrieve card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, id

    beforeEach(() => {
        number = `${Math.pow(Math.floor(Math.random()),12)}`
        date = `${Math.floor(Math.random()*2000)}`
       

        return Card.deleteMany()
            .then(() => Card.create({ number, expiry}))
            .then(card => id = card.id)
    })

    it('should succeed on correct data', () =>
        logic.retrieveCard(id)
            .then(card => {
                expect(card).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(card.number).to.equal(number)
                expect(card.expiry).to.equal(expiry)
            })
    )

    after(() => mongoose.disconnect())
})