const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')
const bcrypt = require('bcryptjs')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
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