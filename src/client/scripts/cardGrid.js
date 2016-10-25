"use strict";
/* global Cards:false Rooms:false CardsSearchableFieldMap: true dragula:false getMongoQueryObjectFromSearch: true UserMethods:false*/
var uniqueIdCount = 0;

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
            Meteor.call("updatePosition", cardId, currPosition, currCategory, newCardCategory,-1);//eslint-disable-line
        } else {
            var siblingPos = parseInt($(sibling).attr("position"));
            Meteor.call("updatePosition", cardId, currPosition, currCategory, newCardCategory, siblingPos);
        }
    });
});

Template.cardGrid.onCreated(function() {
    Session.set("searchKeyMapping", CardsSearchableFieldMap);
});

Template.cardGrid.helpers({
    getCategories: function() {
        return Rooms.findOne({
            "roomCode": Session.get("roomCode")
        }).categories;
    },
    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var author = UserMethods.getAuthor();

        var searchQuery = getMongoQueryObjectFromSearch(CardsSearchableFieldMap);
        var revealQuery = roomData.reveal ? [{}] : [{"reveal": true}, {"author": author},{"moderator":author}];

        var baseQuery = {
            "category": category,
            $and:searchQuery,
            $or: revealQuery
        };

        return Cards.find(baseQuery, {sort: {position:-1}}).fetch();
    },

    getUniqueID: function(category) {
        return category.replace(/\s/g, "");
    }
});

function getContainers() {
    var categories = Rooms.findOne({"roomCode":Session.get("roomCode")}).categories;
    var containers = [];
    for (var i = 0; i < categories.length; i++) {
        containers.push(document.querySelector("." + categories[i].category.replace(/\s/g, "")));
    }
    return containers;
}
