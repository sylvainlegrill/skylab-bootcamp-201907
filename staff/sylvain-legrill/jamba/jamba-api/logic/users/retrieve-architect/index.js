const { models: { User } } = require('jamba-data')
const { validate } = require('jamba-utils')


/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function(id) {
    
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findOne({ _id: id , role: "architect"}, { _id: 0, password: 0 }).lean()
        if (!user) throw Error(`User with id ${id} not found`)
        user.id = id
        return user
    })()
}