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
            const users = await User.find({role:role}, { password: 0, __v: 0 })
            if (!users) throw Error(`No user with role ${role} found.`)
            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
                //user.id = id
            })
            return users
        })()
    
}