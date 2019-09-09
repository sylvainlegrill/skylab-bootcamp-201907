require('dotenv').config()

const { expect } = require('chai')
const addMeeting = require('.')
const { database, models: {User, Meeting } } = require('jamba-data')





describe('logic - assign appointment', ()=> {

    before(() => database.connect('mongodb://localhost/jamba'))
    


    beforeEach(async() => {
        
    })
