  
const { listArchitects } = require('../../logic')


module.exports = async (req, res) => {
    
const { params:{role, city, specialty} } = req

    try {

        const user = await listArchitects(role, city, specialty)

        res.json({ message: 'user retrieved correctly', user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}