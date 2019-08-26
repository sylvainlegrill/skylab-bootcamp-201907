const { expect } = require('chai')
const logic = require('..')
const { Property } = require('../../data')
const mongoose = require('mongoose')


describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, owner, id, body

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = `m2-${Math.random()}`
        year = `${Math.floor(Math.random() * (2020 - 1950 + 1)) + 1950}`
        cadastre = `cadastre-${Math.random()}`
        owner = `owner-${Math.random()}`

        body = {
            address: `address-${Math.random()}`,
            m2: `m2-${Math.random()}`,
            year: `year-${Math.random()}@domain.com`,
            cadastre: `cadastre-${Math.random()}`,
            owner = `owner-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        return Property.deleteMany()
            .then(() => Property.create({ address, m2, year, cadastre, owner }))
            .then(property => id = property.id)
    })

    it('should succeed on correct data', () =>
        logic.updateProperty(id, body)
            .then(result => {
                expect(result).not.to.exist

                return Property.findById(id)
            })
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(body.address)
                expect(property.m2).to.equal(body.m2)
                expect(property.year).to.equal(body.year)
                expect(property.cadastre).to.equal(body.cadastre)
                expect(property.owner).to.equal(body.owner)
                expect(property.extra).not.to.exist
            })
    )

    it('should fail on non-existing property', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.updateProperty(id, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`property with id ${id} does not exist`))
    })

    after(() => mongoose.disconnect())
})