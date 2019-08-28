const { expect } = require('chai')
const logic = require('../../.')

const { User, Property } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - register property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, address, m2, year, cadastre

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
            .then(user => id = user._id.toString())
        
    })

    it('should succeed on correct data', () =>
        logic.registerProperty(id, address, m2, year, cadastre)
            .then(result => {
                propertyId = result
                expect(propertyId).to.exist

                return Property.findOne({ cadastre })
            
            })
            .then( property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
    )

    it('should fail if the property already exists', () =>
       Property.create({ address, m2, year, cadastre })
           .then (() => logic.registerProperty(id, address, m2, year, cadastre)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Property already exists.`)
               })
           )
    )

    /* Following 3 tests 
    for every parameter passed to logic */

    it('should fail on empty address', () => 
        expect(() => 
               logic.registerProperty(id, '', m2, year, cadastre)
    ).to.throw('address is empty or blank')
    )
    it('should fail on empty cadastre', () => 
        expect(() => 
               logic.registerProperty(id, address, m2, year, '')
    ).to.throw('cadastre is empty or blank')
    )

     it('should fail on undefined address', () => 
        expect(() => 
               logic.registerProperty(id, undefined, m2, year, cadastre)
    ).to.throw(`address with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.registerProperty(id, 123, m2, year, cadastre)
    ).to.throw(`address with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})