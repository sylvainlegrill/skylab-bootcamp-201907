const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')

/**
 * Retrieve all users by role
 * 
 * @param {role} role user's role: architect or customer (default)
 * 
 * @throws {TypeError} - if role is not a string.
 * @throws {Error} - if users with specified role is empty or undefined or users not found.
 * 
 * @returns {Object} users object.
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