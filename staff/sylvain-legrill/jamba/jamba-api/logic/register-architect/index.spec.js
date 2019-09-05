require('dotenv').config()

const { expect } = require('chai')
const registerArchitect= require('.')
const { database, models: { User } } = require('jamba-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, phone, license, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = number(600000000, 799999999)
        license = `license-${Math.random()}`
        password = `password-${Math.random()}`

        return User.deleteMany()
    })

    it('should succeed on correct data', () =>
    registerArchitect(name, surname, email, phone, license, password)
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
                expect(user.license).to.equal(license)
                expect(user.password).to.equal(password)
            })
    )

    after(() => database.disconnect())
})