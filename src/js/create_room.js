"use strict";

var ROOMS = new Mongo.Collection("rooms");

if(Meteor.isClient) {
    Template.createRoom.helpers({
        getNewRoomNumber: function() {
            var lastRoomID = getLastRoomID();

            if(lastRoomID === null) {
                lastRoomID = 0;
            }

            var newRoomID = lastRoomID + 1;

            return newRoomID;
        }
    });

    Template.createRoom.events({
        "click #createAndJoinRoomButton": function () {
            var lastRoomID = getLastRoomID();

            if(lastRoomID === null) {
                lastRoomID = 0;
            }

            var newRoomID = lastRoomID + 1;

            addRoomToDatabase(newRoomID);
            //TODO redirect to new room
        }
    });
}


function getLastRoomID() {
    var roomList = ROOMS.find({},{sort: {id: -1}}).fetch();
    var lastRoom;

    if(roomList.length > 0)
        lastRoom = roomList[0].id;
    else
        lastRoom = null;
    return lastRoom;
}

function addRoomToDatabase(roomID) {
    ROOMS.insert({
        id: roomID,
        dateCreated: new Date()
    });
}