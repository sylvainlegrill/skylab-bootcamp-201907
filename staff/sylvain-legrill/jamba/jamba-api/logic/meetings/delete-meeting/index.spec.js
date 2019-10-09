require('dotenv').config()

const { expect } = require('chai')
const deleteMeeting = require('.')
const { database, models: { User, Meeting } } = require('jamba-data')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - delete meeting', () => {

    before(() => database.connect(DB_URL_TEST))

    let user, architect, date, address, meeting

    beforeEach(async () => {
        await Promise.all([User.deleteMany(), Meeting.deleteMany()])

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
            password: `password-${random()}`,
            phone: `123-${random()}`,
            role: 'architect'
        })

        date = new Date
        address = `address-${random()}`

        meeting = await Meeting.create({
            date, address, user: user.id, architect: architect.id
        })

        
    })

    it('should succeed on correct data', async () => {
        const result = await deleteMeeting(meeting.id)

        expect(result).not.to.exist

        const _meeting = await Meeting.findById(meeting.id)

        expect(_meeting).not.to.exist
    })
    it('should fail if on incorrect meeting id', async () =>{ 
        try{
            await deleteMeeting('5d7204963b3ea6a2f0c7a6a2')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`meeting with id 5d7204963b3ea6a2f0c7a6a2 does not exist`)
            }
    })

    it('should fail on wrong meeting id type', () => 
    expect(() => deleteMeeting(123)).to.throw(`meeting id with value 123 is not a string`)
    )
    it('should fail on wrong meeting id type', () => 
    expect(() => deleteMeeting(undefined)).to.throw(`meeting id with value undefined is not a string`)
    )



    after(() => database.disconnect())
})