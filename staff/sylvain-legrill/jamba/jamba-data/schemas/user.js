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
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },

    license: {
        type: String,
        required: false
    },
    specialty: {
        type: String,
        required: false 
    }, 
    profileImg: {
        type: String,
        required: false
    },
    portfolioUrl:{
        type: String,
        required: false 
    },
    projectImg:{
        type: String,
        required: false 
    },
    description:{
        type: String,
        required: false 
    },

    role: {
        type: String,
        required: true,
        enum: ['customer', 'architect'],
        default: 'customer'

    }
    
})