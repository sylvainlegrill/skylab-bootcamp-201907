const { expect } = require('chai')
const logic = require('..')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - retrieve vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, color, id


    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `year-${Math.random()}@domain.com`
        color = `color-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => Vehicle.create({ brand, model, year, color }))
            .then(vehicle => id = vehicle.id)
    })

    it('should succeed on correct data', () =>
        logic.retrieveVehicle(id)
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(id)
                expect(vehicle._id).not.to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.color).to.equal(color)
            })
    )

    after(() => mongoose.disconnect())
})