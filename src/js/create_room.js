"use strict";
var roomGen = {};

roomGen = JSON.parse(Assets.getText("room_gen.json"));

var ROOMS = new Mongo.Collection("rooms");

if (Meteor.isClient) {

    Template.createRoom.onCreated(function () {
        this.subscribe("rooms");
    });

    Template.createRoom.helpers({

        getNewRoomNumber: function () {
            var newRoomCode = generateNewRoomCode();

            Session.set("newRoomCode", newRoomCode);
            return newRoomCode;
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


/**
 * generateNewRoomCode - Generates a new fun room code
 *
 * @return {string}  Fun Room code
 */
function generateNewRoomCode() {
    var roomCode = "";

    while(roomCode === "" || roomExists(roomCode)){
        var noun = roomGen.Nouns[getRandomInt(0, roomGen.Nouns.length)];
        var adjective = roomGen
            .Adjectives[getRandomInt(0, roomGen.Adjectives.length)];
        var verb = roomGen.Verbs[getRandomInt(0, roomGen.Verbs.length)];

        roomCode = adjective + verb + noun;
    }
    return adjective + verb + noun;
}


/**
 * getRandomInt - Returns a random integer between min (included) and max (excluded)
 *  Using Math.round() will give you a non-uniform distribution!
 *
 * @param  {integer} min Minimum integer (Included)
 * @param  {integer} max Maximum integer (Excluded)
 * @return {integer}     description
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * roomExists - Checks to see if room with roomcode exists
 *
 * @param  {string} roomCode Room to check if exists already
 * @return {boolean} Whether room codes exists
 */
function roomExists(roomCode){
    return ROOMS.find({
        id: roomCode
    });
}

function addRoomToDatabase(roomID) {
    ROOMS.insert({
        id: roomID,
        dateCreated: new Date()
    });
}
