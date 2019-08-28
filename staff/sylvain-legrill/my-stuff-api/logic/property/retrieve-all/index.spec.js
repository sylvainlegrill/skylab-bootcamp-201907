const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../models')

describe('logic retrieve all properties', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', {
        useNewUrlParser: true
    }))

    let id, address, m2, year, cadastre, propertiesId
    let name, surname, email, password

    beforeEach(() => {
        
        address = `address-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`
    
        return Property.deleteMany()
        .then(() => {

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return User.create({
                name,
                surname,
                email,
                password
            })

        })
        .then(user => {
            id = user.id
            return Property.create({ address, m2, year, cadastre})
            })
            .then(() => {
                return Property.create({ address, m2, year, cadastre})
            }) 
            
            .then(properties => {   
                propertiesId = properties.id
            })
    })

   
    it('should succeed on correct retrieve all property', () =>
        logic.retrieveAllProperties(id)
        .then(properties => {
            properties.forEach(property => {
                expect(property).to.exist
                expect(property.id).to.equal(propertyId)
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
        })
        )
    it('should fail if the id is not string', () =>
        expect(()=>logic.retrieveAllProperties(12334455).to.throw(`id with value${'12334455'} is not a string`))            
        )
    it('should fail if the id is empty or blank', () => 
        expect(() => logic.retrieveAllProperties().to.throw("id is empty or blank"))
        )

    after(() => mongoose.disconnect())
    })