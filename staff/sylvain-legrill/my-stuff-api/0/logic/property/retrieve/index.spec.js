const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic retrieve property', () => {
    
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, propertyId

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        return Property.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(() => { return Property.create({ address, m2, year, cadastre}) })
            .then(property => { propertyId = property.id})
    })
    //////////////////

        it('should succeed on correct retrieve property', () =>
            logic.retrieveProperty(propertyId)
                .then(property => {
                    expect(property).to.exist
                    expect(property.id).to.equal(propertyId)
                    expect(property.address).to.equal(address)
                    expect(property.m2).to.equal(m2)
                    expect(property.year).to.equal(year)
                    expect(property.cadastre).to.equal(cadastre)
                    })
        )
        it('should fail if the id is not a string', () => 
        expect(() => logic.retrieveproperty(12345678).to.throw("id with value '12345678' is not a string"))
        )
        it('should fail if the id is empty or blank', () => 
        expect(() => logic.retrieveproperty().to.throw("id is empty or blank"))
        )


    after(() => mongoose.disconnect())
})