import addMeeting from '.'
import logic from '../../index'
import jwt from 'jsonwebtoken'
import {database, models} from 'jamba-data'


// const { random } = Math
const { User, Meeting } = models
const bcrypt = require('bcryptjs')


// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - add meeting', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description
    let date
    let address
    let userId
    let architectId
    

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

        await User.deleteMany()
        await Meeting.deleteMany()
        
        const user = await User.create({ name, surname, email, password, phone})
        userId = user.id  

        const architect = await User.create({name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description})
        architectId = architect.id
        
        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
                
        const id = await logic.addMeeting(date, address, userId, architectId)
          expect(id).toBeDefined()

        const meeting = await Meeting.findById(id)
            expect(meeting).toBeDefined()
            // expect(meeting.date).toBe(date)
            // expect(meeting.address).toBe(address)
            // expect(meeting.team).toBeDefined()
            // expect(meeting.name).toBe(namemeeting)
            // expect(meeting.code).toBe(code)
            // expect(meeting.participants.length).toBe(1)
            // expect(meeting.participants[0].toString()).toBe(id)
      
    })

    // it('should fail on incorrect user id', async () =>{
    //     let wrongUserId = "5d74a0957005f2ab0c8d5645"
    //     
    //     try{
    //         await logic.addMeeting(date, address, wrongUserId, architectId)
    //         throw new Error('should not reach this point')
    //     } catch(error) {
    //         expect(error).toBeTruthy()
    //         expect(error.message).toBe(`user with id 5d74a0957005f2ab0c8d5645 does not exist`)
    //     }
    // })

  
    // it('should fail on empty userId', () =>
    //     expect(() =>
    //         logic.addMeeting(date,address, "", architectId)
    //     ).toBe('user id is empty or blank')
    // )
    // it('should fail on empty architectId', () =>
    //     expect(() =>
    //         addMeeting(date,address, userId, "")
    //     ).toThrow('architect id is empty or blank')
    // )



    // it('should fail on empty date', () =>
    //     expect(() =>
    //         logic.addMeeting('',address, userId, architectId)
    //     ).toThrow('date with value  is not a date')
    // )

    // it('should fail on undefined date', () =>
    //     expect(() =>
    //         logic.addMeeting(undefined, address, userId, architectId)
    //     ).toThrow(`date with value undefined is not a date`)
    // )

    // it('should fail on empty address', () =>
    //     expect(() =>
    //         logic.addMeeting(date,'', userId, architectId)
    //     ).toThrow('address is empty or blank')
    // )

    // it('should fail on undefined address', () =>
    //     expect(() =>
    //         logic.addMeeting(date, undefined, userId, architectId)
    //     ).toThrow(`address with value undefined is not a string`)
    // )


    afterAll(() => database.disconnect())
})


// describe('logic - add meeting', () => {

//     beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
//     let user, architect, date, address, id

   
//     beforeEach(async () => {
//         await Promise.all([User.deleteMany(), Meeting.deleteMany()])

//             user = await User.create({
//             name: `name-${random()}`,
//             surname: `surname-${random()}`,
//             email: `email-${random()}@mail.com`,
//             password: `password-${random()}`,
//             phone: `123-${random()}`
//         })
//             id = user.id

//             architect = await User.create({
//             name: `name-${random()}`,
//             surname: `surname-${random()}`,
//             email: `email-${random()}@mail.com`,
//             phone: `123-${random()}`,
//             password: `password-${random()}`,
//             role: 'architect',
//             city: `city-${random()}`,
//             license: `license-${random()}`,
//             specialty: `specialty-${random()}`,
//             profileImg: `profileImg-${random()}`,
//             portfolioUrl: `portfolioUrl-${random()}`,
//             projectImg: `projectImg-${random()}`,
//             description: `description-${random()}`
            
//         })

//             date = new Date
//             address = `address-${random()}`


//             const token = await jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

//             logic.__token__ = token
//     })

    

//     it('should succeed on correct data', async () => {
//         const meetingId = await addMeeting(date, address, user.id, architect.id)

//         expect(meetingId).toBedefined()

//         const meeting = await Meeting.findById({ meetingId })
        
       
//         expect(meeting.date).to.Be(date) //to.deep.equal
//         expect(meeting.address).to.Be(address)
//         // expect(user.password).toBe(password)

        
//     })

//     afterAll(() => database.disconnect())

// })