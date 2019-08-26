const { expect } = require('chai')
const logic = require('..')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')


describe('logic - authenticate vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, color, plate, id

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `${Math.floor(Math.random() * (2020 - 1950 + 1)) + 1950}`
        color = `color-${Math.random()}`
        plate = `plate-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => Vehicle.create({ brand, model, year, color, plate })
                .then(vehicle => id = vehicle.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateVehicle(plate)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    after(() => mongoose.disconnect())
})