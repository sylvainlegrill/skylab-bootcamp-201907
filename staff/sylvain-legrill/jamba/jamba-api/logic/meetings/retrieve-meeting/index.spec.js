require('dotenv').config()

const { expect } = require('chai')
const retrieveMeeting = require('.')
const { database, models: { User, Meeting } } = require('jamba-data')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve meeting', () => {
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

        date = new Date
        address = `address-${random()}`

        meeting = await Meeting.create({
            date, address, user: user.id, architect: architect.id
        })

        
    })

    it('should succeed on correct data', async () => {
        const _meeting = await retrieveMeeting(meeting.id)

        expect(_meeting).to.exist
        expect (_meeting.date).to.deep.equal(date)
        expect (_meeting.address).to.equal(address)
        expect (_meeting.user.toString()).to.equal(user.id)
        expect (_meeting.architect.toString()).to.equal(architect.id)
   
        
    })

    it('should fail if on incorrect meeting id', async () =>{ 
        try{
            await retrieveMeeting('5d7204963b3ea6a2f0c7a6a2')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`meeting with id 5d7204963b3ea6a2f0c7a6a2 does not exist`)
            }
    })

    it('should fail on wrong meeting id type', () => 
    expect(() => retrieveMeeting(123)).to.throw(`meeting id with value 123 is not a string`)
    )
    it('should fail on wrong meeting id type', () => 
    expect(() => retrieveMeeting(undefined)).to.throw(`meeting id with value undefined is not a string`)
)

    

    after(() => database.disconnect())
    
})