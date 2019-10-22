require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, phone, password,  id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = `phone-${Math.random()}`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, phone, password: hash })
        id = user.id
    })

    it('should succeed on correct data', () =>
        unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findById(id)
            })
            .then(user => {
                expect(user).not.to.exist
            })
    )

    it('should fail on unexisting user', () => {
        const id = '5d5d5530531d455f75da9fF9'

        unregisterUser(id, password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`user with id ${id} does not exist`))
    })

    it('should fail on existing user, but wrong password', () =>
        unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on empty id', () =>
        expect(() => unregisterUser("", password)).to.throw('id is empty or blank')
    )
    it('should fail on undefined id', () =>
        expect(() => unregisterUser(undefined, password)).to.throw('id with value undefined is not a string')
    )
    it('should fail on wrong id type', () =>
        expect(() => unregisterUser(true, password)).to.throw('id with value true is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => unregisterUser(id, "")).to.throw('password is empty or blank')
    )
    it('should fail on undefined password', () =>
        expect(() => unregisterUser(id, undefined)).to.throw('password with value undefined is not a string')
    )
    it('should fail on wrong password type', () =>
        expect(() => unregisterUser(id, true)).to.throw('password with value true is not a string')
    )

    after(() => database.disconnect())
})