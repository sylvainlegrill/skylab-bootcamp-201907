const { expect } = require('chai')
const logic = require('../../.')

const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, color,plate

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `${Math.floor(Math.random() * (2020 - 1950 + 1)) + 1950}`
        color = `color-${Math.random()}`
        plate = `plate-${Math.random()}`

        return Vehicle.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerUser(brand, model, year, color, plate)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findOne({ plate })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.color).to.equal(color)
                expect(vehiclr.plate).to.equal(plate)
            })
    )

    after(() => mongoose.disconnect())
})