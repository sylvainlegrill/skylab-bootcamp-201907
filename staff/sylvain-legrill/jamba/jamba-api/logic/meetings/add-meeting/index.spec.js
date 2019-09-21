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
    })

    it('should succeed on correct data', async () => {
        const id = await addMeeting(date, address, user.id, architect.id)

        expect(id).to.be.a('string')
        expect(id).to.have.lengthOf(24)

        const meeting = await Meeting.findById(id)

        expect(meeting.date).to.deep.equal(date)
        expect(meeting.address).to.equal(address)
    })

   
    it('should fail on incorrect user id', async () =>{
        let wrongUserId = "5d74a0957005f2ab0c8d5645"
        try{
            await addMeeting(date, address, wrongUserId, architect.id)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d74a0957005f2ab0c8d5645 does not exist`)
        }
    })

    it('should fail on incorrect architect id', async () =>{
        let wrongArchitectId = "5d74a0957005f2ab0c8d5645"
        try{
            await addMeeting(date, address, user.id, wrongArchitectId)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`architect with id 5d74a0957005f2ab0c8d5645 does not exist`)
        }
    })



    it('should fail on empty date', () =>
        expect(() =>
            addMeeting('',address, user.id, architect.id)
        ).to.throw('date with value  is not a date')
    )

    it('should fail on undefined date', () =>
        expect(() =>
            addMeeting(undefined, address, user.id, architect.id)
        ).to.throw(`date with value undefined is not a date`)
    )

    it('should fail on empty address', () =>
        expect(() =>
            addMeeting(date,'', user.id, architect.id)
        ).to.throw('address is empty or blank')
    )

    it('should fail on undefined address', () =>
        expect(() =>
            addMeeting(date, undefined, user.id, architect.id)
        ).to.throw(`address with value undefined is not a string`)
    )


    after(() => database.disconnect())


})
