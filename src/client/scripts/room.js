"use strict";
/* global Cards:false Rooms:false Popup: false UserMethods:false*/
/**
 *@purpose To provide the room template with data to display
 **/

Template.room.onCreated(function() {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
        Meteor.subscribe("usersInRoom", Session.get("roomCode"));
        if (Meteor.user()) {
            Meteor.call("addUserToRoom", Session.get("author"), Session.get("roomCode"));
        }
    });
    if (Session.get("author")) {
        Meteor.call("addUserToRoom", Session.get("author"), Session.get("roomCode"), function(err, res) {
            if (err) {
                return;
            }
            if (res)
                Session.set("aliasID", res);
        });
    }
});

Template.room.onDestroyed(function() {
    if (Meteor.user())
        Meteor.call("removeUserFromRoom", Meteor.userId(), Session.get("roomCode"));
    if (Session.get("aliasID")) {
        Meteor.call("removeUserFromRoom", Session.get("aliasID"), Session.get("roomCode"), function() {
            Session.set("aliasID", null);
        });
    }
});

Template.room.onRendered(function() {
    $(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // eslint-disable-line
        hover: false,
        gutter: 0,
        belowOrigin: false,
        alignment: "left"
    });
});

Template.room.helpers({

    getCategories: function() {
        return Rooms.findOne({
            "roomCode": Session.get("roomCode")
        }).categories;
    },
    cards: function(category) {
        var roomData = Rooms.findOne({
            "roomCode": Session.get("roomCode")
        });
        var cards = [];
        var author;

        if (Meteor.user()) {
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }
        if (roomData.reveal || roomData.ower === Meteor.userId()) {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category
            });
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
                $or: [{
                    "reveal": true
                }, {
                    "author": author
                }]
            }, {
                sort: {
                    createdAt: 0
                }
            });
        }

        return cards;
    },

    isModerator: function() {
        var room = Rooms.findOne({
            "roomCode": Session.get("roomCode")
        });
        return room.owner === Meteor.userId();
    },

    cardsHidden: function() {
        var room = Rooms.findOne({
            "roomCode": Session.get("roomCode")
        });
        return !room.reveal;
    },

    getUsersInRoom: function() {
        return UserMethods.getUsersInRoom(Session.get("roomCode")).fetch();
    }
});

Template.room.events({
    "click #revealCardButton": function() {
        Meteor.call("revealCards", Session.get("roomCode"));
    },

    "click #hideCardButton": function() {
        Meteor.call("hideCards", Session.get("roomCode"));
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
