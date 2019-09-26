const mongoose = require('mongoose')
const { user, meeting} = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Meeting: mongoose.model('Meeting', meeting),
    
}
