const {models: { User, Meeting }} = require("jamba-data");
const { validate } = require("jamba-utils");

/**
 * Retrieve a meeting by its id.
 *
 * @param {string} meetingId
 *
 * @returns {Promise}
 */

module.exports = function(meetingId) {
  validate.string(meetingId, "meeting id");
  

  return (async () => {
    const meeting = await Meeting.findById(meetingId).lean();
    if (!meeting) throw Error(`meeting with id ${meetingId} does not exist`);

    meeting.id = meeting._id.toString();
    delete meeting._id;

    return meeting;
  })();
};
