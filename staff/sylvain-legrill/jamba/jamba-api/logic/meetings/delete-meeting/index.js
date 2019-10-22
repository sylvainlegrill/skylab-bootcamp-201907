const { models: { Meeting } } = require('jamba-data')
const { validate }= require('jamba-utils')   
   
    
    /**
     * Deletes a meeting.
     * 
     * @param {string} meetingId meeting's id.
     * 
     * @throws {TypeError} - if parameter is not a string.   
     * @throws {Error} - if parameter is empty or undefined, if meeting not found or does not exist.
     * @returns {Promise}
     */
    
    module.exports = function(meetingId) {

        // validate.string(userId, 'user id')
        validate.string(meetingId, 'meeting id')
        
       
    
        return (async () => { 
            
            // const user = await User.findById(userId) 
            // if (!user) throw Error(`user with id ${userId} does not exist`)

            const meeting = await Meeting.findById(meetingId)
            if(!meeting) throw Error(`meeting with id ${meetingId} does not exist`)

           
            
            await Meeting.deleteOne({ _id: meetingId })

               
            
        })()
    }    