const { models: { User, Meeting } } = require('jamba-data')
const { validate }= require('jamba-utils')   
   
    
    /**
     * Adds an appointment
     * 
     * @param {date} date 
     * @param {string} address 
     * @param {*} userId 
     * 
     * @returns {Promise}
     */
    
    module.exports = function(date, address, userId) {
    
        validate.date(date, 'date')
        validate.string(address, 'address')
        validate.string(userId, 'customer')
       
    
        return (async () => {
            const user = await User.findById(userId) 
            if (!user) throw Error('user does not exist')
    
            
            const meeting = new Meeting({ date, address, userId})

            await meeting.save()
        
            return meeting
        })()
    }    