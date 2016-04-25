"use strict";
/* globals SnackbarMethods:false */

Template.landingPage.events({

    "click #createRoomButton": function () {
        if(!Meteor.user())
            SnackbarMethods.DisplayMessage("Warning: Log" +
                " in via Google before creating room",3000);
        Router.go("Create Room");
    }
});
