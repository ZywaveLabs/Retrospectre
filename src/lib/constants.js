// /* eslint-disable */
/* global Cards:true Rooms:true RoomMethods: true */


Cards = new Mongo.Collection("cards");
Rooms = new Mongo.Collection("rooms");
if(Meteor.isServer){
    Meteor.publish("roomCodes", function(){
        return Rooms.find({});
    });
} else {
    Meteor.subscribe("roomCodes");
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

/**
 * CreateRoom - Adds a room to the database
 *
 * @param  {string} roomCode Roomcode to add to database
 */
RoomMethods.CreateRoom = function(roomCode){
    if(!RoomMethods.RoomExists(roomCode)){
        Rooms.insert({
            id: String(roomCode),
            dateCreated: new Date()
        });
    }
};
