// /* eslint-disable */
/* global Rooms:true RoomMethods: true */

Meteor.methods({
    createRoom: function (roomObject) {
        return RoomMethods.CreateRoom(roomObject);
    },
    getKeynoteID : function(roomCode){
        return RoomMethods.findKeynoteID(roomCode);
    }
});
