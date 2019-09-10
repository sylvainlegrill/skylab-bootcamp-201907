const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')

/**
 * Retrieve all architects
 * 
 * @param {role} role
 * 
 * 
 * @returns {Promise}
 * 
*/

module.exports = function(role) {
    
 
    validate.string(role, 'role')
    

        return (async () => {
            const architects = await User.find({role:'architect'}, { password: 0 }).lean()
            if (!architects) throw Error(`No user with role ${role} found.`)
            architects.forEach(user => {
                user.id = user._id.toString()
                delete user._id
                //user.id = id
            })
            return architects
        })()
    
}