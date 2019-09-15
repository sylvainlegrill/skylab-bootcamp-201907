const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./users/register-user')
const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
//const retrieveAllArchitects = require('./users/retrieve-all')
const retrieveAll = require('./users/retrieve-all')
const listArchitects = require('./users/list-architects')
// const listASC = require('./users/list-asc')
const updateUser = require('./users/update-user')
const unregisterUser = require('./users/unregister-user')
const addMeeting = require('./meetings/add-meeting')
const retrieveMeeting = require('./meetings/retrieve-meeting')
const listMeetings = require('./meetings/list-meetings')
const deleteMeeting = require('./meetings/delete-meeting')


const router = Router()

const jsonBodyParser = bodyParser.json()


//// USERS ////

router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)

// router.get('/users/:role', [tokenMiddleware, jsonBodyParser], retrieveAllArchitects)

router.get('/users-all/:role', [tokenMiddleware, jsonBodyParser], retrieveAll)

router.get('/users-all/:role/:city/:specialty', [tokenMiddleware, jsonBodyParser], listArchitects)

router.patch('/users', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

//// MEETINGS////

router.post('/users/meetings', [tokenMiddleware, jsonBodyParser], addMeeting)

router.get('/users/meetings/:id', [tokenMiddleware, jsonBodyParser], retrieveMeeting)

// router.get('/users/architects/specialty/city/', [tokenMiddleware, jsonBodyParser], listASC)


router.get('/users/meetings', [tokenMiddleware, jsonBodyParser], listMeetings)

router.delete('/users/meetings/:id', [tokenMiddleware, jsonBodyParser], deleteMeeting)

module.exports = router