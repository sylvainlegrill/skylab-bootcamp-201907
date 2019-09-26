require('dotenv').config()

const { expect } = require('chai')
const uploadImage = require('.')
const { database, models: { User } } = require('jamba-data')
const fs = require('fs')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST } } = process

describe.only('logic - upload image', () => {
    before(() => database.connect(DB_URL_TEST))
    debugger

    beforeEach(async() => {
        await User.deleteMany()
        })
        describe('upload image', () => {debugger
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
            })

           
        })


    after(() => database.disconnect())
})
    

    // let name, surname, email, phone, password, role, city, license, specialty, profileImg,  portfolioUrl, description, id

    // beforeEach(async () => {
    //     name = `name-${random()}`
    //     surname = `surname-${random()}`
    //     email = `email-${random()}@domain.com`
    //     phone = `phone-${random()}`
    //     password = `password-${random()}`
    //     role = `architect`
    //     city = `city-${random()}`
    //     license = `license-${random()}`
    //     // specialty = `specialty-${Math.random()}`
    //     // portfolioUrl = `portfolio-${Math.random()}`
    //     // description = `description-${Math.random()}`
    

    // //     await User.deleteMany()
    // //     const user = await User.create({ name, surname, email, phone, password, role, city, license, specialty,  portfolioUrl, description   })
    // //     id = user.id

    // //     profileImg = fs.createReadStream('./test/red.jpg')
    // })

    // it('should succeed on correct image', async () => {
    //     const result = await uploadImage(id, profileImg)

    //     expect(result).not.to.exist

    // })
    // it('should fail if the user ad does not exist', async () => { 
    //     try{
    //         await uploadImage('5d7204963b3ea6a2f0c7a6a2', adId, image)
    //     }catch(error){
    //         expect(error).to.exist
    //         expect(error.message).to.equal(`user with userId 5d7204963b3ea6a2f0c7a6a2 not found`)
            
    //     }
    // })

    // it('should fail if the ad  does not exist', async () => { 
    //     try{
    //         await uploadImage( id, "5d712e297ea98990acdc78bd", image)
    //     }catch(error){
    //         expect(error).to.exist
    //         expect(error.message).to.equal(`ad with adId 5d712e297ea98990acdc78bd not found`)
            
    //     }
    // })

    // it('should fail on wrong user id type', () => 
    // expect(() => uploadImage(123, adId, image)).to.throw(`userId with value 123 is not a string`)
    // ) 
    
    // it('should fail on wrong ad id type', () => 
    // expect(() => uploadImage(undefined, adId, image)).to.throw(`userId with value undefined is not a string`)
    // )
    // it('should fail on empty or blank', () => 
    // expect(() => uploadImage(" ", adId, image)).to.throw(`userId is empty or blank`)
    // )

    // it('should fail on wrong ad id type', () => 
    // expect(() => uploadImage(id, 123, image)).to.throw(`adId with value 123 is not a string`)
    // )
    // it('should fail on wrong ad id type', () => 
    // expect(() => uploadImage(id, undefined, image)).to.throw(`adId with value undefined is not a string`)
    // )
    // it('should fail on empty or blank', () => 
    // expect(() => uploadImage(id, " ", image)).to.throw(`adId is empty or blank`)
    // )
    // it('should fail on wrong ad id type', () => 
    // expect(() => uploadImage(id, 123, image)).to.throw(`adId with value 123 is not a string`)
    // )
    // it('should fail on wrong ad id type', () => 
    // expect(() => uploadImage(id, undefined, image)).to.throw(`adId with value undefined is not a string`)
    // )
    // it('should fail on empty or blank', () => 
    // expect(() => uploadImage(id, " ", image)).to.throw(`adId is empty or blank`)
    // )
    // it('should fail on wrong image type', () => 
    // expect(() => uploadImage(id, adId, 123)).to.throw(`stream with value 123 is not an object`)
    // )
    // it('should fail on wrong image type', () => 
    // expect(() => uploadImage(id, adId, undefined)).to.throw(`stream with value undefined is not an object`)
    // )
    // it('should fail on empty or blank', () => 
    // expect(() => uploadImage(id, adId, "")).to.throw(`stream with value  is not an object`)
    // )
    



