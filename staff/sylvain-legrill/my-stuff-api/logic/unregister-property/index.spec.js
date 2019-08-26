const { expect } = require('chai')
const logic = require('..')
const { Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, owner, password, id

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = `${Math.random()*1000}`
        year = `year-${Math.random()}@domain.com`
        cadastre = `cadastre-${Math.random()}`
        owner = `owner-${Math.random()}`
        password = `password-${Math.random()}`
        

        return Property.deleteMany()
            .then(() => Property.create({ address, m2, year, cadastre, owner, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                return Property.findById(id)
            })
            .then(user => {
                expect(user).not.to.exist
            })
    )

    it('should fail on unexisting user', () =>
        logic.unregisterUser('5d5d5530531d455f75da9fF9', password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on existing user, but wrong password', () =>
        logic.unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    after(() => mongoose.disconnect())
})