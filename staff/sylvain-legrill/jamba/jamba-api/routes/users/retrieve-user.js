const { retrieveUser } = require('../../logic')


module.exports = async (req, res) => {
    

    const { params: {id} } = req
    
    try {

        const _user = await retrieveUser(id)

        res.json({ message: 'user retrieved correctly', _user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}