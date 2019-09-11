const { listMeetings } = require("../../logic");

module.exports = async (req, res) => {
    debugger
  const { params: {id} } = req;

  try {
    debugger;
    const meetings = await listMeetings(id);

    res.status(201).json({ message: `meeting correctly listed`, meetings });
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
};
