const { models: { User } } = require('jamba-data')
const { validate }= require('jamba-utils')

/**
 * Retrieve all architects
 * 
 * @param {role} role
 * @param {city} city
 * @param {specialty} specialty
 * 
 * @returns {Promise}
 * 
*/

module.exports = function(role,city,specialty) {
    
 
    validate.string(role, 'role')
    validate.string(city, 'city')
    validate.string(specialty, 'specialty')
    
    // if(role === "architect")
        return (async () => {
            const users = await User.find({role:role, city:city, specialty:specialty}, { password: 0, __v: 0 })
            if (!users) throw Error(`No user with role ${role} with specialty ${specialty} found in the city of ${city}.`)
            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
            })
            return users
        })()
    
}