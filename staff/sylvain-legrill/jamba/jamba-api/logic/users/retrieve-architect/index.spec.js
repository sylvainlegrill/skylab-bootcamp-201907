require('dotenv').config()

const { expect } = require('chai')
const retrieveArchitect = require('.')
const { database, models: { User } } = require('jamba-data')
// const bcrypt = require('bcrypt')

const { env: { DB_URL_TEST }} = process

describe.only('logic - retrieve architect', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, phone, password, city, license, specialty, role, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone= `phone-${Math.random()}`
        password = `password-${Math.random()}`
        city = "Barcelona"
        license = `license-${Math.random()}`
        specialty = "residential architect"
        role = "architect"
       


        return (async () => {
            await User.deleteMany()
            const user = await User.create({ name, surname, email, phone, password, city, license, specialty, role })
            id = user.id
        })()
    })

    it('should succeed on correct data', async () => {
        const user = await retrieveArchitect(id)
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.phone).to.equal(phone)
            expect(user.password).not.to.exist
            expect(user.city).to.equal(city)
            expect(user.license).to.equal(license)
            expect(user.specialty).to.equal(specialty)
            expect(user.role).to.equal("architect")
        })

       
    
    // it('should fail on empty id', () => {
    //     expect(() =>
    //         retrieveUser('')
    //     ).to.throw(Error, 'id is empty or blank')
    // })

    // it('should fail on empty id', () => {
    //     id = ''

    //     expect(() => retrieveUser(name, surname, email, phone, password)).to.throw(Error, `id is empty or blank`)
    // })


    // it('should fail on emtpy password', () => {
    //     expect(()=> 
    //         retrieveUser(undefined)
    //     ).to.throw(Error, 'id with value undefined is not a string')
    // })

    // it('should fail on non-valid email', () => {
    //     expect(()=> 
    //         retrieveUser(123)
    //     ).to.throw(Error, 'id with value 123 is not a string')
    // })

    // it('should fail on non-valid phone', () => {
    //     expect(()=> 
    //         retrieveUser(123)
    //     ).to.throw(Error, 'id with value 123 is not a string')
    // })

    after(() => database.disconnect())
})