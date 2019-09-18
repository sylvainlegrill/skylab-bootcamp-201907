const { retrieveArchitect } = require('../../logic')


module.exports = async (req, res) => {
    

    const { params: {id} } = req
    
    try {

        const architect = await retrieveArchitect(id)

        res.json({ message: 'architect retrieved correctly', architect })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}