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
            password: `password-${random()}`,
            phone: `123-${random()}`,
            city: `city-${random()}`,
            license: `license-${random()}`,   
            specialty: `specialty-${random()}`,   
            role: 'architect'
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

    after(() => database.disconnect())
    
})