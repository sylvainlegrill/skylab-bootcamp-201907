const { registerUser } = require('../../logic')

module.exports = async (req, res) => {
    const { body: { name, surname, email, phone, password, role, city, license, specialty, profileImg, portfolioUrl, projectImg, description } } = req
    
    if (role === "architect")
    try {
        await registerUser(name, surname, email, phone, password, role, city, license, specialty, profileImg,  portfolioUrl, projectImg, description )
        res.status(201).json({ message: `user with role ${role} correctly registered` })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }

    if (role === "customer")
    try {
        await registerUser(name, surname, email, phone, password, role)
        res.status(201).json({ message: `user with role ${role} correctly registered` })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}
