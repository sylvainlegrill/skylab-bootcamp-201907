import retrieveMeetingsArchitect from '.'
import logic from '../../index'
import jwt from 'jsonwebtoken'
import {database, models} from 'jamba-data'


const { random } = Math
const { User, Meeting } = models


// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve meetings of an architect', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let nameCustomer, surnameCustomer, emailCustomer, phoneCustomer, passwordCustomer
    let nameCustomer2, surnameCustomer2, emailCustomer2, phoneCustomer2, passwordCustomer2
    let nameArchitect, surnameArchitect, emailArchitect, phoneArchitect, passwordArchitect, city, license, specialty, portfolioUrl, projectImg, description
    let date
    let date1
    let date2
    let address
    let address1
    let address2
    let userId
    let userId1
    let userId2
    let architectId
    let meetingId
    

    beforeEach(async () => { 

        // create user meeting 1
        nameCustomer = `nameCustomer-${Math.random()}`
        surnameCustomer = `surnameCustomer-${Math.random()}`
        emailCustomer = `emailCustomer-${Math.random()}@email.com`
        phoneCustomer = `phoneCustomer-${Math.random()}`
        passwordCustomer = `passwordCustomer-${Math.random()}`
        //role = `role-${Math.random()}`

        // create user meeting 2
        nameCustomer2 = `nameCustomer2-${Math.random()}`
        surnameCustomer2 = `surnameCustomer-${Math.random()}`
        emailCustomer2 = `emailCustomer2-${Math.random()}@email.com`
        phoneCustomer2 = `phoneCustomer2-${Math.random()}`
        passwordCustomer2 = `passwordCustomer2-${Math.random()}`


        nameArchitect = `nameArchitect-${Math.random()}`
        surnameArchitect = `surnameArchitect-${Math.random()}`
        emailArchitect = `emailArchitect-${Math.random()}@email.com`
        phoneArchitect = `phoneArchitect-${Math.random()}`
        passwordArchitect = `passwordArchitect-${Math.random()}`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`
        portfolioUrl = `portfolioUrl-${Math.random()}`
        projectImg = `projectImg-${Math.random()}`
        description = `description-${Math.random()}`

        date1 = new Date()
        address1 = `address1-${Math.random()}`

        date2 = new Date()
        address2 = `address2-${Math.random()}`

        await User.deleteMany()
        
        const user = await User.create({ name: nameCustomer, surname: surnameCustomer, email: emailCustomer, phone: phoneCustomer, password: passwordCustomer})
        userId1 = user.id  
        const user2 = await User.create({ name: nameCustomer2, surname: surnameCustomer2, email: emailCustomer2, phone: phoneCustomer2, password: passwordCustomer2})
        userId2 = user2.id  

        const architect = await User.create({ name: nameArchitect, surname: surnameArchitect, email: emailArchitect, phone: phoneArchitect, password: passwordArchitect, city, license, specialty, portfolioUrl, projectImg, description})
        architectId = architect.id

        
        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token

        await Meeting.deleteMany()

        const meeting1= await Meeting.create({ date: date1, address: address1, userId: userId1, architectId: architectId}) 
        const meeting2= await Meeting.create({ date: date2, address: address2, userId: userId2, architectId: architectId}) 
    })

    it('should succeed on correct data', async () => { 


        const response = await logic.retrieveMeetingsArchitect(architectId)

        expect(response).toBeUndefined()   
        
        return ( async () => { 

            const architect = await await User.findOne({ _id: userId , role: "architect"})
            
            //architect
            expect(architect).toBeDefined()
            expect(architect).toBeInstanceOf(Object) 
            expect(architect._id.toString()).toEqual(userId)

            //architect meetings

            architect.meetings.forEach( meeting =>{
                expect (meeting.date).toBe(date)
                expect (typeof meeting.date).toBe(Date)

                expect (meeting.address).toBe(address)
                expect (typeof meeting.address).toBe(String)

                expect (meeting.userId).toBe(userId)

            })
            
        })
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveMeetingsArchitect(' ')
        } catch({ message }) {
            expect(message).toBe('architect id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveMeetingsArchitect(undefined)
        } catch({ message }) {
            expect(message).toBe("User id is undefined")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveMeetingsArchitect(123)
        } catch({ message }) {
                expect(message).toBe("user with value 123 is not a string")
        }
    })
    afterAll(() => database.disconnect())
})
