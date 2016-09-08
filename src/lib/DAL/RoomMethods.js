/* global Rooms:true RoomMethods:true KeyNotes:true Logger:false
Keynotes:true */

Rooms = new Mongo.Collection("rooms");
KeyNotes = new Mongo.Collection("keynotes");

if(Meteor.isServer){
    Meteor.publish("rooms", function(){
        return Rooms.find({});
    });
    Meteor.publish("keynotes", function(){
        return KeyNotes.find({});
    });
} else {
    Meteor.subscribe("rooms");
    Meteor.subscribe("keynotes");
}
RoomMethods = {};

/**
 * RoomExists - Checks to see if room with roomcode exists
 *
 * @param  {string} roomCode Room to check if exists already
 * @return {boolean} Whether room codes exists
 */
RoomMethods.RoomExists = function(roomCode){
    if(roomCode === null || roomCode === ""){
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
 * @return {string} - id of keynote added to db
 */
RoomMethods.CreateRoom = function(roomObject){
    if(!RoomMethods.RoomExists(roomObject.roomCode)){
        Logger.Log(new Log("Room Created")
                        .withInfo({
                            RoomCode: roomObject.roomCode
                        }));
        Rooms.insert(roomObject);
        var notes = new Keynotes()
          .withRoomCode(roomObject.roomCode)
          .createdBy(roomObject.owner);

        var docId = KeyNotes.insert(notes);

        return docId;
    }
};

RoomMethods.DeleteRoomById = function(id){
    Rooms.remove({_id:id});
};

RoomMethods.DeleteRoomByRoomcode = function(roomCode){
    Rooms.remove({roomCode:roomCode});
};

RoomMethods.getKeynoteID = function(roomCode){
    var keynote = KeyNotes.findOne({roomCode:roomCode});

    return keynote._id;
};

RoomMethods.RevealCards = function(roomCode){
    Rooms.update({roomCode: roomCode}, {$set:{
        reveal: true
    }});
};

RoomMethods.HideCards = function(roomCode){
    Rooms.update({roomCode: roomCode}, {$set:{
        reveal: false
    }});
};
