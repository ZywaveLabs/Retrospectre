/* global DEFAULT_SNACKBAR_TIMEOUT:false SnackbarMethods:false*/
"use strict";

Template.loginModal.helpers({
    currentAlias: function() {
        return Session.get("author");
    }
});

Template.loginModal.events({
    "submit #LogInModal": function(eve) {
        eve.preventDefault();
        Session.set("author", eve.target.alias.value);
        $("#LogInModal").modal("hide");
        SnackbarMethods.DisplayMessage("Alias set", DEFAULT_SNACKBAR_TIMEOUT);
        if (Session.get("roomCode")) {
            if (Session.get("aliasID"))
                Meteor.call("changeAlias", Session.get("aliasID"), Session.get("author"));
            else {
                Meteor.call("addUserToRoom", Session.get("author"), Session.get("roomCode"), function(err, res) {
                    if (err)
                        return;
                    if (res)
                        Session.set("aliasID", res);
                });
            }
        }
    }
});
