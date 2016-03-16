/* global RoomMethods:true math:true ProgramUtils:true RandomGenerate: true*/
// TODO why is this commented out and why are all these globals here ^^^?
// "use strict";

Meteor.methods({
    generateNewRoomCode: function() {
        return RandomGenerate.GenerateNewRoomCode();
    }
});
