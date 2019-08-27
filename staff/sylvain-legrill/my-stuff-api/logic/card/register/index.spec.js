const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../../')

describe('logic -', () => {
    let client, users

    before(() => {

       client = new MongoClient('mongodb://localhost', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('register', () => {
        let name, surname, email, password, repassword

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
        })

        it('should succeed on correct data', () =>
        logic.registerUser(number, expiry)
            .then(result => {
                expect(result).not.to.exist

                return Card.findOne({ number })
            })
            .then(card => {
                expect(card).to.exist
                expect(card.number).to.equal(number)
                expect(card.number).to.be(number.length)
                expect(card.expiry).to.equal(expiry)
                expect(card.password).to.equal(password)
            })
    )
    })

    after(() => client.close())
})