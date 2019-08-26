const { expect } = require('chai')
const logic = require('../../.')

const { Property } = require('../../data')
const mongoose = require('mongoose')


describe('logic - authenticate property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, owner, id

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = `${Math.random()*1000}`
        year = `year-${Math.random()}@domain.com`
        cadastre = `cadastre-${Math.random()}`
        owner = `owner-${Math.random()}`

        return Property.deleteMany()
            .then(() => Property.create({ address, m2, year, cadastre, owner })
                .then(property => id = property.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateProperty(cadastre, owner)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    after(() => mongoose.disconnect())
})