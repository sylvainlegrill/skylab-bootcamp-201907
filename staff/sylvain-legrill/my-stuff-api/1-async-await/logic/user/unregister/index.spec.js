const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach( async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
            id = user.id

            // return User.deleteMany()
            // .then(() => User.create({ name, surname, email, password }))
            // .then(user => id = user.id)
    })

    it('should succeed on correct data', async () =>{

        const result = await logic.unregisterUser(id, password)
            expect(result).not.to.exist

            return User.findById(id)
    }
        logic.unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                await User.findById(id)

                return (user => {
                    expect(user).not.to.exist
                })
            })
            
    
//     logic.unregisterUser(id, password)
//     .then(result => {
//         expect(result).not.to.exist

//         return User.findById(id)
//     })
//     .then(user => {
//         expect(user).not.to.exist
//     })
// )

    it('should fail on unexisting user', () =>
        logic.unregisterUser('5d5d5530531d455f75da9fF9', password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('Wrong credentials'))
    )

    it('should fail on existing user, but wrong password', () =>
        logic.unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('Wrong credentials'))
    )

    after(() => mongoose.disconnect())
})