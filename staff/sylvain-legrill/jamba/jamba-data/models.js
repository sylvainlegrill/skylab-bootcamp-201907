const mongoose = require('mongoose')
const { user, architect, meeting, message } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Architect: mongoose.model('Arquitect', architect),
    Meeting: mongoose.model('Meeting', meeting),
    Message: mongoose.model('Arquitect', architect),
}
