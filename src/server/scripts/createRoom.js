/* global RoomMethods:true math:true ProgramUtils:true RandomGenerate: true*/
// "use strict";

Meteor.methods({
    generateNewRoomCode: function() {
        return RandomGenerate.GenerateNewRoomCode();
    }
});
