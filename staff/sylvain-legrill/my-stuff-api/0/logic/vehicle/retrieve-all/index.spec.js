const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../.')
const { Vehicle, User } = require('../../../models')

describe('logic retrieve-all vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', {
        useNewUrlParser: true
    }))

    let id, make, model, year, type, color, electric, plate, vehiclesId
    let name, surname, email, password
    
    beforeEach(() => {
        
        const typeArray = ['sedan', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']
        make = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Number((Math.random() * 1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `color-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `plate-${Math.floor(Math.random()*(899-100))}`

        return Vehicle.deleteMany()
        .then(() => {

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return User.create({
                name,
                surname,
                email,
                password
            })

        })
        .then(user => {
            id = user.id
            return Vehicle.create({ make, model, year, type, color, electric, plate})
        })
        .then(() => {
            return Vehicle.create({ make, model, year, type, color, electric, plate})
        }) 
        
        .then(vehicles => {   
            vehiclesId = vehicles.id
        })
    })

    it('should succeed on correct retrieve all vehicle', () =>
        logic.retrieveAllProperties(id)
        .then(vehicles => {
            vehicles.forEach(vehicle => {
            expect(vehicle).to.exist
            expect(vehicle.id).to.equal(vehicleId)
            expect(vehicle.make).to.equal(make)
            expect(vehicle.model).to.equal(model)
            expect(vehicle.year).to.equal(year)
            expect(vehicle.type).to.equal(type)
            expect(vehicle.color).to.equal(color)
            expect(vehicle.electric).to.equal(electric)})
        })
        )
        it('should fail if the id is not string', () =>
        expect(()=>logic.retrieveAllProperties(12334455).to.throw(`id with value${'12334455'} is not a string`))            
        )
        it('should fail if the id is empty or blank', () => 
        expect(() => logic.retrieveAllVehicles().to.throw("id is empty or blank")))

        after(() => mongoose.disconnect())
    })