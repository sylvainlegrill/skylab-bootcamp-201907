const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let make, model, year, type, color, electric, plate, id, vehicleId

    let name, surname, email, password

    beforeEach(() => {
        const typeArray = ['sedan', 'cabrio', 'truck']


        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })

            .then(user => id = user._id.toString())

            .then(() => { 
                const vehicle = new Vehicle({         
                make, 
                model,
                year,
                type,
                color,
                electric,
                plate 
                })
            vehicle.owner = id
            return vehicle.save()       
                .then(response => {
                    return vehicleId = response._id.toString()
                })         
            })
            
    })
    it('should succeed on correct vehicle DELETION', () =>
        logic.unregisterVehicle(vehicleId)
        .then(result => {
            expect(result).not.to.exist
                
            return Vehicle.findById(id)
        })
        .then(vehicle => {
            expect(vehicle).not.to.exist
        })
       
    )
    // it('should fail if the vehicle already exists', () =>
    //    Vehicle.create({ make, model, year, type, color, electric, plate })
    //        .then (() => logic.unregisterVehicle(id, make, model, year, type, color, electric, plate)
    //            .catch( error =>{
    //                expect(error).to.exist
    //                expect(error.message).to.equal(`Vehicle already exists.`)
    //            })
    //        )
    // )

    /* Following 3 tests 
    for every parameter passed to logic */

     it('should fail on empty id', () => 
        expect(() => 
               logic.unregisterVehicle("")
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined make', () => 
        expect(() => 
               logic.unregisterVehicle(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.unregisterVehicle(123)
    ).to.throw(`id with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})