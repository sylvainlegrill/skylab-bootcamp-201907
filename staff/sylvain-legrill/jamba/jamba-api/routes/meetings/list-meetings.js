const { listMeetings } = require("../../logic")

module.exports = async (req, res) => {
    
  const { userId } = req;

  try {
    
    const meetings = await listMeetings(userId)

    res.status(201).json({ message: `meeting correctly listed`, meetings })
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}
