"use strict";

Template.landingPage.events({

    "click #createRoomButton": function () {
        Router.go("Create Room");
    },
    "keyup #roomCode": function(eve) {
        var newRoomCode = eve.target.value;
        Session.set("newRoomCode", newRoomCode);
    }
});
