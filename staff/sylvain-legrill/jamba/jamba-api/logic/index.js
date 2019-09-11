module.exports = {
    registerUser: require('./users/register-user'),
    authenticateUser: require('./users/authenticate-user'),
    retrieveUser: require('./users/retrieve-user'),
    retrieveAllArchitects: require('./users/retrieve-all-architects'),
    updateUser: require('./users/update-user'),
    unregisterUser: require('./users/unregister-user'),
    addMeeting: require('./meetings/add-meeting'),
    deleteMeeting: require('./meetings/delete-meeting'),
    retrieveMeeting: require('./meetings/retrieve-meeting'),
    listMeetings: require('./meetings/list-meetings'),
     
}