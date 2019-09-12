const { addMeeting} = require('../../logic')

module.exports = async (req, res) => {
    const { userId, body: { date, address, architectId } } = req

    try {
        const _date = new Date(date)
        await addMeeting(_date, address, userId, architectId)
        res.status(201).json({ message: `meeting correctly added` })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}