require('dotenv').config()

const { expect } = require('chai')
const registerUser= require('.')
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))


    let name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = `phone-${Math.random()}`
        password = `password-${Math.random()}`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`
        portfolioUrl = `portfolioUrl-${Math.random()}`
        projectImg = `projectImg-${Math.random()}`
        description = `description-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct architect data', async () =>{
        const result = await registerUser(name, surname, email, phone, password, "architect", city, license, specialty, portfolioUrl, projectImg, description)

        expect(result).to.exist
        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.phone).to.equal(phone)
        expect(user.password).to.exist
        expect(user.role).to.equal("architect")
        expect(user.city).to.equal(city)
        expect(user.license).to.equal(license)
        expect(user.specialty).to.equal(specialty)
        expect(user.portfolioUrl).to.equal(portfolioUrl)
        expect(user.projectImg).to.equal(projectImg)
        expect(user.description).to.equal(description)
        
    })
    it('should fail on empty architect data', async () =>{
        try{
            await registerUser(name, surname, email, phone, password, "architect")
        }catch(error){
            expect(error.message).to.equal("City cannot be empty for architect role")
        }
        
    })


    it('should succeed on correct customer data', async () =>{
        const result = await registerUser(name, surname, email, phone, password, "customer")

        expect(result).to.exist
        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.phone).to.equal(phone)
        expect(user.password).to.exist
        expect(user.role).to.equal("customer")
    })

    it('should fail if the mail already exists', async () => {
        await User.create({ name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description })
            try{
                await registerUser(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description )
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with e-mail ${email} already exists.`)
                }
    })

// Parameters for customers and architects

    it('should fail on empty email', () =>
        expect(() => registerUser(name, surname, "", phone, password, "customer")).to.throw('e-mail is empty or blank')
    )
    it('should fail on undefined email', () =>
        expect(() => registerUser(name, surname, undefined, phone, password, "customer")).to.throw('e-mail with value undefined is not a string')
    )

    it('should fail on wrong email format', () =>
        expect(() => registerUser(name, surname, 123, phone, password, "customer")).to.throw('e-mail with value 123 is not a string')
    )

    it('should fail on empty name', () =>
        expect(() => registerUser("", surname, email, phone, password, "customer")).to.throw('name is empty or blank')
    )

    it('should fail on undefined name', () =>
        expect(() => registerUser(undefined, surname, email, phone, password, "customer")).to.throw('name with value undefined is not a string')
    )

    it('should fail on wrong name format', () =>
        expect(() => registerUser(123, surname, email, phone, password, "customer")).to.throw('name with value 123 is not a string')
    )
    it('should fail on empty surname', () =>
        expect(() => registerUser(name, "", email, phone, password, "customer")).to.throw('surname is empty or blank')
    )

    it('should fail on undefined surname', () =>
        expect(() => registerUser(name, undefined, email, phone, password, "customer")).to.throw('surname with value undefined is not a string')
    )

    it('should fail on wrong surname format', () =>
        expect(() => registerUser(name, 123, email, phone, password, "customer")).to.throw('surname with value 123 is not a string')
    )
    it('should fail on empty phone', () =>
        expect(() => registerUser(name, surname, email, "", password, "customer")).to.throw('phone is empty or blank')
    )

    it('should fail on undefined phone', () =>
        expect(() => registerUser(name, surname, email, undefined, password, "customer")).to.throw('phone with value undefined is not a string')
    )

    it('should fail on wrong phone format', () =>
        expect(() => registerUser(name, surname, email, true, password, "customer")).to.throw('phone with value true is not a string')
    )
    it('should fail on empty password', () =>
        expect(() => registerUser(name, surname, email, phone, "", "customer")).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
    expect(() => registerUser(name, surname, email, password, undefined, "customer")).to.throw('password with value undefined is not a string')
    )

    it('should fail on wrong password format', () =>
        expect(() => registerUser(surname, surname, email, phone, 123, "customer")).to.throw('password with value 123 is not a string')

        )
    it('should fail on empty role', () =>
        expect(() => registerUser(name, surname, email, phone, password, "")).to.throw('role is empty or blank')
    )

    it('should fail on undefined role', () =>
    expect(() => registerUser(name, surname, email, password, password, undefined)).to.throw('role with value undefined is not a string')
    )

    it('should fail on wrong role format', () =>
        expect(() => registerUser(surname, surname, email, phone, password, 123)).to.throw('role with value 123 is not a string')

        )



  
        after(() => database.disconnect())
})