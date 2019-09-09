// const { models: { User } } = require('jamba-data')
// const { validate }= require('jamba-utils')

// /**
//  * Retrieve all architects
//  * 
//  * @param {*} id 
//  * @returns {Promise}
//  * 
// */

// module.exports = function(id,role) {
    
//     validate.string(id, 'id')
//     validate.string(role)

//         return (async () => {
//             const user = await User.find({ _id: id }, { _id: 0, password: 0 }).lean()
//             if (!user) throw Error(`User with id ${id} does not exist.`)
//             user.forEach(user => {
//                     // user.id = user._id
//                     // delete user._id
//                     user.id = id
//                 })
//                 return user
//         })()
    
// }