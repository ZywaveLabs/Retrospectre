"use strict";

/* TODO: Make this server only, don't publish rooms to client */
var ROOMS = new Mongo.Collection("rooms");

if (Meteor.isClient) {

    Template.createRoom.onCreated(function () {
        /* TODO: VV BAD VV Make this server only, don't publish rooms to client */
        this.subscribe("rooms");
        Meteor.call("generateNewRoomCode", function(error, result){
            if(!error){
                Session.set("newRoomCode", result);
            } else {
                /* TODO: Errors */
            }
        });
    });

    Template.createRoom.helpers({

        getNewRoomNumber: function () {
            return Session.get("newRoomCode");
        },

        roomAvailableShow: function () {
            return getRandomInt(0,2) == 1 ? "hidden" : "visible";
        }
    });

    Template.createRoom.events({

        "click #generateNewRoomCodeButton": function() {
            Session.set("newRoomCode", Meteor.call("generateNewRoomCode",
                function(error, result) {
                    if(!error){
                        Session.set("newRoomCode", result);
                    } else {
                        /* TODO: Errors */
                    }
                }
            ));
        },

        "submit .create-room": function (eve) {
            eve.preventDefault();
            var roomId = eve.target.roomcode.value;

            if (roomId === null || roomId === "") {
                return; /* TODO: Errors */
            }

            Meteor.call("addRoom", roomId);
            Session.set("roomNumber", roomId);
            Router.go("/room/" + roomId);
        }
    });
}

if (Meteor.isServer) {
    var roomGen = JSON.parse(Assets.getText("room_gen.json"));

    Meteor.publish("rooms", function () {
        return ROOMS.find({}, { sort: { id: -1 } });
    });

    /**
     * generateNewRoomCode - Generates a new fun room code
     *
     * @return {string}  Fun Room code
     */
    var generateNewRoomCode = function() {
        var roomCode = "";

        while(roomCode === "" || roomExists(roomCode)){
            var noun = roomGen.Nouns[getRandomInt(0, roomGen.Nouns.length)];
            var adjective = roomGen
                .Adjectives[getRandomInt(0, roomGen.Adjectives.length)];
            var verb = roomGen.Verbs[getRandomInt(0, roomGen.Verbs.length)];

            roomCode = adjective + verb + noun;
        }
        return roomCode;
    };


    /**
    *Adding meteor methods give methods we can
    *call using meteor.call this mandatory
    *when trying to handle the DB in any manner
    *it revokes DB access to the client
    *this is due to removing the insecure package
    **/
    Meteor.methods({

        addRoom: function (newRoomID) {
            addRoomToDatabase(newRoomID);
        },

        generateNewRoomCode: function() {
            return generateNewRoomCode();
        }
    });
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
    return false;
    // return ROOMS.find({ TODO: Finish this
    //     id: roomCode
    // });
}


/**
 * addRoomToDatabase - Adds a room to the database
 *
 * @param  {string} roomID Roomcode to add to database
 */
function addRoomToDatabase(roomID) {
    ROOMS.insert({
        id: String(roomID),
        dateCreated: new Date()
    });
}
