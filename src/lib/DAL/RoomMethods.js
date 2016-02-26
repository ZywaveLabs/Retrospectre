// /* eslint-disable */
/* global Rooms:true RoomMethods:true generateNewRoomCode:true ProgramUtils:true */

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
        id: roomCode
    }).count() > 0;
};

/*
RoomObject
roomCode - {string} Room that the card is in
categories - {string[]} Catergories for the room
createdAt - {datetime} Will default to now, but can pass a time for testing
owner - {string} Person who created the room
reveal - {boolean} If the cards should be visible to everyone besides author
*/

/**
 * CreateRoom - Adds a room to the database
 *
 * @param  {RoomObject} roomObject Room to add to the database
 */
RoomMethods.CreateRoom = function(roomObject){
    var defaultRoom = {
        roomCode: generateNewRoomCode(),
        categories: ["good", "bad"],
        createdAt: new Date(),
        owner: "",
        reveal: false
    };

    roomObject = ProgramUtils.DefaultObjectValues(roomObject, defaultRoom);

    if(!RoomMethods.RoomExists(roomObject.roomCode)){
        Rooms.insert({
            id: String(roomObject.roomCode),
            categories: roomObject.categories,
            dateCreated: roomObject.createdAt,
            owner: roomObject.owner,
            reveal: roomObject.reveal
        });
    }
};

RoomMethods.DeleteRoomById = function(id){
    Rooms.remove({_id:id});
};

RoomMethods.DeleteRoomByRoomcode = function(roomCode){
    Rooms.remove({id:roomCode});
};
