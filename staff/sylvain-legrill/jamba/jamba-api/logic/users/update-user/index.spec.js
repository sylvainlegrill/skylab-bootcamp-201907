require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('jamba-data')
//const bcrypt = require('bcrypt')

//const { env: { DB_URL_TEST }} = process


describe.only('logic - update user', () => {
    before(() => database.connect('mongodb://localhost/jamba'))


    // let name, surname, email, phone, city, license, specialty, password

    beforeEach(async() => {
        await User.deleteMany()
        })
        describe('update user', () => {
            let id, name, surname, email, phone, city, license, specialty, password
            beforeEach(async () => {
                
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@domain.com`
                password = `password-${Math.random()}`
                phone = `phone-${Math.random()}`
                city = `city-${Math.random()}`
                license = `license-${Math.random()}`
                specialty = `specialty-${Math.random()}`
                password = `password-${Math.random()}`
                const user = await User.create({name, surname, email, phone, city, license, specialty, password})
                id = user.id
            })
            it('should succeed on correct data', async () => {
                
                const user =  await updateUser(id, { name: 'newName', surname: 'newSurname', email: 'new@email.com', phone: '634342323', city: 'paris', password: 'newPassword' })
                    expect(user).not.to.exist
                    
                const userUpdate = await User.findOne({ _id: id })
              
                    expect(userUpdate).to.exist
                    expect(userUpdate.name).to.equal('newName')
                    expect(userUpdate.surname).to.equal('newSurname')
                    expect(userUpdate.email).to.equal('new@email.com')
                    expect(userUpdate.password).to.equal('newPassword')
                 
                })
            it('should fail on empty id', () =>
                expect(() =>
                    logic.user.update('', { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
                ).to.throw('id is empty or blank')
            )
            it('should fail on undefined id', () =>
                expect(() =>
                    logic.user.update(undefined, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
                ).to.throw('id with value undefined is not a string')
            )
        })
   
    after(() => database.disconnect())

    
})