const { User } = require('../../../models')
const validate = require('../../../utils/validate')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    validate.string(password, 'password')
    validate.string(id, 'id')

    return( async() =>{
        const result = await User.deleteOne({ _id: id, password })
        if (!result.deletedCount) throw new Error(`Wrong credentials`)

    })
    
}