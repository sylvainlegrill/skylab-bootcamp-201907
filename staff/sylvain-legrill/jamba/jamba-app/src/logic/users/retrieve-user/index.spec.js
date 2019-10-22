import logic from '../..'
import retrieveUser from '.'
import { database, models } from 'jamba-data'
import jwt from 'jsonwebtoken'
const { random } = Math

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe.only('logic - retrieve user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, phone, password, role, id

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        phone = `phone-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = `customer`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, phone, password, role })

        id = user.id

        

        const token = await jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        
        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
        const user = await logic.retrieveUser()
        
        expect(user).toBeDefined()
        expect(user.id).toBe(id)
        expect(user._id).toBeUndefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBeUndefined()
            
    })

    // it('should throw an error with a wrong id', async () =>{
    //     try{
    //         
    //         await retrieveUser("5d5fe532b4f3f827e6fc64f8")
    //         throw new Error('should not reach this point')
    //     }catch(error){
    //         expect(error).toBeTruthy()
    //         expect(error.message).toBe(`User with id 5d5fe532b4f3f827e6fc64f8 does not exist.`)
    //     }
    // })

    it('should fail if the user does not exist', async () => {
           
        await User.create({ name, surname, email, phone, password, role })

        id = '5d772fb62bb54120d08d7a7b'

        try {
             await logic.retrieveUser(id)
        } catch(error) {
            
             expect(error).toBeDefined()
             expect(error.message).toBe(`user with id 5d772fb62bb54120d08d7a7b does not exist`)
        }
     })
    

    it('should fail if the id is empty', async () => {
           
        await User.create({ name, surname, email, phone, password, role })

        id = ''

        try {
             await logic.retrieveUser(id)
        } catch(error) {
            
             expect(error).toBeDefined()
             expect(error.message).toBe(`id is empty or blank`)
        }
     })
    // it('should fail on empty user id', () => 
    //     expect(() => retrieveUser("")).toThrow('id is empty or blank')
    // )

    // it('should fail on undefined user Id', () => 
    //     expect(() => 
    //         logic.retrieveUser(undefined)
    //  ).toThrow(`user id with value undefined is not a string`)
    // )

    // fit('should fail on undefined user id', () =>
    // expect(() => retrieveUser(undefined)).toBe(Error('id with value undefined is not a string'))
    // )

    // it('should fail on wrong user id type', () =>
    //     expect(() => retrieveUser(123)).toThrow('id with value 123 is not a string')
    // )


    afterAll(() => database.disconnect())
})