const { retrieveMeetingsArchitect } = require("../../logic")

module.exports = async (req, res) => {

  const { params: {architectId} } = req;

  try {
    
    const meetings = await retrieveMeetingsArchitect(architectId)

    res.status(201).json({ message: `architect meeting(s) correctly listed`, meetings })
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}
