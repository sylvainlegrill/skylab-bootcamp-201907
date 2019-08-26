const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    }
    
})