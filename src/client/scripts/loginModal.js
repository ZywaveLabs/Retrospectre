/* global DEFAULT_SNACKBAR_TIMEOUT:true SnackbarMethods:false */
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
        SnackbarMethods.DisplayMessage("Alias set" , DEFAULT_SNACKBAR_TIMEOUT);
    }
});
