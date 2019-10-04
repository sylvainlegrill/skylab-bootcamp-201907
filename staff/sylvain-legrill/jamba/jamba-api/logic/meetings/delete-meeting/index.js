const { models: { User, Meeting } } = require('jamba-data')
const { validate }= require('jamba-utils')   
   
    
    /**
     * Deletes a meeting.
     * 
     * @param {string} userId
     * @param {string} meetingId 
     * 
     * @throws {TypeError} - if any of the parameters is not a string.
     * @returns {Promise}
     */
    
    module.exports = function(userId, meetingId) {
        validate.string(userId, 'user id')
        validate.string(meetingId, 'meeting id')
        
       
    
        return (async () => {
            
            const user = await User.findById(userId) 
            if (!user) throw Error(`user with id ${userId} does not exist`)

            const meeting = await Meeting.findById(meetingId)
            if(!meeting) throw Error(`meeting with id ${meetingId} does not exist`)

           
            
            await Meeting.deleteOne({ _id: meetingId })

               
            
        })()
    }    