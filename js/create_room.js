"use strict";

var ROOMS = new Mongo.Collection("rooms");

if (Meteor.isClient) {

    Template.createRoom.onCreated(function () {
        this.subscribe("rooms");
    });

    Template.createRoom.helpers({

        getNewRoomNumber: function () {

            var lastRoomID = getLastRoomID();
            var newRoomID;

            if (lastRoomID === null) {
                lastRoomID = 0;
            }

            newRoomID = lastRoomID + 1;
            return newRoomID;
        }
    });

    Template.createRoom.events({

        "click #createAndJoinRoomButton": function () {

            var lastRoomID = getLastRoomID();

            if (lastRoomID === null) {
                lastRoomID = 0;
            }

            var newRoomID = lastRoomID + 1;

            Meteor.call("addRoom", newRoomID);
            Session.set("roomNumber", newRoomID);
            Router.go("/room/" + newRoomID);
        }
    });
}

if (Meteor.isServer) {

    Meteor.publish("rooms", function () {
        return ROOMS.find({}, { sort: { id: -1 } });
    });
}

/**
*Adding meteor methods give methods we can
*call using meteor.call this mandatory
*when trying to handle the DB in any manner
*it revokes DB access to the client
*this is due to removing the insecure package
**/
Meteor.methods({

    getLastRoomID: function () {
        return getLastRoomID();
    },

    addRoom: function (newRoomID) {
        addRoomToDatabase(newRoomID);
    }
});

function getLastRoomID() {

    var roomList = ROOMS.find({}, { sort: { id: -1 } }).fetch();
    var lastRoom;

    if (roomList.length > 0) {
        lastRoom = roomList[0].id;
    } else {
        lastRoom = null;
    }

    return lastRoom;
}

function addRoomToDatabase(roomID) {
    ROOMS.insert({
        id: roomID,
        dateCreated: new Date()
    });
}
