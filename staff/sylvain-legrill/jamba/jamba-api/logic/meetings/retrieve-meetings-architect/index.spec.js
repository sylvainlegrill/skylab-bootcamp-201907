require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const retrieveMeetingsArchitect = require('.')
const { database, models: { User, Meeting } } = require('jamba-data')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve meetings architect', () => {

    before(() => database.connect(DB_URL_TEST))

    let  date, address, user, architect, meeting

    beforeEach(async () => {
        await Promise.all([User.deleteMany(), Meeting.deleteMany()])

        date = new Date

        address = `address-${random()}`

        user = await User.create({
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            password: `password-${random()}`,
            phone: `123-${random()}`
        })

        architect = await User.create({
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            phone: `123-${random()}`,
            password: `password-${random()}`,
            role: 'architect',
            city: `city-${random()}`,
            license: `license-${random()}`,
            specialty: `specialty-${random()}`,
            profileImg: `profileImg-${random()}`,
            portfolioUrl: `portfolioUrl-${random()}`,
            projectImg: `projectImg-${random()}`,
            description: `description-${random()}`
        }) 

        // meeting = await Meeting.create({
        //     date, address, user: user.id, architect: architect.id
        // })
        architectId = architect._id.toString()

    

    })

    it('should succeed on correct data', async () => {

        const meetings = await retrieveMeetingsArchitect(architectId)

        expect (meetings).to.exist

        // const _meeting = await Meeting.find(meeting)

        // expect(_meeting).to.exist
    })


    it('should fail on empty id', async () => {
        try{
            await logic.retrieveMeetingsArchitect(' ')
        } catch({ message }) {
            expect(message).to.equal('architect id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveMeetingsArchitect(undefined)
        } catch({ message }) {
            expect(message).to.equal("architect id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveMeetingsArchitect(123)
        } catch({ message }) {
                expect(message).to.equal("architect id with value 123 is not a string")
        }
    })



    after(() => database.disconnect())
})
