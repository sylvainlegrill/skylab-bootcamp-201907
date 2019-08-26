const { expect } = require('chai')
const logic = require('..')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - update vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, color, plate, id, body

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `${Math.floor(Math.random() * (2020 - 1950 + 1)) + 1950}`
        color = `color-${Math.random()}`
        plate = `plate-${Math.random()}`


        body = {
            brand: `brand-${Math.random()}`,
            model: `model-${Math.random()}`,
            year = `${Math.floor(Math.random() * (2020 - 1950 + 1)) + 1950}`,
            color: `color-${Math.random()}`,
            plate: `plate-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        return Vehicle.deleteMany()
            .then(() => Vehicle.create({ brand, model, year, color, plate }))
            .then(vehicle => id = vehicle.id)
    })

    it('should succeed on correct data', () =>
        logic.updatevehicle(id, body)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findById(id)
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(body.brand)
                expect(vehicle.model).to.equal(body.model)
                expect(vehicle.year).to.equal(body.year)
                expect(vehicle.color).to.equal(body.color)
                expect(vehicle.plate).to.equal(body.plate)
                expect(vehicle.extra).not.to.exist
            })
    )

    it('should fail on non-existing vehicle', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.updatevehicle(id, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`vehicle with id ${id} does not exist`))
    })

    after(() => mongoose.disconnect())
})