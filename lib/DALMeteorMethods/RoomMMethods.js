/* global RoomMethods: true */

Meteor.methods({ // eslint-disable-line
    createRoom: function (roomObject) {
        return RoomMethods.CreateRoom(roomObject);
    },
    getKeynoteID : function(roomCode){
        return RoomMethods.findKeynoteID(roomCode);
    },
    revealCards: function(roomCode) {
        RoomMethods.RevealCards(roomCode);
    },
    hideCards: function(roomCode) {
        RoomMethods.HideCards(roomCode);
    }
});
