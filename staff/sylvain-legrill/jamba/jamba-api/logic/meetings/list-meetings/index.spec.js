require('dotenv').config()

const { expect } = require('chai')
const listMeetings = require('.')
const { database, models: { User, Meeting } } = require('jamba-data')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - list meeting(s)', () => {

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

    // it('should succeed on correct data', async () => {

    //     const result = await listMeetings(meeting.id, user.id)

    //     expect (result).to.exist

    //     const _meeting = await Meeting.find(meeting)

    //     expect(_meeting).to.exist
    // })

    it('should succeed on correct data', async () => {
        const id = await listMeetings(date, address, user.id, architect.id)

        expect(id).to.be.a('string')
        expect(id).to.have.lengthOf(24)

        const meeting = await Meeting.findById(id)

        expect(meeting.date).to.deep.equal(date)
        expect(meeting.address).to.equal(address)
    })


    after(() => database.disconnect())
})
