const mongoose = require('mongoose')

const { Schema , ObjectId } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    architectPhone: {
        type: Number,
        required: true
    },

    license: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true 
    }, 
    profileImg: {
        type: String
    },
    portfolioUrl:{
        type: String
    },
    projectImg:{
        type: String
    },
    description:{
        type: String
    }
})