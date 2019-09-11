const { unregisterUser } = require('../../logic')


module.exports = async (req, res) => {
    const { params: {id} , body: { email , password } } = req
    
    try {
        await unregisterUser(id, email, password)
           res.status(201).json({ message: 'user correctly unregistered' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}