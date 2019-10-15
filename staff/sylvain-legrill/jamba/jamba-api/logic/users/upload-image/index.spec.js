require('dotenv').config()

const { expect } = require('chai')
const uploadImage = require('.')
const { database, models: { User } } = require('jamba-data')
const fs = require('fs')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST } } = process

describe('logic - upload image', () => {
    before(() => database.connect(DB_URL_TEST))
    

    beforeEach(async() => {
        await User.deleteMany()
        })
        describe('upload image', () => {
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
                description = `descripRtion-${Math.random()}`
                password = `passworRd-${Math.random()}`
                const user = await User.create({name, surname, email, phone, city, license, specialty, profileImg, portfolioUrl, projectImg, description, password: await bcrypt.hash(password,10)})
                id = user.id


                profileImg = fs.createReadStream('./test/red.jpg')
    })

    it('should succeed on correct image', async () => {
        const result = await uploadImage(id, profileImg)

        expect(result).not.to.exist
        const user = await User.findById(id)
        
        expect(user).to.exist
        expect(user.profileImg).to.exist
        expect(user.profileImg).to.have.length.above(1)
            })
        

           
        })
    
    after(() => database.disconnect())
})
    