import registerUser from './users/register-user'
import authenticateUser from './users/authenticate-user'
import isUserLoggedIn from './users/is-user-logged-in'
import logUserOut from './users/log-user-out'
import retrieveUser from './users/retrieve-user'
import retrieveUsersByRole from './users/retrieve-users-by-role'
import retrieveArchitect from './users/retrieve-architect'
import searchArchitectsByCityAndSpecialty from './users/search-architects-by-city-and-specialty'


export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    set userEmail(email){
        sessionStorage.email = email
    },

    get userEmail(){
        return sessionStorage.email
    },
    
    logoutUser() {
        sessionStorage.clear()
    },


    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUsersByRole,
    retrieveUser,
    retrieveArchitect,
    searchArchitectsByCityAndSpecialty,




   
    

    // async searchArchitects(query) {
    //     const response = await fetch(`https://duckling-api.herokuapp.com/api/search?q=${query}`)

    //     const architects = await response.json()

    //     return architects
    // },

    // async retrieveArchitects(id) {
    //     const response = await fetch(`https://duckling-api.herokuapp.com/api/ducks/${id}`)

    //     const architects = await response.json()

    //     return architects
    // }
}