const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { make, model, year, type, color, electric, plate },
            params: { id } } = req

    try {
        logic.registerVehicle(id, make, model, year, type, color, electric, plate)
            .then(vehicleId => res.status(201).json({ message: 'Vehicle registered successfully', id: vehicleId }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}