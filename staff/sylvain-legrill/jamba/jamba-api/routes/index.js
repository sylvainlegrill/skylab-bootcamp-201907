const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./users/register-user')
// const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
const updateUser = require('./users/update-user')
const unregisterUser = require('./users/unregister-user')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, registerUser)

// router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

module.exports = router