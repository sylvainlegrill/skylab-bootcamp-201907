const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - register user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
    })

    it('should succeed on correct data', async () =>{
       
        const result = await logic.registerUser(name, surname, email, password)
        
            expect(result).not.to.exist

            await User.findOne({ email }) //
        
            return (user => { //
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)
        })
    })

    it('should fail if the email already exists', async () => {
        try{
           User.create({name, surname, email, password})
           await logic.registerUser(name, surname, email, password)
        }
        catch({message}){
            expect(message).to.equal(`user with email ${email} already exists`)

        }

    }
    
    )
    after(() => mongoose.disconnect())
})