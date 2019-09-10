require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('jamba-data')

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
        const user = await User.create({ name, surname, email, phone, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await unregisterUser(id, email, password)
        expect(result).not.to.exist
        const userFind = await User.findById(id)
        expect(userFind).not.to.exist
    })

    // it('should fail on unexisting user', () =>
    //     unregisterUser('5d5d5530531d455f75da9fF9', password)
    //         .then(() => { throw Error('should not reach this point') })
    //         .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    // )

    // it('should fail on existing user, but wrong password', () =>
    //     unregisterUser(id, 'wrong-password')
    //         .then(() => { throw Error('should not reach this point') })
    //         .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    // )

    after(() => database.disconnect())
})