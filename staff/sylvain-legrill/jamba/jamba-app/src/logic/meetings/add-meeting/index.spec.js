// import addMeeting from '.'
// import jwt from 'jsonwebtoken'

// const { random } = Math
// const { database, models: { User, Meeting } } = require('jamba-data')
// const bcrypt = require('bcryptjs')


// // const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
// const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

// describe('logic - add meeting', () => {
//     let date, address, userId, architectId

//     beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

//     beforeEach(async () => {
//         date = new Date
//         address = `address-${random()}`
//         userId = `userId-${random()}@mail.com`
//         architectId = `architectId-${random()}`
      
//         await Meeting.deleteMany()
//     })

//     it('should succeed on correct data', async () => {
//         const response = await addMeeting(date, address, userId, architectId)

//         expect(response).toBeUndefined()

//         const meeting = await Meeting.findById({ meetingId })
        
//         expect(meeting).toBeDefined()
//         expect(meeting.date).toBe(date)
//         expect(meeting.userId).toBe(userId)
//         expect(meeting.architectId).toBe(architectId)

//         const match = await bcrypt.compare(password, user.password)
//         expect(match).toBeTruthy()
        
//         expect(user.role).toBe(role)
//         expect(user.city).toBe(city)
//         expect(user.license).toBe(license)
//         expect(user.specialty).toBe(specialty)
//         expect(user.profileImg).toBe(profileImg)
//         expect(user.portfolioUrl).toBe(portfolioUrl)
//         expect(user.projectImg).toBe(projectImg)
//         expect(user.description).toBe(description)

//         // expect(user.password).toBe(password)

        
//     })

//     afterAll(() => database.disconnect())
// })