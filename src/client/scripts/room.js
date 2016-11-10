"use strict";
/* global Cards:false Rooms:false Popup: false UserMethods:false RoomMethods:true*/
/**
 *@purpose To provide the room template with data to display
 **/

Template.room.onCreated(function() {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
    });
});

Template.room.helpers({
    isModerator: function() {
        return RoomMethods.IsModerator(Session.get("roomCode"));
    },

    displayClaimModeratorButton: function() {
        return Rooms.findOne({"roomCode": Session.get("roomCode")}).moderator === "";

    },

    cardsHidden: function() {
        var room = Rooms.findOne({
            "roomCode": Session.get("roomCode")
        });
        return !room.reveal;
    }
});

Template.room.events({
    "click #revealCardButton": function() {
        Meteor.call("revealCards", Session.get("roomCode"));
    },

    "click #hideCardButton": function() {
        Meteor.call("hideCards", Session.get("roomCode"));
    },

    "click #claimModeratorButton": function() {
        Meteor.call("claimModerator", Session.get("roomCode"));
    },

    "click #exportButton": function() {
        var roomCode = Session.get("roomCode");

        Router.go("/room/" + roomCode + "/export");
    },

    "click #clearRoomButton": function() {
        var roomCode = Session.get("roomCode"); // Get some closure in here
        Popup.Confirm("Delete all cards in room", function() {
            Meteor.call("deleteAllCardsInRoom", roomCode);
        });
    },

    "click #deleteRoomButton": function() {
        var roomCode = Session.get("roomCode");
        Popup.Confirm("Delete this room - " + roomCode, function() {
            Router.go("/");
            Meteor.call("deleteSharedTextForRoom", roomCode, function() {
                Meteor.call("deleteRoom", roomCode);
            });
        });
    }
});
