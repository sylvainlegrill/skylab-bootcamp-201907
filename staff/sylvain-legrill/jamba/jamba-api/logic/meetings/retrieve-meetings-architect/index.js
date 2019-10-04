const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")
  
  /**
   * Retrieve meetings .
   * 
   * @param {string} architectId
   * @param {string} userRole
   *
   * @returns {Promise}
   */
  
   
  module.exports = function(architectId) { 
    
    validate.string(architectId, 'architect id')
    
    let meetings
    
    return (async () => {
      
        const user = await User.findById(architectId).lean() 
        
        if(!user) throw Error('User does not exist')
        const userRole = user.role


        if(userRole === 'architect') {
          meetings = await Meeting.find({ architect : architectId }).lean()
        }

        meetings.forEach(meeting => {
          meeting.id = meeting._id.toString()
          delete meeting._id
          delete meeting.__v
        })


        return meetings

      })()
  }