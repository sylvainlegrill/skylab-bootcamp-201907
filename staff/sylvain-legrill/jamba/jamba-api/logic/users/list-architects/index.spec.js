require('dotenv').config()

const { expect } = require('chai')
const listArchitects = require('.')
const { database, models: { User } } = require('jamba-data')
//const bcrypt = require('bcrypt')

const { env: { DB_URL_TEST }} = process

describe('logic - list architects', () => {
    before(() => database.connect(DB_URL_TEST))

    let name1 , surname1, email1, password1, phone1, city1, license1, specialty1, role1, name2 , surname2, email2, password2, phone2, city2, license2, specialty2, role2

    beforeEach(async() => {
        
            name1= `name-${Math.random()}`
            surname1= `surname-${Math.random()}`
            email1= `email-${Math.random()}@mail.com`
            password1= `password-${Math.random()}`
            phone1= `123-${Math.random()}`
            city1= `Barcelona`
            license1= `license-${Math.random()}`
            specialty1= `residential`
            role1= "architect"
       
            name2= `name-${Math.random()}`
            surname2= `surname-${Math.random()}`
            email2= `email-${Math.random()}@mail.com`
            password2= `password-${Math.random()}`
            phone2= `123-${Math.random()}`
            city2= `Barcelona`
            license2= `license-${Math.random()}`
            specialty2= `residential`
            role2= 'architect'

            await User.deleteMany()
            const user1= await User.create({name: name1, surname: surname1, email: email1, password: password1, phone: phone1, city: city1, license: license1, specialty: specialty1, role: role1})
            userId1 = user1.id

            const user2= await User.create({name: name2, surname: surname2, email: email2, password: password2, phone: phone2, city: city2, license: license2, specialty: specialty2, role: role2})
            userId2 = user2.id
        

    })

    it('should succeed on correct architect data ', async () => {
        
        
        const architects = await listArchitects( 'Barcelona', 'residential' )

        expect(architects).to.exist
        expect(architects.length).to.equal(2)
        expect(architects[0].name).to.equal(name1)
        expect(architects[1].name).to.equal(name2)

    })


    it('should fail on missing city', () => {
        const city = ''

        expect(() => listArchitects(city,'residential')).to.throw(Error, `city is empty or blank`)
    })
    it('should fail on wrong city data type', () => {
        const city = 123

        expect(() => listArchitects(city,'residential')).to.throw(Error, `city with value 123 is not a string`)
    })

    it('should fail on missing specialty', () => {
        const specialty = ''

        expect(() => listArchitects('Barcelona', specialty )).to.throw(Error, `specialty is empty or blank`)
    })
    it('should fail on wrong specialty data type', () => {
        const specialty = 123

        expect(() => listArchitects('Barcelona', specialty )).to.throw(Error, `specialty with value 123 is not a string`)
    })

    

    after(() => database.disconnect())
})