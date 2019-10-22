const { models: { User, Meeting } } = require('jamba-data')
const { validate }= require('jamba-utils')   
   
    
    /**
     * Add a meeting.
     * 
     * @param {date} date  meeting's date
     * @param {string} address meeting's address
     * @param {string} userId customer's ID involved in the meeting
     * @param {string} architectId architect's ID involved in the meeting
     * 
     * @throws {TypeError} - if any of the parameters address userId or architectId are not stringa , Or if date is not a date.   
     * @throws {Error} - if any parameter is empty or undefined, if userId or architectId is not found.
     * 
     * @returns {Object}
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