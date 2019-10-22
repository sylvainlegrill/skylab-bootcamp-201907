const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")
  
/**
 * Retrieve a meeting by its id.
 *
 * @param {string} architectId architect's ID involved in the meeting.
 * @param {string} role role of user .
 * @param {object} meetings role of user .
 * @param {object} meeting role of user .
 * 
 * @throws {TypeError} - if parameter is not a string.   
 * @throws {Error} - if parameter is empty or undefined, if user not found or does not exist.
 *
 * @returns {Object}
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