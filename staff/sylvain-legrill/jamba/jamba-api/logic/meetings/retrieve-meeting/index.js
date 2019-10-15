const {models: { User, Meeting }} = require("jamba-data")
const { validate } = require("jamba-utils")

/**
 * Retrieve a meeting by its id.
 *
 * @param {string} meetingId meeting's id.
 * 
 * @throws {TypeError} - if parameter is not a string.   
 * @throws {Error} - if parameter is empty or undefined, if meeting not found or does not exist.
 *
 * @returns {Object}
 */

module.exports = function(meetingId) {
  validate.string(meetingId, "meeting id")
  

  return (async () => {
    const meeting = await Meeting.findById(meetingId).lean()
    if (!meeting) throw Error(`meeting with id ${meetingId} does not exist`)

    meeting.id = meeting._id.toString()
    delete meeting._id
    delete meeting.__v

    return meeting
  })()
}
