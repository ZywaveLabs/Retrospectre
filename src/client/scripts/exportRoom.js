"use strict";
/* global Cards:false Rooms:false KeyNotes:false */

Template.exportRoom.rendered = function () {
    Session.set("isSummaryView", true);
};

Template.exportRoom.created = function () {
    self = this; // eslint-disable-line
    self.sharedText = new ReactiveVar("");
    Meteor.call("getSharedTextForRoom", Session.get("roomCode"), function(err, result){
        if(err)
            console.log(err); // eslint-disable-line
        else
            self.sharedText.set(result);
    });
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
            "roomCode": Session.get("roomCode"),
            "category": category
        });

        return cards;
    },

    getCategories : function() {
        var room = Rooms.findOne({"roomCode" : Session.get("roomCode")});

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
            "roomCode" : Session.get("roomCode")
        });

        return "Found notes \"" + keynotes.text + "\"";
    },

    getSummaryView : function() {
        return Session.get("isSummaryView");
    },

    getSharedTextArea : function(){
        return self.sharedText.get();
    }
});
