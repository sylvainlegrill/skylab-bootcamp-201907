const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
//
const registerUser = require('./users/register-user')
const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
const retrieveAllArchitects = require('./users/retrieve-all-architects')
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

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.get('/users/:role', [tokenMiddleware, jsonBodyParser], retrieveAllArchitects)

router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

//// MEETINGS////

router.post('/meetings', jsonBodyParser, addMeeting)

router.get('/meetings/:id', [tokenMiddleware, jsonBodyParser], retrieveMeeting)

router.get('/users/:id/meetings', [tokenMiddleware, jsonBodyParser], listMeetings)

router.delete('/meetings/:id', [tokenMiddleware, jsonBodyParser], deleteMeeting)

module.exports = router