  
const { retrieveAll } = require('../../logic')


module.exports = async (req, res) => {
    
const { params:{role} } = req

    try {

        const user = await retrieveAll(role)

        res.json({ message: 'user retrieved correctly', user , role })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}