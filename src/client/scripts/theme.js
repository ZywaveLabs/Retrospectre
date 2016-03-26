"use strict";

Template.headerFooter.onCreated(function() {
    Session.set("theme", "superhero");
});

Template.headerFooter.helpers({
    getTheme: function() {
        return Session.get("theme");
    },

    showAlias: function() {
        if(Meteor.userId() || Session.get("author")){
            return "hidden";
        } else {
            return "visible";
        }
    }
});
