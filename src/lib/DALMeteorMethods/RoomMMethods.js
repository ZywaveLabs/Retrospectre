// /* eslint-disable */
/* global Rooms:true RoomMethods: true */

Meteor.methods({
    createRoom: function (roomObject) {
        RoomMethods.CreateRoom(roomObject);
    },
    saveNotes: function(notes,roomCode){
        RoomMethods.SaveNotes(notes,roomCode);
    },
    getNotes: function(roomCode){
        return RoomMethods.getKeynotes(roomCode);
    }
});
