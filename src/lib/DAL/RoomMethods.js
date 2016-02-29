// /* eslint-disable */
/* global Rooms:true RoomMethods:true ProgramUtils:true RandomGenerate:true */

Rooms = new Mongo.Collection("rooms");
if(Meteor.isServer){
    Meteor.publish("rooms", function(){
        return Rooms.find({});
    });
} else {
    Meteor.subscribe("rooms");
}
RoomMethods = {};

/**
 * RoomExists - Checks to see if room with roomcode exists
 *
 * @param  {string} roomCode Room to check if exists already
 * @return {boolean} Whether room codes exists
 */
RoomMethods.RoomExists = function(roomCode){
    if(roomCode == null || roomCode == ""){
        return false;
    }
    return Rooms.find({
        roomCode: roomCode
    }).count() > 0;
};

/*
RoomObject
roomCode - {string} Room that the card is in
categories - {string[]} Categories for the room
createdAt - {datetime} Will default to now, but can pass a time for testing
owner - {string} Person who created the room
reveal - {boolean} If the cards should be visible to everyone besides author
anonymousAccess - {object} Access that people who are not signed in have
*/

/*
AnonymousAccess Object
read - {boolean}
write - {boolean}
*/

/**
 * CreateRoom - Adds a room to the database
 *
 * @param  {RoomObject} roomObject Room to add to the database
 */
RoomMethods.CreateRoom = function(roomObject){
    var defaultRoom = {
        roomCode: "",
        categories: ["good", "bad"],
        createdAt: new Date(),
        owner: "",
        reveal: false,
        anonymousAccess: {
            read: true,
            write: true
        }
    };

    roomObject = ProgramUtils.DefaultObjectValues(roomObject, defaultRoom);

    if(!RoomMethods.RoomExists(roomObject.roomCode)){
        Rooms.insert(roomObject);
    }
};

RoomMethods.DeleteRoomById = function(id){
    Rooms.remove({_id:id});
};

RoomMethods.DeleteRoomByRoomcode = function(roomCode){
    Rooms.remove({roomCode:roomCode});
};
