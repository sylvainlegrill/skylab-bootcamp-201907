const { expect } = require('chai')
const logic = require('..')
const { Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - retrieve property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, owner, id

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = `${Math.random()*1000}`
        year = `year-${Math.random()}@domain.com`
        cadastre = `cadastre-${Math.random()}`
        owner = `owner-${Math.random()}`
        id = `id-${Math.random()}`

        return Property.deleteMany()
            .then(() => Property.create({ address, m2, year, cadastre, owner, id }))
            .then(property => id = property.id)
    })

    it('should succeed on correct data', () =>
        logic.retrieveProperty(id)
            .then(property => {
                expect(property).to.exist
                expect(property.id).to.equal(id)
                expect(property._id).not.to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owner).to.equal(owner)
            })
    )

    after(() => mongoose.disconnect())
})