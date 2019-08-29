const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} repassword 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'id')
    
    return (async() =>{

        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        
        if (!user) throw Error(`user with id ${id} not found`)
            user.id = id
            return user
        })()
}
