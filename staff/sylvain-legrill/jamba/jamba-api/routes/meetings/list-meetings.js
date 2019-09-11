const { listMeetings} = require('../../logic')


module.exports = async (req, res) => {
    
    const { param: id, body: role  } = req
    debugger
    try {
        await listMeetings(id, role)
        res.status(201).json({ message: `meeting correctly listed` })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}  