const { expect } = require('chai')
const logic = require('../../.')

const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number , expiry

    beforeEach(() => {
        number = `${Math.pow(Math.floor(Math.random()),12)}`
        expiry = `${Math.floor(Math.random()*2000)}`
       
        return Card.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerUser(number, expiry)
            .then(result => {
                expect(result).not.to.exist

                return Card.findOne({ number })
            })
            .then(card => {
                expect(card).to.exist
                expect(card.number).to.equal(number)
                expect(card.number).to.be(number.length)
                expect(card.expiry).to.equal(expiry)
                expect(card.password).to.equal(password)
            })
    )

    after(() => mongoose.disconnect())
})