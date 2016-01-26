"use strict";

if (Meteor.isClient) {

    Template.landingPage.events({

        "click #createRoomButton": function () {
            Router.go("Create Room");
        },

        "click #joinRoom": function () {
            Router.go("Join Room");
        }
    });
}
