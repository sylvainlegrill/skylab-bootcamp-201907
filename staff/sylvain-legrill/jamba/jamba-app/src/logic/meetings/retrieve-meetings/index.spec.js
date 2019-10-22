import retrieveMeetings from '.'
import logic from '../../index'
import jwt from 'jsonwebtoken'
import {database, models} from 'jamba-data'


const { random } = Math
const { User, Meeting } = models


// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve meetings', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description
    let date
    let address
    let userId
    let architectId
    let meeting , meetingId
    

    beforeEach(async () => { 
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        phone = `phone-${Math.random()}`
        password = `password-${Math.random()}`
        //role = `role-${Math.random()}`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`
        portfolioUrl = `portfolioUrl-${Math.random()}`
        projectImg = `projectImg-${Math.random()}`
        description = `description-${Math.random()}`

        date = new Date()
        address = `address-${Math.random()}`

        
        const user = await User.create({ name, surname, email, password, phone})
        userId = user.id  

        const architect = await User.create({name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description})
        architectId = architect.id

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
    })

    it('should succeed on correct data', async () => { 

        const meetings = await logic.retrieveMeetings(userId)

        expect(meetings).toBeDefined()
        expect(meetings).toBeInstanceOf(Object) 
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveMeetings(' ')
        } catch({ message }) {
            expect(message).toBe('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveMeetings(undefined)
        } catch({ message }) {
            expect(message).toBe("User id is undefined")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveMeetings(123)
        } catch({ message }) {
                expect(message).toBe("user with value 123 is not a string")
        }
    })
    afterAll(() => database.disconnect())
})
