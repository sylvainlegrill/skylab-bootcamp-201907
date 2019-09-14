import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'


export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUser,

    async searchArchitects(query) {
        const response = await fetch(`https://duckling-api.herokuapp.com/api/search?q=${query}`)

        const architects = await response.json()

        return architects
    },

    async retrieveArchitects(id) {
        const response = await fetch(`https://duckling-api.herokuapp.com/api/ducks/${id}`)

        const architects = await response.json()

        return architects
    }
}