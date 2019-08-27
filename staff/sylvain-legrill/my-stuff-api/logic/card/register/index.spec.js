const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe.only('logic - register card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
 
    let name,surname,email,password
    let id,number,expiry, cardId    
 
    beforeEach(() => {
              
                number = `1-${Math.random()}`
                expiry = `0${Math.floor(Math.random() * 9)}/0${Math.floor(Math.random() * 9)}`
                  

        return Card.deleteMany()
                     // Register user first to make sure it exists
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(user => id = user.id.toString()) 
                        
    })

    it('should succeed on correct data', () =>{        
        logic.registerCard(id,cardId)
        
            .then(card => { 
                  
                expect(card).to.exist
                expect(card.number).to.deep.equal(number)
                expect(card.expiry).to.equal(expiry)
            })}
    
        
    )


    it('should fail if there is no user', () => {
            logic.registerCard("5e624a1e0e56cb055f56d3d0", cardId)
               .catch( error =>{
                debugger
                   expect(error).to.exist
                   expect(error.message).to.equal(`User does not exists.`)
               })
           
            })


    it('should fail if there is no card', () =>{
        let x= '5d5d5530531d455f75da9fF9'
        logic.registerCard(id, x)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Card with id ${x} does not exist.`)
               })
    }) 

    it('should fail on empty number', () => {
        expect(() =>
            logic.registerCard("", number)
        ).to.throw('id is empty or blank')
    })

    it('should fail on undefined number', () => {
        expect(() =>
            logic.registerCard(undefined, number)
        ).to.throw(`id with value undefined is not a string`)
    })

    it('should fail on wrong data type', () => {
        expect(() =>
            logic.registerCard(123, number )
        ).to.throw(`id with value 123 is not a string`)
    })



    after(() => mongoose.disconnect())
})
