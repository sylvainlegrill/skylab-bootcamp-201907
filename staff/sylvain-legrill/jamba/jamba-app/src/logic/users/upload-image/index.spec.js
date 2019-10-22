import uploadImage from '.'
import logic from '../../index'
import { database, models } from 'jamba-data'
import jwt from 'jsonwebtoken'
const fs = require('fs')
const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - upload image', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    

    beforeEach(async() => {
        await User.deleteMany()
        })
        describe('upload image', () => {
            let name, surname, email, phone, city, license, specialty, profileImg, portfolioUrl, projectImg, description, password ,id
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
                
                await User.deleteMany()
                
                const user = await User.create({name, surname, email, phone, city, license, specialty, profileImg, portfolioUrl, projectImg, description, password})
                id = user.id

                const token = await jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
                logic.__token__ = token


                profileImg = fs.createReadStream('./src/test/red.jpg')
    })

    it('should succeed on correct image', async () => {
        const result = await logic.uploadImage(profileImg)

        expect(result).toBeUndefined()
        // const user = await User.findById(id)
        
        // expect(user).tobeTruthy()
        // expect(user.profileImg).tobeTruthy()
        // expect(user.profileImg).toHaveLength.above(1)
            })
        

           
        })
    
    afterAll(() => database.disconnect())
})
    