require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    beforeEach(async() => {
        await User.deleteMany()
        })
        describe('update user', () => {debugger
            let id, name, surname, email, phone, city, license, specialty, profileImg, portfolioUrl, projectImg, description, password
            beforeEach(async () => {
                
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@domain.com`
                phone = `phone-${Math.random()}`
                city = `city-${Math.random()}`
                license = `license-${Math.random()}`
                specialty = `specialty-${Math.random()}`
                profileImg = `profileImg-${Math.random()}`
                portfolioUrl = `portfolio-${Math.random()}`
                projectImg = `profjectImg-${Math.random()}`
                description = `description-${Math.random()}`
                password = `password-${Math.random()}`
                const user = await User.create({name, surname, email, phone, city, license, specialty, profileImg, portfolioUrl, projectImg, description, password: await bcrypt.hash(password,10)})
                id = user.id
            })
        it('should succeed on correct architect data', async () => {debugger
            
            const user =  await updateUser(id, { name: 'newName', surname: 'newSurname', phone: 'newPhone', city: 'newCity', license: 'newLicense', specialty: 'newSpecialty', profileImg: 'newProfile', portfolioUrl: 'newPortfolio', projectImg: 'newProject', description: 'newDescription', password: 'newPassword' })
                expect(user).not.to.exist
                
            const userUpdate = await User.findOne({ _id: id })
            
                expect(userUpdate).to.exist
                expect(userUpdate.name).to.equal('newName')
                expect(userUpdate.surname).to.equal('newSurname')
                expect(userUpdate.phone).to.equal('newPhone')
                expect(userUpdate.city).to.equal('newCity')
                expect(userUpdate.license).to.equal('newLicense')
                expect(userUpdate.specialty).to.equal('newSpecialty')
                expect(userUpdate.profileImg).to.equal('newProfile')
                expect(userUpdate.portfolioUrl).to.equal('newPortfolio')
                expect(userUpdate.projectImg).to.equal('newProject')
                expect(userUpdate.description).to.equal('newDescription')
                expect(userUpdate.password).to.exist
                
        })

        it('should succeed on correct customer data', async () => {
            
            const user =  await updateUser(id, { name: 'newName', surname: 'newSurname', phone: 'newPhone',  password: 'newPassword' })
                expect(user).not.to.exist
                
            const userUpdate = await User.findOne({ _id: id })
            
                expect(userUpdate).to.exist
                expect(userUpdate.name).to.equal('newName')
                expect(userUpdate.surname).to.equal('newSurname')
                expect(userUpdate.phone).to.equal('newPhone')
                expect(userUpdate.password).to.exist              
        })
           
        })
   
    after(() => database.disconnect())

    
})
