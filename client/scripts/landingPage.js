"use strict";

Template.landingPage.events({

    "click #createRoomButton": function () {
        Router.go("Create Room");
    }
});
