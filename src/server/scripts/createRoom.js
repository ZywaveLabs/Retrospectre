/* global RoomMethods:true math:true*/
// "use strict";

var roomGen = JSON.parse(Assets.getText("room_gen.json")); // eslint-disable-line

/**
 * generateNewRoomCode - Generates a new fun room code
 *
 * @return {string}  Fun Room code
 */
generateNewRoomCode = function() {
    var roomCode = "";

    while (roomCode === "" || RoomMethods.RoomExists(roomCode)) {
        var noun = roomGen
            .Nouns[math.randomInt(roomGen.Nouns.length)];

        var adjective = roomGen
            .Adjectives[math.randomInt(roomGen.Adjectives.length)];

        var verb = roomGen
            .Verbs[math.randomInt(roomGen.Verbs.length)];

        roomCode = adjective + verb + noun;
    }
    return roomCode;
};

Meteor.methods({
    generateNewRoomCode: function() {
        return generateNewRoomCode();
    }
});
