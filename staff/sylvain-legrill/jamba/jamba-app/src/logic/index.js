import registerUser from './users/register-user'
import registerArchitect from './users/register-architect'
import authenticateUser from './users/authenticate-user'
import isUserLoggedIn from './users/is-user-logged-in'
import logUserOut from './users/log-user-out'
import retrieveUser from './users/retrieve-user'
import retrieveUsersByRole from './users/retrieve-users-by-role'
import retrieveArchitect from './users/retrieve-architect'
import searchArchitectsByCityAndSpecialty from './users/search-architects-by-city-and-specialty'
import uploadImage from './users/upload-image'
import getUserId from './users/get-user-id'
import addMeeting from './meetings/add-meeting'
import retrieveMeetings from './meetings/retrieve-meetings'
import retrieveMeetingsArchitect from './meetings/retrieve-meetings-architect'


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
    registerArchitect,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUsersByRole,
    retrieveUser,
    retrieveArchitect,
    searchArchitectsByCityAndSpecialty,
    uploadImage,
    getUserId,
    addMeeting,
    retrieveMeetings,
    retrieveMeetingsArchitect
    
}