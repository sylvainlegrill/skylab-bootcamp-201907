import registerArchitect from '.'
import logic from '../../'

const { random } = Math
const { database, models: { User } } = require('jamba-data')
const bcrypt = require('bcryptjs')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register architect', () => {
    let name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role //, profileImg 

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

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
    })

    it('should succeed on correct data', async () => { 
        const id = await registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role ) //, profileImg 
        expect(id).toBeDefined()
        
        const user = await User.findOne({ email })
        expect(user).toBeDefined() 
        
        // expect(user.name).toBe(name)
        // expect(user.surname).toBe(surname)
        // expect(user.email).toBe(email)
        // expect(user.phone).toBe(phone)

        // const match = await bcrypt.compare(password, user.password)
        // expect(match).toBeTruthy()
        // expect(user.role).toBe(role)
        // expect(user.city).toBe(city)
        // expect(user.license).toBe(license)
        // expect(user.specialty).toBe(specialty)
        // // expect(user.profileImg).toBe(profileImg)
        // expect(user.portfolioUrl).toBe(portfolioUrl)
        // expect(user.projectImg).toBe(projectImg)
        // expect(user.description).toBe(description)
      

        
    })

    // name
    it('should fail on empty name', async () => {
        name = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('name is empty or blank')
        }
    })

    it('should fail on undefined name', async () => {
        name = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('name with value undefined is not a string')
        }
    })

    it('should fail on wrong name data type', async () => {
        name = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('name with value 123 is not a string')
        }
    })

    // surname
    it('should fail on empty surname', async () => {
        surname = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('surname is empty or blank')
        }
    })

    it('should fail on undefined surname', async () => {
        surname = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('surname with value undefined is not a string')
        }
    })

    it('should fail on wrong surname data type', async () => {
        surname = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('surname with value 123 is not a string')
        }
    })

    // email
    it('should fail on empty email', async () => {
        email = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('e-mail is empty or blank')
        }
    })

    it('should fail on undefined email', async () => {
        email = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('e-mail with value undefined is not a string')
        }
    })

    it('should fail on wrong email data type', async () => {
        email = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('e-mail with value 123 is not a string')
        }
    })

    // password
    it('should fail on empty password', async () => {
        password = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('password is empty or blank')
        }
    })

    it('should fail on undefined password', async () => {
        password = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('password with value undefined is not a string')
        }
    })

    it('should fail on wrong password data type', async () => {
        password = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('password with value 123 is not a string')
        }
    })
    // phone
    it('should fail on empty phone', async () => {
        phone = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('phone is empty or blank')
        }
    })

    it('should fail on undefined phone', async () => {
        phone = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('phone with value undefined is not a string')
        }
    })

    it('should fail on wrong phone data type', async () => {
        phone = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('phone with value 123 is not a string')
        }
    })
    // role
    it('should fail on empty role', async () => {
        role = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('role is empty or blank')
        }
    })

    it('should fail on undefined role', async () => {
        role = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('role with value undefined is not a string')
        }
    })

    it('should fail on wrong role data type', async () => {
        role = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('role with value 123 is not a string')
        }
    })

    // city
    it('should fail on empty city', async () => {
        city = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('city is empty or blank')
        }
    })

    it('should fail on undefined city', async () => {
        city = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('city with value undefined is not a string')
        }
    })

    it('should fail on wrong city data type', async () => {
        city = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('city with value 123 is not a string')
        }
    })
    // license
    it('should fail on empty license', async () => {
        license = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('license is empty or blank')
        }
    })

    it('should fail on undefined license', async () => {
        license = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('license with value undefined is not a string')
        }
    })

    it('should fail on wrong license data type', async () => {
        license = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('license with value 123 is not a string')
        }
    })
    // specialty
    it('should fail on empty specialty', async () => {
        specialty = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('specialty is empty or blank')
        }
    })

    it('should fail on undefined specialty', async () => {
        specialty = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('specialty with value undefined is not a string')
        }
    })

    it('should fail on wrong specialty data type', async () => {
        specialty = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('specialty with value 123 is not a string')
        }
    })
     // portfolioUrl
     it('should fail on empty portfolioUrl', async () => {
        portfolioUrl = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('portfolioUrl is empty or blank')
        }
    })

    it('should fail on undefined portfolioUrl', async () => {
        portfolioUrl = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('portfolioUrl with value undefined is not a string')
        }
    })

    it('should fail on wrong portfolioUrl data type', async () => {
        portfolioUrl = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('portfolioUrl with value 123 is not a string')
        }
    })
     // projectImg
     it('should fail on empty projectImg', async () => {
        projectImg = ''

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('projectImg is empty or blank')
        }
    })

    it('should fail on undefined projectImg', async () => {
        projectImg = undefined

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('projectImg with value undefined is not a string')
        }
    })

    it('should fail on wrong projectImg data type', async () => {
        projectImg = 123

        try {
            await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
        } catch({message}) {
            expect(message).toBe('projectImg with value 123 is not a string')
        }
    })
         // description
         it('should fail on empty description', async () => {
            description = ''
    
            try {
                await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
            } catch({message}) {
                expect(message).toBe('description is empty or blank')
            }
        })
    
        it('should fail on undefined description', async () => {
            description = undefined
    
            try {
                await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
            } catch({message}) {
                expect(message).toBe('description with value undefined is not a string')
            }
        })
    
        it('should fail on wrong description data type', async () => {
            description = 123
    
            try {
                await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description, role)
            } catch({message}) {
                expect(message).toBe('description with value 123 is not a string')
            }
        })

    afterAll(() => database.disconnect())
})