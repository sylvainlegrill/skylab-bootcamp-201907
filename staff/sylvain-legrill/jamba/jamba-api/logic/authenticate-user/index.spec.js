const logic = require('../../.')
const { expect } = require('chai')
const { models , mongoose } = require('jamba-data')
const { User } = models

describe('logic - authenticate citizen', () => {

    before(() =>  mongoose.connect('mongodb://localhost/jamba-test', { useNewUrlParser: true }))
        
    let email, password

    beforeEach(async () => {
        email = `email@-${Math.random()}.com`
        password = `password-${Math.random()}`

        await user.deleteMany()
        const user = await user.create({email, password})
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.user.authenticate(email, password)

            expect(_id).to.exist
            expect(_id).to.be.a('string')
            expect(_id).to.equal(id)
    })

    after(() => mongoose.disconnect())
})