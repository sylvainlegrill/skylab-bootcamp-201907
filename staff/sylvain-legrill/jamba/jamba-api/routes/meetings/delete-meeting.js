const { meeting} = require('../../logic')


module.exports = async (req, res) => {
    const { id } = req

    try {
        await meeting.deleteMeeting(id)
        res.status(201).json({ message: `meeting correctly deleted` })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}