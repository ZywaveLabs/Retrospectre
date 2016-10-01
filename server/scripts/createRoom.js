/* global RandomGenerate: true*/
"use strict";

Meteor.methods({
    generateNewRoomCode: function() {
        return RandomGenerate.GenerateNewRoomCode();
    }
});
