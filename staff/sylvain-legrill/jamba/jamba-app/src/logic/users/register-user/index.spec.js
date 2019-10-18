import registerUser from '.'
import logic from '../../'
const { random } = Math
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
    let name, surname, email, phone, password, role

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        phone = `phone-${random()}`
        password = `password-${random()}`
        role = `customer`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const id = await registerUser(name, surname, email, phone, password, role)
        expect(id).toBeDefined()

        const user = await User.findOne({ email })
        expect(user).toBeDefined()
        // expect(user.id).toBe(id)
        
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.phone).toBe(phone)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
        
        expect(user.role).toBe(role)
        
    })

        // name
        it('should fail on empty name', async () => {
            name = ''
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('name is empty or blank')
            }
        })
    
        it('should fail on undefined name', async () => {
            name = undefined
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('name with value undefined is not a string')
            }
        })
    
        it('should fail on wrong name data type', async () => {
            name = 123
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('name with value 123 is not a string')
            }
        })
    
        // surname
        it('should fail on empty surname', async () => {
            surname = ''
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('surname is empty or blank')
            }
        })
    
        it('should fail on undefined surname', async () => {
            surname = undefined
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('surname with value undefined is not a string')
            }
        })
    
        it('should fail on wrong surname data type', async () => {
            surname = 123
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('surname with value 123 is not a string')
            }
        })
    
        // email
        it('should fail on empty email', async () => {
            email = ''
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('e-mail is empty or blank')
            }
        })
    
        it('should fail on undefined email', async () => {
            email = undefined
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('e-mail with value undefined is not a string')
            }
        })
    
        it('should fail on wrong email data type', async () => {
            email = 123
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('e-mail with value 123 is not a string')
            }
        })
    
        // password
        it('should fail on empty password', async () => {
            password = ''
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('password is empty or blank')
            }
        })
    
        it('should fail on undefined password', async () => {
            password = undefined
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('password with value undefined is not a string')
            }
        })
    
        it('should fail on wrong password data type', async () => {
            password = 123
    
            try {
                await logic.registerUser(name, surname, email, phone, password, role)
            } catch({message}) {
                expect(message).toBe('password with value 123 is not a string')
            }
        })
    

    afterAll(() => database.disconnect())
})