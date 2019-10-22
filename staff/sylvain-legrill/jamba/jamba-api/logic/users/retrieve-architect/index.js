const { models: { User } } = require('jamba-data')
const { validate } = require('jamba-utils')


/**
 * Retrieves an architect by its id.
 * 
 * @param {string} id architect id
 * 
 * @throws {TypeError} - if architect id is not a string.
 * @throws {Error} - if architect id is empty or undefined or user not found.
 * 
 * @returns {Object} architect as an object.
 */
module.exports = function(id) {
    
    validate.string(id, 'id')

    return (async () => { 
        const architect = await User.findOne({ _id: id , role: "architect"}, { _id: 0, password: 0 }).lean()
        if (!architect) throw Error(`User with id ${id} not found`)
        architect.id = id
        delete architect.__v

        return architect
    })()
}