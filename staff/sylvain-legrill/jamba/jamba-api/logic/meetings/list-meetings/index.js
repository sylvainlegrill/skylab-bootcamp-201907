const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")
  
  /**
   * List meetings .
   * 
   * @param {string} userId
   * @param {string} userRole
   *
   * @returns {Promise}
   */
  
   
  module.exports = function(userId) {
    
    validate.string(userId, 'user id')
    
    let meetings
    
    return (async () => {
      
          const user = await User.findById(userId).lean()
          if(!user) throw Error('User doesnt exist')
          const userRole = user.role
        // const meeting = await Meeting.findById(meetingId).lean()
        // if (!meeting) throw Error(`meeting with id ${meetingId} does not exist`)
        if(userRole==='customer'){
          meetings = await Meeting.find({customer: userId}).select("-__v").lean()
        }

        if(userRole === 'architect') {
          meetings = await Meeting.find({architect: userId}).select("-__v").lean()
        }

        if(meetings.length === 0) {
          return []
        }
        else {
          return meetings.map(meeting=>{ 
            meeting.id = meeting._id.toString()
            delete meeting._id

            return meeting
          })
          
        }
    })()
  }