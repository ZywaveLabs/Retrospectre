/* global UserMethods:false*/

Meteor.methods({
    addUserToRoom: function(author, roomCode) {
        return UserMethods.addUserToRoom(author, roomCode);
    },
    removeUserFromRoom: function(id, roomCode) {
        UserMethods.removeUserFromRoom(id, roomCode);
    },
    changeAlias: function(aliasID, newAlias) {
        UserMethods.changeAlias(aliasID, newAlias);
    }
});
