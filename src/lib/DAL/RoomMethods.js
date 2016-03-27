/* global Rooms:true RoomMethods:true Logger:false */

Rooms = new Mongo.Collection("rooms"); // eslint-disable-line
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

/**
 * CreateRoom - Adds a room to the database
 *
 * @param  {RoomObject} roomObject Room to add to the database
 */
RoomMethods.CreateRoom = function(roomObject){
    if(!RoomMethods.RoomExists(roomObject.roomCode)){
        Logger.Log(new Log("Room Created")
                        .withInfo({
                            RoomCode: roomObject.roomCode
                        }));
        Rooms.insert(roomObject);
    }
};

RoomMethods.DeleteRoomById = function(id){
    Rooms.remove({_id:id});
};

RoomMethods.DeleteRoomByRoomcode = function(roomCode){
    Rooms.remove({roomCode:roomCode});
};
