require('dotenv').config()

const { expect } = require('chai')
const retrieveArchitect = require('.')
const { database, models: { User } } = require('jamba-data')
// const bcrypt = require('bcrypt')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve architect', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        phone = `phone-${Math.random()}`
        password = `password-${Math.random()}`
        city = `city-${Math.random()}`
        license = `license-${Math.random()}`
        specialty = `specialty-${Math.random()}`
        profileImg = `profileImg-${Math.random()}`
        portfolioUrl = `portfolioUrl-${Math.random()}`
        projectImg = `projectImg-${Math.random()}`
        description = `description-${Math.random()}`
        role = 'architect'


        return (async () => {
            await User.deleteMany()
            const user = await User.create({ name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role })
            id = user.id
        })()
    })

    it('should succeed on correct data', async () => {
        const user = await retrieveArchitect(id)
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.phone).to.equal(phone)
            expect(user.password).not.to.exist
            expect(user.city).to.equal(city)
            expect(user.license).to.equal(license)
            expect(user.specialty).to.equal(specialty)
            expect(user.profileImg).to.equal(profileImg)
            expect(user.portfolioUrl).to.equal(portfolioUrl)
            expect(user.projectImg).to.equal(projectImg)
            expect(user.description).to.equal(description)
            expect(user.role).to.equal("architect")

        })

        it('should throw an error with a wrong id', async () =>{
            try{
                await retrieveArchitect("5d5fe532b4f3f827e6fc64f8")
                throw new Error('should not reach this point')
            }catch(error){
                expect(error).to.exist
                expect(error.message).to.equal(`User with id 5d5fe532b4f3f827e6fc64f8 not found`)
            }
        })
    
        it('should fail on empty user id', () =>
            expect(() => retrieveArchitect("")).to.throw('id is empty or blank')
        )
    
        it('should fail on undefined user id', () =>
        expect(() => retrieveArchitect(undefined)).to.throw('id with value undefined is not a string')
    )
    
        it('should fail on wrong user id type', () =>
            expect(() => retrieveArchitect(123)).to.throw('id with value 123 is not a string')
        )

       
    
    // it('should fail on empty id', () => {
    //     expect(() =>
    //         retrieveArchitect('')
    //     ).to.throw(Error, 'id is empty or blank')
    // })

    // it('should fail on empty id', () => {
    //     id = ''

    //     expect(() => retrieveArchitect(name, surname, email, phone, password)).to.throw(Error, `id is empty or blank`)
    // })


    // it('should fail on emtpy password', () => {
    //     expect(()=> 
    //         retrieveArchitect(undefined)
    //     ).to.throw(Error, 'id with value undefined is not a string')
    // })

    // it('should fail on non-valid email', () => {
    //     expect(()=> 
    //         retrieveArchitect(123)
    //     ).to.throw(Error, 'id with value 123 is not a string')
    // })

    // it('should fail on non-valid phone', () => {
    //     expect(()=> 
    //         retrieveArchitect(123)
    //     ).to.throw(Error, 'id with value 123 is not a string')
    // })

    after(() => database.disconnect())
})