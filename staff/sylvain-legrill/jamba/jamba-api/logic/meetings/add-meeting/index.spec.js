require('dotenv').config()

const { expect } = require('chai')
const addMeeting = require('.')
const { database, models: { User, Meeting } } = require('jamba-data')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - add meeting', () => {

    before(() => database.connect(DB_URL_TEST))

    let user, architect, date, address

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
    })

    it('should succeed on correct data', async () => {
        const id = await addMeeting(date, address, user.id, architect.id)

        expect(id).to.be.a('string')
        expect(id).to.have.lengthOf(24)

        const meeting = await Meeting.findById(id)

        expect(meeting.date).to.deep.equal(date)
        expect(meeting.address).to.equal(address)
    })

    after(() => database.disconnect())
})
