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
        var room = Rooms.findOne({"roomCode" : Session.get("roomNumber")});

        return room.categories;
    }
});
