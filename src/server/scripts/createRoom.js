/* global RoomMethods:true MathUtils:true*/
"use strict";

var roomGen = JSON.parse(Assets.getText("room_gen.json"));

/**
 * generateNewRoomCode - Generates a new fun room code
 *
 * @return {string}  Fun Room code
 */
var generateNewRoomCode = function() {
    var roomCode = "";

    while (roomCode === "" || RoomMethods.RoomExists(roomCode)) {
        var noun = roomGen
            .Nouns[MathUtils.GetRandomInt(0, roomGen.Nouns.length)];

        var adjective = roomGen
            .Adjectives[MathUtils.GetRandomInt(0, roomGen.Adjectives.length)];

        var verb = roomGen
            .Verbs[MathUtils.GetRandomInt(0, roomGen.Verbs.length)];

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
    roomExists: function(roomID) {
        return RoomMethods.RoomExists(roomID);
    },

    addRoom: function(newRoomID) {
        RoomMethods.CreateRoom(newRoomID);
    },

    generateNewRoomCode: function() {
        return generateNewRoomCode();
    }
});
