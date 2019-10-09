const { models: { User } } = require('jamba-data')
const { validate } = require('jamba-utils')


/**
 * Retrieves an architect by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
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