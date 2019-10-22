import logic from '../..'
import searchArchitectsByCityAndSpecialty from '.'
import { database, models } from 'jamba-data'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - search architects', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    
    let name1 , surname1, email1, password1, phone1, city1, license1, specialty1, role1, name2 , surname2, email2, password2, phone2, city2, license2, specialty2, role2
    let id
   
    beforeEach(async() => {
        
            name1= `name-${Math.random()}`
            surname1= `surname-${Math.random()}`
            email1= `email-${Math.random()}@mail.com`
            password1= `password-${Math.random()}`
            phone1= `123-${Math.random()}`
            city1= `Barcelona`
            license1= `license-${Math.random()}`
            specialty1= `residential`
            role1= "architect"
       
            name2= `name-${Math.random()}`
            surname2= `surname-${Math.random()}`
            email2= `email-${Math.random()}@mail.com`
            password2= `password-${Math.random()}`
            phone2= `123-${Math.random()}`
            city2= `Barcelona`
            license2= `license-${Math.random()}`
            specialty2= `residential`
            role2= 'architect'

            await User.deleteMany()
            
            const architect1= await User.create({name: name1, surname: surname1, email: email1, password: password1, phone: phone1, city: city1, license: license1, specialty: specialty1, role: role1})
            const architect2= await User.create({name: name2, surname: surname2, email: email2, password: password2, phone: phone2, city: city2, license: license2, specialty: specialty2, role: role2})
        

            const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

            logic.__token__ = token

    })

    it('should succeed on correct architect data ', async () => { 
        
        let architects = await logic.searchArchitectsByCityAndSpecialty( 'Barcelona', 'residential' )

        expect(architects).toBeDefined()
        expect(architects[0].name).toBe(name1)
        expect(architects[1].name).toBe(name2)
        expect(architects[0].surname).toBe(surname1)
        expect(architects[1].surname).toBe(surname2)
        expect(architects[0].email).toBe(email1)
        expect(architects[1].email).toBe(email2)
        expect(architects[0].phone).toBe(phone1)
        expect(architects[1].phone).toBe(phone2)
        expect(architects[0].city).toBe("Barcelona")
        expect(architects[1].city).toBe("Barcelona")
        expect(architects[0].license).toBe(license1)
        expect(architects[1].license).toBe(license2)
        expect(architects[0].specialty).toBe("residential")
        expect(architects[1].specialty).toBe("residential")     

    })

    it('should fail on empty city', () => 
        expect(() => searchArchitectsByCityAndSpecialty("", "resitential")).toThrow(Error, 'city searched is empty or blank')
    )

    it('should fail on undefined city', () => 
        expect(() => searchArchitectsByCityAndSpecialty(undefined, "resitential")).toThrow('city searched with value undefined is not a string')
    )

    it('should fail on undefined city with wrong data type', () => 
        expect(() => searchArchitectsByCityAndSpecialty(123, "resitential")).toThrow('city searched with value 123 is not a string')
    )

    it('should fail on empty specialty', () => 
        expect(() => searchArchitectsByCityAndSpecialty("Barcelona", "")).toThrow(Error, 'specialty searched is empty or blank')
    )

    it('should fail on undefined specialty', () => 
        expect(() => searchArchitectsByCityAndSpecialty("Barcelona", undefined)).toThrow('specialty searched with value undefined is not a string')
    )

    it('should fail on city with wrong data type', () => 
        expect(() => searchArchitectsByCityAndSpecialty("Barcelona", 123)).toThrow('specialty searched with value 123 is not a string')
    )
    

    afterAll(() => database.disconnect())
})