"use strict";

Template.headerFooter.onCreated(function() {
    Session.set("theme", "superhero");
});

Template.headerFooter.helpers({
    getTheme: function() {
        return Session.get("theme");
    },

    showAlias: function() {
        return Meteor.userId() ? "hidden" : "visible";
    }
});
