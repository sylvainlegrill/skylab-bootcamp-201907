import logic from '../..'
import { database, models } from 'jamba-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe('logic - authenticate user', () => { 
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

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, phone, password: hash, role })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.authenticateUser(email, password)

        expect(result).toBeUndefined()

        const { __token__ } = logic

        expect(typeof __token__).toBe('string')
        expect(__token__.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(__token__, REACT_APP_JWT_SECRET_TEST)

        expect(sub).toBe(id)
    })

    it('should fail on wrong e-mail', async () => {
        email = 'invalid@mail.com'

        try {
            await logic.authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).toBe(`user with e-mail invalid@mail.com does not exist`)
        }
    })

    it('should fail on wrong password', async () => {
        password = 'wrong password'

        try {
            await logic.authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).toBe('wrong credentials')
        }
    })

    // email
    it('should fail on empty email', async () => {
        email = ''

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('e-mail is empty or blank')
        }
    })

    it('should fail on undefined email', async () => {
        email = undefined

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('e-mail with value undefined is not a string')
        }
    })

    it('should fail on wrong email data type', async () => {
        email = 123

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('e-mail with value 123 is not a string')
        }
    })

    // password
    it('should fail on empty password', async () => {
        password = ''

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('password is empty or blank')
        }
    })

    it('should fail on undefined password', async () => {
        password = undefined

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('password with value undefined is not a string')
        }
    })

    it('should fail on wrong password data type', async () => {
        password = 123

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('password with value 123 is not a string')
        }
    })

    afterAll(() => database.disconnect())
})