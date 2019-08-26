const { expect } = require('chai')
const logic = require('..')
const { Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, owner

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = `${Math.floor(Math.random()*2000)}`
        year = `year-${Math.random()}`
        cadastre = `cadastre-${Math.random()}`

        return Property.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerProperty(address, m2, year, cadastre)
            .then(result => {
                expect(result).not.to.exist

                return Property.findOne({ cadastre })
            })
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(yeard)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owner).to.equal(owner)
                
            })
    )

    after(() => mongoose.disconnect())
})