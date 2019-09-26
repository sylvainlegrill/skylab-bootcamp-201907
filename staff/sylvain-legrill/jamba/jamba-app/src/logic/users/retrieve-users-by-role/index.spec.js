import logic from '../..'
import { database, models } from 'jamba-data'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - list all architects', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, phone, password, role, city, license, specialty, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = `phone-${Math.random()}`
        password = `password-${Math.random()}`
        role = `architect`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, phone, password, role, city, license, specialty })

        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>
        await logic.listAllArchitects()
            .then(user => {
                expect(user).toBeDefined()
                expect(user.id).toBe(id)
                expect(user._id).toBeUndefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.phone).toBe(phone)
                expect(user.password).toBeUndefined()
                expect(user.role).toBe("architect")
                expect(user.city).toBe(city)
                expect(user.license).toBe(license)
                expect(user.specialty).toBe(specialty)
                
            })
    )

    afterAll(() => database.disconnect())
})