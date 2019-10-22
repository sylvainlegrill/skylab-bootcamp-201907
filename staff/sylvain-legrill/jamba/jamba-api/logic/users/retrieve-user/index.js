const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')


/**
 * Retrieves a user by its id.
 * 
 * @param {string} id user id
 * 
 * @throws {TypeError} - if id is not a string.
 * @throws {Error} - if id is empty or undefined or user not found.
 * 
 * @returns {Object} user object.
 */
module.exports = function(id) {
    
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        if (!user) throw Error(`User with id ${id} does not exist.`)
        user.id = id
        delete user.__v

        return user
    })()
}