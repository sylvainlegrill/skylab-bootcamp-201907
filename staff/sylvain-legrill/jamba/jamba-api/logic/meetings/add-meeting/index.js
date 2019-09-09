const { models: { User, Meeting } } = require('jamba-data')
const { validate }= require('jamba-utils')   
   
    
    /**
     * Adds a meeting.
     * 
     * @param {date} date 
     * @param {string} address 
     * @param {string} userId 
     * @param {string} architectId 
     * 
     * @returns {Promise}
     */
    
    module.exports = function(date, address, userId, architectId) {
        validate.date(date, 'date')
        validate.string(address, 'address')
        validate.string(userId, 'user id')
        validate.string(architectId, 'architect id')
       
    
        return (async () => {
            const user = await User.findById(userId) 
            if (!user) throw Error(`user with id ${userId} does not exist`)

            const architect = await User.findById(architectId)
            if (!architect) throw Error(`architect with id ${architectId} does not exist`)
            
            const meeting  = await Meeting.create({ date, address, user: userId, architect: architectId})

            return meeting.id
        })()
    }    