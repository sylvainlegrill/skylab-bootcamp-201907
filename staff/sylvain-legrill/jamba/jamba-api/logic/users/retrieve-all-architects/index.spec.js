// require('dotenv').config()

// const { expect } = require('chai')
// const retrieveAllArchitects = require('.')
// const { database, models: { User } } = require('jamba-data')
// //const bcrypt = require('bcrypt')

// const { env: { DB_URL_TEST }} = process

// describe.only('logic - retrieve all architects', () => {
//     before(() => database.connect(DB_URL_TEST))

//     let name, surname, email, phone, city, license, specialty, password, id

//     beforeEach(() => {
//         name = `name-${Math.random()}`
//         surname = `surname-${Math.random()}`
//         email = `email-${Math.random()}@domain.com`
//         phone = `phone-${Math.random()}`
//         city = `city-${Math.random()}`
//         license = `license-${Math.random()}`
//         specialty = `specialty-${Math.random()}`
//         password = `password-${Math.random()}`

//         return (async () => {
//             await User.deleteMany()
//             const user = await User.create({name, surname, email, phone, city, license, specialty, password})
//             id = user.id
//         })()
//     })

//     it('should succeed on correct architect data', async() =>{

//         const user = await retrieveAllArchitects(name, surname, email, password, phone, "architect", city, license, specialty)
//         expect(user).to.exist
//         expect(user.id).to.equal(id)
//         expect(user._id).not.to.exist
//         expect(user.name).to.equal(name)
//         expect(user.surname).to.equal(surname)
//         expect(user.email).to.equal(email)
//         expect(user.phone).to.equal(phone)
//         expect(user.city).to.equal(city)
//         expect(user.license).to.equal(license)
//         expect(user.specialty).to.equal(specialty)
//         expect(user.password).to.equal(password)
//         expect(user.role).to.equal("architect")
//     })

//     after(() => database.disconnect())
// })