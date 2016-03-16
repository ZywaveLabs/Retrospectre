"use strict";
/* global Cards:false Rooms:true*/

Template.exportRoom.helpers({

    getCards : function(category) {
        var mongoQuery = {
            "roomCode": Session.get("roomNumber"),
            "category": category
        };

        return Meteor.apply("getCardCollectionByQuery",
            [mongoQuery], { returnStubValue: true });
    },

    getCategories : function() {
        // Sets room number based on url so if page is directly navigated too or refeshed
        // session variable will be reset.
        var urlParams = window.location.pathname.split("/");

        Session.set("roomNumber", urlParams[2]);
        var room = Rooms.findOne({"roomCode" : Session.get("roomNumber")});

        return room.categories;
    }
});
