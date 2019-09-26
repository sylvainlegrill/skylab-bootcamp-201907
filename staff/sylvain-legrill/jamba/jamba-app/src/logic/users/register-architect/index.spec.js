import registerUser from '.'

const { random } = Math
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
    let name, surname, email, phone, password, city, license, specialty, profileImg , portfolioUrl, projectImg, description, role 

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        phone = `phone-${random()}`
        password = `password-${random()}`
        city= `city-${random()}`
        license= `license-${random()}`
        specialty = `specialty-${random()}`
        profileImg = `profileImg-${random()}`
        portfolioUrl = `portfolioUrl-${random()}`
        projectImg = `projectImg-${random()}`
        description = `description-${random()}`
        role = `architect`


        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(name, surname, email, phone, password, city, license, specialty, profileImg , portfolioUrl, projectImg, description, role )

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
        
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.phone).toBe(phone)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
        
        expect(user.city).toBe(city)
        expect(user.license).toBe(license)
        expect(user.specialty).toBe(specialty)
        expect(user.profileImg).toBe(profileImg)
        expect(user.portfolioUrl).toBe(portfolioUrl)
        expect(user.projectImg).toBe(projectImg)
        expect(user.description).toBe(description)
        expect(user.role).toBe(role)

        // expect(user.password).toBe(password)

        
    })

    afterAll(() => database.disconnect())
})