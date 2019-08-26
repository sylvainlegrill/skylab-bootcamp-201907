const { expect } = require('chai')
const logic = require('..')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, color, plate, password, id

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `year-${Math.random()}@domain.com`
        color = `color-${Math.random()}`
        plate = `plate-${Math.random()}`
        password = `password-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => Vehicle.create({ brand, model, year, color, plate, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findById(id)
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