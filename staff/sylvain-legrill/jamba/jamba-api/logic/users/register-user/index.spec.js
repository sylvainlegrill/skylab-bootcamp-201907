require('dotenv').config()

const { expect } = require('chai')
const registerUser= require('.')
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))


    let name, surname, email, phone, password, city, license, specialty

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = `phone-${Math.random()}`
        password = `password-${Math.random()}`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`
       

        await User.deleteMany()
    })

    it('should succeed on correct architect data', async () =>{

    const result = await registerUser(name, surname, email, phone, password, "architect", city, license, specialty)
        expect(result).not.to.exist
        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.phone).to.equal(phone)
        expect(user.password).to.exist
        expect(user.city).to.equal(city)
        expect(user.license).to.equal(license)
        expect(user.specialty).to.equal(specialty)
        expect(user.role).to.equal("architect")
    })
    it('should fail on empty architect data', async () =>{
        try{
            await registerUser(name, surname, email, phone, password, "architect")
        }catch(error){
            expect(error.message).to.equal("City cannot be empty for architect role")
        }
        
    })
    

    

    after(() => database.disconnect())
})