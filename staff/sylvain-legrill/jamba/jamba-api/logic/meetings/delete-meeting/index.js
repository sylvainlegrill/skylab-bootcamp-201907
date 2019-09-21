const { models: { User, Meeting } } = require('jamba-data')
const { validate }= require('jamba-utils')   
   
    
    /**
     * Deletes a meeting.
     * 
     * @param {string} meetingId
     * @param {string} userId 
     * 
     * @returns {Promise}
     */
    
    module.exports = function(meetingId, userId) {
        validate.string(meetingId, 'meeting id')
        validate.string(userId, 'user id')
       
    
        return (async () => {
            const meeting = await Meeting.findById(meetingId)
            if(!meeting) throw Error(`meeting with id ${meetingId} does not exist`)

            const user = await User.findById(userId) 
            if (!user) throw Error(`user with id ${userId} does not exist`)
            
            await Meeting.deleteOne(meeting)

        
            
            
        })()
    }    