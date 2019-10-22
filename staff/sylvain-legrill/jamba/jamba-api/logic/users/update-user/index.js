const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')
const bcrypt = require('bcryptjs')

/**
* 
* @param {*} id user id
* @param {*} fieldsToUpdate  fields to update
* 
* @throws {TypeError} - if user id is not a string, if data to update is not an object.
* @throws {Error} - if any parameter is empty, undefined or user is not found.
* 
* @returns {Promise} user object.
*/
module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')

    if(!fieldsToUpdate)throw Error('No field to update provided')
    if(fieldsToUpdate.email) throw new Error('sorry, email non-modifiable')

    return (async()=>{
        if (fieldsToUpdate.password) {
            const hash = await bcrypt.hash(fieldsToUpdate.password, 10)

            fieldsToUpdate.password = hash
        }

        const user = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        if (!user) throw Error(`User with id ${id} does not exist.`)
        
    })()
   
}