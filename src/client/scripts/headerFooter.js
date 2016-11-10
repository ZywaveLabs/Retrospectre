"use strict";

Template.headerFooter.events({
    "click #login-buttons-logout": function() {
        Meteor.call("removeUserFromRoom", Meteor.userId(), Session.get("roomCode"));
    }
});
