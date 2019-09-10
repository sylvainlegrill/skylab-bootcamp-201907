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
        describe('update user', () => {
            let id, name, surname, email, phone, city, license, specialty, password
            beforeEach(async () => {
                
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@domain.com`
                phone = `phone-${Math.random()}`
                city = `city-${Math.random()}`
                license = `license-${Math.random()}`
                specialty = `specialty-${Math.random()}`
                password = `password-${Math.random()}`
                const user = await User.create({name, surname, email, phone, city, license, specialty, password: await bcrypt.hash(password,10)})
                id = user.id
            })
        it('should succeed on correct user data', async () => {
            
            const user =  await updateUser(id, { name: 'newName', surname: 'newSurname', phone: 'newPhone', password: 'newPassword' })
                expect(user).not.to.exist
                
            const userUpdate = await User.findOne({ _id: id })
            
                expect(userUpdate).to.exist
                expect(userUpdate.name).to.equal('newName')
                expect(userUpdate.surname).to.equal('newSurname')
                expect(userUpdate.phone).to.equal('newPhone')
                expect(userUpdate.password).to.exist
                
        })

        it('should succeed on correct architect data', async () => {
            
            const user =  await updateUser(id, { name: 'newName', surname: 'newSurname', phone: 'newPhone', city:'newCity', license: 'newLicense', specialty:'newSpecialty', password: 'newPassword' })
                expect(user).not.to.exist
                
            const userUpdate = await User.findOne({ _id: id })
            
                expect(userUpdate).to.exist
                expect(userUpdate.name).to.equal('newName')
                expect(userUpdate.surname).to.equal('newSurname')
                expect(userUpdate.phone).to.equal('newPhone')
                expect(userUpdate.city).to.equal('newCity')
                expect(userUpdate.license).to.equal('newLicense')
                expect(userUpdate.password).to.exist              
        })
           
        })
   
    after(() => database.disconnect())

    
})
