import getUserId from '.'
import logic from '../..'
import jwt from 'jsonwebtoken'

const { database, models: { User } } = require('jamba-data')
const { random } = Math


const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - get-user-id', () => {
    let name, surname, email, phone, password, role, id

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        phone = `phone-${random()}`
        password = `password-${random()}`
        role = `customer`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, phone, password, role })

        id = user.id


        const token = await jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        
        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
        const userId = await logic.getUserId()
        
        expect(userId).toBeDefined()
        expect(userId).toBe(id)
      
            
    }) 

    it('should fail on empty id', async () => {
        id = ''

        try {
            await logic.getUserId()
        } catch({message}) {
            expect(message).toBe('id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try {
            await logic.getUserId()
        } catch({message}) {
            expect(message).toBe('id with value undefined is not a string')
        }
    })

    it('should fail on wrong data type', async () => {
        id = 123

        try {
            await logic.getUserId()
        } catch({message}) {
            expect(message).toBe('id with value 123 is not a string')
        }
    })
    
    afterAll(() => database.disconnect())
})