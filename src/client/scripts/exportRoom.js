"use strict";
/* global Cards:false Rooms:false KeyNotes:false */

Template.exportRoom.rendered = function () {
    Session.set("isSummaryView", true);
};

Template.exportRoom.events({

    "click #copyToClipboardButton" : function(eve) {
        eve.preventDefault();
        var txtArea = document.querySelector("#textArea");

        txtArea.select();
        document.execCommand("copy");
    },

    "click #exportSummaryButton" : function(eve) {
        eve.preventDefault();
        Session.set("isSummaryView", true);
    },

    "click #exportAllButton" : function(eve) {
        eve.preventDefault();
        Session.set("isSummaryView", false);
    }
});

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
        var comments = "";

        for(var i = 0; i < card.comments.length; i++) {
            comments += "\n\t" + card.comments[i].text +
                " --" + card.comments[i].author;
        }

        return comments;
    },

    getKeynotes : function() {
        var keynotes = KeyNotes.findOne({
            "roomCode" : Session.get("roomNumber")
        });

        return "Found notes \"" + keynotes.text + "\"";
    },

    getSummaryView : function() {
        return Session.get("isSummaryView");
    }
});
