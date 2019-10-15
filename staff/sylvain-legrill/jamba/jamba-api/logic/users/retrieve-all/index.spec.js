require('dotenv').config()

const { expect } = require('chai')
const retrieveAll = require('.')
const { database, models: { User } } = require('jamba-data')
//const bcrypt = require('bcrypt')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all users', () => {
    before(() => database.connect(DB_URL_TEST))

    let name1 , surname1, email1, password1, phone1, city1, license1, specialty1, role1, name2 , surname2, email2, password2, phone2, city2, license2, specialty2, role2

    beforeEach(async() => {
        
            name1= `name-${Math.random()}`
            surname1= `surname-${Math.random()}`
            email1= `email-${Math.random()}@mail.com`
            password1= `password-${Math.random()}`
            phone1= `123-${Math.random()}`
            city1= `city-${Math.random()}`
            license1= `license-${Math.random()}`
            specialty1= `specialty-${Math.random()}`
            role1= "architect"
       
            name2= `name-${Math.random()}`
            surname2= `surname-${Math.random()}`
            email2= `email-${Math.random()}@mail.com`
            password2= `password-${Math.random()}`
            phone2= `123-${Math.random()}`
            city2= `city-${Math.random()}`
            license2= `license-${Math.random()}`
            specialty2= `specialty-${Math.random()}`
            role2= 'architect'

            await User.deleteMany()
            const user1= await User.create({name: name1, surname: surname1, email: email1, password: password1, phone: phone1, city: city1, license: license1, specialty: specialty1, role: role1})
            userId1 = user1.id

            const user2= await User.create({name: name2, surname: surname2, email: email2, password: password2, phone: phone2, city: city2, license: license2, specialty: specialty2, role: role2})
            userId2 = user2.id
        

    })

    it('should succeed on correct architect data ', async () => {
        
        const _role = 'architect'
        
        const architects = await retrieveAll( _role)

        expect(architects).to.exist
        expect(architects.length).to.equal(2)
        expect(architects[0]).to.exist
        expect(architects[1]).to.exist

    })

    it('should failed if role is customer ', async () => {
        
        const _role = 'customer'
        
        const architects = await retrieveAll( _role)

    
        expect(architects.length).to.equal(0)
        expect(architects[0]).not.to.exist
        expect(architects[1]).not.to.exist

    })

    after(() => database.disconnect())
})