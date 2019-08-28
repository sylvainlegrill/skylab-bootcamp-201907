const { MongoClient, ObjectId } = require('mongodb')
const { expect } = require('chai')
const logic = require('../../')

describe('logic', () => {

    let client, users

    before(() => {

        client = new MongoClient('mongodb://localhost', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return client.connect()
            .then(() => {
                const db = client.db('skylab')
                users = db.collection('users')
                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('unregister Owner', () => {
        let name, surname, email, password, repassword
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should remove user on correct data', () => {
            logic.unregisterUser(id, email, password)
                .then(response => {
                    expect(response).to.exist
                    expect(response.deletedCount).to.equal(1)
                    return users.findOne({ _id: ObjectId(id) })
                }).then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
                .catch(error => expect(error).not.to.exist)
            })
            it('should fail if there is no owner', () => {
                logic.unregisterPropertyOwner("5e624a1e0e56cb055f56d3d0", id)
                    .catch( error =>{
                        expect(error).to.exist
                        expect(error.message).to.equal(`User does not exists.`)
                    })
                
                })
        
        
            it('should fail if there is no property', () =>{
                let x= '5d5d5530531d455f75da9fF9'
                logic.unregisterPropertyOwner(id, x)
                       .catch( error =>{
                           expect(error).to.exist
                           expect(error.message).to.equal(`Property with id ${x} does not exist.`)
                       })
            }) 
        
            it('should fail on wrong data type', () => {
                expect(() =>
                    logic.unregisterPropertyOwner(123)
                ).to.throw(`id with value 123 is not a string`)
            })
    })

    

    after(() => client.close())

})