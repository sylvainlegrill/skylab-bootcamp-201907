const { addMeeting} = require('../../logic')

module.exports = async (req, res) => { debugger
    const { userId, body: { date, address, architectId } } = req

    try {
        const _date = new Date(date)
        const id = await addMeeting(_date, address, userId, architectId)
        res.status(201).json({ message: `meeting correctly added`, id })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}