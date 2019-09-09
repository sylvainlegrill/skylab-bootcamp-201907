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
        const result = await deleteMeeting(meeting.id, user.id)

        expect(result).not.to.exist

        const _meeting = await Meeting.findById(meeting.id)

        expect(_meeting).not.to.exist
    })

    after(() => database.disconnect())
})
