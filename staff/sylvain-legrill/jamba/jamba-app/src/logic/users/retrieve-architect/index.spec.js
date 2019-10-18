import logic from '../..'
import retrieveArchitect from '.'

import { database, models } from 'jamba-data'
import jwt from 'jsonwebtoken'
const { User } = models
const { random } = Math


// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe.only('logic - retrieve architect', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role, id

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        phone = `phone-${random()}`
        password = `password-${random()}`
        role = `architect`
        city= `city-${random()}`
        license= `license-${random()}`
        specialty = `specialty-${random()}`
        // profileImg = `profileImg-${random()}`
        portfolioUrl = `portfolioUrl-${random()}`
        projectImg = `projectImg-${random()}`
        description = `description-${random()}`

        await User.deleteMany() 
        
        const architect = await User.create({ name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role})
        
        id = architect.id
debugger
        const token = await jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{  debugger
       const architect =  await logic.retrieveArchitect()
         
        expect(architect).toBeDefined()
        // expect(architect.id).toBe(id)
        // expect(architect._id).toBeUndefined()
        // expect(architect.name).toBe(name)
        // expect(architect.surname).toBe(surname)
        // expect(architect.email).toBe(email)
        // expect(architect.password).toBeUndefined()
    })

    afterAll(() => database.disconnect())
})