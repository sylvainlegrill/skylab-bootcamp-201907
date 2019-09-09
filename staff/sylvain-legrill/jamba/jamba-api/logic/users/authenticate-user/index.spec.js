require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('../authenticate-user')
const { database, models: { User } } = require('jamba-data')
//const bcrypt = require('bcrypt')

//const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    before(() => database.connect('mongodb://localhost/jamba'))


    let name, surname, email, password, phone, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        phone= `phone-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, phone })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await authenticateUser(email, password)
        
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })

    it('should fail on missing e-mail', () => {
        email = ''

        expect(() => authenticateUser(email, password)).to.throw(Error, `e-mail is empty or blank`)
    })

    it('should fail on wrong e-mail', async () => {
        email = 'invalid@mail.com'

        try {
            await authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal(`user with e-mail ${email} does not exist`)
        }
    })

    it('should fail on wrong password', async () => {
        password = 'wrong password'

        try {
            await authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong credentials')
        }
    })

    after(() => database.disconnect())
})