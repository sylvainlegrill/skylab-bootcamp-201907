
const { retrieveMeeting } = require('../../logic')

module.exports = async(req, res) => {
    const { meetingId } = req
    
    try {
        const _meeting = await retrieveMeeting(meetingId)
        res.status(201).json({ message: 'meeting correctly retrieved', _meeting})
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}