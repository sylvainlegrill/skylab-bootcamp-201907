const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - unregister card', () => {
    
    let name,surname,email,password
    let id,number,expiry, cardId


    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    
    beforeEach(() => {

                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                number = `1-${Math.random()}`
                expiry = `0${Math.floor(Math.random() * 9)}/0${Math.floor(Math.random() * 9)}`
                  

        return User.deleteMany()
                     // Register user first to make sure it exists
            .then(() => User.create({ name, surname, email, password }))
            .then(user =>{
                id = user.id 
                
                const card=new Card({id,number,expiry})
                cardId=card.id
                
                user.cards.push(card)
                return user.save() 
            })            
    })

    it('should succeed on correct data', () =>{        
        logic.card.unregister(id,cardId)
        
            .then(card => { 
                  
                expect(card).to.exist
                expect(card.number).to.deep.equal(number)
                expect(card.expiry).to.equal(expiry)
            })}
    
        
    )


    it('should fail if there is no user', () => {
            logic.card.unregister("5e624a1e0e56cb055f56d3d0", cardId)
               .catch( error =>{
                debugger
                   expect(error).to.exist
                   expect(error.message).to.equal(`User does not exists.`)
               })
           
            })


    it('should fail if there is no card', () =>{
        let x= '5d5d5530531d455f75da9fF9'
        logic.card.unregister(id, x)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Card with id ${x} does not exist.`)
               })
    }) 

    it('should fail on empty number', () => {
        expect(() =>
            logic.card.unregister("", number)
        ).to.throw('id is empty or blank')
    })

    it('should fail on undefined number', () => {
        expect(() =>
            logic.card.unregister(undefined, number)
        ).to.throw(`id with value undefined is not a string`)
    })

    it('should fail on wrong data type', () => {
        expect(() =>
            logic.card.unregister(123, number )
        ).to.throw(`id with value 123 is not a string`)
    })



    after(() => mongoose.disconnect())
})



// const mongoose = require('mongoose')
// const { expect } = require('chai')
// const logic = require('../.')
// const { User, Card } = require('../../../models')

// describe('logic - unregister card', () => {
//     let client, users

//     before(() => {

//        client = new MongoClient('mongodb://localhost', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }) 

//         return client.connect()
//             .then(() => {
//                 const db = client.db('skylab')

//                 users = db.collection('users')

//                 logic.__users__ = users
//             })
//     })

//     beforeEach(() => users.deleteMany())

//     describe('unregister user', () => {
//         let userId, name, surname, email, password

//         beforeEach(() => {
//             name = `name-${Math.random()}`
//             surname = `surname-${Math.random()}`
//             email = `email-${Math.random()}@domain.com`
//             password = `password-${Math.random()}`

//             // Register user first to make sure it exists
//             return users.insertOne({name, surname, email, password})
//                 .then(result => userId = result.insertedId.toString())
//         })

//         it('should succeed on correct data', () =>
//             logic.unregisterUser(userId)
//                 .then(user => {
//                     expect(user).to.exist
//                     expect(user.id).to.equal(userId)
//                     expect(user.name).to.equal(name)
//                     expect(user.surname).to.equal(surname)
//                     expect(user.email).to.equal(email)
//                     expect(user.password).not.to.exist
//             })
//         )
//     })

//     after(() => client.close())
// })

