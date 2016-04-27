"use strict";
/* globals DEFAULT_SNACKBAR_TIMEOUT:true SnackbarMethods:false */

Template.landingPage.events({

    "click #createRoomButton": function () {
        if(!Meteor.user()) {
            SnackbarMethods.DisplayMessage("Warning: Log in via Google before creating room",DEFAULT_SNACKBAR_TIMEOUT);
        }
        Router.go("Create Room");
    }
});
