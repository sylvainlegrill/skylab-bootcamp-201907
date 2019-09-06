require('dotenv').config()

const { expect } = require('chai')
const registerArchitect= require('.')
const { database, models: { User } } = require('jamba-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, phone, city, license, specialty, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = `phone-${Math.random()}`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`
        password = `password-${Math.random()}`

        return User.deleteMany()
    })

    it('should succeed on correct data', () =>
    registerArchitect(name, surname, email, phone, city, license, specialty, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.phone).to.equal(phone)
                expect(user.city).to.equal(city)
                expect(user.license).to.equal(license)
                expect(user.specialty).to.equal(specialty)
                expect(user.password).to.equal(password)
            })
    )

    after(() => database.disconnect())
})