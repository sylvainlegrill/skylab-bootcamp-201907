module.exports = {
   
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    updateUser: require('./user/update'),
    unregisterUser: require('./user/unregister'),
    registerVehicle: require('./vehicle/register'),
    retrieveAllVehicles: require('./vehicle/retrieve-all'),
    retrieveVehicle: require('./vehicle/retrieve'),
    updateVehicle: require('./vehicle/update'),
    unregisterVehicle: require('./vehicle/unregister'),
    registerProperty: require('./property/register'),
    registerPropertyOwner: require('./property/register'),
    retrieveAllProperties: require('./property/retrieve-all'),
    retrieveProperty: require('./property/retrieve'),
    updateProperty: require('./property/update'),
    unregisterProperty: require('./property/unregister'),
    unregisterPropertyOwner: require('./property/unregister'),
    registerCard: require('./card/register'),
    retrieveCard: require('./card/retrieve'),
    unregisterCard: require('./card/unregister')

    
    // user: require('./user'),
    // vehicle: require('./vehicle'),
    // property: require('./property'),
    // card: require('./card')
}
