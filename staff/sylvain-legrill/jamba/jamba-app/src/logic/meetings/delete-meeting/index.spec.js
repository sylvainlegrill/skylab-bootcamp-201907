import deleteMeeting from '.'
import logic from '../../index'
import jwt from 'jsonwebtoken'
import {database, models} from 'jamba-data'


const { random } = Math
const { User, Meeting } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - delete meeting', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let user, architect, date, address, meeting, userId, meetingId

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

        date = new Date()
        address = `address-${random()}`

        meeting = await Meeting.create({
            date, address, user: user.id, architect: architect.id
        })
        meetingId = meeting.id

        userId = user._id.toString()

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

        
    

        
    })

    it('should succeed on correct data', async () => {
        const result = await logic.deleteMeeting(meetingId)
        expect(result)

        const meeting = await Meeting.findById(meetingId)
        expect(meeting).toBeNull()
    })
    
    // it('should fail if on incorrect meeting id', async () =>{ 
    //     try{
    //         await deleteMeeting('5d7204963b3ea6a2f0c7a6a2', meetingId)

    //         throw Error('should not reach this point')
    //     }catch({message}) {
    //             expect(message).toBe(`meeting with id 5d7204963b3ea6a2f0c7a6a2 does not exist`)
    //         }
    // })

    it('should fail on wrong meeting id type', () => 
    expect(() => deleteMeeting(123)).toThrow(`meeting id with value 123 is not a string`)
    )
    it('should fail on wrong meeting id type', () => 
    expect(() => deleteMeeting(undefined)).toThrow(`meeting id with value undefined is not a string`)
    )



    afterAll(() => database.disconnect())
})