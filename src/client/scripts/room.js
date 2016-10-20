"use strict";
/* global Cards:false Rooms:false Popup: false*/
/**
 *@purpose To provide the room template with data to display
 **/

Template.room.onCreated(function() {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
    });
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
    }
});

Template.room.events({
    "click #revealCardButton": function() {
        Meteor.call("revealCards", Session.get("roomCode"));
    },

    "click #hideCardButton": function() {
        Meteor.call("hideCards", Session.get("roomCode"));
    },

    "click .tag": function(e) {
        e.stopPropagation();
        filterSingleTag(e.toElement.innerHTML);
    },

    "submit #tagSearchForm": function(e) {
        e.preventDefault();
        var tags = e.target.filters.value.split(",");

        tags = tags.map(function(element) {
            return element.trim();
        });
        filterMultipleTags(tags);
    },

    "click #clearFilter": function() {
        clearFilter();
        $("#filters").val("");
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

/**
 *@param {string} tag - tag to filter cards by
 *Filters cards by the tag given
 **/
function filterSingleTag(tag) {
    filterMultipleTags([tag]);
    $("#filters").val(tag);
}

/**
 *@param {string[]} tags - Array of strings containing tags to filter by
 *Filters displayed cards by tags
 **/
function filterMultipleTags(tags) {
    var numCards = $(".card-panel").length;
    var indexFound = 0;
    for (var i = 0; i < numCards; i++) {
        var compTags;
        var found;

        found = false;
        compTags = $(".card-panel").eq(i).find(".tag");
        for (var j = 0; j < compTags.length; j++) {
            if (tags.indexOf(compTags[j].innerHTML) >= indexFound)
                found = true;
        }
        if (!found)
            $(".card-panel").eq(i).hide();
        else if (found)
            $(".card-panel").eq(i).show();
    }
}

/**
 *Clears filters field and show all cards
 **/
function clearFilter() {
    $("#filters").val("");
    $(".card-panel").show();
}
