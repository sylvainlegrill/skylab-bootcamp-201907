const { authenticateUser } = require('../../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = async (req, res) => {
    const { body: { email, password } } = req

    try {
        const id = await authenticateUser(email, password)

        const token = jwt.sign({ sub: id }, JWT_SECRET)

        res.json({ message: 'user correctly authenticated', id, token })
        debugger
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}