const mongoose = require('mongoose')

const { Schema , ObjectId } = mongoose

module.exports = new Schema({
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: { type: ObjectId, ref: 'User' },
    architect: {type: ObjectId, ref: 'User' }
})