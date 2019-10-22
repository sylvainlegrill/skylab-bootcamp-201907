const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")
  
/**
 * Retrieve a meeting by its id.
 *
 * @param {string} userId user ID involved in the meeting.
 * @param {string} role role of user .
 * 
 * @throws {TypeError} - if parameter is not a string.   
 * @throws {Error} - if parameter is empty or undefined, if user not found or does not exist.
 *
 * @returns {Object}
 */
  
   
  module.exports = function(userId) { 
    
    validate.string(userId, 'user id')
    
    let meetings
    
    return (async () => {
      
          const user = await User.findById(userId).lean() 
          
          if(!user) throw Error('User does not exist')
          const userRole = user.role

        if(userRole==='customer'){
          meetings = await Meeting.find({ user : userId }).populate('architect','name email phone')
        }

        if(userRole === 'architect') {
          meetings = await Meeting.find({ architect : userId }).populate('user','name email phone')
        }

        meetings.forEach(meeting => {
          meeting.id = meeting._id.toString()
          delete meeting._id
          delete meeting.__v
        })


        return meetings

      })()
  }