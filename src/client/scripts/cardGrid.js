"use strict";
/* global Cards:false Rooms:false dragula:false */
var uniqueIdCount = 0;
var draggableCategories = [];

Template.cardGrid.onRendered(function() {
    Session.set("getUniqueID_CallCount", uniqueIdCount);
    Session.set("pairSet", false);
    var containers = getContainers();
    var dragNDrop = dragula(containers);

    dragNDrop.on("drop", function(el, target, source, sibling) {
        var cardId = $(el).attr("id");
        var currCategory = $(source).attr("name");
        var newCardCategory = $(target).attr("name");
        var currPosition = parseInt($(el).attr("position"));
        if (sibling === null) {
            Meteor.call("updatePositionLast", cardId, currPosition, currCategory, newCardCategory);
        } else {
            var siblingPos = parseInt($(sibling).attr("position"));
            Meteor.call("updatePosition", cardId, currPosition, currCategory, newCardCategory, siblingPos);
        }
    });
});

Template.cardGrid.helpers({
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
        if (roomData.reveal) {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category
            }, {
                sort: {
                    position: -1
                }
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
                    position: -1
                }
            });
        }
        return cards;
    },

    getUniqueID: function(category) {
        draggableCategories.push(category.replace(/\s/g, ""));
        return category.replace(/\s/g, "");
    }
});

function getContainers() {
    var containers = [];
    for (var i = 0; i < draggableCategories.length; i++) {
        containers.push(document.querySelector("." + draggableCategories[i]));
    }
    return containers;
}
