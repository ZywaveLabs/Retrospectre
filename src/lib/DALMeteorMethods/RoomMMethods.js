// /* eslint-disable */
/* global Rooms:true RoomMethods: true */

Meteor.methods({
    createRoom: function (roomObject) {
        RoomMethods.CreateRoom(roomObject);
    }
});
