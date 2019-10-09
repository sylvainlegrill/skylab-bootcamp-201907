import logic from '../..'
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

    afterAll(() => database.disconnect())
})