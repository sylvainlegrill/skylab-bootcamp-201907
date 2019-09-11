  
const { retrieveAllArchitects } = require('../../logic')

module.exports = async (req, res) => {
    const { body: { role } } = req

    if (role === "architect")
    try {

        const _user = await retrieveAllArchitects(role)

        res.json({ message: 'user retrieved correctly', _user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}