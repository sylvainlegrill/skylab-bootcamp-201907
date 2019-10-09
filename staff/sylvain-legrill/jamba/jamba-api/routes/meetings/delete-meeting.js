const { deleteMeeting} = require('../../logic')


module.exports = async (req, res) => { 
    const { params:{meetingId} } = req
    
    try {
        await deleteMeeting(meetingId)
        res.status(200).json({ message: `meeting correctly deleted` })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}