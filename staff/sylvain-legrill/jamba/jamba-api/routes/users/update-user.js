const { updateUser } = require('../../logic')

module.exports = async (req, res) => {
    const { userId , body  } = req

    try {
        await updateUser(userId , body)
            res.status(201).json({ message: 'user correctly updated' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}