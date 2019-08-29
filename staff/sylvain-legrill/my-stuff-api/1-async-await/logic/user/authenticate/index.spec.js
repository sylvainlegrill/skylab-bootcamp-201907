const { expect } = require('chai')
const logic = require('../../.')
const authenticateUser = require('.')

const { User } = require('../../../models')
const mongoose = require('mongoose')


describe('logic - authenticate user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user =  await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () =>{
        const _id = await logic.authenticateUser(email, password)
           
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
    })
    
    it('should fail on incorrect mail', async () => {
        try{
            await logic.authenticateUser("pepito@mail.com", password)
        }
        catch({message}){
            expect(message).to.equal('Wrong credentials.')
        }
    }
            
    )
    it('should fail on wrong password', async () => {

        try{
            await logic.authenticateUser(email, "123")
        }
        catch({message}){
            expect(message).to.equal('Wrong credentials.')
        }   
    } 

    )

    after(() => mongoose.disconnect())
})