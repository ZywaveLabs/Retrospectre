"use strict";
/* global Cards:false Rooms:true*/

Template.exportRoom.helpers({

    getCards : function(category) {
        var cards = Cards.find({
            "roomCode": Session.get("roomNumber"),
            "category": category
        });

        return cards;
    },

    getCategories : function() {
        var room = Rooms.findOne({"roomCode" : Session.get("roomNumber")});

        return room.categories;
    },

    getComments : function(card) {
        var comments = ""

        for(var i = 0; i < card.comments.length; i++) {
            comments += "\n\t" + card.comments[i].text + " --" + card.comments[i].author;
        }

        return comments;
    }
});
