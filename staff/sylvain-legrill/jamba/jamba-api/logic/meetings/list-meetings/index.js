const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")
  
  /**
   * List meetings .
   * 
   * @param {string} userId
   * @param {string} meetingId
   *
   * @returns {Promise}
   */
  
  module.exports = function(meetingId, userId) {
    validate.string(meetingId, 'meeting id')
    validate.string(userId, 'user id')
  
    return (async () => {
      // const meeting = await Meeting.findById(meetingId).lean()
      // if (!meeting) throw Error(`meeting with id ${meetingId} does not exist`)

      const user = await User.findById(userId).lean()
      if (!user) throw Error(`user with id ${userId} does not exist`)

      if(user.role === 'architect') return await Meeting.find({ architect: user.user.id })
      return await Meeting.find({ user: user.id })
    })()
  }