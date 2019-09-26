const { unregisterUser } = require('../../logic')


module.exports = async (req, res) => {
    const { userId, body: {password} } = req
    
    try {
        await unregisterUser(userId, password)
           res.status(201).json({ message: 'user correctly unregistered' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}