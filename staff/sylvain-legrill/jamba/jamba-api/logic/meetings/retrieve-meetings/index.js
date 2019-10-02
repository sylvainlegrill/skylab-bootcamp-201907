const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")
  
  /**
   * Retrieve meetings .
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
          
          if(!user) throw Error('User does not exist')
          const userRole = user.role

        if(userRole==='customer'){
          meetings = await Meeting.find({ user : userId }).lean()
        }

        if(userRole === 'architect') {
          meetings = await Meeting.find({ architect : userId }).lean()
        }

        meetings.forEach(meeting => {
          meeting.id = meeting._id.toString()
          delete meeting._id
          delete meeting.__v
        })


        return meetings

      })()
  }