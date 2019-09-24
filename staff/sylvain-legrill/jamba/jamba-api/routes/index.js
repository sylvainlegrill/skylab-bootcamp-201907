const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./users/register-user')
const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
const retrieveArchitect = require('./users/retrieve-architect')
const retrieveAll = require('./users/retrieve-all')
const listArchitects = require('./users/list-architects')
const updateUser = require('./users/update-user')
const unregisterUser = require('./users/unregister-user')
const addMeeting = require('./meetings/add-meeting')
const retrieveMeeting = require('./meetings/retrieve-meeting')
const listMeetings = require('./meetings/list-meetings')
const deleteMeeting = require('./meetings/delete-meeting')
const uploadImage = require('./users/upload-image')


const router = Router()

const jsonBodyParser = bodyParser.json()


//// USERS ////

router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.get('/architects/:id', tokenMiddleware, retrieveArchitect)

router.get('/users-all/:role', [tokenMiddleware, jsonBodyParser], retrieveAll)

router.get('/architects/:city/:specialty', [tokenMiddleware, jsonBodyParser], listArchitects)

router.patch('/users', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

//// MEETINGS////

router.post('/users/meetings', [tokenMiddleware, jsonBodyParser], addMeeting)

router.post('/users/uploads', [tokenMiddleware, jsonBodyParser], uploadImage)

router.get('/users/meetings/:id', [tokenMiddleware, jsonBodyParser], retrieveMeeting)

router.get('/users/meetings', [tokenMiddleware, jsonBodyParser], listMeetings)

router.delete('/:id', [tokenMiddleware, jsonBodyParser], deleteMeeting)

module.exports = router