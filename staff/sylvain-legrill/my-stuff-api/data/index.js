const mongoose = require('mongoose')
const { user } = require('./schemas')


module.exports = { 
    User: mongoose.model('User', user),
    Card: mongoose.model('Card', card),
    Property: mongoose.model('Property', property),
    Vehicle: mongoose.model('Vehicle', vehicle)

}